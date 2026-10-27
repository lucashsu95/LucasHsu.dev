/**
 * pele 圖表掛載：內容更新時（初始＋路由切換）找出
 * .pele-mermaid 佔位元素，用 pele.mount() 同步畫出 SVG。
 *
 * - pele 用 dynamic import 延遲到瀏覽器端才載入：SSR pre-render
 *   完全不會碰到它（pele 是 browser-only），客戶端自動切成獨立 chunk
 * - mount() 會跟容器寬度與字型變化自動重排
 * - 主題切換走 CSS 變數（.dark 下的 --pele-*），不需重繪
 * - 路由切換後容器脫離 DOM 的實例會 destroy()，避免 ResizeObserver 洩漏
 * - 畫不出來的圖（語法錯誤等）由 pele 在容器內顯示錯誤訊息
 */
let cachedMount = null;
const mounted = new Map();

async function loadMount() {
  if (!cachedMount) {
    const mod = await import("pele");
    cachedMount = mod.mount;
  }
  return cachedMount;
}

export async function mountPeleDiagrams(root = document) {
  if (typeof document === "undefined") return;

  for (const [el, m] of [...mounted]) {
    if (!el.isConnected) {
      m.destroy();
      mounted.delete(el);
    }
  }

  const mount = await loadMount();
  const nodes = root.querySelectorAll(
    '[data-pele-source]:not([data-pele-mounted="true"])'
  );
  nodes.forEach((el) => {
    const source = decodeURIComponent(el.dataset.peleSource);
    const m = mount(el, source, {
      idPrefix: el.dataset.peleId || "pele",
    });
    mounted.set(el, m);
    el.setAttribute("data-pele-mounted", "true");
  });
}
