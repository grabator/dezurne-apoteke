# Dežurne apoteke BiH

Koja apoteka radi **upravo sada**? Mobilna web aplikacija koja za odabrani grad u BiH pokaže dežurne apoteke — adresu, telefon i put do vrata.

Probni / portfolio projekat u Next.js-u. Slično već postoji na [dezurna.net](https://dezurna.net).

## Mogućnosti

- Automatsko pronalaženje najbližeg grada (lokacija ostaje na uređaju)
- Dežurne apoteke za danas, sortiranje po udaljenosti
- Dugmad **Pozovi** i **Vodi me** (Google Maps)
- Podrška za stalne 0–24 apoteke i mjesečnu rotaciju
- Svijetli i tamni mod, instalacija na mobitel (PWA)

Stvarni podaci trenutno postoje za **Sarajevo** i **Mostar**; ostali gradovi su označeni kao "uskoro".

## Pokretanje

```bash
npm install
npm run dev
```

Aplikacija radi na `http://localhost:3000`.

## Dodavanje grada

Bez izmjene koda — samo podaci u `data/`:

1. Dodaj grad u `gradovi.json`
2. Dodaj apoteke u `apoteke/<grad>.json`
3. Za gradove s rotacijom dodaj raspored u `dezurstva/<grad>.json`

## Tehnologije

Next.js 16 · React 19 · JSON podaci · bez baze

---

Podaci se preuzimaju iz javnih izvora i mogu kasniti — uvijek nazovi apoteku prije odlaska.
