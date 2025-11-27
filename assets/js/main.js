// basic interactivity
document.getElementById('year').textContent = new Date().getFullYear();

// Simple client-side router for apps page rendering (if needed)
function fetchJSON(path){
  return fetch(path).then(r=>{
    if(!r.ok) throw new Error('Failed to load '+path);
    return r.json();
  });
}