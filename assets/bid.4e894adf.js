import{P as c,_ as d,f as r,R as f,c as b,I as p,p as y,b as h}from"./firebaseConfig.4d01e9b5.js";import{B as m}from"./types.4ea69ea7.js";const B=c(r),n=d(B,"bid"),u=async(a,t)=>{const s=f(n,b("token_meta_id","==",a));await p(s,o=>{const i=[];o.forEach(e=>{i.push({id:e.id,entity:e.data()})}),t(i)})},w=async a=>{const t=await y(n,{...m.createBaseEntity(),...a}),s=await h(t);return{id:t.id,entity:s.data()}};export{w as c,u as g};
