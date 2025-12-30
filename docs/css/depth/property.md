# @property

> 📝 TL;DR
- 定義 CSS 變數型別/初始值/繼承性，讓自訂屬性可動畫。
- 關鍵欄位：`syntax`、`inherits`、`initial-value`。
- 常見用途：可動畫色彩/長度/角度、自訂旋轉/漸層停駐點。

CSS中的`@property`是一個強大的規則，用於擴展和控制自定義屬性（CSS變數）的功能。它允許開發者定義自定義屬性的類型、初始值以及是否繼承，並使這些屬性可以進行動畫化。以下是詳細介紹及範例：

## **@property的用途**
1. **定義類型**：使用`syntax`來指定自定義屬性的類型，例如``、``或``，避免不正確的值被使用。
2. **設置初始值**：使用`initial-value`為自定義屬性提供默認值，當屬性未被明確設置時會使用此值。
3. **控制繼承**：通過`inherits`來決定屬性是否從父元素繼承。
4. **支持動畫**：使某些以前無法動畫化的屬性（如顏色漸變）可以平滑過渡。

## **語法**
```css
@property  {
    syntax: '';
    inherits: ;
    initial-value: ;
}
```

- ``：自定義屬性的名稱，必須以`--`開頭。
- `syntax`：指定屬性接受的數據類型，例如``、``等。
- `inherits`：設置是否從父元素繼承值，默認為`true`。
- `initial-value`：指定屬性的初始值。

## **範例**

### 範例1：定義顏色屬性並應用
```css
@property --main-color {
    syntax: '';
    inherits: false;
    initial-value: #ff0000;
}

.box {
    background-color: var(--main-color);
}
```
在此範例中，自定義屬性`--main-color`被定義為顏色類型，初始值為紅色（#ff0000），且不會從父元素繼承。

---

### 範例2：動畫化角度屬性
```css
@property --rotation {
    syntax: '';
    inherits: false;
    initial-value: 0deg;
}

.star {
    --rotation: 0deg;
    transform: rotate(var(--rotation));
    animation: spin 2s linear infinite;
}

@keyframes spin {
    to {
        --rotation: 360deg;
    }
}
```
此範例中，自定義屬性`--rotation`被設置為角度類型（），並用於動畫化旋轉效果。

---

### 範例3：控制繼承行為
```css
@property --box-color {
    syntax: '';
    inherits: false;
    initial-value: cornflowerblue;
}

.parent {
    --box-color: green;
    background-color: var(--box-color);
}

.child {
    background-color: var(--box-color);
}
```
因為在`@property`中設置了`inherits: false;`，子元素`.child`不會繼承父元素`.parent`的顏色，而是使用初始值（cornflowerblue）。

## 實戰練習

### 練習 1：可動畫色彩（簡單）⭐
> 定義 `--accent` 為 color，並在 hover 時平滑過渡。

:::details 💡 參考答案
```css
@property --accent {
    syntax: '<color>';
    inherits: false;
    initial-value: #0af;
}

.btn {
    --accent: #0af;
    background: var(--accent);
    transition: --accent .3s ease;
}
.btn:hover { --accent: #f40; }
```
:::

### 練習 2：自訂旋轉角度（簡單）⭐
> 用 `--rot` 驅動旋轉動畫。

:::details 💡 參考答案
```css
@property --rot {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

.spinner {
    animation: spin 2s linear infinite;
    transform: rotate(var(--rot));
}

@keyframes spin {
    to { --rot: 360deg; }
}
```
:::

### 練習 3：漸層停駐點動畫（中等）⭐⭐
> 讓漸層停駐點自訂屬性可動畫。

:::details 💡 參考答案與提示
```css
@property --stop {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 30%;
}

.banner {
    --stop: 30%;
    background: linear-gradient(135deg, #6cf 0%, #6cf var(--stop), #f9c 100%);
    animation: sweep 3s ease-in-out infinite alternate;
}

@keyframes sweep {
    to { --stop: 70%; }
}
```
**提示**：使用 `<percentage>` 讓 stop 值可動畫。
:::

## FAQ
- Q: 舊瀏覽器不支援怎麼辦？
    - A: 可加 `@supports (property-name: --x)` 判斷，或退回未動畫的變數方案。
- Q: `syntax` 忘記設會怎樣？
    - A: 無法動畫且可能被忽略，務必指定型別。
- Q: 為何要 `inherits: false`？
    - A: 避免父層覆蓋子層自訂效果，特別是多個元件共享時。