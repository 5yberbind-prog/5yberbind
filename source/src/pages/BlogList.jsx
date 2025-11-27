import blogs from '../../public/data/blogs.json';
import { Link } from 'react-router-dom';
export default ()=>(<>
  <h1>Blogs</h1>
  {blogs.map(b=><div key={b.id}><Link to={'/blogs/'+b.id}>{b.title}</Link></div>)}
</>);
