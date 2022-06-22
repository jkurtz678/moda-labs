import{d as V,u as $,a as D,c as T,r as l,o as c,b,e as a,f as x,g as q,F as E,h as r,w as _,t as B,i as N,j as S,_ as A,k as L,l as P,E as U,R as z}from"./index.d6ceb209.js";import{u as M,s as u}from"./account.43a49c82.js";import{u as F,a as I}from"./token-meta.4052967e.js";import{u as j}from"./plaque.aab5b9a1.js";import{u as H}from"./plaque.063ebd1c.js";import"./token-meta.2a242cc4.js";var K=`@import url('https://fonts.googleapis.com/css2?family=K2D&display=swap');

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
}`,O="/assets/logo.61e654f6.png",W="/assets/logo.da9b9095.svg",G="/assets/search-icon.38a117a4.svg";const J={style:{display:"flex","align-items":"center"}},Q=N("div",{style:{"flex-grow":"1"}},null,-1),X=S(" Cancel "),Y=N("div",{style:{"flex-grow":"1"}},null,-1),Z={key:0,style:{"margin-right":"10px"}},ee=S("Logout"),te=V({setup(R){const o=$(),g=D(),i=M(),{width:C,screen_type:m}=F(),k=(t,e)=>{t.paneName&&typeof t.paneName=="string"&&o.push({name:t.paneName})},v=T(()=>{const t=i.account;if(!t)return"";if(t.entity.ens_name)return t.entity.ens_name;const e=t.entity.wallet_address;return`${e.substring(0,6)}...${e.substring(e.length-4)}`}),p=()=>{i.logout(),o.push({name:"landing",query:{redir:window.location.href}})},d=t=>new URL({"../assets/base.css":K,"../assets/logo.png":O,"../assets/logo.svg":W,"../assets/search-icon.svg":G}[`../assets/${t}`],self.location).href;return(t,e)=>{const y=l("el-image"),h=l("el-button"),f=l("el-tab-pane"),w=l("el-tabs");return c(),b("div",J,[a(m)!="xs"?(c(),x(y,{key:0,src:d("logo.png"),style:{width:"43px",height:"43px","margin-right":"2em"}},null,8,["src"])):q("",!0),a(o).currentRoute.value.name=="qr-scan"?(c(),b(E,{key:1},[Q,r(h,{icon:"close",onClick:e[0]||(e[0]=s=>a(o).push("plaque-list"))},{default:_(()=>[X]),_:1})],64)):(c(),b(E,{key:2},[r(w,{modelValue:a(g).name,"onUpdate:modelValue":e[1]||(e[1]=s=>a(g).name=s),onTabClick:k},{default:_(()=>[r(f,{label:"Plaques",name:"plaque-list"}),r(f,{label:"Tokens",name:"token-list"})]),_:1},8,["modelValue"]),Y,a(m)!="xs"?(c(),b("div",Z,B(a(v)),1)):q("",!0),r(h,{onClick:p,style:{"margin-left":"1em"}},{default:_(()=>[ee]),_:1})],64))])}}});const oe=V({setup(R){const o=M(),g=j(),i=I(),C=$(),m=L(!1),k=D();return P(async()=>{const v=U.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),{wallet_address:p,signature:d,ens_name:t}=o.getCachedAccountData();if(!p||!d){C.push({name:"landing",query:{redir:window.location.href}}),v.close();return}if(await o.loadAccount(p,d,t),o.account==null){u("Error - failed to load account");return}const e=o.get_account.entity.wallet_address,y=g.loadPlaques(e).catch(n=>u(`Error loading plaques - ${n}`)),h=i.loadArchiveTokenMetas(e).catch(n=>u(`Error loading archive token metas - ${n}`)),f=i.loadOpenseaMintedTokenMetas(e).catch(n=>u(`Error loading opensea minted tokens - ${n}`)),w=i.loadOpenseaWalletTokenMetas(e).catch(n=>u(`Error loading opensea wallet tokens - ${n}`));await Promise.all([y,h,f]),await w;const s=k.query.plaque_id;s&&typeof s=="string"&&!g.plaque_map[s]&&await H(s,{wallet_address:o.get_account.entity.wallet_address,token_meta_id_list:[]}).catch(n=>{u(`Error adding plaque from query param = ${n}`)}),m.value=!0,v.close()}),(v,p)=>{const d=l("el-header"),t=l("el-main"),e=l("el-container");return c(),x(e,{style:{height:"100%"}},{default:_(()=>[r(d,{class:"header"},{default:_(()=>[r(te)]),_:1}),r(t,{style:{"background-color":"#DAD9D7"}},{default:_(()=>[m.value?(c(),x(a(z),{key:0})):q("",!0)]),_:1})]),_:1})}}});var ie=A(oe,[["__scopeId","data-v-b73475a4"]]);export{ie as default};
