import{s as b}from"./util.8ec5494a.js";import{g as E,c as $}from"./bid.4e894adf.js";import{h as L}from"./token-meta.8015aff1.js";import{i as h}from"./firebaseConfig.4d01e9b5.js";import{d as N,r as d,O as U,m as q,E as A,c as C,h as v,i as r,t as V,k as f,j as n,w as s,e as T,f as p,o as c,x as D}from"./index.ca5eefb0.js";import"./types.4ea69ea7.js";const I={class:"container"},R={class:"top-bid"},S={class:"bid"},W={key:0},j={style:{"font-weight":"bold","margin-right":"5px"}},F={style:{"font-weight":"bold"}},H={key:1},O={class:"bid-form"},ee=N({__name:"BiddingView",setup(z){const u=T(),y=d(),a=d({token_meta_id:"",bidding_name:"",email:"",phone_number:"",amount:0,created_at:h.now(),updated_at:h.now()}),g=d([]),w=d(),B=U({bidding_name:[{required:!0,message:"Please enter your bidding name",trigger:"blur"}],email:[{required:!0,message:"Please enter your email",trigger:"blur"},{type:"email",message:"Please enter a valid email address",trigger:["blur","change"]}],phone_number:[{required:!0,message:"Please enter your phone number",trigger:"blur"},{pattern:/^\d{10}$/,message:"Please enter a valid 10-digit phone number",trigger:"blur"}],amount:[{required:!0,message:"Please enter a bid amount",trigger:"blur"},{validator:(t,e,o)=>{let i=0;m.value&&(i=m.value.entity.amount+1),e<=i?o(new Error(`Please enter a bid amount greater than $${i}`)):o()},trigger:"blur"},{pattern:/^\d+(\.\d+)?$/,message:"Please enter a valid number",trigger:"blur"}]}),k=d(),_=d(!1);q(async()=>{if(!u.params.token_meta_id||u.params.token_meta_id instanceof Array){b("Error invalid token meta id");return}k.value=A.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),console.log("route.params.token_meta_id",u.params.token_meta_id),await L(u.params.token_meta_id,t=>{w.value=t,a.value.token_meta_id=t.id}),await E(u.params.token_meta_id,t=>{g.value=t,k.value.close()})});const m=C(()=>g.value.length===0?null:g.value.reduce((t,e)=>t.entity.amount>e.entity.amount?t:e)),x=async t=>{if(!t){b("Error finding form element");return}!await t.validate(o=>o)||(_.value=!0,await $(a.value).then(()=>{_.value=!1,t.resetFields(),D({type:"success",message:"Successfully submitted bid!"})}).catch(o=>{_.value=!1,b(o)}))};return(t,e)=>{const o=p("el-input"),i=p("el-form-item"),P=p("el-button"),M=p("el-form");return c(),v("div",I,[r("div",R,[e[6]||(e[6]=r("h3",null,"Highest Bid",-1)),r("div",S,[m.value?(c(),v("div",W,[r("span",j,V(m.value.entity.bidding_name),1),e[5]||(e[5]=f("- ")),r("span",F,"$"+V(m.value.entity.amount),1)])):(c(),v("div",H,"No bids"))])]),r("div",O,[e[9]||(e[9]=r("h3",{style:{"padding-bottom":"15px"}},"Place a Bid",-1)),n(M,{ref_key:"formRef",ref:y,model:a.value,rules:B,"label-width":"160px","label-position":"left"},{default:s(()=>[n(i,{label:"Email (private)",prop:"email"},{default:s(()=>[n(o,{modelValue:a.value.email,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value.email=l),modelModifiers:{trim:!0}},null,8,["modelValue"])]),_:1}),n(i,{label:"Phone (private)",prop:"phone_number"},{default:s(()=>[n(o,{modelValue:a.value.phone_number,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value.phone_number=l),modelModifiers:{trim:!0}},null,8,["modelValue"])]),_:1}),n(i,{label:"Bidding Name (public)",prop:"bidding_name"},{default:s(()=>[n(o,{modelValue:a.value.bidding_name,"onUpdate:modelValue":e[2]||(e[2]=l=>a.value.bidding_name=l)},null,8,["modelValue"])]),_:1}),n(i,{label:"Bid Amount (public)",prop:"amount",style:{"max-width":"350px"}},{default:s(()=>[n(o,{modelValue:a.value.amount,"onUpdate:modelValue":e[3]||(e[3]=l=>a.value.amount=l),modelModifiers:{number:!0}},{append:s(()=>e[7]||(e[7]=[f("$")])),_:1},8,["modelValue"])]),_:1}),n(P,{loading:_.value,onClick:e[4]||(e[4]=l=>x(y.value)),class:"submit-button",color:"#000000"},{default:s(()=>e[8]||(e[8]=[f(" SUBMIT ")])),_:1},8,["loading"])]),_:1},8,["model","rules"])])])}}});export{ee as default};