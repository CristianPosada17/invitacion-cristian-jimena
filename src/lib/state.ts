// Estado compartido en el cliente: carga UNA vez config + fotos + invitado
import { getBootstrap, getGuest } from "./api";
import { getToken, REVEAL_DAYS_DEFAULT, WEDDING } from "./config";

export interface Guest {
  found: boolean;
  token?: string;
  nombre?: string;
  prot?: string;
  max_pases?: number;
  pases_ninos?: number;
  mesa?: string;
  confirmado?: boolean;
  asiste?: boolean | null;
  pases_confirmados?: number | null;
}

export interface AppState {
  config: Record<string, any>;
  photos: any[];
  guest: Guest | null;
  revealDays: number;
}

let _p: Promise<AppState> | null = null;

export function boot(): Promise<AppState> {
  if (_p) return _p;
  _p = (async () => {
    let config: Record<string, any> = {};
    let photos: any[] = [];
    try {
      const b = await getBootstrap();
      config = b.config || {};
      photos = b.photos || [];
    } catch (e) {}
    let guest: Guest | null = null;
    const t = getToken();
    if (t) {
      try {
        const g = await getGuest(t);
        if (g && g.found) guest = g;
      } catch (e) {}
    }
    const revealDays = config.reveal_days ? Number(config.reveal_days) : REVEAL_DAYS_DEFAULT;
    return { config, photos, guest, revealDays };
  })();
  return _p;
}

// Días que faltan para la boda (para el revelado)
export function daysLeft(): number {
  return Math.floor((WEDDING.getTime() - Date.now()) / 86400000);
}

// Partes del contador
export function countdownParts(): [string, number][] {
  const ms = WEDDING.getTime() - Date.now();
  const d = Math.max(0, Math.floor(ms / 86400000));
  const h = Math.max(0, Math.floor(ms / 3600000) % 24);
  const m = Math.max(0, Math.floor(ms / 60000) % 60);
  const s = Math.max(0, Math.floor(ms / 1000) % 60);
  return [["Días", d], ["Horas", h], ["Min", m], ["Seg", s]];
}

export function esc(s: any): string {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" } as any)[c]
  );
}

let toastTimer: any;
export function toast(msg: string) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
