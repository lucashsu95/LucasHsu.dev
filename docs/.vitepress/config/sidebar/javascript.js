export function sidebarJavascript() {
  return [
    {
      text: 'Basic',
      items: [
        { text: '關於 export和import', link: '/javascript/advanced/export-import', activeMatch: '/javascript/advanced/export-import' },
        { text: 'OOP 物件導向', link: '/javascript/advanced/OOP', activeMatch: '/javascript/advanced/OOP' },
        { text: '正規表達式 Regex', link: '/javascript/advanced/regex', activeMatch: '/javascript/advanced/regex' },
        { text: 'Nodejs fs 基本操作', link: '/javascript/advanced/node-fs', activeMatch: '/javascript/advanced/node-fs' },
      ]
    },
    {
      text: 'Object Functions',
      collapsed: false,
      items: [
        { text: '四捨五入', link: '/javascript/functions/rounding', activeMatch: '/javascript/functions/rounding' },
        { text: 'slice,split,splice', link: '/javascript/functions/slice-split-splice', activeMatch: '/javascript/functions/slice-split-splice' },
        { text: 'call,apply,bind', link: '/javascript/functions/call-apply-bind', activeMatch: '/javascript/functions/call-apply-bind' },
        { text: 'Object.assign()', link: '/javascript/functions/Object.assign', activeMatch: '/javascript/functions/Object.assign' },
        { text: 'Object.entries()', link: '/javascript/functions/Object.entries', activeMatch: '/javascript/functions/Object.entries' },
        { text: 'Object.groupBy()', link: '/javascript/functions/Object.groupBy', activeMatch: '/javascript/functions/Object.groupBy' },
        { text: 'Object.hasOwn()', link: '/javascript/functions/Object.hasOwn', activeMatch: '/javascript/functions/Object.hasOwn' },
      ]
    },
    {
      text: '網頁操作',
      collapsed: false,
      items: [
        { text: '簡意計數器', link: '/javascript/網頁操作/簡意計數器', activeMatch: '/javascript/網頁操作/簡意計數器' },
        { text: 'TodoList', link: '/javascript/網頁操作/TodoList', activeMatch: '/javascript/網頁操作/TodoList' },
        { text: '購物車', link: '/javascript/網頁操作/購物車', activeMatch: '/javascript/網頁操作/購物車' },
        { text: '聊天機器人', link: '/javascript/網頁操作/聯天機器人', activeMatch: '/javascript/網頁操作/聯天機器人' },
      ],
    },
  ];
}
