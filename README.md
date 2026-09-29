# Dežurne apoteke BiH

Mala vježba u Next.js-u — aplikacija koja pokaže koja je apoteka trenutno dežurna u odabranom gradu u BiH.

> Napomena: dok sam ovo pravio, ispostavilo se da već postoji [dezurna.net](https://dezurna.net) koji radi istu stvar (i to dobro, za više gradova u regiji). Ovaj repo ostaje kao lični/portfolio projekat i vježba, ne kao pokušaj da ga zamijeni.

## Šta radi

- Odabereš grad (ili klikneš "Koristi moju lokaciju" da te aplikacija sama uputi na najbliži)
- Vidiš koja je apoteka dežurna upravo sada — ime, adresa, telefon, radno vrijeme
- Dugme za poziv, dugme za navigaciju (Google Maps), i dugme da prijaviš grešku u podacima
- Sama izračunava ko dežura na osnovu današnjeg datuma — nekim gradovima (Sarajevo) je više apoteka *stalno* dežurno (0-24), a nekim (Mostar) se dežurstvo mijenja svakog mjeseca

Trenutno ima stvarne podatke za Sarajevo i Mostar (provjereno sa zvaničnih sajtova). Ostali gradovi iz "Faza 1" liste su tu kao "uskoro dostupno" dok se ne unesu podaci.

## Kako pokrenuti

```bash
npm install
npm run dev
```

Otvori `http://localhost:3000`.

## Kako dodati novi grad

Nije potrebno dirati kod — samo podatke:

1. U `data/gradovi.json` dodaj novi grad (id, naziv, tip dežurstva, lat/lng za grad).
2. Napravi `data/apoteke/<id-grada>.json` sa listom apoteka (kopiraj format iz `sarajevo.json` ili `mostar.json`).
3. Ako grad ima rotaciju (kao Mostar), napravi i `data/dezurstva/<id-grada>.json`.

Aplikacija automatski prepozna novi fajl i prikaže grad.

## Ideje za dalje (nisu urađene, samo ideje)

- Dodati stvarne podatke za ostale gradove (Tuzla, Zenica, Banja Luka, Bijeljina, Bihać, Brčko, Istočno Sarajevo)
- Mogućnost da korisnici sami predlože apoteku/grešku kroz formu, ne samo mail
- Pravi PWA sa offline keširanjem (trenutno ima samo osnovni manifest + service worker)
- Baza podataka umjesto JSON fajlova, ako se doda puno gradova ili neko bude ručno ažurirao podatke često

## Napomena o tačnosti

Podaci o apotekama mogu biti zastarjeli. Uvijek pozovi apoteku prije nego odeš, pogotovo ako je hitno.
