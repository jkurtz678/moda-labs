import{h as u,r as i,j as s,i as d}from"./firebaseConfig.4d01e9b5.js";class _{static createBaseEntity(){const t=d.now();return{created_at:t,updated_at:t}}static updateBaseEntity(){return{updated_at:d.now()}}}var l=(e=>(e.Landscape="landscape",e.Portrait="portrait",e.LandscapeReversed="landscape_reversed",e.PortraitReversed="portrait_reversed",e))(l||{}),h=(e=>(e.Ethereum="ethereum",e.OffChain="off_chain",e))(h||{}),g=(e=>(e.USD="usd",e.ETH="eth",e))(g||{}),f=(e=>(e.Archive="archive",e.Opensea="opensea",e.OpenseaArchive="opensea_archive",e.ArchiveDemo="archive_demo",e))(f||{}),m=(e=>(e.Owner="owner",e.Editor="editor",e.Reader="reader",e))(m||{});function v(e){return`${e.contract}/${e.identifier}`}function b(e){return`${e.entity.asset_contract_address}/${e.entity.token_id}`}function w(e){switch(e){case"opensea":return"Opensea";case"opensea_archive":return"Opensea Archive";default:return"Archive"}}function $(e){var t,a,r;switch((t=e==null?void 0:e.entity)==null?void 0:t.price_unit){case"usd":return`$${(a=e==null?void 0:e.entity)==null?void 0:a.price}`;case"eth":return`${(r=e==null?void 0:e.entity)==null?void 0:r.price} ETH`;default:return""}}async function L(e){const t=u(),a=i(t,`thumb_${e.entity.media_id}.jpg`);try{return await s(a)}catch(r){console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${e.entity.name}`,r)}return e.entity.external_thumbnail_url?e.entity.external_thumbnail_url:new URL("/assets/logo.61e654f6.png",self.location).href}async function R(e){const t=u(),a=i(t,`medium_${e.entity.media_id}.jpg`);try{return await s(a)}catch(n){console.log(`getTokenMetaThumbnailImageURL - failed to find archive medium image ${e.entity.name}`,n)}const r=i(t,`thumb_${e.entity.media_id}.jpg`);try{return await s(r)}catch(n){console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${e.entity.name}`,n)}return e.entity.external_thumbnail_url?e.entity.external_thumbnail_url:new URL("/assets/logo.61e654f6.png",self.location).href}async function T(e){var n,c;const t=u();let a;if((n=e.entity)!=null&&n.media_id)a=p(e);else if((c=e.entity)!=null&&c.external_media_url)return e.entity.external_media_url;const r=i(t,a);try{return await s(r)}catch(o){console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${e.entity.name}`,o)}return""}function p(e){return`${e.entity.media_id}${e.entity.media_type}`}export{_ as B,m as G,l as O,g as P,f as T,h as a,b,w as c,T as d,p as e,L as f,v as g,R as h,$ as p};
