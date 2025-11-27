import blogs from "/public/data/blogs.json";
import { Link } from "react-router-dom";

export default function BlogList() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-gray-800 p-4 rounded-lg">
          <img src={blog.image} className="rounded" />
          <h2 className="text-xl mt-2">{blog.title}</h2>
          <p className="text-gray-400 text-sm">{blog.excerpt}</p>
          <Link to={`/blogs/${blog.id}`} className="text-blue-400 mt-2 inline-block">
            Read →
          </Link>
        </div>
      ))}
    </div>
  );
}