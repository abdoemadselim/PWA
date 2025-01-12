const staticCache = "static-cache-v3";
const dynamicCache = "dynamic-cache-v3";
const assets = [
    "/",
    "/index.html",
    "/img/dish.png",
    "/css/materialize.min.css",
    "/css/styles.css",
    "https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/img/icons/icon-144x144.png",
    "/img/icons/icon-96x96.png",
    "/img/icons/icon-72x72.png",
    "/img/icons/icon-128x128.png",
    "/img/icons/icon-152x152.png",
    "/js/materialize.min.js",
    "/manifest.json",
    "/pages/fallback.html",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(staticCache)
            .then((cache) => {
                cache.addAll(assets)
            }))
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter((key) => key !== staticCache && key !== dynamicCache && caches.delete(key))
            )
        ))
})
// console.log(self) // in service worker script, serviceWorkerGlobalScope represents the global execution context
// (this) binds to serviceWorkerGlobalScope object instead of window 

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf("chrome-extension") !== -1) return;
    if (evt.request.url.indexOf("firestore.googleapis.com") === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone())
                        setTimeout(() => limitCacheSize(dynamicCache, 15), 200)
                        return fetchRes;
                    })
                });
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/pages/fallback.html');
                }
            })
        );
    }
});
