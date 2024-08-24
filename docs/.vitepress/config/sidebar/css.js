export function sidebarCss() {
  return [
    {
      text: 'CSS',
      items: [
        { text: 'Display 顯示', link: '/css/display', activeMatch: '/css/display' },
        { text: 'Position 定位', link: '/css/position', activeMatch: '/css/position' },
        { text: 'CSS 選擇器', link: '/css/選擇器', activeMatch: '/css/選擇器' },
        { text: '色碼', link: '/css/色碼', activeMatch: '/css/色碼' },
        { text: '關於『&』', link: '/css/關於『&』', activeMatch: '/css/關於『&』' },
        { text: 'Clamp', link: '/css/clamp', activeMatch: '/css/clamp' },
        { text: 'Background', link: '/css/background', activeMatch: '/css/background' },
        {
          text: "Tailwind CSS",
          collapsed: true,
          items: [
            { text: "Tailwind 起手式", link: "css/init-tailwind", activeMatch: "css/init-tailwind" },
            { text: "Tailwind 客製化", link: "css/custom-tailwind", activeMatch: "css/custom-tailwind" },
          ],
        },
      ],
    },
  ];
}
