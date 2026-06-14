---
title: Checkstyle、PMD、Spotless 三工具整合：Gradle 專案程式碼品質自動化 | LucasHsu.dev
description: 在 Gradle Java 專案中整合 Spotless（格式自動化）、Checkstyle（命名與結構檢查）、PMD（潛在錯誤偵測），建立完整的程式碼品質檢查流水線。
head:
  - - meta
    - name: keywords
      content: Gradle, Spotless, Checkstyle, PMD, Java, googleJavaFormat, 程式碼品質, 靜態分析, GitHub Actions, pre-commit
  - - meta
    - property: og:title
      content: Checkstyle、PMD、Spotless 三工具整合：Gradle 程式碼品質自動化
  - - meta
    - property: og:description
      content: 在 Gradle Java 專案整合 Spotless、Checkstyle、PMD，建立完整的程式碼品質檢查流水線。
  - - meta
    - property: og:type
      content: article
---

# Checkstyle、PMD、Spotless：Gradle 專案的程式碼品質三劍客

> 💡 一句話總結：Spotless 管排版，Checkstyle 管命名和結構，PMD 管潛在 Bug。提交前跑一遍，比 code review 抓得快十倍。

這一篇會學到的

1. 三個工具的職責分工跟怎麼搭配
2. 在單一模組跟多模組 Gradle 專案中啟用它們
3. Spotless 如何自動修正格式、排序 import、加上版權宣告
4. Checkstyle 怎麼檢查命名、Javadoc、import 規範
5. PMD 怎麼找出空的 catch、未用變數、Boolean 反轉這些地雷
6. 完整的 pre-commit 執行順序跟 CI/CD 整合
7. 常見的踩雷跟解法

---

## 三工具的職責分工

先搞清楚這三兄弟各管什麼事：

| 工具 | 檢查範圍 | 類比 |
|------|---------|------|
| **Spotless** | 縮排、換行、空白、import 順序、檔案結尾 | 排版師 |
| **Checkstyle** | 命名規則、Javadoc、import 管理、程式碼結構 | 校稿員 |
| **PMD** | 空 catch、未用變數、Boolean 反轉、資源未關閉 | 偵探 |

> 排版師（Spotless）讓每一頁格式都一致；校稿員（Checkstyle）檢查用字遣詞；偵探（PMD）翻遍每個角落，找出「看起來沒事但會出事的程式碼」。

Spotless 只管**格式**，不改邏輯。Checkstyle 管的是**風格與規範**——命名對不對、Javadoc 有沒有寫、import 亂不亂。PMD 深入到**潛在的錯誤風險**——catch block 空的、Boolean 判斷反過來寫、資源忘了關。

---

## 在 build.gradle 啟用

### 單一模組

```gradle
plugins {
    id 'java'
    id 'checkstyle'
    id 'pmd'
    id 'com.diffplug.spotless' version '6.25.0'
}
```

### 多模組

在 `subprojects` 統一套用：

```gradle
subprojects {
    apply plugin: 'java'
    apply plugin: 'checkstyle'
    apply plugin: 'pmd'
    apply plugin: 'com.diffplug.spotless'

    spotless {
        java {
            googleJavaFormat()
            removeUnusedImports()
        }
    }
    checkstyle {
        toolVersion = '10.12.5'
    }
    pmd {
        toolVersion = '7.0.0'
    }
}
```

> 💡 如果某個子模組不需要檢查，用 `targetExclude 'build/**'` 排除即可。

### 版本相容性

| 工具 | 版本 | 最低 JDK |
|------|------|---------|
| Spotless | 6.25.0 | JDK 11 |
| Checkstyle | 10.12.5 | JDK 11 |
| PMD | 7.0.0 | JDK 17 |

:::tip 💡 PMD 7.0.0 需要 JDK 17 以上。如果你的專案還在 JDK 11，改用 PMD 6.55.0。
:::

---

## Spotless — 格式自動化

Spotless 不是幫你「檢查格式」，而是直接**改給你看**。

> 如果你還在手動對齊縮排，2026 年了，讓機器幫你做好嗎？

### 基本設定

```gradle
spotless {
    java {
        googleJavaFormat()        // 使用 Google Java Format
        removeUnusedImports()     // 移除未使用的 import
        trimTrailingWhitespace()  // 移除行尾多餘空白
        endWithNewline()          // 確保檔案結尾有換行
    }
}
```

### importOrder — 自訂 import 分組

```gradle
spotless {
    java {
        googleJavaFormat()
        removeUnusedImports()
        importOrder(
            'java',
            'javax',
            'org.springframework',
            'org',
            'com',
            '',
            '\\#'
        )
    }
}
```

這樣會產出乾淨的分組：

```java
import java.util.List;

import javax.persistence.Entity;

import org.springframework.stereotype.Service;

import com.lucashsu.demo.service.OrderService;

import static java.util.Collections.emptyList;
```

### licenseHeader — 自動版權宣告

