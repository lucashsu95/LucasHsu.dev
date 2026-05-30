---
outline: [2,3]
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: datetime,date,timedelta,python
  - - meta
    - property: og:title
      content: datetime|python
  - - meta
    - property: og:description
      content: Python datetime模組懶人包，日期時間運算與格式化
  - - meta
    - property: og:type
      content: article
---
# datetime 懶人包

:::warning 為什麼需要 datetime？
處理日期時間時，自己算閏年、大小月超容易出錯。
`datetime` 幫你搞定日期加減、格式轉換、閏年判斷。
:::

## 快速上手

```python
from datetime import date, datetime, timedelta

# 建立日期
dt = date(2023, 10, 15)

# 取得今天
today = date.today()

# 日期加減
tomorrow = today + timedelta(days=1)
last_week = today - timedelta(weeks=1)

# 格式化
print(today.strftime("%Y%m%d"))      # 20231015
print(today.strftime("%Y-%m-%d"))    # 2023-10-15
print(today.strftime("%Y %m %d"))    # 2023 10 15

# 解析字串
dt = datetime.strptime("2023-10-15", "%Y-%m-%d")
```

## 三個核心類別

| 類別 | 用途 | 範例 |
|------|------|------|
| `date` | 只有日期 | `date(2023, 10, 15)` |
| `time` | 只有時間 | `time(14, 30, 0)` |
| `datetime` | 日期 + 時間 | `datetime(2023, 10, 15, 14, 30)` |

## timedelta（時間差）

```python
from datetime import timedelta

d = timedelta(days=7, hours=3, minutes=30)

# 常用屬性
print(d.days)        # 7
print(d.seconds)     # 12600（3小時30分）

# 運算
result = timedelta(days=10) + timedelta(hours=5)  # 10天5小時
```

## 常用格式化指令

| 指令 | 意義 | 範例 |
|------|------|------|
| `%Y` | 四位年 | 2023 |
| `%m` | 兩位月 | 10 |
| `%d` | 兩位日 | 15 |
| `%H` | 24小時制 | 14 |
| `%M` | 分鐘 | 30 |
| `%S` | 秒 | 00 |
| `%A` | 星期全名 | Sunday |
| `%a` | 星期縮寫 | Sun |
| `%B` | 月份全名 | October |
| `%b` | 月份縮寫 | Oct |

## 競賽常用技巧

### 日期加減
```python
from datetime import date, timedelta

dt = date(2023, 1, 1)
for i in range(365):
    next_day = dt + timedelta(days=i)
    print(next_day)
```

### 判斷閏年
```python
from datetime import date

# 直接用 date 會自動處理閏年
feb29 = date(2024, 2, 29)  # ✅ 2024 是閏年
# feb29 = date(2023, 2, 29)  # ❌ 2023 不是閏年，會報錯
```

### 日期差（天數）
```python
from datetime import date

d1 = date(2023, 1, 1)
d2 = date(2023, 12, 31)
diff = d2 - d1
print(diff.days)  # 364
```

### 找迴文日期
```python
from datetime import date, timedelta

y, m, d = map(int, input().split())
dt = date(y, m, d)

for i in range(10000):
    try:
        dt2 = dt + timedelta(i)
        dtformat = dt2.strftime("%Y%m%d")
        # 去掉前導零再比對
        while dtformat[0] == "0":
            dtformat = dtformat[1:]
        if dtformat == dtformat[::-1]:
            ans = dt2.strftime("%Y %m %d")
            break
    except:
        pass
```

### 取得星期幾
```python
from datetime import date

dt = date(2023, 10, 15)
print(dt.weekday())      # 6（0=週一, 6=週日）
print(dt.isoweekday())   # 7（1=週一, 7=週日）
```

### 月初 / 月底
```python
from datetime import date
import calendar

dt = date(2023, 10, 15)

# 月底
last_day = calendar.monthrange(dt.year, dt.month)[1]
end_of_month = date(dt.year, dt.month, last_day)
```

:::tip 競賽小提醒
- `timedelta` 可以直接加到 `date` 或 `datetime` 上
- `strftime` 輸出字串，`strptime` 解析字串
- 找迴文日期記得處理前導零（`lstrip('0')` 或 while 迴圈）
- 日期範圍大的題目，考慮用 `timedelta(days=i)` 迴圈而非手动加月份
:::
