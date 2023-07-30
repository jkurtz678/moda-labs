import{v as m}from"./index.4a1ead13.js";import{g as _,a as u,b as d,T as k}from"./types.6a5ef88e.js";import{g as h,a as p,b as f}from"./token-meta.e73e8480.js";import{u as g}from"./account.fcb97c6b.js";const c="742ea11e1d864fe2b23ac7cfe66a43f7";async function y(e){const a=await fetch(`https://api.opensea.io/api/v1/assets/?owner=${e}`,{headers:{"X-API-KEY":c}}),t=await a.json();return l(a,t),t.assets}const w=async e=>{const a=[];let t="";for(;;){const n=await fetch(`https://api.opensea.io/api/v1/events?account_address=${e}&event_type=created&limit=50${t?"&cursor="+t:""}`,{headers:{"X-API-KEY":c}}),s=await n.json();if(l(n,s),s.asset_events&&a.push(...s.asset_events.map(o=>({...o.asset,creator:o.from_account}))),t=s.next,!t)break}return a},l=(e,a)=>{if(e.status>=400)throw a.detail?a.detail:e.status==429?"Error - opensea rejected request due to rate limiting":"Error loading opensea tokens"},O=m({id:"token-meta",state:()=>({archive_token_meta_list:[],opensea_minted_token_meta_list:[],opensea_wallet_token_meta_list:[],opensea_converted_tokens:[],gallery_token_meta_list:[]}),getters:{archive_token_meta_map:e=>{const a={};return e.archive_token_meta_list.forEach(t=>{a[t.id]=t}),a},all_token_metas(e){const a={};return e.opensea_converted_tokens.forEach(t=>{a[t.id]=t}),e.archive_token_meta_list.forEach(t=>{a[_(t)]&&delete a[_(t)],a[t.id]=t}),e.gallery_token_meta_list.forEach(t=>{a[t.id]=t}),a},sorted_all_token_metas(e){return JSON.parse(JSON.stringify(Object.values(this.all_token_metas))).sort((t,n)=>{var i,r;const s=((i=t.entity.artist)==null?void 0:i.toLowerCase())+t.entity.name.toLowerCase(),o=((r=n.entity.artist)==null?void 0:r.toLowerCase())+n.entity.name.toLowerCase();return s<o?-1:s>o?1:0})}},actions:{async loadArchiveTokenMetas(e){if(g().is_user_admin){await h(t=>{this.archive_token_meta_list=t.filter(n=>n.entity.external_media_url||n.entity.media_id)});return}await p(e,t=>{this.archive_token_meta_list=t})},async loadOpenseaMintedTokenMetas(e){await w(e).then(a=>{this.opensea_minted_token_meta_list=a})},async loadOpenseaWalletTokenMetas(e){await y(e).then(a=>{this.opensea_wallet_token_meta_list=a})},async loadOpenseaConvertedTokens(){const e=[],a=[...this.opensea_minted_token_meta_list,...this.opensea_wallet_token_meta_list],t=[];a.forEach(n=>{const s=v(n);e.push(s),t.push((async()=>{if(!s.entity.external_media_url)return;const o=await T(s.entity.external_thumbnail_url||"").catch(i=>{console.log(i)});!o||(s.entity.aspect_ratio=o)})())}),await Promise.all(t),console.log("TOKEN META LIST",e),this.opensea_converted_tokens=e},async loadGalleryTokenMetas(e){const a=[];e.forEach(n=>{a.push(...n.entity.token_meta_id_list)});const t=[];for(let n=0;n<a.length;n+=10){const s=await f(a.slice(n,n+10));t.push(...s)}this.gallery_token_meta_list=t}}}),v=e=>{var a,t;return{id:u(e),entity:{name:e.name,artist:((t=(a=e.creator)==null?void 0:a.user)==null?void 0:t.username)||"N/A",description:e.description,public_link:e.permalink,blockchain:d.Ethereum,asset_contract_address:e.asset_contract.address,token_id:e.token_id,platform:k.Opensea,external_thumbnail_url:e.image_thumbnail_url,external_media_url:e.animation_url?e.animation_url:e.image_url}}},T=e=>{const a=`${e}_aspect_ratio`;return new Promise((t,n)=>{const s=localStorage.getItem(a);if(s){t(Number(s));return}const o=new Image;o.onload=()=>{const i=o.naturalWidth/o.naturalHeight;console.log("aspect_ratio for opensea",i,e),localStorage.setItem(a,String(i)),t(i)},o.onerror=()=>{n("Error loading image")},o.src=e})};export{O as u};