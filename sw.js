// BSearch iPad 版 Service Worker —— 快取 App 骨架 + 經文索引，讓離線也能讀經/檢索
const CACHE_NAME = "bsearch-ipad-v9";
const ASSETS = [
  "./index.html",
  "./manifest.json",
  "./data/wpCuvVerses.js",
  "./data/wpCuvSimpVerses.js",
  "./data/wpNcvVerses.js",
  "./data/wpKjvVerses.js",
  "./data/zhjUrls.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
