---
outline: "deep"

head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: java-scanner, java-string-args, java-輸入, java-命令列參數, java-動態輸入, java-main-參數, java-Scanner-教學, java-args-用法, java-新手教學, java-輸入差異
  - - meta
    - name: og:title
      content: Day02 - 命令列參數與動態輸入教學
  - - meta
    - name: og:description
      content: Java Scanner-和 String[] args-有什麼不同？本篇說明兩種輸入方式的用途、差異、範例與適用情境，幫助新手理解命令列參數與動態輸入的正確用法，避免常見混淆。
  - - meta
    - name: og:type
      content: article
  - - meta
    - name: og:image
      content: ../assets/java-cover.png
---

# Scanner 和 String[] args

`Scanner` 和 `String[] args` 是兩種不同的輸入方式，用途完全不同：

## String[] args 的用途
- **命令行參數**：在程序啟動時就傳遞給程序的參數
- **靜態輸入**：程序開始執行前就已經確定的值
- **使用方式**：
```bash
java A hello world
```
這時 `args[0]` = "hello"，`args[1]` = "world"

## Scanner 的用途  
- **動態輸入**：程序運行過程中與用戶互動獲取輸入
- **實時輸入**：程序會暫停等待用戶輸入
- **使用方式**：程序運行後，用戶在控制台輸入內容

## 比較範例

**使用命令行參數：**
````java
public static void main(String[] args) {
    if (args.length > 0) {
        System.out.println("Hello " + args[0]);
    }
}
````

**使用 Scanner：**
````java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.print("請輸入名字：");
    String input = scanner.nextLine();
    System.out.println("Hello " + input);
    scanner.close();
}
````

## 為什麼兩者都存在？
- `String[] args` 是 Java main 方法的**[固定簽名](./什麼是固定簽名)**，即使不使用也必須存在
- `Scanner` 是為了動態互動而額外添加的功能
- 它們可以同時使用，服務不同的輸入需求

`String[] args` 雖然沒有被使用，但它是 main 方法必需的參數。
