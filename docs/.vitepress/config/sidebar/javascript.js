export function sidebarJavascript() {
  return [
    {
      text: '基礎教學',
      collapsed: false,
      items: [
        { text: 'Day 1: 先講好規則', link: '/javascript/Days/Day1', activeMatch: '/javascript/Days/Day1' },
        { text: 'Day 2: 判斷式 if...else', link: '/javascript/Days/Day2', activeMatch: '/javascript/Days/Day2' },
        { text: 'Day 3: 迴圈 For & While', link: '/javascript/Days/Day3', activeMatch: '/javascript/Days/Day3' },
      ]
    },
    {
      text: '網頁操作範例',
      collapsed: false,
      items: [
        { text: '簡易計數器', link: '/javascript/網頁操作/簡易計數器', activeMatch: '/javascript/網頁操作/簡易計數器' },
        { text: '終極密碼遊戲', link: '/javascript/網頁操作/終極密碼', activeMatch: '/javascript/網頁操作/終極密碼' },
        { text: '待辦事項清單 (TodoList)', link: '/javascript/網頁操作/TodoList', activeMatch: '/javascript/網頁操作/TodoList' },
        { text: '購物車範例', link: '/javascript/網頁操作/購物車', activeMatch: '/javascript/網頁操作/購物車' },
        { text: '聊天機器人', link: '/javascript/網頁操作/聯天機器人', activeMatch: '/javascript/網頁操作/聯天機器人' },
        { text: '傳統時鐘製作指南', link: '/javascript/網頁操作/傳統時鐘製作指南', activeMatch: '/javascript/網頁操作/傳統時鐘製作指南' },
      ],
    },
    {
      text: 'JavaScript 進階(?)',
      collapsed: true,
      items: [
        { text: 'export 和 import', link: '/javascript/basic/export-import', activeMatch: '/javascript/basic/export-import' },
        { text: '物件導向程式設計 (OOP)', link: '/javascript/basic/OOP', activeMatch: '/javascript/basic/OOP' },
        { text: '正規表達式 (Regex)', link: '/javascript/basic/regex', activeMatch: '/javascript/basic/regex' },
        { text: '異步處理 - Promise', link: '/javascript/basic/asynchronous', activeMatch: '/javascript/basic/asynchronous' },
        { text: 'fetch() 函數', link: '/javascript/basic/fetch', activeMatch: '/javascript/basic/fetch' },
        { text: 'HTTP 請求方法', link: '/javascript/basic/http-request', activeMatch: '/javascript/basic/http-request' },
        { text: 'axios 使用 - next.js', link: '/javascript/basic/axios', activeMatch: '/javascript/basic/axios' },
        { text: 'Node.js 文件系統 (fs) 基本操作', link: '/javascript/basic/node-fs', activeMatch: '/javascript/basic/node-fs' },
      ]
    },
    {
      text: '物件函數',
      collapsed: true,
      items: [
        { text: '四捨五入 | round | toFixed', link: '/javascript/functions/rounding', activeMatch: '/javascript/functions/rounding' },
        { text: 'slice, split, splice', link: '/javascript/functions/slice-split-splice', activeMatch: '/javascript/functions/slice-split-splice' },
        { text: 'call, apply, bind', link: '/javascript/functions/call-apply-bind', activeMatch: '/javascript/functions/call-apply-bind' },
        { text: 'Object.assign()', link: '/javascript/functions/Object.assign', activeMatch: '/javascript/functions/Object.assign' },
        { text: 'Object.entries()', link: '/javascript/functions/Object.entries', activeMatch: '/javascript/functions/Object.entries' },
        { text: 'Object.groupBy()', link: '/javascript/functions/Object.groupBy', activeMatch: '/javascript/functions/Object.groupBy' },
        { text: 'Object.hasOwn()', link: '/javascript/functions/Object.hasOwn', activeMatch: '/javascript/functions/Object.hasOwn' },
      ]
    },
  ];
}