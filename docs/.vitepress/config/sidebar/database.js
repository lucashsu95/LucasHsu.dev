export function sideBarDatabase() {
  return [
    {
      text: "Database Basic",
      items: [
        { text: '資料庫 ACID 是什麼', link: '/database/acid-transactions', activeMatch: '/database/acid-transactions' },
        { text: '為什麼要資料庫正規化', link: '/database/why-database-normalization', activeMatch: '/database/why-database-normalization' },
        { text: '資料庫索引基礎入門', link: '/database/database-index-basic', activeMatch: '/database/database-index-basic' },
        { text: '進階索引實戰：B-Tree、複合索引與 Hash Map 全解析', link: '/database/database-index-advanced', activeMatch: '/database/database-index-advanced' },
        { text: '資料庫樂觀鎖與悲觀鎖', link: '/database/optimistic-pessimistic-locking', activeMatch: '/database/optimistic-pessimistic-locking' },
        { text: '重設 MySQL Root 密碼（Windows）', link: '/database/mysql-reset-root-password-windows', activeMatch: '/database/mysql-reset-root-password-windows' },
      ],
    },
    {
      text: "SQL",
      items: [
        { text: "SQL JOIN 關聯式", link: "/database/sql/sql-join", activeMatch: "/database/sql/sql-join" },
        { text: "SQL CASE...WHEN...THEN", link: "/database/sql/sql-case-when-then", activeMatch: "/database/sql/sql-case-when-then" },
        { text: "SQL CTE", link: "/database/sql/sql-cte", activeMatch: "/database/sql/sql-cte" },
        { text: "SQL 窗口函數", link: "/database/sql/sql-window-functions", activeMatch: "/database/sql/sql-window-functions" },
        { text: "SQL GROUP BY 與 HAVING", link: "/database/sql/sql-group-by-having", activeMatch: "/database/sql/sql-group-by-having" },
      ],
    },
    {
      text: "MongoDB",
      items: [
        { text: "系列總覽", link: "/database/mongodb/mongodb-tutorial", activeMatch: "/database/mongodb/mongodb-tutorial" },
        { text: "Schema 設計與 ETL 資料處理", link: "/database/mongodb/mongodb-schema-etl", activeMatch: "/database/mongodb/mongodb-schema-etl" },
        { text: "查詢模式實戰", link: "/database/mongodb/mongodb-query-patterns", activeMatch: "/database/mongodb/mongodb-query-patterns" },
        { text: "索引設計與效能優化", link: "/database/mongodb/mongodb-indexing", activeMatch: "/database/mongodb/mongodb-indexing" },
        { text: "Prisma + MongoDB 實戰經驗談", link: "/database/mongodb/mongodb-prisma-lessons", activeMatch: "/database/mongodb/mongodb-prisma-lessons" },
      ]
    }
  ];
}
