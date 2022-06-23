import{d as $,u as D,a as S,c as P,r as c,o as l,b as y,e as a,f as q,g as C,F as V,h as r,w as _,t as A,i as N,j as M,_ as U,k as z,l as F,E as I,R as j}from"./index.dec8826a.js";import{u as R,s as u}from"./account.cb655ced.js";import{u as H,a as K}from"./token-meta.ae7e9f30.js";import{u as O,a as G}from"./plaque.88a63045.js";import{u as W}from"./plaque.cc0422f7.js";import"./token-meta.991a239e.js";var J=`@import url('https://fonts.googleapis.com/css2?family=K2D&display=swap');

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

hr {
  border: 0.1px solid lightgray;
}`,Q="/assets/logo.61e654f6.png",X="/assets/logo.da9b9095.svg",Y="/assets/search-icon.38a117a4.svg";const Z={style:{display:"flex","align-items":"center"}},ee=N("div",{style:{"flex-grow":"1"}},null,-1),te=M(" Cancel "),oe=N("div",{style:{"flex-grow":"1"}},null,-1),ne={key:0,style:{"margin-right":"10px"}},ae=M("Logout"),re=$({setup(T){const o=D(),g=S(),i=R(),{width:E,screen_type:v}=H(),f=(e,t)=>{e.paneName&&typeof e.paneName=="string"&&o.push({name:e.paneName})},w=P(()=>{const e=i.account;if(!e)return"";if(e.entity.ens_name)return e.entity.ens_name;const t=e.entity.wallet_address;return`${t.substring(0,6)}...${t.substring(t.length-4)}`}),m=()=>{i.logout(),o.push({name:"landing",query:{redir:window.location.href}})},d=e=>new URL({"../assets/base.css":J,"../assets/logo.png":Q,"../assets/logo.svg":X,"../assets/search-icon.svg":Y}[`../assets/${e}`],self.location).href;return(e,t)=>{const p=c("el-image"),h=c("el-button"),s=c("el-tab-pane"),x=c("el-tabs");return l(),y("div",Z,[a(v)!="xs"?(l(),q(p,{key:0,src:d("logo.png"),style:{width:"43px",height:"43px","margin-right":"2em"}},null,8,["src"])):C("",!0),a(o).currentRoute.value.name=="qr-scan"?(l(),y(V,{key:1},[ee,r(h,{icon:"close",onClick:t[0]||(t[0]=b=>a(o).push("plaque-list"))},{default:_(()=>[te]),_:1})],64)):(l(),y(V,{key:2},[r(x,{modelValue:a(g).name,"onUpdate:modelValue":t[1]||(t[1]=b=>a(g).name=b),onTabClick:f},{default:_(()=>[r(s,{label:"Plaques",name:"plaque-list"}),r(s,{label:"Tokens",name:"token-list"})]),_:1},8,["modelValue"]),oe,a(v)!="xs"?(l(),y("div",ne,A(a(w)),1)):C("",!0),r(h,{onClick:m,style:{"margin-left":"1em"}},{default:_(()=>[ae]),_:1})],64))])}}});const se=$({setup(T){const o=R(),g=O(),i=K(),E=G(),v=D(),f=z(!1),w=S();return F(async()=>{const m=I.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),{wallet_address:d,signature:e,ens_name:t}=o.getCachedAccountData();if(!d||!e){v.push({name:"landing",query:{redir:window.location.href}}),m.close();return}const p=o.loadAccount(d,e,t),h=E.loadGalleryList(d);if(await Promise.all([p,h]),o.account==null){u("Error - failed to load account");return}const s=o.get_account.entity.wallet_address,x=g.loadPlaques(s).catch(n=>u(`Error loading plaques - ${n}`)),b=i.loadArchiveTokenMetas(s).catch(n=>u(`Error loading archive token metas - ${n}`)),B=i.loadOpenseaMintedTokenMetas(s).catch(n=>u(`Error loading opensea minted tokens - ${n}`)),L=i.loadOpenseaWalletTokenMetas(s).catch(n=>u(`Error loading opensea wallet tokens - ${n}`));await Promise.all([x,b,B]),await L;const k=w.query.plaque_id;k&&typeof k=="string"&&!g.plaque_map[k]&&await W(k,{wallet_address:o.get_account.entity.wallet_address,token_meta_id_list:[]}).catch(n=>{u(`Error adding plaque from query param = ${n}`)}),f.value=!0,m.close()}),(m,d)=>{const e=c("el-header"),t=c("el-main"),p=c("el-container");return l(),q(p,{style:{height:"100%"}},{default:_(()=>[r(e,{class:"header"},{default:_(()=>[r(re)]),_:1}),r(t,{style:{"background-color":"#DAD9D7"}},{default:_(()=>[f.value?(l(),q(a(j),{key:0})):C("",!0)]),_:1})]),_:1})}}});var ge=U(se,[["__scopeId","data-v-3d5f7fc6"]]);export{ge as default};
