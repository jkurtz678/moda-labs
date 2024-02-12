import{d as Z,r as m,c as L,B as G,h as C,i as e,w as l,u as I,f as _,o as p,l as a,t as x,j as r,_ as ee,p as re,m as ue,z as N,a as B,b as be,C as we,D as Fe,G as Oe,g as J,H as Re,I as Be,F as K,J as de,A as Y,n as je,K as Je}from"./index.c7516d85.js";import{u as M,d as Ge}from"./plaque.7c883b56.js";import{c as Ke}from"./token-meta.642db8f1.js";import{u as te}from"./plaque.0189a385.js";import{u as _e,g as He}from"./account.52d41ebd.js";import{s as F,m as xe,a as $e}from"./util.b0e11255.js";import{T as Ce,O as Qe}from"./types.e0f521c1.js";import{u as Se}from"./breakpoints.a5fd6dfc.js";import{u as Ae}from"./token-meta.83b52374.js";import{_ as We}from"./TokenSelectList.5645c3e7.js";import{i as E,h as Xe,r as Ye,j as Ze}from"./firebaseConfig.4d01e9b5.js";import{P as et}from"./PlaqueTokenItem.dd6670d1.js";import{u as tt}from"./gallery.fa9a8f7a.js";import"./thumbnail-image.24ca7c1e.js";import"./ArtworkFilters.aa21a813.js";import"./gallery-token.2e61e420.js";const lt=h=>(re("data-v-2d725dde"),h=h(),ue(),h),at={class:"dialog-container"},nt={class:"dialog-footer"},ot=lt(()=>a("div",{style:{"flex-grow":"1"}},null,-1)),st=Z({__name:"AddTokenDialog",props:{show_add_token_dialog:{type:Boolean},plaque_id:{}},emits:["update:show_add_token_dialog"],setup(h,{emit:o}){const y=h,u=m([]),b=m(!1),V=o,{screen_type:P}=Se(),$=te(),k=Ae(),w=_e(),d=L({get(){return y.show_add_token_dialog},set(i){V("update:show_add_token_dialog",i)}});G(d,i=>{i&&(u.value=JSON.parse(JSON.stringify(A.value.entity.token_meta_id_list)))});const A=L(()=>$.plaque_map[y.plaque_id]),z=L(()=>k.sorted_all_token_metas),O=async()=>{b.value=!0;try{for(let[i,s]of u.value.entries()){const f=k.all_token_metas[s];if(!f)throw"Failed to find store token for token: "+s;if(f.entity.platform!=Ce.Opensea)continue;const g=JSON.parse(JSON.stringify(f));g.entity.user_id=w.get_account.id,g.entity.platform=Ce.OpenseaArchive;const S=await Ke(g.entity);u.value[i]=S.id}await M(y.plaque_id,{token_meta_id_list:u.value}),$.plaque_map[y.plaque_id].entity.token_meta_id_list=u.value}catch(i){F(`Error updating plaque tokens - ${i}`)}b.value=!1,d.value=!1},U=()=>{u.value=[]};return(i,s)=>{const f=_("el-button"),g=_("el-dialog");return p(),C("div",at,[e(g,{center:"",modelValue:d.value,"onUpdate:modelValue":s[1]||(s[1]=S=>d.value=S),title:"Add artwork to plaque","close-on-click-modal":!1,fullscreen:I(P)=="xs",top:"2vh","destroy-on-close":""},{footer:l(()=>[a("div",nt,[a("div",null,x(`Artwork in playlist: ${u.value.length}`),1),ot,e(f,{onClick:U},{default:l(()=>[r("Clear")]),_:1}),e(f,{type:"info",onClick:O,loading:b.value},{default:l(()=>[r("Save")]),_:1},8,["loading"])])]),default:l(()=>[e(We,{selected_token_meta_id_list:u.value,"onUpdate:selected_token_meta_id_list":s[0]||(s[0]=S=>u.value=S),token_meta_list:z.value,plaque_id:i.plaque_id},null,8,["selected_token_meta_id_list","token_meta_list","plaque_id"])]),_:1},8,["modelValue","fullscreen"])])}}});var it=ee(st,[["__scopeId","data-v-2d725dde"]]);const dt={class:"controller-buttons"},rt=Z({__name:"PlaqueController",props:{plaque:{}},setup(h){const o=te(),y=h,u=m(!1),b=m(!1),V=m(!1),P=m(!1),$=L({get:()=>y.plaque.entity.orientation||"landscape",set:w=>{M(y.plaque.id,{orientation:w}).then(()=>{o.plaque_map[y.plaque.id].entity.orientation=w,N({type:"success",message:"Plaque orientation updated"})}).catch(d=>{F(`Error updating plaque orientation - ${d}`)})}}),k=w=>{const d={type:w,time_sent:E.now()};M(y.plaque.id,{command:d}).then(()=>{o.plaque_map[y.plaque.id].entity.command=d,N({type:"success",message:"Command sent to plaque"})}).catch(A=>{F(`Error sending command to plaque - ${A}`)}).finally(()=>{u.value=!1,b.value=!1,V.value=!1,P.value=!1})};return(w,d)=>{const A=_("el-button"),z=_("el-radio"),O=_("el-radio-group");return p(),C("div",null,[a("div",dt,[e(A,{circle:"",text:"",loading:u.value,icon:"DArrowLeft",onClick:d[0]||(d[0]=U=>{u.value=!0,k("playlist_previous")})},null,8,["loading"]),e(A,{circle:"",text:"",loading:b.value,icon:"VideoPlay",onClick:d[1]||(d[1]=U=>{b.value=!0,k("play")})},null,8,["loading"]),e(A,{circle:"",text:"",icon:"VideoPause",loading:V.value,onClick:d[2]||(d[2]=U=>{V.value=!0,k("pause")})},null,8,["loading"]),e(A,{circle:"",text:"",icon:"DArrowRight",loading:P.value,onClick:d[3]||(d[3]=U=>{P.value=!0,k("playlist_next")})},null,8,["loading"])]),e(O,{modelValue:$.value,"onUpdate:modelValue":d[4]||(d[4]=U=>$.value=U),style:{display:"flex","flex-direction":"column","align-items":"start","margin-top":"20px"}},{default:l(()=>[e(z,{label:"landscape",size:"small"},{default:l(()=>[r("Landscape")]),_:1}),e(z,{label:"portrait",size:"small"},{default:l(()=>[r("Portrait")]),_:1}),e(z,{label:"landscape_reversed",size:"small"},{default:l(()=>[r("Landscape Reversed")]),_:1}),e(z,{label:"portrait_reversed",size:"small"},{default:l(()=>[r("Portrait Reversed")]),_:1})]),_:1},8,["modelValue"])])}}});var ut=ee(rt,[["__scopeId","data-v-100e65c8"]]);const D=h=>(re("data-v-1efd144e"),h=h(),ue(),h),_t={style:{display:"flex","align-items":"center",padding:"1em"}},ct={key:0},pt=D(()=>a("div",{style:{"flex-grow":"1"}},null,-1)),mt={class:"card-simple"},yt=D(()=>a("hr",null,null,-1)),ft=D(()=>a("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"title",-1)),vt=D(()=>a("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"artist",-1)),gt={style:{padding:"0.3em 1em"}},qt={style:{display:"flex","justify-content":"space-between","align-items":"center","margin-right":"1em",padding:"1em"}},ht={key:0,class:"card-detail"},kt={style:{padding:"0 1em"}},wt={style:{display:"flex","align-items":"center","justify-content":"space-between",padding:"0.5em 1em"}},xt=D(()=>a("hr",null,null,-1)),Ct=D(()=>a("div",{style:{padding:"1em"}},"No artwork added",-1)),bt=D(()=>a("hr",null,null,-1)),$t={style:{display:"flex",padding:"1em"}},St=D(()=>a("div",{style:{"flex-grow":"1"}},null,-1)),At={key:0,style:{padding:"1em"}},Vt={style:{padding:"1em 0em",display:"flex","justify-content":"space-between","align-items":"center"}},Pt={key:0},Nt=D(()=>a("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Associated User",-1)),zt={key:0},Lt={key:1},It={style:{"font-size":"var(--el-font-size-extra-small)"}},Et={key:1},Dt={style:{"margin-bottom":"1em"}},Ut=D(()=>a("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Machine Info",-1)),Tt={key:0,style:{"margin-bottom":"1em"}},Mt=D(()=>a("div",{class:"caption"},"Admin only commands",-1)),Ft={style:{"margin-bottom":"1em"}},Ot={style:{"margin-bottom":"1em"}},Rt={style:{"margin-bottom":"1em"}},Bt={style:{"margin-top":"1em"}},jt=D(()=>a("div",{class:"caption"},"Enable Support VPN",-1)),Jt={style:{display:"flex","justify-content":"end"}},Gt=Z({__name:"PlaqueCard",props:{plaque:{}},setup(h){const o=h,y=te();be();const u=m("simple"),b=m(!1),V=m(!1),P=m(""),$=m(!1),k=m(!1),w=m(!1),d=m(!1),A=m(!1),z=m(!1),O=m(!1);E.now();const U=async()=>{$.value=!0,await M(o.plaque.id,{name:o.plaque.entity.name}).catch(t=>{F(`Error updating plaque tokens - ${t}`)}),V.value=!1,$.value=!1},i=_e(),s=Ae(),f=L(()=>g.value.length==0?null:g.value[0]),g=L(()=>{const t=s.all_token_metas;return o.plaque.entity.token_meta_id_list.map(c=>t[c])}),S=L(()=>$e(o.plaque)),Q=L(()=>{const t=o.plaque.entity.last_check_in_time;return t?new Date(t.seconds*1e3).toLocaleString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",second:"numeric",hour12:!0}):"N/A"}),le=t=>new Date(t.seconds*1e3).toLocaleString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",second:"numeric",hour12:!0}),ae=()=>{Y.confirm(`Are you sure you want to clear tokens for plaque '${o.plaque.entity.name}'?`,"Clear tokens",{type:"warning"}).then(()=>{M(o.plaque.id,{token_meta_id_list:[]}).then(()=>{y.plaque_map[o.plaque.id].entity.token_meta_id_list=[],N({type:"success",message:"Tokens cleared"})}).catch(t=>{N({message:`Error clearing tokens from plaque - ${t}`,type:"error",showClose:!0,duration:12e3})})})},ne=()=>{Y.confirm(`Are you sure you want to forget the plaque named '${o.plaque.entity.name}'?`,"Forget plaque",{type:"warning"}).then(()=>{M(o.plaque.id,{user_id:"",token_meta_id_list:[]}).then(()=>{y.plaque_map[o.plaque.id].entity.user_id="",y.plaque_map[o.plaque.id].entity.token_meta_id_list=[],N({type:"success",message:"Plaque forgotten"})}).catch(t=>{N({message:`Error forgetting plaque - ${t}`,type:"error",showClose:!0,duration:12e3})})})};G(u,t=>{t=="settings"&&o.plaque.entity.user_id&&!P.value&&He(o.plaque.entity.user_id).then(n=>{P.value=n.entity.email}).catch(n=>{N({message:`Error loading user account - ${n}`,type:"error",showClose:!0,duration:12e3})})});const W=L({get:()=>Boolean(o.plaque.entity.vpn_active),set:t=>{M(o.plaque.id,{vpn_active:t}).then(()=>{y.plaque_map[o.plaque.id].entity.vpn_active=t,N({type:"success",message:"VPN setting updated"})}).catch(n=>{F(`Error updating VPN setting- ${n}`)})}}),oe=L(()=>{var c,j,R;const t=(R=(j=(c=o==null?void 0:o.plaque)==null?void 0:c.entity)==null?void 0:j.machine_data)==null?void 0:R.updated_at;return t?new Date(t.seconds*1e3+t.nanoseconds/1e6).toLocaleString():"N/A"}),v=()=>{const t={type:"upload_logs",time_sent:E.now()};k.value=!0,M(o.plaque.id,{command:t}).then(()=>{y.plaque_map[o.plaque.id].entity.command=t,N({type:"success",message:"Command sent to plaque"})}).catch(n=>{F(`Error sending command to plaque - ${n}`)}).finally(()=>{k.value=!1})},Ve=()=>{Y.confirm(`Are you sure you want to restart the plaque '${o.plaque.entity.name}'?`,"Restart plaque",{type:"warning"}).then(()=>{const t={type:"restart_machine",time_sent:E.now()};w.value=!0,M(o.plaque.id,{command:t}).then(()=>{y.plaque_map[o.plaque.id].entity.command=t,N({type:"success",message:"Command sent to plaque"})}).catch(n=>{F(`Error sending command to plaque - ${n}`)}).finally(()=>{w.value=!1})})},Pe=()=>{Y.confirm(`Are you sure you want to restart the app on plaque '${o.plaque.entity.name}'?`,"Restart app",{type:"warning"}).then(()=>{const t={type:"restart_app",time_sent:E.now()};d.value=!0,M(o.plaque.id,{command:t}).then(()=>{y.plaque_map[o.plaque.id].entity.command=t,N({type:"success",message:"Command sent to plaque"})}).catch(n=>{F(`Error sending command to plaque - ${n}`)}).finally(()=>{d.value=!1})})},ce=(t,n)=>M(t,{command:n}).then(()=>{y.plaque_map[t].entity.command=n,N({type:"success",message:"Command sent to plaque"})}).catch(c=>{F(`Error sending command to plaque - ${c}`)}),Ne=()=>{const t={type:"display_extend",time_sent:E.now()};z.value=!0,ce(o.plaque.id,t).finally(()=>{z.value=!1})},ze=()=>{const t={type:"display_mirror",time_sent:E.now()};O.value=!0,ce(o.plaque.id,t).finally(()=>{O.value=!1})},Le=async t=>{const n=Xe(),c=`viewer-logs/${t}`,j=Ye(n,c);try{const R=await Ze(j);window.open(R,"_blank");return}catch(R){console.log(`downloadLogs - failed to download logs for ${t}`,R),F(`Error downloading logs - ${R}`)}return""};return(t,n)=>{const c=_("el-button"),j=_("el-tag"),R=_("el-tooltip"),pe=_("el-col"),Ie=_("el-row"),Ee=_("ArrowRight"),se=_("el-icon"),ie=_("el-collapse-transition"),me=_("Close"),X=_("el-table-column"),De=_("el-table"),Ue=_("el-dialog"),Te=_("el-switch"),Me=_("el-card");return p(),B(Me,null,{default:l(()=>[a("div",_t,[V.value?we((p(),C("input",{key:1,"onUpdate:modelValue":n[0]||(n[0]=q=>o.plaque.entity.name=q),class:"edit-name-input"},null,512)),[[Fe,o.plaque.entity.name]]):(p(),C("h1",ct,x(o.plaque.entity.name),1)),V.value?J("",!0):(p(),B(c,{key:2,icon:I(Oe),onClick:n[1]||(n[1]=q=>V.value=!0),class:"editIcon",circle:""},null,8,["icon"])),V.value?(p(),B(c,{key:3,icon:I(Re),loading:$.value,onClick:U,class:"editIcon",circle:"",type:$.value?"":"success",text:""},null,8,["icon","loading","type"])):J("",!0),pt,e(R,{class:"box-item",effect:"dark",content:`Last activity ${Q.value}`,placement:"top"},{default:l(()=>[S.value?(p(),B(j,{key:0,class:"ml-2",type:"success"},{default:l(()=>[r("online")]),_:1})):(p(),B(j,{key:1,class:"ml-2",type:"danger"},{default:l(()=>[r("offline")]),_:1}))]),_:1},8,["content"])]),e(ie,null,{default:l(()=>[we(a("section",mt,[yt,e(Ie,{style:{padding:"1em"}},{default:l(()=>[e(pe,{span:12},{default:l(()=>{var q;return[ft,a("span",null,x(((q=f.value)==null?void 0:q.entity.name)||"N/A"),1)]}),_:1}),e(pe,{span:12},{default:l(()=>{var q;return[vt,r(" "+x(((q=f.value)==null?void 0:q.entity.artist)||"N/A"),1)]}),_:1})]),_:1}),a("div",gt,x(`Total artworks: ${t.plaque.entity.token_meta_id_list.length}`),1),a("div",qt,[e(c,{type:"info",onClick:n[2]||(n[2]=q=>b.value=!0)},{default:l(()=>[r("Add Artwork")]),_:1}),e(c,{onClick:n[3]||(n[3]=q=>u.value="detail")},{default:l(()=>[r(" Details"),e(se,{class:"el-icon--right"},{default:l(()=>[e(Ee)]),_:1})]),_:1})])],512),[[Be,u.value=="simple"]])]),_:1}),e(ie,null,{default:l(()=>[u.value=="detail"?(p(),C("section",ht,[a("p",kt,x(`Total artworks: ${t.plaque.entity.token_meta_id_list.length}`),1),a("div",wt,[e(c,{onClick:n[4]||(n[4]=q=>u.value="settings")},{default:l(()=>[r("Settings")]),_:1}),e(c,{onClick:ae},{default:l(()=>[r("Clear Artwork")]),_:1})]),xt,g.value.length==0?(p(),C(K,{key:0},[Ct,bt],64)):J("",!0),(p(!0),C(K,null,de(g.value,q=>(p(),B(et,{token_meta:q},null,8,["token_meta"]))),256)),a("div",$t,[e(c,{type:"info",onClick:n[5]||(n[5]=q=>b.value=!0)},{default:l(()=>[r("Add Artwork")]),_:1}),St,e(c,{onClick:n[6]||(n[6]=q=>u.value="simple")},{default:l(()=>[r("Close"),e(se,{class:"el-icon--right"},{default:l(()=>[e(me)]),_:1})]),_:1})])])):J("",!0)]),_:1}),e(ie,null,{default:l(()=>{var q,ye,fe,ve,ge,qe,he,ke;return[u.value=="settings"?(p(),C("section",At,[e(ut,{plaque:o.plaque},null,8,["plaque"]),a("div",Vt,[t.plaque.entity.user_id?(p(),C("div",Pt,[Nt,P.value?(p(),C("div",zt,x(P.value),1)):(p(),C("div",Lt,"Loading...")),a("div",It,x(t.plaque.entity.user_id),1)])):(p(),C("div",Et,"No associated user")),t.plaque.entity.user_id?(p(),B(c,{key:2,type:"danger",plain:"",onClick:ne},{default:l(()=>[r("Forget Display")]),_:1})):J("",!0)]),a("div",Dt,[Ut,a("div",null,"Machine name: "+x((ye=(q=t.plaque.entity.machine_data)==null?void 0:q.machine_name)!=null?ye:"N/A"),1),a("div",null,"Version: "+x((ve=(fe=t.plaque.entity.machine_data)==null?void 0:fe.version)!=null?ve:"N/A"),1),a("div",null,"Local IP: "+x((qe=(ge=t.plaque.entity.machine_data)==null?void 0:ge.local_ip)!=null?qe:"N/A"),1),a("div",null,"Public IP: "+x((ke=(he=t.plaque.entity.machine_data)==null?void 0:he.public_ip)!=null?ke:"N/A"),1),a("div",null,"Updated At: "+x(oe.value),1),a("div",null,"Free Space: "+x(t.plaque.entity.free_space?I(xe)(t.plaque.entity.free_space):"N/A"),1)]),I(i).is_user_admin?(p(),C("div",Tt,[Mt,a("div",Ft,[e(c,{plain:"",onClick:v,loading:k.value},{default:l(()=>[r("Upload Logs To Cloud")]),_:1},8,["loading"]),e(c,{plain:"",onClick:n[7]||(n[7]=T=>A.value=!0)},{default:l(()=>[r("View Logs")]),_:1})]),a("div",Ot,[e(c,{plain:"",onClick:Ne,loading:z.value},{default:l(()=>[r("Extend Display")]),_:1},8,["loading"]),e(c,{plain:"",onClick:ze,loading:O.value},{default:l(()=>[r("Mirror Display")]),_:1},8,["loading"])]),a("div",Rt,[e(c,{type:"danger",plain:"",onClick:Pe,loading:d.value},{default:l(()=>[r("Restart App")]),_:1},8,["loading"]),e(c,{type:"danger",plain:"",onClick:Ve,loading:w.value},{default:l(()=>[r("Restart Machine")]),_:1},8,["loading"])]),e(Ue,{modelValue:A.value,"onUpdate:modelValue":n[8]||(n[8]=T=>A.value=T),title:"Uploaded Logs",width:"75%"},{default:l(()=>[e(De,{data:t.plaque.entity.uploaded_log_files},{default:l(()=>[e(X,{prop:"file_name",label:"File Name",width:"400"}),e(X,{prop:"upload_time",label:"Time Uploaded"},{default:l(({row:T})=>[r(x(le(T.upload_time)),1)]),_:1}),e(X,{prop:"bytes",label:"Size"},{default:l(({row:T})=>[r(x(I(xe)(T.bytes)),1)]),_:1}),e(X,{fixed:"right",label:"",width:"80"},{default:l(({row:T})=>[e(c,{icon:"Download",text:"",circle:"",onClick:al=>Le(T.file_name)},null,8,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1},8,["modelValue"]),a("div",Bt,[jt,e(Te,{modelValue:W.value,"onUpdate:modelValue":n[9]||(n[9]=T=>W.value=T),"active-text":"Enabled","inactive-text":"Off"},null,8,["modelValue"])])])):J("",!0),a("div",Jt,[e(c,{onClick:n[10]||(n[10]=T=>u.value="detail")},{default:l(()=>[r("Close"),e(se,{class:"el-icon--right"},{default:l(()=>[e(me)]),_:1})]),_:1})])])):J("",!0)]}),_:1}),e(it,{plaque_id:o.plaque.id,show_add_token_dialog:b.value,"onUpdate:show_add_token_dialog":n[11]||(n[11]=q=>b.value=q)},null,8,["plaque_id","show_add_token_dialog"])]),_:1})}}});var Kt=ee(Gt,[["__scopeId","data-v-1efd144e"]]);const H=h=>(re("data-v-517aa68d"),h=h(),ue(),h),Ht=H(()=>a("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Filter by gallery",-1)),Qt=H(()=>a("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Online only",-1)),Wt=H(()=>a("div",{class:"caption"},"Sort order",-1)),Xt=H(()=>a("div",{style:{"padding-bottom":"90px"}},null,-1)),Yt={class:"add-button-container"},Zt={style:{display:"flex","align-items":"center","justify-content":"center",height:"100%"}},el=H(()=>a("div",{style:{"font-size":"17px"}},"Add plaque",-1)),tl={style:{display:"flex","justify-content":"space-between","flex-wrap":"wrap"}},ll=Z({__name:"PlaqueList",setup(h){const o=m(!1),{screen_type:y}=Se(),u=m(!1),b=be(),V=_e(),P=tt(),$=m(""),k=m(localStorage.getItem("plaque_list_filter_by_gallery")||"");G(k,i=>{localStorage.setItem("plaque_list_filter_by_gallery",i)});const w=m(localStorage.getItem("online_filter")==="true"||!1);G(w,i=>{if(i){localStorage.setItem("online_filter","true");return}localStorage.setItem("online_filter","false")});const d=m(localStorage.getItem("plaque_list_sort_order")||"name");G(d,i=>{localStorage.setItem("plaque_list_sort_order",i)});const A=te(),z=async()=>{o.value=!0,await Ge({name:"Test Plaque",user_id:V.get_account.id,token_meta_id_list:[],created_at:E.now(),updated_at:E.now(),orientation:Qe.Landscape,command:{type:"",time_sent:E.fromMillis(0)},last_check_in_time:E.fromMillis(0),vpn_active:!1,machine_data:{machine_name:"",version:"",local_ip:"",public_ip:"",updated_at:E.fromMillis(0)}}).catch(i=>N({message:`Error creating test plaque- ${i}`,type:"error",showClose:!0,duration:12e3})),o.value=!1,u.value=!1},O=L(()=>JSON.parse(JSON.stringify(A.all_plaque_list)).sort((s,f)=>{const g=s.entity.name.toLowerCase(),S=f.entity.name.toLowerCase();return g<S?-1:g>S?1:0})),U=L(()=>{let i=[...O.value];return i=i.filter(s=>s.entity.name||s.entity.user_id||s.entity.token_meta_id_list.length>0),k.value&&(i=i.filter(s=>{var f;return(f=P.gallery_list.find(g=>g.id==k.value))==null?void 0:f.entity.plaque_id_list.includes(s.id)})),w.value&&(i=i.filter(s=>$e(s))),d.value=="name"?i=i.sort((s,f)=>s.entity.name.localeCompare(f.entity.name)):d.value=="last_check_in_time"&&(i=i.sort((s,f)=>s.entity.last_check_in_time==null&&f.entity.last_check_in_time==null?0:s.entity.last_check_in_time==null?1:f.entity.last_check_in_time==null?-1:f.entity.last_check_in_time.seconds-s.entity.last_check_in_time.seconds)),$.value?i.filter(s=>s.entity.name.toLowerCase().includes($.value.toLowerCase())):i});return(i,s)=>{const f=_("el-input"),g=_("el-button"),S=_("el-option"),Q=_("el-select"),le=_("el-switch"),ae=_("el-popover"),ne=_("Plus"),W=_("el-icon"),oe=_("el-dialog");return p(),C(K,null,[a("div",{class:"subheader",style:je([{display:"flex","align-items":"center"},I(y)=="xs"?"padding: 0px 8px 10px;":""])},[e(f,{modelValue:$.value,"onUpdate:modelValue":s[0]||(s[0]=v=>$.value=v),"prefix-icon":I(Je),placeholder:"Search plaques",style:{"max-width":"350px"},clearable:""},null,8,["modelValue","prefix-icon"]),e(ae,{placement:"bottom",title:"Plaque Filters",width:300,trigger:"click"},{reference:l(()=>[e(g,{icon:"Filter",style:{"margin-left":"10px"},type:"info",size:"small"},{default:l(()=>[r("Filters")]),_:1})]),default:l(()=>[Ht,e(Q,{modelValue:k.value,"onUpdate:modelValue":s[1]||(s[1]=v=>k.value=v),placeholder:"Filter by gallery",style:{width:"260px","margin-bottom":"12px"}},{default:l(()=>[e(S,{label:"All plaques",value:""}),(p(!0),C(K,null,de(I(P).gallery_list,v=>(p(),B(S,{key:v.id,label:`${v.entity.name}`,value:v.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),Qt,e(le,{modelValue:w.value,"onUpdate:modelValue":s[2]||(s[2]=v=>w.value=v),style:{"margin-bottom":"1em"}},null,8,["modelValue"]),Wt,e(Q,{modelValue:d.value,"onUpdate:modelValue":s[3]||(s[3]=v=>d.value=v),placeholder:"Sort by",class:"filter-select"},{default:l(()=>[e(S,{label:"Sort by name",value:"name"}),e(S,{label:"Sort by last activity",value:"last_check_in_time"})]),_:1},8,["modelValue"])]),_:1}),e(g,{icon:"Camera",type:"info",onClick:s[4]||(s[4]=v=>I(b).push("qr-scan")),style:{"margin-left":"10px"},size:"small"},{default:l(()=>[r("Scan")]),_:1})],4),Xt,(p(!0),C(K,null,de(U.value,v=>(p(),B(Kt,{plaque:v,key:v.id},null,8,["plaque"]))),128)),a("div",Yt,[a("div",Zt,[a("div",{class:"add-button",onClick:s[5]||(s[5]=v=>u.value=!0)},[e(W,{style:{"font-size":"26px","margin-bottom":"6px"}},{default:l(()=>[e(ne)]),_:1}),el])])]),e(oe,{modelValue:u.value,"onUpdate:modelValue":s[7]||(s[7]=v=>u.value=v),title:"Add plaque",width:I(y)=="xs"?"90%":"50%",style:{"max-width":"500px"}},{default:l(()=>[a("div",tl,[e(g,{onClick:s[6]||(s[6]=v=>{I(b).push("qr-scan"),u.value=!1}),icon:"camera",color:"#000000",style:{margin:"10px 12px 10px 0px"}},{default:l(()=>[r("Scan Plaque QR Code")]),_:1}),e(g,{icon:"plus",onClick:z,loading:o.value,style:{margin:"10px 0px 10px 0px"},color:"#000000"},{default:l(()=>[r("Add test plaque ")]),_:1},8,["loading"])])]),_:1},8,["modelValue","width"])],64)}}});var hl=ee(ll,[["__scopeId","data-v-517aa68d"]]);export{hl as default};
