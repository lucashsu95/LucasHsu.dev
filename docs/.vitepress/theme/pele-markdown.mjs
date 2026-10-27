/**
 * markdown-it 規則：把 ```mermaid fence 轉成 pele 渲染的佔位元素。
 *
 * 取代 vitepress-plugin-mermaid 的 MermaidMarkdown：原始碼以
 * encodeURIComponent 放進 data 屬性（雙引號屬性內安全），
 * 由 theme/pele-diagrams.js 在內容更新時用 pele.mount() 畫出來。
 */
export function PeleMermaidMarkdown(md, options = {}) {
  const cssClass = options.class || "pele-mermaid";
  const fence = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, index, opts, env, slf) => {
    const token = tokens[index];
    const info = token.info.trim();
    // "mmd" 為舊插件的別名（Shiki 預設語法也認 mmd），一併支持
    if (info === "mermaid" || info === "mmd") {
      const id = `pele-${index}`;
      const source = encodeURIComponent(token.content);
      return (
        `<div class="${cssClass}" data-pele-source="${source}" data-pele-id="${id}">` +
        `<span class="pele-mermaid-loading">載入圖表…</span>` +
        `</div>`
      );
    }
    return fence(tokens, index, opts, env, slf);
  };
}
