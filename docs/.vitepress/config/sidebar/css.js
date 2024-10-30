export function sidebarCss() {
  return [
    {
      text: "CSS Basic",
      collapsed: false,
      items: [
        { text: 'Display 顯示', link: '/css/basic/display', activeMatch: '/css/basic/display' },
        { text: 'Display Grid', link: '/css/basic/grid', activeMatch: '/css/basic/grid' },
        { text: 'Position 定位', link: '/css/basic/position', activeMatch: '/css/basic/position' },
        { text: 'Background 背景', link: '/css/basic/background', activeMatch: '/css/basic/background' },
        { text: '選擇器', link: '/css/basic/選擇器', activeMatch: '/css/basic/選擇器' },
      ],
    },
    {
      text: 'Other',
      collapsed: false,
      items: [
        { text: '關於 色碼 #hex rgba', link: '/css/色碼', activeMatch: '/css/色碼' },
        { text: '關於『&』｜Sass', link: '/css/關於『&』', activeMatch: '/css/關於『&』' },
        { text: '關於 Clamp 一行寫好RWD?', link: '/css/clamp', activeMatch: '/css/clamp' },
        { text: 'animation-timeline:scroll()', link: '/css/animation-timeline-scroll', activeMatch: '/css/animation-timeline-scroll' },
        { text: 'scroll-snap', link: '/css/scroll-snap', activeMatch: '/css/scroll-snap' },
      ],
    },
    {
      text: "Tailwind CSS",
      collapsed: false,
      items: [
        { text: "Tailwind 起手式", link: "css/tailwindcss/init-tailwind", activeMatch: "css/tailwindcss/init-tailwind" },
        { text: "Tailwind 客製化", link: "css/tailwindcss/custom-tailwind", activeMatch: "css/tailwindcss/custom-tailwind" },
      ],
    },
  ];
}
