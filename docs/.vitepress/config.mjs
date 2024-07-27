import { defineConfig } from "vitepress";
import { nav } from "./config/nav";
import {
  sidebarGit,
  sidebarPythonNation,
  sidebarPythonNoob,
  sidebarPortfolio,
  sidebarPhp,
  sidebarCss,
  sidebarJavascript,
} from "./config/sidebar";

export default defineConfig({
  base: '/LucasHsu.dev/',
  title: "LucasHsu.dev",
  description: "部落格&作品集&比賽事蹟&演算法筆記",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/LucasHsu.dev/logo/favicon.ico",
      },
    ],
    [
      'script',
      {
        src: '/LucasHsu.dev/js/linebox.js',
        defer: true, // 確保腳本在 DOM 加載後執行
      }
    ],
  ],
  themeConfig: {
    logo: "/logo/favicon.ico",
    nav: nav(),
    sidebar: {
      "/python/112全國技藝競賽筆記": sidebarPythonNation(),
      "/python/新手上路系列": sidebarPythonNoob(),
      "/portfolio/": sidebarPortfolio(),
      "/php/": sidebarPhp(),
      "/javascript/": sidebarJavascript(),
      "/css/": sidebarCss(),
      "/git/": sidebarGit(),
    },
    docFooter: {
      prev: "前一篇",
      next: "下一篇",
    },
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/lucashsu95" }],
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Lucas Hsu`,
    },
    lastUpdated: true,
  },
  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    image: {
      lazyLoading: true
    },
    // lineNumbers: true
    math: true
  },
});
