import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppMarket() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/data/apps.json")
      .then((res) => res.json())
      .then(setApps);
  }, []);

  return (
    <div>
      <h2 className="text-3xl text-white font-bold mb-5">App Marketplace</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass glow-blue p-6 rounded-2xl flex gap-5 shadow-xl"
          >
            <img src={a.thumb} className="w-32 h-24 object-cover rounded-xl" />

            <div className="flex-1 text-white">
              <h3 className="font-bold text-xl">
                {a.name} <span className="text-blue-300">v{a.ver}</span>
              </h3>
              <p className="text-blue-200 text-sm">{a.desc}</p>

              <div className="mt-4 flex gap-3">
                <Link to={`/apps/${a.id}`} className="btn-blue">View</Link>
                <a href={a.zip} className="btn-blue">Download</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}