export function nav() {
  return [
    { text: "首頁", link: "/" },
    { text: "關於我", link: "/about/" },
    { text: "最近更新", link: "/toc" },
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
    { text: "PHP", link: "/php/" },
    { text: "JS", link: "/javascript/" },
    { text: "CSS", link: "/css/" },
    { text: "作品集", link: "/portfolio/" },
    {
      text: "其它",
      items: [
        { text: "GIT", link: "/git/" },
        { text: "安裝vscode", link: "/other/安裝vscode" },
        {
          text: "設定 ESLint 和 Prettier",
          link: "/other/init-eslint-prettier",
        },
        {
          text: "設定 jsconfig.json和vite.config.js",
          link: "/other/init-jsconfig-viteConfig",
        },
      ],
    },
  ];
}
