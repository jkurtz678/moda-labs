import{y as I}from"./index.2cd7cf19.js";import{B as m}from"./types.3cc10997.js";import{b as f,T as q,f as G,c as n,r as y,B as _,Q as w,O as k,G as E,A as B}from"./firebaseConfig.4bdd3a5f.js";import{g as M,a as U}from"./gallery-token.25579f23.js";import"./account.d74ef345.js";import{s as c}from"./util.2b7acca7.js";const P=f(G),g=q(P,"gallery-user"),$=async l=>{const e=n(g,y("user_id","==",l)),a=await _(e),t=[];return a.forEach(s=>{t.push({id:s.id,entity:s.data()})}),t},T=async l=>{if(l.length==0)return[];const e=n(g,y("gallery_id","in",l)),a=await _(e),t=[];return a.forEach(s=>{t.push({id:s.id,entity:s.data()})}),t},S=async l=>{const e=n(g,y("gallery_id","==",l)),a=await _(e),t=[];return a.forEach(s=>{t.push({id:s.id,entity:s.data()})}),t},H=async l=>{const e=[];for(const i of l)e.push(w(g,{...m.createBaseEntity(),...i}));const a=await Promise.all(e),t=[];return a.forEach(i=>{t.push(k(i))}),(await Promise.all(t)).map(i=>({id:i.id,entity:i.data()}))},J=async l=>{const e=await S(l),a=[];for(const t of e)a.push(E(B(P,"gallery-user",t.id)));await Promise.all(a)},L=f(G),p=q(L,"gallery-plaque"),O=async l=>{if(l.length==0)return[];const e=n(p,y("gallery_id","in",l)),a=await _(e),t=[];return a.forEach(s=>{t.push({id:s.id,entity:s.data()})}),t},Q=async l=>{const e=n(p,y("gallery_id","==",l)),a=await _(e),t=[];return a.forEach(s=>{t.push({id:s.id,entity:s.data()})}),t},K=async l=>{const e=[];for(const i of l)e.push(w(p,{...m.createBaseEntity(),...i}));const a=await Promise.all(e),t=[];return a.forEach(i=>{t.push(k(i))}),(await Promise.all(t)).map(i=>({id:i.id,entity:i.data()}))},N=async l=>{const e=await Q(l),a=[];for(const t of e)a.push(E(B(L,"gallery-plaque",t.id)));await Promise.all(a)},R=I({id:"gallery",state:()=>({gallery_list:[],gallery_user_list:[],gallery_plaque_list:[],gallery_token_meta_list:[]}),getters:{get_user_id_list_for_galleries:l=>Array().concat.apply(Array(),l.gallery_user_list.map(e=>e.entity.user_id)),gallery_map:l=>{const e=new Map;return l.gallery_list.forEach(a=>{e.set(a.id,a)}),e},gallery_token_metas_id_list:l=>l.gallery_token_meta_list.map(e=>e.entity.token_meta_id),gallery_user_id_map:l=>{const e=new Map;return l.gallery_user_list.forEach(a=>{var i;const t=a.entity.gallery_id,s=a.entity.user_id;e.has(t)?(i=e.get(t))==null||i.push(s):e.set(t,[s])}),e},gallery_plaque_id_map:l=>{const e=new Map;return l.gallery_plaque_list.forEach(a=>{var i;const t=a.entity.gallery_id,s=a.entity.plaque_id;e.has(t)?(i=e.get(t))==null||i.push(s):e.set(t,[s])}),e},gallery_token_meta_id_map:l=>{const e=new Map;return l.gallery_token_meta_list.forEach(a=>{var i;const t=a.entity.token_meta_id,s=a.entity.gallery_id;e.has(s)?(i=e.get(s))==null||i.push(t):e.set(s,[t])}),e},token_id_to_gallery_map(l){const e=new Map;return l.gallery_token_meta_list.forEach(a=>{var i;const t=a.entity.token_meta_id,s=this.gallery_map.get(a.entity.gallery_id);if(!s){console.error(`gallery not found for gallery_token_meta ${a.id}`);return}e.has(t)?(i=e.get(t))==null||i.push(s):e.set(t,[s])}),e}},actions:{async loadGalleryList(l){return $(l).then(async e=>{console.log("done loading gallery users",e);const a=e.map(r=>r.entity.gallery_id),t=10,s=[];for(let r=0;r<a.length;r+=t){const o=a.slice(r,r+t);s.push(M(o))}const i=Promise.all(s).then(r=>{this.gallery_list=Array().concat.apply(Array(),r)}).catch(r=>c(`error loading gallery names: ${r}`)),d=[];for(let r=0;r<a.length;r+=t){const o=a.slice(r,r+t);d.push(T(o))}const A=Promise.all(d).then(r=>{this.gallery_user_list=Array().concat.apply(Array(),r)}).catch(r=>c(`error loading gallery users: ${r}`)),u=[];for(let r=0;r<a.length;r+=t){const o=a.slice(r,r+t);u.push(O(o))}const b=Promise.all(u).then(r=>{this.gallery_plaque_list=Array().concat.apply(Array(),r)}).catch(r=>c(`error loading gallery plaques: ${r}`)),h=[];for(let r=0;r<a.length;r+=t){const o=a.slice(r,r+t);h.push(U(o))}const D=Promise.all(h).then(r=>{this.gallery_token_meta_list=Array().concat.apply(Array(),r)}).catch(r=>c(`error loading gallery token metas: ${r}`));await Promise.all([i,A,b,D])})},addGalleryToStore(l,e,a,t){console.log("adding gallery to store",l,e,a,t),this.gallery_list=this.gallery_list.filter(s=>s.id!==l.id).concat(l),this.gallery_user_list=this.gallery_user_list.filter(s=>s.entity.gallery_id!==l.id).concat(e),this.gallery_plaque_list=this.gallery_plaque_list.filter(s=>s.entity.gallery_id!==l.id).concat(a),this.gallery_token_meta_list=this.gallery_token_meta_list.filter(s=>s.entity.gallery_id!==l.id).concat(t)}}});export{N as a,K as b,H as c,J as d,R as u};