// Llamadas al backend (Google Apps Script)
import { ENDPOINT } from "./config";

async function apiGet(action: string, extra = ""): Promise<any> {
  const r = await fetch(`${ENDPOINT}?action=${action}${extra}`);
  return r.json();
}
async function apiPost(body: any): Promise<any> {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
  });
  return r.json();
}

export const getBootstrap = () => apiGet("bootstrap");
export const getGuest = (token: string) => apiGet("guest", "&token=" + encodeURIComponent(token));
export const getPhotos = () => apiGet("photos");
export const submitRsvp = (token: string, asiste: boolean, pases: number, contacto: string) =>
  apiPost({ action: "rsvp", token, asiste, pases, contacto });
export const savePhoto = (token: string, autor: string, filename: string, dataUrl: string) =>
  apiPost({ action: "photo", token, autor, filename, dataUrl });

// --- Admin ---
export const adminList = (pass: string) => apiGet("admin_list", "&pass=" + encodeURIComponent(pass));
export const adminDeletePhoto = (pass: string, id: string) =>
  apiPost({ action: "admin_delete_photo", pass, id });
