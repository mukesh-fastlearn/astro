(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68109,e=>{
"use strict";
let a=(0,e.i(56420).default)("heart",[["path",{
d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}
]]);
e.s(["Heart",0,a],68109)}
,86563,e=>{
"use strict";
let a=(0,e.i(56420).default)("star",[["path",{
d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}
]]);
e.s(["Star",0,a],86563)}
,20865,e=>{
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
var a=e.i(43476),t=e.i(71645),r=e.i(1279),l=e.i(49882),s=e.i(56420);
let i=(0,s.default)("clock",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["path",{
d:"M12 6v6l4 2",key:"mmk7yg"}
]]);
e.s(["Clock",0,i],74544);
var o=e.i(20865),n=e.i(28623);
let d=(0,s.default)("users",[["path",{
d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}
],["path",{
d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}
],["path",{
d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}
],["circle",{
cx:"9",cy:"7",r:"4",key:"nufk8"}
]]);
var c=e.i(46932),u=e.i(88653);
e.s(["default",0,({
onGenerate:e,loading:s,defaultGender:p="Male"}
)=>{
let[m,y]=(0,t.useState)({
name:"",date:"",time:"",lat:13.0827,lon:80.2707,place:"",gender:p}
),[h,x]=(0,t.useState)(""),[f,g]=(0,t.useState)([]),[b,v]=(0,t.useState)(!1),[j,w]=(0,t.useState)(!1),k=t.default.useRef(null);
return t.default.useEffect(()=>{
if(!j||h.length<3)return void g([]);
let e=setTimeout(async()=>{
try{
let e=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${
encodeURIComponent(h)}
&limit=5`),a=await e.json();
g(a),v(!0)}
catch(e){
console.error("Geocoding error:",e)}
}
,500);
return()=>clearTimeout(e)}
,[h,j]),t.default.useEffect(()=>{
function e(e){
k.current&&!k.current.contains(e.target)&&v(!1)}
return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)}
,[]),(0,a.jsxs)(c.motion.form,{
initial:{
opacity:0,scale:.95}
,animate:{
opacity:1,scale:1}
,onSubmit:a=>{
(a.preventDefault(),m.name&&m.date&&m.time)?e(m):alert("Please fill in all birth details.")}
,className:"bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden",children:[(0,a.jsx)("div",{
className:"absolute -top-24 -right-24 w-48 h-48 bg-primary-gold/20 blur-[80px] rounded-full"}
),(0,a.jsx)("div",{
className:"absolute -bottom-24 -left-24 w-48 h-48 bg-primary-saffron/20 blur-[80px] rounded-full"}
),(0,a.jsxs)("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10",children:[(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Full Name"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(r.User,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"text",placeholder:"e.g. Arjun Kumar",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal",value:m.name,onChange:e=>y({
...m,name:e.target.value}
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
className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium appearance-none",value:m.gender,onChange:e=>y({
...m,gender:e.target.value}
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
className:"relative",children:[(0,a.jsx)(l.Calendar,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"date",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:m.date,onChange:e=>y({
...m,date:e.target.value}
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
type:"time",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:m.time,onChange:e=>y({
...m,time:e.target.value}
),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2 relative md:col-span-2",ref:k,children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Place of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(o.MapPin,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"text",placeholder:"e.g. Lucknow",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal",value:h,onChange:e=>{
x(e.target.value),w(!0)}
,onFocus:()=>{
f.length>0&&v(!0)}
,required:!0}
),(0,a.jsx)(u.AnimatePresence,{
children:b&&f.length>0&&(0,a.jsx)(c.motion.div,{
initial:{
opacity:0,y:10}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:10}
,className:"absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden",children:f.map((e,t)=>(0,a.jsxs)("div",{
className:"px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors",onClick:()=>{
y({
...m,place:e.display_name,lat:parseFloat(e.lat),lon:parseFloat(e.lon)}
),x(e.name||e.display_name.split(",")[0]),w(!1),v(!1)}
,children:[(0,a.jsx)("p",{
className:"text-sm font-bold text-gray-900",children:e.name||e.display_name.split(",")[0]}
),(0,a.jsx)("p",{
className:"text-xs text-gray-500 truncate",children:e.display_name}
)]}
,t))}
)}
)]}
)]}
)]}
),(0,a.jsx)("button",{
type:"submit",disabled:s,className:"w-full mt-10 py-5 saffron-button rounded-2xl font-bold text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg",children:s?(0,a.jsxs)(a.Fragment,{
children:[(0,a.jsx)("div",{
className:"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"}
),"Generating Celestial Chart..."]}
):(0,a.jsxs)(a.Fragment,{
children:[(0,a.jsx)(n.Sparkles,{
className:"w-5 h-5 group-hover:rotate-12 transition-transform"}
),"Generate My Kundli"]}
)}
),(0,a.jsx)("p",{
className:"text-center mt-6 text-xs text-gray-500 font-bold tracking-widest uppercase",children:"Ancient Vedic Algorithms • 100% Secure"}
)]}
)}
],30863)}
,82954,e=>{
"use strict";
let a=(0,e.i(56420).default)("shield",[["path",{
d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}
]]);
e.s(["Shield",0,a],82954)}
]);
