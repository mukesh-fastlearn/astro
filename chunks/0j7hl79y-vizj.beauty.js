(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,98183,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
)
var n=
assign:function()
return l
,searchParamsToUrlQuery:function()
return a
,urlQueryToSearchParams:function()
return s


for(var o in n)Object.defineProperty(r,o,
enumerable:!0,get:n[o]
)
function a(e)
let t=


for(let[r,n]of e.entries())
let e=t[r]
void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]
return t
function i(e)
return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)
function s(e)
let t=new URLSearchParams
for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,i(e))
else t.set(r,i(n))
return t
function l(e,...t)
for(let r of t)
for(let t of r.keys())e.delete(t)
for(let[t,n]of r.entries())e.append(t,n)
return e

,18967,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
)
var n=
DecodeError:function()
return x
,MiddlewareNotFoundError:function()
return j
,MissingStaticPage:function()
return v
,NormalizeError:function()
return g
,PageNotFoundError:function()
return b
,SP:function()
return m
,ST:function()
return y
,WEB_VITALS:function()
return a
,execOnce:function()
return i
,getDisplayName:function()
return f
,getLocationOrigin:function()
return u
,getURL:function()
return c
,isAbsoluteUrl:function()
return l
,isResSent:function()
return d
,loadGetInitialProps:function()
return h
,normalizeRepeatedSlashes:function()
return p
,stringifyError:function()
return k


for(var o in n)Object.defineProperty(r,o,
enumerable:!0,get:n[o]
)
let a=["CLS","FCP","FID","INP","LCP","TTFB"]
function i(e)
let t,r=!1
return(...n)=>(r||(r=!0,t=e(...n)),t)
let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e)
function u()
let
protocol:e,hostname:t,port:r
=window.location
return`$
e
//$
t
$
r?":"+r:""
`
function c()
let
href:e
=window.location,t=u()
return e.substring(t.length)
function f(e)
return"string"==typeof e?e:e.displayName||e.name||"Unknown"
function d(e)
return e.finished||e.headersSent
function p(e)
let t=e.split("?")
return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?$
t.slice(1).join("?")
`:"")
async function h(e,t)
let r=t.res||t.ctx&&t.ctx.res
if(!e.getInitialProps)return t.ctx&&t.Component?
pageProps:await h(t.Component,t.ctx)
:


let n=await e.getInitialProps(t)
if(r&&d(r))return n
if(!n)throw Object.defineProperty(Error(`"$
f(e)
.getInitialProps()" should resolve to an object. But found "$
n
" instead.`),"__NEXT_ERROR_CODE",
value:"E1025",enumerable:!1,configurable:!0
)
return n
let m="u">typeof performance,y=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e])
class x extends Error

class g extends Error

class b extends Error
constructor(e)
super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: $
e
`

class v extends Error
constructor(e,t)
super(),this.message=`Failed to load static file for page: $
e
 $
