import { IkonaNazad } from "@/components/Ikone";

export default function NijeNadjeno() {
  return (
    <div className="stranica-grada">
      <a href="/" className="link-nazad">
        <IkonaNazad velicina={16} />
        Svi gradovi
      </a>
      <header className="grad-zaglavlje">
        <p className="nadnaslov">Greška 404</p>
        <h1 className="grad-naslov">Ovaj grad još nije tu.</h1>
        <p className="grad-entitet">
          Vrati se na početnu i odaberi grad sa liste — nove gradove dodajemo postepeno.
        </p>
      </header>
    </div>
  );
}
