import{u as O,c as j}from"./token-meta.ba91ce12.js";import{g as G,d as z,u as H,n as C}from"./firebaseConfig.d7a6b5a9.js";import{q as V,d as J,r as p,N as K,l as Q,b as d,o as k,g as b,w as o,i as t,j as y,h,t as U,k as x,I as W}from"./index.36adc59a.js";import{b as X,T as Y}from"./types.ab61d3d9.js";import{u as Z}from"./account.67ba5898.js";import{u as ee}from"./token-meta.2d91fef4.js";import{s as _}from"./util.667b6d5f.js";const ae=G(),te=async(f,m,v,a)=>{console.log("uploadFile - starting file upload for ",f);const i=z(ae,f);H(i,m).on("state_changed",s=>{console.log("snapshot",s.bytesTransferred,s.totalBytes),v(s.bytesTransferred/s.totalBytes)},s=>{console.log("uploadFile error - ",s),V({message:`Error uploading file to moda archive - ${s}`,type:"error",showClose:!0,duration:12e3})},a)};const oe=x("div",{class:"el-upload__text"},[y(" Drop file here or "),x("em",null,"click to upload")],-1),me=J({__name:"SubmitTokenForm",props:{token_meta_id:null},setup(f){const m=f,v=p();p();const a=p({name:"",artist:"",description:"",public_link:"",created_at:C.now(),updated_at:C.now(),media_id:"",media_type:"",user_id:"",blockchain:X.OffChain,asset_contract_address:"",token_id:"",platform:Y.Archive}),i=p([]),w=K({name:[{required:!0,message:"Required",trigger:"blur"}],artist:[{required:!0,message:"Required",trigger:"blur"}],asset_contract_address:[{required:!0,message:"Required",trigger:"blur"}],token_id:[{required:!0,message:"Required",trigger:"blur"}]}),s=p(!1),T=p("0%"),B=Z(),S=ee();Q(()=>{m.token_meta_id&&(a.value={...S.all_token_metas[m.token_meta_id].entity})});const q=(u,e)=>W.confirm(`Cancel the upload of ${u.name} ?`).then(()=>!0,()=>!1),R=()=>{},F=async u=>{var n;if(!u){_("Error finding form element");return}if(!!await u.validate(r=>r)){if(a.value.user_id=B.get_account.id,a.value.blockchain!="ethereum"&&(a.value.asset_contract_address="",a.value.token_id=""),m.token_meta_id){E(m.token_meta_id);return}if(((n=i==null?void 0:i.value)==null?void 0:n.length)!==1){_("Please add a file to upload");return}M(u)}},M=u=>{const e=i.value[0],n=c=>{T.value=`${Math.round(c*100)}%`},r=()=>{A(u,e)};s.value=!0;const g=`${e.uid}.${e.name.split(".").pop()}`;te(g,e.raw,n,r).catch(c=>{console.error(c),s.value=!1,_(`Error uploading file to moda archive - ${c}`)})},A=(u,e)=>{a.value.media_id=`${e.uid}`,a.value.media_type=`.${e.name.split(".").pop()}`,console.log("upload success, sending form: ",a),j(a.value).then(n=>{u.resetFields(),i.value=[],V({type:"success",message:"Successfully submitted token"})}).catch(n=>{_(`Error uploading metadata to moda archive - ${n}`)}).finally(()=>s.value=!1)},E=u=>{s.value=!0,O(u,a.value).then(()=>{V({type:"success",message:"Successfully updated token"})}).catch(e=>{_(`Error updating token metadata - ${e}`)}).finally(()=>s.value=!1)};return(u,e)=>{const n=d("el-input"),r=d("el-form-item"),g=d("el-radio"),c=d("el-radio-group"),N=d("upload-filled"),$=d("el-icon"),D=d("el-upload"),L=d("Loading"),I=d("el-button"),P=d("el-form");return k(),b(P,{ref_key:"formRef",ref:v,model:a.value,rules:w,"label-position":"left","label-width":"180px",style:{"max-width":"750px"}},{default:o(()=>[t(r,{label:"Artwork title",style:{"max-width":"550px"},prop:"name"},{default:o(()=>[t(n,{modelValue:a.value.name,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value.name=l)},null,8,["modelValue"])]),_:1}),t(r,{label:"Artist name",style:{"max-width":"550px"},prop:"artist"},{default:o(()=>[t(n,{modelValue:a.value.artist,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value.artist=l)},null,8,["modelValue"])]),_:1}),t(r,{label:"Blockchain"},{default:o(()=>[t(c,{modelValue:a.value.blockchain,"onUpdate:modelValue":e[2]||(e[2]=l=>a.value.blockchain=l)},{default:o(()=>[t(g,{label:"off_chain"},{default:o(()=>[y("Off-chain")]),_:1}),t(g,{label:"ethereum"},{default:o(()=>[y("Ethereum")]),_:1})]),_:1},8,["modelValue"])]),_:1}),a.value.blockchain=="ethereum"?(k(),b(r,{key:0,label:"Asset Contract Address",style:{"max-width":"550px"},prop:"asset_contract_address"},{default:o(()=>[t(n,{modelValue:a.value.asset_contract_address,"onUpdate:modelValue":e[3]||(e[3]=l=>a.value.asset_contract_address=l)},null,8,["modelValue"])]),_:1})):h("",!0),a.value.blockchain=="ethereum"?(k(),b(r,{key:1,label:"Token ID",style:{"max-width":"550px"},prop:"token_id"},{default:o(()=>[t(n,{modelValue:a.value.token_id,"onUpdate:modelValue":e[4]||(e[4]=l=>a.value.token_id=l)},null,8,["modelValue"])]),_:1})):h("",!0),t(r,{label:"Description",prop:"description"},{default:o(()=>[t(n,{modelValue:a.value.description,"onUpdate:modelValue":e[5]||(e[5]=l=>a.value.description=l),type:"textarea",rows:"3"},null,8,["modelValue"])]),_:1}),t(r,{label:"Public Link",prop:"public_link"},{default:o(()=>[t(n,{modelValue:a.value.public_link,"onUpdate:modelValue":e[6]||(e[6]=l=>a.value.public_link=l)},null,8,["modelValue"])]),_:1}),m.token_meta_id?h("",!0):(k(),b(r,{key:2},{default:o(()=>[t(D,{class:"upload-demo","auto-upload":!1,action:"","on-remove":R,"before-remove":q,limit:1,drag:"","file-list":i.value,"onUpdate:fileList":e[7]||(e[7]=l=>i.value=l)},{default:o(()=>[t($,{class:"el-icon--upload"},{default:o(()=>[t(N)]),_:1}),oe]),_:1},8,["file-list"])]),_:1})),t(r,null,{default:o(()=>[t(I,{onClick:e[8]||(e[8]=l=>F(v.value)),loading:s.value,color:"#000000"},{loading:o(()=>[t($,{class:"is-loading",style:{"margin-right":"4px"}},{default:o(()=>[t(L)]),_:1}),y(" "+U(T.value),1)]),default:o(()=>[x("div",null,U(s.value?"UPLOADING":"SUBMIT"),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])}}});export{me as _};
