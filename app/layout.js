import "./globals.css";
import RegistracijaServiceWorkera from "@/components/RegistracijaServiceWorkera";

export const metadata = {
  title: "Dežurne apoteke BiH",
  description: "Pronađi dežurnu apoteku u svom gradu upravo sada.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0f9d58",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs">
      <body>
        <RegistracijaServiceWorkera />
        <header className="zaglavlje">
          <a href="/" className="logo">
            💊 Dežurne apoteke BiH
          </a>
        </header>
        <main>{children}</main>
        <footer className="podnozje">
          <p>Podaci mogu biti netačni ili zastarjeli — uvijek pozovi apoteku prije odlaska.</p>
        </footer>
      </body>
    </html>
  );
}
