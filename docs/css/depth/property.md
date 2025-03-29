# @property

CSS中的`@property`是一個強大的規則，用於擴展和控制自定義屬性（CSS變數）的功能。它允許開發者定義自定義屬性的類型、初始值以及是否繼承，並使這些屬性可以進行動畫化。以下是詳細介紹及範例：

## **@property的用途**
1. **定義類型**：使用`syntax`來指定自定義屬性的類型，例如``、``或``，避免不正確的值被使用。
2. **設置初始值**：使用`initial-value`為自定義屬性提供默認值，當屬性未被明確設置時會使用此值。
3. **控制繼承**：通過`inherits`來決定屬性是否從父元素繼承。
4. **支持動畫**：使某些以前無法動畫化的屬性（如顏色漸變）可以平滑過渡。

---

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

---

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