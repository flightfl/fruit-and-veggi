const CACHE_NAME = 'produce-app-v18';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/vite.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching v12');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Cache failed:', error);
      })
  );
});

// Fetch event with better fallback
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Not in cache, trying network:', event.request.url);
        return fetch(event.request).then((response) => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        }).catch((error) => {
          console.log('Network failed for:', event.request.url);
          
          // API requests get empty array
          if (event.request.url.includes('/api/')) {
            console.log('Returning empty array for API');
            return new Response('[]', {
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          // For everything else, try offline page
          console.log('Returning offline page as fallback');
          return caches.match('/offline.html').then((offlineResponse) => {
            if (offlineResponse) {
              return offlineResponse;
            }
            // If even offline.html isn't cached, return a basic response
            return new Response('App is offline', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});