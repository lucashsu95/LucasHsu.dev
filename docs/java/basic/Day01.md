---
output: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java, 新手上路, 安裝教學, 變數
  - - meta
    - name: og:title
      content: Java 新手上路 Day1 - 安裝教學｜基礎程式範例
  - - meta
    - name: og:description
      content: 學習如何安裝Java、設置開發環境，還有基礎程式範例，輸入輸出函數
  - - meta
    - name: og:type
      content: article
---

# Java 新手上路 Day1｜安裝教學｜型態

「安裝 Java 開發環境」與「基礎程式範例」。內容以 Windows 系統為主，Mac/Linux 安裝方式類似，但設定步驟略有不同。

## 安裝教學

### **1. 什麼是 JDK 和 JRE？**

- **JRE（Java Runtime Environment）**：執行 Java 程式所需的環境，一般使用者安裝即可。
- **JDK（Java Development Kit）**：開發 Java 程式所需的工具包，包含編譯器（javac）、執行器（java）等。開發者必須安裝 JDK。

---

### **2. 下載與安裝 JDK**

1. **前往 Oracle 官方網站下載 JDK**
   - 進入 Oracle Java 下載頁面，選擇適合你作業系統的 JDK（如 Windows x64 Installer）。
   - 推薦選擇長期支援版本（LTS）：JDK 8、JDK 11、JDK 17。

2. **執行安裝程式**
   - 下載後，雙擊安裝檔（如 `jdk-17.0.x_windows-x64_bin.exe`）。
   - 依照指示點選「下一步」，建議使用預設安裝路徑（如 `C:\Program Files\Java\jdk-17.0.x`）。

也可以使用[chocolatey](https://chocolatey.org/install)
```bash
choco install openjdk11 -y
```

---

### **3. 設定環境變數**

1. **設定 JAVA_HOME**
   - 按 `Win + R`，輸入 `sysdm.cpl`，開啟「系統內容」視窗。
   - 點選「進階」→「環境變數」。
   - 在「系統變數」區，點「新增」，輸入：
     - 變數名稱：`JAVA_HOME`
     - 變數值：JDK安裝路徑，如 `C:\Program Files\Java\jdk-17.0.x`。

2. **編輯 Path 變數**
   - 在「系統變數」找到 `Path`，點「編輯」。
   - 新增 `%JAVA_HOME%\bin` 到 Path 變數中。

### **4. 測試安裝是否成功**

1. **開啟命令提示字元**
   - 按 `Win + R`，輸入 `cmd`，按 Enter。
2. **輸入指令測試**
   - 輸入 `java -version`，顯示 Java 版本代表 JRE 安裝成功。
   - 輸入 `javac -version`，顯示編譯器版本代表 JDK 安裝成功。

---

### 開始寫你的第一個 Java 程式

1. **建立檔案**
   - 用記事本或 VS Code 等編輯器，建立 `HelloWorld.java` 檔案。
   - 輸入以下內容：
     ```java
     public class HelloWorld {
         public static void main(String[] args) {
             System.out.println("Hello, Java!");
         }
     }
     ```
2. **編譯與執行**
   - 在命令提示字元，切換到檔案所在目錄。
   - 輸入 `javac HelloWorld.java` 編譯。
   - 輸入 `java HelloWorld` 執行，看到輸出 `Hello, Java!` 即成功。

- **安裝 JDK**：下載、執行安裝程式、設定環境變數。
- **測試安裝**：輸入 `java -version` 和 `javac -version` 確認。
- **開始寫程式**：編輯、編譯、執行你的第一個 Java 程式。

## 基礎程式範例
### **1. 輸入與輸出**

**輸入 (Input)**
Java 需要透過 `Scanner` 來取得使用者輸入：

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("請輸入一些字: ");
        String input = scanner.nextLine(); // 取得一行輸入
        System.out.println("你輸入的是: " + input);
    }
}
```
- `scanner.nextLine()`：取得一行輸入。
- `scanner.next()`：取得一個字串（遇到空白會停止）。
- `scanner.nextInt()`、`scanner.nextDouble()`：取得整數或浮點數。

**輸出 (Output)**
Java 使用 `System.out.println()` 來輸出內容：

```java
System.out.println("Hello, World!");
System.out.print("不換行"); // 不換行
System.out.println("換行");
```

---

### **2. 變數與型態**

Java 是強型別語言，宣告變數時必須指定型態：

```java
int intVal = 10;
double doubleVal = 12.3;
String strVal = "Hello Java";
boolean booleanVal = true;
char charVal = 'A';
```
- `int`：整數
- `double`：浮點數
- `String`：字串（注意：Java 字串是不可變的）
- `boolean`：布林值（true/false）
- `char`：字元

**型態檢查**
Java 沒有像 Python 的 `type()`，但可以用 `instanceof` 檢查物件型態：

```java
System.out.println(strVal instanceof String); // true
```
（對於基本型態，無法直接檢查，但變數型態是固定的）

---

### **3. 數學運算子**

Java 支援多種數學運算：

| 運算子 | 說明         |
|--------|------------|
| +      | 加法        |
| -      | 減法        |
| *      | 乘法        |
| /      | 除法        |
| %      | 取餘數      |
| ++     | 遞增        |
| --     | 遞減        |

```java
int a = 10, b = 3;
System.out.println(a + b); // 13
System.out.println(a - b); // 7
System.out.println(a * b); // 30
System.out.println(a / b); // 3（整數除法）
System.out.println(a % b); // 1
```

---

### **4. 比較運算子**

Java 比較運算子與 Python 類似：

| 運算子 | 說明           |
|--------|--------------|
|       | 大於          |
| >=     | 大於等於       |
| ==     | 等於          |
| !=     | 不等於        |

```java
System.out.println(10 `、`>=`、`==`、`!=`)
- **邏輯運算**：`&&`、`||`、`!`
```