import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AppDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    fetch("/data/apps.json")
      .then((r) => r.json())
      .then((all) => setApp(all.find((x) => x.id === id)));
  }, [id]);

  if (!app) return <p className="text-white">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass glow-blue p-8 rounded-2xl shadow-xl text-white"
    >
      <img
        src={app.thumb}
        className="w-full h-64 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-4">
        {app.name} <span className="text-blue-300">v{app.ver}</span>
      </h1>

      <p className="mt-3 text-blue-200">{app.desc}</p>

      <h3 className="font-semibold mt-5 text-xl">XML Files Included:</h3>

      <ul className="list-disc ml-6 mt-2 text-blue-200">
        {app.xmls.map((x, i) => <li key={i}>{x}</li>)}
      </ul>

      <a href={app.zip} className="btn-blue mt-6 inline-block">
        Download App
      </a>
    </motion.div>
  );
}