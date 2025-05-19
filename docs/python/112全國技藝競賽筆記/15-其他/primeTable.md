# 質數表

在求質數的題目中，當測資太大時，很容易就會超時。

這時就可以選擇建表

## 埃拉托斯特尼篩法

[Wiki](https://zh.wikipedia.org/zh-tw/%E5%9F%83%E6%8B%89%E6%89%98%E6%96%AF%E7%89%B9%E5%B0%BC%E7%AD%9B%E6%B3%95)

![埃拉托斯特尼篩法-演示圖](./img/Sieve_of_Eratosthenes_animation.gif)

## 程式碼

```python
MAX = 10**6
prime_table = [1] * MAX
prime_table[0] = prime_table[1] = 0

for i in range(2, int(MAX ** 0.5) + 1):
    if prime_table[i]:
        for j in range(i * i, MAX, i):
            prime_table[j] = 0
```

