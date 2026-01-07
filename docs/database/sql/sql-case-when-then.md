---
head:
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/sql-cover.jpg
---

# SQL CASE...WHEN...THEN

CASE...WHEN...THEN 是 SQL 中的條件表達式,用於根據特定條件返回不同的結果。這裡是一個基本的語法結構和簡單的使用示例:

## 基本語法

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE result
END
```

使用示例:

假設我們有一個 `employees` 表,包含 `employee_id`, `salary`, 和 `department` 欄位。我們想根據薪資範圍給員工分類:

```sql
SELECT 
    employee_id,
    salary,
    CASE 
        WHEN salary < 30000 THEN '初級'
        WHEN salary BETWEEN 30000 AND 50000 THEN '中級'
        WHEN salary > 50000 THEN '高級'
        ELSE '未分類'
    END AS salary_grade
FROM 
    employees;
```

這個查詢會返回每個員工的 ID、薪資,以及根據薪資範圍劃分的等級。

CASE 語句也可以用在 UPDATE 或 INSERT 語句中,或者用於計算聚合函數。

您想要我進一步解釋 CASE 語句的某些方面,或者提供更多的使用示例嗎?

## 進階語法

1. 在 GROUP BY 中使用 CASE:

假設我們想按照薪資等級對員工進行分組統計:

```sql
SELECT 
    CASE 
        WHEN salary < 30000 THEN '初級'
        WHEN salary BETWEEN 30000 AND 50000 THEN '中級'
        WHEN salary > 50000 THEN '高級'
        ELSE '未分類'
    END AS salary_grade,
    COUNT(*) AS employee_count
FROM 
    employees
GROUP BY 
    CASE 
        WHEN salary < 30000 THEN '初級'
        WHEN salary BETWEEN 30000 AND 50000 THEN '中級'
        WHEN salary > 50000 THEN '高級'
        ELSE '未分類'
    END;
```

2. 在 ORDER BY 中使用 CASE:

我們可以使用 CASE 來自定義排序邏輯:

```sql
SELECT 
    employee_id, 
    department, 
    salary
FROM 
    employees
ORDER BY
    CASE 
        WHEN department = 'IT' THEN 1
        WHEN department = 'Sales' THEN 2
        WHEN department = 'HR' THEN 3
        ELSE 4
    END,
    salary DESC;
```

3. 使用 CASE 進行條件聚合:

```sql
SELECT 
    department,
    AVG(CASE WHEN gender = 'Male' THEN salary END) AS avg_male_salary,
    AVG(CASE WHEN gender = 'Female' THEN salary END) AS avg_female_salary
FROM 
    employees
GROUP BY 
    department;
```

4. 在 UPDATE 語句中使用 CASE:

```sql
UPDATE employees
SET bonus = 
    CASE 
        WHEN performance_rating = 'Excellent' THEN salary * 0.1
        WHEN performance_rating = 'Good' THEN salary * 0.05
        ELSE 0
    END;
```

5. 巢狀 CASE 語句:

```sql
SELECT 
    employee_id,
    CASE 
        WHEN department = 'Sales' THEN
            CASE
                WHEN sales_amount > 50000 THEN 'Top Performer'
                WHEN sales_amount > 30000 THEN 'Good Performer'
                ELSE 'Average Performer'
            END
        ELSE 'N/A'
    END AS sales_performance
FROM 
    employees;
```

這些例子展示了 CASE 語句的多樣性和靈活性。它不僅可以用於簡單的條件邏輯,還可以在複雜的查詢、分組、排序和更新操作中發揮重要作用。

您對這些示例有任何疑問,或者想了解 CASE 語句的其他應用嗎?