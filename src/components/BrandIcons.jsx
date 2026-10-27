export function ExternalLinkIcon({ className = "h-3 w-3" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 8.1c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.8 1.2 1.5 2.1 1.9.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.2.3.4 0 .3-.2 1.1-.7 1.5-.5.4-1.1.6-1.8.4-.7-.2-1.7-.6-2.9-1.7-1.3-1.1-2.1-2.5-2.3-3.2-.3-.8 0-1.5.3-1.9Z" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.7" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M13.5 20v-7h2.35l.4-2.8H13.5V8.4c0-.82.28-1.38 1.4-1.38h1.5V4.5c-.26-.04-1.17-.12-2.24-.12-2.23 0-3.76 1.36-3.76 3.86v1.96H8v2.8h2.4v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
