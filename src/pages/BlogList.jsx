import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-5">Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="glass glow-blue p-4 rounded-2xl shadow-xl"
          >
            <img
              src={b.img}
              className="w-full h-40 object-cover rounded-xl"
            />

            <h3 className="text-xl text-white font-bold mt-3">{b.title}</h3>
            <p className="text-blue-200 text-sm">{b.excerpt}</p>

            <div className="flex justify-between mt-4">
              <Link to={`/blogs/${b.id}`} className="btn-blue">Read</Link>
              <a href={b.zip} className="btn-blue">Download</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}