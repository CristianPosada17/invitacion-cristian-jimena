// Configuración central de la app
export const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx8C4Pqu8uwTdfm_878HhTkckzgk0QodvyF6x7tnoaIBwjD-nhev473ON_Hlx3pUoLxyw/exec";

export const PLAYLIST = "https://open.spotify.com/playlist/0has6wxcG7Q929c25X4qoe";
export const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/playlist/0has6wxcG7Q929c25X4qoe?utm_source=generator&theme=0";

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
