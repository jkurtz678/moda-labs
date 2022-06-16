import{d as j,r as p,o as u,b as k,i as e,t as A,h as t,F as B,_ as M,k as w,c as T,v as te,w as s,x as F,y as K,e as g,g as L,z as J,f as N,A as se,B as O,C as G,j as h,D as oe,G as le,H as ne,I as H,p as E,u as ae}from"./index.3b6714dc.js";import{u as z,c as ie}from"./plaque.f4f8e33f.js";import{u as W}from"./plaque.b6ad7e71.js";import{_ as _e,a as de,b as ue,c as re,u as X,d as Y}from"./token-meta.73333566.js";import{s as Z,u as ce,h as Q}from"./account.0699ece1.js";import{_ as pe}from"./PlaqueTokenItem.aee66303.js";import"./token-meta.4ac194a8.js";const me=e("hr",{class:"hr"},null,-1),fe={class:"card-flex-container"},ve={style:{flex:"1",width:"70px"}},ge=["src"],ye={style:{flex:"3 1 0%"}},he={class:"bold"},ke={class:"bold"},we=j({props:{in_list:{type:Boolean},token:null},emits:["update_token_list"],setup(l,{emit:_}){const r=l,c=d=>new URL({"../assets/base.css":_e,"../assets/logo.png":de,"../assets/logo.svg":ue,"../assets/search-icon.svg":re}[`../assets/${d}`],self.location).href;return(d,m)=>{const V=p("el-button");return u(),k(B,null,[me,e("div",fe,[e("div",ve,[e("img",{src:c("logo.png"),style:{width:"70px"}},null,8,ge)]),e("div",ye,[e("p",he,A(r.token.entity.name),1),e("p",ke,A(r.token.entity.artist),1)]),t(V,{icon:l.in_list?"close":"plus",type:l.in_list?"danger":"success",plain:"",circle:"",onClick:m[0]||(m[0]=I=>_("update_token_list",r.token.id))},null,8,["icon","type"])])],64)}}});const ee=l=>(O("data-v-19fceab9"),l=l(),G(),l),qe={class:"dialog-container"},xe={key:0},$e=ee(()=>e("hr",{class:"hr"},null,-1)),Ce={class:"dialog-footer"},be=ee(()=>e("div",{style:{"flex-grow":"1"}},null,-1)),Ae=h("Clear"),Se=h("Save"),Pe=j({props:{show_add_token_dialog:{type:Boolean},plaque_id:null},emits:["update:show_add_token_dialog"],setup(l,{emit:_}){const r=l,c=w([]),d=w(!1),m=w(""),{width:V,screen_type:I}=X(),P=W(),$=Y(),v=T({get(){return r.show_add_token_dialog},set(i){_("update:show_add_token_dialog",i)}});te(v,i=>{i&&(c.value=JSON.parse(JSON.stringify(n.value.entity.token_meta_id_list)))});const q=T(()=>$.archive_token_meta_list),y=T(()=>{const i=[];if(q!=null&&q.value)for(let a of q==null?void 0:q.value)P.meta_in_playlist(r.plaque_id,a.id)?i.unshift(a):i.push(a);return m.value.trim()!==""?i.filter(a=>{var C,b;return((C=a.entity.artist)==null?void 0:C.toLowerCase().includes(m.value.toLowerCase()))||((b=a.entity.name)==null?void 0:b.toLowerCase().includes(m.value.toLowerCase()))}):i}),n=T(()=>P.plaque_map[r.plaque_id]),f=T(()=>{const i={};return c.value.forEach(a=>{i[a]=!0}),i}),x=i=>{c.value.some(a=>a===i)?c.value=c.value.filter(a=>a!=i):c.value.push(i)},U=async()=>{d.value=!0,await z(r.plaque_id,{token_meta_id_list:c.value}).catch(i=>{Z(`Error updating plaque tokens - ${i}`)}),d.value=!1,v.value=!1},D=()=>{c.value=[]};return(i,a)=>{const C=p("el-card"),b=p("el-button"),R=p("el-dialog");return u(),k("div",qe,[t(R,{center:"",modelValue:g(v),"onUpdate:modelValue":a[1]||(a[1]=o=>se(v)?v.value=o:null),title:"Add tokens to plaque","close-on-click-modal":!1,fullscreen:g(I)=="xs"},{footer:s(()=>[e("span",Ce,[e("div",null,A(`Tokens in playlist: ${c.value.length}`),1),be,t(b,{onClick:D},{default:s(()=>[Ae]),_:1}),t(b,{type:"info",onClick:U,loading:d.value},{default:s(()=>[Se]),_:1},8,["loading"])])]),default:s(()=>[F(e("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=o=>m.value=o),class:"search-bar",placeholder:"Search by artwork title or artist name"},null,512),[[K,m.value]]),t(C,{class:"box-card",shadow:"never"},{default:s(()=>[g(y).length==0?(u(),k("div",xe,"No tokens found")):L("",!0),(u(!0),k(B,null,J(g(y),o=>(u(),N(we,{token:o,in_list:Boolean(g(f)[o.id]),onUpdate_token_list:x},null,8,["token","in_list"]))),256)),$e]),_:1})]),_:1},8,["modelValue","fullscreen"])])}}});var Te=M(Pe,[["__scopeId","data-v-19fceab9"]]);const S=l=>(O("data-v-d0645b2c"),l=l(),G(),l),Ve={style:{display:"flex","align-items":"center",padding:"1em"}},Ie={key:0},Le=S(()=>e("div",{style:{"flex-grow":"1"}},null,-1)),Ne=h("online"),Be={class:"card-simple"},Ee=S(()=>e("hr",null,null,-1)),Ue=S(()=>e("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"title",-1)),ze=S(()=>e("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"artist",-1)),je={style:{display:"flex","justify-content":"space-between","align-items":"center","margin-right":"1em"}},De={style:{padding:"1em"}},Re=h(" View "),Fe={key:0,class:"card-detail"},Me={style:{padding:"0 1em"}},Je={style:{display:"flex","align-items":"center","justify-content":"space-between",padding:"0.5em 1em"}},Oe=h("Settings"),Ge=h("Add Artwork"),He=S(()=>e("hr",null,null,-1)),Qe=S(()=>e("div",{style:{padding:"1em"}}," No tokens added",-1)),Ke=S(()=>e("hr",null,null,-1)),We={style:{display:"flex",padding:"1em"}},Xe=h("Clear Tokens"),Ye=S(()=>e("div",{style:{"flex-grow":"1"}},null,-1)),Ze=h("Close"),et={key:0,style:{padding:"1em",display:"flex","justify-content":"space-between"}},tt=h("Forget Display"),st=h("Close"),ot=j({props:{plaque:null},setup(l){const _=l,r=w("simple"),c=w(!1),d=w(!1),m=w(!1),V=async()=>{m.value=!0,await z(_.plaque.id,{name:_.plaque.entity.name}).catch(y=>{Z(`Error updating plaque tokens - ${y}`)}),d.value=!1,m.value=!1},I=Y(),P=T(()=>$.value.length==0?null:$.value[0]),$=T(()=>{const y=I.archive_token_meta_map;return _.plaque.entity.token_meta_id_list.map(f=>y[f])});w("0"),w(!0);const v=()=>{H.confirm(`Are you sure you want to clear tokens for plaque '${_.plaque.entity.name}'?`,"Clear tokens",{type:"warning"}).then(()=>{z(_.plaque.id,{token_meta_id_list:[]}).then(()=>{E({type:"success",message:"Tokens cleared"})}).catch(y=>{E({message:`Error clearing tokens from plaque - ${y}`,type:"error",showClose:!0,duration:12e3})})})},q=()=>{H.confirm(`Are you sure you want to forget the plaque named '${_.plaque.entity.name}'?`,"Forget plaque",{type:"warning"}).then(()=>{z(_.plaque.id,{wallet_address:""}).then(()=>{E({type:"success",message:"Plaque forgotten"})}).catch(y=>{E({message:`Error forgetting plaque - ${y}`,type:"error",showClose:!0,duration:12e3})})})};return(y,n)=>{const f=p("el-button"),x=p("el-tag"),U=p("el-col"),D=p("el-row"),i=p("ArrowRight"),a=p("el-icon"),C=p("el-collapse-transition"),b=p("Close"),R=p("el-card");return u(),N(R,null,{default:s(()=>[e("div",Ve,[d.value?F((u(),k("input",{key:1,"onUpdate:modelValue":n[0]||(n[0]=o=>_.plaque.entity.name=o),class:"edit-name-input"},null,512)),[[K,_.plaque.entity.name]]):(u(),k("h1",Ie,A(_.plaque.entity.name),1)),d.value?L("",!0):(u(),N(f,{key:2,icon:g(oe),onClick:n[1]||(n[1]=o=>d.value=!0),class:"editIcon",circle:""},null,8,["icon"])),d.value?(u(),N(f,{key:3,icon:g(le),loading:m.value,onClick:V,class:"editIcon",circle:"",type:m.value?"":"success",text:""},null,8,["icon","loading","type"])):L("",!0),Le,t(x,{class:"ml-2",type:"success"},{default:s(()=>[Ne]),_:1})]),t(C,null,{default:s(()=>[F(e("section",Be,[Ee,t(D,{style:{"margin-bottom":"8px",padding:"1em"}},{default:s(()=>[t(U,{span:12},{default:s(()=>{var o;return[Ue,e("span",null,A(((o=g(P))==null?void 0:o.entity.name)||"N/A"),1)]}),_:1}),t(U,{span:12},{default:s(()=>{var o;return[ze,h(" "+A(((o=g(P))==null?void 0:o.entity.artist)||"N/A"),1)]}),_:1})]),_:1}),e("div",je,[e("div",De,A(`Total artworks: ${l.plaque.entity.token_meta_id_list.length}`),1),t(f,{onClick:n[2]||(n[2]=o=>r.value="detail")},{default:s(()=>[Re,t(a,{class:"el-icon--right"},{default:s(()=>[t(i)]),_:1})]),_:1})])],512),[[ne,r.value=="simple"]])]),_:1}),t(C,null,{default:s(()=>[r.value=="detail"?(u(),k("section",Fe,[e("p",Me,A(`Total artworks: ${l.plaque.entity.token_meta_id_list.length}`),1),e("div",Je,[t(f,{onClick:n[3]||(n[3]=o=>r.value="settings")},{default:s(()=>[Oe]),_:1}),t(f,{type:"info",onClick:n[4]||(n[4]=o=>c.value=!0)},{default:s(()=>[Ge]),_:1})]),He,g($).length==0?(u(),k(B,{key:0},[Qe,Ke],64)):L("",!0),(u(!0),k(B,null,J(g($),o=>(u(),N(pe,{token_meta:o},null,8,["token_meta"]))),256)),e("div",We,[t(f,{onClick:v},{default:s(()=>[Xe]),_:1}),Ye,t(f,{onClick:n[5]||(n[5]=o=>r.value="simple")},{default:s(()=>[Ze,t(a,{class:"el-icon--right"},{default:s(()=>[t(b)]),_:1})]),_:1})])])):L("",!0)]),_:1}),t(C,null,{default:s(()=>[r.value=="settings"?(u(),k("section",et,[t(f,{type:"danger",plain:"",onClick:q},{default:s(()=>[tt]),_:1}),t(f,{onClick:n[6]||(n[6]=o=>r.value="detail")},{default:s(()=>[st,t(a,{class:"el-icon--right"},{default:s(()=>[t(b)]),_:1})]),_:1})])):L("",!0)]),_:1}),t(Te,{plaque_id:_.plaque.id,show_add_token_dialog:c.value,"onUpdate:show_add_token_dialog":n[7]||(n[7]=o=>c.value=o)},null,8,["plaque_id","show_add_token_dialog"])]),_:1})}}});var lt=M(ot,[["__scopeId","data-v-d0645b2c"]]);const nt=l=>(O("data-v-4c8baa0e"),l=l(),G(),l),at={class:"add-button-container"},it={style:{display:"flex","align-items":"center","justify-content":"center",height:"100%"}},_t=nt(()=>e("div",{style:{"font-size":"17px"}},"Add plaque",-1)),dt={style:{display:"flex","justify-content":"space-between","flex-wrap":"wrap"}},ut=h("Scan Plaque QR Code"),rt=h("Add test plaque "),ct=j({setup(l){const _=w(!1),{width:r,screen_type:c}=X(),d=w(!1),m=ae(),V=ce(),I=W(),P=async()=>{_.value=!0,await ie({name:"Test Plaque",wallet_address:V.get_account.entity.wallet_address,token_meta_id_list:[],created_at:Q.now(),updated_at:Q.now()}).catch($=>E({message:`Error creating test plaque- ${$}`,type:"error",showClose:!0,duration:12e3})),_.value=!1,d.value=!1};return($,v)=>{const q=p("Plus"),y=p("el-icon"),n=p("el-button"),f=p("el-dialog");return u(),k(B,null,[(u(!0),k(B,null,J(g(I).plaques,x=>(u(),N(lt,{plaque:x,key:x.id},null,8,["plaque"]))),128)),e("div",at,[e("div",it,[e("div",{class:"add-button",onClick:v[0]||(v[0]=x=>d.value=!0)},[t(y,{style:{"font-size":"26px","margin-bottom":"6px"}},{default:s(()=>[t(q)]),_:1}),_t])])]),t(f,{modelValue:d.value,"onUpdate:modelValue":v[2]||(v[2]=x=>d.value=x),title:"Add plaque",width:g(c)=="xs"?"90%":"50%"},{default:s(()=>[e("div",dt,[t(n,{onClick:v[1]||(v[1]=x=>{g(m).push("qr-scan"),d.value=!1}),icon:"camera",style:{margin:"10px 12px 10px 0px"}},{default:s(()=>[ut]),_:1}),t(n,{icon:"plus",onClick:P,loading:_.value,style:{margin:"10px 0px 10px 0px"}},{default:s(()=>[rt]),_:1},8,["loading"])])]),_:1},8,["modelValue","width"])],64)}}});var kt=M(ct,[["__scopeId","data-v-4c8baa0e"]]);export{kt as default};
