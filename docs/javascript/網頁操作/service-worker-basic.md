---
head:
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/javascript-cover.webp
---

# Service Worker 入門指南：從零開始掌握 Web 背景服務

> 📝 TL;DR
- Service Worker = 背景腳本，可攔截請求、快取、離線、推播；需 HTTPS 或 localhost。
- PWA 安裝三件套：`manifest.json`、`sw.js`、有效 HTTPS；再通過 Lighthouse PWA 項目。
- 最小步驟：1) 建立 manifest + icons；2) 在頁面註冊 SW；3) SW 安裝時快取核心資產與離線頁；4) 挑選快取策略 (Cache First / Network First / Stale-While-Revalidate)。

## 前置知識
- 同源/路徑範圍：SW 只能控制與自身 scope 相同的路徑。
- 非同步 API：`Promise`、`fetch`、`caches` 基礎。
- HTTPS 限制：本地開發用 localhost，正式站需 HTTPS。

Service Worker 是現代 Web 開發的核心技術之一，它讓網頁能夠擁有類似原生 APP 的功能，包括離線瀏覽、背景運作和推播通知。本文將帶您從基礎開始，透過實際範例快速上手 Service Worker 開發。

## 什麼是 Service Worker？

Service Worker 本質上是瀏覽器在背景運行的腳本，它充當 Web 應用程式、瀏覽器與網路之間的**代理伺服器**。與一般的 JavaScript 不同，Service Worker：

- 運行在獨立的線程中，不會阻塞主線程
- 無法直接存取 DOM
- 完全基於事件驅動
- 可以在網頁關閉後繼續運作
- 只能在 HTTPS 環境下使用（localhost 除外）

### 核心特性
```javascript
// Service Worker 的基本特性示例
self.addEventListener('install', event => {
  console.log('Service Worker 安裝中...');
  // 在背景安裝，不影響主頁面
});

self.addEventListener('fetch', event => {
  console.log('攔截到網路請求:', event.request.url);
  // 可以控制所有網路請求
});
```

## PWA 安裝條件與 manifest 範例

1. 必須透過 HTTPS 提供
2. 註冊有效的 Service Worker
3. 提供 `manifest.json` (含名稱、icons、start_url、display)

```json
{
    "name": "My Awesome App",
    "short_name": "Awesome",
    "start_url": "/index.html",
    "scope": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#0f172a",
    "icons": [
        { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
}
```

HTML 記得掛上 manifest：

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#0f172a" />
```

## 安裝與測試清單
- DevTools → Application → Manifest：確保 icon、start_url 正常。
- DevTools → Application → Service Workers：勾選 *Update on reload*，確認 scope 範圍。
- Lighthouse 跑 PWA 檢查：至少通過「可安裝」「離線可用」。
- 關閉網路再訪問：驗證離線頁或快取回應是否生效。

## 實戰練習

### 練習 1：補上 manifest（簡單）⭐
> 為你的專案新增 manifest，包含名稱、兩個尺寸的 icon、start_url，並在 HTML 掛載。

:::details 💡 參考答案
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0f172a" />
```
:::

### 練習 2：離線頁（簡單）⭐
> 在 SW 安裝階段快取 `/offline.html`，並在抓不到網路時回傳它。

:::details 💡 參考答案
```javascript
const OFFLINE_PAGE = '/offline.html'
// install -> cache offline
// fetch nav -> return offline when network/cache miss
```
:::

### 練習 3：策略選擇（中等）⭐⭐
> 請為「API」與「靜態資源」分別選擇合適策略並實作。

:::details 💡 參考答案與提示
- 靜態：Cache First；API：Network First 或 Stale-While-Revalidate。
```javascript
if (isAsset) return cacheFirst(event.request)
if (isApi) return networkFirst(event.request)
```
:::

## 延伸閱讀
- MDN: [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- Google Web Dev: [Workbox](https://developer.chrome.com/docs/workbox/) - 用套件快速寫策略
- Web App Manifest 規範：欄位解釋與支援度

## FAQ
- Q: 為什麼 SW 沒有接管？
    - A: 檢查路徑 scope；確保在 HTTPS/localhost；瀏覽器需 reload 才會讓新 SW 控制現有頁面。
- Q: 更新 SW 後，舊檔還在被使用？
    - A: 啟用 `skipWaiting()` + `clients.claim()`，但記得評估是否會中斷使用者；常見做法是提示「有新版本可用」。
- Q: 離線測試時仍出現 404？
    - A: 確認 `fetch` 事件有處理 `mode === 'navigate'`，並在安裝時就快取 offline 頁面。
## Service Worker 生命週期

理解生命週期是掌握 Service Worker 的關鍵。完整的生命週期包括：

1. **註冊（Register）** → 2. **下載（Download）** → 3. **安裝（Install）** → 4. **啟動（Activate）** → 5. **控制（Control）**

### 1. 註冊 Service Worker

首先在主頁面中註冊 Service Worker：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>Service Worker 示範</title>
</head>
<body>
    <h1>我的第一個 Service Worker 應用</h1>
    
    <script>
        // 檢查瀏覽器支援度
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(registration => {
                        console.log('✅ Service Worker 註冊成功:', registration.scope);
                    })
                    .catch(error => {
                        console.error('❌ Service Worker 註冊失敗:', error);
                    });
            });
        } else {
            console.log('瀏覽器不支援 Service Worker');
        }
    </script>
</body>
</html>
```

### 2. 建立 Service Worker 檔案（sw.js）

```javascript
// sw.js - Service Worker 主檔案
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/images/logo.png'
];

