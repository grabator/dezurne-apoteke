import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function ucitajJson(relativnaPutanja) {
  const punaPutanja = path.join(dataDir, relativnaPutanja);
  if (!fs.existsSync(punaPutanja)) return null;
  const sadrzaj = fs.readFileSync(punaPutanja, "utf-8");
  return JSON.parse(sadrzaj);
}

export function ucitajGradove() {
  return ucitajJson("gradovi.json") || [];
}

export function ucitajGrad(gradId) {
  const gradovi = ucitajGradove();
  return gradovi.find((g) => g.id === gradId) || null;
}

export function ucitajApoteke(gradId) {
  return ucitajJson(`apoteke/${gradId}.json`) || [];
}

export function imaPodatkeZaGrad(gradId) {
  const punaPutanja = path.join(dataDir, `apoteke/${gradId}.json`);
  return fs.existsSync(punaPutanja);
}

export function ucitajDezurstva(gradId) {
  return ucitajJson(`dezurstva/${gradId}.json`) || [];
}

export function ucitajPostavke() {
  return ucitajJson("postavke.json") || {};
}

function formatirajDatum(datum) {
  const d = new Date(datum);
  const godina = d.getFullYear();
  const mjesec = String(d.getMonth() + 1).padStart(2, "0");
  const dan = String(d.getDate()).padStart(2, "0");
  return `${godina}-${mjesec}-${dan}`;
}

/**
 * Vraća { grad, apoteke } — apoteke koje su DEŽURNE za dati grad na dati datum.
 * Ovo je jedino mjesto gdje se odlučuje "ko dežura danas" — ako se doda novi
 * tipDezurstva, logika za njega ide ovdje, u novi if/else granu.
 */
export function izracunajDezurneApoteke(gradId, datum = new Date()) {
  const grad = ucitajGrad(gradId);
  if (!grad) return { grad: null, apoteke: [] };

  const apoteke = ucitajApoteke(gradId);
  const danas = formatirajDatum(datum);

  if (grad.tipDezurstva === "stalne") {
    const dezurne = apoteke.filter((a) => a.uvijekDezurna);
    return { grad, apoteke: dezurne };
  }

  if (
    grad.tipDezurstva === "mjesecna-rotacija" ||
    grad.tipDezurstva === "sedmicna-rotacija"
  ) {
    const dezurstva = ucitajDezurstva(gradId);
    const aktivno = dezurstva.find((d) => danas >= d.od && danas <= d.do);
    if (!aktivno) return { grad, apoteke: [] };
    const apoteka = apoteke.find((a) => a.id === aktivno.apotekaId);
    return { grad, apoteke: apoteka ? [apoteka] : [] };
  }

  return { grad, apoteke: [] };
}
