import{b as Z,c as ee}from"./gallery-token.c4aa5fe8.js";import{d as le,e as ae,u as te}from"./token-meta.f4de538d.js";import{h as oe,r as ue,u as re,i as P}from"./firebaseConfig.4d01e9b5.js";import{x as R,d as ne,r as f,O as se,m as ie,c as de,a as _,w as o,f as i,o as m,j as t,g as b,i as w,u as C,h as me,H as pe,F as _e,k as T,t as q,_ as ce,y as ve}from"./index.a21b016f.js";import{a as E,T as fe,P as $}from"./types.4ea69ea7.js";import{u as ke}from"./account.32165d6e.js";import{u as be}from"./token-meta.25d0f84e.js";import{s as g}from"./util.1286dcf9.js";const ge=oe(),Ve=async(x,c,S,l)=>{console.log("uploadFile - starting file upload for ",x);const v=ue(ge,x);re(v,c).on("state_changed",r=>{console.log("snapshot",r.bytesTransferred,r.totalBytes),S(r.bytesTransferred/r.totalBytes)},r=>{console.log("uploadFile error - ",r),R({message:`Error uploading file to moda archive - ${r}`,type:"error",showClose:!0,duration:12e3})},l)};const ye={style:{display:"flex","align-items":"center"}},we=ne({__name:"SubmitTokenForm",props:{token_meta_id:{}},setup(x){const c=x,S=f();f();const l=f({name:"",artist:"",artist_social_link:"",description:"",public_link:"",created_at:P.now(),updated_at:P.now(),media_id:"",media_type:"",browser_media_url:"",user_id:"",blockchain:E.OffChain,asset_contract_address:"",token_id:"",platform:fe.Archive,permission_to_sell:!1,price:0,price_unit:$.USD}),v=f([]),h=se({name:[{required:!0,message:"Required",trigger:"blur"}],artist:[{required:!0,message:"Required",trigger:"blur"}],asset_contract_address:[{required:!0,message:"Required",trigger:"blur"}],token_id:[{required:!0,message:"Required",trigger:"blur"}]}),r=f(!1),B=f("0%"),U=f([]),A=ke(),N=be(),F=f([]),V=f("file_upload");ie(()=>{c.token_meta_id?(l.value={...N.all_token_metas[c.token_meta_id].entity},l.value.price_unit||(l.value.price_unit=$.USD),V.value=l.value.browser_media_url?"browser_link":"file_upload"):Z().then(s=>{F.value=s})});const I=(s,e)=>ve.confirm(`Cancel the upload of ${s.name} ?`).then(()=>!0,()=>!1),y=de({get:()=>l.value.blockchain===E.Ethereum,set:s=>{l.value.blockchain=s?E.Ethereum:E.OffChain}}),O=()=>{},G=async s=>{var u;if(!s){g("Error finding form element");return}if(!await s.validate(d=>d))return;if(l.value.user_id=A.get_account.id,l.value.blockchain!="ethereum"&&(l.value.asset_contract_address="",l.value.token_id=""),c.token_meta_id){W(c.token_meta_id);return}r.value=!0;const n=await le().catch(d=>{console.error(d),r.value=!1,g(`Error getting moda archive token meta document - ${d}`)});if(!n){r.value=!1;return}if(V.value==="browser_link"){L(s,n);return}if(((u=v==null?void 0:v.value)==null?void 0:u.length)!==1){g("Please add a file to upload"),r.value=!1;return}await H(s,n)},H=async(s,e)=>{const n=v.value[0];r.value=!0;const u=k=>{B.value=`${Math.round(k*100)}%`},d=()=>{l.value.media_id=`${e.id}`,l.value.media_type=`.${n.name.split(".").pop()}`,L(s,e)},p=`${e.id}.${n.name.split(".").pop()}`;return Ve(p,n.raw,u,d).catch(k=>{console.error(k),r.value=!1,g(`Error uploading file to moda archive - ${k}`)})},L=async(s,e)=>{var u;let n;try{n=await ae(e,l.value)}catch(d){g(`Error uploading metadata to moda archive - ${d}`),r.value=!1;return}if((u=U.value)!=null&&u.length){const d=U.value.map(p=>({gallery_id:p,token_meta_id:n.id}));await ee(d).catch(p=>{g(`Error adding token to gallery - ${p}`),r.value=!1})}s.resetFields(),v.value=[],U.value=[],R({type:"success",message:"Successfully submitted artwork. Please wait a few moments for your artwork to appear."}),r.value=!1},W=s=>{r.value=!0,te(s,l.value).then(()=>{R({type:"success",message:"Successfully updated artwork"})}).catch(e=>{g(`Error updating token metadata - ${e}`)}).finally(()=>r.value=!1)};return(s,e)=>{const n=i("el-input"),u=i("el-form-item"),d=i("el-switch"),p=i("el-option"),k=i("el-select"),Y=i("el-input-number"),M=i("el-radio"),j=i("el-radio-group"),z=i("upload-filled"),D=i("el-icon"),Q=i("el-upload"),J=i("Loading"),K=i("el-button"),X=i("el-form");return m(),_(X,{ref_key:"formRef",ref:S,model:l.value,rules:h,"label-position":"left","label-width":"180px",style:{margin:"0 auto"}},{default:o(()=>[t(u,{label:"Artwork Title",prop:"name"},{default:o(()=>[t(n,{modelValue:l.value.name,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.name=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Artist Name",prop:"artist"},{default:o(()=>[t(n,{modelValue:l.value.artist,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.artist=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Plaque Description",prop:"description"},{default:o(()=>[t(n,{modelValue:l.value.description,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.description=a),type:"textarea",rows:"3"},null,8,["modelValue"])]),_:1}),t(u,{label:"Plaque QR Code Link",prop:"public_link"},{default:o(()=>[t(n,{modelValue:l.value.public_link,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.public_link=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Artist Social Media Link",prop:"artist_social_link"},{default:o(()=>[t(n,{modelValue:l.value.artist_social_link,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.artist_social_link=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Link to Blockchain"},{default:o(()=>[t(d,{modelValue:y.value,"onUpdate:modelValue":e[5]||(e[5]=a=>y.value=a),"active-text":y.value?"Enabled":"Disabled"},null,8,["modelValue","active-text"])]),_:1}),y.value?(m(),_(u,{key:0,label:"Blockchain",prop:"blockchain"},{default:o(()=>[t(k,{modelValue:l.value.blockchain,"onUpdate:modelValue":e[6]||(e[6]=a=>l.value.blockchain=a)},{default:o(()=>[t(p,{label:"Ethereum",value:"ethereum"})]),_:1},8,["modelValue"])]),_:1})):b("",!0),y.value?(m(),_(u,{key:1,label:"Contract Address",prop:"asset_contract_address"},{default:o(()=>[t(n,{modelValue:l.value.asset_contract_address,"onUpdate:modelValue":e[7]||(e[7]=a=>l.value.asset_contract_address=a)},null,8,["modelValue"])]),_:1})):b("",!0),y.value?(m(),_(u,{key:2,label:"Token ID",prop:"token_id"},{default:o(()=>[t(n,{modelValue:l.value.token_id,"onUpdate:modelValue":e[8]||(e[8]=a=>l.value.token_id=a)},null,8,["modelValue"])]),_:1})):b("",!0),t(u,{label:"Are You Willing to Sell This Piece?",class:"sell-piece"},{default:o(()=>[t(d,{modelValue:l.value.permission_to_sell,"onUpdate:modelValue":e[9]||(e[9]=a=>l.value.permission_to_sell=a),"active-text":l.value.permission_to_sell?"Yes":"No"},null,8,["modelValue","active-text"])]),_:1}),l.value.permission_to_sell?(m(),_(u,{key:3,label:"Price",prop:"price"},{default:o(()=>[w("div",null,[w("div",ye,[t(Y,{modelValue:l.value.price,"onUpdate:modelValue":e[10]||(e[10]=a=>l.value.price=a),controls:!1,placeholder:"No Price",style:{"max-width":"133px"}},null,8,["modelValue"]),t(k,{modelValue:l.value.price_unit,"onUpdate:modelValue":e[11]||(e[11]=a=>l.value.price_unit=a),style:{"margin-left":"12px","max-width":"90px"}},{default:o(()=>[t(p,{label:"USD",value:C($).USD},null,8,["value"]),t(p,{label:"ETH",value:C($).ETH},null,8,["value"])]),_:1},8,["modelValue"])]),e[17]||(e[17]=w("div",{style:{"font-size":"11px"}},"GALLERY COMISSION RATE IS 33%",-1))])]),_:1})):b("",!0),c.token_meta_id?b("",!0):(m(),_(u,{key:4,label:"Share to Gallery(s)"},{default:o(()=>[t(k,{modelValue:U.value,"onUpdate:modelValue":e[12]||(e[12]=a=>U.value=a),multiple:"",placeholder:"N/A",filterable:""},{default:o(()=>[(m(!0),me(_e,null,pe(F.value,a=>(m(),_(p,{key:a.id,label:`${a.entity.name}`,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})),t(u,null,{default:o(()=>[C(A).is_user_admin?(m(),_(j,{key:0,modelValue:V.value,"onUpdate:modelValue":e[13]||(e[13]=a=>V.value=a),disabled:c.token_meta_id},{default:o(()=>[t(M,{value:"file_upload"},{default:o(()=>e[18]||(e[18]=[T("Upload File")])),_:1}),t(M,{value:"browser_link"},{default:o(()=>e[19]||(e[19]=[T("Web Browser Link")])),_:1})]),_:1},8,["modelValue","disabled"])):b("",!0),V.value==="file_upload"&&!c.token_meta_id?(m(),_(Q,{key:1,class:"upload-demo","auto-upload":!1,action:"","on-remove":O,"before-remove":I,limit:1,drag:"","file-list":v.value,"onUpdate:fileList":e[14]||(e[14]=a=>v.value=a)},{default:o(()=>[t(D,{class:"el-icon--upload"},{default:o(()=>[t(z)]),_:1}),e[20]||(e[20]=w("div",{class:"el-upload__text"},[T(" Drop file here or "),w("em",null,"click to upload")],-1))]),_:1},8,["file-list"])):V.value=="browser_link"?(m(),_(n,{key:2,modelValue:l.value.browser_media_url,"onUpdate:modelValue":e[15]||(e[15]=a=>l.value.browser_media_url=a)},null,8,["modelValue"])):b("",!0)]),_:1}),t(u,null,{default:o(()=>[t(K,{onClick:e[16]||(e[16]=a=>G(S.value)),loading:r.value,color:"#000000"},{loading:o(()=>[t(D,{class:"is-loading",style:{"margin-right":"4px"}},{default:o(()=>[t(J)]),_:1}),T(" "+q(B.value),1)]),default:o(()=>[w("div",null,q(r.value?"UPLOADING":"SUBMIT"),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])}}});var he=ce(we,[["__scopeId","data-v-6ed928f6"]]);export{he as S};
