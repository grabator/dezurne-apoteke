"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { udaljenostKm } from "@/lib/distance";

export default function DugmeLokacija({ gradovi }) {
  const router = useRouter();
  const [ucitava, setUcitava] = useState(false);
  const [greska, setGreska] = useState("");

  function pronadjiNajblizi() {
    setGreska("");

    if (!("geolocation" in navigator)) {
      setGreska("Tvoj preglednik ne podržava automatsko prepoznavanje lokacije.");
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

        setUcitava(false);

        if (najbliziGrad) {
          router.push(`/${najbliziGrad.id}`);
        } else {
          setGreska("Nismo pronašli grad u blizini. Odaberi grad ručno ispod.");
        }
      },
      () => {
        setUcitava(false);
        setGreska("Nismo dobili pristup lokaciji. Odaberi grad ručno ispod.");
      }
    );
  }

  return (
    <div className="blok-lokacije">
      <button className="dugme dugme-glavno" onClick={pronadjiNajblizi} disabled={ucitava}>
        {ucitava ? "Tražim..." : "📍 Koristi moju lokaciju"}
      </button>
      {greska && <p className="poruka-greske">{greska}</p>}
    </div>
  );
}
