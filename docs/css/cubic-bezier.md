# **CSS中的`cubic-bezier`函數**

`cubic-bezier`是CSS中用於定義動畫速度曲線的函數，主要用於`transition`和`animation`屬性中。它通過貝茲曲線來控制動畫的速度變化，使動畫效果更加自然和靈活。

---

## **語法**
```css
cubic-bezier(x1, y1, x2, y2)
```
- **x1, y1, x2, y2**：定義貝茲曲線的兩個控制點，範圍為0到1之間。`x1`和`x2`必須在0到1之間，而`y1`和`y2`可以超出此範圍，以實現特殊效果。

---

## **使用場景**
1. **自定義動畫速度**：取代預設的`ease`、`ease-in`等，實現獨特的動畫效果。
2. **彈跳效果**：通過設置`y`值超出範圍，創造類似彈跳的效果。
3. **平滑過渡**：在元素狀態變化時（如滑鼠懸停），提供更流暢的過渡效果。

---

## **範例**

### 範例1：基本使用
```css
div {
    width: 100px;
    height: 100px;
    background: red;
    transition: width 2s cubic-bezier(0.1, 0.7, 1.0, 0.1);
}

div:hover {
    width: 300px;
}
```
此範例中，當滑鼠懸停時，`div`的寬度會從100px平滑過渡到300px，並以自定義的貝茲曲線速度變化。

---

### 範例2：彈跳效果
```css
span {
    transition: transform 0.3s cubic-bezier(0.3, 0.8, 0.3, 2.3);
}

span:hover {
    transform: translateY(-50px);
}
```
此範例中，`span`元素在滑鼠懸停時會向上移動，並帶有彈跳效果。

---

### 範例3：與`@keyframes`結合
```css
@keyframes slide {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100px);
    }
}

.box {
    animation: slide 2s infinite cubic-bezier(.89,-0.93,.2,1.58);
}
```
此範例中，`.box`元素會以自定義的貝茲曲線速度進行滑動動畫。

---

## **注意事項**
1. **參數範圍**：`x1`和`x2`必須在0到1之間，否則曲線無效。
2. **瀏覽器支持**：所有現代瀏覽器均支持`cubic-bezier`，但建議測試以確保兼容性。
3. **工具輔助**：可以使用在線工具（如cubic-bezier.com）來可視化並生成所需的貝茲曲線參數。