t
`

class j extends Error
constructor()
super(),this.code="ENOENT",this.message="Cannot find the middleware module"

function k(e)
return JSON.stringify(
message:e.message,stack:e.stack
)

,33525,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
),Object.defineProperty(r,"warnOnce",
enumerable:!0,get:function()
return n

)
let n=e=>


,96661,e=>
"use strict"
e.s(["mergeClasses",0,(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()])
,71987,88973,e=>
"use strict"
e.s(["default",0,
xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"
],71987),e.s(["hasA11yProp",0,e=>
for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0
return!1
],88973)
,5014,e=>
"use strict"
var t=e.i(71645),r=e.i(71987),n=e.i(88973),o=e.i(96661)
let a=(0,t.createContext)(

),i=(0,t.forwardRef)((
color:e,size:i,strokeWidth:s,absoluteStrokeWidth:l,className:u="",children:c,iconNode:f,...d
,p)=>
let
size:h=24,strokeWidth:m=2,absoluteStrokeWidth:y=!1,color:x="currentColor",className:g=""
=(0,t.useContext)(a)??

,b=l??y?24*Number(s??m)/Number(i??h):s??m
return(0,t.createElement)("svg",
ref:p,...r.default,width:i??h??r.default.width,height:i??h??r.default.height,stroke:e??x,strokeWidth:b,className:(0,o.mergeClasses)("lucide",g,u),...!c&&!(0,n.hasA11yProp)(d)&&
"aria-hidden":"true"
,...d
,[...f.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(c)?c:[c]])
)
e.s(["default",0,i],5014)
,88653,e=>
"use strict"
e.i(47167)
var t=e.i(43476),r=e.i(71645),n=e.i(31178),o=e.i(47414),a=e.i(74008),i=e.i(21476),s=e.i(72846),l=r,u=e.i(37806)
function c(e,t)
if("function"==typeof e)return e(t)
null!=e&&(e.current=t)
class f extends l.Component
getSnapshotBeforeUpdate(e)
let t=this.props.childRef.current
if((0,s.isHTMLElement)(t)&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop)
let e=t.offsetParent,r=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,n=(0,s.isHTMLElement)(e)&&e.offsetHeight||0,o=getComputedStyle(t),a=this.props.sizeRef.current
a.height=parseFloat(o.height),a.width=parseFloat(o.width),a.top=t.offsetTop,a.left=t.offsetLeft,a.right=r-a.width-a.left,a.bottom=n-a.height-a.top
return null
componentDidUpdate()

render()
return this.props.children

function d(
children:e,isPresent:n,anchorX:o,anchorY:a,root:i,pop:s
)
let p=(0,l.useId)(),h=(0,l.useRef)(null),m=(0,l.useRef)(
width:0,height:0,top:0,left:0,right:0,bottom:0
),
nonce:y
=(0,l.useContext)(u.MotionConfigContext),x=function(...e)
return r.useCallback(function(...e)
return t=>
let r=!1,n=e.map(e=>
let n=c(e,t)
return r||"function"!=typeof n||(r=!0),n
)
if(r)return()=>
for(let t=0
t<n.length
t++)
let r=n[t]
"function"==typeof r?r():c(e[t],null)



(...e),e)
(h,e.props?.ref??e?.ref)
return(0,l.useInsertionEffect)(()=>
let
width:e,height:t,top:r,left:l,right:u,bottom:c
=m.current
if(n||!1===s||!h.current||!e||!t)return
let f="left"===o?`left: $
l
`:`right: $
u
`,d="bottom"===a?`bottom: $
c
`:`top: $
r
`
h.current.dataset.motionPopId=p
let x=document.createElement("style")
y&&(x.nonce=y)
let g=i??document.head
return g.appendChild(x),x.sheet&&x.sheet.insertRule(`
          [data-motion-pop-id="$
p
"] 

            position: absolute !important

            width: $
e
px !important

            height: $
t
px !important

            $
f
px !important

            $
d
px !important

          

        `),()=>
h.current?.removeAttribute("data-motion-pop-id"),g.contains(x)&&g.removeChild(x)

,[n]),(0,t.jsx)(f,
isPresent:n,childRef:h,sizeRef:m,pop:s,children:!1===s?e:l.cloneElement(e,
ref:x
)
)
let p=(
children:e,initial:n,isPresent:a,onExitComplete:s,custom:l,presenceAffectsLayout:u,mode:c,anchorX:f,anchorY:p,root:m
)=>
let y=(0,o.useConstant)(h),x=(0,r.useId)(),g=!0,b=(0,r.useMemo)(()=>(g=!1,
id:x,initial:n,isPresent:a,custom:l,onExitComplete:e=>
for(let t of(y.set(e,!0),y.values()))if(!t)return
s&&s()
,register:e=>(y.set(e,!1),()=>y.delete(e))
),[a,y,s])
return u&&g&&(b=
...b
),(0,r.useMemo)(()=>
y.forEach((e,t)=>y.set(t,!1))
,[a]),r.useEffect(()=>
a||y.size||!s||s()
,[a]),e=(0,t.jsx)(d,
pop:"popLayout"===c,isPresent:a,anchorX:f,anchorY:p,root:m,children:e
),(0,t.jsx)(i.PresenceContext.Provider,
value:b,children:e
)

function h()
return new Map
var m=e.i(64978)
let y=e=>e.key||""
function x(e)
let t=[]
return r.Children.forEach(e,e=>
(0,r.isValidElement)(e)&&t.push(e)
),t
e.s(["AnimatePresence",0,(
children:e,custom:i,initial:s=!0,onExitComplete:l,presenceAffectsLayout:u=!0,mode:c="sync",propagate:f=!1,anchorX:d="left",anchorY:h="top",root:g
)=>
let[b,v]=(0,m.usePresence)(f),j=(0,r.useMemo)(()=>x(e),[e]),k=f&&!b?[]:j.map(y),N=(0,r.useRef)(!0),w=(0,r.useRef)(j),C=(0,o.useConstant)(()=>new Map),P=(0,r.useRef)(new Set),[E,S]=(0,r.useState)(j),[M,O]=(0,r.useState)(j)
(0,a.useIsomorphicLayoutEffect)(()=>
N.current=!1,w.current=j
for(let e=0
e<M.length
e++)
let t=y(M[e])
k.includes(t)?(C.delete(t),P.current.delete(t)):!0!==C.get(t)&&C.set(t,!1)

,[M,k.length,k.join("-")])
let _=[]
if(j!==E)
let e=[...j]
for(let t=0
t<M.length
t++)
let r=M[t],n=y(r)
k.includes(n)||(e.splice(t,0,r),_.push(r))
return"wait"===c&&_.length&&(e=_),O(x(e)),S(j),null
let
forceRender:R
=(0,r.useContext)(n.LayoutGroupContext)
return(0,t.jsx)(t.Fragment,
children:M.map(e=>
let r=y(e),n=(!f||!!b)&&(j===M||k.includes(r))
return(0,t.jsx)(p,
isPresent:n,initial:(!N.current||!!s)&&void 0,custom:i,presenceAffectsLayout:u,mode:c,root:g,onExitComplete:n?void 0:()=>
if(P.current.has(r)||!C.has(r))return
P.current.add(r),C.set(r,!0)
let e=!0
C.forEach(t=>
t||(e=!1)
),e&&(R?.(),O(w.current),f&&v?.(),l&&l())
,anchorX:d,anchorY:h,children:e
,r)
)
)
],88653)
,95057,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
)
var n=
formatUrl:function()
return s
,formatWithValidation:function()
return u
,urlObjectKeys:function()
return l


for(var o in n)Object.defineProperty(r,o,
enumerable:!0,get:n[o]
)
let a=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/
function s(e)
let
auth:t,hostname:r
=e,n=e.protocol||"",o=e.pathname||"",s=e.hash||"",l=e.query||"",u=!1
t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[$
r
]`:r),e.port&&(u+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)))
let c=e.search||l&&`?$
l
`||""
return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==u?(u="//"+(u||""),o&&"/"!==o[0]&&(o="/"+o)):u||(u=""),s&&"#"!==s[0]&&(s="#"+s),c&&"?"!==c[0]&&(c="?"+c),o=o.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`$
n
$
u
$
o
$
c
$
s
`
let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"]
function u(e)
return s(e)

