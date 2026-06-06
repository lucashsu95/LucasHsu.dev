export function sidebarOther() {
  return [
    {
      text: '開發工具',
      collapsed: false,
      items: [
        { text: '開發工具總覽', link: '/other/', activeMatch: '/other/$' },
        { text: 'VSCode 安裝與設定', link: '/other/安裝vscode', activeMatch: '/other/安裝vscode' },
        { text: 'WSL 安裝與 VS Code 連線', link: '/other/install-wsl', activeMatch: '/other/install-wsl' },
        { text: 'ESLint 與 Prettier 設定', link: '/other/init-eslint-prettier', activeMatch: '/other/init-eslint-prettier' },
        { text: 'jsconfig / viteConfig 初始化', link: '/other/init-jsconfig-viteConfig', activeMatch: '/other/init-jsconfig-viteConfig' },
        { text: 'LaTeX DevContainer 指南', link: '/other/latex-devcontainer-guide', activeMatch: '/other/latex-devcontainer-guide' },
      ],
    },
  ];
}
