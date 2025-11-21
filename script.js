/* 5yberBind - Ultimate Download Portal (Single-file React Preview) Filename: High-Professional-Download-Portal-5yberbind.jsx Type: code/react (Tailwind CSS required)

WHAT THIS FILE IS:

A single-file React app (App component) demonstrating a full, production-ready UI layout:

Light mode, Dark mode, Gradient premium theme

Responsive (mobile-first) layouts

Sections: Hero, Blogs, Apps, Templates, Resources, App Detail, XML Viewer, Admin Upload UI (front-end stub)

Theme toggle, language toggle (ENG/HIN), and branding updated to "5yberBind"



HOW TO USE (copy-paste ready):

1. Delete old files: remove src/App.jsx (or src/App.tsx), src/App.css and any conflicting components in src/components/ you don't want to keep.


2. Create this as src/App.jsx in your React project.


3. Ensure Tailwind is installed and configured. (Quick setup below.)


4. Place your assets under /public/assets/ (images, videos, xml, templates, zips) OR replace links in the sample data with your CDN/S3 links.


5. Run dev server (npm run dev or npm start).



TAILWIND QUICK SETUP (if not installed):

1. npm install -D tailwindcss postcss autoprefixer


2. npx tailwindcss init -p


3. Configure tailwind.config.js content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}']


4. Add to src/index.css: @tailwind base; @tailwind components; @tailwind utilities;


5. Import './index.css' in src/main.jsx or src/index.jsx



SECURITY & PRODUCTION NOTES:

Serve downloads from secure CDN or signed URLs.

For XML preview, always sanitize server-side to prevent XSS.

Use server auth for uploads and admin panel. The upload UI in this file is a front-end stub only.


FILES TO REPLACE / DELETE (explicit):

Delete: src/App.jsx (old) and src/App.css

Paste this file as src/App.jsx

If you have src/main.jsx import, ensure it renders <App /> exported by this file.


CUSTOMIZATION POINTS (search and replace):

SITE_TITLE constant to change site name

sampleData arrays near top for blogs/apps/templates/resources

/assets/... paths -> replace with your storage

Update analytics/adsense keys on production



---

*/

import React, { useEffect, useState } from 'react'; import { FiDownload, FiSearch, FiMoon, FiSun, FiFilm, FiFileText, FiGrid } from 'react-icons/fi';

// ---------- SITE CONFIG const SITE_TITLE = '5yberBind';

// ---------- SAMPLE DATA (replace with real data or fetch from API) const sampleBlogs = [ { id: 1, title: 'Editing XML Templates — Complete Guide', excerpt: 'How to use and customize XML templates for Android editors and presets.', author: '5yberBind', date: '2025-11-21', thumb: '/assets/images/blog1.jpg', content: 'Full blog text here. Replace with your post content.', media: ['/assets/videos/blog1-preview.mp4', '/assets/images/blog1-preview.png'] }, { id: 2, title: 'Create Pro Thumbnails Fast', excerpt: 'Download thumbnail templates & editing packs for quick use.', author: '5yberBind', date: '2025-10-05', thumb: '/assets/images/blog2.jpg', content: 'Full blog text here.', media: ['/assets/videos/blog2-preview.mp4', '/assets/images/blog2-preview.png'] } ];

const sampleApps = [ { id: 'app-photo-pack', name: 'Pro Photo Editor Pack', short: 'XML presets, overlays, LUTs and project files.', screenshots: ['/assets/images/app1-1.png', '/assets/images/app1-2.png'], description: 'Includes XML templates, overlay assets, and preset files. Use in your editor to get pro results quickly.', download: '/assets/templates/photo-editor-pack.zip', xmlFiles: ['/assets/xml/preset1.xml','/assets/xml/preset2.xml'], size: '48 MB', version: 'v2.3' }, { id: 'app-video-pack', name: 'Ultimate Video Pack', short: 'Transistions, overlays, and sample projects for editors.', screenshots: ['/assets/images/app2-1.png','/assets/images/app2-2.png'], description: 'High quality transitions and overlays optimized for mobile editors.', download: '/assets/templates/video-pack.zip', xmlFiles: ['/assets/xml/vpreset1.xml'], size: '120 MB', version: 'v1.8' } ];

const sampleTemplates = [ { id: 't1', name: 'YouTube Thumbnail Pack', file: '/assets/templates/thumbs.zip', size: '12 MB' }, { id: 't2', name: 'App XML Templates', file: '/assets/templates/xml-templates.zip', size: '8 MB' } ];

const sampleResources = [ { id: 'r1', name: 'sample-image-1.png', file: '/assets/images/sample-1.png' }, { id: 'r2', name: 'sample-video-1.mp4', file: '/assets/videos/sample-1.mp4' }, { id: 'r3', name: 'data.xml', file: '/assets/xml/data.xml' } ];

// ---------- Helper: download file (opens link in new tab) function downloadFile(url){ // In production use signed URLs and backend validation window.open(url, '_blank'); }

// ---------- Theme Hook function useTheme(){ const [theme, setTheme] = useState(() => { try{ return localStorage.getItem('site_theme') || 'system'; }catch(e){return 'system';} });

