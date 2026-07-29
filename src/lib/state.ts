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
  guestStatus: "none" | "found" | "not-found" | "error";
  revealDays: number;
}

let _p: Promise<AppState> | null = null;
let _guestP: Promise<Pick<AppState, "guest" | "guestStatus">> | null = null;

function withTimeout<T>(promise: Promise<T>, milliseconds: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("La solicitud tardó demasiado")), milliseconds);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (error) => { clearTimeout(timer); reject(error); }
    );
  });
}

export function loadGuest(): Promise<Pick<AppState, "guest" | "guestStatus">> {
  if (_guestP) return _guestP;
  const token = getToken();
  if (!token) {
    _guestP = Promise.resolve({ guest: null, guestStatus: "none" });
    return _guestP;
  }
  _guestP = withTimeout(getGuest(token), 30000)
    .then((g) => g && g.found
      ? { guest: g as Guest, guestStatus: "found" as const }
      : { guest: null, guestStatus: "not-found" as const })
    .catch(() => ({ guest: null, guestStatus: "error" as const }));
  return _guestP;
}

export function boot(): Promise<AppState> {
  if (_p) return _p;
  _p = (async () => {
    const bootstrapPromise = withTimeout(getBootstrap(), 12000).catch(() => null);
    const [bootstrap, guestState] = await Promise.all([bootstrapPromise, loadGuest()]);
    const config = bootstrap?.config || {};
    const photos = bootstrap?.photos || [];
    const revealDays = config.reveal_days ? Number(config.reveal_days) : REVEAL_DAYS_DEFAULT;
    return { config, photos, ...guestState, revealDays };
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
