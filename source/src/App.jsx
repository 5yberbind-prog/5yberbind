import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AppMarket from './pages/AppMarket';
import AppDetail from './pages/AppDetail';

export default function App(){
  return (
    <div style={{fontFamily:'Arial,Helvetica,sans-serif',padding:12}}>
      <header style={{display:'flex',gap:12,alignItems:'center'}}>
        <h2 style={{margin:0}}>5yberBind</h2>
        <nav style={{marginLeft:12}}>
          <Link to="/">Home</Link> {' | '}
          <Link to="/blogs">Blogs</Link> {' | '}
          <Link to="/apps">Apps</Link>
        </nav>
      </header>
      <main style={{marginTop:16}}>
         <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/blogs" element={<BlogList/>}/>
           <Route path="/blogs/:id" element={<BlogDetail/>}/>
           <Route path="/apps" element={<AppMarket/>}/>
           <Route path="/apps/:id" element={<AppDetail/>}/>
         </Routes>
      </main>
    </div>
  );
}
