const steps = document.querySelectorAll(".form-step");
const indicators = document.querySelectorAll(".step");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const sendBtn = document.getElementById("sendBtn");

let current = 0;

const summary = document.getElementById("summaryBox");
const liveSummary = document.getElementById("liveSummary");

function showStep(index){

steps.forEach((s,i)=>{
s.classList.toggle("active",i===index);
});

indicators.forEach((s,i)=>{
s.classList.toggle("active",i<=index);
});

prevBtn.style.display=index===0?"none":"inline-block";

nextBtn.style.display=index===steps.length-1?"none":"inline-block";

sendBtn.style.display=index===steps.length-1?"inline-block":"none";

updateSummary();

}

showStep(0);

nextBtn.onclick=()=>{

if(current<steps.length-1){

current++;

showStep(current);

document.getElementById("order").scrollIntoView({
  behavior: "smooth",
  block: "start"
});

}

}

prevBtn.onclick=()=>{

if(current>0){

current--;

showStep(current);

document.getElementById("order").scrollIntoView({
  behavior: "smooth",
  block: "start"
});

}

}

function value(name){

let el=document.querySelector(`input[name="${name}"]:checked`);

return el?el.value:"لم يتم الاختيار";

}

function text(id){

let el=document.getElementById(id);

return el.value.trim()||"غير موجود";

}

function updateSummary(){

let site=value("siteType");
let budget=value("budget");
let details=text("details");
let features=text("features");
let name=text("clientName");
let phone=text("clientPhone");
let email=text("clientEmail");

summary.innerHTML=`

<b>نوع الموقع:</b> ${site}<br><br>

<b>الميزانية:</b> ${budget}<br><br>

<b>تفاصيل المشروع:</b><br>${details}<br><br>

<b>المميزات:</b><br>${features}<br><br>

<b>الاسم:</b> ${name}<br>

<b>الهاتف:</b> ${phone}<br>

<b>البريد:</b> ${email}

`;

liveSummary.innerHTML=`

<li>نوع الموقع : ${site}</li>

<li>الميزانية : ${budget}</li>

<li>الاسم : ${name}</li>

<li>رقم التواصل : ${phone}</li>

`;

}

document.querySelectorAll("input,textarea").forEach(el=>{

el.addEventListener("input",updateSummary);

el.addEventListener("change",updateSummary);

});

sendBtn.onclick=()=>{

let msg=`*طلب موقع جديد*

📌 نوع الموقع:
${value("siteType")}

💰 الميزانية:
${value("budget")}

📝 التفاصيل:
${text("details")}

⚙️ المميزات:
${text("features")}

👤 الاسم:
${text("clientName")}

📱 الهاتف:
${text("clientPhone")}

📧 البريد:
${text("clientEmail")}

تم الإرسال من نموذج DevPlay Studio`;

window.open("https://wa.me/201035966569?text="+encodeURIComponent(msg));

}










const canvas=document.getElementById("stars");

const ctx=canvas.getContext("2d");

let w,h;

function resize(){

w=canvas.width=window.innerWidth;

h=canvas.height=window.innerHeight;

}

resize();

window.onresize=resize;

let mouse={

x:-9999,

y:-9999

};

window.addEventListener("mousemove",e=>{

mouse.x=e.clientX;

mouse.y=e.clientY;

});

window.addEventListener("touchmove",e=>{

mouse.x=e.touches[0].clientX;

mouse.y=e.touches[0].clientY;

});

class Star{

constructor(){

this.reset();

}

reset(){

this.x=Math.random()*w;

this.y=Math.random()*h;

this.r=Math.random()*2+1;

this.dx=(Math.random()-.5)*0.3;

this.dy=(Math.random()-.5)*0.3;

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.r,0,Math.PI*2);

ctx.fillStyle="#6edcff";

ctx.shadowBlur=10;

ctx.shadowColor="#00d4ff";

ctx.fill();

}

update(){

this.x+=this.dx;

this.y+=this.dy;

let dist=Math.hypot(this.x-mouse.x,this.y-mouse.y);

if(dist<120){

let angle=Math.atan2(this.y-mouse.y,this.x-mouse.x);

this.x+=Math.cos(angle)*5;

this.y+=Math.sin(angle)*5;

}

if(this.x<0||this.x>w||this.y<0||this.y>h){

this.reset();

}

this.draw();

}

}

const stars=[];

for(let i=0;i<180;i++){

stars.push(new Star());

}

let meteors=[];

class Meteor{

constructor(){

this.x=Math.random()*w;

this.y=-100;

this.len=120+Math.random()*120;

this.speed=10+Math.random()*8;

}

draw(){

ctx.beginPath();

ctx.moveTo(this.x,this.y);

ctx.lineTo(this.x-this.len,this.y+this.len);

ctx.strokeStyle="rgba(255,255,255,.8)";

ctx.lineWidth=2;

ctx.stroke();

}

update(){

this.x+=this.speed;

this.y+=this.speed;

this.draw();

}

}

setInterval(()=>{

meteors.push(new Meteor());

},2500);

function animate(){

ctx.clearRect(0,0,w,h);

stars.forEach(s=>s.update());

meteors.forEach((m,i)=>{

m.update();

if(m.y>h+200){

meteors.splice(i,1);

}

});

requestAnimationFrame(animate);

}

animate();

window.addEventListener("click",()=>{

stars.forEach(s=>{

let angle=Math.random()*Math.PI*2;

s.x+=Math.cos(angle)*25;

s.y+=Math.sin(angle)*25;

});

});
document.querySelectorAll(".option input").forEach((input) => {
  input.addEventListener("change", () => {
    document
      .querySelectorAll(`input[name="${input.name}"]`)
      .forEach((i) => i.closest(".option").classList.remove("selected"));

    input.closest(".option").classList.add("selected");
  });
});
