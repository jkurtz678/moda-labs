var m=Object.defineProperty,u=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var i=(e,t,n)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,c=(e,t)=>{for(var n in t||(t={}))k.call(t,n)&&i(e,n,t[n]);if(s)for(var n of s(t))f.call(t,n)&&i(e,n,t[n]);return e},l=(e,t)=>u(e,g(t));import{k as p,l as b,s as w,c as d,q as x}from"./index.15049fac.js";import{g as y,B as E,T,a as v}from"./account.ae2eb44e.js";import{g as M}from"./token-meta.6824a539.js";var W=`@import url('https://fonts.googleapis.com/css2?family=K2D&display=swap');

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
}`,z="/assets/logo.61e654f6.png",K="/assets/logo.da9b9095.svg",L="/assets/search-icon.38a117a4.svg";function P(){let e=p(window.innerWidth);const t=()=>e.value=window.innerWidth;b(()=>window.addEventListener("resize",t)),w(()=>window.removeEventListener("resize",t));const n=d(()=>e.value<650?"xs":e.value>=650&&e.value<1200?"md":e.value>=1200?"lg":null);return{width:d(()=>e.value),screen_type:n}}const _="742ea11e1d864fe2b23ac7cfe66a43f7";async function A(e){const t=await fetch(`https://api.opensea.io/api/v1/assets/?owner=${e}`,{headers:{"X-API-KEY":_}}),n=await t.json();return h(t,n),n.assets}const I=async e=>{const t=[];let n="";for(;;){const a=await fetch(`https://api.opensea.io/api/v1/events?account_address=${e}&event_type=created&limit=50${n?"&cursor="+n:""}`,{headers:{"X-API-KEY":_}}),o=await a.json();if(h(a,o),o.asset_events&&t.push(...o.asset_events.map(r=>l(c({},r.asset),{creator:r.from_account}))),n=o.next,!n)break}return t},h=(e,t)=>{if(e.status>=400)throw t.detail?t.detail:e.status==429?"Error - opensea rejected request due to rate limiting":"Error loading opensea tokens"},U=x({id:"token-meta",state:()=>({archive_token_meta_list:[],opensea_minted_token_meta_list:[],opensea_wallet_token_meta_list:[]}),getters:{archive_token_meta_map:e=>{const t={};return e.archive_token_meta_list.forEach(n=>{t[n.id]=n}),t},all_token_metas(e){const t={};return[...e.opensea_minted_token_meta_list,...e.opensea_wallet_token_meta_list].forEach(a=>{const o=O(a);t[o.id]=o}),e.archive_token_meta_list.forEach(a=>{t[v(a)]&&delete t[v(a)],t[a.id]=a}),t}},actions:{async loadArchiveTokenMetas(e){await M(e,t=>{this.archive_token_meta_list=t})},async loadOpenseaMintedTokenMetas(e){await I(e).then(t=>{this.opensea_minted_token_meta_list=t})},async loadOpenseaWalletTokenMetas(e){await A(e).then(t=>{this.opensea_wallet_token_meta_list=t})}}}),O=e=>{var t,n;return{id:y(e),entity:{name:e.name,artist:((n=(t=e.creator)==null?void 0:t.user)==null?void 0:n.username)||"N/A",description:e.description,public_link:e.permalink,blockchain:E.Ethereum,asset_contract_address:e.asset_contract.address,token_id:e.token_id,platform:T.Opensea,thumbnail_url:e.image_thumbnail_url,media_url:e.animation_url?e.animation_url:e.image_url}}};export{W as _,z as a,K as b,L as c,U as d,P as u};