useEffect(()=>{ const root = document.documentElement; const apply = (t)=>{ root.classList.remove('light','dark','gradient-theme'); if(t==='light') root.classList.add('light'); if(t==='dark') root.classList.add('dark'); if(t==='gradient') root.classList.add('gradient-theme'); }; if(theme==='system'){ const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; apply(prefers); } else apply(theme); try{ localStorage.setItem('site_theme', theme); }catch(e){} },[theme]);

return [theme, setTheme]; }

// ---------- Main App export default function App(){ const [query, setQuery] = useState(''); const [theme, setTheme] = useTheme(); const [lang, setLang] = useState('EN'); const [selectedApp, setSelectedApp] = useState(null); const [xmlPreview, setXmlPreview] = useState({open:false, path:''}); const [mobileMenu, setMobileMenu] = useState(false);

const filteredBlogs = sampleBlogs.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.excerpt.toLowerCase().includes(query.toLowerCase())); const filteredApps = sampleApps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.short.toLowerCase().includes(query.toLowerCase()));

useEffect(()=>{ document.title = ${SITE_TITLE} — Downloads & Templates; },[]);

return ( <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">

{/* NAV */}
  <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50 border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{SITE_TITLE}</div>
          <div className="hidden md:flex gap-4 text-sm text-slate-600 dark:text-slate-300">
            <a href="#blogs" className="hover:underline">Blogs</a>
            <a href="#apps" className="hover:underline">Apps</a>
            <a href="#templates" className="hover:underline">Templates</a>
            <a href="#resources" className="hover:underline">Resources</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={lang==='EN' ? 'Search blogs, apps, templates...' : 'Search karo...'} className="px-3 py-1 rounded border text-sm bg-white/60 dark:bg-slate-800/60" />
            <button onClick={()=>{}} className="px-3 py-1 rounded border bg-slate-800 text-white text-sm">Search</button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(t => t==='dark' ? 'light' : 'dark')} className="p-2 rounded border">
              {theme==='dark' ? <FiSun/> : <FiMoon/>}
            </button>
            <select value={lang} onChange={e=>setLang(e.target.value)} className="text-sm rounded border p-1 bg-white/60 dark:bg-slate-800/60">
              <option value="EN">EN</option>
              <option value="HI">HI</option>
            </select>
            <button onClick={()=>setTheme('gradient')} className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded">Gradient</button>
            <button className="md:hidden p-2 border rounded" onClick={()=>setMobileMenu(m=>!m)}>Menu</button>
          </div>
        </div>
      </div>
    </div>

    {mobileMenu && (
      <div className="md:hidden p-4 border-t">
        <div className="flex flex-col gap-2">
          <a href="#blogs">Blogs</a>
          <a href="#apps">Apps</a>
          <a href="#templates">Templates</a>
          <a href="#resources">Resources</a>
        </div>
      </div>
    )}
  </nav>

  {/* HERO */}
  <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">Professional Downloads & Templates for Creators</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Download ready-to-use editing packs, XML templates, app bundles and more — optimized for creators and editors.</p>
        <div className="mt-6 flex gap-3">
          <a href="#apps" className="px-4 py-2 bg-slate-800 text-white rounded">Browse Apps</a>
          <a href="#templates" className="px-4 py-2 border rounded">View Templates</a>
        </div>

        <div className="mt-6 flex gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-2"><FiFileText/> Blogs</div>
          <div className="flex items-center gap-2"><FiFilm/> Video Packs</div>
          <div className="flex items-center gap-2"><FiGrid/> Templates</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <video src={sampleBlogs[0].media[0]} controls className="rounded w-full h-48 object-cover"/>
        <div className="mt-3 flex gap-3 items-center">
          <img src={sampleBlogs[0].media[1]} className="w-20 h-20 object-cover rounded" alt="preview"/>
          <div>
            <div className="font-semibold text-slate-800 dark:text-white">{sampleBlogs[0].title}</div>
            <div className="text-sm text-slate-500">{sampleBlogs[0].excerpt}</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  {/* CONTENT */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

    {/* BLOGS */}
    <section id="blogs" className="py-8">
      <h2 className="text-2xl font-bold mb-4">{lang==='EN' ? 'Blogs' : 'ब्लॉग'}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {filteredBlogs.map(blog => (
          <article key={blog.id} className="bg-white dark:bg-slate-800 p-4 rounded shadow">
            <img src={blog.thumb} alt={blog.title} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{blog.title}</h3>
            <p className="text-sm text-slate-500">{blog.excerpt}</p>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-slate-400">{blog.author} • {blog.date}</div>
              <button onClick={() => alert(blog.content)} className="text-sm text-slate-800 dark:text-white">Read</button>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* APPS */}
    <section id="apps" className="py-8">
      <h2 className="text-2xl font-bold mb-4">{lang==='EN' ? 'Apps & Packs' : 'ऐप्स और पैक'}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {filteredApps.map(app => (
          <div key={app.id} className="bg-white dark:bg-slate-800 p-4 rounded shadow">
            <div className="flex gap-3">
              <img src={app.screenshots[0]} alt={app.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-slate-900 dark:text-white">{app.name}</div>
                <div className="text-sm text-slate-500">{app.short}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setSelectedApp(app)} className="px-3 py-1 border rounded text-sm">Details</button>
                  <button onClick={() => downloadFile(app.download)} className="px-3 py-1 bg-slate-800 text-white rounded text-sm"><FiDownload className="inline mr-1"/>Download</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected App Detail */}
      {selectedApp && (
        <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedApp.name} <span className="text-sm text-slate-500">{selectedApp.version}</span></h3>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">{selectedApp.description}</div>
            </div>
            <div className="text-sm text-slate-500">Size: {selectedApp.size}</div>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-3">
            {selectedApp.screenshots.map((s,i)=> (
              <img key={i} src={s} alt={`s-${i}`} className="w-full h-40 object-cover rounded" />
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={() => downloadFile(selectedApp.download)} className="px-4 py-2 bg-slate-800 text-white rounded">Download App Pack</button>
            {selectedApp.xmlFiles?.map((x,i)=> (
              <button key={i} onClick={() => setXmlPreview({open:true,path:x})} className="px-3 py-1 border rounded">View XML {i+1}</button>
            ))}
            <button onClick={() => setSelectedApp(null)} className="px-3 py-1 border rounded">Close</button>
          </div>
        </div>
      )}
    </section>

    {/* TEMPLATES */}
    <section id="templates" className="py-8">
      <h2 className="text-2xl font-bold mb-4">{lang==='EN' ? 'Templates & Zips' : 'टेम्पलेट्स'}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {sampleTemplates.map(t => (
          <div key={t.id} className="bg-white dark:bg-slate-800 p-4 rounded shadow flex flex-col justify-between">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">{t.name}</div>
              <div className="text-sm text-slate-500">{t.size}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => downloadFile(t.file)} className="px-3 py-1 bg-slate-800 text-white rounded"><FiDownload className="inline mr-1"/>Download</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* RESOURCES */}
    <section id="resources" className="py-8">
      <h2 className="text-2xl font-bold mb-4">{lang==='EN' ? 'Resources' : 'Resources'}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {sampleResources.map(r => (
          <div key={r.id} className="bg-white dark:bg-slate-800 p-4 rounded shadow flex flex-col">
            <div className="flex-1">{r.name}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => downloadFile(r.file)} className="px-3 py-1 bg-slate-800 text-white rounded">Download</button>
            </div>
          </div>
        ))}

        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <div className="font-semibold">Admin Upload (Front-end demo)</div>
          <div className="text-sm text-slate-500 mt-2">This is a front-end placeholder. Implement server upload endpoint for production.</div>
          <div className="mt-3">
            <input type="file" className="text-sm" />
            <div className="mt-2 flex gap-2"><button className="px-3 py-1 bg-slate-800 text-white rounded">Upload</button></div>
          </div>
        </div>
      </div>
    </section>

  </main>

  {/* FOOTER */}
  <footer className="bg-white dark:bg-slate-900 border-t">
    <div className="max-w-7xl mx-auto p-6 text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} {SITE_TITLE} • Built for creators — blogs, apps, templates, XML and downloads.</div>
  </footer>

  {/* XML Preview Modal */}
  {xmlPreview.open && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-3xl max-h-[80vh] overflow-auto p-4 rounded">
        <div className="flex justify-between items-center">
          <div className="font-semibold">XML Preview</div>
          <button onClick={() => setXmlPreview({open:false,path:''})} className="px-3 py-1 border rounded">Close</button>
        </div>
        <pre className="mt-3 bg-slate-100 dark:bg-slate-900 p-3 rounded text-xs overflow-auto">{`Preview path: ${xmlPreview.path}

(For production, fetch file from server and sanitize output before rendering.)`}</pre> <div className="mt-3 flex gap-2"> <button onClick={() => downloadFile(xmlPreview.path)} className="px-3 py-1 bg-slate-800 text-white rounded">Download XML</button> </div> </div> </div> )}

{/* THEME STYLES (Tailwind utility classes will apply, but include minimal theme helper classes here) */}
  <style>{`
    :root.light { --bg: #ffffff; }
    :root.dark { --bg: #0b1220; }
    /* gradient-theme class toggles a gradient background on body */
    .gradient-theme body, .gradient-theme .gradient-bg { background: linear-gradient(135deg,#6d28d9 0%,#3b82f6 50%,#06b6d4 100%);} 
  `}</style>

</div>

); }

/* NEXT STEPS I CAN DO (choose any, I will deliver immediately):

1. Generate a ready ZIP with this React app + sample assets (images/videos/xml) — I will package files for you to download.


2. Provide an Express.js server example that serves signed download URLs and handles admin uploads securely.


3. Create a bilingual Hindi translation for all UI text (toggle already present; I'll supply translations inline).


4. Produce a mobile-only optimized HTML export (pure HTML/CSS/JS) if you want a static hosted version.



Tell me which of the above to do next, or say "Make ZIP" to get the complete project packaged. */