import{_ as A,a as D,b as N,c as V}from"./token-meta.65560f8e.js";import{i as $}from"./account.1a21b435.js";import{d as E,J as F,c as f,k as I,r,o as a,b as i,i as t,h as d,e as o,t as n,w as L,K as P,g as y,F as R}from"./index.cc5b12d1.js";const T={class:"card-flex-container"},U={style:{display:"flex","align-items":"center",margin:"5px 25px 5px 0px"}},q={style:{flex:"3 1 0%","text-align":"left"}},z={class:"bold"},J={class:"bold"},K={style:{flex:"1","text-align":"right","padding-right":"1em"}},M={style:{opacity:"0.5"}},S={key:0,class:"card-body"},j=t("hr",{class:"hr"},null,-1),G={style:{display:"flex","align-items":"top"}},H={class:"card-flex-left"},O={class:"flex-column"},Q=t("p",{class:"card-title"},"Title",-1),W={class:"bold bigger-font"},X=["src"],Y={class:"card-flex-right"},Z=t("p",{class:"card-title"},"Artist name",-1),tt={class:"bold bigger-font description"},et={key:0},st={key:1},ot=t("hr",null,null,-1),it=E({props:{token_meta:null},setup(x){const e=x,_=F({expanded:!1}),v=f(()=>$(e.token_meta.entity.platform)),k=f(()=>{var l,s;return(l=e.token_meta)!=null&&l.entity.thumbnail_url?(s=e.token_meta)==null?void 0:s.entity.thumbnail_url:p("logo.png")}),p=l=>new URL({"../assets/base.css":A,"../assets/logo.png":D,"../assets/logo.svg":N,"../assets/search-icon.svg":V}[`../assets/${l}`],self.location).href,c=I(!1);return(l,s)=>{var m,g,h,u;const b=r("el-image"),w=r("el-button"),C=r("el-collapse-transition");return a(),i(R,null,[t("div",T,[t("div",U,[d(b,{src:o(k),style:{width:"50px",height:"50px"},fit:"contain"},null,8,["src"])]),t("div",q,[t("p",z,n((g=(m=e.token_meta)==null?void 0:m.entity)==null?void 0:g.name),1),t("p",J,n((u=(h=e.token_meta)==null?void 0:h.entity)==null?void 0:u.artist),1)]),t("div",K,[d(w,{icon:o(_).expanded?"ArrowDownBold":"ArrowRightBold",onClick:s[0]||(s[0]=B=>o(_).expanded=!o(_).expanded),text:"",circle:""},null,8,["icon"]),t("div",M,n(o(v)),1)])]),d(C,null,{default:L(()=>[o(_).expanded?(a(),i("div",S,[j,t("div",G,[t("div",H,[t("div",O,[Q,t("div",W,n(e.token_meta.entity.name),1),t("img",{style:{width:"150px"},src:e.token_meta.entity.thumbnail_url||p("logo.png")},null,8,X)])]),t("div",Y,[Z,t("div",tt,n(e.token_meta.entity.artist),1),t("div",{class:P(c.value?"description-all":"description-less")},n(e.token_meta.entity.description),3),e.token_meta.entity.description!=""?(a(),i("a",{key:0,onClick:s[1]||(s[1]=B=>c.value=!c.value),class:"link"},[c.value?(a(),i("span",et,"Less")):(a(),i("span",st," More"))])):y("",!0)])])])):y("",!0)]),_:1}),ot],64)}}});export{it as _};
