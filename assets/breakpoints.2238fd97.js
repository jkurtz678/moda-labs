import{r as i,m as u,y as o,c as t}from"./index.8a99aa6b.js";function a(){let e=i(window.innerWidth);const n=()=>e.value=window.innerWidth;u(()=>window.addEventListener("resize",n)),o(()=>window.removeEventListener("resize",n));const r=t(()=>e.value<650?"xs":e.value>=650&&e.value<960?"sm":e.value>=960&&e.value<1200?"md":e.value>=1200?"lg":null);return{width:t(()=>e.value),screen_type:r}}export{a as u};
