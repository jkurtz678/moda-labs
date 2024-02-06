import{c as L,d as N}from"./types.c2052207.js";import{s as R}from"./util.ced6671d.js";import{d as F,r as P,L as V,c as d,h as s,l as t,i as o,w as p,t as l,F as M,b as W,f,o as i,u as v,g as u,_ as j,p as Q,m as z}from"./index.49ce85d8.js";import{u as G}from"./thumbnail-image.f1176a0f.js";const y=r=>(Q("data-v-133885fe"),r=r(),z(),r),H={class:"card-flex-container"},J={key:0,style:{display:"flex"}},K={style:{display:"flex","align-items":"center",margin:"5px 25px 5px 5px"}},O={style:{display:"flex","flex-direction":"column","justify-content":"center"}},U={class:"bold"},X={class:"bold"},Y={key:0,style:{display:"flex","align-items":"top","text-align":"left"}},Z={class:"card-flex-left"},tt={class:"flex-column"},et=y(()=>t("p",{class:"card-title"},"Title",-1)),nt={class:"bold bigger-font"},ot=["src"],st={class:"card-flex-right"},it=y(()=>t("p",{class:"card-title"},"Artist name",-1)),at={class:"bold bigger-font description"},lt={key:0},rt={key:1},ct=["href"],_t=["href"],dt={style:{flex:"1","text-align":"right","padding-right":"1em","white-space":"nowrap"}},pt={style:{opacity:"0.5"}},ut=y(()=>t("hr",null,null,-1)),mt=F({__name:"PlaqueTokenItem",props:{token_meta:{}},setup(r){const x=W(),e=r,c=P(!1),m=P(!1),g=G(V(e,"token_meta")),S=d(()=>e.token_meta.entity.description?m.value||e.token_meta.entity.description.length<200?e.token_meta.entity.description:`${e.token_meta.entity.description.substring(0,200)}...`:"No artwork description"),T=d(()=>{const n=e.token_meta.entity.public_link;return n&&!n.startsWith("https://")?`https://${n}`:n}),$=d(()=>{const n=e.token_meta.entity.artist_social_link;return n&&!n.startsWith("https://")?`https://${n}`:n}),A=d(()=>L(e.token_meta.entity.platform)),w=d(()=>e.token_meta.entity),B=async()=>{const n=await N(e.token_meta);if(!n){R("Error getting source file");return}window.open(n,"_blank")},D=()=>{const n=x.resolve({name:"preview-plaque",params:{token_meta_id:e.token_meta.id}});window.open(n.href)};return(n,a)=>{const E=f("el-image"),b=f("el-collapse-transition"),k=f("el-button"),h=f("el-tooltip");return i(),s(M,null,[t("div",H,[t("div",null,[o(b,null,{default:p(()=>{var _,C,q,I;return[c.value?u("",!0):(i(),s("div",J,[t("div",K,[o(E,{src:v(g),style:{width:"50px",height:"50px"},fit:"contain"},null,8,["src"])]),t("div",O,[t("div",U,l((C=(_=e.token_meta)==null?void 0:_.entity)==null?void 0:C.name),1),t("div",X,l((I=(q=e.token_meta)==null?void 0:q.entity)==null?void 0:I.artist),1)])]))]}),_:1}),o(b,null,{default:p(()=>[c.value?(i(),s("div",Y,[t("div",Z,[t("div",tt,[et,t("div",nt,l(e.token_meta.entity.name),1),t("img",{style:{width:"150px"},src:v(g)},null,8,ot)])]),t("div",st,[it,t("div",at,l(e.token_meta.entity.artist),1),t("div",null,l(S.value),1),t("div",null,[e.token_meta.entity.description&&e.token_meta.entity.description.length>200?(i(),s("a",{key:0,onClick:a[0]||(a[0]=_=>m.value=!m.value),class:"link"},[m.value?(i(),s("span",lt,"Less")):(i(),s("span",rt,"More"))])):u("",!0)]),t("div",null,[w.value.public_link?(i(),s("a",{key:0,href:T.value,target:"_blank"},"QR Code Link",8,ct)):u("",!0)]),t("div",null,[w.value.artist_social_link?(i(),s("a",{key:0,href:$.value,target:"_blank"},"Artist Social Media Link",8,_t)):u("",!0)])])])):u("",!0)]),_:1})]),t("div",dt,[o(h,{class:"box-item",effect:"dark",content:"Download art",placement:"top"},{default:p(()=>[o(k,{icon:"Download",text:"",circle:"",onClick:B})]),_:1}),o(h,{class:"box-item",effect:"dark",content:"Preview plaque",placement:"top"},{default:p(()=>[o(k,{icon:"Tickets",text:"",circle:"",onClick:D})]),_:1}),o(h,{class:"box-item",effect:"dark",content:"Edit art data",placement:"top"},{default:p(()=>[o(k,{icon:"Edit",text:"",circle:"",onClick:a[1]||(a[1]=_=>v(x).push({name:"edit-token",params:{token_meta_id:e.token_meta.id}}))})]),_:1}),o(k,{icon:c.value?"ArrowDownBold":"ArrowRightBold",onClick:a[2]||(a[2]=_=>c.value=!c.value),text:"",circle:""},null,8,["icon"]),t("div",pt,l(A.value),1)])]),ut],64)}}});var yt=j(mt,[["__scopeId","data-v-133885fe"]]);export{yt as P};