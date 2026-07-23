export const stats = [
  { value: 1, suffix: "", label: "國手選拔備取", detail: "國際技能競賽" },
  { value: 3, suffix: "rd", label: "全國技能競賽", detail: "54 屆網頁技術" },
  { value: 4, suffix: "th", label: "金手獎", detail: "112 程式設計" },
  { value: 2, suffix: "", label: "上線系統", detail: "校務平台" },
];

export const featuredWorks = [
  {
    title: "54 屆 線上點餐系統",
    description: "全國技能競賽模組 E — Vue + Vite + Bootstrap",
    image: "/portfolio/web-global/54_Module_E_Frontend/image.webp",
    tags: ["Vue", "Vite", "Bootstrap"],
    demo: "https://lucashsu95.github.io/web-global-public/54/module_E/",
    link: "/portfolio/web-global/54_Module_E_Frontend",
  },
  {
    title: "自定題目練習系統",
    description: "可自建題庫的線上練習系統 — Vue 打造的教學工具",
    image: "/portfolio/網站Web/assets/自定題目練習系統/img/image.webp",
    tags: ["Vue", "Education"],
    link: "/portfolio/網站Web/自定題目練習系統",
  },
  {
    title: "碳棄 — 減碳行銷網站",
    description: "專題競賽 — Vue + Bootstrap + Chart.js + PHP",
    image: "/portfolio/web-global/53_Module_C_Design/image.webp",
    tags: ["Vue", "PHP", "Chart.js"],
    demo: "https://github.com/lucashsu95/My_web",
    link: "/portfolio/專題/網站",
  },
  {
    title: "校網設備報修系統",
    description: "穀保家商上線系統 — 校務數位化",
    image: "/portfolio/web-global/54_Module_A_Design/image.webp",
    tags: ["Web App", "Production"],
    demo: "https://repair.kpvs.ntpc.edu.tw/repair-system/",
    link: "/about/",
  },
];

export const skillTags = [
  "Python",
  "Java",
  "JavaScript",
  "Vue",
  "Spring Boot",
  "PHP",
  "MySQL",
  "Docker",
  "Git",
];

// Unified timeline — sorted newest first. `date` drives ordering & display.
export const awardTimeline = [
  { date: "2026/07/15", year: "2026", category: "程式競賽", title: "第十一屆全國科技大專校院程式競賽（TUPC 2026）", rank: "銅牌", medal: "bronze", featured: true, photosDir: "tupc-2026" },
  { date: "2026/06/06", year: "2026", category: "程式競賽", title: "跨校聯盟程式設計競賽（進階組）", rank: "優選", medal: "silver", featured: true, photosDir: "inter-school-programming-2026" },
  { date: "2026/05/23", year: "2026", category: "程式競賽", title: "全國大專 Python 數據精英挑戰賽", rank: "優勝", medal: "honor" },
  { date: "2026/05/09", year: "2026", category: "榮譽", title: "穀保家商 傑出校友受獎", rank: "傑出校友", medal: "gold", featured: true, photosDir: "kpvs-outstanding-alumni-2026" },
  { date: "2026/05/09", year: "2026", category: "程式競賽", title: "致理科大全國程式力競賽", rank: "優勝", medal: "honor" },
  { date: "2025", year: "2025", category: "程式競賽", title: "第 48 屆國際技能競賽第二階段國手選拔賽", rank: "備取國手", medal: "gold", featured: true, photosDir: "worldskills-48-national-team" },
  { date: "2025", year: "2025", category: "程式競賽", title: "九校聯盟程式設計競賽（初階組）", rank: "第二名", medal: "silver", featured: true, photosDir: "nine-school-programming-2025" },
  { date: "2025", year: "2025", category: "程式競賽", title: "第 54 屆全國技能競賽（全國賽）", rank: "第三名", medal: "bronze", featured: true, photosDir: "54-national-skills-3rd" },
  { date: "2024", year: "2024", category: "程式競賽", title: "第 54 屆全國技能競賽（北區賽）", rank: "第一名", medal: "gold" },
  { date: "2024", year: "2024", category: "專題競賽", title: "112 年度全國高級中等學校專業群科專題及創意製作競賽", rank: "複賽優勝 / 決賽入選", medal: "gold", featured: true, photosDir: "112-project-competition" },
  { date: "2024", year: "2024", category: "專題競賽", title: "2024 景文科技大學全國高中職專題競賽", rank: "第三名", medal: "bronze" },
  { date: "2024", year: "2024", category: "專題競賽", title: "2024 COOL 酷酷比城市盃全國大專校", rank: "第二名", medal: "silver" },
  { date: "2024", year: "2024", category: "榮譽", title: "教育部人文社會永續行動創新應用競賽", rank: "優選", medal: "honor", featured: true, photosDir: "moe-humanities-innovation-2024" },
  { date: "2024", year: "2024", category: "程式競賽", title: "第 53 屆全國技能競賽（全國賽）", rank: "佳作", medal: "honor" },
  { date: "2024", year: "2024", category: "程式競賽", title: "第 53 屆全國技能競賽（北區賽）", rank: "第四名", medal: "honor" },
  { date: "2023", year: "2023", category: "程式競賽", title: "第 52 屆全國技能競賽（北區賽）", rank: "佳作", medal: "honor" },
  { date: "2023", year: "2023", category: "程式競賽", title: "112 全國技藝競賽 — 程式設計", rank: "金手獎第四名", medal: "gold", featured: true, photosDir: "112-programming-gold-hand" },
  { date: "2023", year: "2023", category: "程式競賽", title: "112 年 TQC 資訊月 Python 程式設計", rank: "北區第二名 / 全國優勝", medal: "silver" },
  { date: "2023", year: "2023", category: "榮譽", title: "112 全國技藝教育績優人員", rank: "獲選", medal: "gold" },
  { date: "2022", year: "2022", category: "專題競賽", title: "111 年度城市盃專題製作競賽", rank: "特優", medal: "gold" },
];

