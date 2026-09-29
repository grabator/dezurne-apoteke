import { notFound } from "next/navigation";
import {
  izracunajDezurneApoteke,
  ucitajPostavke,
  danasZaPrikaz,
  nazivTipaDezurstva,
} from "@/lib/apoteke";
import ListaApoteka from "@/components/ListaApoteka";
import { IkonaNazad, IkonaUpozorenje, IkonaVanjskiLink } from "@/components/Ikone";

export default async function StranicaGrada({ params }) {
  const { grad: gradId } = await params;
  const sada = new Date();
  const { grad, apoteke } = izracunajDezurneApoteke(gradId, sada);

  if (!grad) {
    notFound();
  }

  const postavke = ucitajPostavke();

  return (
    <div className="stranica-grada">
      <a href="/" className="link-nazad">
        <IkonaNazad velicina={16} />
        Svi gradovi
      </a>

      <header className="grad-zaglavlje">
        <p className="nadnaslov">
          <span className="uzivo-tacka" aria-hidden="true" />
          Dežurno danas · {danasZaPrikaz(sada)}
        </p>
        <h1 className="grad-naslov">{grad.naziv}</h1>
        <p className="grad-entitet">{grad.entitet}</p>

        <dl className="grad-meta">
          <div>
            <dt>Sistem</dt>
            <dd>{nazivTipaDezurstva(grad.tipDezurstva)}</dd>
          </div>
          <div>
            <dt>Ažurirano</dt>
            <dd>
              {new Date(grad.azurirano).toLocaleDateString("bs-BA", { timeZone: "UTC" })}
            </dd>
          </div>
          <div className="grad-meta-izvor">
            <dt>Izvor</dt>
            <dd>
              {grad.izvorUrl ? (
                <a href={grad.izvorUrl} target="_blank" rel="noopener noreferrer">
                  {grad.izvor}
                  <IkonaVanjskiLink velicina={13} />
                </a>
              ) : (
                grad.izvor
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="napomena" role="note">
        <IkonaUpozorenje velicina={20} />
        <p>
          <strong>Nazovi prije nego kreneš.</strong> Raspored se zna promijeniti, a podaci
          ovdje mogu kasniti.
        </p>
      </div>

      {apoteke.length === 0 ? (
        <div className="prazno">
          <p className="prazno-naslov">Za ovaj grad još nemamo podatke.</p>
          <p>
            Dok ih ne dodamo, provjeri lokalni portal ili nazovi bilo koju apoteku — na
            vratima obično piše koja je dežurna.
          </p>
        </div>
      ) : (
        <ListaApoteka
          apoteke={apoteke}
          emailZaPrijave={postavke.emailZaPrijave}
          nazivGrada={grad.naziv}
        />
      )}
    </div>
  );
}
