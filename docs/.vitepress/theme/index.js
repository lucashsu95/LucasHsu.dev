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

import TocList from "./components/TocList.vue";
import CarrySystem from "./components/CarrySystem.vue";
import SecretPage from "./components/SecretPage.vue";
import SlideButton from "./components/SlideButton.vue";
import FileDownloadCard from "./components/FileDownloadCard.vue";
import JavaInputCompare from "./components/JavaInputCompare.vue";
import ArrayListCompare from "./components/ArrayListCompare.vue";
import JavaInterfaceLab from "./components/JavaInterfaceLab.vue";
import CssPositionLab from "./components/CssPositionLab.vue";
import CssDisplayLab from "./components/CssDisplayLab.vue";
import CssGridLab from "./components/CssGridLab.vue";
import CssRwdLab from "./components/CssRwdLab.vue";
import SpringFpLab from "./components/SpringFpLab.vue";
import SpringDddLab from "./components/SpringDddLab.vue";
import SimpleCounter from "./components/SimpleCounter.vue";
import UltimatePassword from "./components/UltimatePassword.vue";
import BouncingModal from "./components/BouncingModal.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import ChatBot from "./components/ChatBot.vue";
import WebComponentDemo from "./components/WebComponentDemo.vue";
import HeroIntro from "./components/HeroIntro.vue";
import StatBoard from "./components/StatBoard.vue";
import FeaturedWork from "./components/FeaturedWork.vue";
import AwardList from "./components/AwardList.vue";
import WorkGrid from "./components/WorkGrid.vue";

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
      "home-hero-before": () => h(HeroIntro),
      "home-features-after": () =>
        h("div", { class: "lh-home-extras" }, [
          h(StatBoard),
          h(FeaturedWork),
        ]),
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
    app.component("TocList", TocList);
    app.component('CarrySystem',CarrySystem);
    app.component('SecretPage',SecretPage);
    app.component('SlideButton',SlideButton);
    app.component('FileDownloadCard', FileDownloadCard);
    app.component('JavaInputCompare', JavaInputCompare);
    app.component('ArrayListCompare', ArrayListCompare);
    app.component('JavaInterfaceLab', JavaInterfaceLab);
    app.component('CssPositionLab', CssPositionLab);
    app.component('CssDisplayLab', CssDisplayLab);
    app.component('CssGridLab', CssGridLab);
    app.component('CssRwdLab', CssRwdLab);
    app.component('SpringFpLab', SpringFpLab);
    app.component('SpringDddLab', SpringDddLab);
    app.component('SimpleCounter', SimpleCounter);
    app.component('UltimatePassword', UltimatePassword);
    app.component('BouncingModal', BouncingModal);
    app.component('ShoppingCart', ShoppingCart);
    app.component('ChatBot', ChatBot);
    app.component('WebComponentDemo', WebComponentDemo);
    app.component("AwardList", AwardList);
    app.component("WorkGrid", WorkGrid);
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
