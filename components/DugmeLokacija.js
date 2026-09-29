"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { udaljenostKm } from "@/lib/distance";
import { IkonaLokacija } from "@/components/Ikone";

export default function DugmeLokacija({ gradovi }) {
  const router = useRouter();
  const [ucitava, setUcitava] = useState(false);
  const [greska, setGreska] = useState("");

  function pronadjiNajblizi() {
    setGreska("");

    if (!("geolocation" in navigator)) {
      setGreska("Tvoj preglednik ne podržava prepoznavanje lokacije. Odaberi grad ispod.");
      return;
    }

    setUcitava(true);

    navigator.geolocation.getCurrentPosition(
      (pozicija) => {
        const { latitude, longitude } = pozicija.coords;

        let najbliziGrad = null;
        let najmanjaUdaljenost = Infinity;

        for (const grad of gradovi) {
          const udaljenost = udaljenostKm(latitude, longitude, grad.lat, grad.lng);
          if (udaljenost < najmanjaUdaljenost) {
            najmanjaUdaljenost = udaljenost;
            najbliziGrad = grad;
          }
        }

        if (najbliziGrad) {
          router.push(`/${najbliziGrad.id}`);
        } else {
          setUcitava(false);
          setGreska("Nismo pronašli grad u blizini. Odaberi grad ispod.");
        }
      },
      () => {
        setUcitava(false);
        setGreska("Nismo dobili pristup lokaciji. Odaberi grad ispod.");
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }

  return (
    <div className="lokacija">
      <button className="dugme dugme-glavno dugme-veliko" onClick={pronadjiNajblizi} disabled={ucitava}>
        <IkonaLokacija velicina={22} className={ucitava ? "vrti" : undefined} />
        {ucitava ? "Tražim tvoju lokaciju…" : "Pronađi najbližu dežurnu"}
      </button>
      {greska ? (
        <p className="poruka-greske" role="alert">
          {greska}
        </p>
      ) : (
        <p className="lokacija-napomena">Lokacija ostaje na tvom uređaju — ne šaljemo je nigdje.</p>
      )}
    </div>
  );
}
