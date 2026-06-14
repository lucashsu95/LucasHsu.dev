---
title: Spring Boot Word 檔案下載 | LucasHsu.dev
description: 使用 poi-tl 與 Apache POI 在 Spring Boot 中實作 Word 檔案下載，包含模板渲染、自訂 Policy、中文檔名處理。
head:
  - - meta
    - name: keywords
      content: Spring Boot, poi-tl, Apache POI, Word 模板, 檔案下載, Java
  - - meta
    - property: og:title
      content: Spring Boot Word 檔案下載 | LucasHsu.dev
  - - meta
    - property: og:description
      content: 使用 poi-tl 在 Spring Boot 實作 Word 檔案下載，模板渲染與中文檔名處理。
  - - meta
    - property: og:type
      content: article
---

# Spring Boot Word 檔案下載

> 📝 TL;DR：用 `poi-tl` 作為 Word 模板引擎，在 `.docx` 中使用 `{{變數}}` 佔位符，搭配 Apache POI 與 `HttpServletResponse` 輸出檔案，注意中文檔名需 URL 編碼。

## 1. 使用的核心套件

### 1.1 主要依賴套件

```groovy
// build.gradle
implementation 'com.deepoove:poi-tl:1.12.2'  // Word 模板渲染引擎
implementation 'org.apache.poi:poi:5.2.3'     // Apache POI (操作 Office 文件)
implementation 'org.apache.poi:poi-ooxml:5.2.3'
```

**套件說明：**

- **poi-tl**：基於 Apache POI 的 Word 模板引擎，支援動態數據綁定
- **Apache POI**：Java 操作 Microsoft Office 文件的基礎函式庫

---

## 2. 工作原理

### 2.1 整體流程圖

```
使用者請求下載
    ↓
Controller 接收請求
    ↓
Service 準備數據
    ↓
讀取 Word 模板 (.docx)
    ↓
使用 poi-tl 渲染數據到模板
    ↓
生成最終 Word 文件
    ↓
透過 HttpServletResponse 輸出給使用者
```

### 2.2 核心機制

**模板渲染機制：**

- 在 Word 模板中使用 `{{變數名稱}}` 作為佔位符
- poi-tl 會將數據 Map 中的值替換到對應佔位符
- 支援表格、圖片、列表等複雜結構的動態渲染

**範例：**

```java
// 模板中: {{caseName}}
// 數據: Map.of("caseName", "個資查核案件")
// 結果: Word 中顯示 "個資查核案件"
```

---

## 3. 需要準備的東西

### 3.1 Word 模板檔案

**位置：** `resources/template/`

專案模板範例：

- `inspectCase.docx` - 檢查案件模板
- `inspectCaseTemp.docx` - 臨時檢查模板
- `inspectCaseResponse.docx` - 回應模板

**模板範例結構：**

```
受檢單位: {{businessName}}
填寫日期: {{applyDate}}

{{table}} ← 動態表格佔位符
```

### 3.2 自定義渲染策略 (Policy)

針對複雜的表格渲染，需要自定義 Policy：

- `TemplateInspectCase.java` - 檢查案件表格渲染
- `TemplateResponse.java` - 回應表格渲染
- `TemplateTemp.java` - 臨時模板渲染

---

## 4. 實作步驟

### 步驟 1：建立 Word 模板

1. 使用 Microsoft Word 建立 `.docx` 檔案
2. 在需要動態內容的地方插入佔位符：`{{變數名}}`
3. 儲存到 `resources/template/` 目錄

### 步驟 2：建立工具類別

```java
public class ExportUtils {

    /**
     * 單個 Word 文件下載
     */
    public static void export(String filePath, Configure config,
            Map<String, Object> dataMap,
            String fileName,
            HttpServletResponse response) {
        try {
            // 1. 讀取模板
            Resource resource = new ClassPathResource(filePath);
            File file = resource.getFile();

            // 2. 編譯並渲染模板
            XWPFTemplate template = XWPFTemplate
                .compile(file, config)
                .render(dataMap);

            // 3. 設定回應標頭
            response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            response.setHeader("content-disposition",
                "attachment;filename=" + URLEncoder.encode(fileName, StandardCharsets.UTF_8) + ".docx");

            // 4. 輸出到響應流
            OutputStream out = response.getOutputStream();
            BufferedOutputStream bos = new BufferedOutputStream(out);
            template.write(bos);
            bos.flush();
            out.flush();

            PoitlIOUtils.closeQuietlyMulti(template, bos, out);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

### 步驟 3：在 Controller 中實作下載端點

```java
@RestController
@RequestMapping(path = "inspectCase")
public class InspectCaseController {

