import{u as I,c as W,d as S}from"./account.18b10234.js";import{u as N}from"./token-meta.9ddf2d7a.js";import{i as V,s as E}from"./util.54f13c1a.js";import{u as j}from"./breakpoints.aa6fbca5.js";import{d as q}from"./index.d82c3a20.js";import{_ as F,d as L,r as M,q as P,c as G,h as v,i as C,w as u,n as A,u as a,f as y,$ as H,o as r,l as t,t as i,F as J,C as K,a as z,j as m,z as k,A as Q,p as R,m as U}from"./index.d77b9061.js";import"./types.67d14e22.js";import"./firebaseConfig.4d01e9b5.js";import"./token-meta.094c1d66.js";const w=p=>(R("data-v-59a73eb0"),p=p(),U(),p),X={style:{display:"flex","justify-content":"center","margin-top":"50px"}},Y=w(()=>t("div",{class:"card-header"},[t("span",{style:{"font-size":"18px"}},"Account Settings")],-1)),Z=w(()=>t("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Email",-1)),ee=w(()=>t("div",{style:{"font-size":"var(--el-font-size-extra-small)","margin-top":"2em"}},"Ethereum Wallet",-1)),te={key:0},ne={style:{display:"flex","align-items":"center"}},ae={key:0,style:{width:"60px",height:"60px"}},oe=w(()=>t("br",null,null,-1)),se=L({__name:"AccountSettings",setup(p){const h=I(),n=N(),o=M(!1),{md_and_up:B,screen_type:T}=j(),x=M(!1),g=M(!1);P(()=>{$()});const $=async()=>{if(V()){x.value=!0;return}g.value=!0;const e=await q().catch(c=>{E(`Error detecting ethereum provider - ${c}`)});x.value=Boolean(e),g.value=!1},s=G(()=>h.get_account),O=async()=>{const{address:e,signature:c,ens_name:l}=await W();console.log("address",e,c,l),o.value=!0;const f={wallet_address:e,signature:c};l&&(f.ens_name=l),S(s.value.id,f).then(()=>h.loadAccount(s.value.id)).then(()=>{const d=n.loadOpenseaMintedTokenMetas(e).catch(_=>E(`Error loading opensea minted tokens - ${_}`)),b=n.loadOpenseaWalletTokenMetas(e).catch(_=>E(`Error loading opensea wallet tokens - ${_}`));return Promise.all([d,b])}).then(()=>n.loadOpenseaConvertedTokens()).then(()=>{k({type:"success",message:"Ethereum wallet connected"})}).catch(d=>{k({message:`Error connecting wallet - ${d}`,type:"error",showClose:!0,duration:12e3})}).finally(()=>o.value=!1)},D=async()=>{o.value=!0,Q.confirm("Are you sure you want to disconnect your wallet?","Disconnect",{type:"warning"}).then(()=>{const e={wallet_address:"",signature:"",ens_name:""};return S(s.value.id,e)}).then(()=>h.loadAccount(s.value.id)).then(()=>{n.opensea_minted_token_meta_list=[],n.opensea_wallet_token_meta_list=[],k({type:"success",message:"Ethereum wallet disconnected"})}).catch(e=>{k({message:`Error disconnecting wallet - ${e}`,type:"error",showClose:!0,duration:12e3})}).finally(()=>o.value=!1)};return(e,c)=>{const l=y("el-button"),f=y("el-link"),d=y("el-alert"),b=y("el-card"),_=H("loading");return r(),v("div",X,[C(b,{class:"container-card",style:A(a(B)?"min-width: 700px;":"")},{header:u(()=>[Y]),default:u(()=>[Z,t("div",null,i(a(h).get_account.entity.email),1),ee,s.value.entity.wallet_address?(r(),v("div",te,[t("div",ne,[t("div",{style:A(a(T)=="xs"?"max-width: 250px; text-overflow: ellipsis; overflow: hidden;":"")},i(s.value.entity.wallet_address),5),C(l,{text:"",circle:"",size:"small",icon:"close",style:{"margin-left":"5px"},onClick:D,loading:o.value},null,8,["loading"])]),t("div",null,"Loaded "+i(a(n).opensea_wallet_token_meta_list.length)+" wallet token"+i(a(n).opensea_wallet_token_meta_list.length==1?"":"s")+" from Opensea",1),t("div",null,"Loaded "+i(a(n).opensea_minted_token_meta_list.length)+" token"+i(a(n).opensea_minted_token_meta_list.length==1?"":"s")+" you minted from Opensea ",1)])):(r(),v(J,{key:1},[g.value?K((r(),v("div",ae,null,512)),[[_,g.value]]):x.value?(r(),z(l,{key:1,onClick:O,loading:o.value,icon:"Connection",color:"#000000"},{default:u(()=>[m(" Connect With Metamask ")]),_:1},8,["loading"])):(r(),z(d,{key:2,type:"warning","show-icon":"",title:"Metamask extension not found",style:{"margin-bottom":"1.5em"},closable:!1},{default:u(()=>[m(" The Metamask browser extension is required to connect your wallet, and this extension was not detected on your browser. "),oe,m("Please "),C(f,{type:"primary",style:{"font-size":"12px","vertical-align":"top"},href:"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"},{default:u(()=>[m(" install Metamask ")]),_:1}),m(" and then refresh the page. ")]),_:1}))],64))]),_:1},8,["style"])])}}});var he=F(se,[["__scopeId","data-v-59a73eb0"]]);export{he as default};