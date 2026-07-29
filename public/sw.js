// Service Worker · Boda Cristian & Jimena (PWA)
const CACHE = "bodacj-v5";
const ASSETS = ["/", "/logo-boda.png", "/Sobre.mp4", "/sobre-poster.png", "/galeria/foto-8.jpg", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  const isHTML = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  if (isHTML) {
    // Páginas: RED primero (siempre lo último), caché solo de respaldo sin conexión.
    e.respondWith(
      fetch(req)
        .then((r) => { const c = r.clone(); caches.open(CACHE).then((ca) => ca.put(req, c)); return r; })
        .catch(() => caches.match(req).then((r) => r || caches.match("/")))
    );
    return;
  }
  // Otros recursos propios (imágenes, video, iconos): caché primero.
  e.respondWith(caches.match(req).then((r) => r || fetch(req)));
});