// 安裝事件：預快取靜態資源
self.addEventListener('install', event => {
    console.log('🔧 Service Worker 安裝中...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 開始快取檔案');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ 所有檔案已快取');
                // 強制新的 Service Worker 立即啟動
                return self.skipWaiting();
            })
    );
});

// 啟動事件：清理舊快取
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker 啟動中...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // 清除舊版本的快取
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ 清除舊快取:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // 立即控制所有頁面
                return self.clients.claim();
            })
    );
});

// 攔截網路請求
self.addEventListener('fetch', event => {
    console.log('🌐 攔截請求:', event.request.url);
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果快取中有，直接回傳
                if (response) {
                    console.log('💾 從快取回傳:', event.request.url);
                    return response;
                }
                
                // 否則向網路請求
                console.log('📡 向網路請求:', event.request.url);
                return fetch(event.request);
            })
    );
});
```

## 基本快取策略

Service Worker 提供多種快取策略，以下是三種最常用的：

### 1. Cache First（快取優先）
適用於不常變更的靜態資源（CSS、JS、圖片）

```javascript
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 快取中有就直接回傳，沒有才請求網路
                return response || fetch(event.request);
            })
    );
});
```

### 2. Network First（網路優先）
適用於需要即時資料的 API 請求

```javascript
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // 請求成功，複製回應並存入快取
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseClone);
                    });
                return response;
            })
            .catch(() => {
                // 網路失敗，回傳快取
                return caches.match(event.request);
            })
    );
});
```

### 3. Stale While Revalidate（舊資料優先，同時更新）
適用於可以容忍稍舊資料的情況

```javascript
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 同時發起網路請求更新快取
                const fetchPromise = fetch(event.request)
                    .then(networkResponse => {
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        return networkResponse;
                    });
                
                // 如果快取有資料就先回傳，否則等網路回應
                return response || fetchPromise;
            })
    );
});
```

## 實用的開發模式

### 動態快取
根據使用者的瀏覽行為動態快取資源：

```javascript
const CACHE_NAMES = {
    static: 'static-v1',
    dynamic: 'dynamic-v1'
};

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    
    // 靜態資源使用 Cache First
    if (requestUrl.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff2?)$/)) {
        event.respondWith(handleStaticAssets(event.request));
    }
    // API 請求使用 Network First
    else if (requestUrl.pathname.startsWith('/api/')) {
        event.respondWith(handleApiRequests(event.request));
    }
    // 其他使用預設策略
    else {
        event.respondWith(handleOtherRequests(event.request));
    }
});

function handleStaticAssets(request) {
    return caches.match(request)
        .then(response => {
            return response || fetch(request)
                .then(networkResponse => {
                    return caches.open(CACHE_NAMES.static)
                        .then(cache => {
                            cache.put(request, networkResponse.clone());
                            return networkResponse;
                        });
                });
        });
}

function handleApiRequests(request) {
    return fetch(request)
        .then(response => {
            if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAMES.dynamic)
                    .then(cache => {
                        cache.put(request, responseClone);
                    });
            }
            return response;
        })
        .catch(() => {
            return caches.match(request);
        });
}
```

### 離線頁面
當使用者離線且請求的頁面沒有快取時，顯示友善的離線頁面：

```javascript
const OFFLINE_PAGE = '/offline.html';

// 在安裝時預快取離線頁面
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    ...urlsToCache,
                    OFFLINE_PAGE  // 加入離線頁面
                ]);
            })
    );
});

// 在 fetch 事件中處理離線情況
self.addEventListener('fetch', event => {
    // 只處理導航請求（HTML 頁面）
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    // 網路失敗，檢查是否有快取
                    return caches.match(event.request)
                        .then(response => {
                            // 有快取就回傳，沒有就回傳離線頁面
                            return response || caches.match(OFFLINE_PAGE);
                        });
                })
        );
    }
});
```

## 除錯與開發工具

使用 Chrome DevTools 除錯 Service Worker：

1. 開啟 DevTools → Application 標籤
2. 在左側找到 "Service Workers" 區塊
3. 可以看到目前註冊的 Service Worker 狀態
4. 在開發時勾選 "Update on reload" 選項

### 常用的除錯技巧

```javascript
// 在 Service Worker 中加入詳細的 log
self.addEventListener('install', event => {
    console.log('SW: Install event triggered');
    console.log('SW: Cache name:', CACHE_NAME);
    console.log('SW: Files to cache:', urlsToCache);
});

self.addEventListener('fetch', event => {
    // 只記錄同源請求，避免過多 log
    if (event.request.url.startsWith(self.location.origin)) {
        console.log('SW: Fetching:', event.request.url);
    }
});

// 檢查快取內容
self.addEventListener('message', event => {
    if (event.data === 'CHECK_CACHE') {
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.keys();
            })
            .then(requests => {
                console.log('快取中的檔案：', requests.map(req => req.url));
            });
    }
});
```

## 總結

Service Worker 是實現現代 Web 應用功能的關鍵技術。透過本文的介紹，你應該已經掌握了：

1. **基本概念**：Service Worker 的運作原理和特性
2. **生命週期**：從註冊到啟動的完整流程
3. **快取策略**：三種核心快取策略的實作
4. **實用模式**：動態快取和離線頁面處理
5. **除錯方法**：使用開發者工具進行除錯

接下來建議你：
- 在自己的專案中實作基本的 Service Worker
- 嘗試不同的快取策略
- 探索更進階的功能，如推播通知和背景同步

在下一篇文章中，我們將深入探討 PWA 的實作、進階快取策略，以及如何整合推播通知等功能。