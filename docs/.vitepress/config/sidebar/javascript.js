export function sidebarJavascript() {
    return [
      {
        text: 'Base',
        items:[
          { text: 'OOP 物件導向', link: '/javascript/base/OOP', activeMatch: '/javascript/base/OOP' },
          { text: '關於 slice,split,splice', link: '/javascript/base/slice-split-splice', activeMatch: '/javascript/base/slice-split-splice' },
          { text: '關於 call,apply,bind', link: '/javascript/base/call-apply-bind', activeMatch: '/javascript/base/call-apply-bind' },
          { text: '關於 export和import', link: '/javascript/base/export-import', activeMatch: '/javascript/base/export-import' },
          { text: '正規表達式 Regex', link: '/javascript/base/regex', activeMatch: '/javascript/base/regex' },
          { text: 'Nodejs fs 基本操作', link: '/javascript/base/node-fs', activeMatch: '/javascript/base/node-fs' },
        ]
      },
      {
        text: 'Object Functions',
        items:[
          { text: 'Object.assign()', link: '/javascript/functions/Object.assign', activeMatch: '/javascript/functions/Object.assign' },
          { text: 'Object.entries()', link: '/javascript/functions/Object.entries', activeMatch: '/javascript/functions/Object.entries' },
          { text: 'Object.groupBy()', link: '/javascript/functions/Object.groupBy', activeMatch: '/javascript/functions/Object.groupBy' },
          { text: 'Object.hasOwn()', link: '/javascript/functions/Object.hasOwn', activeMatch: '/javascript/functions/Object.hasOwn' },
        ]
      },
      {
        text: '網頁操作',
        items: [
          { text: '簡意計數器', link: '/javascript/網頁操作/簡意計數器', activeMatch: '/javascript/網頁操作/簡意計數器' },
          { text: 'TodoList', link: '/javascript/網頁操作/TodoList', activeMatch: '/javascript/網頁操作/TodoList' },
          { text: '購物車', link: '/javascript/網頁操作/購物車', activeMatch: '/javascript/網頁操作/購物車' },
          { text: '聊天機器人', link: '/javascript/網頁操作/聯天機器人', activeMatch: '/javascript/網頁操作/聯天機器人' },
        ],
      },
    ];
  }
  