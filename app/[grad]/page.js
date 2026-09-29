import { notFound } from "next/navigation";
import { izracunajDezurneApoteke, ucitajPostavke } from "@/lib/apoteke";
import ListaApoteka from "@/components/ListaApoteka";

export default function StranicaGrada({ params }) {
  const { grad, apoteke } = izracunajDezurneApoteke(params.grad, new Date());

  if (!grad) {
    notFound();
  }

  const postavke = ucitajPostavke();

  return (
    <div>
      <a href="/" className="link-nazad">
        ← Nazad na izbor grada
      </a>

      <h1 className="naslov-glavni">Dežurne apoteke — {grad.naziv}</h1>

      <div className="info-grada">
        <p>Izvor: {grad.izvor}</p>
        <p>Ažurirano: {grad.azurirano}</p>
      </div>

      <div className="upozorenje">
        ⚠️ Prije odlaska obavezno pozovi apoteku i provjeri radno vrijeme — podaci mogu biti
        zastarjeli.
      </div>

      {apoteke.length === 0 ? (
        <div className="poruka-prazno">
          Trenutno nemamo podatak o dežurnoj apoteci za ovaj period u gradu {grad.naziv}.
          Provjeri lokalne izvore ili nas obavijesti.
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
