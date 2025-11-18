import React, { useState } from 'react'

export default function PremiumStore() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [preview, setPreview] = useState(null)
  const [cart, setCart] = useState([])

  // --- PRODUCTS DATA (assets path FIXED for GitHub Pages) ---
  const products = [
    {
      id: 'ep-001',
      title: 'Color Grading Pack',
      type: 'editing-pack',
      price: 499,
      thumbnail: './assets/thumb-lut.jpg',
      previewUrl: './assets/previews/lut-demo.mp4',
      fileUrl: './downloads/luts-20.zip',
      tags: ['LUT', 'Color']
    },
    {
      id: 'xml-101',
      title: 'KineMaster XML Template',
      type: 'xml-template',
      price: 299,
      thumbnail: './assets/thumb-xml.jpg',
      previewUrl: './assets/previews/xml-demo.mp4',
      fileUrl: './downloads/xml-101.zip',
      tags: ['XML', 'Template']
    },
    {
      id: 'tpl-500',
      title: 'Instagram Stories Pack',
      type: 'template',
      price: 249,
      thumbnail: './assets/thumb-stories.jpg',
      previewUrl: './assets/previews/stories-demo.mp4',
      fileUrl: './downloads/stories-pack.zip',
      tags: ['Instagram', 'Template']
    },
    {
      id: 'app-900',
      title: 'Preview Player APK',
      type: 'app',
      price: 0,
      thumbnail: './assets/thumb-app.jpg',
      previewUrl: './assets/previews/app-demo.mp4',
      fileUrl: './downloads/preview-player.apk',
      tags: ['APK', 'App']
    }
  ]

  const filtered = products.filter((p) => {
    if (filter !== 'all' && p.type !== filter) return false
    if (query && !(`${p.title} ${p.tags.join(' ')}`.toLowerCase()).includes(query.toLowerCase())) return false
    return true
  })

  function addToCart(product) {
    if (cart.find((c) => c.id === product.id)) return
    setCart((prev) => [...prev, product])
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">5B</div>
            <div>
              <h1 className="text-lg font-semibold">5yberBind Store</h1>
              <p className="text-xs text-gray-500">Premium editing packs, XMLs, templates & apps</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* HERO SECTION */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Sell your editing assets with 5yberBind</h2>
            <p className="mt-4 text-gray-600">Upload editing packs, XML templates, preview files, APKs and sell directly.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="rounded-lg overflow-hidden">
              <img src="./assets/hero-preview.jpg" alt="hero preview" className="w-full h-64 object-cover" />
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-500">Featured Pack</div>
              <div className="font-semibold">Cinematic LUTs Pack</div>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => setPreview(products[0])}
                  className="px-4 py-2 border rounded"
                >
                  Preview
                </button>
                <a href={products[0].fileUrl} className="px-4 py-2 bg-indigo-600 text-white rounded">
                  Download
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">All Assets</h3>
            <div className="flex gap-3 items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or tag"
                className="px-3 py-2 border rounded-md"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="editing-pack">Editing Packs</option>
                <option value="xml-template">XML Templates</option>
                <option value="template">Templates</option>
                <option value="app">Apps</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="bg-white rounded-lg shadow group overflow-hidden">
                <div className="relative">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-44 object-cover" />
                  <div className="absolute top-3 right-3 bg-white/80 rounded-md px-2 py-1 text-xs">{p.type}</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{p.title}</h4>
                  <div className="mt-2 text-sm text-gray-500">{p.tags.join(' • ')}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-bold">{p.price === 0 ? 'Free' : `₹ ${p.price}`}</div>
                    <div className="flex gap-2">
                      <button onClick={() => setPreview(p)} className="px-3 py-1 border rounded-md text-sm">Preview</button>
                      <button onClick={() => addToCart(p)} className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Add</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CART */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow col-span-3">
            <h4 className="font-semibold">Cart & Downloads</h4>

            <div className="mt-4">
              {cart.length === 0 ? (
                <div className="text-gray-500">No items in cart.</div>
              ) : (
                <div className="space-y-3">
                  {cart.map((c) => (
                    <div key={c.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-xs text-gray-500">{c.type} • {c.tags.join(', ')}</div>
                      </div>

                      <div className="flex gap-2 items-center">
                        <div className="font-bold">{c.price === 0 ? 'Free' : `₹ ${c.price}`}</div>
                        <button onClick={() => removeFromCart(c.id)} className="px-3 py-1 border rounded">Remove</button>
                        <a href={c.fileUrl} className="px-3 py-1 bg-indigo-600 text-white rounded">Download</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="font-semibold">Preview: {preview.title}</div>
              <button onClick={() => setPreview(null)} className="px-3 py-1 border rounded">Close</button>
            </div>

            <div className="p-4">
              <video controls className="w-full max-h-[480px]">
                <source src={preview.previewUrl} />
              </video>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">Type: {preview.type}</div>
                <div className="flex items-center gap-2">
                  <div className="font-bold">{preview.price === 0 ? 'Free' : `₹ ${preview.price}`}</div>
                  <a href={preview.fileUrl} download className="px-4 py-2 bg-teal-600 text-white rounded">Download Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}