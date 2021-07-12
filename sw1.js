var CACHE_STORE = 'health_main';
var urlsToCache = [
  '/',
];
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_STORE)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open($CACHE_STORE)
      .then(function (cache) {
		  cache.addAll($FILES_ADDITIONAL);
		  return cache.addAll($FILES_IMPORTANT);
		}) 
      .then(() => {
        return self.skipWaiting();
      })
  );
});
self.addEventListener('activate', event => {
      event.waitUntil(
        caches.open($CACHE_STORE)
          .then(cache => {
            return cache.keys()
              .then(cacheNames => {
                return Promise.all(
                  cacheNames.filter(cacheName => {
                    return $FILES.indexOf(cacheName) === -1;
                  }).map(cacheName => {
                    return caches.delete(cacheName);
                  })
                );
              })
              .then(() => {
                return self.clients.claim();
              });
          })
      );
    }); 
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    let url = event.request.url.indexOf(self.location.origin) !== -1 ?
      event.request.url.split(`${self.location.origin}/`)[1] :
      event.request.url;
    let isFileCached = $FILES.indexOf(url) !== -1;
	// If the request wasn't found in the array of files and this request has navigation mode and there is defined navigation fallback
    // then navigation fallback url is picked instead of real request url
    // and is checked if this url should be in the cache
    if (!isFileCached && event.request.mode === 'navigate' && $NAVIGATION_FALLBACK) {
      url = $NAVIGATION_FALLBACK;
      isFileCached = $FILES.indexOf(url) !== -1;
    }
    if (isFileCached) {
      event.respondWith(
        caches.open($CACHE_STORE)
          .then(cache => {
            return cache.match(url)
              .then(response => {
                if (response) {
                  return response;
                }
                throw Error('There is not response for such request', url);
              });
          })
          .catch(error => {
            return fetch(event.request);
          })
      );
    }
  }
});