import{S as i}from"./SubmitTokenForm.80d27eea.js";import{u as l}from"./breakpoints.088cf35c.js";import{d as u,r as p,a as d,w as _,u as o,b as c,e as f,f as k,o as x,j as v}from"./index.ca5eefb0.js";import"./gallery-token.c4aa5fe8.js";import"./types.4ea69ea7.js";import"./firebaseConfig.4d01e9b5.js";import"./token-meta.8015aff1.js";import"./account.f2a81b83.js";import"./util.8ec5494a.js";import"./token-meta.f87bb69b.js";const A=u({__name:"SubmitTokenDialog",setup(w){const a=c(),n=f(),t=p(!0),{screen_type:r}=l();return(b,e)=>{const m=k("el-dialog");return x(),d(m,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=s=>t.value=s),title:"Submit To Moda Archives",top:"2vh",fullscreen:o(r)=="xs",style:{"max-width":"900px"},onClose:e[1]||(e[1]=s=>o(a).back()),width:o(r)!="xs"?"80%":"100%"},{default:_(()=>[v(i,{token_meta_id:o(n).params.token_meta_id},null,8,["token_meta_id"])]),_:1},8,["modelValue","fullscreen","width"])}}});export{A as default};