import { Fraunces, Onest } from "next/font/google";
import "./globals.css";
import RegistracijaServiceWorkera from "@/components/RegistracijaServiceWorkera";
import { Logo } from "@/components/Ikone";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-serif",
});

const onest = Onest({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dežurne apoteke BiH",
  description: "Koja apoteka radi upravo sada — dežurne apoteke po gradovima u BiH.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b110e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs" className={`${fraunces.variable} ${onest.variable}`}>
      <body>
        <RegistracijaServiceWorkera />
        <header className="zaglavlje">
          <div className="zaglavlje-sadrzaj">
            <a href="/" className="logo">
              <Logo />
              <span className="logo-tekst">
                Dežurne apoteke <span className="logo-oznaka">BiH</span>
              </span>
            </a>
          </div>
        </header>
        <main className="omotac">{children}</main>
        <footer className="podnozje">
          <div className="podnozje-sadrzaj">
            <p>
              Podaci se preuzimaju iz javnih izvora i mogu biti zastarjeli. U hitnim
              slučajevima nazovi <a href="tel:124">124</a>.
            </p>
            <p className="podnozje-sitno">Probni projekat · nije zvanični servis</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