```gradle
spotless {
    java {
        licenseHeader('/*\n * Copyright (C) $YEAR LucasHsu.dev\n * All rights reserved.\n */\n')
    }
}
```

> `$YEAR` 會自動替換成當年度，不怕版權年份過期。

### 指令

```bash
# 只檢查，不改檔案（給 CI 用）
./gradlew spotlessCheck

# 自動修正所有格式問題（給開發者用）
./gradlew spotlessApply
```

---

## Checkstyle — 命名與結構檢查

Checkstyle 只管**抱怨**，不會自動幫你改。但這些抱怨是 gold dust。

> 用星號 import 的人，不是天才就是懶惰。Checkstyle：我不管，總之不行。

### Gradle 設定

```gradle
checkstyle {
    toolVersion = '10.12.5'
    ignoreFailures = false
    maxWarnings = 0
    configFile = file('config/checkstyle/checkstyle.xml')
}
```

| 參數 | 說明 |
|------|------|
| `toolVersion` | 鎖定版本，不要用預設 |
| `ignoreFailures` | `true` 只警告不擋 build，不建議 |
| `maxWarnings` | 容許的 warning 數，設 0 就是零容忍 |
| `configFile` | 規則檔路徑，預設抓 `config/checkstyle/checkstyle.xml` |

### checkstyle.xml 完整範例

放在 `config/checkstyle/checkstyle.xml`：

```xml
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
    "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
    "https://checkstyle.org/dtds/configuration_1_3.dtd">
<module name="Checker">
    <property name="charset" value="UTF-8"/>
    <property name="severity" value="warning"/>

    <module name="FileLength">
        <property name="max" value="500"/>
    </module>
    <module name="LineLength">
        <property name="max" value="120"/>
    </module>

    <module name="TreeWalker">

        <!-- 命名規範 -->
        <module name="TypeName"/>
        <module name="MethodName"/>
        <module name="LocalVariableName"/>
        <module name="MemberName"/>
        <module name="ParameterName"/>
        <module name="ConstantName"/>

        <!-- import 管理 -->
        <module name="AvoidStarImport"/>
        <module name="UnusedImports"/>
        <module name="ImportOrder">
            <property name="groups" value="java,javax,org,com"/>
            <property name="separated" value="true"/>
        </module>

        <!-- Javadoc -->
        <module name="JavadocType"/>
        <module name="JavadocMethod">
            <property name="accessModifiers" value="public"/>
        </module>
        <module name="JavadocVariable">
            <property name="scope" value="public"/>
        </module>

        <!-- 大小限制 -->
        <module name="MethodLength">
            <property name="max" value="50"/>
        </module>
        <module name="ParameterNumber">
            <property name="max" value="5"/>
        </module>

        <!-- 壞味道 -->
        <module name="EmptyCatchBlock"/>
        <module name="MagicNumber">
            <property name="ignoreNumbers" value="-1,0,1,2"/>
        </module>

    </module>
</module>
```

### 指令與忽略規則

```bash
./gradlew checkstyleMain    # production
./gradlew checkstyleTest    # 測試
```

想跳過特定類別？加上註解：

```java
// CHECKSTYLE:OFF
public class ComplexParser {
    // 這裡不會被檢查
}
// CHECKSTYLE:ON
```

> ❌ 適度使用就好，不要整支檔案都 OFF。

---

## PMD — 潛在錯誤與效能

PMD 是你程式碼的 X 光機。它不管命名跟排版，只在乎會不會**出錯**。

> PMD 找到的問題不一定馬上爆炸，但到了 production 才爆就來不及了。

### Gradle 設定

```gradle
pmd {
    consoleOutput = true
    toolVersion = '7.0.0'
    rulesMinimumPriority = 5
    ruleSets = []
    ruleSetConfig = file('config/rulesets/pmd-ruleset.xml')
}
```

> ❌ `ruleSets` 要設為 `[]`，否則會跟自訂規則集衝突。

### 規則分類

| 分類 | 抓什麼 | 經典案例 |
|------|--------|---------|
| `errorprone` | 明顯的程式錯誤 | 空的 catch block、try-with-resources 沒關資源 |
| `bestpractices` | 違反最佳實務 | 未使用的 private 方法、沒必要的變數 |
| `performance` | 效能疑慮 | 在迴圈裡 new 物件、不必要 Boolean 建構 |
| `design` | 設計問題 | 過長的方法、過多參數、不必要的 if 巢狀 |

### pmd-ruleset.xml 完整範例

放在 `config/rulesets/pmd-ruleset.xml`：

