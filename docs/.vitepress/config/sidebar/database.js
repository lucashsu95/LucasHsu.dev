export function sideBarDatabase() {
  return [
    {
      text: "Database Basic",
      items: [
        { text: '為什麼要資料庫正規化', link: '/database/why-database-normalization', activeMatch: '/database/why-database-normalization' },
        { text: '資料庫索引基礎入門', link: '/database/database-index-basic', activeMatch: '/database/database-index-basic' },
        { text: '進階索引實戰：B-Tree、複合索引與 Hash Map 全解析', link: '/database/database-index-advanced', activeMatch: '/database/database-index-advanced' },
      ],
    },
    {
      text: "SQL",
      items: [
        { text: "SQL JOIN 關聯式", link: "/database/sql/sql-join", activeMatch: "/database/sql/sql-join" },
        { text: "SQL CASE...WHEN...THEN", link: "/database/sql/sql-case-when-then", activeMatch: "/database/sql/sql-case-when-then" },
        { text: "SQL CTE", link: "/database/sql/sql-cte", activeMatch: "/database/sql/sql-cte" },
        { text: "SQL 窗口函數", link: "/database/sql/sql-window-functions", activeMatch: "/database/sql/sql-window-functions" },
      ],
    },
  ];
}
