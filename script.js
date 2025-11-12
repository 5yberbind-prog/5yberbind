// Sidebar control
const menuBtn=document.getElementById("menuBtn");
const sidebar=document.getElementById("sidebar");
const closeBtn=document.getElementById("closeBtn");
menuBtn.addEventListener("click",()=>sidebar.classList.add("active"));
closeBtn.addEventListener("click",()=>sidebar.classList.remove("active"));
window.addEventListener("click",e=>{
  if(!sidebar.contains(e.target)&&!menuBtn.contains(e.target)){
    sidebar.classList.remove("active");
  }
});

// Auto cards generator
const sections={
  gaming:["Free Fire Config","BGMI Lag Fix","COD Pro HUD"],
  editing:["CapCut Pack","Lightroom Presets","Alight Motion XML"],
  utility:["File Splitter","FPS Booster","Battery Saver"],
  earning:["Teen Patti 3F","Rummy Gold","TaskBucks"],
  music:["FL Studio Pack","DJ Remix App","Sound Loops"],
  photo:["Snapseed Mod","Pixellab Pack","Remini Pro"],
  ai:["ChatGPT Clone","AI Image Maker","VoiceOver AI"],
  capcut:["Trending Templates","Velocity Pack","Cinematic FX"],
  tech:["APK Decompiler","GitHub Tools","Link Shortener"]
};
Object.keys(sections).forEach(id=>{
  const container=document.getElementById(id+"Cards");
  if(container){
    sections[id].forEach(name=>{
      const div=document.createElement("div");
      div.className="card";
      div.innerHTML=`<h3>${name}</h3><p>Download the latest version for Android.</p><a href="#" class="download-btn">Download</a>`;
      container.appendChild(div);
    });
  }
});

// Mouse Glow Animation (Professional)
const canvas=document.getElementById("mouseCanvas");
const ctx=canvas.getContext("2d");
let width=canvas.width=window.innerWidth;
let height=canvas.height=window.innerHeight;
const dots=[];
for(let i=0;i<40;i++){
  dots.push({x:Math.random()*width,y:Math.random()*height,r:Math.random()*2+1,dx:(Math.random()-.5)*.5,dy:(Math.random()-.5)*.5});
}
let mouse={x:null,y:null};
window.addEventListener("mousemove",e=>{mouse.x=e.x;mouse.y=e.y;});

function draw(){
  ctx.clearRect(0,0,width,height);
  dots.forEach(d=>{
    ctx.beginPath();
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fillStyle="rgba(0,255,255,0.4)";
    ctx.fill();
    d.x+=d.dx;d.y+=d.dy;
    if(d.x<0||d.x>width)d.dx*=-1;
    if(d.y<0||d.y>height)d.dy*=-1;
    if(mouse.x && Math.hypot(d.x-mouse.x,d.y-mouse.y)<100){
      ctx.beginPath();
      ctx.moveTo(d.x,d.y);
      ctx.lineTo(mouse.x,mouse.y);
      ctx.strokeStyle="rgba(255,191,0,0.1)";
      ctx.stroke();
    }
  });
  requestAnimationFrame(draw);
}
draw();
window.addEventListener("resize",()=>{width=canvas.width=window.innerWidth;height=canvas.height=window.innerHeight;});

// 🌈 Daily Neon Theme Changer
const root=document.documentElement;
const neonColors=["#00ffff","#ff00ff","#ffbf00","#00ff88","#007bff","#ff3ec9"];
function applyTheme(){
  const day=new Date().getDay();
  const color=neonColors[day%neonColors.length];
  root.style.setProperty("--neon",color);
}
applyTheme();
setInterval(applyTheme,3600000);