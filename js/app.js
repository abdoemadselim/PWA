if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        // .then(reg => console.log(reg))  // reg of serviceWorkerRegistration interface
        // .catch(error => console.log("Service worker isn't registered", error))
}