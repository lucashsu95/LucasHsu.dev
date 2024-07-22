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
    { text: "CSS", link: "/css/" },
    { text: "Git", link: "/git/" },
    { text: "作品集", link: "/portfolio/" },
    // {
    //   text: "Tools",
    //   items: [{ text: "Git", link: "/git/" }],
    // },
  ];
}
