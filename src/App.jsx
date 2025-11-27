import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import AppMarket from "./pages/AppMarket";
import AppDetail from "./pages/AppDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">5yberBind</Link>
        <div className="flex gap-4">
          <Link to="/blogs">Blogs</Link>
          <Link to="/apps">Apps</Link>
        </div>
      </nav>

      {/* Routes */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/apps" element={<AppMarket />} />
          <Route path="/apps/:id" element={<AppDetail />} />
        </Routes>
      </div>
    </div>
  );
}