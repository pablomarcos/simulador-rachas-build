const cacheName = "Paragliverse-Simulador de rachas de viento-1.0.6";
const contentToCache = [
    "Build/cc9e5e8bc8712b4210ed7717aca4d73c.loader.js",
    "Build/235112e707645e9c8ad5540bba9ed611.framework.js",
    "Build/3f0f376bb92adb7b55de214b1e978f7c.data",
    "Build/59ca03dda184abdeffaa8ebf06539ea2.wasm",
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
