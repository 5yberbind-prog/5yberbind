import { useParams } from "react-router-dom";
import blogs from "/public/data/blogs.json";

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id == id);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <img src={blog.image} className="rounded mb-3" />
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="mt-4 text-gray-300">{blog.content}</p>

      <a
        className="bg-blue-600 px-4 py-2 block mt-4 w-max rounded"
        href="/assets/downloads/sample-pack.zip"
        download
      >
        Download Pack
      </a>
    </div>
  );
}