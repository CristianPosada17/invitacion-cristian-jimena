// Iconos de línea (compartidos entre componentes .astro y scripts de cliente)
export const ICONS: Record<string, string> = {
  cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  church: '<path d="M12 2v6M9.5 5h5"/><path d="M5 21V11l7-4 7 4v10"/><path d="M9.5 21v-4.5a2.5 2.5 0 015 0V21"/>',
  cheers: '<path d="M6 3h6l-.8 6a2.2 2.2 0 01-4.4 0z"/><path d="M9 11v8M6.5 21h5"/><path d="M15 3l1 5"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12"/><path d="M12 9C11 5 8 5 8 7s2.5 2 4 2zM12 9c1-4 4-4 4-2s-2.5 2-4 2z"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M5 9v.01M19 15v.01"/>',
  dress: '<path d="M10 3a2 2 0 104 0"/><path d="M12 5v3M8 21l1-8-3 2 6-5 6 5-3-2 1 8z"/>',
  phone: '<path d="M6 3h3l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 013-2z"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  music: '<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  weather: '<path d="M8 17H6a4 4 0 110-8 6 6 0 0111.5 1.7A3.5 3.5 0 1118 17H8z"/><path d="M14 4V2M19 6l1.5-1.5M9 6L7.5 4.5"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.8"/><path d="M4 18l5-4 4 3 3-2 5 4"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  ticket: '<path d="M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4z"/><path d="M12 7v10"/>',
  plate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  map: '<path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  home: '<path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/>',
  calendar2: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v-1M16 4v-1M4 9h16"/>',
  heartFill: '<path d="M12 21s-7-4.5-7-9a4 4 0 018-1 4 4 0 018 1c0 4.5-7 9-7 9z"/>',
  albumIcon: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};

export function icon(name: string, cls = ""): string {
  return `<svg class="svic ${cls}" viewBox="0 0 24 24">${ICONS[name] || ""}</svg>`;
}

export const ORNAMENT =
  '<svg viewBox="0 0 60 18" fill="none" stroke="currentColor" stroke-width="1"><path d="M30 3v12"/><path d="M30 7C26 7 22 5 18 6M30 7c4 0 8-2 12-1M30 11c-3 0-6-1-9 0M30 11c3 0 6-1 9 0"/><circle cx="30" cy="2" r="1.4" fill="currentColor" stroke="none"/></svg>';
