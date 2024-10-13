export function sidebarJavascript() {
    return [
      {
        text: 'Base',
        items:[
          { text: 'OOP 物件導向', link: '/javascript/base/OOP', activeMatch: '/javascript/base/OOP' },
        ]
      },
      {
        text: 'Functions',
        items:[
          { text: 'Object.apply()', link: '/javascript/functions/Object.apply', activeMatch: '/javascript/functions/Object.apply' },
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
  