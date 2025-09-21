---
outline: deep
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: PHP, php, 如何開始php
  - - meta
    - property: og:title
      content: PHP Function
  - - meta
    - property: og:description
      content: A Comprehensive Guide to Many Useful Functions
  - - meta
    - property: og:type
      content: article
---

# PHP Function 函式

## PHP 陣列的一些基本功能

1. ### 建立陣列
    - 使用 `array()` 函數或 `[]` 來建立陣列。
    
    ```php
    $fruits = array("apple", "orange", "banana");
    // 或
    $fruits = ["apple", "orange", "banana"];
    ```
    
2. ### 關聯陣列 (key => value)
    - 除了普通索引陣列，你可以使用關聯陣列，其中每個元素都有一個關聯的鍵值。
    
    ```php
    $person = array("name" => "John", "age" => 30, "city" => "New York")
    ```
    
3. ### 取得陣列元素
    - 使用索引或鍵值來取得陣列中的元素。
    
    ```php
    echo $fruits[0]; // 輸出: apple
    echo $person["name"]; // 輸出: John
    ```
    
4. ### 陣列排序
    - 使用 `sort()` 函數來對數值索引陣列進行升序排序。
    
    ```php
    sort($fruits);
    ```
    
    - 使用 `asort()` 函數來對關聯陣列**按照值**升序排序。
    
    ```php
    asort($person);
    ```
    
    - 使用 `ksort()` 函數來對關聯陣列**按照鍵**升序排序。
    
    ```php
    ksort($person);
    ```

    - 使用 `usort()` 函數，這會對關聯陣列按照鍵進行降序排序。
    
    ```php
    usort($person,function($a,$b) {
        if($a['date'] == $b['date']){
            return $a['time'] - $b['time'];
        }
        return $a['date'] - $b['date'];
    });
    ```
    
    - #### 4-1 降序排序
        
        如果你想要降序排序陣列，你可以使用相對應的函數。以下是一些相關的函數：
        
        1. **降序排序索引陣列：**
            - 使用 `rsort()` 函數，這會對數值索引陣列進行降序排序。
            
            ```php
            $numbers = [5, 2, 8, 1, 3];
            rsort($numbers);
            ```
            
        2. **降序排序關聯陣列（按值）：**
            - 使用 `arsort()` 函數，這會對關聯陣列按照值進行降序排序。
            
            ```php
            $person = ["name" => "John", "age" => 30, "city" => "New York"];
            arsort($person);
            ```
            
        3. **降序排序關聯陣列（按鍵）：**
            - 使用 `krsort()` 函數，這會對關聯陣列按照鍵進行降序排序。
            
            ```php
            krsort($person);
            ```

            
    - #### 4-2 關聯陣列中的 key 和 value 位置顛倒
    
    可以使用 `array_flip()` 函數。這個函數會將陣列中的鍵值對調，原本的鍵變成值，原本的值變成鍵。以下是使用的範例：
    
    ```php
    $person = [
    "name" => "John",
    "age" => 30,
    "city" => "New York"
    ];
    
    // 使用 array_flip() 將 key 和 value 位置顛倒
    $flippedPerson = array_flip($person);
    
    // 輸出顛倒後的陣列
    print_r($flippedPerson);
    ```



::: details

| 函式名稱        | 參數                               | 說明                                                                                                                                                                                                                                                                                 |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| array_search()  | value, arr                         | 若陣列 arr 內有值為 value 的元素，則傳回元素的鍵；否則傳回 FALSE。                                                                                                                                                                                                                   |
| array_slice()   | arr, offset [, length]             | 根據 offset 和 length 指定的條件從陣列 arr 內傳回一串元素。若 offset 為正整數，從開頭位移 offset 個元素開始；否則從結尾位移 offset 個元素開始。若 length 為正整數，傳回 length 個元素；否則傳回到陣列結尾的 length 個元素時停止。                                                    |
| array_splice()  | arr, offset [, length [, replace]] | 根據 offset 和 length 指定的條件從陣列 arr 內移除一串元素。若 offset 為正整數，從開頭位移 offset 個元素開始；否則從結尾位移 offset 個元素開始。若 length 為正整數，移除 length 個元素；否則移除到陣列結尾的 length 個元素時停止。若有指定 replace，表示以 replace 取代被移除的元素。 |
| array_sum()     | arr                                | 傳回陣列 arr 內各個元素的總和（整數或浮點數）。                                                                                                                                                                                                                                      |
| array_unique()  | arr                                | 移除陣列 arr 內重複的元素。                                                                                                                                                                                                                                                          |
| array_push()    | arr, arg1 [, arg2,...]             | 將 arg1 [, arg2,...] 等元素加入陣列 arr 的尾端。                                                                                                                                                                                                                                     |
| array_pop()     | arr                                | 從陣列 arr 的尾端移除一個元素。                                                                                                                                                                                                                                                      |
| shuffle()       | arr                                | 將陣列 arr 內元素的順序弄亂，每次呼叫都有不同的結果。                                                                                                                                                                                                                                |
| array_unshift() | arr, arg1 [, arg2,...]             | 將 arg1 [, arg2,...] 等元素加入陣列 arr 的前端。                                                                                                                                                                                                                                     |

