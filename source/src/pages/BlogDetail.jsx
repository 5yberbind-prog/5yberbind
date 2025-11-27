import { useParams } from 'react-router-dom';
import blogs from '../../public/data/blogs.json';
export default ()=>{
  const {id}=useParams();
  const blog=blogs.find(b=>String(b.id)===String(id));
  if(!blog) return <p>Not found</p>;
  return (<div><h1>{blog.title}</h1><p>{blog.content||blog.excerpt}</p><a href={blog.zip}>Download</a></div>);
}
