import blogs from "../../../data/blogs.json";

export default function BlogDetail({ params }) {
  const id = params.id;
  const b = blogs.find(x => String(x.id) === String(id));
  if (!b) return <p>Not found</p>;

  return (
    <section className="bg-slate-800 p-6 rounded-lg">
      <h1 className="text-3xl font-bold">{b.title}</h1>
      <p className="mt-4 text-slate-300">{b.content}</p>
      {b.zip && <a href={b.zip} className="inline-block mt-4 bg-sky-500 px-4 py-2 rounded">Download Pack</a>}
    </section>
  );
}