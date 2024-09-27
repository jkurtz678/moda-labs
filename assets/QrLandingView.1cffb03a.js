import{s as y}from"./util.adacd43a.js";import{g as w,_ as x}from"./bid.a170cfcc.js";import{h as P}from"./token-meta.9b03395e.js";import{i as p}from"./firebaseConfig.4d01e9b5.js";import{d as L,r as a,Q as B,q,E as M,c as A,h as v,a as C,l as r,i as d,w as _,e as E,f as T,o as m,j as u}from"./index.4cd96ec2.js";import"./types.67d14e22.js";import"./thumbnail-image.0fdfe25b.js";const z={class:"container"},V={key:0},$={style:{padding:"20px 0px",display:"flex",gap:"10px",width:"100%"}},j={style:{padding:"12px 0px"}},N=r("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Learn More",-1),Q={style:{display:"flex",gap:"10px",width:"100%"}},O=L({__name:"QrLandingView",setup(D){const o=E();a();const f=a({token_meta_id:"",bidding_name:"",email:"",phone_number:"",amount:0,created_at:p.now(),updated_at:p.now()}),i=a([]),s=a();B({bidding_name:[{required:!0,message:"Please enter your bidding name",trigger:"blur"}],email:[{required:!0,message:"Please enter your email",trigger:"blur"},{type:"email",message:"Please enter a valid email address",trigger:["blur","change"]}],phone_number:[{required:!0,message:"Please enter your phone number",trigger:"blur"},{pattern:/^\d{10}$/,message:"Please enter a valid 10-digit phone number",trigger:"blur"}],amount:[{required:!0,message:"Please enter a bid amount",trigger:"blur"},{validator:(e,n,t)=>{let l=0;c.value&&(l=c.value.entity.amount+1),n<=l?t(new Error(`Please enter a bid amount greater than $${l}`)):t()},trigger:"blur"},{pattern:/^\d+(\.\d+)?$/,message:"Please enter a valid number",trigger:"blur"}]});const g=a();a(!1),q(async()=>{if(!o.params.token_meta_id||o.params.token_meta_id instanceof Array){y("Error invalid token meta id");return}g.value=M.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),console.log("route.params.token_meta_id",o.params.token_meta_id),await P(o.params.token_meta_id,e=>{s.value=e,f.value.token_meta_id=e.id}),await w(o.params.token_meta_id,e=>{i.value=e,g.value.close()})});const c=A(()=>i.value.length===0?null:i.value.reduce((e,n)=>e.entity.amount>n.entity.amount?e:n)),k=()=>{window.open("https://moda-labs.xyz/","_blank")},b=()=>{window.open("https://www.instagram.com/projekt.______/","_blank")},h=()=>{window.open("https://account.venmo.com/u/ModaArt","_blank")};return(e,n)=>{const t=T("el-button");return m(),v("div",z,[s.value?(m(),C(x,{key:1,token_meta:s.value},null,8,["token_meta"])):(m(),v("div",V,"Loading")),r("div",null,[r("div",$,[d(t,{color:"#000000",size:"large",onClick:h,style:{"flex-grow":"1","font-size":"18px"},round:""},{default:_(()=>[u("Tip Artist")]),_:1})]),r("div",j,[N,r("div",Q,[d(t,{onClick:k,style:{"flex-grow":"1"}},{default:_(()=>[u("Moda Plaque")]),_:1}),d(t,{onClick:b,style:{"flex-grow":"1"}},{default:_(()=>[u("Projekt ______")]),_:1})])])])])}}});export{O as default};
