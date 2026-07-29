// Configuración central de la app
export const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx8C4Pqu8uwTdfm_878HhTkckzgk0QodvyF6x7tnoaIBwjD-nhev473ON_Hlx3pUoLxyw/exec";

export const PLAYLIST = "https://open.spotify.com/playlist/0has6wxcG7Q929c25X4qoe";
export const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/playlist/0has6wxcG7Q929c25X4qoe?utm_source=generator&theme=0";

// Se activará al agregar el archivo elegido a /public y colocar aquí su ruta.
export const WEDDING_AUDIO = "";

// Ubicación del evento para el pronóstico automático.
export const WEATHER_LOCATION = {
  name: "Durango, Dgo.",
  latitude: 24.0277,
  longitude: -104.6532,
};

// Fecha del evento (para el contador y el revelado de pases/mesa)
export const WEDDING = new Date("2027-04-03T17:00:00");
export const REVEAL_DAYS_DEFAULT = 15;

// El token del link personalizado (?g=...). Se conserva en la sesión para
// que la identidad del invitado no se pierda al navegar entre páginas.
export function getToken(): string {
  if (typeof window === "undefined") return "";
  const fromUrl = new URLSearchParams(window.location.search).get("g");
  if (fromUrl) {
    try { sessionStorage.setItem("g", fromUrl); } catch (e) {}
    return fromUrl;
  }
  try { return sessionStorage.getItem("g") || ""; } catch (e) { return ""; }
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
    try { sessionStorage.setItem(key, fromUrl); } catch (e) {}
    return fromUrl;
  }
  if (!key) return "";
  try { return sessionStorage.getItem(key) || ""; } catch (e) { return ""; }
}
