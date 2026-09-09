(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68109,e=>{
"use strict";
let a=(0,e.i(56420).default)("heart",[["path",{
d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}
]]);
e.s(["Heart",0,a],68109)}
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
var a=e.i(43476),t=e.i(71645),r=e.i(1279),s=e.i(49882),i=e.i(56420);
let n=(0,i.default)("clock",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["path",{
d:"M12 6v6l4 2",key:"mmk7yg"}
]]);
e.s(["Clock",0,n],74544);
var l=e.i(20865),o=e.i(28623);
let d=(0,i.default)("users",[["path",{
d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}
],["path",{
d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}
],["path",{
d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}
],["circle",{
cx:"9",cy:"7",r:"4",key:"nufk8"}
]]);
var c=e.i(46932),h=e.i(88653);
e.s(["default",0,({
onGenerate:e,loading:i,defaultGender:m="Male"}
)=>{
let[u,x]=(0,t.useState)({
name:"",date:"",time:"",lat:13.0827,lon:80.2707,place:"",gender:m}
),[p,y]=(0,t.useState)(""),[g,f]=(0,t.useState)([]),[b,v]=(0,t.useState)(!1),[j,N]=(0,t.useState)(!1),w=t.default.useRef(null);
return t.default.useEffect(()=>{
if(!j||p.length<3)return void f([]);
let e=setTimeout(async()=>{
try{
let e=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${
encodeURIComponent(p)}
&limit=5`),a=await e.json();
f(a),v(!0)}
catch(e){
console.error("Geocoding error:",e)}
}
,500);
return()=>clearTimeout(e)}
,[p,j]),t.default.useEffect(()=>{
function e(e){
w.current&&!w.current.contains(e.target)&&v(!1)}
return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)}
,[]),(0,a.jsxs)(c.motion.form,{
initial:{
opacity:0,scale:.95}
,animate:{
opacity:1,scale:1}
,onSubmit:a=>{
(a.preventDefault(),u.name&&u.date&&u.time)?e(u):alert("Please fill in all birth details.")}
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
type:"text",placeholder:"e.g. Arjun Kumar",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal",value:u.name,onChange:e=>x({
...u,name:e.target.value}
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
className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium appearance-none",value:u.gender,onChange:e=>x({
...u,gender:e.target.value}
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
type:"date",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:u.date,onChange:e=>x({
...u,date:e.target.value}
),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Time of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(n,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"time",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:u.time,onChange:e=>x({
...u,time:e.target.value}
),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2 relative md:col-span-2",ref:w,children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Place of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(l.MapPin,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"text",placeholder:"e.g. Lucknow",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal",value:p,onChange:e=>{
y(e.target.value),N(!0)}
,onFocus:()=>{
g.length>0&&v(!0)}
,required:!0}
),(0,a.jsx)(h.AnimatePresence,{
children:b&&g.length>0&&(0,a.jsx)(c.motion.div,{
initial:{
opacity:0,y:10}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:10}
,className:"absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden",children:g.map((e,t)=>(0,a.jsxs)("div",{
className:"px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors",onClick:()=>{
x({
...u,place:e.display_name,lat:parseFloat(e.lat),lon:parseFloat(e.lon)}
),y(e.name||e.display_name.split(",")[0]),N(!1),v(!1)}
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
type:"submit",disabled:i,className:"w-full mt-10 py-5 saffron-button rounded-2xl font-bold text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg",children:i?(0,a.jsxs)(a.Fragment,{
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
,34073,e=>{
"use strict";
var a=e.i(43476),t=e.i(71645),r=e.i(46932),s=e.i(88653),i=e.i(68109),n=e.i(28623),l=e.i(30863),o=e.i(83158);
let d=["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"],c=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],h={
Cancer:1,Scorpio:1,Pisces:1,Aries:2,Leo:2,Sagittarius:2,Taurus:3,Virgo:3,Capricorn:3,Gemini:4,Libra:4,Aquarius:4}
,m={
Aries:1,Taurus:1,Gemini:2,Virgo:2,Libra:2,Aquarius:2,Cancer:3,Pisces:3,Capricorn:3,Leo:4,Scorpio:5,Sagittarius:1}
,u={
Ashwini:1,Shatabhisha:1,Bharani:2,Revati:2,Krittika:3,Pushya:3,Rohini:4,Mrigashira:4,Ardra:5,Mula:5,Punarvasu:6,Ashlesha:6,Magha:7,"Purva Phalguni":7,"Uttara Phalguni":8,"Uttara Bhadrapada":8,Hasta:9,Swati:9,Chitra:10,Vishakha:10,Anuradha:11,Jyeshtha:11,"Purva Ashadha":12,Shravana:12,Dhanishta:13,"Purva Bhadrapada":13,"Uttara Ashadha":14}
,x=[[],[0,4,2,2,3,2,2,2,1,0,1,3,3,2,2],[0,2,4,3,3,2,2,2,2,3,1,2,3,0,2],[0,2,3,4,2,1,2,1,3,3,1,2,0,3,1],[0,3,3,2,4,2,1,1,1,1,2,2,2,2,0],[0,2,2,1,2,4,2,1,2,2,2,1,3,1,2],[0,2,2,2,1,2,4,0,2,2,2,2,3,1,2],[0,2,2,1,1,1,0,4,2,2,2,2,2,1,2],[0,1,2,3,1,2,2,2,4,3,0,3,2,2,2],[0,0,3,3,1,2,2,2,3,4,1,2,2,2,2],[0,1,1,1,2,2,2,2,0,1,4,1,1,1,2],[0,3,2,2,2,1,2,2,3,2,1,4,2,1,2],[0,3,3,0,2,3,3,2,2,2,1,2,4,2,2],[0,2,0,3,2,1,1,1,2,2,1,1,2,4,2],[0,2,2,1,0,2,2,2,2,2,2,2,2,2,4]],p={
Aries:"Mars",Scorpio:"Mars",Taurus:"Venus",Libra:"Venus",Gemini:"Mercury",Virgo:"Mercury",Cancer:"Moon",Leo:"Sun",Sagittarius:"Jupiter",Pisces:"Jupiter",Capricorn:"Saturn",Aquarius:"Saturn"}
,y={
Sun:{
Sun:5,Moon:5,Mars:5,Mercury:4,Jupiter:5,Venus:0,Saturn:0}
,Moon:{
Sun:5,Moon:5,Mars:4,Mercury:5,Jupiter:4,Venus:1,Saturn:1}
,Mars:{
Sun:5,Moon:4,Mars:5,Mercury:0,Jupiter:5,Venus:3,Saturn:1}
,Mercury:{
Sun:4,Moon:5,Mars:0,Mercury:5,Jupiter:1,Venus:5,Saturn:4}
,Jupiter:{
Sun:5,Moon:4,Mars:5,Mercury:1,Jupiter:5,Venus:1,Saturn:3}
,Venus:{
Sun:0,Moon:1,Mars:3,Mercury:5,Jupiter:1,Venus:5,Saturn:5}
,Saturn:{
Sun:0,Moon:1,Mars:1,Mercury:4,Jupiter:3,Venus:5,Saturn:5}
}
,g={
Ashwini:1,Mrigashira:1,Punarvasu:1,Pushya:1,Hasta:1,Swati:1,Anuradha:1,Shravana:1,Revati:1,Bharani:2,Rohini:2,Ardra:2,"Purva Phalguni":2,"Uttara Phalguni":2,"Purva Ashadha":2,"Uttara Ashadha":2,"Purva Bhadrapada":2,"Uttara Bhadrapada":2,Krittika:3,Ashlesha:3,Magha:3,Chitra:3,Vishakha:3,Jyeshtha:3,Mula:3,Dhanishta:3,Shatabhisha:3}
,f={
Ashwini:1,Ardra:1,Punarvasu:1,"Uttara Phalguni":1,Hasta:1,Jyeshtha:1,Mula:1,Shatabhisha:1,"Purva Bhadrapada":1,Bharani:2,Mrigashira:2,Pushya:2,"Purva Phalguni":2,Chitra:2,Anuradha:2,"Purva Ashadha":2,Dhanishta:2,"Uttara Bhadrapada":2,Krittika:3,Rohini:3,Ashlesha:3,Magha:3,Swati:3,Vishakha:3,"Uttara Ashadha":3,Shravana:3,Revati:3}
;
e.s(["default",0,function(){
let[e,b]=(0,t.useState)(1),[v,j]=(0,t.useState)(null),[N,w]=(0,t.useState)(null),[k,M]=(0,t.useState)(null),[S,A]=(0,t.useState)(!1),[C,P]=(0,t.useState)(!0);
return(0,a.jsxs)("div",{
className:"pt-32 pb-20 min-h-screen px-4 md:px-8 bg-white relative",children:[(0,a.jsx)("script",{
type:"application/ld+json",dangerouslySetInnerHTML:{
__html:JSON.stringify({
"@context":"https://schema.org","@type":"SoftwareApplication",name:"Guna Milan (Kundli Matchmaking) Calculator",applicationCategory:"LifestyleApplication",operatingSystem:"All",offers:{
"@type":"Offer",price:"0",priceCurrency:"USD"}
,description:"Calculate marriage compatibility using the traditional 36-point Vedic Ashtakoota system based on birth details."}
)}
}
),(0,a.jsx)("div",{
className:"absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none"}
),(0,a.jsxs)("div",{
className:"max-w-7xl mx-auto relative z-10",children:[(0,a.jsxs)("div",{
className:"text-center mb-16",children:[(0,a.jsxs)(r.motion.div,{
initial:{
opacity:0,scale:.9}
,animate:{
opacity:1,scale:1}
,className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-saffron/20 shadow-sm text-primary-red text-xs uppercase tracking-widest font-bold mb-6",children:[(0,a.jsx)(i.Heart,{
size:14,className:"text-primary-red"}
),(0,a.jsx)("span",{
children:"Ashtakoota Matchmaking"}
)]}
),(0,a.jsxs)("h1",{
className:"text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900",children:["Guna Milan ",(0,a.jsx)("span",{
className:"saffron-gradient",children:"Calculator"}
)]}
),(0,a.jsx)("p",{
className:"text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium",children:"Check marriage compatibility using the traditional 36-point Vedic system. Discover your Ashtakoota score instantly."}
)]}
),(0,a.jsx)(s.AnimatePresence,{
mode:"wait",children:C?(0,a.jsxs)(r.motion.div,{
initial:{
opacity:0,height:0}
,animate:{
opacity:1,height:"auto"}
,exit:{
opacity:0,height:0,overflow:"hidden"}
,className:"max-w-3xl mx-auto mb-20 space-y-12",children:[(0,a.jsxs)("div",{
className:2===e?"opacity-50 pointer-events-none":"",children:[(0,a.jsxs)("h2",{
className:"text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3",children:[(0,a.jsx)("span",{
className:"w-8 h-8 rounded-full bg-primary-saffron text-white flex items-center justify-center text-sm",children:"1"}
),"Enter Boy's Details"]}
),(0,a.jsx)(l.default,{
onGenerate:e=>{
j(e),b(2),setTimeout(()=>{
document.getElementById("girl-form")?.scrollIntoView({
behavior:"smooth",block:"center"}
)}
,100)}
,loading:!1}
)]}
),2===e&&(0,a.jsxs)(r.motion.div,{
initial:{
opacity:0,y:20}
,animate:{
opacity:1,y:0}
,id:"girl-form",children:[(0,a.jsxs)("h2",{
className:"text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3",children:[(0,a.jsx)("span",{
className:"w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center text-sm",children:"2"}
),"Enter Girl's Details"]}
),(0,a.jsx)(l.default,{
onGenerate:e=>{
w(e),A(!0),setTimeout(()=>{
var a,t,r,s;
let i,n,l,b,j,N,w,k,S,C,B,V,D,G,L,U,R,T,J,q,F,E,H,O;
if(!v)return;
let K=(0,o.calculateBirthChart)(v.date,v.time,v.lat,v.lon,"+05:30"),W=(0,o.calculateBirthChart)(e.date,e.time,e.lat,e.lon,"+05:30"),z=K.planetaryDetails.find(e=>"Moon"===e.name),I=W.planetaryDetails.find(e=>"Moon"===e.name);
if(!z||!I){
alert("Error calculating chart details."),A(!1);
return}
M((a=z.nakshatra,t=I.nakshatra,r=z.rashi,s=I.rashi,i=h[r],n=h[s],l=i&&n?+(i<=n):1,b=m[r],j=m[s],N=b&&j&&b!==j&&(2!==b||3!==j)?3===b&&2===j?1:+((1!==b||4!==j)&&(4!==b||1!==j)):2,w=function(e,a){
let t=d.indexOf(e),r=d.indexOf(a);
if(-1===t||-1===r)return 3;
let s=(r-t+27)%27+1,i=(t-r+27)%27+1,n=s%9==0?9:s%9,l=i%9==0?9:i%9,o=n%2==0||9===n,c=l%2==0||9===l;
return o&&c?3:o||c?1.5:0}
(a,t),k=u[a],S=u[t],C=k&&S?x[k][S]:4,B=p[r],V=p[s],D=B&&V?y[B][V]:5,G=g[a],L=g[t],U=G&&L&&G!==L&&(1!==G||2!==L)&&(2!==G||1!==L)?1===G&&3===L?1:(3===G&&1===L||2===G&&3===L,0):6,R=c.indexOf(r),T=c.indexOf(s),J=-1===R||-1===T?7:7*!![1,7,3,11,4,10].includes((T-R+12)%12+1),q=f[a],F=f[t],H=l+N+w+C+D+U+J+(E=q&&F?8*(q!==F):8),O="",O=H<18?"Not Recommended. Below average compatibility.":H<24?"Average Match. Can proceed with remedies.":H<30?"Good Match. High compatibility.":"Excellent Match. Very auspicious combination.",0===E?O+=" (Warning: Nadi Dosha Present)":0===J?O+=" (Warning: Bhakoot Dosha Present)":0===U&&(O+=" (Warning: Gana Dosha Present)"),{
boyNakshatra:a,girlNakshatra:t,boyRasi:r,girlRasi:s,totalScore:H,maxScore:36,verdict:O,koots:[{
name:"Varna",max:1,obtained:l,description:"Work & Spiritual Compatibility"}
,{
name:"Vashya",max:2,obtained:N,description:"Dominance & Control"}
,{
name:"Tara",max:3,obtained:w,description:"Destiny & Health"}
,{
name:"Yoni",max:4,obtained:C,description:"Mental & Physical Compatibility"}
,{
name:"Graha Maitri",max:5,obtained:D,description:"Friendship & Psychological Disposition"}
,{
name:"Gana",max:6,obtained:U,description:"Temperament & Behavior"}
,{
name:"Bhakoot",max:7,obtained:J,description:"Love & Emotional Connection"}
,{
name:"Nadi",max:8,obtained:E,description:"Health & Genes"}
]}
)),A(!1),P(!1),setTimeout(()=>{
document.getElementById("matching-results")?.scrollIntoView({
behavior:"smooth",block:"start"}
)}
,100)}
,1500)}
,loading:S,defaultGender:"Female"}
)]}
)]}
,"forms"):(0,a.jsx)(r.motion.div,{
initial:{
opacity:0}
,animate:{
opacity:1}
,className:"max-w-3xl mx-auto mb-12 text-center",children:(0,a.jsxs)("button",{
onClick:()=>P(!0),className:"px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm flex items-center gap-2 mx-auto",children:[(0,a.jsxs)("svg",{
xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{
d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}
),(0,a.jsx)("path",{
d:"M3 3v5h5"}
),(0,a.jsx)("path",{
d:"M12 7v5l4 2"}
)]}
)," Edit Birth Details"]}
)}
,"edit-button")}
),(0,a.jsx)(s.AnimatePresence,{
children:k&&v&&N&&(0,a.jsxs)(r.motion.div,{
initial:{
opacity:0,y:50}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:50}
,className:"mt-20 pt-20 border-t border-gray-200",id:"matching-results",children:[(0,a.jsxs)("div",{
className:"text-center mb-16",children:[(0,a.jsx)("h2",{
className:"text-3xl font-serif font-bold text-gray-900 mb-4",children:"Compatibility Score"}
),(0,a.jsxs)("div",{
className:"inline-block relative",children:[(0,a.jsxs)("svg",{
className:"w-48 h-48 transform -rotate-90",children:[(0,a.jsx)("circle",{
cx:"96",cy:"96",r:"88",stroke:"#f3f4f6",strokeWidth:"12",fill:"none"}
),(0,a.jsx)(r.motion.circle,{
initial:{
strokeDashoffset:553}
,animate:{
strokeDashoffset:553-553*(k.totalScore/36)}
,transition:{
duration:1.5,ease:"easeOut"}
,cx:"96",cy:"96",r:"88",stroke:"url(#gradient)",strokeWidth:"12",fill:"none",strokeDasharray:"553",strokeLinecap:"round"}
),(0,a.jsx)("defs",{
children:(0,a.jsxs)("linearGradient",{
id:"gradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,a.jsx)("stop",{
offset:"0%",stopColor:"#FF6B35"}
),(0,a.jsx)("stop",{
offset:"100%",stopColor:"#C1121F"}
)]}
)}
)]}
),(0,a.jsxs)("div",{
className:"absolute inset-0 flex flex-col items-center justify-center",children:[(0,a.jsx)("span",{
className:"text-5xl font-serif font-bold text-gray-900",children:k.totalScore}
),(0,a.jsx)("span",{
className:"text-sm font-bold text-gray-500 uppercase tracking-widest mt-1",children:"Out of 36"}
)]}
)]}
),(0,a.jsx)("div",{
className:"mt-8 px-6 py-4 bg-orange-50 rounded-2xl inline-block border border-orange-100",children:(0,a.jsx)("h3",{
className:"text-xl font-bold text-primary-red mb-1",children:k.verdict}
)}
)]}
),(0,a.jsxs)("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",children:[(0,a.jsxs)("div",{
className:"bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center",children:[(0,a.jsx)("h3",{
className:"text-sm font-bold text-primary-saffron uppercase tracking-widest mb-4",children:"Boy's Astrological Details"}
),(0,a.jsx)("p",{
className:"text-xl font-serif font-bold text-gray-900 mb-1",children:v.name}
),(0,a.jsxs)("p",{
className:"text-gray-600 font-medium",children:["Rasi: ",(0,a.jsx)("span",{
className:"text-gray-900",children:k.boyRasi}
)]}
),(0,a.jsxs)("p",{
className:"text-gray-600 font-medium",children:["Nakshatra: ",(0,a.jsx)("span",{
className:"text-gray-900",children:k.boyNakshatra}
)]}
)]}
),(0,a.jsxs)("div",{
className:"bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center",children:[(0,a.jsx)("h3",{
className:"text-sm font-bold text-primary-red uppercase tracking-widest mb-4",children:"Girl's Astrological Details"}
),(0,a.jsx)("p",{
className:"text-xl font-serif font-bold text-gray-900 mb-1",children:N.name}
),(0,a.jsxs)("p",{
className:"text-gray-600 font-medium",children:["Rasi: ",(0,a.jsx)("span",{
className:"text-gray-900",children:k.girlRasi}
)]}
),(0,a.jsxs)("p",{
className:"text-gray-600 font-medium",children:["Nakshatra: ",(0,a.jsx)("span",{
className:"text-gray-900",children:k.girlNakshatra}
)]}
)]}
)]}
),(0,a.jsxs)("div",{
className:"bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden",children:[(0,a.jsx)("div",{
className:"p-8 border-b border-gray-100 bg-gray-50",children:(0,a.jsxs)("h3",{
className:"text-xl font-serif font-bold text-gray-900 flex items-center gap-2",children:[(0,a.jsx)(n.Sparkles,{
className:"text-primary-gold w-5 h-5"}
),"Ashtakoota Details (8 Koots)"]}
)}
),(0,a.jsx)("div",{
className:"p-8",children:(0,a.jsx)("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:k.koots.map(e=>(0,a.jsxs)("div",{
className:"flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:border-primary-saffron/30 transition-colors",children:[(0,a.jsxs)("div",{
children:[(0,a.jsx)("p",{
className:"font-bold text-gray-900 text-lg",children:e.name}
),(0,a.jsx)("p",{
className:"text-xs text-gray-500 font-medium uppercase tracking-wider",children:e.description}
)]}
),(0,a.jsxs)("div",{
className:"text-right",children:[(0,a.jsx)("p",{
className:"text-2xl font-serif font-bold text-primary-red",children:e.obtained}
),(0,a.jsxs)("p",{
className:"text-xs text-gray-400 font-bold uppercase tracking-widest",children:["/ ",e.max," pts"]}
)]}
)]}
,e.name))}
)}
)]}
)]}
)}
)]}
)]}
)}
],34073)}
]);
