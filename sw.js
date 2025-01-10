self.addEventListener("install", (event) => {
})

self.addEventListener("activate", (event) => {
    console.log(event) 
})
// console.log(self) // in service worker script, serviceWorkerGlobalScope represents the global execution context
// (this) binds to serviceWorkerGlobalScope object instead of window 

self.addEventListener("fetch", (event) => {
    console.log(event)
})