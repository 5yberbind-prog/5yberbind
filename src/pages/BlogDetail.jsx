import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then(res => res.json())
      .then(all => setBlog(all.find(b => String(b.id) === id)));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <img src={blog.img} className="w-full h-60 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
      <p className="mt-2 text-gray-700">{blog.content}</p>

      <a href={blog.zip} className="inline-block mt-4 text-blue-600">
        Download Pack
      </a>
    </div>
  );
}