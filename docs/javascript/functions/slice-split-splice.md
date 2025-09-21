---
outline: "deep"
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: JavaScript,slice,split,splice
  - - meta
    - property: og:title
      content: 搞懂slice,split,splice｜JavaScript
  - - meta
    - property: og:description
      content: slice()、splice()、split()在處理Array、String時會很常用到，本單元就會一一介紹如何使用
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# slice,split,splice分不清

## 字串操作

1. `substr(from, ?length)`：

    選取字串

    ```jsx
    Lstr = '1234567890'
    Lstr.substr(3, 5) // '45678'
    Lstr.substr(5, 3) // '678'
    ```

2. `substring(start, ?end)`：

    選取字串

    ```jsx
    Lstr = '1234567890'
    Lstr.substring(3, 5) // '45'
    Lstr.substring(5, 3) // '45'
    ```

3. `slice(?start, ?end)`：

    選取字串

    ```jsx
    Lstr = '1234567890'
    Lstr.slice(3, 5) // '45'
    ```

## 陣列操作

1. `split()`：

    切割字串變成陣列

    ```jsx
    Lstr = 'a,b,c'
    Lary = Lstr.split(',') // ['a', 'b', 'c']
    ```

2. `slice(?start, ?end)`：

    選取陣列的部分元素

    ```jsx
    Lary = ['a', 'b', 'c']
    Lary.slice(2, 3) // ['c']
    ```

3. `splice(start, ?deleteCount, ...items)`：

    修改陣列內容

    ```jsx
    Lary = ['a', 'b', 'c']
    Lary.splice(2, 1) // ['c']
    Lary.splice(1, 1, 'D') // ['b']
    console.log(Lary) // ['a', 'D']
    ```