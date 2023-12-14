import{_ as q,a as U,b as E,c as $}from"./search-icon.3e51fc51.js";import{_ as B,d as M,r as p,q as N,e as R,w as s,u as j,a as A,b as n,o as D,i as a,bF as F,k as m,j as d,f as b,z as h,p as K,m as W}from"./index.4e35c88c.js";import{i as z,a as C}from"./firebaseConfig.4bdd3a5f.js";import{b as x,s as V}from"./util.615b2f0e.js";const T=u=>(K("data-v-4a1395e1"),u=u(),W(),u),G=T(()=>m("div",{class:"card-header"},[m("span",null,"Login to MoDA Labs")],-1)),H={style:{display:"flex","justify-content":"space-between"}},J={style:{"margin-top":"20px"}},O=M({__name:"LoginView",setup(u){const _=p(!1),g=p(),c=j(),f=A(),k=p({email:[{required:!0,message:"Please input your email",trigger:"blur"},{type:"email",message:"Please input a valid email",trigger:"blur"}],password:[{required:!0,message:"Please input your password",trigger:"blur"},{min:6,message:"Password must be at least 6 characters",trigger:"blur"}]}),t=p({email:"",password:""});N(()=>{if(x()){const l=localStorage.getItem("saved_email");l&&(t.value.email=l)}});const w=async l=>{if(!l){V("Error finding form element");return}!await l.validate(o=>o)||(_.value=!0,z(C,t.value.email,t.value.password).then(o=>{var i;if(x()&&((i=o==null?void 0:o.user)==null?void 0:i.email)&&localStorage.setItem("saved_email",o.user.email),f.query.redir&&typeof f.query.redir=="string"){window.location.assign(f.query.redir);return}c.push({name:"home"})}).catch(o=>{o.code==="auth/user-not-found"?h({type:"error",message:"User not found"}):o.code==="auth/wrong-password"?h({type:"error",message:"Wrong password"}):V(o.message)}).finally(()=>{_.value=!1}))},I=l=>new URL({"../assets/base.css":q,"../assets/logo.png":U,"../assets/logo.svg":E,"../assets/search-icon.svg":$}[`../assets/${l}`],self.location).href;return(l,e)=>{const o=n("el-image"),i=n("el-input"),y=n("el-form-item"),v=n("el-button"),L=n("el-form"),S=n("el-card"),P=n("el-container");return D(),R(P,{style:{display:"flex","align-items":"center","flex-direction":"column"}},{default:s(()=>[a(S,{class:"login-card",style:{"margin-top":"80px"}},{header:s(()=>[a(o,{src:I("logo.png"),style:{height:"170px",width:"170px",margin:"auto",display:"block","margin-bottom":"15px"}},null,8,["src"]),G]),default:s(()=>[a(L,{ref_key:"form_ref",ref:g,model:t.value,rules:k.value,"label-position":"left","label-width":"110px",onKeyup:e[4]||(e[4]=F(r=>w(g.value),["enter","native"]))},{default:s(()=>[a(y,{label:"Email",prop:"email"},{default:s(()=>[a(i,{modelValue:t.value.email,"onUpdate:modelValue":e[0]||(e[0]=r=>t.value.email=r)},null,8,["modelValue"])]),_:1}),a(y,{label:"Password",prop:"password"},{default:s(()=>[a(i,{modelValue:t.value.password,"onUpdate:modelValue":e[1]||(e[1]=r=>t.value.password=r),type:"password"},null,8,["modelValue"])]),_:1}),m("div",H,[a(v,{onClick:e[2]||(e[2]=r=>w(g.value)),color:"#000000",loading:_.value},{default:s(()=>[d("Login")]),_:1},8,["loading"]),a(v,{type:"primary",link:"",onClick:e[3]||(e[3]=r=>b(c).push("forgot-password"))},{default:s(()=>[d("Forgot Password?")]),_:1})])]),_:1},8,["model","rules"])]),_:1}),m("div",J,[d("Don't have an account? "),a(v,{type:"primary",link:"",onClick:e[5]||(e[5]=r=>b(c).push("sign-up"))},{default:s(()=>[d(" Sign Up ")]),_:1})])]),_:1})}}});var ee=B(O,[["__scopeId","data-v-4a1395e1"]]);export{ee as default};