import blogs from "../../data/blogs.json";
import BlogCard from "../../components/BlogCard";

export default function BlogsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogs.map(b => <BlogCard key={b.id} blog={b} />)}
      </div>
    </section>
  );
}