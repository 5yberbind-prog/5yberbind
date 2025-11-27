import apps from "/public/data/apps.json";
import { Link } from "react-router-dom";

export default function AppMarket() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {apps.map((app) => (
        <div key={app.id} className="bg-gray-800 p-4 rounded-lg">
          <img src={app.image} className="rounded" />
          <h2 className="text-xl mt-2">{app.name}</h2>
          <p className="text-gray-400 text-sm">{app.desc}</p>
          <Link to={`/apps/${app.id}`} className="text-blue-400 mt-2 inline-block">
            View →
          </Link>
        </div>
      ))}
    </div>
  );
}