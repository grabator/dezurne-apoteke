import {
  ucitajGradove,
  imaPodatkeZaGrad,
  izracunajDezurneApoteke,
  danasZaPrikaz,
} from "@/lib/apoteke";
import { mnozina } from "@/lib/tekst";
import DugmeLokacija from "@/components/DugmeLokacija";
import { IkonaStrelica } from "@/components/Ikone";

export const dynamic = "force-dynamic";

export default function PocetnaStranica() {
  const sada = new Date();
  const gradovi = ucitajGradove();
  const dostupni = gradovi
    .filter((g) => imaPodatkeZaGrad(g.id))
    .map((g) => ({ ...g, broj: izracunajDezurneApoteke(g.id, sada).apoteke.length }));
  const uskoro = gradovi.filter((g) => !imaPodatkeZaGrad(g.id));

  return (
    <div className="pocetna">
      <section className="hero">
        <p className="nadnaslov">
          <span className="uzivo-tacka" aria-hidden="true" />
          Uživo · {danasZaPrikaz(sada)}
        </p>
        <h1 className="hero-naslov">
          Koja apoteka radi <em>upravo sada</em>?
        </h1>
        <p className="hero-uvod">
          Dežurne apoteke po gradovima u Bosni i Hercegovini — adresa, telefon i put do
          vrata, u par sekundi.
        </p>

        <DugmeLokacija gradovi={gradovi} />
      </section>

      <section className="sekcija-gradovi" aria-labelledby="naslov-gradovi">
        <div className="sekcija-zaglavlje">
          <h2 id="naslov-gradovi" className="sekcija-naslov">
            Gradovi
          </h2>
          <span className="sekcija-brojac">
            {dostupni.length} od {gradovi.length}
          </span>
        </div>

        <ul className="lista-gradova">
          {dostupni.map((grad, i) => (
            <li key={grad.id} style={{ "--i": i }} className="ulaz">
              <a href={`/${grad.id}`} className="red-grada">
                <span className="red-grada-tekst">
                  <span className="red-grada-naziv">{grad.naziv}</span>
                  <span className="red-grada-entitet">{grad.entitet}</span>
                </span>
                <span className={`znacka ${grad.broj ? "" : "znacka-prazna"}`}>
                  {grad.broj
                    ? `${grad.broj} ${mnozina(grad.broj, ["dežurna", "dežurne", "dežurnih"])}`
                    : "Nema podatka"}
                </span>
                <span className="red-grada-strelica">
                  <IkonaStrelica velicina={18} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {uskoro.length > 0 && (
          <div className="uskoro">
            <h3 className="uskoro-naslov">Uskoro</h3>
            <ul className="uskoro-lista">
              {uskoro.map((grad) => (
                <li key={grad.id} className="cip">
                  {grad.naziv}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
