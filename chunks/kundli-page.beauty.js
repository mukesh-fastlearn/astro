(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20865,e=>{
"use strict";
let a=(0,e.i(56420).default)("map-pin",[["path",{
d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}
],["circle",{
cx:"12",cy:"10",r:"3",key:"ilqhr7"}
]]);
e.s(["MapPin",0,a],20865)}
,28623,e=>{
"use strict";
let a=(0,e.i(56420).default)("sparkles",[["path",{
d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}
],["path",{
d:"M20 2v4",key:"1rf3ol"}
],["path",{
d:"M22 4h-4",key:"gwowj6"}
],["circle",{
cx:"4",cy:"20",r:"2",key:"6kqj1y"}
]]);
e.s(["Sparkles",0,a],28623)}
,49882,e=>{
"use strict";
let a=(0,e.i(56420).default)("calendar",[["path",{
d:"M8 2v4",key:"1cmpym"}
],["path",{
d:"M16 2v4",key:"4m81vk"}
],["rect",{
width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}
],["path",{
d:"M3 10h18",key:"8toen8"}
]]);
e.s(["Calendar",0,a],49882)}
,1279,e=>{
"use strict";
let a=(0,e.i(56420).default)("user",[["path",{
d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}
],["circle",{
cx:"12",cy:"7",r:"4",key:"17ys0d"}
]]);
e.s(["User",0,a],1279)}
,30863,74544,e=>{
"use strict";
var a=e.i(43476),r=e.i(71645),t=e.i(1279),s=e.i(49882),l=e.i(56420);
let i=(0,l.default)("clock",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["path",{
d:"M12 6v6l4 2",key:"mmk7yg"}
]]);
e.s(["Clock",0,i],74544);
var n=e.i(20865),o=e.i(28623);
let d=(0,l.default)("users",[["path",{
d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}
],["path",{
d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}
],["path",{
d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}
],["circle",{
cx:"9",cy:"7",r:"4",key:"nufk8"}
]]);
var c=e.i(46932),x=e.i(88653);
e.s(["default",0,({
onGenerate:e,loading:l,defaultGender:m="Male"}
)=>{
let[p,h]=(0,r.useState)({
name:"",date:"",time:"",lat:13.0827,lon:80.2707,place:"",gender:m}
),[u,g]=(0,r.useState)(""),[y,f]=(0,r.useState)([]),[b,j]=(0,r.useState)(!1),[w,v]=(0,r.useState)(!1),N=r.default.useRef(null);
return r.default.useEffect(()=>{
if(!w||u.length<3)return void f([]);
let e=setTimeout(async()=>{
try{
let e=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${
encodeURIComponent(u)}
&limit=5`),a=await e.json();
f(a),j(!0)}
catch(e){
console.error("Geocoding error:",e)}
}
,500);
return()=>clearTimeout(e)}
,[u,w]),r.default.useEffect(()=>{
function e(e){
N.current&&!N.current.contains(e.target)&&j(!1)}
return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)}
,[]),(0,a.jsxs)(c.motion.form,{
initial:{
opacity:0,scale:.95}
,animate:{
opacity:1,scale:1}
,onSubmit:a=>{
(a.preventDefault(),p.name&&p.date&&p.time)?e(p):alert("Please fill in all birth details.")}
,className:"bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden",children:[(0,a.jsx)("div",{
className:"absolute -top-24 -right-24 w-48 h-48 bg-primary-gold/20 blur-[80px] rounded-full"}
),(0,a.jsx)("div",{
className:"absolute -bottom-24 -left-24 w-48 h-48 bg-primary-saffron/20 blur-[80px] rounded-full"}
),(0,a.jsxs)("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10",children:[(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Full Name"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(t.User,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"text",placeholder:"e.g. Arjun Kumar",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal",value:p.name,onChange:e=>h({
...p,name:e.target.value}
),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Gender"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(d,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsxs)("select",{
className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium appearance-none",value:p.gender,onChange:e=>h({
...p,gender:e.target.value}
),required:!0,children:[(0,a.jsx)("option",{
value:"Male",children:"Male"}
),(0,a.jsx)("option",{
value:"Female",children:"Female"}
),(0,a.jsx)("option",{
value:"Other",children:"Other"}
)]}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Date of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(s.Calendar,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"date",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:p.date,onChange:e=>h({
...p,date:e.target.value}
),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Time of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(i,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"time",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:p.time,onChange:e=>h({
...p,time:e.target.value}
),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2 relative md:col-span-2",ref:N,children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Place of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(n.MapPin,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"text",placeholder:"e.g. Lucknow",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal",value:u,onChange:e=>{
g(e.target.value),v(!0)}
,onFocus:()=>{
y.length>0&&j(!0)}
,required:!0}
),(0,a.jsx)(x.AnimatePresence,{
children:b&&y.length>0&&(0,a.jsx)(c.motion.div,{
initial:{
opacity:0,y:10}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:10}
,className:"absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden",children:y.map((e,r)=>(0,a.jsxs)("div",{
className:"px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors",onClick:()=>{
h({
...p,place:e.display_name,lat:parseFloat(e.lat),lon:parseFloat(e.lon)}
),g(e.name||e.display_name.split(",")[0]),v(!1),j(!1)}
,children:[(0,a.jsx)("p",{
className:"text-sm font-bold text-gray-900",children:e.name||e.display_name.split(",")[0]}
),(0,a.jsx)("p",{
className:"text-xs text-gray-500 truncate",children:e.display_name}
)]}
,r))}
)}
)]}
)]}
)]}
),(0,a.jsx)("button",{
type:"submit",disabled:l,className:"w-full mt-10 py-5 saffron-button rounded-2xl font-bold text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg",children:l?(0,a.jsxs)(a.Fragment,{
children:[(0,a.jsx)("div",{
className:"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"}
),"Generating Celestial Chart..."]}
):(0,a.jsxs)(a.Fragment,{
children:[(0,a.jsx)(o.Sparkles,{
className:"w-5 h-5 group-hover:rotate-12 transition-transform"}
),"Generate My Kundli"]}
)}
),(0,a.jsx)("p",{
className:"text-center mt-6 text-xs text-gray-500 font-bold tracking-widest uppercase",children:"Ancient Vedic Algorithms • 100% Secure"}
)]}
)}
],30863)}
,27937,e=>{
"use strict";
var a=e.i(43476),r=e.i(71645),t=e.i(46932),s=e.i(88653),l=e.i(30863),i=e.i(83158);
let n=({
chart:e,chartStyle:t="south"}
)=>{
let s={
Pisces:{
r:0,c:0}
,Aries:{
r:0,c:1}
,Taurus:{
r:0,c:2}
,Gemini:{
r:0,c:3}
,Cancer:{
r:1,c:3}
,Leo:{
r:2,c:3}
,Virgo:{
r:3,c:3}
,Libra:{
r:3,c:2}
,Scorpio:{
r:3,c:1}
,Sagittarius:{
r:3,c:0}
,Capricorn:{
r:2,c:0}
,Aquarius:{
r:1,c:0}
}
;
if("north"===t){
let r=[{
x:200,y:100}
,{
x:100,y:45}
,{
x:45,y:100}
,{
x:100,y:200}
,{
x:45,y:300}
,{
x:100,y:355}
,{
x:200,y:300}
,{
x:300,y:355}
,{
x:355,y:300}
,{
x:300,y:200}
,{
x:355,y:100}
,{
x:300,y:45}
];
return(0,a.jsx)("div",{
className:"w-full aspect-square max-w-[500px] mx-auto bg-white rounded-xl shadow-inner border border-gray-100 p-2 relative",children:(0,a.jsxs)("svg",{
viewBox:"0 0 400 400",className:"w-full h-full drop-shadow-sm",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("rect",{
width:400,height:400,fill:"#FFFDF8",rx:"8"}
),(0,a.jsxs)("g",{
stroke:"#FDB813",strokeWidth:"2",opacity:"0.5",children:[(0,a.jsx)("line",{
x1:"0",y1:"0",x2:400,y2:400}
),(0,a.jsx)("line",{
x1:400,y1:"0",x2:"0",y2:400}
),(0,a.jsx)("line",{
x1:200,y1:"0",x2:"0",y2:200}
),(0,a.jsx)("line",{
x1:"0",y1:200,x2:200,y2:400}
),(0,a.jsx)("line",{
x1:200,y1:400,x2:400,y2:200}
),(0,a.jsx)("line",{
x1:400,y1:200,x2:200,y2:"0"}
),(0,a.jsx)("rect",{
x:"0",y:"0",width:400,height:400,fill:"none",rx:"8"}
)]}
),(0,a.jsx)("rect",{
width:400,height:400,fill:"none",stroke:"#C1121F",strokeWidth:"4",rx:"8"}
),e.houses.map((e,t)=>{
let s=r[t],l=i.ZODIAC_SIGNS.indexOf(e.sign)+1;
return(0,a.jsxs)("g",{
transform:`translate(${
s.x}
, ${
s.y}
)`,children:[(0,a.jsx)("text",{
x:"0",y:"-12",textAnchor:"middle",className:"fill-primary-saffron text-[10px] font-bold",children:l}
),(0,a.jsx)("foreignObject",{
x:"-45",y:"-6",width:"90",height:"90",className:"overflow-visible",children:(0,a.jsx)("div",{
className:"flex flex-wrap justify-center content-start gap-1 p-0.5 w-full h-full",children:e.planets.map(e=>(0,a.jsx)("span",{
className:`text-[9px] leading-tight font-bold px-1 py-0.5 rounded shadow-sm border text-center whitespace-nowrap ${
"Sun"===e||"Mars"===e?"bg-red-50 text-red-700 border-red-200":"Moon"===e||"Venus"===e?"bg-blue-50 text-blue-700 border-blue-200":"Jupiter"===e?"bg-yellow-50 text-yellow-700 border-yellow-200":"bg-gray-50 text-gray-700 border-gray-200"}
`,children:e.substring(0,2)}
,e))}
)}
)]}
,e.sign)}
),(0,a.jsx)("text",{
x:200,y:206,textAnchor:"middle",className:"fill-primary-red/10 font-serif text-3xl font-bold uppercase tracking-widest pointer-events-none",children:e.name}
)]}
)}
)}
return(0,a.jsx)("div",{
className:"w-full aspect-square max-w-[500px] mx-auto bg-white rounded-xl shadow-inner border border-gray-100 p-2",children:(0,a.jsxs)("svg",{
viewBox:"0 0 400 400",className:"w-full h-full drop-shadow-sm",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("rect",{
width:400,height:400,fill:"#FFFDF8",rx:"8"}
),Array.from({
length:5}
).map((e,t)=>(0,a.jsxs)(r.default.Fragment,{
children:[(0,a.jsx)("line",{
x1:100*t,y1:0,x2:100*t,y2:400,stroke:"#FDB813",strokeWidth:"2",opacity:"0.5"}
),(0,a.jsx)("line",{
x1:0,y1:100*t,x2:400,y2:100*t,stroke:"#FDB813",strokeWidth:"2",opacity:"0.5"}
)]}
,t)),(0,a.jsx)("rect",{
width:400,height:400,fill:"none",stroke:"#C1121F",strokeWidth:"4",rx:"8"}
),(0,a.jsx)("text",{
x:200,y:190,textAnchor:"middle",className:"fill-primary-red font-serif text-2xl font-bold uppercase tracking-widest",children:e.name}
),(0,a.jsx)("text",{
x:200,y:230,textAnchor:"middle",className:"fill-primary-saffron font-sans text-[10px] font-bold tracking-widest uppercase",children:"South Indian Style"}
),e.houses.map(r=>{
let t=s[r.sign];
if(!t)return null;
let l=100*t.c,i=100*t.r,n=r.sign===e.ascendant;
return(0,a.jsxs)("g",{
transform:`translate(${
l}
, ${
i}
)`,children:[n&&(0,a.jsx)("rect",{
x:"0",y:"0",width:100,height:100,className:"fill-orange-50/50"}
),n&&(0,a.jsx)("path",{
d:"M 0 0 L 100 100",stroke:"#FF6B35",strokeWidth:"1.5",opacity:"0.3"}
),(0,a.jsx)("text",{
x:5,y:15,className:"fill-gray-400 text-[10px] font-bold uppercase",children:r.sign.substring(0,3)}
),n&&(0,a.jsx)("rect",{
x:65,y:5,width:30,height:15,rx:"4",className:"fill-primary-saffron"}
),n&&(0,a.jsx)("text",{
x:80,y:16,textAnchor:"middle",className:"fill-white text-[9px] font-bold tracking-wider",children:"ASC"}
),(0,a.jsx)("foreignObject",{
x:"5",y:"25",width:90,height:70,children:(0,a.jsx)("div",{
className:"flex flex-wrap gap-1 items-start justify-start p-1",children:r.planets.map(e=>(0,a.jsx)("span",{
className:`text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border ${
"Sun"===e||"Mars"===e?"bg-red-50 text-red-700 border-red-200":"Moon"===e||"Venus"===e?"bg-blue-50 text-blue-700 border-blue-200":"Jupiter"===e?"bg-yellow-50 text-yellow-700 border-yellow-200":"bg-gray-50 text-gray-700 border-gray-200"}
`,children:e.substring(0,2)}
,e))}
)}
)]}
,r.sign)}
)]}
)}
)}
;
var o=e.i(56420);
let d=(0,o.default)("history",[["path",{
d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}
],["path",{
d:"M3 3v5h5",key:"1xhq8a"}
],["path",{
d:"M12 7v5l4 2",key:"1fdv2h"}
]]),c=(0,o.default)("download",[["path",{
d:"M12 15V3",key:"m9g1x1"}
],["path",{
d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}
],["path",{
d:"m7 10 5 5 5-5",key:"brsn70"}
]]);
var x=e.i(35965);
e.s(["default",0,function(){
let[e,o]=(0,r.useState)(null),[m,p]=(0,r.useState)(null),[h,u]=(0,r.useState)(!1),[g,y]=(0,r.useState)(!0);
return(0,a.jsxs)("div",{
className:"pt-32 pb-20 min-h-screen px-4 md:px-8 bg-white relative",children:[(0,a.jsx)("script",{
type:"application/ld+json",dangerouslySetInnerHTML:{
__html:JSON.stringify({
"@context":"https://schema.org","@type":"SoftwareApplication",name:"Free Vedic Kundli Generator",applicationCategory:"LifestyleApplication",operatingSystem:"All",offers:{
"@type":"Offer",price:"0",priceCurrency:"USD"}
,description:"Generate your free detailed Vedic birth chart (Kundli) with D1, D9, and D10 charts, planetary positions, and comprehensive astrological profile."}
)}
}
),(0,a.jsx)("div",{
className:"absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none"}
),(0,a.jsxs)("div",{
className:"max-w-7xl mx-auto relative z-10",children:[(0,a.jsxs)("div",{
className:"text-center mb-16",children:[(0,a.jsxs)(t.motion.div,{
initial:{
opacity:0,scale:.9}
,animate:{
opacity:1,scale:1}
,className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-saffron/20 shadow-sm text-primary-red text-xs uppercase tracking-widest font-bold mb-6",children:[(0,a.jsx)(x.Sun,{
size:14,className:"text-primary-gold"}
),(0,a.jsx)("span",{
children:"100% Free & Accurate"}
)]}
),(0,a.jsxs)("h1",{
className:"text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900",children:["Shri Govind ",(0,a.jsx)("span",{
className:"saffron-gradient",children:"Free Kundli"}
)]}
),(0,a.jsx)("p",{
className:"text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium",children:"Enter your birth details below to generate your detailed Vedic birth chart according to ancient astrological principles."}
),(0,a.jsx)("p",{
className:"text-primary-saffron mt-2 font-bold text-sm tracking-wider",children:"உங்கள் ஜாதகத்தை இலவசமாகப் பெறுங்கள்"}
)]}
),(0,a.jsx)(s.AnimatePresence,{
mode:"wait",children:g?(0,a.jsx)(t.motion.div,{
initial:{
opacity:0,height:0}
,animate:{
opacity:1,height:"auto"}
,exit:{
opacity:0,height:0,overflow:"hidden"}
,className:"max-w-3xl mx-auto mb-20",children:(0,a.jsx)(l.default,{
onGenerate:e=>{
u(!0),p(e),setTimeout(()=>{
try{
let a=(0,i.calculateBirthChart)(e.date,e.time,e.lat,e.lon,"+05:30");
o(a),y(!1)}
catch(e){
console.error("Calculation error:",e),alert("Failed to calculate chart. Please check inputs.")}
finally{
u(!1),setTimeout(()=>{
document.getElementById("kundli-results")?.scrollIntoView({
behavior:"smooth",block:"start"}
)}
,100)}
}
,1500)}
,loading:h}
)}
,"form"):(0,a.jsx)(t.motion.div,{
initial:{
opacity:0}
,animate:{
opacity:1}
,className:"max-w-3xl mx-auto mb-12 text-center",children:(0,a.jsxs)("button",{
onClick:()=>y(!0),className:"px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm flex items-center gap-2 mx-auto",children:[(0,a.jsx)(d,{
className:"w-4 h-4"}
)," Edit Birth Details"]}
)}
,"edit-button")}
),(0,a.jsx)(s.AnimatePresence,{
children:e&&m&&(0,a.jsxs)(t.motion.div,{
initial:{
opacity:0,y:50}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:50}
,className:"mt-20 pt-20 border-t border-gray-200",id:"kundli-results",children:[(0,a.jsxs)("div",{
className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm",children:[(0,a.jsxs)("div",{
children:[(0,a.jsxs)("h2",{
className:"text-3xl font-serif font-bold text-primary-red",children:[m.name,"'s Birth Chart"]}
),(0,a.jsxs)("div",{
className:"flex flex-wrap gap-4 mt-2 text-sm text-gray-600 font-medium",children:[(0,a.jsxs)("span",{
className:"flex items-center gap-1",children:[(0,a.jsx)("span",{
className:"text-primary-saffron",children:"📅"}
)," ",m.date]}
),(0,a.jsxs)("span",{
className:"flex items-center gap-1",children:[(0,a.jsx)("span",{
className:"text-primary-saffron",children:"⏰"}
)," ",m.time]}
),(0,a.jsxs)("span",{
className:"flex items-center gap-1",children:[(0,a.jsx)("span",{
className:"text-primary-saffron",children:"📍"}
)," ",m.place]}
)]}
)]}
),(0,a.jsx)("div",{
className:"flex gap-4 w-full md:w-auto",children:(0,a.jsxs)("button",{
className:"flex-1 md:flex-none justify-center flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron shadow-sm transition-all",children:[(0,a.jsx)(c,{
size:18}
),"Download"]}
)}
)]}
),(0,a.jsxs)("div",{
className:"grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20",children:[(0,a.jsxs)("div",{
className:"space-y-8",children:[(0,a.jsxs)("div",{
className:"bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100",children:[(0,a.jsxs)("h3",{
className:"text-xl font-serif font-bold text-primary-red mb-6 text-center uppercase tracking-widest border-b border-gray-100 pb-4",children:["Lagna Chart (D1) ",(0,a.jsx)("span",{
className:"block text-xs font-sans normal-case text-gray-500 mt-1",children:"Life Path & Core"}
)]}
),(0,a.jsx)(n,{
chart:e.divisionalCharts.D1}
)]}
),(0,a.jsxs)("div",{
className:"bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100",children:[(0,a.jsxs)("h3",{
className:"text-xl font-serif font-bold text-primary-red mb-6 text-center uppercase tracking-widest border-b border-gray-100 pb-4",children:["Navamsa Chart (D9) ",(0,a.jsx)("span",{
className:"block text-xs font-sans normal-case text-gray-500 mt-1",children:"Marriage & Dharma"}
)]}
),(0,a.jsx)(n,{
chart:e.divisionalCharts.D9}
)]}
),(0,a.jsxs)("div",{
className:"bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100",children:[(0,a.jsxs)("h3",{
className:"text-xl font-serif font-bold text-primary-red mb-6 text-center uppercase tracking-widest border-b border-gray-100 pb-4",children:["Dashamsha Chart (D10) ",(0,a.jsx)("span",{
className:"block text-xs font-sans normal-case text-gray-500 mt-1",children:"Career & Status"}
)]}
),(0,a.jsx)(n,{
chart:e.divisionalCharts.D10}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-8",children:[(0,a.jsxs)("div",{
className:"bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100",children:[(0,a.jsxs)("h3",{
className:"text-xl font-serif font-bold text-primary-red mb-6 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-4",children:[(0,a.jsx)(d,{
className:"w-5 h-5"}
),"Planetary Positions"]}
),(0,a.jsx)("div",{
className:"overflow-x-auto",children:(0,a.jsxs)("table",{
className:"w-full text-left text-sm",children:[(0,a.jsx)("thead",{
children:(0,a.jsxs)("tr",{
className:"text-gray-500 font-bold bg-gray-50 uppercase tracking-wider text-xs",children:[(0,a.jsx)("th",{
className:"p-3 rounded-l-lg",children:"Planet"}
),(0,a.jsx)("th",{
className:"p-3",children:"Rashi"}
),(0,a.jsx)("th",{
className:"p-3",children:"Degree"}
),(0,a.jsx)("th",{
className:"p-3 rounded-r-lg",children:"Nakshatra"}
)]}
)}
),(0,a.jsx)("tbody",{
className:"divide-y divide-gray-100",children:e.planetaryDetails.map(e=>(0,a.jsxs)("tr",{
className:"hover:bg-orange-50/50 transition-colors font-medium text-gray-700",children:[(0,a.jsx)("td",{
className:"py-4 px-3 font-bold text-primary-red",children:e.name}
),(0,a.jsx)("td",{
className:"py-4 px-3",children:e.rashi}
),(0,a.jsx)("td",{
className:"py-4 px-3 text-gray-500 font-mono",children:e.formatted}
),(0,a.jsx)("td",{
className:"py-4 px-3",children:e.nakshatra}
)]}
,e.name))}
)]}
)}
)]}
),(0,a.jsxs)("div",{
className:"bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100",children:[(0,a.jsx)("h3",{
className:"text-xl font-serif font-bold text-primary-red mb-6 uppercase tracking-widest border-b border-gray-100 pb-4",children:"Basic Details"}
),(0,a.jsxs)("div",{
className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{
className:"p-5 rounded-2xl bg-orange-50/50 border border-orange-100",children:[(0,a.jsx)("span",{
className:"text-xs text-primary-saffron font-bold uppercase tracking-widest block mb-1",children:"Ascendant (Lagna)"}
),(0,a.jsx)("span",{
className:"text-lg font-bold text-gray-900",children:e.ascendant}
)]}
),(0,a.jsxs)("div",{
className:"p-5 rounded-2xl bg-orange-50/50 border border-orange-100",children:[(0,a.jsx)("span",{
className:"text-xs text-primary-saffron font-bold uppercase tracking-widest block mb-1",children:"Sun Sign (Surya)"}
),(0,a.jsx)("span",{
className:"text-lg font-bold text-gray-900",children:e.planetaryDetails.find(e=>"Sun"===e.name)?.rashi||"Unknown"}
)]}
),(0,a.jsxs)("div",{
className:"p-5 rounded-2xl bg-orange-50/50 border border-orange-100",children:[(0,a.jsx)("span",{
className:"text-xs text-primary-saffron font-bold uppercase tracking-widest block mb-1",children:"Moon Sign (Rasi)"}
),(0,a.jsx)("span",{
className:"text-lg font-bold text-gray-900",children:e.moonSign}
)]}
),(0,a.jsxs)("div",{
className:"p-5 rounded-2xl bg-orange-50/50 border border-orange-100",children:[(0,a.jsx)("span",{
className:"text-xs text-primary-saffron font-bold uppercase tracking-widest block mb-1",children:"Birth Star"}
),(0,a.jsx)("span",{
className:"text-lg font-bold text-gray-900",children:e.nakshatra}
)]}
)]}
)]}
),(0,a.jsxs)("div",{
className:"bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100",children:[(0,a.jsx)("h3",{
className:"text-xl font-serif font-bold text-primary-red mb-6 uppercase tracking-widest border-b border-gray-100 pb-4",children:"Your Astrological Profile"}
),(0,a.jsxs)("div",{
className:"space-y-6",children:[(0,a.jsxs)("div",{
children:[(0,a.jsxs)("h4",{
className:"text-sm font-bold text-primary-saffron uppercase tracking-widest mb-2 flex items-center gap-2",children:[(0,a.jsx)("span",{
className:"w-2 h-2 rounded-full bg-primary-saffron"}
)," Ascendant (",e.ascendant,")"]}
),(0,a.jsxs)("p",{
className:"text-gray-700 font-medium leading-relaxed",children:["Your Ascendant represents your physical body, outward behavior, and how others perceive you. A ",e.ascendant," Ascendant makes you appear ",["Aries","Leo","Sagittarius"].includes(e.ascendant)?"dynamic, energetic, and highly driven.":["Taurus","Virgo","Capricorn"].includes(e.ascendant)?"grounded, practical, and highly reliable.":["Gemini","Libra","Aquarius"].includes(e.ascendant)?"intellectual, communicative, and highly social.":"empathetic, intuitive, and highly sensitive."]}
)]}
),(0,a.jsxs)("div",{
className:"pt-4 border-t border-gray-50",children:[(0,a.jsxs)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-widest mb-2 flex items-center gap-2",children:[(0,a.jsx)("span",{
className:"w-2 h-2 rounded-full bg-primary-red"}
)," Moon Sign (",e.moonSign,")"]}
),(0,a.jsxs)("p",{
className:"text-gray-700 font-medium leading-relaxed",children:["Your Moon Sign reveals your inner mind, emotional responses, and soul level desires. With the Moon in ",e.moonSign,", emotionally you are ",["Aries","Leo","Sagittarius"].includes(e.moonSign)?"passionate and need to express your feelings through action.":["Taurus","Virgo","Capricorn"].includes(e.moonSign)?"seeking stability and material comfort for peace of mind.":["Gemini","Libra","Aquarius"].includes(e.moonSign)?"stimulated by conversation and need mental connection.":"deeply compassionate, absorbing the feelings of those around you."]}
)]}
),(0,a.jsxs)("div",{
className:"pt-4 border-t border-gray-50",children:[(0,a.jsxs)("h4",{
className:"text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2",children:[(0,a.jsx)("span",{
className:"w-2 h-2 rounded-full bg-gray-900"}
)," Nakshatra (",e.nakshatra,")"]}
),(0,a.jsxs)("p",{
className:"text-gray-700 font-medium leading-relaxed",children:["Born under ",e.nakshatra,", your mind is highly influenced by its ruling deity and planet. This placement shapes your specific life patterns, career inclinations, and compatibility with others. It suggests a profound inner depth that governs your natural instincts."]}
)]}
)]}
)]}
)]}
)]}
)]}
)}
)]}
)]}
)}
],27937)}
]);
