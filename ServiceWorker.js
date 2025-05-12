const cacheName = "Paragliverse-Simulador de rachas de viento-1.0.4";
const contentToCache = [
    "Build/5d729fc90f040545c5dd929119e87853.loader.js",
    "Build/e028fde7c34e72ad52ea2a17cdfdca03.framework.js",
    "Build/9be041982e74c58c3cf6a513a4cae50b.data",
    "Build/b890c2918a46af5bda38309ae73e3f2c.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
