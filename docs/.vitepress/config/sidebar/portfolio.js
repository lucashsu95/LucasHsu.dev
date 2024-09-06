export function sidebarPortfolio() {
  return [
    {
      text: "全國技能競賽",
      collapsed: false,
      items: [
        { text: "49屆 模組A 俄羅斯方塊", link: "portfolio/web-global/49_Module_A_Game", activeMatch: "portfolio/web-global/49_Module_A_Game" },
        { text: "52屆 模組E 學生管理系統", link: "portfolio/web-global/52_Module_E_Frontend", activeMatch: "portfolio/web-global/52_Module_E_Frontend" },
        { text: "53屆 模組C Design", link: "portfolio/web-global/53_Module_C_Design", activeMatch: "portfolio/web-global/53_Module_C_Design" },
        { text: "54屆 模組A Design", link: "portfolio/web-global/54_Module_A_Design", activeMatch: "portfolio/web-global/54_Module_A_Design" },
        { text: "54屆 模組E 線上點餐系統", link: "portfolio/web-global/54_Module_E_Frontend", activeMatch: "portfolio/web-global/54_Module_E_Frontend" },
      ],
    },
    {
      text: "網站 Web",
      collapsed: false,
      items: [
        { text: "網頁設計練習", link: "portfolio/網站Web/網頁設計練習", activeMatch: "portfolio/網站Web/網頁設計練習" },
        { text: "穀保家商2024成果展網站", link: "portfolio/網站Web/穀保家商2024成果展網站", activeMatch: "portfolio/網站Web/穀保家商2024成果展網站" },
        { text: "二元樹結構產生器", link: "portfolio/網站Web/二元樹結構產生器", activeMatch: "portfolio/網站Web/二元樹結構產生器" },
        { text: "圈圈差差", link: "portfolio/網站Web/圈圈差差", activeMatch: "portfolio/網站Web/圈圈差差" },
      ],
    },
    {
      text: "專題競賽作品 - 碳棄",
      collapsed: false,
      items: [
        { text: "網站 - 碳棄", link: "portfolio/專題/網站", activeMatch: "portfolio/專題/網站" },
        { text: "遊戲 - 減碳大作戰", link: "portfolio/專題/減碳大作戰", activeMatch: "portfolio/專題/減碳大作戰" },
        { text: "AI - 減碳相機", link: "portfolio/專題/AI減碳相機", activeMatch: "portfolio/專題/AI減碳相機" },
      ],
    },
    {
      text: "Python 工具",
      collapsed: false,
      items: [
        { text: "資料夾路徑README生成器", link: "portfolio/python小工具/資料夾路徑README生成器", activeMatch: "portfolio/python小工具/資料夾路徑README生成器" },
        { text: "檔案分類器", link: "portfolio/python小工具/檔案分類器", activeMatch: "portfolio/python小工具/檔案分類器" },
        { text: "檔案重新命名器", link: "portfolio/python小工具/檔案重新命名器", activeMatch: "portfolio/python小工具/檔案重新命名器" },
        { text: "大量調整影像大小器", link: "portfolio/python小工具/大量調整影像大小", activeMatch: "portfolio/python小工具/大量調整影像大小" },
      ],
    },
  ];
}
