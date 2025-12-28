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
        { text: 'RWD響應式', link: '/css/basic/rwd', activeMatch: '/css/basic/rwd' },
      ],
    },
    {
      text: '進階',
      collapsed: true,
      items: [
        { text: 'CSS interpolate-size', link: '/css/depth/interpolate-size', activeMatch: '/css/depth/interpolate-size' },
        { text: 'CSS @property', link: '/css/depth/property', activeMatch: '/css/depth/property' },
        { text: 'CSS @starting-style', link: '/css/depth/starting-style', activeMatch: '/css/depth/starting-style' },
        { text: 'CSS animation-timeline', link: '/css/depth/animation-timeline', activeMatch: '/css/depth/animation-timeline' },
      ],
    },
    {
      text: 'Other',
      collapsed: false,
      items: [
        { text: 'CSS cubic-bezier', link: '/css/cubic-bezier', activeMatch: '/css/cubic-bezier' },
        { text: '關於 色碼 #hex rgba', link: '/css/色碼', activeMatch: '/css/色碼' },
        { text: '關於 clamp 一行寫好RWD?', link: '/css/clamp', activeMatch: '/css/clamp' },
        { text: 'scroll-snap', link: '/css/scroll-snap', activeMatch: '/css/scroll-snap' },
      ],
    },
    {
      text: "Tailwind CSS",
      collapsed: true,
      items: [
        { text: "Tailwind 起手式", link: "css/tailwindcss/init-tailwind", activeMatch: "css/tailwindcss/init-tailwind" },
        { text: "Tailwind 客製化", link: "css/tailwindcss/custom-tailwind", activeMatch: "css/tailwindcss/custom-tailwind" },
      ],
    },
  ];
}
