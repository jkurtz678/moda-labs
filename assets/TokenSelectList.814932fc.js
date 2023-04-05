import{c as S}from"./types.6a5ef88e.js";import{u as V}from"./thumbnail-image.08da8782.js";import{_ as b,d as w,K as L,c as p,b as x,o as c,e as u,k as n,i as v,f as i,t as f,x as C,F as g,y as I,z as T,r as y,l as B,J as N,h as $,H as A,g as U,L as z}from"./index.f0b48430.js";const D=l=>(I("data-v-a13c9792"),l=l(),T(),l),F=D(()=>n("hr",{class:"hr"},null,-1)),H={class:"card-flex-container"},R={style:{display:"flex","align-items":"center",margin:"3px 25px 3px 0px"}},E={style:{flex:"3 1 0%","text-align":"left","align-items":"center"}},J={class:"bold"},K={class:"bold"},M={style:{"margin-right":"35px",opacity:"0.5"}},P=w({__name:"AddTokenItem",props:{in_list:{type:Boolean},token_meta:null},emits:["update_token_list"],setup(l,{emit:h}){const e=l,a=V(L(e,"token_meta")),_=p(()=>S(e.token_meta.entity.platform)),r=p({get(){return e.in_list},set(){h("update_token_list",e.token_meta.id)}});return(k,d)=>{const t=x("el-image"),o=x("el-checkbox");return c(),u(g,null,[F,n("div",H,[n("div",R,[v(t,{src:i(a),style:{width:"50px",height:"50px"},fit:"contain"},null,8,["src"])]),n("div",E,[n("p",J,f(e.token_meta.entity.name),1),n("p",K,f(e.token_meta.entity.artist),1)]),n("div",M,f(i(_)),1),v(o,{modelValue:i(r),"onUpdate:modelValue":d[0]||(d[0]=s=>C(r)?r.value=s:null),style:{"margin-right":"10px"}},null,8,["modelValue"])])],64)}}});var Y=b(P,[["__scopeId","data-v-a13c9792"]]);const j={key:0},q=n("hr",{class:"hr"},null,-1),W=w({__name:"TokenSelectList",props:{selected_token_meta_id_list:null,token_meta_list:null,max_height:null},emits:["update:selected_token_meta_id_list"],setup(l,{emit:h}){const e=l,a=y(""),_=y([]);B(()=>{if(!!e.token_meta_list)for(let t of e.token_meta_list)k.value.has(t.id)?_.value.unshift(t):_.value.push(t)});const r=p(()=>a.value.trim()!==""?_.value.filter(t=>{var o,s;return((o=t.entity.artist)==null?void 0:o.toLowerCase().includes(a.value.toLowerCase()))||((s=t.entity.name)==null?void 0:s.toLowerCase().includes(a.value.toLowerCase()))}):_.value),k=p(()=>new Set(e.selected_token_meta_id_list)),d=t=>{let o=[...e.selected_token_meta_id_list];o.some(s=>s===t)?o=o.filter(s=>s!=t):o.push(t),h("update:selected_token_meta_id_list",o)};return(t,o)=>{const s=x("el-input");return c(),u(g,null,[v(s,{type:"text",modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=m=>a.value=m),"prefix-icon":i(N),placeholder:"Search by artwork title or artist name"},null,8,["modelValue","prefix-icon"]),n("div",{style:z({marginTop:"10px",overflowY:"auto",maxHeight:e.max_height?`${e.max_height}px`:""})},[i(r).length==0?(c(),u("div",j,"No artwork found")):$("",!0),(c(!0),u(g,null,A(i(r),m=>(c(),U(Y,{token_meta:m,in_list:Boolean(i(k).has(m.id)),onUpdate_token_list:d},null,8,["token_meta","in_list"]))),256)),q],4)],64)}}});export{W as _};