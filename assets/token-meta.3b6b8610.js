import{P as p,_,f as w,I as r,R as d,c as l,g as f,G as g,d as M,p as T,b as h,m as B,i as k,e as u}from"./firebaseConfig.4d01e9b5.js";import{B as m}from"./types.903c99bc.js";const y=p(w),o=_(y,"token-meta"),b=async e=>{const a=await T(o,{...m.createBaseEntity(),...e}),t=await h(a);return{id:a.id,entity:t.data()}},I=async()=>f(o),W=async(e,a)=>{await B(e,{...m.createBaseEntity(),...a});const t=await h(e);return{id:e.id,entity:t.data()}},D=async(e,a)=>{a.updated_at=k.now();const t=f(y,"token-meta",e);await u(t,a);const n=await h(t);return{id:n.id,entity:n.data()}},R=async e=>{const a={deleted:!0,updated_at:k.now()},t=f(y,"token-meta",e);await u(t,a)},q=async e=>{await r(d(o),a=>{const t=[];a.forEach(s=>{t.push({id:s.id,entity:s.data()})});const n=t.filter(s=>!s.entity.deleted);e(n)})},A=async e=>{await r(d(o,l("permission_to_sell","==",!0)),a=>{const t=[];a.forEach(s=>{t.push({id:s.id,entity:s.data()})});const n=t.filter(s=>!s.entity.deleted);e(n)})},G=async(e,a)=>{const t=d(o,l("user_id","==",e));await r(t,n=>{const s=[];n.forEach(c=>{s.push({id:c.id,entity:c.data()})});const i=s.filter(c=>!c.entity.deleted);a(i)})},P=async(e,a)=>{await r(f(y,"token-meta",e),t=>{a({id:t.id,entity:t.data()})})},x=async e=>{if(e.length==0)return[];const a=d(o,l(g(),"in",e)),t=await M(a),n=[];return t.forEach(i=>{n.push({id:i.id,entity:i.data()})}),n.filter(i=>!i.entity.deleted)};export{G as a,x as b,b as c,I as d,W as e,R as f,q as g,P as h,A as i,D as u};
