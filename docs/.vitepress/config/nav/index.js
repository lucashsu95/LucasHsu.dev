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
        { text: "Java", link: "/java/basic/install-java" },
      ],
    },
    {
      text: "前端技術",
      items: [
        { text: "CSS", link: "/css/" },
        { text: "JavaScript", link: "/javascript/網頁操作/TodoList" },
        { text: "TypeScript", link: "/typescript/utility-types" },
      ],
    },
    {
      text: "後端技術",
      items: [
        { text: "Spring Boot", link: "/backend/" },
        { text: "PHP", link: "/php/" },
      ],
    },
    {
      text: "資料庫",
      items: [
        { text: "Database", link: "/database/database-index-basic" },
        { text: "SQL", link: "/database/sql/sql-join" },
      ],
    },
    {
      text: "概念",
      items: [
        { text: "Clean Architecture", link: "/concepts/clean-architecture" },
        { text: "FP 入門指南", link: "/concepts/fp/functional-programming-intro" },
      ],
    },
    { text: "作品集", link: "/portfolio/" },
    {
      text: "DevOps",
      items: [
        { text: "Tmux 終端機多工器", link: "/devops/tmux-guide" },
        { text: "Git", link: "/git/" },
      ],
    },
    {
      text: "開發工具",
      items: [
        { text: "VSCode 安裝", link: "/other/安裝vscode" },
        { text: "WSL 安裝設定", link: "/other/install-wsl" },
        { text: "ESLint/Prettier 設定", link: "/other/init-eslint-prettier" },
        { text: "jsconfig/viteConfig", link: "/other/init-jsconfig-viteConfig" },
        { text: "LaTeX DevContainer", link: "/other/latex-devcontainer-guide" },
      ],
    },
  ];
}
