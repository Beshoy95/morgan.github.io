let cachname = 'static-cache';
let cachedassets = [
  './index.html',
  './blog.html',
  './contact.html',
  './about.html',
  './manifest.json',
  './UP/1.jpg',
  './UP/2.jpg',
  './images/post-1.jpg',
  './images/testimonial-2.jpg',
  './style.css',
  './fallback.json',
];

self.addEventListener('install', async function () {
  let createdcache = await caches.open(cachname);
  await createdcache.addAll(cachedassets);
  await self.skipWaiting();
}); //end of install event

self.addEventListener('activate', async function () {}); //end of actiavte

// fetch :  fetch : From cach , or from netwrok
self.addEventListener('fetch', async function (event) {
  if (!navigator.onLine) {
    return await event.respondWith(cachefirst(event.request)); // cachfirst
  } else {
    return await event.respondWith(netwrokfirst(event.request));
  }
});

async function cachefirst(req) {
  return (await caches.match(req)) || (await caches.match('fallback.json'));
}
async function netwrokfirst(req) {
  let dynamiccache = await caches.open('dynamic-cache');
  let resp = await fetch(req);
  await dynamiccache.put(req, resp.clone());
  return resp;
}
