// Cache name
const CACHE_NAME = 'torosaba-toro-map';

// Cache targets
const urlsToCache = [
  './',
  './index.html',
  './stylesheets/common.css',
  './stylesheets/index.css',
  './script/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
})
