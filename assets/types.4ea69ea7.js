import{h as c,r as u,j as s,i as o}from"./firebaseConfig.4d01e9b5.js";class _{static createBaseEntity(){const t=o.now();return{created_at:t,updated_at:t}}static updateBaseEntity(){return{updated_at:o.now()}}}var d=(e=>(e.Landscape="landscape",e.Portrait="portrait",e.LandscapeReversed="landscape_reversed",e.PortraitReversed="portrait_reversed",e))(d||{}),h=(e=>(e.Ethereum="ethereum",e.OffChain="off_chain",e))(h||{}),g=(e=>(e.USD="usd",e.ETH="eth",e))(g||{}),m=(e=>(e.Archive="archive",e.Opensea="opensea",e.OpenseaArchive="opensea_archive",e.ArchiveDemo="archive_demo",e))(m||{}),f=(e=>(e.Owner="owner",e.Editor="editor",e.Reader="reader",e))(f||{});function b(e){return`${e.contract}/${e.identifier}`}function v(e){return`${e.entity.asset_contract_address}/${e.entity.token_id}`}function $(e){switch(e){case"opensea":return"Opensea";case"opensea_archive":return"Opensea Archive";default:return"Archive"}}function w(e){var t,r,n,a;if(!((t=e==null?void 0:e.entity)!=null&&t.price))return"";switch((r=e==null?void 0:e.entity)==null?void 0:r.price_unit){case"usd":return`$${(n=e==null?void 0:e.entity)==null?void 0:n.price}`;case"eth":return`${(a=e==null?void 0:e.entity)==null?void 0:a.price} ETH`;default:return""}}async function L(e){const t=c(),r=u(t,`thumb_${e.entity.media_id}.jpg`);try{return await s(r)}catch(n){console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${e.entity.name}`,n)}return e.entity.external_thumbnail_url?e.entity.external_thumbnail_url:new URL("/assets/logo.61e654f6.png",self.location).href}async function M(e){const t=c(),r=u(t,`medium_${e.entity.media_id}.jpg`);try{return await s(r)}catch(a){console.log(`getTokenMetaThumbnailImageURL - failed to find archive medium image ${e.entity.name}`,a)}const n=u(t,`thumb_${e.entity.media_id}.jpg`);try{return await s(n)}catch(a){console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${e.entity.name}`,a)}return e.entity.external_thumbnail_url?e.entity.external_thumbnail_url:new URL("/assets/logo.61e654f6.png",self.location).href}async function R(e){var a,i;const t=c();let r;if((a=e.entity)!=null&&a.media_id)r=p(e);else if((i=e.entity)!=null&&i.external_media_url)return e.entity.external_media_url;const n=u(t,r);try{return await s(n)}catch(l){console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${e.entity.name}`,l)}return""}function p(e){return`${e.entity.media_id}${e.entity.media_type}`}async function T(e){const t=c(),r=u(t,`tile/tile_${e.entity.media_id}.webp`);try{return await s(r)}catch(i){console.log(`getTokenMetaMediumImageURL - failed to find tile image ${e.entity.name}`,i)}const n=u(t,`medium_${e.entity.media_id}.jpg`);try{return await s(n)}catch(i){console.log(`getTokenMetaMediumImageURL - failed to find medium image ${e.entity.name}`,i)}const a=u(t,`thumb_${e.entity.media_id}.jpg`);try{return await s(a)}catch(i){console.log(`getTokenMetaMediumImageURL - failed to find thumbnail image ${e.entity.name}`,i)}return e.entity.external_thumbnail_url?e.entity.external_thumbnail_url:new URL("/assets/logo.61e654f6.png",self.location).href}export{_ as B,f as G,d as O,g as P,m as T,h as a,v as b,$ as c,R as d,p as e,L as f,b as g,M as h,T as i,w as p};
