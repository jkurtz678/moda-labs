import{b as ee,c as le}from"./gallery-token.7f50acd9.js";import{d as ae,e as te,u as oe}from"./token-meta.3b6b8610.js";import{h as ue,r as ne,u as re,i as q}from"./firebaseConfig.4d01e9b5.js";import{x as h,d as se,r as v,O as ie,m as de,c as me,a as p,w as o,f as i,o as m,j as t,g,i as V,u as R,h as pe,H as _e,F as ce,k as E,t as N,_ as ve,y as fe}from"./index.b5137c9d.js";import{a as $,T as ke,P as C}from"./types.903c99bc.js";import{u as ge}from"./account.87ee4f31.js";import{u as be}from"./token-meta.8a36a59d.js";import{s as b}from"./util.2733adba.js";const ye=ue(),Ve=async(x,f,S,l)=>{console.log("uploadFile - starting file upload for ",x);const c=ne(ye,x);re(c,f).on("state_changed",n=>{console.log("snapshot",n.bytesTransferred,n.totalBytes),S(n.bytesTransferred/n.totalBytes)},n=>{console.log("uploadFile error - ",n),h({message:`Error uploading file to moda archive - ${n}`,type:"error",showClose:!0,duration:12e3})},l)};const we={style:{display:"flex","align-items":"center"}},Ue=se({__name:"SubmitTokenForm",props:{token_meta_id:{}},setup(x){const f=x,S=v();v();const l=v({name:"",artist:"",artist_social_link:"",description:"",public_link:"",created_at:q.now(),updated_at:q.now(),media_id:"",media_type:"",browser_media_url:"",user_id:"",blockchain:$.OffChain,asset_contract_address:"",token_id:"",platform:ke.Archive,permission_to_sell:!1,price:0,price_unit:C.USD}),c=v([]),B=ie({name:[{required:!0,message:"Required",trigger:"blur"}],artist:[{required:!0,message:"Required",trigger:"blur"}],asset_contract_address:[{required:!0,message:"Required",trigger:"blur"}],token_id:[{required:!0,message:"Required",trigger:"blur"}]}),n=v(!1),A=v("0%"),w=v([]),F=ge(),I=be(),L=v([]),T=v("file_upload");de(()=>{f.token_meta_id?(l.value={...I.all_token_metas[f.token_meta_id].entity},l.value.price_unit||(l.value.price_unit=C.USD)):ee().then(s=>{L.value=s})});const O=(s,e)=>fe.confirm(`Cancel the upload of ${s.name} ?`).then(()=>!0,()=>!1),y=me({get:()=>l.value.blockchain===$.Ethereum,set:s=>{l.value.blockchain=s?$.Ethereum:$.OffChain}}),G=()=>{},H=async s=>{var u;if(!s){b("Error finding form element");return}if(!await s.validate(d=>d))return;if(l.value.user_id=F.get_account.id,l.value.blockchain!="ethereum"&&(l.value.asset_contract_address="",l.value.token_id=""),f.token_meta_id){Y(f.token_meta_id);return}n.value=!0;const r=await ae().catch(d=>{console.error(d),n.value=!1,b(`Error getting moda archive token meta document - ${d}`)});if(!r){n.value=!1;return}if(T.value==="browser_link"){M(s,r);return}if(((u=c==null?void 0:c.value)==null?void 0:u.length)!==1){b("Please add a file to upload"),n.value=!1;return}await W(s,r)},W=async(s,e)=>{const r=c.value[0];n.value=!0;const u=k=>{A.value=`${Math.round(k*100)}%`},d=()=>{l.value.media_id=`${e.id}`,l.value.media_type=`.${r.name.split(".").pop()}`,M(s,e)},_=`${e.id}.${r.name.split(".").pop()}`;return Ve(_,r.raw,u,d).catch(k=>{console.error(k),n.value=!1,b(`Error uploading file to moda archive - ${k}`)})},M=async(s,e)=>{var u;let r;try{r=await te(e,l.value)}catch(d){b(`Error uploading metadata to moda archive - ${d}`),n.value=!1;return}if((u=w.value)!=null&&u.length){const d=w.value.map(_=>({gallery_id:_,token_meta_id:r.id}));await le(d).catch(_=>{b(`Error adding token to gallery - ${_}`),n.value=!1})}s.resetFields(),c.value=[],w.value=[],h({type:"success",message:"Successfully submitted artwork. Please wait a few moments for your artwork to appear."}),n.value=!1},Y=s=>{n.value=!0,oe(s,l.value).then(()=>{h({type:"success",message:"Successfully updated artwork"})}).catch(e=>{b(`Error updating token metadata - ${e}`)}).finally(()=>n.value=!1)};return(s,e)=>{const r=i("el-input"),u=i("el-form-item"),d=i("el-switch"),_=i("el-option"),k=i("el-select"),j=i("el-input-number"),D=i("el-radio"),z=i("el-radio-group"),Q=i("upload-filled"),P=i("el-icon"),J=i("el-upload"),K=i("Loading"),X=i("el-button"),Z=i("el-form");return m(),p(Z,{ref_key:"formRef",ref:S,model:l.value,rules:B,"label-position":"left","label-width":"180px",style:{margin:"0 auto"}},{default:o(()=>[t(u,{label:"Artwork Title",prop:"name"},{default:o(()=>[t(r,{modelValue:l.value.name,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.name=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Artist Name",prop:"artist"},{default:o(()=>[t(r,{modelValue:l.value.artist,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.artist=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Plaque Description",prop:"description"},{default:o(()=>[t(r,{modelValue:l.value.description,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.description=a),type:"textarea",rows:"3"},null,8,["modelValue"])]),_:1}),t(u,{label:"Plaque QR Code Link",prop:"public_link"},{default:o(()=>[t(r,{modelValue:l.value.public_link,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.public_link=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Artist Social Media Link",prop:"artist_social_link"},{default:o(()=>[t(r,{modelValue:l.value.artist_social_link,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.artist_social_link=a)},null,8,["modelValue"])]),_:1}),t(u,{label:"Link to Blockchain"},{default:o(()=>[t(d,{modelValue:y.value,"onUpdate:modelValue":e[5]||(e[5]=a=>y.value=a),"active-text":y.value?"Enabled":"Disabled"},null,8,["modelValue","active-text"])]),_:1}),y.value?(m(),p(u,{key:0,label:"Blockchain",prop:"blockchain"},{default:o(()=>[t(k,{modelValue:l.value.blockchain,"onUpdate:modelValue":e[6]||(e[6]=a=>l.value.blockchain=a)},{default:o(()=>[t(_,{label:"Ethereum",value:"ethereum"})]),_:1},8,["modelValue"])]),_:1})):g("",!0),y.value?(m(),p(u,{key:1,label:"Contract Address",prop:"asset_contract_address"},{default:o(()=>[t(r,{modelValue:l.value.asset_contract_address,"onUpdate:modelValue":e[7]||(e[7]=a=>l.value.asset_contract_address=a)},null,8,["modelValue"])]),_:1})):g("",!0),y.value?(m(),p(u,{key:2,label:"Token ID",prop:"token_id"},{default:o(()=>[t(r,{modelValue:l.value.token_id,"onUpdate:modelValue":e[8]||(e[8]=a=>l.value.token_id=a)},null,8,["modelValue"])]),_:1})):g("",!0),t(u,{label:"Are You Willing to Sell This Piece?",class:"sell-piece"},{default:o(()=>[t(d,{modelValue:l.value.permission_to_sell,"onUpdate:modelValue":e[9]||(e[9]=a=>l.value.permission_to_sell=a),"active-text":l.value.permission_to_sell?"Yes":"No"},null,8,["modelValue","active-text"])]),_:1}),l.value.permission_to_sell?(m(),p(u,{key:3,label:"Price",prop:"price"},{default:o(()=>[V("div",null,[V("div",we,[t(j,{modelValue:l.value.price,"onUpdate:modelValue":e[10]||(e[10]=a=>l.value.price=a),controls:!1,placeholder:"No Price",style:{"max-width":"133px"}},null,8,["modelValue"]),t(k,{modelValue:l.value.price_unit,"onUpdate:modelValue":e[11]||(e[11]=a=>l.value.price_unit=a),style:{"margin-left":"12px","max-width":"90px"}},{default:o(()=>[t(_,{label:"USD",value:R(C).USD},null,8,["value"]),t(_,{label:"ETH",value:R(C).ETH},null,8,["value"])]),_:1},8,["modelValue"])]),e[17]||(e[17]=V("div",{style:{"font-size":"11px"}},"GALLERY COMISSION RATE IS 33%",-1))])]),_:1})):g("",!0),f.token_meta_id?g("",!0):(m(),p(u,{key:4,label:"Share to Gallery(s)"},{default:o(()=>[t(k,{modelValue:w.value,"onUpdate:modelValue":e[12]||(e[12]=a=>w.value=a),multiple:"",placeholder:"N/A",filterable:""},{default:o(()=>[(m(!0),pe(ce,null,_e(L.value,a=>(m(),p(_,{key:a.id,label:`${a.entity.name}`,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})),f.token_meta_id?g("",!0):(m(),p(u,{key:5},{default:o(()=>{var a;return[((a=R(F).get_account.entity)==null?void 0:a.email)=="jkurtz678@gmail.com"?(m(),p(z,{key:0,modelValue:T.value,"onUpdate:modelValue":e[13]||(e[13]=U=>T.value=U)},{default:o(()=>[t(D,{value:"file_upload"},{default:o(()=>e[18]||(e[18]=[E("Upload File")])),_:1}),t(D,{value:"browser_link"},{default:o(()=>e[19]||(e[19]=[E("Web Browser Link")])),_:1})]),_:1},8,["modelValue"])):g("",!0),T.value==="file_upload"?(m(),p(J,{key:1,class:"upload-demo","auto-upload":!1,action:"","on-remove":G,"before-remove":O,limit:1,drag:"","file-list":c.value,"onUpdate:fileList":e[14]||(e[14]=U=>c.value=U)},{default:o(()=>[t(P,{class:"el-icon--upload"},{default:o(()=>[t(Q)]),_:1}),e[20]||(e[20]=V("div",{class:"el-upload__text"},[E(" Drop file here or "),V("em",null,"click to upload")],-1))]),_:1},8,["file-list"])):(m(),p(r,{key:2,modelValue:l.value.browser_media_url,"onUpdate:modelValue":e[15]||(e[15]=U=>l.value.browser_media_url=U)},null,8,["modelValue"]))]}),_:1})),t(u,null,{default:o(()=>[t(X,{onClick:e[16]||(e[16]=a=>H(S.value)),loading:n.value,color:"#000000"},{loading:o(()=>[t(P,{class:"is-loading",style:{"margin-right":"4px"}},{default:o(()=>[t(K)]),_:1}),E(" "+N(A.value),1)]),default:o(()=>[V("div",null,N(n.value?"UPLOADING":"SUBMIT"),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])}}});var Be=ve(Ue,[["__scopeId","data-v-15d41c40"]]);export{Be as S};