import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white p-4 rounded shadow">
            <img src={blog.img} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm">{blog.excerpt}</p>

            <div className="flex justify-between mt-3">
              <Link to={`/blogs/${blog.id}`} className="text-blue-600">Read</Link>
              <a href={blog.zip} className="text-green-600">Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}