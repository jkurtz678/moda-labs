import{d as f,h as k,l as s,i,w as n,a as w,g as x,b as y,e as g,f as h,o as c,j as a}from"./index.84086708.js";const b={style:{padding:"20px 0px",display:"flex",gap:"10px",width:"100%"}},v={style:{padding:"12px 0px"}},C=s("div",{style:{"font-size":"var(--el-font-size-extra-small)"}},"Powered By",-1),z={style:{display:"flex",gap:"10px",width:"100%"}},T=f({__name:"QrLandingActions",props:{token_meta:{}},setup(d){y(),g();const l=d,p=()=>{window.open("https://moda-labs.xyz/","_blank")},_=()=>{window.open("https://www.instagram.com/projekt.______/","_blank")},m=()=>{var e,o;window.open((o=(e=l.token_meta)==null?void 0:e.entity)==null?void 0:o.public_link,"_blank")},u=()=>{var t,r;const e=(r=(t=l.token_meta)==null?void 0:t.entity)==null?void 0:r.artist;if(!e){console.log("No artist name found");return}const o=encodeURIComponent(e);window.location.href=`venmo://paycharge?txn=pay&recipients=ModaArt&note=Tip%20for%20${o}`,setTimeout(()=>{window.open(`https://account.venmo.com/pay?recipients=ModaArt&note=Tip%20for%20${o}`,"_blank")},1500)};return(e,o)=>{const t=h("el-button");return c(),k("div",null,[s("div",b,[i(t,{color:"#000000",size:"large",onClick:u,style:{"flex-grow":"1","font-size":"18px"},round:""},{default:n(()=>[a("Tip Artist")]),_:1}),e.token_meta.entity.public_link?(c(),w(t,{key:0,color:"#000000",size:"large",onClick:m,style:{"flex-grow":"1","font-size":"18px"},round:""},{default:n(()=>[a("Learn More")]),_:1})):x("",!0)]),s("div",v,[C,s("div",z,[i(t,{onClick:p,style:{"flex-grow":"1"}},{default:n(()=>[a("Moda Plaque")]),_:1}),i(t,{onClick:_,style:{"flex-grow":"1"}},{default:n(()=>[a("Projekt ______")]),_:1})])])])}}});export{T as default};