```xml
<?xml version="1.0"?>
<ruleset name="Custom PMD Rules"
    xmlns="http://pmd.sourceforge.net/ruleset/2.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://pmd.sourceforge.net/ruleset/2.0.0
        https://pmd.sourceforge.io/ruleset_2_0_0.xsd">

    <description>自訂 PMD 規則集</description>

    <rule ref="category/java/errorprone.xml">
        <exclude name="DataflowAnomalyAnalysis"/>
    </rule>
    <rule ref="category/java/bestpractices.xml"/>
    <rule ref="category/java/performance.xml"/>
    <rule ref="category/java/design.xml">
        <exclude name="LawOfDemeter"/>
        <exclude name="DataClass"/>
        <exclude name="Lombok"/>
    </rule>
</ruleset>
```

### PMD 抓什麼？

**空的 catch block：**

```java
try {
    // 做某事
} catch (Exception e) {
    // ❌ 異常被吞掉了
}
```

**未使用變數：**

```java
public String process(Order order) {
    String temp = order.getName();  // ❌ 宣告了沒用
    return order.getStatus();
}
```

**不必要的 Boolean 判斷：**

```java
// ❌ 直接 return condition 就好
if (condition == true) return true; else return false;

// ✅
return condition;
```

**未關閉資源：**

```java
// ❌ InputStream 用完沒關
InputStream is = new FileInputStream("data.txt");

// ✅ try-with-resources
try (InputStream is = new FileInputStream("data.txt")) {
    // ...
}
```

### 指令

```bash
./gradlew pmdMain
./gradlew pmdTest
```

---

## 執行順序

### 為什麼 Spotless 要先跑？

Spotless 會**改檔案**，Checkstyle 跟 PMD 都是**讀檔案**。先跑 Checkstyle 再跑 Spotless，Checkstyle 的結果就過期了。

> 先排版、再校稿、最後偵探查案。跟出版社出書的流程一模一樣。

### 建議的 pre-commit 流程

```bash
# 1. 自動修正格式
./gradlew spotlessApply

# 2. 確認格式已通過
./gradlew spotlessCheck

# 3. Checkstyle 檢查
./gradlew checkstyleMain checkstyleTest

# 4. PMD 檢查
./gradlew pmdMain pmdTest

# 5. 測試
./gradlew test
```

Windows PowerShell：

```powershell
.\gradlew.bat spotlessApply
.\gradlew.bat checkstyleMain
.\gradlew.bat pmdMain
.\gradlew.bat test
```

### 包成 custom task

```gradle
tasks.register('qualityCheck') {
    dependsOn 'spotlessApply', 'spotlessCheck',
              'checkstyleMain', 'checkstyleTest',
              'pmdMain', 'pmdTest', 'test'
    description = '執行所有程式碼品質檢查'
    group = 'verification'
}
```

之後只要：

```bash
./gradlew qualityCheck
```

---

## CI/CD 整合

CI 是最後一道防線。開發者可以在本機偷懶不跑，推到 GitHub 就一定會被執行。

### GitHub Actions

```yaml
name: Code Quality Check

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: gradle
      - name: Validate Gradle wrapper
        uses: gradle/actions/wrapper-validation@v3
      - name: Format Check
        run: ./gradlew spotlessCheck
      - name: Checkstyle
        run: ./gradlew checkstyleMain
      - name: PMD
        run: ./gradlew pmdMain
      - name: Run Tests
        run: ./gradlew test
```

> 💡 CI 只用 `spotlessCheck` 不用 `spotlessApply`，因為 CI 只判斷對錯，不應該改檔案。

---

## 常見問題

### ❌ 「Task not found」

```text
Task 'spotlessCheck' not found in root project
```

plugin 沒套用。確認你在執行指令的模組有 `apply plugin`。

### ❌ Spotless 通過但 build 失敗

```text
> Task :spotlessCheck PASSED
> Task :checkstyleMain FAILED
```

正常。三個工具各自獨立，**通過一個不代表通過全部**。

### ❌ checkstyle.xml 找不到

```text
Unable to create a Checker: cannot initialize module TreeWalker
```

確認 `config/checkstyle/checkstyle.xml` 路徑正確。放在其他地方要指定 `configFile`。

### ❌ Windows line ending 衝突

```text
Line endings don't match expected style
```

Windows 用 `CRLF`，Google Java Format 預設用 `LF`。

解法 — Git 設定：

```bash
git config --global core.autocrlf true
```

解法 — Spotless 明確指定：

```gradle
spotless {
    java {
        googleJavaFormat()
        endWithNewline()
        indentWithSpaces(4)
    }
}
```

### ✅ 新專案快速檢查

1. `build.gradle` 有套用三個 plugin
2. `config/checkstyle/checkstyle.xml` 存在
3. `config/rulesets/pmd-ruleset.xml` 存在
4. `./gradlew spotlessCheck` 可執行
5. `./gradlew checkstyleMain` 可執行
6. `./gradlew pmdMain` 可執行
7. CI 設定已加入（`.github/workflows/`）

:::tip 💡 最後的建議
這三個工具是成本最低、效益最高的程式碼品質投資。設定好之後，每次 `./gradlew build` 都會自動檢查。少做好幾年無謂的 code review 排版爭論，專注在真正的邏輯問題上。
:::
