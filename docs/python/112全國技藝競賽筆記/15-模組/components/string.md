# string

## 字元常量：
1. **string.ascii_letters**：包含所有ASCII字母（大寫和小寫）的字串。
2. **string.ascii_lowercase**：包含所有ASCII小寫字母的字串。
3. **string.ascii_uppercase**：包含所有ASCII大寫字母的字串。
4. **string.digits**：包含所有數字0到9的字串。
5. **string.hexdigits**：包含所有十六進制數字（0-9，a-f，A-F）的字串。
6. **string.octdigits**：包含所有八進制數字（0-7）的字串。
7. **string.punctuation**：包含所有標點符號的字串。

## 其他常量：
1. **string.whitespace**：包含所有空白字元（空格、制表符、換行符等）的字串。
string.printable：包含所有可列印字元的字串（包括字母、數字和標點符號）。
函式：

2. **string.capwords**(s, sep=None)：將字串s中的單詞的首字母轉為大寫，其他字母轉為小寫，使用可選的分隔符sep分隔單詞。