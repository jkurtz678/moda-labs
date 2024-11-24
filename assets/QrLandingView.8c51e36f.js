import{d as w,r as g,c as C,h as i,i as s,t as k,g as v,F as m,o as a,J as B,u as E,j as f,e as D,b as M,_ as R,m as V,z as A,E as N,w as T,bM as H,f as P,a as Q,bn as S}from"./index.c5a6e605.js";import{s as h}from"./util.e2cd4150.js";import{P as L}from"./types.4ea69ea7.js";import{b as F}from"./thumbnail-image.25e9e76a.js";import{h as I}from"./token-meta.8015aff1.js";import"./firebaseConfig.4d01e9b5.js";const U={key:0},j={key:1},y=150,z=w({__name:"TruncatedDescription",props:{description:{}},setup(p){const o=p,t=g(!1),_=C(()=>o.description?t.value||o.description.length<y?o.description:`${o.description.substring(0,y)}...`:"No artwork description");return(r,e)=>(a(),i(m,null,[s("div",null,k(_.value),1),s("div",null,[r.description&&r.description.length>y?(a(),i("a",{key:0,onClick:e[0]||(e[0]=n=>t.value=!t.value),class:"link"},[t.value?(a(),i("span",U,"Less")):(a(),i("span",j,"More"))])):v("",!0)])],64))}}),J={style:{"font-weight":"bold"}},W={style:{"font-weight":"bold"}},q=["src"],G={style:{display:"flex","align-items":"center"}},K={key:0,style:{"font-weight":"bold"}},O=w({__name:"ArtPreviewHeader",props:{token_meta:{}},setup(p){const o=D();M();const t=p,_=F(B(t,"token_meta")),r=C(()=>{var e,n,l,c,u,d;switch((n=(e=t.token_meta)==null?void 0:e.entity)==null?void 0:n.price_unit){case L.USD:return`$${(c=(l=t.token_meta)==null?void 0:l.entity)==null?void 0:c.price}`;case L.ETH:return`${(d=(u=t.token_meta)==null?void 0:u.entity)==null?void 0:d.price} ETH`;default:return""}});return(e,n)=>{var l,c,u,d,b,x,$;return a(),i(m,null,[s("h1",J,k((c=(l=e.token_meta)==null?void 0:l.entity)==null?void 0:c.name),1),s("h3",W,k((d=(u=e.token_meta)==null?void 0:u.entity)==null?void 0:d.artist),1),s("img",{src:E(_),style:{"max-width":"100%","max-height":"250px",padding:"8px 0px"}},null,8,q),((b=E(o).name)==null?void 0:b.toString())!="bid"?(a(),i(m,{key:0},[s("div",G,[e.token_meta.entity.permission_to_sell?(a(),i("h2",K,k(r.value),1)):v("",!0)]),f(z,{description:($=(x=e.token_meta)==null?void 0:x.entity)==null?void 0:$.description},null,8,["description"])],64)):v("",!0)],64)}}});const X={class:"container"},Y=w({__name:"QrLandingView",setup(p){const o=D(),t=g(),_=g();V(async()=>{if(!o.params.token_meta_id||o.params.token_meta_id instanceof Array){h("Error invalid token meta id");return}r(o.params.token_meta_id)}),A(()=>o.params.token_meta_id,(e,n)=>{if(!e||e instanceof Array){h("Error invalid token meta id");return}e!==n&&r(e)});const r=async e=>{t.value=void 0,_.value=N.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"}),await I(e,n=>{t.value=n}).catch(n=>{h(`Error fetching token meta: ${n}`)}).finally(()=>{_.value.close()})};return(e,n)=>{const l=P("RouterView");return a(),i(m,null,[n[0]||(n[0]=s("meta",{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"},null,-1)),s("div",X,[t.value?(a(),i(m,{key:0},[f(O,{token_meta:t.value},null,8,["token_meta"]),f(H,{name:"fade",mode:"out-in"},{default:T(()=>[f(l,null,{default:T(({Component:c})=>[(a(),Q(S(c),{token_meta:t.value},null,8,["token_meta"]))]),_:1})]),_:1})],64)):v("",!0)])],64)}}});var ie=R(Y,[["__scopeId","data-v-9ee6fa80"]]);export{ie as default};
