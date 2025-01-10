if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js")
        .then(reg => console.log("Service worker registered successfully", reg))  // reg of serviceWorkerRegistration interface
        .catch(error => console.log("Service worker isn't registered", error))
}