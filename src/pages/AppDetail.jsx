import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AppDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    fetch("/data/apps.json")
      .then(res => res.json())
      .then(all => setApp(all.find(a => a.id === id)));
  }, [id]);

  if (!app) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <img src={app.thumb} className="w-full h-60 object-cover rounded" />

      <h1 className="text-3xl font-bold mt-4">
        {app.name} <span className="text-sm text-gray-500">v{app.ver}</span>
      </h1>

      <p className="mt-2 text-gray-700">{app.desc}</p>

      <h3 className="font-semibold mt-4">Included XML Files:</h3>
      <ul className="list-disc ml-6 text-gray-600">
        {app.xmls.map((x, i) => <li key={i}>{x}</li>)}
      </ul>

      <a href={app.zip} className="inline-block mt-4 text-blue-600">
        Download Full ZIP
      </a>
    </div>
  );
}