:::

::: details

| 函式名稱      | 參數             | 說明                                                                                                                                                                                                                                                    |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| array_shift() | arr              | 從陣列 arr 的前端移除一個元素。例如 $a = array('a', 'b', 'c');，則 array_shift($a); 會得到 $a 為 array('b', 'c')。 array_unshift() 和 array_shift() 通常用來處理佇列 (queue)。                                                                          |
| asort()       | arr              | 將陣列 arr 內元素的值進行排序(由小到大)，並維持所連結的鍵。例如 $a = array('c' => 'red', 'a' => 'green', 'b' => 'blue');，則 asort($a); 會得到 $a 為 array('b' => 'blue', 'a' => 'green', 'c' => 'red')。                                               |
| arsort()      | arr              | 將陣列 arr 內元素的值進行反向排序(由大到小)，並維持所連結的鍵。例如 $a = array('c' => 'red', 'a' => 'green', 'b' => 'blue');，則 arsort($a); 會得到 $a 為 array('c' => 'red', 'a' => 'green', 'b' => 'blue')。                                          |
| ksort()       | arr              | 將陣列 arr 內元素的鍵進行排序(由小到大)。例如 $a = array('d' => 'red', 'a' => 'green', 'b' => 'blue', 'c' => 'yellow');，則 ksort($a); 會得到 $a 為 array('a' => 'green', 'b' => 'blue', 'c' => 'yellow', 'd' => 'red')。                               |
| krsort()      | arr              | 將陣列 arr 內元素的鍵進行反向排序(由大到小)。例如 $a = array('d' => 'red', 'a' => 'green', 'b' => 'blue', 'c' => 'yellow');，則 krsort($a); 會得到 $a 為 array('d' => 'red', 'c' => 'yellow', 'b' => 'blue', 'a' => 'green')。                          |
| sort()        | arr [, flag]     | 將陣列 arr 內元素的值進行排序(由小到大)，參數 flag 有三種值 - SORT_REGULAR (正常比較)、SORT_NUMERIC (數值比較)、SORT_STRING (字串比較)。例如 $a = array(100, 85.2, 77, 93, 60);，則 sort($a, SORT_NUMERIC); 會得到 $a 為 array(60, 77, 85.2, 93, 100)。 |
| rsort()       | arr [, flag]     | 將陣列 arr 內元素的值進行反向排序(由大到小)，參數 flag 有三種值 - SORT_REGULAR (正常比較)、SORT_NUMERIC (數值比較)、SORT_STRING (字串比較)。例如 $a = array(10, 8, 7, 9, 6);，則 rsort($a, SORT_NUMERIC); 會得到 $a 為 array(10, 9, 8, 7, 6)。          |
| usort()       | arr, func        | 將陣列 arr 內元素的值根據 func 所指定的函式進行排序。                                                                                                                                                                                                   |
| uksort()      | arr, func        | 將陣列 arr 內元素的鍵根據 func 所指定的函式進行排序。                                                                                                                                                                                                   |
| range()       | arg1, arg2, arg3 | 產生一個下限為 arg1、上限為 arg2、間隔為 arg3 的陣列，若沒有指定 arg3，表示間隔為 1。例如 range(1, 5); 會產生 array(1, 2, 3, 4, 5)。                                                                                                                    |

:::

::: details

