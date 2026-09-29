# Dežurne apoteke BiH

Web aplikacija koja prikazuje koja je apoteka trenutno dežurna u odabranom gradu.

## Pokretanje na svom računaru

1. Instaliraj [Node.js](https://nodejs.org/) (LTS verzija) ako ga nemaš.
2. Otvori terminal u ovom folderu i pokreni:

   ```bash
   npm install
   ```

3. Pokreni razvojni server:

   ```bash
   npm run dev
   ```

4. Otvori `http://localhost:3000` u pregledniku.

## Kako dodati novi grad (bez pisanja koda)

1. Otvori `data/gradovi.json` i dodaj novi objekat u listu, npr:

   ```json
   {
     "id": "tuzla",
     "naziv": "Tuzla",
     "entitet": "Federacija BiH / Tuzlanski kanton",
     "tipDezurstva": "stalne",
     "izvor": "Ime izvora podataka",
     "izvorUrl": "",
     "azurirano": "2026-09-29",
     "lat": 44.5386,
     "lng": 18.6767
   }
   ```

   `tipDezurstva` može biti:
   - `"stalne"` — grad ima apoteke koje su UVIJEK dežurne (0-24).
   - `"mjesecna-rotacija"` — svaki mjesec dežura druga apoteka.

2. Napravi fajl `data/apoteke/tuzla.json` sa listom apoteka u tom gradu (kopiraj format iz `data/apoteke/sarajevo.json` ili `mostar.json`).

3. Ako je grad tipa `"mjesecna-rotacija"`, napravi i `data/dezurstva/tuzla.json` sa rasporedom (kopiraj format iz `data/dezurstva/mostar.json`).

4. Sačuvaj fajlove — aplikacija automatski prikazuje novi grad, nije potrebno mijenjati nijedan `.js` fajl.

## Važna napomena

Svi trenutni podaci o apotekama (nazivi, adrese, telefoni) su **PRIMJER podaci** i moraju se zamijeniti stvarnim, provjerenim podacima prije objave.
