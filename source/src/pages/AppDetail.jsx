import { useParams } from 'react-router-dom';
import apps from '../../public/data/apps.json';
export default ()=>{
  const {id}=useParams();
  const app=apps.find(a=>String(a.id)===String(id));
  if(!app) return <p>Not found</p>;
  return (<div><h1>{app.name}</h1><p>{app.desc}</p><ul>{(app.xmls||[]).map(x=><li key={x}>{x}</li>)}</ul><a href={app.zip}>Download</a></div>);
}