    @GetMapping(path = "/download")
    public void download(@RequestParam(name = "caseNos") List<Integer> caseNos,
            HttpServletResponse response) {

        // 1. 定義模板路徑
        String filePath = "/template/inspectCase.docx";

        // 2. 配置自定義渲染策略
        Configure config = Configure.builder()
            .bind("inspectCase", new TemplateInspectCase())
            .bind("table", new TemplateRecord())
            .build();

        // 3. 準備數據
        InspectCaseBean bean = inspectCaseService.findByCaseNo(caseNos.get(0));

        Map<String, Object> dataMap = new HashMap<>() {{
            put("inspectCase", bean);
            put("table", temp);
            put("header", bean.getTgNo());
        }};

        // 4. 執行下載
        ExportUtils.export(filePath, config, dataMap, bean.getCaseName(), response);
    }
}
```

---

## 5. 快速開始清單

### 第一步：添加依賴

```groovy
dependencies {
    implementation 'com.deepoove:poi-tl:1.12.2'
    implementation 'org.apache.poi:poi:5.2.3'
    implementation 'org.apache.poi:poi-ooxml:5.2.3'
}
```

### 第二步：建立目錄結構

```
src/main/
├── resources/
│   └── template/          ← 放置 Word 模板
│       └── myTemplate.docx
└── java/.../
    └── util/word/
        ├── ExportUtils.java
        └── CustomTablePolicy.java
```

### 第三步：實作 Controller

```java
@GetMapping("/download")
public void downloadWord(HttpServletResponse response) {
    String templatePath = "/template/myTemplate.docx";
    Configure config = Configure.builder().build();

    Map<String, Object> data = new HashMap<>();
    data.put("title", "我的文件");
    data.put("content", "這是內容");

    ExportUtils.export(templatePath, config, data, "檔名", response);
}
```

---

## 6. 常見問題解決

### Q1：模板找不到？

```java
// ✓ 正確
String filePath = "/template/myTemplate.docx";

// ✗ 錯誤
String filePath = "template/myTemplate.docx";
```

### Q2：中文檔名亂碼？

```java
String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
response.setHeader("content-disposition",
    "attachment;filename=" + encodedFileName + ".docx");
```

### Q3：下載多個檔案？

```java
public static void exportZip(String filePath, Configure config,
        List<Map<String, Object>> dataMaps,
        List<String> fileNames,
        HttpServletResponse response) {
    response.setContentType("application/zip");
    // ... ZIP 打包邏輯
}
```

---

## 7. 進階技巧

### 條件式渲染

```java
data.put("showSection", true);
data.put("sectionContent", "僅在條件為真時顯示");
```

Word 模板：
```
{{?showSection}}
{{sectionContent}}
{{/showSection}}
```

### 循環列表

```java
List<Map<String, String>> items = Arrays.asList(
    Map.of("name", "項目1", "value", "100"),
    Map.of("name", "項目2", "value", "200")
);
data.put("items", items);
```

Word 模板：
```
{{#items}}
- {{name}}: {{value}}
{{/items}}
```

---

## 8. 參考資源

- **poi-tl 官方文檔**：http://deepoove.com/poi-tl/
- **Apache POI 文檔**：https://poi.apache.org/

---

## 總結

**關鍵要點：**

1. 使用 `poi-tl` 作為模板引擎
2. Word 模板使用 `{{變數}}` 標記
3. 透過 `Configure` 綁定自定義渲染策略
4. 使用 `HttpServletResponse` 輸出檔案
5. 複雜表格需要繼承 `DynamicTableRenderPolicy`

**最小可用配置：**

```java
// 1. 依賴
implementation 'com.deepoove:poi-tl:1.12.2'

// 2. 模板
resources/template/my.docx (含 {{name}})

// 3. 代碼
ExportUtils.export("/template/my.docx",
    Configure.builder().build(),
    Map.of("name", "值"),
    "檔名", response);
```
