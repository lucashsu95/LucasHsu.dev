export function nav() {
  return [
    { text: "Home", link: "/" },
    { text: "About me", link: "/about/" },
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
    { text: "GIT", link: "/git/" },
    { text: "作品集", link: "/portfolio/" },
    {
      text: "Other",
      items: [
        { text: "安裝vscode", link: "/other/安裝vscode" },
        { text: "設定 ESLint 和 Prettier", link: "/other/init-eslint-prettier" },
        { text: "設定 jsconfig.json", link: "/other/init-jsconfig" },
      ],

    },
  ];
}
