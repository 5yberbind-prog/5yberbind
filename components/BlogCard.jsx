import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow">
      <div className="h-36 bg-slate-700 rounded-md flex items-center justify-center text-white font-semibold">{blog.title}</div>
      <h3 className="mt-3 font-semibold">{blog.title}</h3>
      <p className="text-sm text-slate-400">{blog.excerpt}</p>
      <div className="mt-3">
        <Link href={`/blogs/${blog.id}`} className="px-3 py-1 bg-sky-500 rounded text-white">Read</Link>
      </div>
    </div>
  );
}