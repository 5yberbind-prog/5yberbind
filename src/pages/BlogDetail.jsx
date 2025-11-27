import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((r) => r.json())
      .then((all) => setBlog(all.find((x) => String(x.id) === id)));
  }, [id]);

  if (!blog) return <p className="text-white">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass glow-blue p-8 rounded-2xl shadow-xl text-white"
    >
      <img
        src={blog.img}
        className="w-full h-60 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-4">{blog.title}</h1>

      <p className="mt-3 text-blue-200">{blog.content}</p>

      <a href={blog.zip} className="btn-blue mt-4 inline-block">
        Download Pack
      </a>
    </motion.div>
  );
}