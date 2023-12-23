self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('address-map-cache').then(function(cache) {
      return Promise.all([
        '/images/icon-192x192.png',
        '/images/icon-512x512.png',
      ].map(url => {
        return cache.add(url).catch(error => {
          console.error(`Failed to cache ${url}: ${error}`);
        });
      }));
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
