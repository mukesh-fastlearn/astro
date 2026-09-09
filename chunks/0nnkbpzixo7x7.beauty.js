(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,42163,e=>{
"use strict";
var a=e.i(43476),t=e.i(71645),s=e.i(46932),i=e.i(88653),n=e.i(30863);
let r=["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"],o={
Ketu:7,Venus:20,Sun:6,Moon:10,Mars:7,Rahu:18,Jupiter:16,Saturn:19,Mercury:17}
,l=["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"],d=["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury","Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury","Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"],c={
Sun:{
bg:"#FF6B35",text:"#fff",icon:"☀️",badge:"Su"}
,Moon:{
bg:"#A8B8D8",text:"#333",icon:"🌙",badge:"Mo"}
,Mars:{
bg:"#CC2936",text:"#fff",icon:"♂",badge:"Ma"}
,Mercury:{
bg:"#2DC653",text:"#fff",icon:"☿",badge:"Me"}
,Jupiter:{
bg:"#F4A261",text:"#333",icon:"♃",badge:"Ju"}
,Venus:{
bg:"#E76F51",text:"#fff",icon:"♀",badge:"Ve"}
,Saturn:{
bg:"#4A4063",text:"#fff",icon:"♄",badge:"Sa"}
,Rahu:{
bg:"#2C3E50",text:"#fff",icon:"☊",badge:"Ra"}
,Ketu:{
bg:"#7F4F24",text:"#fff",icon:"☋",badge:"Ke"}
}
;
function u(e){
let a=Math.floor(e/(360/27)),t=e%(360/27),s=t/(360/27);
return{
index:a,name:l[a],lord:d[a],fractionRemaining:1-s,fractionElapsed:s,degreeInNakshatra:t}
}
function h(e,a){
let t=u(a),s=t.lord,i=r.indexOf(s),n=o[s],l=n*t.fractionRemaining,d=t.fractionElapsed*n*315576e5,c=new Date(e.getTime()-d),h=new Date(e.getTime()+315576e5*l),m=new Date,p=[];
p.push({
planet:s,start:c,end:h,durationYears:n,yearsAtBirth:l,isCurrent:m>=c&&m<h,isPast:m>=h}
);
let g=h;
for(let e=1;
e<=8;
e++){
let a=r[(i+e)%9],t=o[a],s=315576e5*t,n=new Date(g.getTime()+s);
p.push({
planet:a,start:new Date(g),end:n,durationYears:t,isCurrent:m>=g&&m<n,isPast:m>=n}
),g=n}
return p}
function m(e){
let a=r.indexOf(e.planet),t=e.end.getTime()-e.start.getTime(),s=new Date,i=[],n=new Date(e.start);
for(let l=0;
l<9;
l++){
let d=r[(a+l)%9],c=t*(o[d]/120),u=new Date(n.getTime()+c);
i.push({
planet:d,mahaLord:e.planet,start:new Date(n),end:u,durationMs:c,isCurrent:s>=n&&s<u,isPast:s>=u}
),n=u}
return i}
function p(e){
let a=r.indexOf(e.planet),t=e.end.getTime()-e.start.getTime(),s=new Date,i=[],n=new Date(e.start);
for(let l=0;
l<9;
l++){
let d=r[(a+l)%9],c=t*(o[d]/120),u=new Date(n.getTime()+c);
i.push({
planet:d,mahaLord:e.mahaLord,antarLord:e.planet,start:new Date(n),end:u,durationMs:c,isCurrent:s>=n&&s<u,isPast:s>=u}
),n=u}
return i}
function g(e){
return`${
e.getDate()}
 ${
["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()]}
 ${
e.getFullYear()}
`}
function x(e,a){
let t=a.getFullYear()-e.getFullYear(),s=a.getMonth()-e.getMonth(),i=a.getDate()-e.getDate();
i<0&&(s--,i+=30),s<0&&(t--,s+=12);
let n=[];
return t>0&&n.push(`${
t}
y`),s>0&&n.push(`${
s}
m`),i>0&&n.push(`${
i}
d`),n.join(" ")||"0d"}
function f(e){
return Math.max(0,Math.ceil((e.getTime()-Date.now())/864e5))}
function y(e,a){
let t=a.getTime()-e.getTime();
return Math.min(100,Math.max(0,(Date.now()-e.getTime())/t*100))}
function b(e,a){
let t=a.getFullYear()-e.getFullYear();
return a<new Date(a.getFullYear(),e.getMonth(),e.getDate())&&t--,Math.max(0,t)}
let v={
Sun:{
title:"Sun Mahadasha (Surya Dasha) — 6 Years",overview:"The Sun Mahadasha is a period of authority, identity, and self-realization. Sun illuminates your life with ambition, leadership, and a strong desire to be recognized. Your true self comes to the forefront — you may rise to positions of authority, gain fame, or take on roles of responsibility. The soul's purpose becomes clearer.",positive:"Career advancement, government or administrative success, strong health and vitality, clarity of purpose, father-figure relationships improve, name and fame grow, confidence peaks, spiritual awakening through disciplined practice.",challenges:"Ego conflicts, arrogance, conflicts with authority figures, health issues related to heart and eyes, tendency toward pride, possible estrangement from father, overwork, inflexibility.",career:"Ideal for government jobs, politics, administration, medicine, gold and precious metals trade, leadership roles. Promotions and recognition are likely.",health:"Watch for heart-related issues, high blood pressure, eye problems, bone-related ailments, headaches, fever. Maintain work-life balance.",relationships:"Father figure plays a significant role. Spouse may feel neglected due to career focus. Maintain humility. Possible conflicts due to ego.",spirituality:"Strong inclination toward worship of the Sun, Shiva, or Vishnu. Surya Namaskar, Gayatri Mantra chanting, and fire rituals are highly beneficial.",remedies:"Chant Aditya Hrudayam or Gayatri Mantra daily. Offer water to the rising Sun. Wear Ruby (if Sun is benefic). Donate wheat, copper, and red items on Sundays."}
,Moon:{
title:"Moon Mahadasha (Chandra Dasha) — 10 Years",overview:"The Moon Mahadasha governs emotions, mind, mother, public life, and the subconscious. This deeply personal period where feelings, intuition, and emotional intelligence drive your life. You become more sensitive, empathetic, and in tune with your inner self. Public life and popularity often increase.",positive:"Emotional growth, strong intuition, popularity with masses, good for creative fields, motherly support, travel, domestic happiness, financial gains through public dealings, imagination and artistic talents flourish.",challenges:"Emotional instability, mood swings, anxiety, depression, overthinking, dependency issues, water-related health concerns, changing mind, attachment to past.",career:"Excellent for public relations, hospitality, travel, nursing, psychology, arts and entertainment, food and beverages, real estate near water, import-export.",health:"Watch for mental health fluctuations, hormonal imbalances, digestive issues, cold and cough, water retention, sleep disorders. Rest and routine are essential.",relationships:"Very strong focus on mother and maternal relationships. Domestic life is highlighted. Marriage is emotionally deep but sensitive.",spirituality:"Devotion to Goddess (Durga, Lakshmi, Saraswati), Moon worship, chanting Om Chandraya Namah, visiting water bodies and temples. Monday fasts are beneficial.",remedies:"Wear Pearl or Moonstone (if Moon is benefic). Chant Chandra Mantra 108 times on Mondays. Offer milk and white flowers to Shiva."}
,Mars:{
title:"Mars Mahadasha (Mangala Dasha) — 7 Years",overview:"Mars Mahadasha is a period of energy, courage, ambition, and action. Mars infuses life with drive, confidence, and a desire to conquer. This is a time for bold moves, physical pursuits, and asserting oneself. Real estate, engineering, and military matters are highlighted.",positive:"Tremendous energy, courage to face challenges, success in competitive environments, real estate gains, leadership in crisis, surgical procedures succeed, siblings play positive roles.",challenges:"Aggression, accidents, injuries, conflicts with authority, legal disputes, impulsive decisions, blood pressure issues, tendency toward anger.",career:"Best for military, police, engineering, surgery, real estate, sports, construction, manufacturing, fire services, martial arts.",health:"Watch for accidents, cuts, burns, blood disorders, inflammation, fever, surgery-related events, head injuries. Exercise regularly but avoid recklessness.",relationships:"Siblings (especially brothers) play key roles. Marital life may see friction due to aggression. Passion is high.",spirituality:"Worship of Kartikeya (Murugan), Hanuman, Lord Shiva. Chant Mangala Stotram. Tuesdays are auspicious.",remedies:"Chant Om Angarakaya Namah 108 times on Tuesdays. Donate red lentils, copper utensils on Tuesdays. Visit Hanuman temple."}
,Rahu:{
title:"Rahu Mahadasha — 18 Years",overview:"Rahu Mahadasha is one of the most transformative and unpredictable periods. Rahu represents obsession, illusion, foreign elements, technology, and sudden change. This 18-year period brings extraordinary opportunities mixed with illusions and confusion. It disrupts the status quo and pushes toward unconventional paths.",positive:"Sudden rise in status, foreign travel and settlements, gains through technology, material success, breakthroughs in career, fame in media, research and innovation thrive, hidden talents emerge.",challenges:"Illusions and deception, mysterious health problems, relationship deceptions, addictive behaviors, mental restlessness, fear and anxiety, sudden falls from success.",career:"Excellent for IT and technology, media, politics, aviation, foreign trade, research, occult sciences, pharmaceuticals, cinema.",health:"Watch for mysterious illnesses, skin disorders, mental health issues, phobias, poisoning or allergies, neurological concerns.",relationships:"Unconventional relationships, foreign spouses possible. Deception in partnerships is a risk. Clear communication essential.",spirituality:"Worship of Durga, Kali, or Saraswati. Chant Durga Saptashati or Rahu Beej Mantra. Feed crows.",remedies:"Chant Om Rahave Namah 108 times daily. Donate blue/black items on Saturdays. Feed crows and homeless people."}
,Jupiter:{
title:"Jupiter Mahadasha (Guru Dasha) — 16 Years",overview:"Jupiter Mahadasha is widely considered the most auspicious major period. Jupiter brings wisdom, expansion, spirituality, prosperity, and good fortune. Life tends to expand in positive ways — financially, spiritually, and socially. Higher education, marriage, children, and religious pursuits are all blessed.",positive:"Wealth accumulation, successful marriage and children, higher education success, professional recognition, spiritual growth, religious travel, good reputation, guru relationships.",challenges:"Overindulgence (weight gain), overconfidence, laziness due to comfort, liver and metabolism issues, preachiness, financial over-extension.",career:"Outstanding for teaching, law, finance, banking, advisory roles, philosophy, religion, publishing, academia, counseling, investment.",health:"Generally excellent. Watch for liver issues, obesity, diabetes, blood sugar, fatty liver. Maintain discipline in diet.",relationships:"Marriage and children are strongly blessed. Relationship with gurus and mentors is meaningful. Family expands.",spirituality:"Golden period for spiritual practice. Yagnas, pilgrimages, studying Vedas. Worship Vishnu, Brihaspati, or Dattatreya.",remedies:"Chant Om Gurave Namah. Wear Yellow Sapphire if Jupiter is benefic. Donate yellow items on Thursdays. Serve teachers."}
,Saturn:{
title:"Saturn Mahadasha (Shani Dasha) — 19 Years",overview:"Saturn Mahadasha is the longest at 19 years and one of the most karmic and transformative. Saturn demands discipline, hard work, patience, and accountability. This period is rarely easy, but its rewards — earned through genuine effort — are lasting and profound. Saturn teaches humility, service, and karma.",positive:"Lasting career success through hard work, mastery of a field, justice prevails, discipline and organization, gains through service, support from elderly, land and property gains, spiritual depth.",challenges:"Delays and obstacles, health challenges (joints, bones, chronic illness), depression, loneliness, separation, legal troubles, financial strain, burden of responsibilities.",career:"Best for engineering, law, mining, construction, agriculture, service to society, oil and gas, real estate, judiciary, astrology, meditation instruction.",health:"Watch for joint pain, arthritis, chronic diseases, dental issues, nerve problems, depression, skin disorders, digestive sluggishness.",relationships:"Relationships may feel burdensome or cold initially. Commitment and loyalty are tested. Service to partner is key.",spirituality:"Deepest spiritual lessons come through Saturn. Service to the poor, aged, and disabled. Worship Shani Dev, Bhairav, or Hanuman.",remedies:"Chant Shani Chalisa or Om Shanaischaraya Namah on Saturdays. Donate black sesame, mustard oil, iron on Saturdays. Serve your elders."}
,Mercury:{
title:"Mercury Mahadasha (Budha Dasha) — 17 Years",overview:"Mercury Mahadasha is a period of intellect, communication, commerce, analysis, and adaptability. Mercury makes this a time of mental sharpness, learning, writing, trading, and networking. Business ventures tend to succeed due to Mercury's commercial nature.",positive:"Business success, excellent communication, writing and publishing opportunities, educational achievements, multiple income sources, sharp analytical mind, successful negotiations.",challenges:"Indecisiveness, nervousness, overthinking, scattered energy, skin and nervous system issues, speech-related problems, tendency to manipulate.",career:"Best for business, commerce, accounting, writing, journalism, IT and software, mathematics, astrology, teaching, marketing, public relations.",health:"Watch for nervous disorders, skin conditions, breathing issues, intestinal problems, speech disorders. Yoga and meditation are beneficial.",relationships:"Intellectual connection matters most. Communication with spouse is key. Siblings relationships are highlighted.",spirituality:"Worship of Lord Vishnu, Saraswati, or Ganesha. Wednesday is auspicious. Study of scriptures and sacred texts is beneficial.",remedies:"Chant Om Budhaya Namah on Wednesdays. Donate green vegetables, moong dal, books. Wear Emerald if Mercury is benefic."}
,Ketu:{
title:"Ketu Mahadasha — 7 Years",overview:"Ketu Mahadasha is a period of spiritual depth, detachment, past-life karma resolution, and inner transformation. Ketu represents liberation, moksha, and the mystical. This 7-year period often pulls you away from material pursuits toward spiritual seeking. Enormous inner growth occurs.",positive:"Spiritual awakening, liberation from old karmas, occult knowledge, psychic abilities may develop, success in healing arts, past-life wisdom surfaces.",challenges:"Confusion and lack of direction, unexpected losses, accidents, misdiagnoses, isolation or separation, mysterious health ailments, feelings of meaninglessness.",career:"Best for spiritual teaching, alternative healing, occult sciences, research, mathematics, computers, foreign travel, introspective work.",health:"Watch for mysterious or misdiagnosed conditions, nerve-related issues, wounds, accidents, spiritual/emotional burnout.",relationships:"Relationships may feel karmic or destined. Some separations occur. Deep soul-level connections are possible.",spirituality:"Most spiritually charged period. Meditation, solitude, pilgrimage. Study of tantra, yoga, vedanta. Worship Ganesha, Bhairav, or Kali.",remedies:"Chant Om Ketave Namah 108 times. Donate blankets and sesame seeds. Worship Ganesha. Feed dogs."}
,Venus:{
title:"Venus Mahadasha (Shukra Dasha) — 20 Years",overview:"Venus Mahadasha is the longest and often most pleasurable at 20 full years. Venus governs love, beauty, luxury, arts, relationships, comforts, and refinement. This period brings wealth, romance, artistic success, and a refined lifestyle. For many, this is the most enjoyable phase of life.",positive:"Marriage and romantic fulfillment, artistic success, luxury and comforts increase, financial prosperity, vehicles and property, travel to beautiful places, good food and lifestyle.",challenges:"Over-indulgence in pleasures, laziness, reproductive health issues, excessive spending, jealousy, attachment to material comforts.",career:"Best for arts, entertainment, music, film, fashion, luxury goods, hospitality, cosmetics, jewelry, textiles, interior design, food industry.",health:"Watch for reproductive system issues, diabetes, kidney concerns, hormonal imbalances, skin conditions. Moderation in diet is key.",relationships:"Most romantic of all Dashas. Marriage is likely. Love relationships are passionate and deep. Spouse tends to be attractive and refined.",spirituality:"Worship of Goddess Lakshmi, Saraswati, or Radha. Friday fasts are auspicious. Arts and music as offerings to the divine.",remedies:"Chant Om Shukraya Namah on Fridays. Donate white rice, sugar, ghee on Fridays. Wear Diamond or White Sapphire if Venus is benefic."}
}
,w={
Sun:{
Sun:"self",Moon:"friend",Mars:"friend",Mercury:"neutral",Jupiter:"friend",Venus:"enemy",Saturn:"enemy",Rahu:"enemy",Ketu:"enemy"}
,Moon:{
Sun:"friend",Moon:"self",Mars:"neutral",Mercury:"friend",Jupiter:"neutral",Venus:"neutral",Saturn:"neutral",Rahu:"enemy",Ketu:"enemy"}
,Mars:{
Sun:"friend",Moon:"friend",Mars:"self",Mercury:"enemy",Jupiter:"friend",Venus:"neutral",Saturn:"neutral",Rahu:"enemy",Ketu:"neutral"}
,Mercury:{
Sun:"friend",Moon:"enemy",Mars:"neutral",Mercury:"self",Jupiter:"neutral",Venus:"friend",Saturn:"neutral",Rahu:"friend",Ketu:"neutral"}
,Jupiter:{
Sun:"friend",Moon:"friend",Mars:"friend",Mercury:"enemy",Jupiter:"self",Venus:"enemy",Saturn:"neutral",Rahu:"enemy",Ketu:"neutral"}
,Venus:{
Sun:"enemy",Moon:"enemy",Mars:"neutral",Mercury:"friend",Jupiter:"neutral",Venus:"self",Saturn:"friend",Rahu:"friend",Ketu:"neutral"}
,Saturn:{
Sun:"enemy",Moon:"enemy",Mars:"enemy",Mercury:"friend",Jupiter:"neutral",Venus:"friend",Saturn:"self",Rahu:"friend",Ketu:"neutral"}
,Rahu:{
Sun:"enemy",Moon:"enemy",Mars:"enemy",Mercury:"friend",Jupiter:"neutral",Venus:"friend",Saturn:"friend",Rahu:"self",Ketu:"enemy"}
,Ketu:{
Sun:"neutral",Moon:"friend",Mars:"friend",Mercury:"enemy",Jupiter:"friend",Venus:"enemy",Saturn:"neutral",Ketu:"self",Rahu:"enemy"}
}
,j={
Sun:{
domains:["career","government","father","authority","health"],positive:"Authority, confidence, and leadership",negative:"Ego conflicts and pride",deity:"Surya/Shiva"}
,Moon:{
domains:["emotions","mother","mind","public life","creativity"],positive:"Intuition, popularity, and emotional depth",negative:"Anxiety, mood swings, and overthinking",deity:"Parvati/Lakshmi"}
,Mars:{
domains:["property","siblings","energy","competition","surgery"],positive:"Courage, energy, and determination",negative:"Aggression, accidents, and conflicts",deity:"Hanuman/Kartikeya"}
,Mercury:{
domains:["business","communication","education","trade","intellect"],positive:"Intelligence, commerce, and adaptability",negative:"Nervousness, deception, and scattered focus",deity:"Vishnu/Saraswati"}
,Jupiter:{
domains:["wisdom","wealth","children","spirituality","law"],positive:"Wisdom, prosperity, and divine grace",negative:"Overconfidence and excess",deity:"Brihaspati/Vishnu"}
,Venus:{
domains:["marriage","luxury","arts","beauty","vehicles"],positive:"Beauty, harmony, and material comfort",negative:"Overindulgence, laziness, and attachment",deity:"Lakshmi/Radha"}
,Saturn:{
domains:["service","discipline","karma","longevity","hardship"],positive:"Discipline, endurance, and lasting success",negative:"Delays, depression, and chronic issues",deity:"Shani Dev/Hanuman"}
,Rahu:{
domains:["foreign","technology","ambition","transformation","illusion"],positive:"Ambition, innovation, and breakthrough",negative:"Illusion, confusion, and deception",deity:"Durga/Kali"}
,Ketu:{
domains:["spirituality","detachment","past karma","occult","liberation"],positive:"Spiritual insight and liberation",negative:"Confusion, isolation, and material loss",deity:"Ganesha/Bhairav"}
}
,M={
"Moon-Jupiter":{
yoga:"Gaja Kesari Yoga",note:"One of the most auspicious combinations bringing wisdom, wealth, and emotional abundance."}
,"Jupiter-Moon":{
yoga:"Gaja Kesari Yoga",note:"Emotional abundance, prosperity, public popularity, and deep satisfaction."}
,"Mars-Rahu":{
yoga:"Angarak Yoga",note:"Highly volatile and accident-prone period. Channel energy into technology and defense."}
,"Rahu-Mars":{
yoga:"Angarak Yoga",note:"Explosive, impulsive energy. Risk of fire, accidents, and violent confrontations."}
,"Rahu-Jupiter":{
yoga:"Guru Chandal Yoga",note:"Tension between wisdom and ambition. Rapid expansion through unconventional means."}
,"Jupiter-Rahu":{
yoga:"Guru Chandal Yoga",note:"Blessings partially disrupted by Rahu. Maintain strict ethical standards."}
,"Rahu-Ketu":{
note:"Full activation of the nodal axis. Highly unpredictable, fated events. Stay grounded."}
,"Ketu-Rahu":{
note:"Nodal axis storm. Sudden gains and losses, unexpected meetings, karmic completions."}
,"Sun-Saturn":{
note:"King and servant in conflict. Obstacles, delays, and tests of humility."}
,"Saturn-Sun":{
note:"Service vs authority tension. Conflicts with government and father figures."}
,"Saturn-Saturn":{
note:"Maximum karmic weight. Heaviest period requiring absolute discipline and service."}
,"Venus-Venus":{
note:"Peak of all Venusian themes. Maximum love, luxury, artistic success, and marriage prospects."}
,"Jupiter-Jupiter":{
note:"Maximum divine grace. All auspicious events, promotions, marriage, and spiritual growth."}
,"Mars-Mars":{
note:"Double Martian intensity. Enormous drive but very high accident and conflict risk."}
,"Ketu-Jupiter":{
yoga:"Moksha Combination",note:"One of the most spiritually elevated combinations. Past-life spiritual achievements surface."}
,"Moon-Rahu":{
note:"Rahu eclipses the Moon, creating mental unrest, illusions, and possible psychic experiences."}
,"Sun-Rahu":{
note:"Rahu eclipses the Sun, creating confusion around identity and goals."}
,"Mars-Venus":{
note:"The cosmic warrior meets the lover. Intense passion, creative energy, and sensual experiences."}
,"Venus-Mars":{
note:"Passionate action fueled by desire. Romance is intensely physical and emotionally charged."}
,"Saturn-Venus":{
note:"Friends in astrology. Disciplined creative work in arts, luxury, or real estate bears lasting fruit."}
,"Venus-Saturn":{
note:"Steady, disciplined accumulation of luxury, wealth, and professional recognition."}
,"Mercury-Venus":{
note:"Friends bringing creative commerce, arts business, beauty industry, and charming communication."}
,"Venus-Mercury":{
note:"Creative communication and business success in arts, beauty, fashion, and media."}
}
;
var N=e.i(56420);
let S=(0,N.default)("chevron-down",[["path",{
d:"m6 9 6 6 6-6",key:"qrunsl"}
]]),k=(0,N.default)("chevron-right",[["path",{
d:"m9 18 6-6-6-6",key:"mthhwq"}
]]);
var $=e.i(74544),C=e.i(86563);
let D=(0,N.default)("zap",[["path",{
d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}
]]);
var R=e.i(68109),T=e.i(28623),A=e.i(82954);
function V({
birthDate:e,moonLongitude:n}
){
let r,l,d,N,P,K,J,F,W,Y,[B,O]=(0,t.useState)(null),[z,E]=(0,t.useState)(null),[L,G]=(0,t.useState)("overview"),[H,I]=(0,t.useState)(null),[q,U]=(0,t.useState)(null),_=(0,t.useMemo)(()=>(function(e,a){
let t=u(a),s=h(e,a),i=new Date,n=s.find(e=>i>=e.start&&i<e.end);
if(!n)return null;
let r=m(n),o=r.find(e=>i>=e.start&&i<e.end);
if(!o)return null;
let l=p(o),d=l.find(e=>i>=e.start&&i<e.end);
return d?{
maha:n,antar:o,pratyantar:d,allMahadashas:s,allAntardashas:r,allPratyantars:l,nakshatraInfo:t}
:null}
)(e,n),[e,n]),Q=(0,t.useMemo)(()=>h(e,n),[e,n]),X=(0,t.useMemo)(()=>u(n),[n]);
if(!_)return null;
let{
maha:Z,antar:ee,pratyantar:ea}
=_,et=y(Z.start,Z.end),es=y(ee.start,ee.end),ei=H||Z.planet,en=q||ee.planet,er=v[ei],eo=(r=ei===en?"self":w[ei]?.[en]||"neutral",l=j[ei],d=j[en],N=M[`${
ei}
-${
en}
`],P=`${
ei}
\u2013${
en}
 Antardasha`,K="",J="",F="",W="",Y=[],"self"===r?(K=`Pure ${
ei}
 Energy`,J=`${
ei}
 within its own sub-period creates an intensified focus on all ${
ei}
-related themes. ${
d.positive}
 are amplified to their maximum. This is a defining period within the ${
ei}
 Mahadasha where core themes manifest most strongly. Focus on ${
l.domains.slice(0,3).join(", ")}
 for best results. ${
N?.note||`The qualities of ${
ei}
 are at their peak. Worship ${
l.deity}
 for best results.`}
`,F=`Peak ${
ei}
 results in ${
l.domains.join(", ")}
`,W=`${
d.negative}
. Guard against excess.`,Y.push(ei,"Intensified","Peak",...l.domains.slice(0,3))):"friend"===r?(K=`Harmonious ${
ei}
 \u00d7 ${
en}
`,J=`${
ei}
 and ${
en}
 are natural friends, making this a harmonious and productive period. ${
d.positive}
 support and enhance the themes of ${
ei}
 Mahadasha. ${
N?.note||`The combination brings ${
d.positive.toLowerCase()}
 into the areas of ${
l.domains.slice(0,2).join(" and ")}
.`}
 ${
N?.yoga?`This activates ${
N.yoga}
.`:""}
`,F=`${
d.positive}
. Growth in ${
[...l.domains.slice(0,2),...d.domains.slice(0,2)].join(", ")}
`,W=`Minor challenges in ${
d.negative.toLowerCase()}
`,Y.push("Harmony","Support",...d.domains.slice(0,2),...l.domains.slice(0,1))):"enemy"===r?(K=`Tension: ${
ei}
 vs ${
en}
`,J=`${
ei}
 and ${
en}
 are natural enemies, creating friction and challenges during this sub-period. ${
N?.note||`The energy of ${
en}
 conflicts with ${
ei}
's agenda, bringing ${
d.negative.toLowerCase()}
 into areas of ${
l.domains.slice(0,2).join(" and ")}
.`}
 Patience, spiritual practice, and careful decision-making are essential. ${
N?.yoga?`This activates the challenging ${
N.yoga}
.`:""}
 Worship ${
d.deity}
 alongside ${
l.deity}
 for balance.`,F=`Learning through adversity. Growth in ${
d.domains[0]}
 with effort`,W=`${
d.negative}
. Conflicts in ${
l.domains.slice(0,2).join(" and ")}
`,Y.push("Tension","Challenge","Growth",...d.domains.slice(0,2))):(K=`Mixed: ${
ei}
 with ${
en}
`,J=`${
ei}
 and ${
en}
 have a neutral relationship, creating mixed results. ${
N?.note||`${
en}
's energy neither strongly supports nor opposes ${
ei}
's themes. Your own effort determines outcomes.`}
 ${
d.positive}
 may manifest moderately in ${
d.domains.slice(0,3).join(", ")}
. Balanced approach to both ${
ei}
 and ${
en}
 themes yields best results.`,F=`Moderate results in ${
d.domains.slice(0,3).join(", ")}
`,W=`${
d.negative}
. Effort determines outcomes`,Y.push("Mixed","Effort",...d.domains.slice(0,2),...l.domains.slice(0,1))),{
title:P,theme:K,interpretation:J,keywords:Y,favorable:F,caution:W,yoga:N?.yoga}
),el=[{
key:"overview",label:"Overview",icon:(0,a.jsx)(C.Star,{
size:14}
)}
,{
key:"career",label:"Career",icon:(0,a.jsx)(D,{
size:14}
)}
,{
key:"health",label:"Health",icon:(0,a.jsx)(A.Shield,{
size:14}
)}
,{
key:"relationships",label:"Relations",icon:(0,a.jsx)(R.Heart,{
size:14}
)}
,{
key:"spirituality",label:"Spiritual",icon:(0,a.jsx)(T.Sparkles,{
size:14}
)}
,{
key:"remedies",label:"Remedies",icon:(0,a.jsx)($.Clock,{
size:14}
)}
],ed=({
planet:e,size:t="sm"}
)=>{
let s=c[e]||{
bg:"#888",text:"#fff",badge:"?",icon:""}
;
return(0,a.jsxs)("span",{
className:`inline-flex items-center gap-1 rounded-full font-bold ${
"lg"===t?"text-sm px-3 py-1.5":"md"===t?"text-xs px-2.5 py-1":"text-[10px] px-2 py-0.5"}
 shadow-sm`,style:{
backgroundColor:s.bg,color:s.text}
,children:[(0,a.jsx)("span",{
children:s.icon}
)," ",e]}
)}
,ec=({
value:e,color:t}
)=>(0,a.jsx)("div",{
className:"w-full h-2 bg-gray-100 rounded-full overflow-hidden",children:(0,a.jsx)(s.motion.div,{
initial:{
width:0}
,animate:{
width:`${
e}
%`}
,transition:{
duration:1.2,ease:"easeOut"}
,className:"h-full rounded-full",style:{
backgroundColor:t}
}
)}
);
return(0,a.jsxs)("div",{
className:"space-y-8",children:[(0,a.jsx)("div",{
className:"bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100",children:(0,a.jsxs)("p",{
className:"text-sm text-gray-700 leading-relaxed",children:[(0,a.jsx)("span",{
className:"font-bold text-primary-red",children:"Dasha Basis:"}
)," Your Moon is at"," ",(0,a.jsxs)("span",{
className:"font-bold",children:[n.toFixed(2),"°"]}
)," sidereal longitude in"," ",(0,a.jsx)("span",{
className:"font-bold text-primary-saffron",children:X.name}
)," Nakshatra (ruled by"," ",(0,a.jsx)(ed,{
planet:X.lord}
),"). At birth,"," ",(0,a.jsxs)("span",{
className:"font-bold",children:[(100*X.fractionRemaining).toFixed(1),"%"]}
)," of this Nakshatra remained, giving you"," ",(0,a.jsxs)("span",{
className:"font-bold",children:[(o[X.lord]*X.fractionRemaining).toFixed(1)," years"]}
)," of"," ",X.lord," Mahadasha from birth."]}
)}
),(0,a.jsxs)("div",{
className:"bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",children:[(0,a.jsx)("div",{
className:"bg-gradient-to-r from-primary-red to-primary-saffron p-5",children:(0,a.jsxs)("h3",{
className:"text-white font-serif text-xl font-bold flex items-center gap-2",children:[(0,a.jsx)(T.Sparkles,{
size:20}
)," Current Dasha Period"]}
)}
),(0,a.jsxs)("div",{
className:"p-6 space-y-5",children:[(0,a.jsxs)("div",{
className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:[(0,a.jsxs)("div",{
className:"flex items-center gap-3",children:[(0,a.jsx)("div",{
className:"w-3 h-3 rounded-full bg-red-500 animate-pulse"}
),(0,a.jsx)("span",{
className:"text-sm font-bold text-gray-500 uppercase tracking-wider w-28",children:"Mahadasha"}
),(0,a.jsx)(ed,{
planet:Z.planet,size:"md"}
)]}
),(0,a.jsxs)("div",{
className:"text-sm text-gray-600 font-medium",children:[g(Z.start)," → ",g(Z.end),(0,a.jsxs)("span",{
className:"ml-2 text-primary-red font-bold",children:["(",f(Z.end),"d left)"]}
)]}
)]}
),(0,a.jsx)(ec,{
value:et,color:c[Z.planet]?.bg||"#C1121F"}
),(0,a.jsxs)("div",{
className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:[(0,a.jsxs)("div",{
className:"flex items-center gap-3",children:[(0,a.jsx)("div",{
className:"w-3 h-3 rounded-full bg-orange-400 animate-pulse"}
),(0,a.jsx)("span",{
className:"text-sm font-bold text-gray-500 uppercase tracking-wider w-28",children:"Antardasha"}
),(0,a.jsx)(ed,{
planet:ee.planet,size:"md"}
)]}
),(0,a.jsxs)("div",{
className:"text-sm text-gray-600 font-medium",children:[g(ee.start)," → ",g(ee.end),(0,a.jsxs)("span",{
className:"ml-2 text-primary-saffron font-bold",children:["(",f(ee.end),"d left)"]}
)]}
)]}
),(0,a.jsx)(ec,{
value:es,color:c[ee.planet]?.bg||"#F4A261"}
),(0,a.jsxs)("div",{
className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:[(0,a.jsxs)("div",{
className:"flex items-center gap-3",children:[(0,a.jsx)("div",{
className:"w-3 h-3 rounded-full bg-yellow-400"}
),(0,a.jsx)("span",{
className:"text-sm font-bold text-gray-500 uppercase tracking-wider w-28",children:"Pratyantar"}
),(0,a.jsx)(ed,{
planet:ea.planet,size:"md"}
)]}
),(0,a.jsxs)("div",{
className:"text-sm text-gray-600 font-medium",children:[g(ea.start)," → ",g(ea.end),(0,a.jsxs)("span",{
className:"ml-2 text-gray-500 font-bold",children:["(",f(ea.end),"d left)"]}
)]}
)]}
)]}
)]}
),(0,a.jsxs)("div",{
className:"bg-white rounded-2xl shadow-lg border border-gray-100 p-6",children:[(0,a.jsx)("h3",{
className:"text-lg font-serif font-bold text-primary-red mb-4 uppercase tracking-widest",children:"Mahadasha Timeline"}
),(0,a.jsxs)("div",{
className:"relative",children:[(0,a.jsx)("div",{
className:"flex w-full h-10 rounded-xl overflow-hidden shadow-inner border border-gray-200",children:Q.map(t=>{
let s=t.durationYears/120*100,i=c[t.planet];
return(0,a.jsxs)("div",{
className:"relative group cursor-pointer transition-all hover:brightness-110",style:{
width:`${
s}
%`,backgroundColor:i?.bg||"#888"}
,onClick:()=>{
I(t.planet),O(t.planet),G("overview")}
,children:[s>4&&(0,a.jsx)("span",{
className:"absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold",style:{
color:i?.text||"#fff"}
,children:i?.badge||t.planet.slice(0,2)}
),t.isCurrent&&(0,a.jsx)("div",{
className:"absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary-red"}
),(0,a.jsxs)("div",{
className:"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl",children:[(0,a.jsx)("strong",{
children:t.planet}
)," (",t.durationYears,"y)",(0,a.jsx)("br",{
}
),g(t.start)," → ",g(t.end),(0,a.jsx)("br",{
}
),"Age ",b(e,t.start),"–",b(e,t.end),t.isCurrent&&(0,a.jsx)("span",{
className:"block text-yellow-300 font-bold mt-1",children:"⚡ Current"}
)]}
)]}
,`${
t.planet}
-${
t.start.getTime()}
`)}
)}
),(0,a.jsx)("div",{
className:"flex w-full mt-2",children:Q.map(t=>{
let s=t.durationYears/120*100;
return(0,a.jsx)("div",{
style:{
width:`${
s}
%`}
,className:"text-[8px] sm:text-[9px] text-gray-400 font-mono text-center truncate",children:b(e,t.start)}
,`age-${
t.planet}
-${
t.start.getTime()}
`)}
)}
)]}
)]}
),(0,a.jsxs)("div",{
className:"bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",children:[(0,a.jsxs)("div",{
className:"p-6 border-b border-gray-100",children:[(0,a.jsx)("h3",{
className:"text-lg font-serif font-bold text-primary-red uppercase tracking-widest",children:"Mahadasha Periods"}
),(0,a.jsx)("p",{
className:"text-xs text-gray-500 mt-1",children:"Click any period to view Antardashas and interpretations"}
)]}
),(0,a.jsx)("div",{
className:"divide-y divide-gray-50",children:Q.map(t=>{
let n=c[t.planet],r=B===t.planet,o=r?m(t):[];
return(0,a.jsxs)("div",{
children:[(0,a.jsxs)("button",{
className:`w-full flex items-center gap-4 p-4 sm:p-5 text-left transition-all hover:bg-orange-50/30 ${
t.isCurrent?"bg-orange-50/50 border-l-4 border-primary-saffron":""}
`,onClick:()=>{
O(r?null:t.planet),I(t.planet),E(null),G("overview")}
,children:[(0,a.jsx)("div",{
className:"flex-shrink-0",children:r?(0,a.jsx)(S,{
size:16,className:"text-primary-saffron"}
):(0,a.jsx)(k,{
size:16,className:"text-gray-400"}
)}
),(0,a.jsx)("div",{
className:"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm",style:{
backgroundColor:n?.bg,color:n?.text}
,children:n?.badge}
),(0,a.jsxs)("div",{
className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{
className:"font-bold text-gray-900 flex items-center gap-2",children:[t.planet,t.isCurrent&&(0,a.jsx)("span",{
className:"text-[10px] bg-primary-red text-white px-2 py-0.5 rounded-full font-bold animate-pulse",children:"ACTIVE"}
),t.isPast&&(0,a.jsx)("span",{
className:"text-[10px] text-gray-400",children:"✓ Past"}
)]}
),(0,a.jsxs)("div",{
className:"text-xs text-gray-500 mt-0.5",children:[g(t.start)," → ",g(t.end)," · Age ",b(e,t.start),"–",b(e,t.end)]}
)]}
),(0,a.jsxs)("div",{
className:"text-right flex-shrink-0",children:[(0,a.jsxs)("div",{
className:"text-sm font-bold text-gray-700",children:[t.durationYears,"y"]}
),(0,a.jsx)("div",{
className:"text-[10px] text-gray-400",children:x(t.start,t.end)}
)]}
)]}
),(0,a.jsx)(i.AnimatePresence,{
children:r&&(0,a.jsx)(s.motion.div,{
initial:{
height:0,opacity:0}
,animate:{
height:"auto",opacity:1}
,exit:{
height:0,opacity:0}
,className:"overflow-hidden bg-gray-50/50",children:(0,a.jsxs)("div",{
className:"px-4 sm:px-8 py-4 space-y-1",children:[(0,a.jsxs)("div",{
className:"text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-8",children:["Antardashas within ",t.planet," Mahadasha"]}
),o.map(e=>{
let n=c[e.planet],r=z===`${
t.planet}
-${
e.planet}
`,o=r?p(e):[];
return(0,a.jsxs)("div",{
children:[(0,a.jsxs)("button",{
className:`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-white/80 ${
e.isCurrent?"bg-white shadow-sm border border-orange-100":""}
`,onClick:()=>{
E(r?null:`${
t.planet}
-${
e.planet}
`),U(e.planet),I(t.planet),G("overview")}
,children:[(0,a.jsx)("div",{
className:"flex-shrink-0",children:r?(0,a.jsx)(S,{
size:14,className:"text-primary-saffron"}
):(0,a.jsx)(k,{
size:14,className:"text-gray-300"}
)}
),(0,a.jsx)("div",{
className:"w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold",style:{
backgroundColor:n?.bg,color:n?.text}
,children:n?.badge}
),(0,a.jsxs)("div",{
className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{
className:"text-sm font-bold text-gray-800 flex items-center gap-2",children:[e.planet,e.isCurrent&&(0,a.jsx)("span",{
className:"text-[9px] bg-primary-saffron text-white px-1.5 py-0.5 rounded-full font-bold",children:"NOW"}
)]}
),(0,a.jsxs)("div",{
className:"text-[10px] text-gray-400",children:[g(e.start)," → ",g(e.end)]}
)]}
),(0,a.jsx)("div",{
className:"text-xs font-medium text-gray-500",children:x(e.start,e.end)}
)]}
),(0,a.jsx)(i.AnimatePresence,{
children:r&&(0,a.jsx)(s.motion.div,{
initial:{
height:0,opacity:0}
,animate:{
height:"auto",opacity:1}
,exit:{
height:0,opacity:0}
,className:"overflow-hidden ml-12 mb-3",children:(0,a.jsxs)("div",{
className:"bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 shadow-sm",children:[(0,a.jsx)("div",{
className:"text-[10px] font-bold text-gray-400 uppercase tracking-widest p-2.5 pl-4",children:"Pratyantar Dashas"}
),o.map(e=>{
let t=c[e.planet];
return(0,a.jsxs)("div",{
className:`flex items-center gap-2 px-4 py-2 text-[11px] ${
e.isCurrent?"bg-yellow-50 font-bold":"text-gray-600"}
`,children:[(0,a.jsx)("div",{
className:"w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold",style:{
backgroundColor:t?.bg,color:t?.text}
,children:t?.badge}
),(0,a.jsx)("span",{
className:"font-bold w-16",children:e.planet}
),(0,a.jsxs)("span",{
className:"flex-1 text-gray-400",children:[g(e.start)," → ",g(e.end)]}
),(0,a.jsx)("span",{
className:"text-gray-400",children:x(e.start,e.end)}
),e.isCurrent&&(0,a.jsx)("span",{
className:"text-[8px] bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full font-bold",children:"NOW"}
)]}
,`prat-${
e.planet}
-${
e.start.getTime()}
`)}
)]}
)}
)}
)]}
,`antar-${
e.planet}
-${
e.start.getTime()}
`)}
)]}
)}
)}
)]}
,`maha-${
t.planet}
-${
t.start.getTime()}
`)}
)}
)]}
),er&&(0,a.jsxs)("div",{
className:"bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",children:[(0,a.jsxs)("div",{
className:"bg-gradient-to-r from-gray-900 to-gray-800 p-5",children:[(0,a.jsxs)("h3",{
className:"text-white font-serif text-lg font-bold flex items-center gap-2",children:["📖 ",er.title]}
),eo&&(0,a.jsxs)("p",{
className:"text-gray-300 text-sm mt-1",children:["Sub-period: ",(0,a.jsx)("span",{
className:"text-yellow-300 font-bold",children:eo.title}
),eo.yoga&&(0,a.jsx)("span",{
className:"ml-2 text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full",children:eo.yoga}
)]}
)]}
),(0,a.jsx)("div",{
className:"flex overflow-x-auto border-b border-gray-100 bg-gray-50/50",children:el.map(e=>(0,a.jsxs)("button",{
className:`flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
L===e.key?"border-primary-red text-primary-red bg-white":"border-transparent text-gray-400 hover:text-gray-600"}
`,onClick:()=>G(e.key),children:[e.icon," ",e.label]}
,e.key))}
),(0,a.jsx)("div",{
className:"p-6",children:(0,a.jsx)(i.AnimatePresence,{
mode:"wait",children:(0,a.jsxs)(s.motion.div,{
initial:{
opacity:0,y:10}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:-10}
,transition:{
duration:.2}
,children:["overview"===L&&(0,a.jsxs)("div",{
className:"space-y-5",children:[(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-wider mb-2",children:"Mahadasha Overview"}
),(0,a.jsx)("p",{
className:"text-gray-700 leading-relaxed text-sm",children:er.overview}
)]}
),(0,a.jsxs)("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{
className:"bg-green-50 rounded-xl p-4 border border-green-100",children:[(0,a.jsx)("h5",{
className:"text-xs font-bold text-green-700 uppercase mb-2",children:"✅ Positive Themes"}
),(0,a.jsx)("p",{
className:"text-xs text-green-800 leading-relaxed",children:er.positive}
)]}
),(0,a.jsxs)("div",{
className:"bg-red-50 rounded-xl p-4 border border-red-100",children:[(0,a.jsx)("h5",{
className:"text-xs font-bold text-red-700 uppercase mb-2",children:"⚠️ Challenges"}
),(0,a.jsx)("p",{
className:"text-xs text-red-800 leading-relaxed",children:er.challenges}
)]}
)]}
),eo&&(0,a.jsxs)("div",{
className:"bg-amber-50 rounded-xl p-4 border border-amber-100 mt-4",children:[(0,a.jsxs)("h5",{
className:"text-xs font-bold text-amber-700 uppercase mb-2",children:["🔸 ",eo.title," — ",eo.theme]}
),(0,a.jsx)("p",{
className:"text-xs text-amber-900 leading-relaxed",children:eo.interpretation}
),(0,a.jsx)("div",{
className:"flex flex-wrap gap-1.5 mt-3",children:eo.keywords.map(e=>(0,a.jsx)("span",{
className:"text-[10px] bg-amber-200/50 text-amber-800 px-2 py-0.5 rounded-full font-medium",children:e}
,e))}
)]}
)]}
),"career"===L&&(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-wider mb-2",children:"Career & Profession"}
),(0,a.jsx)("p",{
className:"text-gray-700 leading-relaxed text-sm",children:er.career}
),eo&&(0,a.jsxs)("div",{
className:"mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100",children:[(0,a.jsxs)("h5",{
className:"text-xs font-bold text-blue-700 uppercase mb-2",children:["During ",en," Antardasha"]}
),(0,a.jsxs)("p",{
className:"text-xs text-blue-800",children:[(0,a.jsx)("strong",{
children:"Favorable:"}
)," ",eo.favorable]}
),(0,a.jsxs)("p",{
className:"text-xs text-blue-800 mt-1",children:[(0,a.jsx)("strong",{
children:"Caution:"}
)," ",eo.caution]}
)]}
)]}
),"health"===L&&(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-wider mb-2",children:"Health & Wellness"}
),(0,a.jsx)("p",{
className:"text-gray-700 leading-relaxed text-sm",children:er.health}
)]}
),"relationships"===L&&(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-wider mb-2",children:"Relationships & Family"}
),(0,a.jsx)("p",{
className:"text-gray-700 leading-relaxed text-sm",children:er.relationships}
)]}
),"spirituality"===L&&(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-wider mb-2",children:"Spirituality & Worship"}
),(0,a.jsx)("p",{
className:"text-gray-700 leading-relaxed text-sm",children:er.spirituality}
)]}
),"remedies"===L&&(0,a.jsxs)("div",{
children:[(0,a.jsx)("h4",{
className:"text-sm font-bold text-primary-red uppercase tracking-wider mb-2",children:"Remedies & Recommendations"}
),(0,a.jsx)("p",{
className:"text-gray-700 leading-relaxed text-sm",children:er.remedies}
)]}
)]}
,L)}
)}
)]}
)]}
)}
var P=e.i(83158),K=e.i(35965);
e.s(["default",0,function(){
let[e,r]=(0,t.useState)(null),[o,l]=(0,t.useState)(null),[d,c]=(0,t.useState)(!1),[u,h]=(0,t.useState)(!0);
return(0,a.jsxs)("div",{
className:"pt-32 pb-20 min-h-screen px-4 md:px-8 bg-white relative",children:[(0,a.jsx)("script",{
type:"application/ld+json",dangerouslySetInnerHTML:{
__html:JSON.stringify({
"@context":"https://schema.org","@type":"SoftwareApplication",name:"Vimshottari Dasha Calculator",applicationCategory:"LifestyleApplication",operatingSystem:"All",offers:{
"@type":"Offer",price:"0",priceCurrency:"USD"}
,description:"Calculate your Vimshottari Dasha timeline, including Mahadasha, Antardasha, and Pratyantardasha periods with detailed interpretations."}
)}
}
),(0,a.jsx)("div",{
className:"absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none"}
),(0,a.jsxs)("div",{
className:"max-w-7xl mx-auto relative z-10",children:[(0,a.jsxs)("div",{
className:"text-center mb-16",children:[(0,a.jsxs)(s.motion.div,{
initial:{
opacity:0,scale:.9}
,animate:{
opacity:1,scale:1}
,className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-saffron/20 shadow-sm text-primary-red text-xs uppercase tracking-widest font-bold mb-6",children:[(0,a.jsx)(K.Sun,{
size:14,className:"text-primary-gold"}
),(0,a.jsx)("span",{
children:"Precise Dasha Periods"}
)]}
),(0,a.jsxs)("h1",{
className:"text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900",children:["Vimshottari ",(0,a.jsx)("span",{
className:"saffron-gradient",children:"Dasha Calculator"}
)]}
),(0,a.jsx)("p",{
className:"text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium",children:"Enter your birth details to generate your complete planetary period analysis. Explore Mahadasha, Antardasha, and Pratyantar periods with detailed life interpretations."}
)]}
),(0,a.jsx)(i.AnimatePresence,{
mode:"wait",children:u?(0,a.jsx)(s.motion.div,{
initial:{
opacity:0,height:0}
,animate:{
opacity:1,height:"auto"}
,exit:{
opacity:0,height:0,overflow:"hidden"}
,className:"max-w-3xl mx-auto mb-20",children:(0,a.jsx)(n.default,{
onGenerate:e=>{
c(!0),r(e),setTimeout(()=>{
try{
let a=(0,P.calculateBirthChart)(e.date,e.time,e.lat,e.lon,"+05:30"),t=a.planetaryDetails.find(e=>"Moon"===e.name)?.longitude;
l(t||0),h(!1)}
catch(e){
console.error("Calculation error:",e),alert("Failed to calculate dasha periods. Please check inputs.")}
finally{
c(!1),setTimeout(()=>{
document.getElementById("dasha-results")?.scrollIntoView({
behavior:"smooth",block:"start"}
)}
,100)}
}
,1500)}
,loading:d}
)}
,"form"):(0,a.jsx)(s.motion.div,{
initial:{
opacity:0}
,animate:{
opacity:1}
,className:"max-w-3xl mx-auto mb-12 text-center",children:(0,a.jsxs)("button",{
onClick:()=>h(!0),className:"px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm flex items-center gap-2 mx-auto",children:[(0,a.jsxs)("svg",{
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
),(0,a.jsx)(i.AnimatePresence,{
children:e&&null!==o&&(0,a.jsxs)(s.motion.div,{
initial:{
opacity:0,y:50}
,animate:{
opacity:1,y:0}
,exit:{
opacity:0,y:50}
,className:"mt-12",id:"dasha-results",children:[(0,a.jsxs)("div",{
className:"mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm",children:[(0,a.jsxs)("h2",{
className:"text-3xl font-serif font-bold text-primary-red",children:[e.name,"'s Dasha Timeline"]}
),(0,a.jsxs)("div",{
className:"flex flex-wrap gap-4 mt-2 text-sm text-gray-600 font-medium",children:[(0,a.jsxs)("span",{
className:"flex items-center gap-1",children:[(0,a.jsx)("span",{
className:"text-primary-saffron",children:"📅"}
)," ",e.date]}
),(0,a.jsxs)("span",{
className:"flex items-center gap-1",children:[(0,a.jsx)("span",{
className:"text-primary-saffron",children:"⏰"}
)," ",e.time]}
),(0,a.jsxs)("span",{
className:"flex items-center gap-1",children:[(0,a.jsx)("span",{
className:"text-primary-saffron",children:"📍"}
)," ",e.place]}
)]}
)]}
),(0,a.jsx)(V,{
birthDate:new Date(`${
e.date}
T${
e.time}
:00+05:30`),moonLongitude:o}
)]}
)}
)]}
)]}
)}
],42163)}
]);
