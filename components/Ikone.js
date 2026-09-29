function Ikona({ children, velicina = 20, ...props }) {
  return (
    <svg
      width={velicina}
      height={velicina}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IkonaLokacija(props) {
  return (
    <Ikona {...props}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </Ikona>
  );
}

export function IkonaTelefon(props) {
  return (
    <Ikona {...props}>
      <path d="M5 4h3.5l1.5 4.5-2.25 1.5a11 11 0 0 0 6.25 6.25L15.5 14l4.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4Z" />
    </Ikona>
  );
}

export function IkonaNavigacija(props) {
  return (
    <Ikona {...props}>
      <path d="M20.5 3.5 3.5 10.8l7 2.7 2.7 7 7.3-17Z" />
    </Ikona>
  );
}

export function IkonaStrelica(props) {
  return (
    <Ikona {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Ikona>
  );
}

export function IkonaNazad(props) {
  return (
    <Ikona {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Ikona>
  );
}

export function IkonaPin(props) {
  return (
    <Ikona {...props}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Ikona>
  );
}

export function IkonaSat(props) {
  return (
    <Ikona {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Ikona>
  );
}

export function IkonaUpozorenje(props) {
  return (
    <Ikona {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.75v5M12 16.25h.01" />
    </Ikona>
  );
}

export function IkonaVanjskiLink(props) {
  return (
    <Ikona {...props}>
      <path d="M14 5h5v5M19 5l-8 8M17 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 4 18.5v-10A1.5 1.5 0 0 1 5.5 7H10" />
    </Ikona>
  );
}

export function Logo({ velicina = 28 }) {
  return (
    <svg width={velicina} height={velicina} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--akcent)" />
      <path
        d="M13 7.5h6v5.5h5.5v6H19v5.5h-6V19H7.5v-6H13V7.5Z"
        fill="var(--na-akcentu)"
      />
    </svg>
  );
}
