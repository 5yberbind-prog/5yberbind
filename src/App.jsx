import React from "react";

const siteTitle = "5yberBind - Resource Market";

const sampleApps = [
  { id: 1, name: "PhotoEditor Pro", version: "v2.1", size: "24 MB", thumbnail: "/assets/app1.jpg", downloads: "/downloads/app1.zip", short: "Advanced image editor" },
  { id: 2, name: "VideoMaster X", version: "v1.8", size: "36 MB", thumbnail: "/assets/app2.jpg", downloads: "/downloads/app2.zip", short: "Video editing suite" },
  { id: 3, name: "FontPack 500", version: "v1.0", size: "120 MB", thumbnail: "/assets/app3.jpg", downloads: "/downloads/app3.zip", short: "500 premium fonts" },
];

const sampleTemplates = [
  { id: 1, title: "Template 1", preview: "/assets/template1.jpg", download: "/downloads/template1.zip" },
  { id: 2, title: "Template 2", preview: "/assets/template2.jpg", download: "/downloads/template2.zip" },
];

const sampleBlogs = [
  { id: 1, title: "How to Edit XML Files", image: "/assets/blog1.jpg", excerpt: "Step-by-step XML guide", readMore: "/blog/1" },
  { id: 2, title: "How to Make a Website", image: "/assets/blog2.jpg", excerpt: "Beginner friendly tutorial", readMore: "/blog/2" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto p-4 flex justify-between">
          <h1 className="text-xl font-bold">{siteTitle}</h1>
          <nav className="space-x-4">
            <a href="#apps">Apps</a>
            <a href="#templates">Templates</a>
            <a href="#blogs">Blogs</a>
            <a href="#downloads">Downloads</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-lg shadow mb-8">
          <h2 className="text-3xl font-bold">5yberBind Resource Marketplace</h2>
          <p className="mt-2">Download apps, templates, XML files and more</p>
        </section>

        <section id="apps" className="mb-8">
          <h3 className="text-xl font-bold mb-4">Apps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleApps.map(app => (
              <div key={app.id} className="bg-white p-4 rounded shadow">
                <img src={app.thumbnail} className="rounded h-40 w-full object-cover" />
                <h4 className="mt-3 font-bold">{app.name}</h4>
                <p className="text-sm">{app.short}</p>
                <p className="text-xs text-gray-500">Size: {app.size}</p>
                <a href={app.downloads} className="mt-3 inline-block px-3 py-2 bg-blue-600 text-white rounded">
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="templates" className="mb-8">
          <h3 className="text-xl font-bold mb-4">Templates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleTemplates.map(t => (
              <div key={t.id} className="bg-white p-3 rounded shadow text-center">
                <img src={t.preview} className="h-24 w-full object-cover rounded" />
                <h5 className="font-semibold mt-2">{t.title}</h5>
                <a href={t.download} className="mt-2 inline-block text-sm px-3 py-1 border rounded">
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="blogs" className="mb-8">
          <h3 className="text-xl font-bold mb-4">Blogs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleBlogs.map(b => (
              <div key={b.id} className="bg-white p-4 rounded shadow flex gap-4">
                <img src={b.image} className="w-32 h-24 rounded object-cover" />
                <div>
                  <h4 className="font-bold">{b.title}</h4>
                  <p className="text-sm">{b.excerpt}</p>
                  <a href={b.readMore} className="text-blue-600 text-sm mt-2 inline-block">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="downloads" className="mb-8">
          <h3 className="text-xl font-bold mb-4">Downloads</h3>
          <p>Upload all files in: <code>/public/downloads</code></p>
        </section>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} 5yberBind. All rights reserved.
      </footer>
    </div>
  );
}
