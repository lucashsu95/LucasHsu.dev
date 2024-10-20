// Import necessary modules and components
import { h, onMounted, watch, nextTick } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";

// Import custom components
import GtmScript from "./components/GtmScript.vue";
import MyLayout from "./components/MyLayout.vue"; // busuanzi.pure.js

// Import custom styles
import "./style.css";
import "./costom.css";

// vitepress-plugin-back-to-top
import vitepressBackToTop from "vitepress-plugin-back-to-top";
import "vitepress-plugin-back-to-top/dist/style.css";

// vitepress-plugin-google-analytics
import googleAnalytics from "vitepress-plugin-google-analytics";

// vitepress-plugin-life-progress
import vitepressLifeProgress from "vitepress-plugin-life-progress";
import "vitepress-plugin-life-progress/lib/css/index.css";

// vitepress-plugin-enhanced-mark
import "@nolebase/vitepress-plugin-enhanced-mark/client/style.css";

// vitepress-plugin-highlight-targeted-heading
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";

// vitepress-plugin-enhanced-readabilities
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";

// vitepress-plugin-inline-link-preview
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";

// vitepress-plugin-git-changelog
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

function reloadBusuanzi() {
  const busuanziScriptId = "busuanzi-script";

  const existingScript = document.getElementById(busuanziScriptId);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.id = busuanziScriptId;
  script.src =
    "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  script.async = true;

  document.body.appendChild(script);
}

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-top": () => [h(NolebaseHighlightTargetedHeading), h(GtmScript)],
      "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
      "nav-screen-content-after": () =>
        h(NolebaseEnhancedReadabilitiesScreenMenu),
      "aside-bottom": () => h(MyLayout),
    });
  },
  enhanceApp(ctx) {
    vitepressBackToTop({
      threshold: 300,
    });

    googleAnalytics({
      id: process.env.VITE_GOOGLE_ANALYTICS_ID,
    });
    const { app } = ctx;

    app.use(NolebaseInlineLinkPreviewPlugin);
    app.use(NolebaseGitChangelogPlugin,);
  },
  setup() {
    vitepressLifeProgress();
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
      reloadBusuanzi();
    });
    watch(
      () => route.path,
      () =>
        nextTick(() => {
          initZoom();
          reloadBusuanzi();
        })
    );
  },
};
