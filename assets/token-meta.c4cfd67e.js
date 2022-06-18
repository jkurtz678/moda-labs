var h=Object.defineProperty,m=Object.defineProperties;var u=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var i=(e,t,n)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,c=(e,t)=>{for(var n in t||(t={}))g.call(t,n)&&i(e,n,t[n]);if(s)for(var n of s(t))k.call(t,n)&&i(e,n,t[n]);return e},l=(e,t)=>m(e,u(t));import{k as f,l as p,s as b,c as d,q as w}from"./index.7b702dbb.js";import{g as x,B as y,T,a as v}from"./account.cde6a095.js";import{g as E}from"./token-meta.3a92bf28.js";var S=`@import url('https://fonts.googleapis.com/css2?family=K2D&display=swap');

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
}`,W="/assets/logo.61e654f6.png",z="/assets/logo.da9b9095.svg",K="/assets/search-icon.38a117a4.svg";function L(){let e=f(window.innerWidth);const t=()=>e.value=window.innerWidth;p(()=>window.addEventListener("resize",t)),b(()=>window.removeEventListener("resize",t));const n=d(()=>e.value<650?"xs":e.value>=650&&e.value<1200?"md":e.value>=1200?"lg":null);return{width:d(()=>e.value),screen_type:n}}const _="742ea11e1d864fe2b23ac7cfe66a43f7";async function M(e){return(await(await fetch(`https://api.opensea.io/api/v1/assets/?owner=${e}`,{headers:{"X-API-KEY":_}})).json()).assets}const A=async e=>{const t=[];let n="";for(;;){const o=await(await fetch(`https://api.opensea.io/api/v1/events?account_address=${e}&event_type=created&limit=50${n?"&cursor="+n:""}`,{headers:{"X-API-KEY":_}})).json();if(o.asset_events&&t.push(...o.asset_events.map(r=>l(c({},r.asset),{creator:r.from_account}))),n=o.next,!n)break}return t},P=w({id:"token-meta",state:()=>({archive_token_meta_list:[],opensea_minted_token_meta_list:[],opensea_wallet_token_meta_list:[]}),getters:{archive_token_meta_map:e=>{const t={};return e.archive_token_meta_list.forEach(n=>{t[n.id]=n}),t},all_token_metas(e){const t={};return[...e.opensea_minted_token_meta_list,...e.opensea_wallet_token_meta_list].forEach(a=>{const o=I(a);t[o.id]=o}),e.archive_token_meta_list.forEach(a=>{t[v(a)]&&delete t[v(a)],t[a.id]=a}),t}},actions:{async loadArchiveTokenMetas(e){await E(e,t=>{this.archive_token_meta_list=t})},async loadOpenseaMintedTokenMetas(e){await A(e).then(t=>{this.opensea_minted_token_meta_list=t})},async loadOpenseaWalletTokenMetas(e){await M(e).then(t=>{this.opensea_wallet_token_meta_list=t})}}}),I=e=>{var t,n;return{id:x(e),entity:{name:e.name,artist:((n=(t=e.creator)==null?void 0:t.user)==null?void 0:n.username)||"N/A",description:e.description,public_link:e.permalink,blockchain:y.Ethereum,asset_contract_address:e.asset_contract.address,token_id:e.token_id,platform:T.Opensea,thumbnail_url:e.image_thumbnail_url,media_url:e.animation_url?e.animation_url:e.image_url}}};export{S as _,W as a,z as b,K as c,P as d,L as u};
