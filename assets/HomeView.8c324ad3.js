import{_ as F,a as j,b as W,c as J}from"./search-icon.3e51fc51.js";import{d as N,r as P,c as K,a as w,w as d,n as Q,u as o,b as H,e as I,f as p,o as r,g as A,h as T,i as l,j as V,F as M,k as R,l as D,t as X,_ as B,p as Y,m as Z,q as ee,E as L,s as te,R as ae}from"./index.49ce85d8.js";import{u as G}from"./account.7d293051.js";import{u as oe}from"./breakpoints.0a9cdabb.js";import{s as se,a as O,o as ne}from"./firebaseConfig.4d01e9b5.js";import{s as n}from"./util.ced6671d.js";import{u as le}from"./plaque.0e059214.js";import{u as re}from"./token-meta.7368cb92.js";import{u as ce}from"./gallery.9ae0e745.js";import{a as ie}from"./add-plaque.36af16a2.js";import"./types.c2052207.js";import"./plaque.88741b72.js";import"./token-meta.e9d92a72.js";import"./gallery-token.628d8fa1.js";const U=h=>(Y("data-v-5c106a87"),h=h(),Z(),h),ue=U(()=>D("div",{style:{"flex-grow":"1"}},null,-1)),_e=U(()=>D("div",{style:{"flex-grow":"1"}},null,-1)),de={key:0,style:{"margin-right":"10px",display:"flex","align-items":"center"}},pe=N({__name:"Header",setup(h){const c=H(),k=I(),s=G(),i=P(!1),{md_and_up:m,screen_type:x}=oe(),g=(e,t)=>{e.paneName&&typeof e.paneName=="string"&&c.push({name:e.paneName})},v=K(()=>{const e=s.account;if(!e)return"";if(e.entity.ens_name)return e.entity.ens_name;if(e.entity.email)return e.entity.email;const t=e.entity.wallet_address;return t?`${t.substring(0,6)}...${t.substring(t.length-4)}`:""}),q=()=>{i.value=!0,se(O).then(()=>{}).catch(e=>{n(e)}).finally(()=>{i.value=!1})},C=e=>new URL({"../assets/base.css":F,"../assets/logo.png":j,"../assets/logo.svg":W,"../assets/search-icon.svg":J}[`../assets/${e}`],self.location).href;return(e,t)=>{const f=p("el-image"),u=p("el-button"),y=p("el-tab-pane"),S=p("el-tabs"),b=p("el-header");return r(),w(b,{class:"header",style:Q(o(x)=="xs"?"padding: 0px 8px;":"")},{default:d(()=>[o(m)?(r(),w(f,{key:0,src:C("logo.png"),style:{width:"40px",height:"40px","margin-right":"2em"}},null,8,["src"])):A("",!0),o(c).currentRoute.value.name=="qr-scan"?(r(),T(M,{key:1},[ue,l(u,{icon:"close",color:"#000000",onClick:t[0]||(t[0]=_=>o(c).push("plaque-list"))},{default:d(()=>[V(" Cancel ")]),_:1})],64)):(r(),T(M,{key:2},[l(S,{modelValue:o(k).name,"onUpdate:modelValue":t[1]||(t[1]=_=>o(k).name=_),onTabClick:g,class:R(o(m)?"":"small-tabs")},{default:d(()=>[l(y,{label:"Plaques",name:"plaque-list"}),l(y,{label:"Artwork",name:"artwork-tile-grid"}),l(y,{label:"Galleries",name:"gallery-list"}),l(y,{label:"Account",name:"account-settings"})]),_:1},8,["modelValue","class"]),_e,o(m)?(r(),T("div",de,[D("div",null,X(v.value),1),o(s).is_user_admin?(r(),w(u,{key:0,type:"info",round:"",size:"small",style:{"margin-left":"8px"}},{default:d(()=>[V("Admin")]),_:1})):A("",!0)])):A("",!0),l(u,{onClick:q,style:{"margin-left":"1em"},loading:i.value},{default:d(()=>[V("Logout")]),_:1},8,["loading"])],64))]),_:1},8,["style"])}}});var me=B(pe,[["__scopeId","data-v-5c106a87"]]);const ge=N({__name:"HomeView",setup(h){const c=G(),k=le(),s=re(),i=ce(),m=H(),x=P(!1),g=P(),v=I();let q;ee(async()=>{g.value=L.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),q=ne(O,async e=>{if(console.log("onAuthStateChanged",e),e){g.value=L.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"});try{await C(e.uid)}finally{g.value.close()}}e||(c.setAccount(null),g.value.close(),m.push({name:"login",query:{redir:window.location.href}}))})}),te(()=>{console.log("unsubscribe onAuthStateChanged on unmount"),q()});async function C(e){console.log("LOAD APP DATA"),await c.loadAccount(e),await i.loadGalleryList(e).catch(a=>n(`Error loading galleries - ${a}`)),console.log("done loading galleries");const t=k.loadPlaques(e).catch(a=>n(`Error loading plaques - ${a}`)),f=k.loadGalleryPlaques(i.gallery_plaque_list).catch(a=>n(`Error loading gallery plaques - ${a}`)),u=s.loadArchiveTokenMetas(e).catch(a=>n(`Error loading archive token metas - ${a}`)),y=s.loadGalleryTokenMetas(i.gallery_token_meta_list).catch(a=>n(`Error loading token metas - ${a}`)),S=s.loadDemoTokenMetas().catch(a=>n(`Error loading demo token metas - ${a}`)),b=[t,f,u,f,y,S],_=c.get_account.entity.wallet_address;if(_){const a=s.loadOpenseaMintedTokenMetas(_).catch(E=>n(`Error loading opensea minted tokens - ${E}`)),z=s.loadOpenseaWalletTokenMetas(_).catch(E=>n(`Error loading opensea wallet tokens - ${E}`));b.push(a),b.push(z)}await Promise.all(b),_&&await s.loadOpenseaConvertedTokens();const $=v.query.plaque_id;$&&typeof $=="string"&&(await ie(e,$),m.replace({path:v.path,query:{}})),x.value=!0}return(e,t)=>{const f=p("el-main"),u=p("el-container");return r(),w(u,{style:{height:"100%",position:"fixed",top:"0px",left:"0px",right:"0px",bottom:"0px"}},{default:d(()=>[l(me),l(f,{style:{"background-color":"#DAD9D7"},class:R(o(v).fullPath.includes("artwork-tile-grid")?"remove-padding":"")},{default:d(()=>[x.value?(r(),w(o(ae),{key:0})):A("",!0)]),_:1},8,["class"])]),_:1})}}});var Te=B(ge,[["__scopeId","data-v-2fc25df4"]]);export{Te as default};