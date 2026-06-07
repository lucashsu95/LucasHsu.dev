export function sidebarDevops() {
  return [
    {
      text: 'DevOps 工具',
      collapsed: false,
      items: [
        { text: '開發工具總覽', link: '/devops/', activeMatch: '/devops/$' },
        { text: 'Tmux 終端機多工器完全指南', link: '/devops/tmux-guide', activeMatch: '/devops/tmux-guide' },
        { text: 'VSCode 安裝與設定', link: '/devops/install-vscode', activeMatch: '/devops/install-vscode' },
        { text: 'WSL 安裝與 VS Code 連線', link: '/devops/install-wsl', activeMatch: '/devops/install-wsl' },
        { text: 'ESLint 與 Prettier 設定', link: '/devops/init-eslint-prettier', activeMatch: '/devops/init-eslint-prettier' },
        { text: 'jsconfig / viteConfig 初始化', link: '/devops/init-jsconfig-viteConfig', activeMatch: '/devops/init-jsconfig-viteConfig' },
        { text: 'LaTeX DevContainer 指南', link: '/devops/latex-devcontainer-guide', activeMatch: '/devops/latex-devcontainer-guide' },
      ],
    },
  ];
}
