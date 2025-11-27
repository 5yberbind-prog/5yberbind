import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AppMarket() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/data/apps.json")
      .then(res => res.json())
      .then(setApps);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">App Marketplace</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {apps.map(app => (
          <div key={app.id} className="bg-white p-4 rounded shadow flex gap-4">
            <img src={app.thumb} className="w-28 h-20 object-cover rounded" />

            <div className="flex-1">
              <h3 className="font-semibold">
                {app.name} <span className="text-sm text-gray-500">v{app.ver}</span>
              </h3>
              <p className="text-sm text-gray-600">{app.desc}</p>
            </div>

            <div className="text-right">
              <Link to={`/apps/${app.id}`} className="text-blue-600 block">
                View
              </Link>
              <a href={app.zip} className="text-green-600 text-sm block mt-2">
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}