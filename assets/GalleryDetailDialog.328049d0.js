import{u as W,g as X,a as Y}from"./account.de3e418a.js";import{u as Z}from"./token-meta.ba6d31e0.js";import{u as ee,s as le}from"./gallery.82c2a091.js";import{n as B}from"./firebaseConfig.d7a6b5a9.js";import{d as G,c as V,b as m,o as x,e as $,k as a,t as U,i as s,f as r,x as te,F as E,r as y,l as I,J as ae,h as N,H as se,g as oe,_ as ie,N as ne,w as p,u as ue,a as re,j as P,P as _e,q as D,y as de,z as ce}from"./index.f0b48430.js";import{s as q}from"./util.fb7a530c.js";import{u as pe}from"./gallery.9adac401.js";import{u as me}from"./breakpoints.e053b90d.js";import{u as ve}from"./plaque.0e21193c.js";import{_ as fe}from"./TokenSelectList.814932fc.js";import"./types.6a5ef88e.js";import"./token-meta.2d60a689.js";import"./plaque.093acf64.js";import"./thumbnail-image.08da8782.js";const ye={class:"card-flex-container"},ge={style:{flex:"3 1 0%",display:"flex","align-items":"center",padding:"0px 10px 0px 0px"}},he={class:"bold"},qe=a("hr",{class:"hr"},null,-1),xe=G({__name:"AddPlaqueItem",props:{in_list:{type:Boolean},plaque:null},emits:["update_plaque_list"],setup(v,{emit:k}){const e=v,u=V({get(){return e.in_list},set(){k("update_plaque_list",e.plaque.id)}});return(g,d)=>{const c=m("el-checkbox");return x(),$(E,null,[a("div",ye,[a("div",ge,[a("p",he,U(e.plaque.entity.name),1)]),s(c,{modelValue:r(u),"onUpdate:modelValue":d[0]||(d[0]=f=>te(u)?u.value=f:null),style:{"margin-right":"10px"}},null,8,["modelValue"])]),qe],64)}}}),ke={style:{"margin-top":"10px","overflow-y":"auto","max-height":"250px"}},we={key:0},be=G({__name:"PlaqueSelectList",props:{selected_plaque_id_list:null,plaque_list:null},emits:["update:selected_plaque_id_list"],setup(v,{emit:k}){const e=v,u=y(""),g=y([]);I(()=>{if(!!e.plaque_list)for(let o of e.plaque_list)c.value.has(o.id)?g.value.unshift(o):g.value.push(o)});const d=V(()=>u.value.trim()!==""?g.value.filter(o=>{var i;return(i=o.entity.name)==null?void 0:i.toLowerCase().includes(u.value.toLowerCase())}):g.value),c=V(()=>new Set(e.selected_plaque_id_list)),f=o=>{let i=[...e.selected_plaque_id_list];i.some(h=>h===o)?i=i.filter(h=>h!=o):i.push(o),k("update:selected_plaque_id_list",i)};return(o,i)=>{const h=m("el-input");return x(),$(E,null,[s(h,{type:"text",modelValue:u.value,"onUpdate:modelValue":i[0]||(i[0]=w=>u.value=w),"prefix-icon":r(ae),placeholder:"Search by plaque name"},null,8,["modelValue","prefix-icon"]),a("div",ke,[r(d).length==0?(x(),$("div",we,"No plaque found")):N("",!0),(x(!0),$(E,null,se(r(d),w=>(x(),oe(xe,{plaque:w,in_list:Boolean(r(c).has(w.id)),onUpdate_plaque_list:f},null,8,["plaque","in_list"]))),256))])],64)}}});const S=v=>(de("data-v-10c93641"),v=v(),ce(),v),Ve={class:"gallery-dialog"},$e={style:{"max-width":"500px",margin:"0 auto"}},Se=S(()=>a("div",{class:"header"},"Gallery Name",-1)),Ue=S(()=>a("div",{class:"header"},"Users",-1)),Ce={key:0},Ee={style:{display:"flex","align-items":"center",padding:"1em 0em","max-width":"350px"}},Ge={style:{"margin-bottom":"2em"}},Ae=S(()=>a("div",{class:"header"},"Plaques",-1)),Be=S(()=>a("div",{class:"header"},"Artwork",-1)),Pe={class:"dialog-footer"},De=S(()=>a("div",{style:{"flex-grow":"1"}},null,-1)),Ie=G({__name:"GalleryDetailDialog",setup(v){const k=y(!0),e=y({name:"",user_id_list:[],plaque_id_list:[],token_meta_id_list:[],created_at:B.now(),updated_at:B.now()}),u=y(),g=ne({name:[{required:!0,message:"Required",trigger:"blur"}]}),d=y(!1),c=y(""),f=ue(),o=re(),i=W(),h=ve(),w=pe(),L=Z(),{screen_type:R}=me(),b=y([]),j=V(()=>e.value.user_id_list.map(t=>b.value.find(l=>l.id==t))),z=V(()=>Object.values(h.plaque_map)),M=V(()=>Object.values(L.all_token_metas));I(async()=>{if(o.params.gallery_id){const t=w.gallery_list.find(l=>l.id===o.params.gallery_id);if(!t){q("Gallery not found"),f.push({name:"gallery-list"});return}e.value=t.entity,console.log("gallery.value",e.value),await X(e.value.user_id_list).then(l=>{console.log("accounts"),l.forEach(_=>{b.value.push(_)})}).catch(l=>{q(l)})}else b.value.push(i.get_account),e.value.user_id_list=[i.get_account.id]});const T=async t=>{if(!t){q("Error finding form element");return}if(!!await t.validate(_=>_)){if(d.value=!0,o.params.gallery_id){await ee(o.params.gallery_id,e.value).then(()=>{D.success("Gallery updated"),f.push({name:"gallery-list"})}).catch(_=>{q(_)}).finally(()=>{d.value=!1});return}le(e.value).then(()=>{D({message:"Gallery saved",type:"success"}),f.push({name:"gallery-list"})}).catch(_=>{q(`Error saving gallery: ${_}`)}).finally(()=>{d.value=!1})}},F=async()=>{if(b.value.find(t=>t.entity.email===c.value)){q("User already added");return}await Y(c.value).then(t=>{t&&(b.value.push(t),e.value.user_id_list.push(t.id))}).catch(t=>{console.log(t),q("Invalid email")})},O=t=>{e.value.user_id_list.splice(t,1),b.value.splice(t,1)};return(t,l)=>{const _=m("el-input"),H=m("el-form-item"),A=m("el-table-column"),C=m("el-button"),J=m("el-row"),K=m("el-form"),Q=m("el-dialog");return x(),$("div",Ve,[s(Q,{modelValue:k.value,"onUpdate:modelValue":l[5]||(l[5]=n=>k.value=n),title:"Edit Gallery",onClose:l[6]||(l[6]=n=>r(f).push({name:"gallery-list"})),top:"2vh",width:"75%",fullscreen:r(R)=="xs"},{footer:p(()=>[a("div",Pe,[De,s(C,{color:"#000000",onClick:l[4]||(l[4]=n=>T(u.value))},{default:p(()=>[P("Save")]),_:1})])]),default:p(()=>[a("div",$e,[s(K,{ref_key:"form_ref",ref:u,model:e.value,rules:g},{default:p(()=>[s(H,{prop:"name",style:{"max-width":"280px","margin-bottom":"2em"}},{default:p(()=>[Se,s(_,{modelValue:e.value.name,"onUpdate:modelValue":l[0]||(l[0]=n=>e.value.name=n),placeholder:"Name"},null,8,["modelValue"])]),_:1}),s(J,{style:{display:"block","margin-bottom":"1em"}},{default:p(()=>[Ue,s(r(_e),{data:r(j),style:{width:"100%"}},{default:p(()=>[s(A,{prop:"entity.email",label:"Email"}),s(A,{fixed:"right",label:"",width:"50"},{default:p(n=>[n.$index?(x(),$("div",Ce,[s(C,{link:"",type:"primary",size:"small",icon:"close",onClick:Ne=>O(n.$index)},null,8,["onClick"])])):N("",!0)]),_:1})]),_:1},8,["data"]),a("div",null,U(`Users in gallery: ${e.value.user_id_list.length}`),1),a("div",Ee,[s(_,{modelValue:c.value,"onUpdate:modelValue":l[1]||(l[1]=n=>c.value=n),placeholder:"Email"},null,8,["modelValue"]),s(C,{icon:"Plus",color:"#000000",size:"small",style:{"margin-left":"1em"},onClick:F},{default:p(()=>[P(" Add user ")]),_:1})])]),_:1}),a("div",Ge,[Ae,s(be,{selected_plaque_id_list:e.value.plaque_id_list,"onUpdate:selected_plaque_id_list":l[2]||(l[2]=n=>e.value.plaque_id_list=n),plaque_list:r(z)},null,8,["selected_plaque_id_list","plaque_list"]),a("div",null,U(`Plaques in gallery: ${e.value.plaque_id_list.length}`),1)]),a("div",null,[Be,s(fe,{selected_token_meta_id_list:e.value.token_meta_id_list,"onUpdate:selected_token_meta_id_list":l[3]||(l[3]=n=>e.value.token_meta_id_list=n),token_meta_list:r(M),max_height:350},null,8,["selected_token_meta_id_list","token_meta_list"]),a("div",null,U(`Artwork in gallery: ${e.value.token_meta_id_list.length}`),1)])]),_:1},8,["model","rules"])])]),_:1},8,["modelValue","fullscreen"])])}}});var Ye=ie(Ie,[["__scopeId","data-v-10c93641"]]);export{Ye as default};