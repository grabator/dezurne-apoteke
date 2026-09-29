// Bosanska množina: 1 apoteka, 2–4 apoteke, 5+ apoteka (11–14 uvijek "apoteka").
export function mnozina(n, [jedan, nekoliko, mnogo]) {
  const zadnjaDva = n % 100;
  const zadnja = n % 10;
  if (zadnjaDva >= 11 && zadnjaDva <= 14) return mnogo;
  if (zadnja === 1) return jedan;
  if (zadnja >= 2 && zadnja <= 4) return nekoliko;
  return mnogo;
}
