import Link from "next/link";

export default function AppCard({ app }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow hover:scale-[1.02] transition">
      <div className="h-40 bg-slate-700 rounded-md flex items-center justify-center text-white font-semibold">
        {/* If image exists in public/images/apps use <img src={app.image} /> */}
        {app.name}
      </div>
      <h3 className="mt-3 font-semibold">{app.name}</h3>
      <p className="text-sm text-slate-400">{app.desc}</p>
      <div className="mt-3 flex gap-3">
        <Link href={`/apps/${app.id}`} className="px-3 py-1 bg-sky-500 rounded text-white">View</Link>
        <a href={app.download} className="px-3 py-1 bg-emerald-600 rounded text-white">Download</a>
      </div>
    </div>
  );
}