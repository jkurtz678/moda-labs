import{b as f,T as k,f as m,j as o,c as r,r as y,A as h,E as p,B as l,n as w,K as B,O as u,Q as T}from"./firebaseConfig.d7a6b5a9.js";import{B as g}from"./types.6a5ef88e.js";const c=f(m),i=k(c,"token-meta"),M=async s=>{const a=await T(i,{...g.createBaseEntity(),...s}),t=await u(a);return{id:a.id,entity:t.data()}},b=async(s,a)=>{a.updated_at=w.now();const t=h(c,"token-meta",s);await B(t,a);const e=await u(t);return{id:e.id,entity:e.data()}},q=async s=>{await o(r(i),a=>{const t=[];a.forEach(e=>{t.push({id:e.id,entity:e.data()})}),s(t)})},A=async(s,a)=>{const t=r(i,y("user_id","==",s));await o(t,e=>{const n=[];e.forEach(d=>{n.push({id:d.id,entity:d.data()})}),a(n)})},D=async(s,a)=>{await o(h(c,"token-meta",s),t=>{a({id:t.id,entity:t.data()})})},I=async s=>{if(s.length==0)return[];const a=r(i,y(p(),"in",s)),t=await l(a),e=[];return t.forEach(n=>{e.push({id:n.id,entity:n.data()})}),e};export{A as a,I as b,M as c,D as d,q as g,b as u};