(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28623,e=>{
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
,86563,e=>{
"use strict";
let a=(0,e.i(56420).default)("star",[["path",{
d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}
]]);
e.s(["Star",0,a],86563)}
,84026,e=>{
"use strict";
let a=(0,e.i(56420).default)("shield-check",[["path",{
d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}
],["path",{
d:"m9 12 2 2 4-4",key:"dzmm74"}
]]);
e.s(["ShieldCheck",0,a],84026)}
,72353,e=>{
"use strict";
var a=e.i(43476),t=e.i(71645),r=e.i(46932),s=e.i(88653);
let i={
A:1,I:1,J:1,Q:1,Y:1,B:2,K:2,R:2,C:3,G:3,L:3,S:3,D:4,M:4,T:4,E:5,H:5,N:5,X:5,U:6,V:6,W:6,O:7,Z:7,F:8,P:8}
,n=["A","E","I","O","U"];
function l(e){
let a,t=e;
for(;
t>9;
)(11===t||22===t||33===t)&&(a=t),t=t.toString().split("").reduce((e,a)=>e+parseInt(a),0);
return{
singleDigit:t,masterNumber:a}
}
function o(e,a){
let t=e.toUpperCase().replace(/[^A-Z]/g,""),r=0;
for(let e of t){
let t=n.includes(e)||"Y"===e&&"vowels"===a;
("all"===a||"vowels"===a&&t||"consonants"===a&&!t)&&(r+=i[e]||0)}
return l(r)}
let d={
1:{
planet:"Sun (Surya)",desc:"You are a natural-born leader, independent, highly creative, and pioneering. Governed by the Sun, you radiate confidence and are driven to initiate and build. You possess strong willpower and dislike being dominated. Your path is one of innovation and self-reliance.",colors:"Yellow, Gold, Orange, Copper",days:"Sunday, Monday"}
,2:{
planet:"Moon (Chandra)",desc:"You are the peacemaker—sensitive, intuitive, romantic, and highly diplomatic. Ruled by the Moon, your emotional depth is your greatest strength. You thrive in partnerships and possess an innate ability to heal and nurture others. You excel in supportive roles rather than taking the spotlight.",colors:"White, Light Green, Pearl",days:"Monday, Friday"}
,3:{
planet:"Jupiter (Guru)",desc:"You are a natural communicator, expressive, social, and joyful. Governed by Jupiter, the planet of wisdom and expansion, you possess an optimistic and philosophical outlook on life. You are highly creative, inspiring, and often find success through artistic expression or teaching.",colors:"Yellow, Purple, Pink, Mauve",days:"Thursday, Tuesday"}
,4:{
planet:"Rahu (North Node)",desc:"You are the builder—practical, disciplined, and hard-working. Ruled by Rahu, you possess a rebellious yet highly structured approach to life. You excel at creating solid foundations and organizing systems. Though you may face sudden changes, your resilience ensures ultimate success.",colors:"Blue, Khaki, Gray",days:"Saturday, Sunday, Monday"}
,5:{
planet:"Mercury (Budh)",desc:"You are the adventurer—freedom-loving, adaptable, and dynamic. Governed by Mercury, the planet of intellect and communication, your mind is quick and versatile. You crave new experiences, travel, and constant mental stimulation. Routine is your enemy.",colors:"Light Green, White, Gray",days:"Wednesday, Friday"}
,6:{
planet:"Venus (Shukra)",desc:"You are the nurturer—responsible, loving, protective, and drawn to beauty. Ruled by Venus, you have a deep appreciation for luxury, art, and harmony. You are naturally magnetic and often find yourself the focal point of your family and community.",colors:"Light Blue, Pink, White",days:"Friday, Tuesday"}
,7:{
planet:"Ketu (South Node)",desc:"You are the seeker—analytical, spiritual, deep, and deeply intuitive. Governed by Ketu, you are constantly searching for underlying truths and hidden meanings. You require solitude to recharge and possess a highly developed inner wisdom that guides you through life.",colors:"Light Green, Light Yellow, White",days:"Sunday, Monday, Wednesday"}
,8:{
planet:"Saturn (Shani)",desc:"You are the powerhouse—ambitious, goal-oriented, authoritative, and deeply karmic. Ruled by Saturn, the taskmaster, your life is shaped by hard work, discipline, and material success. You have excellent executive abilities and are capable of managing large-scale endeavors.",colors:"Black, Dark Blue, Purple",days:"Saturday, Friday"}
,9:{
planet:"Mars (Mangal)",desc:"You are the humanitarian—compassionate, energetic, courageous, and dramatic. Governed by Mars, the warrior, you fight for ideals and justice. You possess immense vitality and are driven by a desire to heal the world. You are deeply passionate and protective of your loved ones.",colors:"Red, Pink, Coral",days:"Tuesday, Thursday, Friday"}
}
,c={
1:"Driven by independence, you desire to lead and carve your own unique path in life.",2:"Deeply sensitive, you seek harmony, deep emotional connections, and partnerships.",3:"Expressive and joyful, your inner soul yearns to create, communicate, and inspire.",4:"Practical and grounded, you desire stability, order, and a secure foundation.",5:"A restless spirit, you crave freedom, travel, adventure, and constant change.",6:"Nurturing and responsible, you seek to protect, care for, and bring harmony to others.",7:"A deep thinker, you yearn to uncover life's mysteries and seek spiritual truths.",8:"Ambitious and capable, you are driven by a desire for material success and authority.",9:"Idealistic and compassionate, you deeply wish to serve humanity and heal the world."}
;
var u=e.i(28623),m=e.i(1279),p=e.i(49882),h=e.i(86563);
let y=(0,e.i(56420).default)("info",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["path",{
d:"M12 16v-4",key:"1dtifu"}
],["path",{
d:"M12 8h.01",key:"e9boi3"}
]]);
var g=e.i(84026);
e.s(["default",0,function(){
let[e,i]=(0,t.useState)(""),[n,x]=(0,t.useState)(""),[f,b]=(0,t.useState)(null),[v,N]=(0,t.useState)(!1),[j,k]=(0,t.useState)(!0),w=(e,t,r,s)=>(0,a.jsxs)("div",{
className:`bg-white p-8 rounded-[2rem] shadow-lg border ${
s}
 relative overflow-hidden group hover:shadow-xl transition-shadow`,children:[(0,a.jsx)("div",{
className:`absolute top-0 right-0 w-32 h-32 ${
r}
 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500`}
),(0,a.jsxs)("div",{
className:"flex items-start justify-between mb-6",children:[(0,a.jsxs)("div",{
children:[(0,a.jsx)("h3",{
className:`text-sm font-bold ${
t}
 uppercase tracking-widest mb-1`,children:e.sanskritName}
),(0,a.jsx)("p",{
className:"text-gray-500 font-medium text-xs uppercase tracking-wider",children:e.englishName}
)]}
),(0,a.jsx)("div",{
className:`w-16 h-16 rounded-2xl ${
r}
 flex items-center justify-center text-3xl font-serif font-bold ${
t}
 shadow-sm`,children:e.number}
)]}
),(0,a.jsxs)("div",{
className:"space-y-4",children:[(0,a.jsxs)("div",{
children:[(0,a.jsx)("p",{
className:"text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",children:"Ruling Planet"}
),(0,a.jsx)("p",{
className:"font-serif font-bold text-lg text-gray-900",children:e.rulingPlanet}
)]}
),(0,a.jsx)("p",{
className:"text-gray-600 leading-relaxed text-sm",children:e.description}
),(0,a.jsxs)("div",{
className:"pt-4 border-t border-gray-100 grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{
children:[(0,a.jsx)("p",{
className:"text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",children:"Lucky Colors"}
),(0,a.jsx)("p",{
className:"text-sm font-medium text-gray-900",children:e.luckyColors}
)]}
),(0,a.jsxs)("div",{
children:[(0,a.jsx)("p",{
className:"text-xs font-bold text-gray-400 uppercase tracking-widest mb-1",children:"Lucky Days"}
),(0,a.jsx)("p",{
className:"text-sm font-medium text-gray-900",children:e.luckyDays}
)]}
)]}
),e.hasMasterInfluence&&(0,a.jsxs)("div",{
className:"mt-4 bg-orange-50 p-3 rounded-xl flex items-start gap-2 border border-orange-100",children:[(0,a.jsx)(h.Star,{
className:"text-primary-gold w-4 h-4 flex-shrink-0 mt-0.5"}
),(0,a.jsxs)("p",{
className:"text-xs text-gray-700 font-medium leading-relaxed",children:[(0,a.jsxs)("strong",{
className:"text-primary-saffron",children:["Master Number ",e.masterNumber," Influence:"]}
)," You possess a higher spiritual vibration before reduction, granting immense potential if properly channeled."]}
)]}
)]}
)]}
);
return(0,a.jsxs)("div",{
className:"pt-32 pb-20 min-h-screen px-4 md:px-8 bg-white relative",children:[(0,a.jsx)("script",{
type:"application/ld+json",dangerouslySetInnerHTML:{
__html:JSON.stringify({
"@context":"https://schema.org","@type":"SoftwareApplication",name:"Vedic Numerology Calculator",applicationCategory:"LifestyleApplication",operatingSystem:"All",offers:{
"@type":"Offer",price:"0",priceCurrency:"USD"}
,description:"Calculate your Vedic Numerology numbers: Mulank (Root), Bhagyank (Destiny), and Namank (Name) with expert interpretations."}
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
,className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-saffron/20 shadow-sm text-primary-red text-xs uppercase tracking-widest font-bold mb-6",children:[(0,a.jsx)(u.Sparkles,{
size:14,className:"text-primary-gold"}
),(0,a.jsx)("span",{
children:"Vedic System"}
)]}
),(0,a.jsxs)("h1",{
className:"text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900",children:["Numerology ",(0,a.jsx)("span",{
className:"saffron-gradient",children:"Calculator"}
)]}
),(0,a.jsx)("p",{
className:"text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium",children:"Discover the hidden meanings behind your name and birth date. Uncover your Mulank, Bhagyank, and Namank according to pure Vedic traditions."}
)]}
),(0,a.jsx)(s.AnimatePresence,{
mode:"wait",children:j?(0,a.jsx)(r.motion.div,{
initial:{
opacity:0,height:0}
,animate:{
opacity:1,height:"auto"}
,exit:{
opacity:0,height:0,overflow:"hidden"}
,className:"max-w-5xl mx-auto mb-20",children:(0,a.jsxs)("div",{
className:"flex flex-col lg:flex-row gap-12 items-center",children:[(0,a.jsx)("div",{
className:"flex-1 w-full",children:(0,a.jsx)("form",{
onSubmit:a=>{
a.preventDefault(),e&&n&&(N(!0),setTimeout(()=>{
b(function(e,a){
let t=a.split("-");
if(3!==t.length)throw Error("Invalid DOB format");
t[0],t[1];
let r=l(t[2].split("").reduce((e,a)=>e+parseInt(a),0)),s=l(a.replace(/[^0-9]/g,"").split("").reduce((e,a)=>e+parseInt(a),0)),i=o(e,"all"),n=o(e,"vowels"),u=o(e,"consonants");
return{
mulank:{
number:r.singleDigit,sanskritName:"Mulank",englishName:"Root / Radical Number",rulingPlanet:d[r.singleDigit].planet,description:d[r.singleDigit].desc,luckyColors:d[r.singleDigit].colors,luckyDays:d[r.singleDigit].days,hasMasterInfluence:!!r.masterNumber,masterNumber:r.masterNumber}
,bhagyank:{
number:s.singleDigit,sanskritName:"Bhagyank",englishName:"Destiny / Life Path",rulingPlanet:d[s.singleDigit].planet,description:d[s.singleDigit].desc,luckyColors:d[s.singleDigit].colors,luckyDays:d[s.singleDigit].days,hasMasterInfluence:!!s.masterNumber,masterNumber:s.masterNumber}
,namank:{
number:i.singleDigit,sanskritName:"Namank",englishName:"Name / Expression",rulingPlanet:d[i.singleDigit].planet,description:d[i.singleDigit].desc,luckyColors:d[i.singleDigit].colors,luckyDays:d[i.singleDigit].days,hasMasterInfluence:!!i.masterNumber,masterNumber:i.masterNumber}
,soulUrge:{
number:n.singleDigit,description:c[n.singleDigit]||"A deep inner calling."}
,personality:{
number:u.singleDigit,description:c[u.singleDigit]||"A multifaceted persona."}
}
}
(e,n)),N(!1),k(!1),setTimeout(()=>{
document.getElementById("numerology-results")?.scrollIntoView({
behavior:"smooth",block:"start"}
)}
,100)}
,800))}
,className:"bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl",children:(0,a.jsxs)("div",{
className:"space-y-6",children:[(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Full Name (As you are known)"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(m.User,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"text",placeholder:"e.g. Rahul Sharma",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:e,onChange:e=>i(e.target.value),required:!0}
)]}
)]}
),(0,a.jsxs)("div",{
className:"space-y-2",children:[(0,a.jsx)("label",{
className:"text-xs font-bold uppercase tracking-widest text-primary-red ml-1",children:"Date of Birth"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)(p.Calendar,{
className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"}
),(0,a.jsx)("input",{
type:"date",className:"w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-saffron focus:bg-white transition-all text-gray-900 font-medium",value:n,onChange:e=>x(e.target.value),required:!0}
)]}
)]}
),(0,a.jsx)("button",{
type:"submit",disabled:v,className:"w-full mt-6 py-5 saffron-button rounded-2xl font-bold text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50",children:v?"Calculating...":"Reveal My Numbers"}
)]}
)}
)}
),(0,a.jsx)("div",{
className:"flex-1 hidden lg:block w-full",children:(0,a.jsxs)("div",{
className:"relative w-full aspect-square max-w-[400px] mx-auto",children:[(0,a.jsx)("div",{
className:"absolute inset-0 border-4 border-primary-saffron/30 rounded-full animate-spin-slow"}
),(0,a.jsx)("div",{
className:"absolute inset-4 border-4 border-dashed border-primary-gold/40 rounded-full animate-reverse-spin"}
),(0,a.jsx)("div",{
className:"absolute inset-0 bg-gradient-to-tr from-primary-saffron/10 to-transparent rounded-full backdrop-blur-sm"}
),(0,a.jsx)("img",{
src:"/astrologer.png",alt:"Pandit Shri Govind",className:"absolute inset-8 object-cover rounded-full shadow-2xl border-8 border-white"}
),(0,a.jsxs)("div",{
className:"absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-primary-gold px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl whitespace-nowrap z-10",children:[(0,a.jsx)(g.ShieldCheck,{
size:16}
)," Verified Expert"]}
)]}
)}
)]}
)}
,"form"):(0,a.jsx)(r.motion.div,{
initial:{
opacity:0}
,animate:{
opacity:1}
,className:"max-w-3xl mx-auto mb-12 text-center",children:(0,a.jsxs)("button",{
onClick:()=>k(!0),className:"px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm flex items-center gap-2 mx-auto",children:[(0,a.jsxs)("svg",{
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
children:f&&!j&&(0,a.jsxs)(r.motion.div,{
initial:{
opacity:0,y:50}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:50}
,className:"mt-8",id:"numerology-results",children:[(0,a.jsxs)("div",{
className:"text-center mb-12",children:[(0,a.jsx)("h2",{
className:"text-3xl font-serif font-bold text-gray-900",children:"Your Core Vedic Numbers"}
),(0,a.jsx)("p",{
className:"text-gray-500 mt-2",children:"A deep dive into your personality, destiny, and soul purpose."}
)]}
),(0,a.jsxs)("div",{
className:"grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12",children:[w(f.mulank,"text-primary-saffron","bg-orange-50","border-orange-100"),w(f.bhagyank,"text-primary-red","bg-red-50","border-red-100"),w(f.namank,"text-primary-gold","bg-yellow-50","border-yellow-100")]}
),(0,a.jsxs)("div",{
className:"bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden",children:[(0,a.jsx)("div",{
className:"p-8 border-b border-gray-100 bg-gray-50",children:(0,a.jsxs)("h3",{
className:"text-xl font-serif font-bold text-gray-900 flex items-center gap-2",children:[(0,a.jsx)(y,{
className:"text-gray-400 w-5 h-5"}
),"Additional Inner Insights"]}
)}
),(0,a.jsxs)("div",{
className:"p-8 grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,a.jsxs)("div",{
className:"flex gap-6 items-start",children:[(0,a.jsx)("div",{
className:"flex-shrink-0 w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl font-serif font-bold text-gray-900",children:f.soulUrge.number}
),(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-gray-900 uppercase tracking-widest mb-1",children:"Soul Urge"}
),(0,a.jsx)("p",{
className:"text-xs text-gray-500 font-medium uppercase mb-2",children:"Inner Desire"}
),(0,a.jsx)("p",{
className:"text-gray-600 text-sm leading-relaxed",children:f.soulUrge.description}
)]}
)]}
),(0,a.jsxs)("div",{
className:"flex gap-6 items-start",children:[(0,a.jsx)("div",{
className:"flex-shrink-0 w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl font-serif font-bold text-gray-900",children:f.personality.number}
),(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-gray-900 uppercase tracking-widest mb-1",children:"Personality"}
),(0,a.jsx)("p",{
className:"text-xs text-gray-500 font-medium uppercase mb-2",children:"Outer Persona"}
),(0,a.jsx)("p",{
className:"text-gray-600 text-sm leading-relaxed",children:f.personality.description}
)]}
)]}
)]}
)]}
)]}
)}
)]}
)]}
)}
],72353)}
]);
