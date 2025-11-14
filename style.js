// splash hide
setTimeout(()=>document.getElementById("splash").style.display="none",900);

// navigation
const pages=document.querySelectorAll(".page");
function show(p){pages.forEach(pg=>pg.hidden=true);document.getElementById(p).hidden=false;}

show("home");

// card details
document.querySelectorAll(".info-btn").forEach(btn=>{
 btn.onclick=()=>{
   const app=btn.dataset.app;
   document.getElementById("detail-title").textContent=app;
   document.getElementById("detail-desc").textContent=app+" description here";
   show("detail-page");
 };
});

document.getElementById("back-home").onclick=()=>show("home");

// open download page
document.getElementById("detail-download").onclick=()=>{
 const name=document.getElementById("detail-title").textContent;
 document.getElementById("download-app").textContent=name;
 startTimer();
 show("download-page");
};

document.getElementById("back-from-download").onclick=()=>show("home");

// timer logic
function startTimer(){
 let t=5;
 const c=document.getElementById("countdown");
 const links=document.getElementById("download-links");
 links.hidden=true;

 let x=setInterval(()=>{
   t--; c.textContent=t;
   if(t<=0){
     clearInterval(x);
     links.hidden=false;
     document.getElementById("dl1").href="#"; 
     document.getElementById("dl2").href="#";
   }
 },1000);
}