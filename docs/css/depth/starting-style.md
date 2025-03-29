# @starting-style


在CSS中，`@starting-style`是一個新的規則，用於定義元素在首次樣式更新時的初始樣式。這個規則特別適合用於需要過渡效果的元素，例如從`display: none`變為可見的元素、彈出層（如模態框或提示框）等。以下是詳細介紹及範例：

## **用途**
1. **定義初始樣式：** 當元素首次顯示或從`display: none`變為其他狀態時，設定其起始樣式。
2. **實現平滑過渡：** 配合CSS過渡效果（`transition`），讓元素從初始樣式過渡到目標樣式。
3. **適用範圍：** 尤其適合處理彈出層、模態框、動畫進入效果等。

## **語法**
`@starting-style`可以以兩種方式使用：
1. **獨立使用：**
   ```css
   @starting-style {
       選擇器 {
           屬性: 值;
           /* 其他屬性 */
       }
   }
   ```
2. **嵌套在現有規則內：**
   ```css
   選擇器 {
       /* 現有樣式 */
       @starting-style {
           屬性: 值;
           /* 其他屬性 */
       }
   }
   ```

## **範例**
### 範例1：彈出層的淡入效果
```css
/* 定義彈出層的過渡效果 */
.popover {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.5s, transform 0.5s;
}

/* 定義初始樣式 */
@starting-style {
    .popover {
        opacity: 0;
        transform: scale(0.9);
    }
}
```
在此範例中，當`.popover`首次顯示時，會從`opacity: 0`和`transform: scale(0.9)`漸變到目標樣式`opacity: 1`和`transform: scale(1)`。

### 範例2：模態框的進入效果
```css
.dialog {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s, transform 0.5s;
}

@starting-style {
    .dialog {
        opacity: 0;
        transform: translateY(-50px);
    }
}
```
此範例設定模態框進入時的初始位置和透明度，並通過過渡效果讓其平滑顯示。

### 範例3：背景色過渡
```css
#target {
    transition: background-color 1.5s;
    background-color: green;
}

@starting-style {
    #target {
        background-color: transparent;
    }
}
```
此範例讓元素背景色從透明漸變為綠色。

## **注意事項**
- `@starting-style`僅適用於CSS過渡（`transition`），不適用於CSS動畫（`animation`）。
- 初始樣式僅在元素首次渲染或從不可見狀態轉為可見狀態時生效。
- 確保將`@starting-style`放置在目標樣式之後，以避免被覆蓋。

## **瀏覽器支持**
目前支持該規則的瀏覽器版本如下：
| 瀏覽器       | 支持版本 |
|--------------|----------|
| Chrome       | 117      |
| Edge         | 117      |
| Firefox      | 129      |
| Safari       | 17.5     |
| Opera        | 103      |
