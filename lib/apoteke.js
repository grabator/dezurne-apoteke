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

const ZONA = "Europe/Sarajevo";

// Server (npr. Vercel) radi u UTC-u — datum mora biti po bh. vremenu,
// inače se u ponoć prvog u mjesecu prikaže prošlomjesečna dežurna apoteka.
function formatirajDatum(datum) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ZONA }).format(new Date(datum));
}

export function danasZaPrikaz(datum = new Date()) {
  return new Intl.DateTimeFormat("bs-BA", {
    timeZone: ZONA,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(datum);
}

const NAZIVI_TIPOVA = {
  stalne: "Stalne 0–24 apoteke",
  "mjesecna-rotacija": "Mjesečna rotacija",
  "sedmicna-rotacija": "Sedmična rotacija",
};

export function nazivTipaDezurstva(tip) {
  return NAZIVI_TIPOVA[tip] || "Sistem dežurstva u pripremi";
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