,18581,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
),Object.defineProperty(r,"useMergedRef",
enumerable:!0,get:function()
return o

)
let n=e.r(71645)
function o(e,t)
let r=(0,n.useRef)(null),o=(0,n.useRef)(null)
return(0,n.useCallback)(n=>
if(null===n)
let e=r.current
e&&(r.current=null,e())
let t=o.current
t&&(o.current=null,t())
else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))
,[e,t])
function a(e,t)
if("function"!=typeof e)return e.current=t,()=>
e.current=null


let r=e(t)
return"function"==typeof r?r:()=>e(null)

("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",
value:!0
),Object.assign(r.default,r),t.exports=r.default)
,73668,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
),Object.defineProperty(r,"isLocalURL",
enumerable:!0,get:function()
return a

)
let n=e.r(18967),o=e.r(52817)
function a(e)
if(!(0,n.isAbsoluteUrl)(e))return!0
try
let t=(0,n.getLocationOrigin)(),r=new URL(e,t)
return r.origin===t&&(0,o.hasBasePath)(r.pathname)
catch(e)
return!1


,84508,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
),Object.defineProperty(r,"errorOnce",
enumerable:!0,get:function()
return n

)
let n=e=>


,22016,(e,t,r)=>
"use strict"
Object.defineProperty(r,"__esModule",
value:!0
)
var n=
default:function()
return x
,useLinkStatus:function()
return b


