var cacheName = "onlinestore-v1";
var cacheFiles = [
    "index.html",
    //"products.js",
    "images/book-bio.jpg",
    "images/book-computer-science.jpg",
    "images/icon-32.png",
    "images/icon-512.png",
    "images/book-english.jpg",
    "images/book-math.jpg"
];

self.addEventListener("install", function (e) {

    console.log("[Service Worker] Install");
    
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});