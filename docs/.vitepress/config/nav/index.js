export function nav() {
  return [
    { text: "首頁", link: "/" },
    { text: "關於我", link: "/about/" },
    { text: "最近更新", link: "/toc" },
    {
      text: "程式語言",
      items: [
        {
          text: "Python",
          items: [
            {
              text: "新手上路系列",
              link: "/python/新手上路系列/",
            },
            {
              text: "112全國技藝競賽筆記",
              link: "/python/112全國技藝競賽筆記/",
            },
          ],
        },
        { text: "JavaScript", link: "/javascript/" },
        { text: "Java", link: "/java/basic/Day01" },
        { text: "PHP", link: "/php/" },
      ],
    },
    {
      text: "前端技術",
      items: [
        { text: "CSS", link: "/css/" },
      ],
    },
    {
      text: "資料庫",
      items: [
        { text: "Database", link: "/database/database-index-basic" },
        { text: "SQL", link: "/database/sql/sql-join" },
      ],
    },
    { text: "作品集", link: "/portfolio/" },
    {
      text: "開發工具",
      items: [
        { text: "Git", link: "/git/" },
        { text: "VS Code 安裝", link: "/other/安裝vscode" },
        {
          text: "ESLint 和 Prettier 設定",
          link: "/other/init-eslint-prettier",
        },
        {
          text: "jsconfig.json 和 vite.config.js 設定",
          link: "/other/init-jsconfig-viteConfig",
        },
      ],
    },
  ];
}
