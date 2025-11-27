import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="glass glow-blue p-8 rounded-2xl shadow-xl text-white"
    >
      <h1 className="text-4xl font-bold">Welcome to 5yberBind Marketplace</h1>
      <p className="mt-3 text-blue-200">
        Download professional apps, editing packs, XMLs, templates & more.
      </p>

      <div className="mt-5 flex gap-4">
        <a href="/blogs" className="btn-blue">Explore Blogs</a>
        <a href="/apps" className="btn-blue">Explore Apps</a>
      </div>
    </motion.div>
  );
}