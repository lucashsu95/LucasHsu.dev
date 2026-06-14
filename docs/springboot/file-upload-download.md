---
title: Spring Boot 檔案上傳與下載 | LucasHsu.dev
description: Spring Boot 檔案上傳與下載完整教學，包含 MultipartFile 處理、中文檔名編碼、上傳器介面設計與常見問題。
head:
  - - meta
    - name: keywords
      content: Spring Boot, 檔案上傳, 檔案下載, MultipartFile, Java, 中文檔名
  - - meta
    - property: og:title
      content: Spring Boot 檔案上傳與下載 | LucasHsu.dev
  - - meta
    - property: og:description
      content: Spring Boot 檔案上傳與下載完整教學，含 MultipartFile、中文檔名處理。
  - - meta
    - property: og:type
      content: article
---

# Spring Boot 檔案上傳與下載

> 📝 TL;DR：後端接檔案用 `MultipartFile`，下載注意中文檔名需 RFC 5987 編碼。上傳邏輯建議抽成 `Uploader` 介面 + `MultipartFileUploader` 實作，不要全塞在 Controller。以下範例取自 [`@pets/`](https://github.com/LucasHsu95/pets) 專案的真實程式碼。

## 1. 專案架構總覽

先看整個檔案處理的 package 結構，方便對照後續範例：

```
src/main/java/.../
├── Practice.java                          # Spring Boot 啟動 + Bean 註冊
├── config/provider/properties/
│   └── FileProperties.java                # 上傳路徑與 URL 設定
├── controller/
│   ├── ReviewController.java              # 實際使用上傳的 Controller
│   └── ExceptionHandleController.java     # 全域例外處理（含檔案大小）
├── dto/file/
│   ├── uploader/
│   │   ├── Uploader.java                  # 上傳介面
│   │   ├── MultipartFileUploader.java     # MultipartFile 實作
│   │   └── UploadResult.java              # 上傳結果 DTO
│   └── directory/
│       ├── Directory.java                 # 目錄抽象介面
│       └── DirectoryImpl.java             # 目錄實作
├── exception/file/
│   ├── FileException.java                 # 檔案例外抽象
│   ├── EmptyFileException.java            # 空檔案
│   ├── FileExtensionIllegalException.java # 非法副檔名
│   ├── UploadFileTooLargeException.java   # 檔案過大
│   └── ... (其餘例外)
└── util/file/
    ├── FileUtils.java                     # 隨機檔名、檔案操作
    └── FileExtensionUtils.java            # Tika 真實類型驗證
```

---

## 2. 設定檔案儲存路徑（application.yml）

```yaml
server:
  file:
    name: upload
    path: /data/upload          # 檔案實際儲存路徑
    url: /file                  # 對外公開的 URL 路徑
```

對應的 `@ConfigurationProperties` 類別：

```java
@Component
@ConfigurationProperties(prefix = "server.file")
public class FileProperties {
    private String name;
    private String url;
    private String path;
    // getter / setter
}
```

---

## 3. 限制檔案大小（application.properties）

```properties
# 單一檔案最大限制
spring.servlet.multipart.max-file-size=5MB

# 單次請求總大小限制（可能一次傳多個檔）
spring.servlet.multipart.max-request-size=10MB
```

超過這個大小，Spring 會拋 `MaxUploadSizeExceededException`。

---

## 4. Directory 目錄抽象（檔案存放位置管理）

上傳前需要知道檔案要存到哪個目錄。`Directory` 介面封裝了目錄操作：

```java
public interface Directory extends Copyable {
    @Nonnull
    String getName();

    @Nullable
    Path getAbsolutePath();

    default boolean isNotExist() {
        return !isExist();
    }

    default void create() {
        try {
            Path absolutePath = Objects.requireNonNull(getAbsolutePath(), "該資料夾沒有設定路徑");
            if (isNotExist()) {
                Files.createDirectories(absolutePath);
            }
        } catch (IOException e) {
            throw new FileUnknownException(e);
        }
    }

    Directory addDirectory(String newDirectoryName);
    // ... 其他方法
}
```

---

## 5. Uploader 介面

```java
@FunctionalInterface
public interface Uploader {
    @NonNull
    UploadResult upload(@NonNull Directory uploadTo) throws FileException;
}
```

---

## 6. MultipartFileUploader 實作（核心）

這是最重要的類別，封裝了單檔、多檔、自訂檔名等上傳情境：

```java
public class MultipartFileUploader {
    private final Directory baseDirectory;
    private final String baseURL;

    public MultipartFileUploader(@NonNull Directory baseDirectory, @NonNull String baseURL) {
        this.baseDirectory = baseDirectory;
        this.baseURL = baseURL;
    }

    // === 單檔上傳（自動隨機檔名）===
    @NonNull
    public UploadResult upload(@NonNull MultipartFile multipartFile, String... subDirectoryName) throws FileException {
        // 1. 檢查空檔案
        if (multipartFile.isEmpty()) {
            throw new EmptyFileException(multipartFile.getName());
        } else if (baseDirectory.getAbsolutePath() == null) {
            throw new NotHavePathException();
        }
        // 2. 用 Tika 驗證真實檔案類型
        FileExtensionUtils.verifyRealImageType(multipartFile);
        // 3. 建立子目錄（如果不存在）
        Directory uploadTarget = baseDirectory;
        for (String name : subDirectoryName) {
            uploadTarget = uploadTarget.addDirectory(name);
        }
        if (uploadTarget.isNotExist()) {
            uploadTarget.create();
        }
        // 4. 產生隨機檔名 + 寫入磁碟
        try {
            String fullRandomFileName = getFullRandomFileName(multipartFile);
            Path absolutePath = uploadTarget.getAbsolutePath();
            Path storePath = absolutePath.resolve(fullRandomFileName);
            multipartFile.transferTo(storePath);
            // 5. 回傳上傳結果
            return UploadResult.builder()
                    .filePath(storePath)
                    .url(String.format(
                            "%s/%s/%s",
                            baseURL,
                            Arrays.stream(subDirectoryName)
                                    .map(name -> URLEncoder.encode(name, StandardCharsets.UTF_8))
                                    .collect(Collectors.joining("/")),
                            fullRandomFileName
                    ))
                    .build();
        } catch (IOException e) {
            throw new FileUnknownException(e);
        }
    }

    // 隨機 UUID 檔名 + 保留原始副檔名
    private String getFullRandomFileName(MultipartFile multipartFile) {
        String originalFilename = Objects.requireNonNull(multipartFile.getOriginalFilename());
        int lastDotIndex = originalFilename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return FileUtils.getRandomFileName();
        }
        return FileUtils.getRandomFileName() + originalFilename.substring(lastDotIndex);
    }

    // === 多檔上傳（陣列版）===
    @NonNull
    public List<UploadResult> upload(@NonNull MultipartFile[] fileArray, String... subDirectoryName) throws FileException {
        return upload(List.of(fileArray), subDirectoryName);
    }

    // === 多檔上傳（List 版）===
    @NonNull
    public List<UploadResult> upload(@NonNull List<MultipartFile> fileArray, String... subDirectoryName) throws FileException {
        return fileArray.parallelStream()
                .map(file -> upload(file, subDirectoryName))
                .collect(Collectors.toList());
    }

    // === 自訂檔名上傳 ===
    public UploadResult uploadFileName(@NonNull MultipartFile multipartFile, String fileName, String... subDirectoryName) throws FileException {
        // ...（類似流程，但使用自訂檔名）
    }
}
```

### 核心流程圖

```
upload(multipartFile, subDir...)
    │
    ├── 1. 檢查空檔案 → EmptyFileException
    ├── 2. Tika 驗證真實 MIME → FileExtensionIllegalException
    ├── 3. 建立子目錄（不存在則自動建立）
    ├── 4. UUID.randomUUID() + 保留副檔名
    ├── 5. multipartFile.transferTo(Path)
    └── 6. 回傳 UploadResult { filePath, url }
```

### 隨機檔名工具

```java
@UtilityClass
public class FileUtils {
    @NonNull
    public String getRandomFileName() {
        return UUID.randomUUID().toString();
    }

    @NonNull
    public String getFileExtension(@NonNull String fullFileName) throws FileExtensionNotFoundException {
        int lastDotIndex = fullFileName.lastIndexOf('.');
        if (lastDotIndex == -1) {
            throw new FileExtensionNotFoundException(fullFileName);
        } else {
            return fullFileName.substring(lastDotIndex + 1);
        }
    }
}
```

---

## 7. UploadResult（上傳結果）

```java
@Data
@AllArgsConstructor
@Builder
public class UploadResult {
    private Path filePath;    // 磁碟實體路徑
    private String url;       // 對外存取 URL
}
```

---

## 8. Bean 註冊（Spring Boot 啟動類）

在 `@SpringBootApplication` 中註冊 `Directory` 和 `MultipartFileUploader`：

```java
@SpringBootApplication
public class Practice extends SpringBootServletInitializer {

    @Bean("fileDirectory")
    public Directory fileDirectory(FileProperties fileProperties) {
        return new DirectoryImpl(Paths.get(fileProperties.getPath()));
    }

    @Bean
    public MultipartFileUploader multipartFileUploader(
            Directory fileDirectory, FileProperties fileProperties) {
        return new MultipartFileUploader(fileDirectory, fileProperties.getUrl());
    }
}
```

---

## 9. 實際應用範例：Review 評價圖片上傳

### Controller 層

```java
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public ResponseEntity<String> createReview(@Valid ReviewBean reviewBean,
                                                BindingResult bindingResult) {
        BindingResultUtils.validate(bindingResult);
        reviewService.createReviewWithImages(
            reviewBean.getOrderId(),
            reviewBean.getRating(),
            reviewBean.getContent(),
            reviewBean.getImages()
        );
        return ResponseEntityBuilder.success()
                .message("評價發布成功！")
                .build();
    }
}
```

### Service 層（完整上傳 + 驗證邏輯）

```java
@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final MultipartFileUploader uploader;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final List<String> ALLOWED_IMAGE_TYPES =
            List.of("image/png", "image/jpeg", "image/gif");

    public void createReviewWithImages(Integer orderId, Integer rating,
                                        String content, List<MultipartFile> images) {
        // ... 訂單驗證、權限檢查 ...

        // 1. 逐一驗證每個檔案
        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                if (file.isEmpty()) {
                    throw new IllegalArgumentException("上傳的檔案不能為空！");
                }
                if (file.getSize() > MAX_FILE_SIZE) {
                    throw new IllegalArgumentException("檔案大小超過限制 (5MB)！");
                }
                String contentType = file.getContentType();
                if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType)) {
                    throw new IllegalArgumentException("只接受 PNG, JPEG, GIF 圖片！");
                }
                // 驗證圖片是否可讀取（防止偽造副檔名）
                BufferedImage image = ImageIO.read(file.getInputStream());
                if (image == null) {
                    throw new IllegalArgumentException("檔案已損毀或不是有效的圖片格式！");
                }
            }

            // 2. 批次上傳到 "reviews" 子目錄
            List<UploadResult> uploadResults = uploader.upload(images, "reviews");

            // 3. 將上傳結果寫入資料庫
            for (int i = 0; i < images.size(); i++) {
                UploadResult result = uploadResults.get(i);
                ReviewImage reviewImage = new ReviewImage();
                reviewImage.setReviewId(review.getId());
                reviewImage.setOriginalName(sanitizeFileName(images.get(i).getOriginalFilename()));
                reviewImage.setFilePath(result.getUrl());  // 儲存 URL 而非實體路徑
                reviewImageDAO.save(reviewImage);
            }
        }
    }
}
```

---

## 10. 錯誤處理

### 自訂例外層級

```
FileException (abstract)
├── EmptyFileException              - 空檔案
├── FileExtensionIllegalException   - 非法副檔名
├── FileTypeMismatchException       - 類型不符
├── UploadFileTooLargeException     - 檔案過大
├── FileNotExistException           - 檔案不存在
├── NotHavePathException            - 未設定路徑
└── FileUnknownException            - 未知錯誤
```

### 全域例外處理器（節錄檔案相關）

```java
@ControllerAdvice
public class ExceptionHandleController {

    // 檔案超過大小限制
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxUploadSizeExceededException(
            MaxUploadSizeExceededException e) {
        return ResponseEntityBuilder.error(new UploadFileTooLargeException(e)).build();
    }

    // 檔案不存在 → 404
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    @ExceptionHandler(FileNotExistException.class)
    public void handleFileNotExistException(FileNotExistException e) {
        log.error("找不到檔案", e);
    }
}
```

---

## 11. 檔案下載

下載不難，難的是**中文檔名會變亂碼**：

```java
// 1. 解碼 URL 傳來的檔名
String decodedFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8);
Path filePath = Paths.get(fileStorageLocation, date, decodedFileName);

// 2. 轉成 Resource
Resource resource = new UrlResource(filePath.toUri());

// 3. 找不到就回 404
if (!resource.exists()) {
    return ResponseEntity.notFound().build();
}
```

### 處理中文檔名（RFC 5987）

```java
String encodedFilename = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8)
        .replace("+", "%20");

return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename*=UTF-8''" + encodedFilename)
        .body(resource);
```

**關鍵：** `filename*=UTF-8''` 是 RFC 5987 標準，沒加這個，中文檔名下載下來保證變亂碼。

---

## 常見問題

### Q1：為什麼要用 UUID 隨機檔名？

避免檔名衝突與目錄遍歷攻擊。使用者傳 `../../etc/passwd` 時，UUID 檔名完全不受影響。

### Q2：Tika 驗證是做什麼的？

`FileExtensionUtils.verifyRealImageType()` 使用 Apache Tika **讀取檔案內容的真實 MIME type**，而不是只看副檔名。這樣可以防止有人把 `.exe` 改名成 `.jpg` 上傳。

### Q3：如何限制檔案類型？

兩種做法：

```java
// 方法 1：用 ContentType（基本）
String contentType = file.getContentType();
if (!"application/pdf".equals(contentType)) {
    throw new IllegalArgumentException("僅接受 PDF 檔案");
}

// 方法 2：用 Tika 驗證真實類型（進階，防止偽造）
FileExtensionUtils.verifyRealImageType(file); // 會讀取檔案內容
```

### Q4：多檔案上傳？

```java
// Controller 接收
@PostMapping(value = "/upload", consumes = "multipart/form-data")
public ResponseEntity<?> uploadMultiple(@RequestParam("files") List<MultipartFile> files) { ... }

// MultipartFileUploader 批次上傳（支援 parallelStream）
List<UploadResult> results = uploader.upload(files, "reviews");
```

### Q5：上傳的檔案儲存在哪裡？

由 `FileProperties` 的 `server.file.path` 決定，範例中設為 `/data/upload`。對外 URL 則由 `server.file.url` 決定（例如 `/file`）。

---

## 總結

1. **上傳架構**：`Uploader` 介面 → `MultipartFileUploader` 實作 → 注入 Service → Controller 呼叫
2. **檔名安全**：UUID 隨機檔名 + Tika 真實類型驗證
3. **多檔支援**：`parallelStream()` 批次上傳
4. **下載**：`Resource` + RFC 5987 `filename*=UTF-8''` 處理中文
5. **錯誤處理**：`@ControllerAdvice` 統一捕獲檔案例外
6. **設定集中**：`FileProperties` + `@ConfigurationProperties`
