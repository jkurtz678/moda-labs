import{d as J,P as ae,r as z,Q as re,S as se,m as Z,z as ee,T as ie,o as i,h as f,F as N,H as Q,n as I,u as E,U as ue,k as q,t as D,J as ce,c as L,i as h,l as U,j as _,w as S,V as P,a as W,g as O,b as te,f as G,_ as ne,y as de,x as Y,I as me}from"./index.fafd80d6.js";import{a as pe}from"./thumbnail-image.6e877545.js";import{c as _e,d as fe}from"./types.903c99bc.js";import{s as ve,m as ke}from"./util.12e35da2.js";import{u as ye}from"./account.4055b6d2.js";import{f as he}from"./token-meta.3b6b8610.js";import{u as oe}from"./gallery.0b7e1276.js";import{u as le}from"./breakpoints.a476857d.js";import{u as ge}from"./token-meta.c84cbf36.js";import{A as we}from"./ArtworkFilters.6d6f2a15.js";import"./firebaseConfig.4d01e9b5.js";import"./gallery-token.7f50acd9.js";import"./plaque.8504afc8.js";import"./plaque.9bc68070.js";const xe={columnWidth:400,gap:0,keyMapper:(d,m,n,v)=>v,minColumns:1,maxColumns:void 0,rtl:!1,scrollContainer:null,ssrColumns:0};function be({columns:d,columnWidth:m,emit:n,gap:v,items:l,maxColumns:p,minColumns:a,nextTick:x,onBeforeUnmount:A,onMounted:g,rtl:y,scrollContainer:b,ssrColumns:R,vue:s,wall:r,watch:C}){function B(o,t,c,V){const F=H(c);return V+t+F<=o?B(o,t,c+1,V+t+F):c}function H(o){const t=Array.isArray(m.value)?m.value:[m.value];return t[o%t.length]}function w(){const o=B(r.value.getBoundingClientRect().width,v.value,0,-v.value),t=e(j(o));return t>0?t:1}function j(o){const t=p==null?void 0:p.value;return t&&o>t?t:o}function e(o){const t=a==null?void 0:a.value;return t&&o<t?t:o}function T(o){return Array.from({length:o}).map(()=>[])}if(R.value>0){const o=T(R.value);l.value.forEach((t,c)=>o[c%R.value].push(c)),d.value=o}async function u(o){if(o>=l.value.length)return;await x();const t=[...r.value.children];y.value&&t.reverse();const c=t.reduce((V,F)=>F.getBoundingClientRect().height<V.getBoundingClientRect().height?F:V);d.value[+c.dataset.index].push(o),await u(o+1)}async function k(o=!1){if(d.value.length===w()&&!o){n(s===2?"redraw-skip":"redrawSkip");return}d.value=T(w());const t=b==null?void 0:b.value,c=t?t.scrollTop:window.scrollY;await u(0),t?t.scrollBy({top:c-t.scrollTop}):window.scrollTo({top:c}),n("redraw")}const M=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>k());return g(()=>{k(),M==null||M.observe(r.value)}),A(()=>M==null?void 0:M.unobserve(r.value)),C([l,y],()=>k(!0)),C([m,v,a,p],()=>k()),{getColumnWidthTarget:H}}const Ce=["data-index"],Te=J({__name:"masonry-wall",props:ae({columnWidth:{},items:{},gap:{},rtl:{type:Boolean},ssrColumns:{},scrollContainer:{},minColumns:{},maxColumns:{},keyMapper:{type:Function}},xe),emits:["redraw","redrawSkip"],setup(d,{emit:m}){const n=d,v=z([]),l=z(),{getColumnWidthTarget:p}=be({columns:v,emit:m,nextTick:re,onBeforeUnmount:se,onMounted:Z,vue:3,wall:l,watch:ee,...ie(n)});return(a,x)=>(i(),f("div",{ref_key:"wall",ref:l,class:"masonry-wall",style:I({display:"flex",gap:`${a.gap}px`})},[(i(!0),f(N,null,Q(v.value,(A,g)=>(i(),f("div",{key:g,class:"masonry-column","data-index":g,style:I({display:"flex","flex-basis":`${E(p)(g)}px`,"flex-direction":"column","flex-grow":1,gap:`${a.gap}px`,height:["-webkit-max-content","-moz-max-content","max-content"],"min-width":0})},[(i(!0),f(N,null,Q(A,(y,b)=>(i(),f("div",{key:a.keyMapper(a.items[y],g,b,y),class:"masonry-item"},[ue(a.$slots,"default",{item:a.items[y],column:g,row:b,index:y},()=>[q(D(a.items[y]),1)])]))),128))],12,Ce))),128))],4))}}),Ee=(()=>{const d=Te;return d.install=m=>{m.component("MasonryWall",d)},d})();const ze=["src"],Ae={class:"header"},Be={class:"platform"},Me={style:{"font-size":"1.6em","font-weight":"bold"}},De={key:1,style:{"font-weight":"bold"}},Se={key:2,style:{display:"flex","align-items":"center"}},$e={key:2,style:{"font-size":"0.8em","padding-left":"1em",color:"#606266"}},Re={key:3,style:{height:"32px"}},He={style:{"font-size":"0.9em","line-height":"1.3em"}},Ve={style:{margin:"10px 0px"}},Fe=J({__name:"ArtworkTile",props:{token_meta:{},column_width:{}},setup(d){const m=te(),n=d,v=pe(ce(n,"token_meta")),l=z(!1),p=z(0),a=z(),x=z(),A=ye(),g=oe(),{screen_type:y}=le(),b=L(()=>n.token_meta.entity.browser_media_url?"External Generative":_e(n.token_meta.entity.platform)),R=async()=>{let e;if(n.token_meta.entity.browser_media_url?e=n.token_meta.entity.browser_media_url:e=await fe(n.token_meta),!e){ve("Error getting source file");return}window.open(e,"_blank")},s=L(()=>n.token_meta.entity.aspect_ratio?n.column_width/n.token_meta.entity.aspect_ratio:n.column_width),r=L(()=>{var T,u;const e=(u=(T=n.token_meta)==null?void 0:T.entity)==null?void 0:u.media_size;return e?ke(e):""}),C=()=>{const e=m.resolve({name:"preview-plaque",params:{token_meta_id:n.token_meta.id}});window.open(e.href)},B=()=>{window.open(n.token_meta.entity.public_link,"_blank")},H=()=>{window.open(n.token_meta.entity.artist_social_link,"_blank")};function w(){if(!a.value){console.log("animateDivHeight - error finding tile container");return}if(!l.value&&p.value==0&&(p.value=a.value.offsetHeight),l.value=!l.value,!x.value){console.log("animateDivHeight - error finding detail container");return}let e;l.value&&x.value.offsetHeight>p.value?e=x.value.offsetHeight:e=p.value;const T=300,u=10,k=a.value.offsetHeight,M=Math.ceil(e-k),o=Math.ceil(T/u),t=M/o;let c=0;const V=setInterval(()=>{if(c>=o){a.value.style.height=e+"px",clearInterval(V);return}c++;const F=k+t*c;a.value.style.height=F+"px"},u)}const j=()=>{de.prompt(`Are you sure you want to delete ${n.token_meta.entity.name}? Please type the word 'DELETE' to proceed.`,"Delete Artwork",{confirmButtonText:"Delete",cancelButtonText:"Cancel",inputPattern:/^DELETE$/i,inputErrorMessage:"Please enter the word DELETE to confirm."}).then(({value:e})=>{if(e)return he(n.token_meta.id)}).then(()=>{Y({message:"Artwork deleted",type:"success",showClose:!0,duration:12e3})}).catch(e=>{Y({message:`Error deleting artwork - ${e}`,type:"error",showClose:!0,duration:12e3})})};return(e,T)=>{const u=G("el-button"),k=G("el-tooltip");return i(),f("div",{ref_key:"tile_container",ref:a,class:"custom-card",onClick:w,style:I(`height: ${s.value}px !important`)},[h("img",{class:U(l.value?"absolute":""),src:E(v)},null,10,ze),h("div",{class:U([l.value?"show-blur":"hide-blur","absolute overlay transition"])},null,2),h("div",{class:U(["transition absolute",l.value?"hide-blur":"show-blur"])},[h("div",Ae,D(`${e.token_meta.entity.name} | ${e.token_meta.entity.artist}`),1),h("div",Be,D(b.value),1)],2),h("div",{ref_key:"detail_container",ref:x,class:U(["detail-container transition",l.value?"show-blur":"hide-blur"])},[h("div",Me,D(e.token_meta.entity.name),1),e.token_meta.entity.artist_social_link?(i(),f("div",{key:0,style:I(E(y)=="xs"?"display: flex; justify-content: center;":"")},[_(u,{link:"",style:{"font-weight":"bold",display:"block"},disabled:!l.value,onClick:P(H,["stop"])},{default:S(()=>[q(D(e.token_meta.entity.artist),1)]),_:1},8,["disabled"])],4)):(i(),f("div",De,D(e.token_meta.entity.artist),1)),l.value?(i(),f("div",Se,[_(k,{class:"box-item",effect:"dark",content:"Edit art data",placement:"top"},{default:S(()=>[_(u,{icon:"Edit",text:"",circle:"",size:"large",onClick:T[0]||(T[0]=P(M=>E(m).push({name:"edit-artwork",params:{token_meta_id:n.token_meta.id}}),["stop"]))})]),_:1}),_(k,{class:"box-item",effect:"dark",content:"View art",placement:"top"},{default:S(()=>[_(u,{icon:"PictureFilled",text:"",circle:"",onClick:P(R,["stop"]),size:"large"})]),_:1}),_(k,{class:"box-item",effect:"dark",content:"Preview plaque",placement:"top"},{default:S(()=>[_(u,{icon:"Tickets",text:"",circle:"",onClick:P(C,["stop"]),size:"large"})]),_:1}),e.token_meta.entity.public_link?(i(),W(k,{key:0,class:"box-item",effect:"dark",content:"QR Code Link",placement:"top"},{default:S(()=>[_(u,{icon:"Link",text:"",circle:"",onClick:P(B,["stop"]),size:"large"})]),_:1})):O("",!0),E(A).is_user_admin?(i(),W(k,{key:1,class:"box-item",effect:"dark",content:"Delete Artwork",placement:"top"},{default:S(()=>[_(u,{icon:"Delete",text:"",circle:"",onClick:P(j,["stop"]),size:"large"})]),_:1})):O("",!0),r.value?(i(),f("span",$e,D(r.value),1)):O("",!0)])):(i(),f("div",Re)),h("div",He,D(e.token_meta.entity.description),1),h("div",Ve,[(i(!0),f(N,null,Q(E(g).token_id_to_gallery_map.get(n.token_meta.id),M=>(i(),W(u,{size:"small",round:"",plain:"",type:"primary",style:{margin:"3px 10px 3px 0px"}},{default:S(()=>[q(D(M.entity.name),1)]),_:2},1024))),256))])],2)],4)}}});var Le=ne(Fe,[["__scopeId","data-v-7bf04a1f"]]);const Pe={key:1,style:{padding:"1em"}},K=30,X=250,$=10,Ie=J({__name:"ArtworkTileGrid",setup(d){const m=te(),n=ge();oe();const v=z(null),l=z(K),p=z([]),a=z("");ee(a,s=>{l.value=K});const{screen_type:x}=le(),A=L(()=>{switch(x.value){case"xs":return 340-$*2;case"sm":return 650-$*2;case"md":return 960-$*2;case"lg":return 1200-$*2;case"xl":return 1700-$*2}return 0}),g=L(()=>{let s=Math.floor(A.value/(X+$));return s>5&&(s=5),(A.value-(s-1)*$)/s}),y=L(()=>n.sorted_all_token_metas),b=L(()=>{const s=p.value,r=0,C=r+l.value;return s.slice(r,C)});Z(()=>{const s=document.getElementById("masonry-container");if(!s){console.log("ArtworkTileGrid error, masonary_wall element not found");return}s.addEventListener("scroll",()=>{const r=s.scrollTop,C=s.scrollHeight,B=s.clientHeight;r/(C-B)*100>90&&l.value<p.value.length&&(l.value=l.value+20)})});const R=s=>{console.log("updateFilteredTokens",s),p.value=s};return(s,r)=>{const C=G("el-input"),B=G("el-button"),H=G("RouterView");return i(),f(N,null,[h("div",{class:"subheader",style:I([{display:"flex","align-items":"center"},E(x)=="xs"?"padding: 0px 8px 10px;":""])},[_(C,{modelValue:a.value,"onUpdate:modelValue":r[0]||(r[0]=w=>a.value=w),"prefix-icon":E(me),placeholder:"Search artwork or artist",style:{"max-width":"350px"},clearable:""},null,8,["modelValue","prefix-icon"]),_(we,{all_tokens:y.value,search_filter:a.value,use_local_storage:!0,onUpdateFilteredTokens:r[1]||(r[1]=w=>R(w))},null,8,["all_tokens","search_filter"]),_(B,{icon:"Plus",type:"info",onClick:r[2]||(r[2]=w=>E(m).push({name:"new-artwork"})),style:{"margin-left":"10px"},size:"small"},{default:S(()=>r[3]||(r[3]=[q("Artwork")])),_:1})],4),r[4]||(r[4]=h("div",{style:{"padding-bottom":"90px"}},null,-1)),h("div",{id:"masonry-container",ref_key:"masonryContainer",ref:v,style:{"overflow-y":"auto",height:"100%",padding:"10px 10px 90px 10px"}},[b.value.length>0?(i(),W(E(Ee),{key:0,id:"masonary-wall","scroll-container":v.value,items:b.value,"column-width":X,gap:$,style:I(`width: ${A.value}px; margin: auto`),"max-columns":5},{default:S(({item:w})=>[_(Le,{token_meta:w,column_width:g.value},null,8,["token_meta","column_width"])]),_:1},8,["scroll-container","items","style"])):(i(),f("div",Pe,"No artwork found"))],512),_(H)],64)}}});var tt=ne(Ie,[["__scopeId","data-v-3a4e64d3"]]);export{tt as default};
