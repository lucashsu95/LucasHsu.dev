---
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: js,正規表達式,regex,match,抓取
  - - meta
    - property: og:title
      content: Regex 正規表達式 - javascript
  - - meta
    - property: og:description
      content: 正規表達式是被用來匹配字串中字元組合的模式。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.png
---

# Regex 正規表達式 JS為例

- [學習網站](https://regex101.com/)

## 範例1
```javascript
const st = `
[越是忙碌，越是不能忽略人情世故](https://www.google.com/)[在公司中有分兩個單位，賺錢的單位和花錢的單位](https://www.google.com/)[自己想做的事都要犧牲，才叫努力](https://www.google.com/)[送到嘴邊的肉哪有不吃的道理，但俗話說免費的最貴‌](https://www.google.com/)[自己的利益要自己去爭取‌](https://www.google.com/)[即便頭腦會出錯，但是血脈不會錯‌](https://www.google.com/)[日久生情，一見鍾情‌](https://www.google.com/)[入鮑魚之肆，就而不知其臭，入幽蘭之室，就而不知其香‌](https://www.google.com/)[人生都是自己選擇的，沒人會逼你](https://www.google.com/)[此刻的我—感受到我在燃燒著生命，有活著的感覺](https://www.google.com/)[這就是你的價值](https://www.google.com/)[一切都會好起來的](https://www.google.com/)[Why are we still here, just to suffer? (為什麼我們還留在這裡，只是為了受苦？)](https://www.google.com/)[世界這個東西，不是只對你一個人溫柔。](https://www.google.com/)[有的時候，我就是好想逃離那一切‌‌](https://www.google.com/)[這世界是何時讓人如此沮喪](https://www.google.com/)[生活不是如何通過風暴，而是如何在雨中起舞](https://www.google.com/)[儘管知道這題做不出來也還是會抱著「就算我要花3天，我也要知道這題解出來」的覺悟](https://www.google.com/)[很多知識是需要花大量時間來去獲得的](https://www.google.com/)[無須抱持希望，希望是留給沒準備好的人‌](https://www.google.com/)[緊張是留給沒準備好的人](https://www.google.com/)[不要緊張…就當出去玩](https://www.google.com/)[做最壞的打算，和最好的準備‌](https://www.google.com/)[你什麼都可以錯，但別錯誤上台領獎](https://www.google.com/)[程式碼就跟女生的迷你裙一樣越短越好](https://www.google.com/)[程式設計師不是一種職業，而是一種生活方式。](https://www.google.com/)[你年紀這麼大又單身，一定存了很多錢吧！](https://www.google.com/)[我強大的信仰，豈能是被環境給左右的](https://www.google.com/)[與輸贏沒關係，這是願望。](https://www.google.com/)[從那天開始，我就一直在撒謊，活著是謊言，名字是謊言，經歷也是謊言，都是謊言。 我早已厭倦了這個毫不改變的世界，但這謊言讓人絕望到想放棄都不行‌](https://www.google.com/)[一線希望來自光明之影，降落正義之劍‌即便頭腦會出錯，但是血脈不會錯‌](https://www.google.com/)[不管夜晚有多黑暗，黎明總是會到來‌](https://www.google.com/)[韓國的純愛，就只有在醃泡菜的時候，是一心一意的](https://www.google.com/)[歷史，從來都是由勝利者書寫的。‌](https://www.google.com/)[5W1H](https://www.google.com/)[不用怕聊不起來，對方想聊自然而然就聊起來了。](https://www.google.com/)[所以…你快樂的秘訣是什麼?(可對著那些很痛苦的人說)](https://www.google.com/)[出淤泥而不染](https://www.google.com/)[這世界是何時讓人感到如此沮喪](https://www.google.com/)[我相信賺錢的本領不在頭皮上面而在頭皮下面](https://www.google.com/)[做人不能這樣缺狗糧才知道來找我‌](https://www.google.com/)[猶豫過久而得出的答案，無論如何選擇都會後悔，既然如此反正都要後悔的話，就選擇當下的快樂吧‌](https://www.google.com/)[遠上寒山石徑斜，白雲深山有人家，停車坐愛楓林晚，霜葉紅於二月花。‌](https://www.google.com/)[不努力是社會的錯，壞心腸是環境的錯，顏值低是基因的錯，不責備自己歸咎於他人才是正解。‌](https://www.google.com/)[話不投機，半句多](https://www.google.com/)
`

const regex = /\[(.*?)\]\((.*?)\)/g // 準備好邏輯條件
const result = st.matchAll(regex) // 使用matchAll()做regex
for (const match of result) {       // 用for迭代出每個結果
    console.log(match[1]);
}
```

## 範例2


取一個`in.txt`裡的文字內容，要把所有question裡的值都從文字檔裡抓出來，最後輸出到`out.txt`

- [想要更了解JS對檔案的操作?](./node-fs)

### in.txt
```txt
{ question: "hello", answer: "h" },{ question: "abc", answer: "a" },
{ question: "today", answer: "t" }
```

### main.js
```javascript
const fs = require("fs");
fs.readFile("in.txt", "utf8", (err, data) => {
  const regex = /question:\s*"([^"]+)"/gm;
  let match;
  while ((match = regex.exec(data))) {
    fs.appendFileSync("out.txt", match[1] + "\n");
    console.log(match[1]);
  }
});
```