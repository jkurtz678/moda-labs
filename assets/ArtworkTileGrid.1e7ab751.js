import{d as z,P as N,Q as O,r as T,o as y,h as w,F as I,I as j,M as D,f as m,S as q,j as H,t as F,T as P,U as Q,m as Y,z as J,_ as G,L as K,k as L,c as R,i as E,w as X,p as Z,l as ee}from"./index.1f113528.js";import{u as te}from"./thumbnail-image.365c5389.js";import{u as ne}from"./token-meta.9fe5110e.js";import"./types.6a5ef88e.js";import"./firebaseConfig.d7a6b5a9.js";import"./token-meta.2d60a689.js";import"./account.721bb0ac.js";import"./util.b76cc1a7.js";const oe={columnWidth:400,gap:0,keyMapper:(n,s,c,l)=>l,minColumns:1,maxColumns:void 0,rtl:!1,scrollContainer:null,ssrColumns:0};function ae({columns:n,columnWidth:s,emit:c,gap:l,items:i,maxColumns:d,minColumns:v,nextTick:g,onBeforeUnmount:r,onMounted:a,rtl:o,scrollContainer:_,ssrColumns:h,vue:B,wall:k,watch:M}){function $(t,e,u,x){const C=S(u);return x+e+C<=t?$(t,e,u+1,x+e+C):u}function S(t){const e=Array.isArray(s.value)?s.value:[s.value];return e[t%e.length]}function p(){const t=$(k.value.getBoundingClientRect().width,l.value,0,-l.value),e=b(f(t));return e>0?e:1}function f(t){const e=d==null?void 0:d.value;return e&&t>e?e:t}function b(t){const e=v==null?void 0:v.value;return e&&t<e?e:t}function U(t){return[...new Array(t)].map(()=>[])}if(h.value>0){const t=U(h.value);i.value.forEach((e,u)=>t[u%h.value].push(u)),n.value=t}async function V(t){if(t>=i.value.length)return;await g();const e=[...k.value.children];o.value&&e.reverse();const u=e.reduce((x,C)=>C.getBoundingClientRect().height<x.getBoundingClientRect().height?C:x);n.value[+u.dataset.index].push(t),await V(t+1)}async function A(t=!1){if(n.value.length===p()&&!t){c(B===2?"redraw-skip":"redrawSkip");return}n.value=U(p());const e=_==null?void 0:_.value,u=e?e.scrollTop:window.scrollY;await V(0),e?e.scrollBy({top:u-e.scrollTop}):window.scrollTo({top:u}),c("redraw")}const W=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>A());return a(()=>{A(),W==null||W.observe(k.value)}),r(()=>W==null?void 0:W.unobserve(k.value)),M([i,o],()=>A(!0)),M([s,l,v,d],()=>A()),{getColumnWidthTarget:S}}const se=["data-index"],re=z({__name:"masonry-wall",props:N({columnWidth:{},items:{},gap:{},rtl:{type:Boolean},ssrColumns:{},scrollContainer:{},minColumns:{},maxColumns:{},keyMapper:{type:Function}},oe),emits:["redraw","redrawSkip"],setup(n,{emit:s}){const c=n,{columnWidth:l,items:i,gap:d,rtl:v,ssrColumns:g,scrollContainer:r,minColumns:a,maxColumns:o,keyMapper:_}=O(c),h=T([]),B=T(),{getColumnWidthTarget:k}=ae({columns:h,columnWidth:l,emit:s,gap:d,items:i,keyMapper:_,maxColumns:o,minColumns:a,nextTick:P,onBeforeUnmount:Q,onMounted:Y,rtl:v,scrollContainer:r,ssrColumns:g,vue:3,wall:B,watch:J});return(M,$)=>(y(),w("div",{ref_key:"wall",ref:B,class:"masonry-wall",style:D({display:"flex",gap:`${m(d)}px`})},[(y(!0),w(I,null,j(h.value,(S,p)=>(y(),w("div",{key:p,class:"masonry-column","data-index":p,style:D({display:"flex","flex-basis":`${m(k)(p)}px`,"flex-direction":"column","flex-grow":1,gap:`${m(d)}px`,height:["-webkit-max-content","-moz-max-content","max-content"],"min-width":0})},[(y(!0),w(I,null,j(S,(f,b)=>(y(),w("div",{key:m(_)(m(i)[f],p,b,f),class:"masonry-item"},[q(M.$slots,"default",{item:m(i)[f],column:p,row:b,index:f},()=>[H(F(m(i)[f]),1)])]))),128))],12,se))),128))],4))}}),le=(()=>{const n=re;return n.install=s=>{s.component("MasonryWall",n)},n})();const ie={class:"custom-card"},ue={class:"content"},ce=["src"],me=z({__name:"ArtworkTile",props:{token_meta:null},setup(n){const c=te(K(n,"token_meta"));return(l,i)=>(y(),w("div",ie,[L("div",ue,F(`${n.token_meta.entity.name} | ${n.token_meta.entity.artist}`),1),L("img",{src:m(c)},null,8,ce)]))}});var de=G(me,[["__scopeId","data-v-ee2088be"]]);const _e=n=>(Z("data-v-53de5d32"),n=n(),ee(),n),pe=_e(()=>L("div",{class:"tile-grid"},null,-1)),ve=z({__name:"ArtworkTileGrid",setup(n){const s=ne(),c=T(""),l=T(localStorage.getItem("token_list_sort_order")||"name"),i=T(10),d=R(()=>s.sorted_all_token_metas),v=R(()=>{let r=d.value.filter(a=>{var o,_;return((o=a.entity.artist)==null?void 0:o.toLowerCase().includes(c.value.toLowerCase()))||((_=a.entity.name)==null?void 0:_.toLowerCase().includes(c.value.toLowerCase()))});return l.value==="name"?r=r.sort((a,o)=>a.entity.name.localeCompare(o.entity.name)):l.value==="created_at"&&(r=r.sort((a,o)=>a.entity.created_at==null&&o.entity.created_at==null?0:a.entity.created_at==null?1:o.entity.created_at==null?-1:o.entity.created_at.seconds-a.entity.created_at.seconds)),r}),g=R(()=>{const r=v.value,a=0,o=a+i.value;return r.slice(a,o)});return(r,a)=>(y(),w(I,null,[E(m(le),{items:m(g),"column-width":250,gap:16},{default:X(({item:o})=>[E(de,{token_meta:o},null,8,["token_meta"])]),_:1},8,["items"]),pe],64))}});var Te=G(ve,[["__scopeId","data-v-53de5d32"]]);export{Te as default};
