import{y as k}from"./index.49ce85d8.js";import{g as d,a as p,T as r,b as c}from"./types.c2052207.js";import{g as u,a as f,b as l}from"./token-meta.e9d92a72.js";import{u as y}from"./account.7d293051.js";const m="6775bb4735c745ba9217a14381bb8357";async function g(t){const a=[],e="ethereum";let n="";for(;;){const o=await fetch(`https://api.opensea.io/api/v2/chain/${e}/account/${t}/nfts?limit=200${n?"&next="+n:""}`,{headers:{"X-API-KEY":m}}),s=await o.json();if(h(o,s),s.nfts&&a.push(...s.nfts),n=s.next,!n)break}return a}const w=async t=>{const a=[];let e="";for(;;){const n=await fetch(`https://api.opensea.io/api/v2/events/accounts/${t}?chain=ethereum&event_type=listing&limit=50${e?"&next="+e:""}`,{headers:{"X-API-KEY":m}}),o=await n.json();if(h(n,o),o.asset_events&&a.push(...o.asset_events.map(s=>({...s.asset}))),e=o.next,!e)break}return a},h=(t,a)=>{if(t.status>=400)throw a.detail?a.detail:t.status==429?"Error - opensea rejected request due to rate limiting":"Error loading opensea tokens"},v=t=>({id:d(t),entity:{name:t.name,artist:"",description:t.description,public_link:t.opensea_url,blockchain:p.Ethereum,asset_contract_address:t.contract,token_id:t.identifier,platform:r.Opensea,external_thumbnail_url:t.image_url,external_media_url:t.image_url}}),M=k({id:"token-meta",state:()=>({archive_token_meta_list:[],opensea_minted_token_meta_list:[],opensea_wallet_token_meta_list:[],opensea_converted_tokens:[],gallery_token_meta_list:[],demo_token_meta_list:[]}),getters:{archive_token_meta_map:t=>{const a={};return t.archive_token_meta_list.forEach(e=>{a[e.id]=e}),a},all_token_metas(t){const a={};return t.opensea_converted_tokens.forEach(e=>{a[e.id]=e}),t.archive_token_meta_list.forEach(e=>{if(a[c(e)]){delete a[c(e)];const n={id:e.id,entity:{...e.entity}};n.entity.platform=r.OpenseaArchive,a[n.id]=n;return}a[e.id]=e}),t.gallery_token_meta_list.forEach(e=>{a[e.id]=e}),t.demo_token_meta_list.forEach(e=>{a[e.id]=e}),a},sorted_all_token_metas(t){return JSON.parse(JSON.stringify(Object.values(this.all_token_metas))).sort((e,n)=>{var i,_;const o=((i=e.entity.artist)==null?void 0:i.toLowerCase())+e.entity.name.toLowerCase(),s=((_=n.entity.artist)==null?void 0:_.toLowerCase())+n.entity.name.toLowerCase();return o<s?-1:o>s?1:0})}},actions:{async loadArchiveTokenMetas(t){if(y().is_user_admin){await u(e=>{this.archive_token_meta_list=e.filter(n=>n.entity.external_media_url||n.entity.media_id)});return}await f(t,e=>{this.archive_token_meta_list=e})},async loadOpenseaMintedTokenMetas(t){await w(t).then(a=>{this.opensea_minted_token_meta_list=a})},async loadOpenseaWalletTokenMetas(t){await g(t).then(a=>{this.opensea_wallet_token_meta_list=a})},async loadOpenseaConvertedTokens(){const t=[],a=[...this.opensea_minted_token_meta_list,...this.opensea_wallet_token_meta_list],e=[];a.forEach(n=>{const o=v(n);t.push(o),e.push((async()=>{if(!o.entity.external_media_url)return;const s=await E(o.entity.external_thumbnail_url||"").catch(i=>{console.log(i)});!s||(o.entity.aspect_ratio=s)})())}),await Promise.all(e),this.opensea_converted_tokens=t},async loadGalleryTokenMetas(t){const a=[];t.forEach(n=>{a.push(n.entity.token_meta_id)});const e=[];for(let n=0;n<a.length;n+=10){const o=await l(a.slice(n,n+10));e.push(...o)}this.gallery_token_meta_list=e},async loadDemoTokenMetas(){const a=await l(["D0tO2S6iMjZRvCOp1rRJ","RU2HdfpA2stEZ6QvXJcX"]);a.forEach(e=>{e.entity.platform=r.ArchiveDemo}),console.log("demo token_meta_list",a),this.demo_token_meta_list=a}}}),E=t=>{const a=`${t}_aspect_ratio`;return new Promise((e,n)=>{const o=localStorage.getItem(a);if(o){e(Number(o));return}const s=new Image;s.onload=()=>{const i=s.naturalWidth/s.naturalHeight;console.log("aspect_ratio for opensea",i,t),localStorage.setItem(a,String(i)),e(i)},s.onerror=()=>{n("Error loading image")},s.src=t})};export{M as u};