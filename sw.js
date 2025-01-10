const staticCache = "static-cache";
const assets = [
    "/",
    "/index.html",
    "/img/dish.png",
    "/css/materialize.min.css",
    "/css/styles.css",
    "https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",    
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/pages/about.html",
    "/pages/contact.html",
    "/js/materialize.min.js",
    "/js/ui.js",
    "/js/app.js",
    "/manifest.json",
    "/img/icons/icon-144x144.png",
    "/img/icons/icon-96x96.png",
    "/img/icons/icon-72x72.png",
    "/img/icons/icon-128x128.png",
    "/img/icons/icon-152x152.png",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(staticCache)
            .then((cache) => {
                cache.addAll(assets)
            }))
})

self.addEventListener("activate", (event) => {
    console.log(event)
})
// console.log(self) // in service worker script, serviceWorkerGlobalScope represents the global execution context
// (this) binds to serviceWorkerGlobalScope object instead of window 

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request)))
})
