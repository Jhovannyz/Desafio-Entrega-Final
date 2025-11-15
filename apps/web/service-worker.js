const CACHE = 'poke-api-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.webmanifest',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then((cache) => {
        console.log('Service Worker: Cacheando assets');
        return cache.addAll(ASSETS);
    }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(
            keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
        );
    }));
});

// Estratégia de Fetch: Cache first (para assets) e Network first (para API)
self.addEventListener('fetch', (event) => {
    
    // Se for um pedido para a API, vá primeiro para a rede
    if (event.request.url.startsWith('https://pokeapi.co/')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
        return;
    }

    // Para todos os outros pedidos (seus assets: html, css, js, etc.)
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).catch(() => {
                return new Response('Você está offline.', {
                    headers: { 'Content-Type': 'text/html' }
                });
            });
        })
    );
});