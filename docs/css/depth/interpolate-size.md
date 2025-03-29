# interpolate-size

`interpolate-size: allow-keywords` 是 CSS 中的一個實驗性功能，主要用於控制動畫或過渡中尺寸屬性的插值行為，特別是在使用內在尺寸關鍵字（如 `auto`、`fit-content`、`min-content` 等）時。以下是其主要用途：

## **用途**
1. **支援內在尺寸關鍵字的動畫**  
   傳統 CSS 動畫無法直接處理 `height: auto` 或 `width: auto` 等關鍵字，而 `interpolate-size: allow-keywords` 允許在這些關鍵字與固定尺寸（如 ``）之間進行平滑過渡。

2. **實現展開/收起效果**  
   用於創建元素從隱藏（如 `height: 0`）到展開（如 `height: auto`）的平滑過渡效果，常見於彈出層、模態框或下拉菜單等場景。

3. **提升動畫的自然度**  
   使動畫在固定尺寸與內在尺寸之間過渡時更加流暢，避免傳統動畫中尺寸突然跳變的問題。

4. **支援更多動畫場景**  
   在無法使用非盒子模型屬性（如 `transform`）的情況下，提供一種替代方案來實現複雜的動畫效果。

---

## **範例**
以下是一個簡單範例，展示如何使用 `interpolate-size: allow-keywords` 實現從 `height: 0` 到 `height: auto` 的平滑過渡：

```css
:root {
  interpolate-size: allow-keywords; /* 啟用內在尺寸關鍵字的插值 */
}

.box {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
}

.box:hover {
  height: auto; /* 從 0 過渡到 auto */
}
```

### **效果說明**
- 當滑鼠懸停在 `.box` 元素上時，其高度會從 `0` 平滑過渡到 `auto`，顯示全部內容。
- `interpolate-size: allow-keywords` 確保了 `height: auto` 可以被正確過渡，而不是像傳統 CSS 過渡那樣直接跳變。

---

## **注意事項**
1. **實驗性功能**  
   目前 `interpolate-size` 仍處於實驗階段，並非所有瀏覽器都支持。在使用前需檢查瀏覽器兼容性。

2. **適用範圍**  
   僅支援從固定尺寸（如 `100px`）到內在尺寸（如 `auto`）的過渡，不支援兩個內在尺寸之間的過渡。

3. **繼承性**  
   `interpolate-size` 是繼承屬性，可通過在 `:root` 或特定容器上設置來控制其作用範圍。

---

## **總結**
`interpolate-size: allow-keywords` 為 CSS 動畫提供了更強大的功能，特別是在處理內在尺寸關鍵字時，能夠實現更自然和流暢的過渡效果。雖然它仍處於實驗階段，但在支持的瀏覽器中，它可以顯著提升動畫的表現力。