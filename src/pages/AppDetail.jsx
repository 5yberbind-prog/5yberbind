import { useParams } from "react-router-dom";
import apps from "/public/data/apps.json";

export default function AppDetail() {
  const { id } = useParams();
  const app = apps.find((a) => a.id == id);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <img src={app.image} className="rounded mb-3" />
      <h1 className="text-3xl font-bold">{app.name}</h1>

      <p className="mt-2 text-gray-300">{app.desc}</p>

      <a
        href={app.download}
        download
        className="bg-green-600 px-4 py-2 block mt-4 w-max rounded"
      >
        Download App
      </a>
    </div>
  );
}