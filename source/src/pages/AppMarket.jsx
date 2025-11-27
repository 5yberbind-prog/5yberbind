import apps from '../../public/data/apps.json';
import { Link } from 'react-router-dom';
export default ()=>(
  <div>
    <h1>Apps</h1>
    {apps.map(a=><div key={a.id}><Link to={'/apps/'+a.id}>{a.name}</Link></div>)}
  </div>
);
