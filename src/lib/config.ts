// Configuración central de la app
export const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx8C4Pqu8uwTdfm_878HhTkckzgk0QodvyF6x7tnoaIBwjD-nhev473ON_Hlx3pUoLxyw/exec";

export const PLAYLIST = "https://open.spotify.com/playlist/0has6wxcG7Q929c25X4qoe";
export const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/playlist/0has6wxcG7Q929c25X4qoe?utm_source=generator&theme=0";

// Música que comienza al tocar el sobre.
export const WEDDING_AUDIO = "/a-thousand-years-piano-cello.mp3";

// Ubicación del evento para el pronóstico automático.
export const WEATHER_LOCATION = {
  name: "Durango, Dgo.",
  latitude: 24.0277,
  longitude: -104.6532,
};

// Fecha del evento (para el contador y el revelado de pases/mesa)
// Hora de Durango (UTC-6, sin horario de verano) para que el contador sea exacto desde cualquier país.
export const WEDDING = new Date("2027-04-03T17:00:00-06:00");
export const REVEAL_DAYS_DEFAULT = 15;

// El token del link personalizado (?g=...). Se guarda en el dispositivo (localStorage)
// para que la identidad del invitado no se pierda al navegar ni al abrir la app instalada,
// que arranca sin los parámetros del link.
function remember(key: string, value: string) {
  try { sessionStorage.setItem(key, value); } catch (e) {}
  try { localStorage.setItem(key, value); } catch (e) {}
}
function recall(key: string): string {
  try {
    const v = sessionStorage.getItem(key);
    if (v) return v;
  } catch (e) {}
  try { return localStorage.getItem(key) || ""; } catch (e) { return ""; }
}

export function getToken(): string {
  if (typeof window === "undefined") return "";
  const fromUrl = new URLSearchParams(window.location.search).get("g");
  if (fromUrl) {
    remember("g", fromUrl);
    return fromUrl;
  }
  return recall("g");
}

// Los enlaces nuevos incluyen una pista del nombre para personalizar el primer
// fotograma sin esperar al backend. La respuesta de Google Sheets sigue siendo
// la fuente definitiva para pases, mesa y confirmación.
export function getGuestNameHint(): string {
  if (typeof window === "undefined") return "";
  const token = getToken();
  const fromUrl = new URLSearchParams(window.location.search).get("n");
  const key = token ? "guest_name:" + token : "";
  if (fromUrl && key) {
    remember(key, fromUrl);
    return fromUrl;
  }
  if (!key) return "";
  return recall(key);
}
