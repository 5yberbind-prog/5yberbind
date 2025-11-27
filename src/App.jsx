import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import AppMarket from "./pages/AppMarket";
import AppDetail from "./pages/AppDetail";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4 flex gap-6 text-lg">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/apps">Apps</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/apps" element={<AppMarket />} />
          <Route path="/apps/:id" element={<AppDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}