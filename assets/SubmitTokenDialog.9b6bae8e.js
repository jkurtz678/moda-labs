import{_ as m}from"./SubmitTokenForm.f7eb4254.js";import{u as l}from"./breakpoints.5659d6c7.js";import{d as u,r as p,e as _,w as d,f as o,u as c,a as f,b as k,o as v,i as b}from"./index.5578123b.js";import"./token-meta.7f5c0ba8.js";import"./firebaseConfig.d7a6b5a9.js";import"./types.d2ec9214.js";import"./gallery.d53d87c7.js";import"./account.17ed4fea.js";import"./util.79795cbe.js";import"./token-meta.be1a395b.js";const A=u({__name:"SubmitTokenDialog",setup(g){const r=c(),s=f(),t=p(!0),{screen_type:n}=l();return(w,e)=>{const i=k("el-dialog");return v(),_(i,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value=a),title:"Submit To Moda Archives",top:"2vh",fullscreen:o(n)=="xs",width:"75%",onClose:e[1]||(e[1]=a=>o(r).back())},{default:d(()=>[b(m,{token_meta_id:o(s).params.token_meta_id},null,8,["token_meta_id"])]),_:1},8,["modelValue","fullscreen"])}}});export{A as default};