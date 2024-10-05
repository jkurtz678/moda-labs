import{_ as b,d as V,r,a as k,w as t,f as o,o as P,j as a,i,c2 as C,k as g,u as E,W as F,x as $}from"./index.c2e651e2.js";import{s as v}from"./util.c6679fa9.js";import{n as j,a as B}from"./firebaseConfig.4d01e9b5.js";const N={style:{display:"flex","justify-content":"space-between","margin-top":"30px"}},R=V({__name:"ForgotPasswordView",setup(S){const d=r(!1),c=r({email:[{required:!0,message:"Please input your email",trigger:"blur"},{type:"email",message:"Please input a valid email",trigger:"blur"}]}),u=r(),s=r({email:""}),f=async m=>{if(!m){v("Error finding form element");return}if(!await m.validate(l=>l))return;d.value=!0;const p={url:`${window.location.origin}/#/login`,handleCodeInApp:!0};j(B,s.value.email,p).then(()=>{$({type:"success",message:"Sent reset password email"})}).catch(l=>{v(l.message)}).finally(()=>{d.value=!1})};return(m,e)=>{const p=o("el-input"),l=o("el-form-item"),_=o("el-button"),y=o("el-form"),w=o("el-card"),x=o("el-container");return P(),k(x,{style:{display:"flex","justify-content":"center"}},{default:t(()=>[a(w,{class:"login-card",style:{"margin-top":"80px"}},{header:t(()=>e[4]||(e[4]=[i("div",{class:"card-header"},[i("span",null,"Forgot Password")],-1)])),default:t(()=>[a(y,{ref_key:"form_ref",ref:u,model:s.value,rules:c.value,"label-position":"left","label-width":"75px",onKeyup:e[3]||(e[3]=C(n=>f(u.value),["enter","native"]))},{default:t(()=>[e[7]||(e[7]=i("div",{style:{"margin-bottom":"30px"}},"Enter your email address and we'll send you a link to reset your password.",-1)),a(l,{label:"Email",prop:"email"},{default:t(()=>[a(p,{modelValue:s.value.email,"onUpdate:modelValue":e[0]||(e[0]=n=>s.value.email=n),type:"email"},null,8,["modelValue"])]),_:1}),i("div",N,[a(_,{onClick:e[1]||(e[1]=n=>f(u.value)),color:"#000000",loading:d.value},{default:t(()=>e[5]||(e[5]=[g("Send Reset Password Email")])),_:1},8,["loading"]),a(_,{type:"primary",link:"",onClick:e[2]||(e[2]=n=>E(F).push("login"))},{default:t(()=>e[6]||(e[6]=[g("Return to Login")])),_:1})])]),_:1},8,["model","rules"])]),_:1})]),_:1})}}});var A=b(R,[["__scopeId","data-v-40f84e35"]]);export{A as default};
