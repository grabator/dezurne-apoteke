"use client";

import { useState } from "react";
import { udaljenostKm } from "@/lib/distance";
import { mnozina } from "@/lib/tekst";
import { IkonaLokacija, IkonaNavigacija, IkonaPin, IkonaSat, IkonaTelefon } from "@/components/Ikone";

function telLink(telefon) {
  if (!telefon || /primjer/i.test(telefon)) return null;
  const cifre = telefon.replace(/\D/g, "");
  return `tel:${cifre.startsWith("0") ? `+387${cifre.slice(1)}` : cifre}`;
}

function formatirajKm(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toLocaleString("bs-BA", { maximumFractionDigits: 1 })} km`;
}

export default function ListaApoteka({ apoteke, emailZaPrijave, nazivGrada }) {
  const [mojaLokacija, setMojaLokacija] = useState(null);
  const [trazi, setTrazi] = useState(false);
  const [greska, setGreska] = useState("");

  function sortirajPoUdaljenosti() {
    setGreska("");

    if (!("geolocation" in navigator)) {
      setGreska("Tvoj preglednik ne podržava prikaz udaljenosti.");
      return;
    }

    setTrazi(true);
    navigator.geolocation.getCurrentPosition(
      (pozicija) => {
        setTrazi(false);
        setMojaLokacija({ lat: pozicija.coords.latitude, lng: pozicija.coords.longitude });
      },
      () => {
        setTrazi(false);
        setGreska("Nismo dobili pristup lokaciji.");
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }

  const prikazane = mojaLokacija
    ? apoteke
        .map((a) => ({
          ...a,
          udaljenost: udaljenostKm(mojaLokacija.lat, mojaLokacija.lng, a.lat, a.lng),
        }))
        .sort((a, b) => a.udaljenost - b.udaljenost)
    : apoteke;

  return (
    <section aria-label="Dežurne apoteke">
      <div className="traka">
        <p className="traka-broj">
          <span className="traka-cifra">{apoteke.length}</span>{" "}
          {mnozina(apoteke.length, ["dežurna apoteka", "dežurne apoteke", "dežurnih apoteka"])}
        </p>
        {apoteke.length > 1 &&
          (mojaLokacija ? (
            <span className="traka-status">
              <IkonaLokacija velicina={15} /> Po udaljenosti
            </span>
          ) : (
            <button className="dugme-tiho" onClick={sortirajPoUdaljenosti} disabled={trazi}>
              <IkonaLokacija velicina={15} className={trazi ? "vrti" : undefined} />
              {trazi ? "Tražim…" : "Najbliže prvo"}
            </button>
          ))}
      </div>
      {greska && (
        <p className="poruka-greske" role="alert">
          {greska}
        </p>
      )}

      <ol className="lista-apoteka">
        {prikazane.map((apoteka, i) => {
          const tel = telLink(apoteka.telefon);
          return (
            <li key={apoteka.id} className="kartica ulaz" style={{ "--i": i }}>
              <div className="kartica-vrh">
                <span className="kartica-redni">{String(i + 1).padStart(2, "0")}</span>
                <span className="znacka znacka-uzivo">
                  <span className="uzivo-tacka" aria-hidden="true" />
                  Dežurna
                </span>
              </div>

              <h2 className="kartica-naziv">{apoteka.naziv}</h2>

              <ul className="kartica-detalji">
                <li>
                  <IkonaPin velicina={16} />
                  {apoteka.adresa}
                </li>
                <li>
                  <IkonaSat velicina={16} />
                  {apoteka.radnoVrijeme.replace("0-24", "0–24 h")}
                </li>
              </ul>

              {typeof apoteka.udaljenost === "number" && (
                <p className="kartica-udaljenost">{formatirajKm(apoteka.udaljenost)} od tebe</p>
              )}

              <div className="kartica-akcije">
                {tel ? (
                  <a className="dugme dugme-glavno" href={tel}>
                    <IkonaTelefon velicina={18} />
                    <span className="dugme-tekst">
                      Pozovi
                      <span className="dugme-podtekst">{apoteka.telefon}</span>
                    </span>
                  </a>
                ) : (
                  <span className="dugme dugme-onemoguceno">Telefon nije provjeren</span>
                )}
                <a
                  className="dugme dugme-sekundarno"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${apoteka.lat},${apoteka.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IkonaNavigacija velicina={18} />
                  Vodi me
                </a>
              </div>

              <a
                className="kartica-prijava"
                href={`mailto:${emailZaPrijave}?subject=${encodeURIComponent(
                  `Prijava greške - ${nazivGrada} - ${apoteka.naziv}`
                )}`}
              >
                Netačni podaci? Prijavi grešku
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
