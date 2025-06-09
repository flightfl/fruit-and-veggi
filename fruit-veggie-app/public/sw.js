const CACHE_NAME = 'produce-app-v8';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/sw.js',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Cache addAll failed:', error);
        // Continue even if some files fail to cache
      })
  );
});

// Fetch event - cache assets dynamically
self.addEventListener('fetch', (event) => {
  // Skip chrome-extension and non-http requests
  if (!event.request.url.startsWith('http') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        }).catch(() => {
          // For API requests, return empty array
          if (event.request.url.includes('/api/')) {
            return new Response('[]', {
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          // For navigation, show offline page
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});
// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of uncontrolled clients
    })
  );
});
