/*
const cacheName = 'shoppingList-v1';
const cacheAssets = ['index.html', "manifest.json", "static/js"];

self.addEventListener('install', e => {
    console.log('Сервис-воркер установлен')
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Сообщение от сервис-воркера: файлы кешируются')
                cache.addAll(cacheAssets)
            })
            .then(() => {
                self.skipWaiting()
            })
    )
})

self.addEventListener('activate', e => {
    console.log('Сервис-воркер активирован')
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Производится удаление старого кеша')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const copyCache = res.clone()
                caches.open(cacheName).then(cache => {
                    cache.put(e.request, copyCache)
                })
                return res
            })
            .catch(error => caches.match(e.request).then(res => res))
    )
})
*/
// Set this to true for production
var doCache = true;

// Name our cache
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
self.addEventListener('install', function(event) {
    if (doCache) {
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
    }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});