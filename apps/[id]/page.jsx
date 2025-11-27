import apps from "../../../data/apps.json";

export default function AppDetail({ params }) {
  const id = params.id;
  const app = apps.find(x => String(x.id) === String(id));
  if (!app) return <p>Not found</p>;

  return (
    <section className="bg-slate-800 p-6 rounded-lg">
      <h1 className="text-3xl font-bold">{app.name}</h1>
      <p className="mt-2 text-slate-300">{app.desc}</p>
      <ul className="mt-4 list-disc ml-6 text-slate-300">
        {(app.xmls||[]).map(x => <li key={x}>{x}</li>)}
      </ul>
      <a href={app.download} className="inline-block mt-4 bg-emerald-600 px-4 py-2 rounded">Download</a>
    </section>
  );
}