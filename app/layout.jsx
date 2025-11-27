import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "5yberBind",
  description: "Premium marketplace for apps, XMLs and editing packs"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}