import{i as s}from"./token-meta.094c1d66.js";import{s as c}from"./util.c0e446db.js";import{d as p,r as _,c as m,q as u,h as d,l as h,t as f,i as a,w as v,f as i,o as w}from"./index.1a4c0b3f.js";import"./firebaseConfig.4d01e9b5.js";import"./types.67d14e22.js";const y={class:"container"},A=p({__name:"CatalogView",setup(g){const o=_([]),n=m(()=>o.value.map(t=>({name:t.entity.name,artist:t.entity.artist,price:t.entity.price,price_unit:t.entity.price_unit})).sort((t,e)=>!(t!=null&&t.artist)||!(e!=null&&e.artist)?0:t.artist.localeCompare(e.artist)));return u(async()=>{s(t=>{console.log("R",t),o.value=t}).catch(t=>{c(`Error fetching token metas: ${t}`)})}),(t,e)=>{const r=i("el-table-column"),l=i("el-table");return w(),d("div",y,[h("h2",null,f(`Artwork On Sale (${n.value.length} total)`),1),a(l,{height:"400",data:n.value,style:{width:"100%","overflow-y":"auto"}},{default:v(()=>[a(r,{prop:"artist",label:"Artist",width:"180"}),a(r,{prop:"name",label:"Name",width:"180"}),a(r,{prop:"price",label:"Price"}),a(r,{prop:"price_unit",label:"Price Unit"})]),_:1},8,["data"])])}}});export{A as default};
