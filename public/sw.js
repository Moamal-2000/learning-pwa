"use strict";

const CACHE_NAME = "pwa-v1";
const ASSETS = ["/", "/index.html", "/manifest.json"];

async function openCache() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(ASSETS);
}

async function getDataFromCacheOrFetch(fetchEvent) {
  const request = fetchEvent.request;
  const cachedResponse = await caches.match(request);
  const fetchedResponse = await fetch(request);
  const response = cachedResponse ? cachedResponse : fetchedResponse;

  if (!cachedResponse) storeResponseInCache(request, response);
  return response;
}

async function storeResponseInCache(request, response) {
  const isGoogleExtension = request.url.includes("chrome-extension");
  if (isGoogleExtension) return;

  const cache = await caches.open(CACHE_NAME);
  cache.add(request, response);
}

async function updateCacheVersion() {
  const cacheKeys = await caches.keys();
  const oldCacheKeys = cacheKeys.filter((cacheKey) => cacheKey !== CACHE_NAME);
  Promise.all(oldCacheKeys.map((cacheKey) => caches.delete(cacheKey)));
}

function handleInstall(installEvent) {
  installEvent.waitUntil(openCache());
}

function handleFetches(fetchEvent) {
  fetchEvent.respondWith(getDataFromCacheOrFetch(fetchEvent));
}

function handleActivate(activateEvent) {
  activateEvent.waitUntil(updateCacheVersion());
}

function handlePush(pushEvent) {
  pushEvent.waitUntil(self.registration.showNotification());
}

self.addEventListener("install", handleInstall);
self.addEventListener("activate", handleActivate);
self.addEventListener("fetch", handleFetches);
self.addEventListener("push", handlePush);
