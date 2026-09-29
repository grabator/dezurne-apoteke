import { ucitajGradove, imaPodatkeZaGrad } from "@/lib/apoteke";
import DugmeLokacija from "@/components/DugmeLokacija";

export default function PocetnaStranica() {
  const gradovi = ucitajGradove();
  const dostupni = gradovi.filter((g) => imaPodatkeZaGrad(g.id));
  const uskoro = gradovi.filter((g) => !imaPodatkeZaGrad(g.id));

  return (
    <div>
      <h1 className="naslov-glavni">Pronađi dežurnu apoteku</h1>
      <p className="podnaslov">
        Odaberi grad ili nam dozvoli da ti automatski pronađemo najbliži.
      </p>

      <DugmeLokacija gradovi={gradovi} />

      <div className="lista-gradova">
        {dostupni.map((grad) => (
          <a key={grad.id} href={`/${grad.id}`} className="dugme-grada">
            {grad.naziv}
            <span className="strelica">→</span>
          </a>
        ))}
      </div>

      {uskoro.length > 0 && (
        <div className="sekcija-uskoro">
          <h2 className="naslov-sekcije">Uskoro dostupno</h2>
          <div className="lista-gradova">
            {uskoro.map((grad) => (
              <div key={grad.id} className="dugme-grada dugme-grada-neaktivno">
                {grad.naziv}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