for(var o in n)Object.defineProperty(r,o,
enumerable:!0,get:n[o]
)
let a=e.r(90809),i=e.r(43476),s=a._(e.r(71645)),l=e.r(95057),u=e.r(8372),c=e.r(18581),f=e.r(18967),d=e.r(5550)
e.r(33525)
let p=e.r(88540),h=e.r(91949),m=e.r(73668),y=e.r(9396)
function x(t)
var r,n
let o,a,x,[b,v]=(0,s.useOptimistic)(h.IDLE_LINK_STATUS),j=(0,s.useRef)(null),
href:k,as:N,children:w,prefetch:C=null,passHref:P,replace:E,shallow:S,scroll:M,onClick:O,onMouseEnter:_,onTouchStart:R,legacyBehavior:T=!1,onNavigate:L,transitionTypes:A,ref:$,unstable_dynamicOnHover:I,...U
=t
o=w,T&&("string"==typeof o||"number"==typeof o)&&(o=(0,i.jsx)("a",
children:o
))
let F=s.default.useContext(u.AppRouterContext),z=!1!==C,B=!1!==C?null===(n=C)||"auto"===n?y.FetchStrategy.PPR:y.FetchStrategy.Full:y.FetchStrategy.PPR,D="string"==typeof(r=N||k)?r:(0,l.formatUrl)(r)
if(T)
if(o?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",
value:"E863",enumerable:!1,configurable:!0
)
a=s.default.Children.only(o)
let K=T?a&&"object"==typeof a&&a.ref:$,W=s.default.useCallback(e=>(null!==F&&(j.current=(0,h.mountLinkInstance)(e,D,F,B,z,v)),()=>
j.current&&((0,h.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,h.unmountPrefetchableInstance)(e)
),[z,D,F,B,v]),G=
ref:(0,c.useMergedRef)(W,K),onClick(t)
T||"function"!=typeof O||O(t),T&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!F||t.defaultPrevented||function(t,r,n,o,a,i,l)
if("u">typeof window)
let u,
nodeName:c
=t.currentTarget
if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return
if(!(0,m.isLocalURL)(r))
o&&(t.preventDefault(),location.replace(r))
return
if(t.preventDefault(),i)
let e=!1
if(i(
preventDefault:()=>
e=!0

),e)return
let
dispatchNavigateAction:f
=e.r(99781)
s.default.startTransition(()=>
f(r,o?"replace":"push",!1===a?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,l)
)

(t,D,j,E,M,L,A)
,onMouseEnter(e)
T||"function"!=typeof _||_(e),T&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),F&&z&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)
,onTouchStart:function(e)
T||"function"!=typeof R||R(e),T&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),F&&z&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)