export const certifications = [
  { title: "乙级技術士證照 — 網頁設計", featured: true },
  { title: "乙级技術士證照 — 電腦軟體應用" },
  { title: "PVQC 專業英文詞彙證照 — 計算機概論" },
  { title: "TQC — Word 2016 進階級" },
];

export const liveSystems = [
  {
    title: "穀保家商學校校網設備故障報修系統",
    url: "https://repair.kpvs.ntpc.edu.tw/repair-system/",
    featured: true,
  },
  {
    title: "穀保家商學校專業教室借用預約系統",
    url: "https://repair.kpvs.ntpc.edu.tw/booking-system-frontend/",
    featured: true,
  },
];

export const workGridSections = [
  {
    title: "全國技能競賽",
    items: [
      { title: "49 屆 模組 A 俄羅斯方塊", year: "2019", link: "/portfolio/web-global/49_Module_A_Game", image: "/portfolio/web-global/49_Module_A_Game/image.webp", tags: ["Game", "JS"] },
      { title: "52 屆 模組 E 學生管理系統", year: "2022", link: "/portfolio/web-global/52_Module_E_Frontend", image: "/portfolio/web-global/52_Module_E_Frontend/image.webp", tags: ["Vue", "Frontend"] },
      { title: "53 屆 模組 C Design", year: "2023", link: "/portfolio/web-global/53_Module_C_Design", image: "/portfolio/web-global/53_Module_C_Design/image.webp", tags: ["Design", "UI"] },
      { title: "54 屆 模組 A Design", year: "2024", link: "/portfolio/web-global/54_Module_A_Design", image: "/portfolio/web-global/54_Module_A_Design/image.webp", tags: ["Design", "UI"] },
      { title: "54 屆 模組 E 線上點餐系統", year: "2024", link: "/portfolio/web-global/54_Module_E_Frontend", image: "/portfolio/web-global/54_Module_E_Frontend/image.webp", tags: ["Vue", "Vite"], demo: "https://lucashsu95.github.io/web-global-public/54/module_E/" },
    ],
  },
  {
    title: "網站 Web",
    items: [
      { title: "網頁設計練習", link: "/portfolio/網站Web/網頁設計練習", tags: ["HTML", "CSS"] },
      { title: "穀保家商 2024 成果展網站", link: "/portfolio/網站Web/穀保家商2024成果展網站", tags: ["Web"], demo: "https://lucashsu95.github.io/2024_school_result/" },
      { title: "二元樹結構產生器", link: "/portfolio/網站Web/二元樹結構產生器", image: "/portfolio/網站Web/assets/二元樹結構產生器/image.webp", tags: ["Algorithm", "JS"] },
      { title: "圈圈差差", link: "/portfolio/網站Web/圈圈差差", tags: ["Game"], demo: "https://lucashsu95.github.io/tic-tac-toe/" },
      { title: "值日生自動排班系統", link: "/portfolio/網站Web/值日生自動排班系統", image: "/portfolio/網站Web/assets/選手村值日生/image.webp", tags: ["Vue", "Tool"] },
      { title: "自定題目練習系統", link: "/portfolio/網站Web/自定題目練習系統", image: "/portfolio/網站Web/assets/自定題目練習系統/img/image.webp", tags: ["Vue", "Education"] },
    ],
  },
  {
    title: "專題競賽 — 碳棄",
    items: [
      { title: "網站 — 碳棄", link: "/portfolio/專題/網站", image: "/portfolio/web-global/53_Module_C_Design/image.webp", tags: ["Vue", "PHP"] },
      { title: "遊戲 — 減碳大作戰", link: "/portfolio/專題/減碳大作戰", tags: ["Game", "Unity"] },
      { title: "AI — 減碳相機", link: "/portfolio/專題/AI減碳相機", tags: ["AI", "Python"] },
    ],
  },
  {
    title: "Python 工具",
    items: [
      { title: "hsutools cmd 檔案操作工具", link: "/portfolio/python小工具/hsutools", tags: ["Python", "CLI"] },
      { title: "大量調整影像大小器", link: "/portfolio/python小工具/大量調整影像大小", tags: ["Python", "Image"] },
    ],
  },
];
