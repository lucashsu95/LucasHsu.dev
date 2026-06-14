export function nav() {
  return [
    { text: "首頁", link: "/" },
    { text: "關於我", link: "/about/" },
    { text: "最近更新", link: "/toc" },
    {
      text: "網頁技術",
      items: [
        {
          text: "前端",
          items: [
            { text: "CSS", link: "/css/" },
            { text: "JavaScript", link: "/javascript/網頁操作/TodoList" },
            { text: "TypeScript", link: "/typescript/utility-types" },
          ],
        },
        {
          text: "後端",
          items: [
            { text: "JavaScript", link: "/javascript/" },
            { text: "Java", link: "/java/basic/install-java" },
            { text: "Spring Boot", link: "/springboot/" },
            { text: "PHP", link: "/php/" },
            { text: "Database", link: "/database/database-index-basic" },
            { text: "SQL", link: "/database/sql/sql-join" },
          ],
        },
      ],
    },
    {
      text: "程式設計",
      items: [
        { text: "Python", link: "/python/" },
      ],
    },
    {
      text: "概念",
      items: [
        { text: "Clean Architecture", link: "/concepts/clean-architecture" },
        { text: "FP 入門指南", link: "/concepts/fp/functional-programming-intro" },
      ],
    },
    {
      text: "工具",                                     // DevOps + 開發工具合併
      items: [
        { text: "VSCode", link: "/devops/install-vscode" },
        { text: "WSL", link: "/devops/install-wsl" },
        { text: "ESLint / Prettier", link: "/devops/init-eslint-prettier" },
        { text: "jsconfig / viteConfig", link: "/devops/init-jsconfig-viteConfig" },
        { text: "LaTeX DevContainer", link: "/devops/latex-devcontainer-guide" },
        { text: "Git", link: "/git/" },
        { text: "Tmux", link: "/devops/tmux-guide" },
        { text: "Docker", link: "/devops/docker-resource" },
      ],
    },
    { text: "作品集", link: "/portfolio/" },
  ];
}
