import{b as T}from"./token-meta.8015aff1.js";import{s as x}from"./util.ea09f40b.js";import{b as z}from"./thumbnail-image.16bb1d4f.js";import{p as G}from"./types.4ea69ea7.js";import{r as d,p as b,d as I,J as M,m as B,z as N,h as l,i as u,u as v,g as w,t as f,e as L,b as F,o as s,_ as O,c,E as R,F as $,H as E,a as S}from"./index.2c0cc940.js";import{e as V,f as H}from"./gallery-token.c4aa5fe8.js";import"./firebaseConfig.4d01e9b5.js";function J(h="200% 0px"){const n=d(!1);let r=null;const _=()=>{r=new IntersectionObserver(a=>{a.forEach(i=>{i.isIntersecting&&(n.value=!0,r==null||r.disconnect())})},{rootMargin:h,threshold:0})},p=a=>{!a||(r&&r.disconnect(),_(),r==null||r.observe(a))};return b(()=>{r==null||r.disconnect(),r=null}),{isIntersecting:n,observe:p}}const U={style:{display:"flex","border-radius":"18px","flex-grow":"1"}},j=["src"],q={style:{"font-weight":"bold","overflow-wrap":"break-word"}},K={style:{"min-height":"24px"}},P=I({__name:"CatalogArtTile",props:{token_meta:{}},setup(h){L();const n=F(),r=h,_=z(M(r,"token_meta")),{isIntersecting:p,observe:a}=J("200% 0px"),i=d(null);return B(()=>{i.value?a(i.value):N(i,m=>{m&&a(m)},{immediate:!0})}),(m,y)=>(s(),l("div",{class:"tile-container",style:{margin:"12px",width:"340px"},onClick:y[0]||(y[0]=C=>v(n).push({name:"actions",params:{token_meta_id:r.token_meta.id}}))},[u("div",{style:{display:"flex","flex-direction":"column",height:"100%"},ref_key:"tile",ref:i},[u("div",U,[v(p)?(s(),l("img",{key:0,src:v(_)},null,8,j)):w("",!0)]),u("h2",q,f(r.token_meta.entity.name),1),u("div",K,f(v(G)(r.token_meta)),1)],512)]))}});var Q=O(P,[["__scopeId","data-v-4938de04"]]);const W={key:0},X={style:{"font-weight":"bold","font-size":"2.8em","padding-top":"1.5em"}},Y={key:0,style:{"white-space":"pre-wrap"}},Z={key:1},ee={style:{"font-weight":"bold","font-size":"2.8em",padding:"48px 0px 24px 0px"}},te={style:{display:"flex",margin:"-12px","flex-wrap":"wrap"}},ue=I({__name:"CatalogGalleryDetail",setup(h){const n=L();n.params.gallery_id;const r=d([]),_=d([]),p=d(),a=d(),i={},m=c(()=>{if(!n.params.gallery_id||typeof n.params.gallery_id!="string"){console.log("failed to get gallery id from params");return}return i[n.params.gallery_id]});c(()=>r.value.map(e=>({name:e.entity.name,artist:e.entity.artist,price:e.entity.price,price_unit:e.entity.price_unit})).sort((e,t)=>!(e!=null&&e.artist)||!(t!=null&&t.artist)?0:e.artist.localeCompare(t.artist)));const y=c(()=>Array.from(new Set(r.value.map(e=>e.entity.artist||""))).sort((e,t)=>e.localeCompare(t))),C=c(()=>r.value.reduce((e,t)=>(t.entity.artist&&(e[t.entity.artist]||(e[t.entity.artist]=[]),e[t.entity.artist].push(t)),e),{})),A=c(()=>r.value.reduce((e,t)=>(e[t.id]=t,e),{}));return c(()=>_.value.map(e=>{var o,g;const t=A.value[e.entity.token_meta_id];return{bidding_name:e.entity.bidding_name,email:e.entity.email,phone_number:e.entity.phone_number,amount:e.entity.amount,amount_unit:e.entity.amount_unit,artist_name:(o=t==null?void 0:t.entity)==null?void 0:o.artist,artwork_name:(g=t==null?void 0:t.entity)==null?void 0:g.name}}).sort((e,t)=>!(e!=null&&e.artwork_name)||!(t!=null&&t.artwork_name)?0:e.artwork_name.localeCompare(t.artwork_name))),B(async()=>{if(!n.params.gallery_id||typeof n.params.gallery_id!="string"){console.log("failed to get gallery id from params");return}a.value=R.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),V(n.params.gallery_id).then(e=>{const t=e.map(o=>o.entity.token_meta_id);return T(t).then(o=>{console.log("token_metas",r),r.value=o}).catch(o=>{x(`Error fetching token metas: ${o}`)}).finally(()=>{a.value.close()})}).catch(e=>{x(`Error fetching token metas: ${e}`)}),H(n.params.gallery_id).then(e=>{console.log("gallery",e),p.value=e}).catch(e=>{x(`Error fetching gallery: ${e}`)})}),(e,t)=>{var o,g;return(o=a.value)!=null&&o.visible?w("",!0):(s(),l("div",W,[u("h1",X,f((g=p.value)==null?void 0:g.entity.name),1),m.value?(s(),l("div",Y,f(m.value),1)):w("",!0),y.value.length==0?(s(),l("div",Z,t[0]||(t[0]=[u("h1",{style:{"font-weight":"bold","font-size":"2.8em",padding:"48px 0px 24px 0px"}},"No Artworks",-1)]))):(s(!0),l($,{key:2},E(y.value,k=>(s(),l("div",{key:k,style:{margin:"20px 0px"}},[u("h1",ee,f(k),1),u("div",te,[(s(!0),l($,null,E(C.value[k],D=>(s(),S(Q,{token_meta:D},null,8,["token_meta"]))),256))])]))),128))]))}}});export{ue as default};