| 函式名稱          | 參數                  | 說明                                                                                                                                                                                                                                                                          |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| is_array()        | arg                   | 若 arg 為 array 型別，傳回 TRUE；否則傳回 FALSE。                                                                                                                                                                                                                             |
| count(), sizeof() | arr                   | 傳回陣列 arr 包含幾個元素。                                                                                                                                                                                                                                                   |
| in_array()        | value, arr            | 若 value 存在於陣列 arr，傳回 TRUE；否則傳回 FALSE。例如 in_array('Jean', array('Bob', 'Mary', 'Jean')); 會傳回 TRUE。                                                                                                                                                        |
| unset()           | value                 | 清除陣列內的元素 value。例如 $a = array('Bob', 'Mary', 'Jean', 'Tom');，則 unset($a[1]); 將使陣列 a 剩下 'Bob'、'Jean' 和 'Tom'。                                                                                                                                             |
| current(), pos()  | arr                   | 陣列內部有一個指向目前元素的指標，這兩個函式會傳回陣列 arr 內部指標目前所指向的元素。例如 $a = array('Bob', 'Mary', 'Jean');，則 current($a) 和 pos($a) 會傳回 'Bob'。                                                                                                        |
| next()            | arr                   | 將陣列 arr 內部指標指向下一個元素並傳回該元素。例如 $a = array('Bob', 'Mary', 'Joe');，則 next($a) 會傳回 'Mary'。                                                                                                                                                            |
| prev()            | arr                   | 將陣列 arr 內部指標指向前一個元素並傳回該元素。例如 $a = array('Bob', 'Mary', 'Jean');，若先呼叫 next($a)，再呼叫 prev($a) 會傳回 'Bob'。                                                                                                                                     |
| end()             | arr                   | 將陣列 arr 內部指標指向最後一個元素並傳回該元素。                                                                                                                                                                                                                             |
| reset()           | arr                   | 將陣列 arr 內部指標指向第一個元素並傳回該元素。                                                                                                                                                                                                                               |
| array_walk()      | arr, func [, arg,...] | 對陣列 arr 的每個元素進行 func 所指定的函式運算。若 func 所指定的函式有參數，可以在 arg... 指定。                                                                                                                                                                             |
| each()            | arr                   | 傳回陣列 arr 內部指標目前所指向之元素的鍵與值，然後將內部指標移到下一個元素。通常可以和 list(arg1, arg2,...) 函式搭配使用。例如 $a = array('Bob', 'Mary', 'Jean');，而 list($key, $value) = each($a); 會將內部指標目前所指向之元素的鍵 '0' 與值 'Bob' 指派給變數 key、value。 |
:::

::: details

| 函式名稱        | 參數                  | 說明                                                                                                                                                                                                                                                   |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| list()          | arg1 [, arg2,...]     | 將陣列的第一、二、三個元素 'Bob'、'Mary'、'Jean' 指派給變數 name1、name2、name3。                                                                                                                                                                      |
| array_combine() | arr1, arr2            | 將陣列 arr 的元素當成新陣列的鍵，將陣列 arr2 的元素當成新陣列的值。例如 $a = array('a' => 'I', 'b' => '綠', 'c' => '藍');，則 array_combine($a, $b); 會得到 array('a' => '', 'b' => '', 'c' => '')。                                                   |
| array_diff()    | arr1, arr2,...        | 傳回第一個陣列 arr 和其他陣列 arr2,... 不同的元素。例如 $a = array(1, 2, 3, 4, 5); $b = array(1, 2); $c = array(4);，則 array_diff($a, $b, $c); 會得到 array(3, 5)。                                                                                   |
| array_fill()    | key, num, value       | 在陣列內鍵為 key 處填入 num 個 value 所指定的值。例如 array_fill(2, 4, 'a') 會得到 array(2 => 'a', 3 => 'a', 4 => 'a', 5 => 'a')。                                                                                                                     |
| array_keys()    | arr [, value]         | 傳回陣列 arr 內的鍵，或值等於 value 的鍵。例如 $a = array(1 => 'a', 'x' => 'b', 'y' => 'b');，則 array_keys($a); 會得到 array(1, 'x', 'y')。如果 array_keys($a, 'b'); 會得到 array('x', 'y')。                                                         |
| array_values()  | arr                   | 傳回陣列 arr 內的值。例如 $a = array(1 => 'a', 'x' => 'b', 'y' => 'b');，則 array_values($a); 會得到 array('a', 'b', 'b')。                                                                                                                            |
| array_reverse() | arr [, preserve_keys] | 將陣列 arr 內的元素順序顛倒過來。如果 preserve_keys 為 TRUE，保留原本的鍵。例如 $a = array('a', 'b', 'c');，則 array_reverse($a) 會得到 array(0 => 'c', 1 => 'b', 2 => 'a')。如果 array_reverse($a, TRUE) 會得到 array(2 => 'c', 1 => 'b', 0 => 'a')。 |
| array_flip()    | arr                   | 將陣列 arr 內的鍵與值交換。例如 $a = array(1 => 'a', 'x' => 'b');，則 array_flip($a); 會得到 array('a' => 1, 'b' => 'x')。                                                                                                                             |
| array_merge()   | arr1 [, arr2,...]     | 將陣列進行聯集，遇到相同的鍵時不做覆寫。例如 $a = array(1 => 'a', 'x' => 'b'); $b = array(2 => 'c', 'x' => 'd');，則 array_merge($a, $b) 會得到 array(1 => 'a', 'x' => 'b', 2 => 'c')。                                                                |
| array_pad()     | arr, size, value      | 將陣列 arr 的大小設定為 size，不足的元素填入 value。例如 $a = array('a', 'b', 'c');，則 array_pad($a, 5, 'x'); 會得到 array('a', 'b', 'c', 'x', 'x')。                                                                                                 |
:::