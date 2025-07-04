export function sidebarGit() {
  return [
    {
      text: 'Git 學習筆記',
      items: [
        { text: '初次下載git', link: '/git/初次下載git', activeMatch: '/git/初次下載git' },
        { text: 'git staging 暫存區', link: '/git/git-staging', activeMatch: '/git/git-staging' },
        { text: 'git commit 提交', link: '/git/git-commit', activeMatch: '/git/git-commit' },
        { text: 'git push 推送', link: '/git/git-push', activeMatch: '/git/git-push' },
        { text: 'git branch 分支', link: '/git/git-branch', activeMatch: '/git/git-branch' },
        { text: 'git tag 標籤', link: '/git/git-tag', activeMatch: '/git/git-tag' },
        { text: 'git revert 分支', link: '/git/git-revert', activeMatch: '/git/git-revert' },
        { text: 'git clone 克隆', link: '/git/git-clone', activeMatch: '/git/git-clone' },
        { text: 'git diff 克隆', link: '/git/git-diff', activeMatch: '/git/git-diff' },
        { text: 'github fork後同步遠端分支的方法', link: '/git/git-fork-after', activeMatch: '/git/git-fork-after' },
        { text: '電腦上移除git', link: '/git/電腦上移除git', activeMatch: '/git/電腦上移除git' },
      ],
    },
  ];
}
