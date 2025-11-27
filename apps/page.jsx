import apps from "../../data/apps.json";
import AppCard from "../../components/AppCard";

export default function AppsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Apps Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {apps.map(a => <AppCard key={a.id} app={a} />)}
      </div>
    </section>
  );
}
