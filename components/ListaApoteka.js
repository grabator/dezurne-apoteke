"use client";

import { useState } from "react";
import { udaljenostKm } from "@/lib/distance";

export default function ListaApoteka({ apoteke, emailZaPrijave, nazivGrada }) {
  const [mojaLokacija, setMojaLokacija] = useState(null);
  const [greska, setGreska] = useState("");

  function prikaziUdaljenost() {
    setGreska("");

    if (!("geolocation" in navigator)) {
      setGreska("Tvoj preglednik ne podržava prikaz udaljenosti.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pozicija) => {
        setMojaLokacija({
          lat: pozicija.coords.latitude,
          lng: pozicija.coords.longitude,
        });
      },
      () => setGreska("Nismo dobili pristup lokaciji.")
    );
  }

  let prikazaneApoteke = apoteke;

  if (mojaLokacija) {
    prikazaneApoteke = apoteke
      .map((a) => ({
        ...a,
        udaljenost: udaljenostKm(mojaLokacija.lat, mojaLokacija.lng, a.lat, a.lng),
      }))
      .sort((a, b) => a.udaljenost - b.udaljenost);
  }

  return (
    <div>
      {!mojaLokacija && (
        <button className="dugme dugme-sekundarno" onClick={prikaziUdaljenost}>
          📍 Prikaži udaljenost od mene
        </button>
      )}
      {greska && <p className="poruka-greske">{greska}</p>}

      <div className="lista-apoteka">
        {prikazaneApoteke.map((apoteka) => (
          <div className="kartica-apoteke" key={apoteka.id}>
            <h2>{apoteka.naziv}</h2>
            <p className="adresa">{apoteka.adresa}</p>
            <p className="radno-vrijeme">Radno vrijeme: {apoteka.radnoVrijeme}</p>
            {typeof apoteka.udaljenost === "number" && (
              <p className="udaljenost">~{apoteka.udaljenost.toFixed(1)} km od tebe</p>
            )}

            <div className="dugmad-apoteke">
              <a className="dugme dugme-glavno" href={`tel:${apoteka.telefon}`}>
                📞 Pozovi
              </a>
              <a
                className="dugme dugme-sekundarno"
                href={`https://www.google.com/maps/dir/?api=1&destination=${apoteka.lat},${apoteka.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                🧭 Vodi me
              </a>
            </div>

            <a
              className="link-prijava"
              href={`mailto:${emailZaPrijave}?subject=${encodeURIComponent(
                `Prijava greške - ${nazivGrada} - ${apoteka.naziv}`
              )}`}
            >
              Prijavi grešku u podacima
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
