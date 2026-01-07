---
head:
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.jpg
---

# Vue 新手上路 Day01

先準備好html，vue是一個漸進式框架，可以直接使用cdn來做學習，不用一開始就接觸一大包

```html
<div id="app">
    <button @click="handleClick">{{ count }}</button>
</div>
```

::: code-group

```js [Options API]
Vue.createApp({
    data() {
        return {
            count: 0
        }
    },
    methods: {
        handleClick() {
            this.count++
        }
    }
}).mount("#app")
```

```js [Composition API]
Vue.createApp({
    setup() {
        const count = Vue.ref(0);
        const handleClick = () => {
            count.value++
        }

        return {
            count,
            handleClick
        }
    }
}).mount("#app")
```
:::


## DOM抓取

不要在使用`document.querySelector()`
使用`ref`

```html
<div id="app">
    <h2 ref="h2Text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, dolorem?
    </h2>
</div>
```

`mounted()`是當程式開始執行時會做裡面的事情
```js
Vue.createApp({
    mounted() {
        console.log(this.$refs.h2Text);
        this.$refs.h2Text.innerHTML = "Hello World";
    },
}).mount("#app");
```

