import{d as i,u,l as d,E as l,o as a,b as m,e as _,f as p,g as f,i as g}from"./index.4932b23d.js";import{u as h}from"./account.12b0baf9.js";import{s as y}from"./util.a2648739.js";import{_ as k}from"./SubmitTokenForm.8a4426eb.js";import"./token-meta.5f6f7fc8.js";const E={style:{padding:"20px"}},w=g("h1",{style:{"margin-bottom":"15px"}},"SUBMIT TO MODA ARCHIVES",-1),M=i({setup(x){const r=u(),o=h();return d(async()=>{const{wallet_address:e,signature:t,ens_name:n}=o.getCachedAccountData();if(e==null||t==null){r.push({name:"landing",query:{redir:window.location.href}});return}const s=l.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"});try{await o.loadAccount(e,t,n)}catch(c){y(`Error loading moda archive account - ${c}`)}finally{s.close()}}),(e,t)=>(a(),m("div",E,[w,_(o).account?(a(),p(k,{key:0})):f("",!0)]))}});export{M as default};
