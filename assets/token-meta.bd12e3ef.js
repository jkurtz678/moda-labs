var v=Object.defineProperty,m=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var c=(n,e,t)=>e in n?v(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,i=(n,e)=>{for(var t in e||(e={}))h.call(e,t)&&c(n,t,e[t]);if(s)for(var t of s(e))u.call(e,t)&&c(n,t,e[t]);return n},l=(n,e)=>m(n,_(e));import{k as g,l as f,s as k,c as d,q as p}from"./index.4932b23d.js";import{g as b,B as w,T as x}from"./account.12b0baf9.js";import{g as y}from"./token-meta.5f6f7fc8.js";var M=`@import url('https://fonts.googleapis.com/css2?family=K2D&display=swap');

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
}`,O="/assets/logo.61e654f6.png",W="/assets/logo.da9b9095.svg";function D(){let n=g(window.innerWidth);const e=()=>n.value=window.innerWidth;f(()=>window.addEventListener("resize",e)),k(()=>window.removeEventListener("resize",e));const t=d(()=>n.value<650?"xs":n.value>=650&&n.value<1200?"md":n.value>=1200?"lg":null);return{width:d(()=>n.value),screen_type:t}}const E="742ea11e1d864fe2b23ac7cfe66a43f7",A=async n=>{const e=[];let t="";for(;;){const a=await(await fetch(`https://api.opensea.io/api/v1/events?account_address=${n}&event_type=created&limit=50${t?"&cursor="+t:""}`,{headers:{"X-API-KEY":E}})).json();if(a.asset_events&&e.push(...a.asset_events.map(r=>l(i({},r.asset),{creator:r.from_account}))),t=a.next,!t)break}return e},I=p({id:"token-meta",state:()=>({archive_token_meta_list:[],opensea_token_meta_list:[]}),getters:{archive_token_meta_map:n=>{const e={};return n.archive_token_meta_list.forEach(t=>{e[t.id]=t}),e},opensea_token_meta_map:n=>{const e={};return n.opensea_token_meta_list.forEach(t=>{var a,r;console.log("O",t);const o=b(t);e[o]={id:o,entity:{name:t.name,artist:((r=(a=t.creator)==null?void 0:a.user)==null?void 0:r.username)||"N/A",description:t.description,public_link:t.permalink,blockchain:w.Ethereum,asset_contract_address:t.asset_contract.address,token_id:t.token_id,platform:x.Opensea,thumbnail_url:t.image_thumbnail_url,media_url:t.animation_url?t.animation_url:t.image_url}}}),e},all_token_metas(){return i(i({},this.archive_token_meta_map),this.opensea_token_meta_map)}},actions:{async loadArchiveTokenMetas(n){await y(n,e=>{this.archive_token_meta_list=e})},async loadOpenseaTokenMetas(n){await A(n).then(e=>{this.opensea_token_meta_list=e})}}});export{M as _,O as a,W as b,I as c,D as u};
