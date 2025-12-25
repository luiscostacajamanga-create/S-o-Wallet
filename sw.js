
const CACHE_NAME = 'sao-wallet-v1';
const ASSETS = [
  './',
  './index.html',
  './index.tsx',
  'https://cdn-icons-png.flaticon.com/512/10149/10149458.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
