import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-slate-900/60 backdrop-blur-sm border-b border-slate-800">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">5yberBind</Link>
        <div className="flex gap-4">
          <Link href="/blogs" className="text-slate-300 hover:text-white">Blogs</Link>
          <Link href="/apps" className="text-slate-300 hover:text-white">Apps</Link>
        </div>
      </nav>
    </header>
  );
}