const CACHE_NAME = 'produce-app-v6';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/sw.js',
  '/vite.svg',
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
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Check if the request scheme is supported before caching
        if (event.request.url.startsWith('http://') || event.request.url.startsWith('https://')) {
          // Clone the request because it's a stream
          const fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            (response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response because it's a stream
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            } ).catch(() => {
          // Fallback for failed network requests
          return caches.match('/offline.html');
        });
        } else {
          // For unsupported schemes, just fetch the resource without caching
          return fetch(event.request);
        }
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
