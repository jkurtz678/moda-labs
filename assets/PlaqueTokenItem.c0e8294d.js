import{_ as A,a as D,b as N}from"./token-meta.d97b67e0.js";import{d as R,B as U,c as g,r as i,o as l,b as u,i as t,h as x,e as o,t as s,w as V,f as y,g as _,F as E}from"./index.00ffcaa1.js";const F=t("hr",{class:"hr"},null,-1),I={class:"card-flex-container"},$={style:{display:"flex","align-items":"center",margin:"5px 25px 5px 0px"}},q={style:{flex:"3 1 0%","text-align":"left"}},L={class:"bold"},P={class:"bold"},S={style:{flex:"1","text-align":"right","padding-right":"1em"}},T={style:{opacity:"0.5"}},j={key:0,class:"card-body"},z={class:"card-flex-container"},G={style:{flex:"1",width:"30%"}},H=["src"],J={style:{flex:"3 1 0%",width:"70%"}},K={class:"bold bigger-font description"},M={class:"description"},X=R({props:{token_meta:null},setup(f){const e=f,n=U({expanded:!1}),v=g(()=>{const a=e.token_meta.entity.platform||"archive";return a.charAt(0).toUpperCase()+a.slice(1)}),k=g(()=>e.token_meta.entity.thumbnail_url?e.token_meta.entity.thumbnail_url:r("logo.png")),r=a=>new URL({"../assets/base.css":A,"../assets/logo.png":D,"../assets/logo.svg":N}[`../assets/${a}`],self.location).href;return(a,c)=>{var d,p,m,h;const b=i("el-image"),w=i("ArrowRightBold"),B=i("ArrowDownBold"),C=i("el-icon");return l(),u(E,null,[F,t("div",I,[t("div",$,[x(b,{src:o(k),style:{width:"50px",height:"50px"},fit:"contain"},null,8,["src"])]),t("div",q,[t("p",L,s((p=(d=e.token_meta)==null?void 0:d.entity)==null?void 0:p.name),1),t("p",P,s((h=(m=e.token_meta)==null?void 0:m.entity)==null?void 0:h.artist),1)]),t("div",S,[x(C,{onClick:c[0]||(c[0]=O=>o(n).expanded=!o(n).expanded)},{default:V(()=>[o(n).expanded?_("",!0):(l(),y(w,{key:0})),o(n).expanded?(l(),y(B,{key:1})):_("",!0)]),_:1}),t("div",T,s(o(v)),1)])]),o(n).expanded?(l(),u("div",j,[t("div",z,[t("div",G,[t("div",null,s(e.token_meta.entity.name),1),t("img",{style:{width:"121px"},src:r("logo.png")},null,8,H)]),t("div",J,[t("div",K,s(e.token_meta.entity.artist),1),t("div",M,s(e.token_meta.entity.description),1)])])])):_("",!0)],64)}}});export{X as _};