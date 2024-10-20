import { defineConfig, loadEnv } from "vitepress";
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
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'

const env = loadEnv("", process.cwd());

export default defineConfig({
  vite: {
    define: {
      "process.env": env,
    },
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui",
        "@nolebase/vitepress-plugin-inline-link-preview/client",
      ],
    },
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/ui",
        "@nolebase/vitepress-plugin-inline-link-preview",
      ],
    },
    plugins: [ 
      GitChangelog({ 
        repoURL: () => 'https://github.com/lucashsu95/LucasHsu.dev', 
      }), 
      GitChangelogMarkdownSection(), 
    ],
  },
  base: "/LucasHsu.dev/",
  title: "LucasHsu.dev",
  description: "部落格&作品集&比賽事蹟&演算法筆記",
  lang: "zh-TW",
  cleanUrls: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/LucasHsu.dev/logo/favicon.ico",
      },
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
      copyright: `Copyright © ${new Date().getFullYear()} ｜ Lucas Hsu`,
    },
    lastUpdated: true,
  },
  markdown: {
    theme: { light: "vitesse-light", dark: "vitesse-dark" },
    image: {
      lazyLoading: true,
    },
    math: true,
    config: (md) => {
      md.use(InlineLinkPreviewElementTransform);
    },
  },
  sitemap: {
    hostname: "https://lucashsu95.github.io/LucasHsu.dev",
  },
});
