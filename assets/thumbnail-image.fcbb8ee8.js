import{e as l,f as n}from"./types.3cc10997.js";import{r as s,N as t}from"./index.8bc644f9.js";function f(a){const e=s(new URL("/assets/logo.61e654f6.png",self.location).href);return t(async()=>{e.value=await n(a.value),e.value.includes("logo.png")&&setTimeout(async()=>{const u=await n(a.value);u!=e.value&&(e.value=u)},12e3)}),e}function c(a){const e=s(new URL("/assets/logo.61e654f6.png",self.location).href);return t(async()=>{e.value=await l(a.value),(e.value.includes("logo.png")||e.value.includes("thumb_"))&&setTimeout(async()=>{const u=await l(a.value);u!=e.value&&(e.value=u)},12e3)}),e}export{c as a,f as u};