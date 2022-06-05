import{_ as S,d as I,u as q,o as C,E as D,a as R,r as o,b as u,c as v,w as n,e as t,f as p,g as c,h as m,R as V,p as A,i as N,j as g}from"./index.5926e50e.js";import{u as U}from"./account.0d5d48dc.js";import{u as z}from"./plaque.e5ebd4e5.js";import"./types.8335cbb0.js";import"./firebaseConfig.d7dbf4c4.js";import"./plaque.5824bace.js";var B=`@import url('https://fonts.googleapis.com/css2?family=K2D&display=swap');

/* color palette from <https://github.com/vuejs/theme> */

:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */

:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}

/* @media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
} */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

html {
  height: 100%;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  /* font-family: "K2D", Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; */
  font-family: "K2D", sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`,E="/moda-labs/assets/logo.61e654f6.png",L="/moda-labs/assets/logo.da9b9095.svg";const j=s=>(A("data-v-92781ad4"),s=s(),N(),s),H={style:{display:"flex","align-items":"center"}},K=j(()=>p("div",{style:{"flex-grow":"1"}},null,-1)),M=g("User"),$=g("Support"),F=g("Account"),O=I({setup(s){const i=U(),f=z(),a=q();C(async()=>{const r=D.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),e=window.localStorage.getItem("account_address"),l=window.localStorage.getItem("account_signature");if(e==null||l==null){a.push({name:"landing"}),r.close();return}if(await i.loadAccount(e,l),i.account==null){R("Error - failed to load account");return}await f.loadPlaques(i.account.id),r.close()});function b(r){return new URL({"../assets/base.css":B,"../assets/logo.png":E,"../assets/logo.svg":L}[`../assets/${r}`],self.location).href}return(r,e)=>{const l=o("el-image"),_=o("el-button"),d=o("el-tab-pane"),h=o("el-tabs"),k=o("el-header"),x=o("el-main"),w=o("el-container");return u(),v(w,{style:{height:"100%"}},{default:n(()=>[t(k,{class:"header"},{default:n(()=>[p("div",H,[t(l,{src:b("logo.png"),style:{width:"43px",height:"43px"}},null,8,["src"]),K,c(a).currentRoute.value.name=="plaque-list"?(u(),v(_,{key:0,icon:"plus",circle:"",onClick:e[0]||(e[0]=y=>c(a).push("qr-scan"))})):m("",!0),c(a).currentRoute.value.name=="qr-scan"?(u(),v(_,{key:1,icon:"close",circle:"",onClick:e[1]||(e[1]=y=>c(a).push("plaque-list"))})):m("",!0)]),t(h,null,{default:n(()=>[t(d,{label:"Overview",name:"first"},{default:n(()=>[M]),_:1}),t(d,{label:"Support",name:"second"},{default:n(()=>[$]),_:1}),t(d,{label:"Account",name:"Third"},{default:n(()=>[F]),_:1})]),_:1})]),_:1}),t(x,{style:{"background-color":"#DAD9D7"}},{default:n(()=>[t(c(V))]),_:1})]),_:1})}}});var X=S(O,[["__scopeId","data-v-92781ad4"]]);export{X as default};
