const cacheName = "Paragliverse-Simulador de rachas de viento-1.0.5";
const contentToCache = [
    "Build/4ce3fb5b3c85b3aeaf9daaa799a43bdf.loader.js",
    "Build/c2d0505f47c5a96e955a982896324419.framework.js",
    "Build/9adaf80a1e95910985908b72142b607d.data",
    "Build/653cb415ea9f55ac7fbde957a4c557cd.wasm",
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
