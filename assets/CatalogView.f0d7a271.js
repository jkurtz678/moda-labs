import{_ as V,a as B,b as A,c as T}from"./search-icon.3c18558d.js";import{d as g,a as r,w as _,b as j,f as t,o,j as s,u as i,h as m,g as c,i as b,k as d,_ as f}from"./index.408b3e9d.js";import{u as N}from"./breakpoints.8a34e9b5.js";const P={key:0,style:{"font-weight":"bold"}},H=g({__name:"CatalogHeader",setup(v){const{md_and_up:a}=N(),p=j(),n=u=>new URL({"../../assets/base.css":V,"../../assets/logo.png":B,"../../assets/logo.svg":A,"../../assets/search-icon.svg":T}[`../../assets/${u}`],self.location).href,w=()=>{p.push({name:"catalog-gallery-list"})},h=()=>{window.open("https://moda-labs.xyz/","_blank")},k=()=>{window.open("https://www.instagram.com/projekt.______/","_blank")};return(u,e)=>{const x=t("el-image"),l=t("el-button"),y=t("el-divider"),C=t("el-header");return o(),r(C,null,{default:_(()=>[s(x,{src:n("logo.png"),style:{width:"60px",height:"60px","margin-right":"2em"}},null,8,["src"]),i(a)?(o(),m("h1",P,"MODA CATALOG")):c("",!0),e[3]||(e[3]=b("div",{style:{"flex-grow":"1"}},null,-1)),s(l,{link:"",onClick:w,class:"header-button toolbar-item"},{default:_(()=>e[0]||(e[0]=[d("All Exhibitions")])),_:1}),i(a)?(o(),r(l,{key:1,link:"",onClick:k,class:"header-button toolbar-item"},{default:_(()=>e[1]||(e[1]=[d("Projekt _______")])),_:1})):c("",!0),i(a)?(o(),r(l,{key:2,link:"",onClick:h,class:"header-button toolbar-item"},{default:_(()=>e[2]||(e[2]=[d("MODA Plaque")])),_:1})):c("",!0),s(y,{style:{position:"absolute",bottom:"0px",left:"0px",right:"0px",margin:"0px"}})]),_:1})}}});var I=f(H,[["__scopeId","data-v-37c75ef7"]]);const M={class:"wrapper",style:{"overflow-y":"auto",height:"100%"}},O={class:"container"},$=g({__name:"CatalogView",setup(v){return(a,p)=>{const n=t("router-view");return o(),m("div",M,[s(I),b("div",O,[s(n)])])}}});var G=f($,[["__scopeId","data-v-5c96776e"]]);export{G as default};
