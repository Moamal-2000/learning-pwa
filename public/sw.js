"use strict";

// Variables
const CACHE_NAME = "PWA-v2";
const ASSETS = ["/", "/index.html", "/manifest.json"];

// Functions
async function cacheAssets() {
  const cache = caches.open(CACHE_NAME);
  (await cache).addAll(ASSETS);
}

async function updateCacheVersion() {
  const cachesNames = await caches.keys();
  const cachesToRemove = cachesNames.filter(
    (cacheName) => cacheName !== CACHE_NAME
  );

  return Promise.all(
    cachesToRemove.map((cacheName) => caches.delete(cacheName))
  );
}

async function getResponseFromCacheOrFetch(fetchEvent) {
  const request = fetchEvent.request;
  const cachedResponse = await caches.match(request);
  const fetchedResponse = await fetch(request);

  if (!cachedResponse) {
    const isGoogleExtension = request.url.includes("chrome-extension");
    const cache = await caches.open(CACHE_NAME);

    if (!isGoogleExtension) {
      cache.put(request, fetchedResponse.clone());
    }
  }

  return cachedResponse ? cachedResponse : fetchedResponse;
}

// Event functions
function handleInstall(installEvent) {
  installEvent.waitUntil(cacheAssets());
}

function handleActivate(activateEvent) {
  activateEvent.waitUntil(updateCacheVersion());
}

function handleFetch(fetchEvent) {
  fetchEvent.respondWith(getResponseFromCacheOrFetch(fetchEvent));
}

self.addEventListener("install", handleInstall);
self.addEventListener("activate", handleActivate);
self.addEventListener("fetch", handleFetch);