return(0,f.isAbsoluteUrl)(D)?G.href=D:T&&!P&&("a"!==a.type||"href"in a.props)||(G.href=(0,d.addBasePath)(D)),x=T?s.default.cloneElement(a,G):(0,i.jsx)("a",
...U,...G,children:o
),(0,i.jsx)(g.Provider,
value:b,children:x
)
e.r(84508)
let g=(0,s.createContext)(h.IDLE_LINK_STATUS),b=()=>(0,s.useContext)(g)
("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",
value:!0
),Object.assign(r.default,r),t.exports=r.default)
,35965,e=>
"use strict"
let t=(0,e.i(56420).default)("sun",[["circle",
cx:"12",cy:"12",r:"4",key:"4exip2"
],["path",
d:"M12 2v2",key:"tus03m"
],["path",
d:"M12 20v2",key:"1lh1kg"
],["path",
d:"m4.93 4.93 1.41 1.41",key:"149t6j"
],["path",
d:"m17.66 17.66 1.41 1.41",key:"ptbguv"
],["path",
d:"M2 12h2",key:"1t8f8n"
],["path",
d:"M20 12h2",key:"1q8mjw"
],["path",
d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"
],["path",
d:"m19.07 4.93-1.41 1.41",key:"1shlcs"
]])
e.s(["Sun",0,t],35965)
,18566,(e,t,r)=>
t.exports=e.r(76562)
,62319,e=>
"use strict"
var t=e.i(43476),r=e.i(71645),n=e.i(22016),o=e.i(18566),a=e.i(56420)
let i=(0,a.default)("menu",[["path",
d:"M4 5h16",key:"1tepv9"
],["path",
d:"M4 12h16",key:"1lakjw"
],["path",
d:"M4 19h16",key:"1djgab"
]]),s=(0,a.default)("x",[["path",
d:"M18 6 6 18",key:"1bl5f8"
],["path",
d:"m6 6 12 12",key:"d8bk6v"
]])
var l=e.i(35965),u=e.i(46932),c=e.i(88653),f=e.i(47163)
e.s(["default",0,()=>
let[e,a]=(0,r.useState)(!1),[d,p]=(0,r.useState)(!1),h=(0,o.usePathname)()
return(0,r.useEffect)(()=>
let e=()=>
p(window.scrollY>20)

return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)
,[]),(0,t.jsxs)("nav",
className:(0,f.cn)("fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8",d?"py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-primary-saffron/10":"py-6 bg-transparent"),children:[(0,t.jsxs)("div",
className:"max-w-7xl mx-auto flex justify-between items-center",children:[(0,t.jsxs)(n.default,
href:"/",className:"flex items-center gap-2 group",children:[(0,t.jsx)("div",
className:"relative",children:(0,t.jsx)(l.Sun,
className:"w-8 h-8 text-primary-saffron fill-primary-gold animate-spin-slow"
)
),(0,t.jsxs)("div",
className:"flex flex-col",children:[(0,t.jsx)("span",
className:"font-serif text-2xl font-bold text-primary-red tracking-tight leading-none",children:"Shri Govind"
),(0,t.jsx)("span",
className:"font-sans text-[10px] font-bold text-primary-saffron uppercase tracking-widest leading-none mt-1",children:"Vedic Astrology"
)]
)]
),(0,t.jsxs)("div",
className:"hidden md:flex items-center gap-8",children:[(0,t.jsx)(n.default,
href:"/",className:(0,f.cn)("text-sm font-bold transition-colors hover:text-primary-saffron","/"===h?"text-primary-red":"text-gray-700"),children:"Home"
),(0,t.jsxs)("div",
className:"relative group",children:[(0,t.jsxs)("button",
className:"text-sm font-bold text-gray-700 hover:text-primary-saffron py-2",children:["Free Tools ",(0,t.jsx)("span",
className:"text-xs",children:"▼"
)]
),(0,t.jsxs)("div",
className:"absolute top-full left-0 w-56 bg-white shadow-xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0",children:[(0,t.jsx)(n.default,
href:"/free-kundli-tamil",className:"px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors border-b border-gray-50",children:"Free Kundli"
),(0,t.jsx)(n.default,
href:"/marriage-prediction",className:"px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors border-b border-gray-50",children:"Marriage Prediction"
),(0,t.jsx)(n.default,
href:"/dasha-timeline",className:"px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors border-b border-gray-50",children:"Vimshottari Dasha"
),(0,t.jsx)(n.default,
href:"/kundli-matching",className:"px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors border-b border-gray-50",children:"Guna Milan (Matchmaking)"
),(0,t.jsx)(n.default,
href:"/numerology",className:"px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors border-b border-gray-50",children:"Numerology Calculator"
),(0,t.jsx)(n.default,
href:"/zodiac-details",className:"px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors",children:"Zodiac Insights"
)]
)]
),(0,t.jsx)(n.default,
href:"/services",className:(0,f.cn)("text-sm font-bold transition-colors hover:text-primary-saffron","/services"===h?"text-primary-red":"text-gray-700"),children:"Services"
),(0,t.jsx)(n.default,
href:"/tamil-astrologer",className:(0,f.cn)("text-sm font-bold transition-colors hover:text-primary-saffron","/tamil-astrologer"===h?"text-primary-red":"text-gray-700"),children:"About Panditji"
),(0,t.jsx)(n.default,
href:"/contact",className:(0,f.cn)("text-sm font-bold transition-colors hover:text-primary-saffron","/contact"===h?"text-primary-red":"text-gray-700"),children:"Contact"
),(0,t.jsx)(n.default,
href:"/free-kundli-tamil",className:"px-6 py-2.5 saffron-button font-bold rounded-full text-sm uppercase tracking-widest shadow-md ml-2",children:"Get Kundli"
)]
),(0,t.jsx)("button",
className:"md:hidden text-primary-red p-2",onClick:()=>a(!e),children:e?(0,t.jsx)(s,
size:28
):(0,t.jsx)(i,
size:28
)
)]
),(0,t.jsx)(c.AnimatePresence,
children:e&&(0,t.jsxs)(u.motion.div,
initial:
opacity:0,y:-20
,animate:
opacity:1,y:0
,exit:
opacity:0,y:-20
,className:"absolute top-full left-0 w-full bg-white shadow-xl border-t border-primary-saffron/10 p-6 md:hidden flex flex-col gap-2 max-h-[80vh] overflow-y-auto",children:[(0,t.jsx)(n.default,
href:"/",onClick:()=>a(!1),className:"text-lg font-bold py-2 border-b border-gray-50 text-gray-700",children:"Home"
),(0,t.jsxs)("div",
className:"py-2 border-b border-gray-50",children:[(0,t.jsx)("p",
className:"text-xs font-bold text-primary-saffron uppercase tracking-widest mb-3",children:"Free Tools"
),(0,t.jsxs)("div",
className:"flex flex-col gap-3 pl-4 border-l-2 border-orange-100",children:[(0,t.jsx)(n.default,
href:"/free-kundli-tamil",onClick:()=>a(!1),className:"text-base font-bold text-gray-700",children:"Free Kundli"
),(0,t.jsx)(n.default,
href:"/marriage-prediction",onClick:()=>a(!1),className:"text-base font-bold text-gray-700",children:"Marriage Prediction"
),(0,t.jsx)(n.default,
href:"/dasha-timeline",onClick:()=>a(!1),className:"text-base font-bold text-gray-700",children:"Vimshottari Dasha"
),(0,t.jsx)(n.default,
href:"/kundli-matching",onClick:()=>a(!1),className:"text-base font-bold text-gray-700",children:"Guna Milan (Matchmaking)"
),(0,t.jsx)(n.default,
href:"/numerology",onClick:()=>a(!1),className:"text-base font-bold text-gray-700",children:"Numerology Calculator"
),(0,t.jsx)(n.default,
href:"/zodiac-details",onClick:()=>a(!1),className:"text-base font-bold text-gray-700",children:"Zodiac Insights"
)]
)]
),(0,t.jsx)(n.default,
href:"/services",onClick:()=>a(!1),className:"text-lg font-bold py-2 border-b border-gray-50 text-gray-700",children:"Services"
),(0,t.jsx)(n.default,
href:"/tamil-astrologer",onClick:()=>a(!1),className:"text-lg font-bold py-2 border-b border-gray-50 text-gray-700",children:"About Panditji"
),(0,t.jsx)(n.default,
href:"/contact",onClick:()=>a(!1),className:"text-lg font-bold py-2 text-gray-700",children:"Contact"
),(0,t.jsx)(n.default,
href:"/free-kundli-tamil",onClick:()=>a(!1),className:"mt-4 px-6 py-3 saffron-button font-bold rounded-xl text-center uppercase tracking-widest",children:"Get Free Kundli"
)]
)
)]
)
],62319)
])
