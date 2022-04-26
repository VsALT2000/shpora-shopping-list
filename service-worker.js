var CACHE_NAME = 'my-pwa-cache-v1';
const cacheAssets = ['index.html', 'static/js/bundle.js', 'icon-192x192.png', 'icon-256x256.png', 'icon-384x384.png', 'icon-512x512.png', 'favicon.ico', 'robots.txt', "manifest.json"]

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList =>
                Promise.all(keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log('Deleting cache: ' + key)
                        return caches.delete(key);
                    }
                }))
            )
    );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log('Сообщение от сервис-воркера: файлы кешируются')
                cache.addAll(cacheAssets)
            })
            .then(() => {
                self.skipWaiting()
            })
    );
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
