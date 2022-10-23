import{q as Ih}from"./index.db76b1c1.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Th=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},oc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,u=c?t[r+2]:0,l=i>>2,h=(i&3)<<4|a>>4;let d=(a&15)<<2|u>>6,p=u&63;c||(p=64,o||(d=64)),s.push(n[l],n[h],n[d],n[p])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ic(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Th(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const u=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||u==null||h==null)throw Error();const d=i<<2|a>>4;if(s.push(d),u!==64){const p=a<<4&240|u>>2;if(s.push(p),h!==64){const m=u<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},bh=function(t){const e=ic(t);return oc.encodeByteArray(e,!0)},gs=function(t){return bh(t).replace(/\./g,"")},ac=function(t){try{return oc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Sh(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(re())}function kh(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ch(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ah(){const t=re();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Rh(){return typeof indexedDB=="object"}function Dh(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function Nh(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=()=>Nh().__FIREBASE_DEFAULTS__,Ph=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Lh=()=>{if(typeof document=="undefined")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ac(t[1]);return e&&JSON.parse(e)},yi=()=>{try{return Oh()||Ph()||Lh()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},cc=t=>{var e,n;return(n=(e=yi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},uc=t=>{const e=cc(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Mh=()=>{var t;return(t=yi())===null||t===void 0?void 0:t.config},lc=t=>{var e;return(e=yi())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[gs(JSON.stringify(n)),gs(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh="FirebaseError";class Se extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Uh,Object.setPrototypeOf(this,Se.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kn.prototype.create)}}class kn{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Fh(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Se(r,a,s)}}function Fh(t,e){return t.replace(Vh,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Vh=/\{\$([^}]+)}/g;function Bh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ms(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Mo(i)&&Mo(o)){if(!ms(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Mo(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Xt(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Yt(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function $h(t,e){const n=new qh(t,e);return n.subscribe.bind(n)}class qh{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");jh(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=_r),r.error===void 0&&(r.error=_r),r.complete===void 0&&(r.complete=_r);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console!="undefined"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function jh(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function _r(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(t){return t&&t._delegate?t._delegate:t}class Ke{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new xh;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gh(e))try{this.getOrInitializeService({instanceIdentifier:st})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=st){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=st){return this.instances.has(e)}getOptions(e=st){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(!!s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:zh(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=st){return this.component?this.component.multipleInstances?e:st:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zh(t){return t===st?void 0:t}function Gh(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Hh(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const Wh={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Qh=O.INFO,Xh={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Yh=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Xh[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vi{constructor(e){this.name=e,this._logLevel=Qh,this._logHandler=Yh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const Jh=(t,e)=>e.some(n=>t instanceof n);let xo,Uo;function Zh(){return xo||(xo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ed(){return Uo||(Uo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const dc=new WeakMap,Vr=new WeakMap,fc=new WeakMap,wr=new WeakMap,_i=new WeakMap;function td(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(je(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&dc.set(n,t)}).catch(()=>{}),_i.set(e,t),e}function nd(t){if(Vr.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Vr.set(t,e)}let Br={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Vr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||fc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return je(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function sd(t){Br=t(Br)}function rd(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Er(this),e,...n);return fc.set(s,e.sort?e.sort():[e]),je(s)}:ed().includes(t)?function(...e){return t.apply(Er(this),e),je(dc.get(this))}:function(...e){return je(t.apply(Er(this),e))}}function id(t){return typeof t=="function"?rd(t):(t instanceof IDBTransaction&&nd(t),Jh(t,Zh())?new Proxy(t,Br):t)}function je(t){if(t instanceof IDBRequest)return td(t);if(wr.has(t))return wr.get(t);const e=id(t);return e!==t&&(wr.set(t,e),_i.set(e,t)),e}const Er=t=>_i.get(t);function od(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=je(o);return s&&o.addEventListener("upgradeneeded",c=>{s(je(o.result),c.oldVersion,c.newVersion,je(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",()=>r())}).catch(()=>{}),a}const ad=["get","getKey","getAll","getAllKeys","count"],cd=["put","add","delete","clear"],Ir=new Map;function Fo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ir.get(e))return Ir.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=cd.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||ad.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),r&&c.done]))[0]};return Ir.set(e,i),i}sd(t=>({...t,get:(e,n,s)=>Fo(e,n)||t.get(e,n,s),has:(e,n)=>!!Fo(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ld(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function ld(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const $r="@firebase/app",Vo="0.8.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new vi("@firebase/app"),hd="@firebase/app-compat",dd="@firebase/analytics-compat",fd="@firebase/analytics",pd="@firebase/app-check-compat",gd="@firebase/app-check",md="@firebase/auth",yd="@firebase/auth-compat",vd="@firebase/database",_d="@firebase/database-compat",wd="@firebase/functions",Ed="@firebase/functions-compat",Id="@firebase/installations",Td="@firebase/installations-compat",bd="@firebase/messaging",Sd="@firebase/messaging-compat",kd="@firebase/performance",Cd="@firebase/performance-compat",Ad="@firebase/remote-config",Rd="@firebase/remote-config-compat",Dd="@firebase/storage",Nd="@firebase/storage-compat",Od="@firebase/firestore",Pd="@firebase/firestore-compat",Ld="firebase",Md="9.12.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr="[DEFAULT]",xd={[$r]:"fire-core",[hd]:"fire-core-compat",[fd]:"fire-analytics",[dd]:"fire-analytics-compat",[gd]:"fire-app-check",[pd]:"fire-app-check-compat",[md]:"fire-auth",[yd]:"fire-auth-compat",[vd]:"fire-rtdb",[_d]:"fire-rtdb-compat",[wd]:"fire-fn",[Ed]:"fire-fn-compat",[Id]:"fire-iid",[Td]:"fire-iid-compat",[bd]:"fire-fcm",[Sd]:"fire-fcm-compat",[kd]:"fire-perf",[Cd]:"fire-perf-compat",[Ad]:"fire-rc",[Rd]:"fire-rc-compat",[Dd]:"fire-gcs",[Nd]:"fire-gcs-compat",[Od]:"fire-fst",[Pd]:"fire-fst-compat","fire-js":"fire-js",[Ld]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys=new Map,jr=new Map;function Ud(t,e){try{t.container.addComponent(e)}catch(n){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function dt(t){const e=t.name;if(jr.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;jr.set(e,t);for(const n of ys.values())Ud(n,t);return!0}function Vs(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fd={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},He=new kn("app","Firebase",Fd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ke("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw He.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=Md;function pc(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:qr,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw He.create("bad-app-name",{appName:String(r)});if(n||(n=Mh()),!n)throw He.create("no-options");const i=ys.get(r);if(i){if(ms(n,i.options)&&ms(s,i.config))return i;throw He.create("duplicate-app",{appName:r})}const o=new Kh(r);for(const c of jr.values())o.addComponent(c);const a=new Vd(n,s,o);return ys.set(r,a),a}function wi(t=qr){const e=ys.get(t);if(!e&&t===qr)return pc();if(!e)throw He.create("no-app",{appName:t});return e}function Ee(t,e,n){var s;let r=(s=xd[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ht.warn(a.join(" "));return}dt(new Ke(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd="firebase-heartbeat-database",$d=1,ln="firebase-heartbeat-store";let Tr=null;function gc(){return Tr||(Tr=od(Bd,$d,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ln)}}}).catch(t=>{throw He.create("idb-open",{originalErrorMessage:t.message})})),Tr}async function qd(t){var e;try{return(await gc()).transaction(ln).objectStore(ln).get(mc(t))}catch(n){if(n instanceof Se)ht.warn(n.message);else{const s=He.create("idb-get",{originalErrorMessage:(e=n)===null||e===void 0?void 0:e.message});ht.warn(s.message)}}}async function Bo(t,e){var n;try{const r=(await gc()).transaction(ln,"readwrite");return await r.objectStore(ln).put(e,mc(t)),r.done}catch(s){if(s instanceof Se)ht.warn(s.message);else{const r=He.create("idb-set",{originalErrorMessage:(n=s)===null||n===void 0?void 0:n.message});ht.warn(r.message)}}}function mc(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd=1024,Hd=30*24*60*60*1e3;class zd{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Kd(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=$o();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=Hd}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=$o(),{heartbeatsToSend:n,unsentEntries:s}=Gd(this._heartbeatsCache.heartbeats),r=gs(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function $o(){return new Date().toISOString().substring(0,10)}function Gd(t,e=jd){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),qo(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),qo(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Kd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rh()?Dh().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await qd(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Bo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Bo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function qo(t){return gs(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(t){dt(new Ke("platform-logger",e=>new ud(e),"PRIVATE")),dt(new Ke("heartbeat",e=>new zd(e),"PRIVATE")),Ee($r,Vo,t),Ee($r,Vo,"esm2017"),Ee("fire-js","")}Wd("");var Qd=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},_,Ei=Ei||{},b=Qd||self;function vs(){}function Bs(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function An(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function Xd(t){return Object.prototype.hasOwnProperty.call(t,br)&&t[br]||(t[br]=++Yd)}var br="closure_uid_"+(1e9*Math.random()>>>0),Yd=0;function Jd(t,e,n){return t.call.apply(t.bind,arguments)}function Zd(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,s),t.apply(e,r)}}return function(){return t.apply(e,arguments)}}function te(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?te=Jd:te=Zd,te.apply(null,arguments)}function Jn(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),t.apply(this,s)}}function J(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Wb=function(s,r,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[r].apply(s,o)}}function Je(){this.s=this.s,this.o=this.o}var ef=0;Je.prototype.s=!1;Je.prototype.na=function(){!this.s&&(this.s=!0,this.M(),ef!=0)&&Xd(this)};Je.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const yc=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function Ii(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function jo(t,e){for(let n=1;n<arguments.length;n++){const s=arguments[n];if(Bs(s)){const r=t.length||0,i=s.length||0;t.length=r+i;for(let o=0;o<i;o++)t[r+o]=s[o]}else t.push(s)}}function ne(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}ne.prototype.h=function(){this.defaultPrevented=!0};var tf=function(){if(!b.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{b.addEventListener("test",vs,e),b.removeEventListener("test",vs,e)}catch{}return t}();function _s(t){return/^[\s\xa0]*$/.test(t)}var Ho=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function Sr(t,e){return t<e?-1:t>e?1:0}function $s(){var t=b.navigator;return t&&(t=t.userAgent)?t:""}function _e(t){return $s().indexOf(t)!=-1}function Ti(t){return Ti[" "](t),t}Ti[" "]=vs;function nf(t){var e=of;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var sf=_e("Opera"),Dt=_e("Trident")||_e("MSIE"),vc=_e("Edge"),Hr=vc||Dt,_c=_e("Gecko")&&!($s().toLowerCase().indexOf("webkit")!=-1&&!_e("Edge"))&&!(_e("Trident")||_e("MSIE"))&&!_e("Edge"),rf=$s().toLowerCase().indexOf("webkit")!=-1&&!_e("Edge");function wc(){var t=b.document;return t?t.documentMode:void 0}var ws;e:{var kr="",Cr=function(){var t=$s();if(_c)return/rv:([^\);]+)(\)|;)/.exec(t);if(vc)return/Edge\/([\d\.]+)/.exec(t);if(Dt)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(rf)return/WebKit\/(\S+)/.exec(t);if(sf)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Cr&&(kr=Cr?Cr[1]:""),Dt){var Ar=wc();if(Ar!=null&&Ar>parseFloat(kr)){ws=String(Ar);break e}}ws=kr}var of={};function af(){return nf(function(){let t=0;const e=Ho(String(ws)).split("."),n=Ho("9").split("."),s=Math.max(e.length,n.length);for(let o=0;t==0&&o<s;o++){var r=e[o]||"",i=n[o]||"";do{if(r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r[0].length==0&&i[0].length==0)break;t=Sr(r[1].length==0?0:parseInt(r[1],10),i[1].length==0?0:parseInt(i[1],10))||Sr(r[2].length==0,i[2].length==0)||Sr(r[2],i[2]),r=r[3],i=i[3]}while(t==0)}return 0<=t})}var zr;if(b.document&&Dt){var zo=wc();zr=zo||parseInt(ws,10)||void 0}else zr=void 0;var cf=zr;function hn(t,e){if(ne.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(_c){e:{try{Ti(e.nodeName);var r=!0;break e}catch{}r=!1}r||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:uf[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&hn.X.h.call(this)}}J(hn,ne);var uf={2:"touch",3:"pen",4:"mouse"};hn.prototype.h=function(){hn.X.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Rn="closure_listenable_"+(1e6*Math.random()|0),lf=0;function hf(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ha=r,this.key=++lf,this.ba=this.ea=!1}function qs(t){t.ba=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function bi(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function Ec(t){const e={};for(const n in t)e[n]=t[n];return e}const Go="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ic(t,e){let n,s;for(let r=1;r<arguments.length;r++){s=arguments[r];for(n in s)t[n]=s[n];for(let i=0;i<Go.length;i++)n=Go[i],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function js(t){this.src=t,this.g={},this.h=0}js.prototype.add=function(t,e,n,s,r){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=Kr(t,e,s,r);return-1<o?(e=t[o],n||(e.ea=!1)):(e=new hf(e,this.src,i,!!s,r),e.ea=n,t.push(e)),e};function Gr(t,e){var n=e.type;if(n in t.g){var s=t.g[n],r=yc(s,e),i;(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(qs(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function Kr(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.ba&&i.listener==e&&i.capture==!!n&&i.ha==s)return r}return-1}var Si="closure_lm_"+(1e6*Math.random()|0),Rr={};function Tc(t,e,n,s,r){if(s&&s.once)return Sc(t,e,n,s,r);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Tc(t,e[i],n,s,r);return null}return n=Ai(n),t&&t[Rn]?t.N(e,n,An(s)?!!s.capture:!!s,r):bc(t,e,n,!1,s,r)}function bc(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var o=An(r)?!!r.capture:!!r,a=Ci(t);if(a||(t[Si]=a=new js(t)),n=a.add(e,n,s,o,i),n.proxy)return n;if(s=df(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)tf||(r=o),r===void 0&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(Cc(e.toString()),s);else if(t.addListener&&t.removeListener)t.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function df(){function t(n){return e.call(t.src,t.listener,n)}const e=ff;return t}function Sc(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Sc(t,e[i],n,s,r);return null}return n=Ai(n),t&&t[Rn]?t.O(e,n,An(s)?!!s.capture:!!s,r):bc(t,e,n,!0,s,r)}function kc(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)kc(t,e[i],n,s,r);else s=An(s)?!!s.capture:!!s,n=Ai(n),t&&t[Rn]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=Kr(i,n,s,r),-1<n&&(qs(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=Ci(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Kr(e,n,s,r)),(n=-1<t?e[t]:null)&&ki(n))}function ki(t){if(typeof t!="number"&&t&&!t.ba){var e=t.src;if(e&&e[Rn])Gr(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(Cc(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=Ci(e))?(Gr(n,t),n.h==0&&(n.src=null,e[Si]=null)):qs(t)}}}function Cc(t){return t in Rr?Rr[t]:Rr[t]="on"+t}function ff(t,e){if(t.ba)t=!0;else{e=new hn(e,this);var n=t.listener,s=t.ha||t.src;t.ea&&ki(t),t=n.call(s,e)}return t}function Ci(t){return t=t[Si],t instanceof js?t:null}var Dr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ai(t){return typeof t=="function"?t:(t[Dr]||(t[Dr]=function(e){return t.handleEvent(e)}),t[Dr])}function W(){Je.call(this),this.i=new js(this),this.P=this,this.I=null}J(W,Je);W.prototype[Rn]=!0;W.prototype.removeEventListener=function(t,e,n,s){kc(this,t,e,n,s)};function Y(t,e){var n,s=t.I;if(s)for(n=[];s;s=s.I)n.push(s);if(t=t.P,s=e.type||e,typeof e=="string")e=new ne(e,t);else if(e instanceof ne)e.target=e.target||t;else{var r=e;e=new ne(s,t),Ic(e,r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=Zn(o,s,!0,e)&&r}if(o=e.g=t,r=Zn(o,s,!0,e)&&r,r=Zn(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)o=e.g=n[i],r=Zn(o,s,!1,e)&&r}W.prototype.M=function(){if(W.X.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)qs(n[s]);delete t.g[e],t.h--}}this.I=null};W.prototype.N=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)};W.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};function Zn(t,e,n,s){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ba&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.ea&&Gr(t.i,o),r=a.call(c,s)!==!1&&r}}return r&&!s.defaultPrevented}var Ri=b.JSON.stringify;function pf(){var t=Dc;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class gf{constructor(){this.h=this.g=null}add(e,n){const s=Ac.get();s.set(e,n),this.h?this.h.next=s:this.g=s,this.h=s}}var Ac=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new mf,t=>t.reset());class mf{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function yf(t){b.setTimeout(()=>{throw t},0)}function Rc(t,e){Wr||vf(),Qr||(Wr(),Qr=!0),Dc.add(t,e)}var Wr;function vf(){var t=b.Promise.resolve(void 0);Wr=function(){t.then(_f)}}var Qr=!1,Dc=new gf;function _f(){for(var t;t=pf();){try{t.h.call(t.g)}catch(n){yf(n)}var e=Ac;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Qr=!1}function Hs(t,e){W.call(this),this.h=t||1,this.g=e||b,this.j=te(this.lb,this),this.l=Date.now()}J(Hs,W);_=Hs.prototype;_.ca=!1;_.R=null;_.lb=function(){if(this.ca){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-t):(this.R&&(this.g.clearTimeout(this.R),this.R=null),Y(this,"tick"),this.ca&&(Di(this),this.start()))}};_.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Di(t){t.ca=!1,t.R&&(t.g.clearTimeout(t.R),t.R=null)}_.M=function(){Hs.X.M.call(this),Di(this),delete this.g};function Ni(t,e,n){if(typeof t=="function")n&&(t=te(t,n));else if(t&&typeof t.handleEvent=="function")t=te(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:b.setTimeout(t,e||0)}function Nc(t){t.g=Ni(()=>{t.g=null,t.i&&(t.i=!1,Nc(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class wf extends Je{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Nc(this)}M(){super.M(),this.g&&(b.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function dn(t){Je.call(this),this.h=t,this.g={}}J(dn,Je);var Ko=[];function Oc(t,e,n,s){Array.isArray(n)||(n&&(Ko[0]=n.toString()),n=Ko);for(var r=0;r<n.length;r++){var i=Tc(e,n[r],s||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Pc(t){bi(t.g,function(e,n){this.g.hasOwnProperty(n)&&ki(e)},t),t.g={}}dn.prototype.M=function(){dn.X.M.call(this),Pc(this)};dn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function zs(){this.g=!0}zs.prototype.Aa=function(){this.g=!1};function Ef(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+u+"&"):o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+`
`+n+`
`+o})}function If(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+`
`+n+`
`+i+" "+o})}function Tt(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+bf(t,n)+(s?" "+s:"")})}function Tf(t,e){t.info(function(){return"TIMEOUT: "+e})}zs.prototype.info=function(){};function bf(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<r.length;o++)r[o]=""}}}}return Ri(n)}catch{return e}}var vt={},Wo=null;function Gs(){return Wo=Wo||new W}vt.Pa="serverreachability";function Lc(t){ne.call(this,vt.Pa,t)}J(Lc,ne);function fn(t){const e=Gs();Y(e,new Lc(e))}vt.STAT_EVENT="statevent";function Mc(t,e){ne.call(this,vt.STAT_EVENT,t),this.stat=e}J(Mc,ne);function ae(t){const e=Gs();Y(e,new Mc(e,t))}vt.Qa="timingevent";function xc(t,e){ne.call(this,vt.Qa,t),this.size=e}J(xc,ne);function Dn(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return b.setTimeout(function(){t()},e)}var Ks={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},Uc={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Oi(){}Oi.prototype.h=null;function Qo(t){return t.h||(t.h=t.i())}function Fc(){}var Nn={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function Pi(){ne.call(this,"d")}J(Pi,ne);function Li(){ne.call(this,"c")}J(Li,ne);var Xr;function Ws(){}J(Ws,Oi);Ws.prototype.g=function(){return new XMLHttpRequest};Ws.prototype.i=function(){return{}};Xr=new Ws;function On(t,e,n,s){this.l=t,this.j=e,this.m=n,this.U=s||1,this.S=new dn(this),this.O=Sf,t=Hr?125:void 0,this.T=new Hs(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new Vc}function Vc(){this.i=null,this.g="",this.h=!1}var Sf=45e3,Yr={},Es={};_=On.prototype;_.setTimeout=function(t){this.O=t};function Jr(t,e,n){t.K=1,t.v=Xs(Oe(e)),t.s=n,t.P=!0,Bc(t,null)}function Bc(t,e){t.F=Date.now(),Pn(t),t.A=Oe(t.v);var n=t.A,s=t.U;Array.isArray(s)||(s=[String(s)]),Wc(n.i,"t",s),t.C=0,n=t.l.H,t.h=new Vc,t.g=gu(t.l,n?e:null,!t.s),0<t.N&&(t.L=new wf(te(t.La,t,t.g),t.N)),Oc(t.S,t.g,"readystatechange",t.ib),e=t.H?Ec(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.da(t.A,t.u,t.s,e)):(t.u="GET",t.g.da(t.A,t.u,null,e)),fn(),Ef(t.j,t.u,t.A,t.m,t.U,t.s)}_.ib=function(t){t=t.target;const e=this.L;e&&Ce(t)==3?e.l():this.La(t)};_.La=function(t){try{if(t==this.g)e:{const l=Ce(this.g);var e=this.g.Ea();const h=this.g.aa();if(!(3>l)&&(l!=3||Hr||this.g&&(this.h.h||this.g.fa()||Zo(this.g)))){this.I||l!=4||e==7||(e==8||0>=h?fn(3):fn(2)),Qs(this);var n=this.g.aa();this.Y=n;t:if($c(this)){var s=Zo(this.g);t="";var r=s.length,i=Ce(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){rt(this),nn(this);var o="";break t}this.h.i=new b.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:i&&e==r-1});s.splice(0,r),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=n==200,If(this.j,this.u,this.A,this.m,this.U,l,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_s(a)){var u=a;break t}}u=null}if(n=u)Tt(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Zr(this,n);else{this.i=!1,this.o=3,ae(12),rt(this),nn(this);break e}}this.P?(qc(this,l,o),Hr&&this.i&&l==3&&(Oc(this.S,this.T,"tick",this.hb),this.T.start())):(Tt(this.j,this.m,o,null),Zr(this,o)),l==4&&rt(this),this.i&&!this.I&&(l==4?hu(this.l,this):(this.i=!1,Pn(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,ae(12)):(this.o=0,ae(13)),rt(this),nn(this)}}}catch{}finally{}};function $c(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Da:!1}function qc(t,e,n){let s=!0,r;for(;!t.I&&t.C<n.length;)if(r=kf(t,n),r==Es){e==4&&(t.o=4,ae(14),s=!1),Tt(t.j,t.m,null,"[Incomplete Response]");break}else if(r==Yr){t.o=4,ae(15),Tt(t.j,t.m,n,"[Invalid Chunk]"),s=!1;break}else Tt(t.j,t.m,r,null),Zr(t,r);$c(t)&&r!=Es&&r!=Yr&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,ae(16),s=!1),t.i=t.i&&s,s?0<n.length&&!t.$&&(t.$=!0,e=t.l,e.g==t&&e.$&&!e.K&&(e.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),$i(e),e.K=!0,ae(11))):(Tt(t.j,t.m,n,"[Invalid Chunked Response]"),rt(t),nn(t))}_.hb=function(){if(this.g){var t=Ce(this.g),e=this.g.fa();this.C<e.length&&(Qs(this),qc(this,t,e),this.i&&t!=4&&Pn(this))}};function kf(t,e){var n=t.C,s=e.indexOf(`
`,n);return s==-1?Es:(n=Number(e.substring(n,s)),isNaN(n)?Yr:(s+=1,s+n>e.length?Es:(e=e.substr(s,n),t.C=s+n,e)))}_.cancel=function(){this.I=!0,rt(this)};function Pn(t){t.V=Date.now()+t.O,jc(t,t.O)}function jc(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Dn(te(t.gb,t),e)}function Qs(t){t.B&&(b.clearTimeout(t.B),t.B=null)}_.gb=function(){this.B=null;const t=Date.now();0<=t-this.V?(Tf(this.j,this.A),this.K!=2&&(fn(),ae(17)),rt(this),this.o=2,nn(this)):jc(this,this.V-t)};function nn(t){t.l.G==0||t.I||hu(t.l,t)}function rt(t){Qs(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,Di(t.T),Pc(t.S),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function Zr(t,e){try{var n=t.l;if(n.G!=0&&(n.g==t||ei(n.h,t))){if(!t.J&&ei(n.h,t)&&n.G==3){try{var s=n.Fa.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var r=s;if(r[0]==0){e:if(!n.u){if(n.g)if(n.g.F+3e3<t.F)bs(n),Zs(n);else break e;Bi(n),ae(18)}}else n.Ba=r[1],0<n.Ba-n.T&&37500>r[2]&&n.L&&n.A==0&&!n.v&&(n.v=Dn(te(n.cb,n),6e3));if(1>=Yc(n.h)&&n.ja){try{n.ja()}catch{}n.ja=void 0}}else it(n,11)}else if((t.J||n.g==t)&&bs(n),!_s(e))for(r=n.Fa.g.parse(e),e=0;e<r.length;e++){let u=r[e];if(n.T=u[0],u=u[1],n.G==2)if(u[0]=="c"){n.I=u[1],n.ka=u[2];const l=u[3];l!=null&&(n.ma=l,n.j.info("VER="+n.ma));const h=u[4];h!=null&&(n.Ca=h,n.j.info("SVER="+n.Ca));const d=u[5];d!=null&&typeof d=="number"&&0<d&&(s=1.5*d,n.J=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const p=t.g;if(p){const m=p.g?p.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(m){var i=s.h;i.g||m.indexOf("spdy")==-1&&m.indexOf("quic")==-1&&m.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(Mi(i,i.h),i.h=null))}if(s.D){const w=p.g?p.g.getResponseHeader("X-HTTP-Session-Id"):null;w&&(s.za=w,F(s.F,s.D,w))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-t.F,n.j.info("Handshake RTT: "+n.P+"ms")),s=n;var o=t;if(s.sa=pu(s,s.H?s.ka:null,s.V),o.J){Jc(s.h,o);var a=o,c=s.J;c&&a.setTimeout(c),a.B&&(Qs(a),Pn(a)),s.g=o}else uu(s);0<n.i.length&&er(n)}else u[0]!="stop"&&u[0]!="close"||it(n,7);else n.G==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?it(n,7):Vi(n):u[0]!="noop"&&n.l&&n.l.wa(u),n.A=0)}}fn(4)}catch{}}function Cf(t){if(t.W&&typeof t.W=="function")return t.W();if(typeof Map!="undefined"&&t instanceof Map||typeof Set!="undefined"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(Bs(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}e=[],n=0;for(s in t)e[n++]=t[s];return e}function Af(t){if(t.oa&&typeof t.oa=="function")return t.oa();if(!t.W||typeof t.W!="function"){if(typeof Map!="undefined"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set!="undefined"&&t instanceof Set)){if(Bs(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}function Hc(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(Bs(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=Af(t),s=Cf(t),r=s.length,i=0;i<r;i++)e.call(void 0,s[i],n&&n[i],t)}var zc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Rf(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function at(t,e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof at){this.h=e!==void 0?e:t.h,Is(this,t.j),this.s=t.s,this.g=t.g,Ts(this,t.m),this.l=t.l,e=t.i;var n=new pn;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),Xo(this,n),this.o=t.o}else t&&(n=String(t).match(zc))?(this.h=!!e,Is(this,n[1]||"",!0),this.s=Jt(n[2]||""),this.g=Jt(n[3]||"",!0),Ts(this,n[4]),this.l=Jt(n[5]||"",!0),Xo(this,n[6]||"",!0),this.o=Jt(n[7]||"")):(this.h=!!e,this.i=new pn(null,this.h))}at.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Zt(e,Yo,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Zt(e,Yo,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Zt(n,n.charAt(0)=="/"?Of:Nf,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Zt(n,Lf)),t.join("")};function Oe(t){return new at(t)}function Is(t,e,n){t.j=n?Jt(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Ts(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Xo(t,e,n){e instanceof pn?(t.i=e,Mf(t.i,t.h)):(n||(e=Zt(e,Pf)),t.i=new pn(e,t.h))}function F(t,e,n){t.i.set(e,n)}function Xs(t){return F(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Jt(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Zt(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,Df),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Df(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Yo=/[#\/\?@]/g,Nf=/[#\?:]/g,Of=/[#\?]/g,Pf=/[#\?@]/g,Lf=/#/g;function pn(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Ze(t){t.g||(t.g=new Map,t.h=0,t.i&&Rf(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}_=pn.prototype;_.add=function(t,e){Ze(this),this.i=null,t=Ft(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Gc(t,e){Ze(t),e=Ft(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Kc(t,e){return Ze(t),e=Ft(t,e),t.g.has(e)}_.forEach=function(t,e){Ze(this),this.g.forEach(function(n,s){n.forEach(function(r){t.call(e,r,s,this)},this)},this)};_.oa=function(){Ze(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let i=0;i<r.length;i++)n.push(e[s])}return n};_.W=function(t){Ze(this);let e=[];if(typeof t=="string")Kc(this,t)&&(e=e.concat(this.g.get(Ft(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};_.set=function(t,e){return Ze(this),this.i=null,t=Ft(this,t),Kc(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};_.get=function(t,e){return t?(t=this.W(t),0<t.length?String(t[0]):e):e};function Wc(t,e,n){Gc(t,e),0<n.length&&(t.i=null,t.g.set(Ft(t,e),Ii(n)),t.h+=n.length)}_.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.W(s);for(s=0;s<o.length;s++){var r=i;o[s]!==""&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")};function Ft(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Mf(t,e){e&&!t.j&&(Ze(t),t.i=null,t.g.forEach(function(n,s){var r=s.toLowerCase();s!=r&&(Gc(this,s),Wc(this,r,n))},t)),t.j=e}var xf=class{constructor(t,e){this.h=t,this.g=e}};function Qc(t){this.l=t||Uf,b.PerformanceNavigationTiming?(t=b.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(b.g&&b.g.Ga&&b.g.Ga()&&b.g.Ga().$b),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Uf=10;function Xc(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Yc(t){return t.h?1:t.g?t.g.size:0}function ei(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Mi(t,e){t.g?t.g.add(e):t.h=e}function Jc(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}Qc.prototype.cancel=function(){if(this.i=Zc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Zc(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return Ii(t.i)}function xi(){}xi.prototype.stringify=function(t){return b.JSON.stringify(t,void 0)};xi.prototype.parse=function(t){return b.JSON.parse(t,void 0)};function Ff(){this.g=new xi}function Vf(t,e,n){const s=n||"";try{Hc(t,function(r,i){let o=r;An(r)&&(o=Ri(r)),e.push(s+i+"="+encodeURIComponent(o))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function Bf(t,e){const n=new zs;if(b.Image){const s=new Image;s.onload=Jn(es,n,s,"TestLoadImage: loaded",!0,e),s.onerror=Jn(es,n,s,"TestLoadImage: error",!1,e),s.onabort=Jn(es,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=Jn(es,n,s,"TestLoadImage: timeout",!1,e),b.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function es(t,e,n,s,r){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,r(s)}catch{}}function Ln(t){this.l=t.ac||null,this.j=t.jb||!1}J(Ln,Oi);Ln.prototype.g=function(){return new Ys(this.l,this.j)};Ln.prototype.i=function(t){return function(){return t}}({});function Ys(t,e){W.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Ui,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}J(Ys,W);var Ui=0;_=Ys.prototype;_.open=function(t,e){if(this.readyState!=Ui)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,gn(this)};_.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||b).fetch(new Request(this.B,e)).then(this.Wa.bind(this),this.ga.bind(this))};_.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Mn(this)),this.readyState=Ui};_.Wa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,gn(this)),this.g&&(this.readyState=3,gn(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(typeof b.ReadableStream!="undefined"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;eu(this)}else t.text().then(this.Va.bind(this),this.ga.bind(this))};function eu(t){t.j.read().then(t.Ta.bind(t)).catch(t.ga.bind(t))}_.Ta=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Mn(this):gn(this),this.readyState==3&&eu(this)}};_.Va=function(t){this.g&&(this.response=this.responseText=t,Mn(this))};_.Ua=function(t){this.g&&(this.response=t,Mn(this))};_.ga=function(){this.g&&Mn(this)};function Mn(t){t.readyState=4,t.l=null,t.j=null,t.A=null,gn(t)}_.setRequestHeader=function(t,e){this.v.append(t,e)};_.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};_.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function gn(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Ys.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var $f=b.JSON.parse;function B(t){W.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=tu,this.K=this.L=!1}J(B,W);var tu="",qf=/^https?$/i,jf=["POST","PUT"];_=B.prototype;_.Ka=function(t){this.L=t};_.da=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Xr.g(),this.C=this.u?Qo(this.u):Qo(Xr),this.g.onreadystatechange=te(this.Ha,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(i){Jo(this,i);return}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var r in s)n.set(r,s[r]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const i of s.keys())n.set(i,s.get(i));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),r=b.FormData&&t instanceof b.FormData,!(0<=yc(jf,e))||s||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{ru(this),0<this.B&&((this.K=Hf(this.g))?(this.g.timeout=this.B,this.g.ontimeout=te(this.qa,this)):this.A=Ni(this.qa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){Jo(this,i)}};function Hf(t){return Dt&&af()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}_.qa=function(){typeof Ei!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Y(this,"timeout"),this.abort(8))};function Jo(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,nu(t),Js(t)}function nu(t){t.D||(t.D=!0,Y(t,"complete"),Y(t,"error"))}_.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,Y(this,"complete"),Y(this,"abort"),Js(this))};_.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Js(this,!0)),B.X.M.call(this)};_.Ha=function(){this.s||(this.F||this.v||this.l?su(this):this.fb())};_.fb=function(){su(this)};function su(t){if(t.h&&typeof Ei!="undefined"&&(!t.C[1]||Ce(t)!=4||t.aa()!=2)){if(t.v&&Ce(t)==4)Ni(t.Ha,0,t);else if(Y(t,"readystatechange"),Ce(t)==4){t.h=!1;try{const a=t.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var s;if(s=a===0){var r=String(t.H).match(zc)[1]||null;if(!r&&b.self&&b.self.location){var i=b.self.location.protocol;r=i.substr(0,i.length-1)}s=!qf.test(r?r.toLowerCase():"")}n=s}if(n)Y(t,"complete"),Y(t,"success");else{t.m=6;try{var o=2<Ce(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.aa()+"]",nu(t)}}finally{Js(t)}}}}function Js(t,e){if(t.g){ru(t);const n=t.g,s=t.C[0]?vs:null;t.g=null,t.C=null,e||Y(t,"ready");try{n.onreadystatechange=s}catch{}}}function ru(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(b.clearTimeout(t.A),t.A=null)}function Ce(t){return t.g?t.g.readyState:0}_.aa=function(){try{return 2<Ce(this)?this.g.status:-1}catch{return-1}};_.fa=function(){try{return this.g?this.g.responseText:""}catch{return""}};_.Sa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),$f(e)}};function Zo(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case tu:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}_.Ea=function(){return this.m};_.Oa=function(){return typeof this.j=="string"?this.j:String(this.j)};function iu(t){let e="";return bi(t,function(n,s){e+=s,e+=":",e+=n,e+=`\r
`}),e}function Fi(t,e,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=iu(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):F(t,e,n))}function Kt(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function ou(t){this.Ca=0,this.i=[],this.j=new zs,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=Kt("failFast",!1,t),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=Kt("baseRetryDelayMs",5e3,t),this.bb=Kt("retryDelaySeedMs",1e4,t),this.$a=Kt("forwardChannelMaxRetries",2,t),this.ta=Kt("forwardChannelRequestTimeoutMs",2e4,t),this.ra=t&&t.xmlHttpFactory||void 0,this.Da=t&&t.Zb||!1,this.J=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.I="",this.h=new Qc(t&&t.concurrentRequestLimit),this.Fa=new Ff,this.O=t&&t.fastHandshake||!1,this.N=t&&t.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=t&&t.Xb||!1,t&&t.Aa&&this.j.Aa(),t&&t.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&t&&t.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}_=ou.prototype;_.ma=8;_.G=1;function Vi(t){if(au(t),t.G==3){var e=t.U++,n=Oe(t.F);F(n,"SID",t.I),F(n,"RID",e),F(n,"TYPE","terminate"),xn(t,n),e=new On(t,t.j,e,void 0),e.K=2,e.v=Xs(Oe(n)),n=!1,b.navigator&&b.navigator.sendBeacon&&(n=b.navigator.sendBeacon(e.v.toString(),"")),!n&&b.Image&&(new Image().src=e.v,n=!0),n||(e.g=gu(e.l,null),e.g.da(e.v)),e.F=Date.now(),Pn(e)}fu(t)}function Zs(t){t.g&&($i(t),t.g.cancel(),t.g=null)}function au(t){Zs(t),t.u&&(b.clearTimeout(t.u),t.u=null),bs(t),t.h.cancel(),t.m&&(typeof t.m=="number"&&b.clearTimeout(t.m),t.m=null)}function er(t){Xc(t.h)||t.m||(t.m=!0,Rc(t.Ja,t),t.C=0)}function zf(t,e){return Yc(t.h)>=t.h.j-(t.m?1:0)?!1:t.m?(t.i=e.D.concat(t.i),!0):t.G==1||t.G==2||t.C>=(t.Za?0:t.$a)?!1:(t.m=Dn(te(t.Ja,t,e),du(t,t.C)),t.C++,!0)}_.Ja=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const r=new On(this,this.j,t,void 0);let i=this.s;if(this.S&&(i?(i=Ec(i),Ic(i,this.S)):i=this.S),this.o!==null||this.N||(r.H=i,i=null),this.O)e:{for(var e=0,n=0;n<this.i.length;n++){t:{var s=this.i[n];if("__data__"in s.g&&(s=s.g.__data__,typeof s=="string")){s=s.length;break t}s=void 0}if(s===void 0)break;if(e+=s,4096<e){e=n;break e}if(e===4096||n===this.i.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=cu(this,r,e),n=Oe(this.F),F(n,"RID",t),F(n,"CVER",22),this.D&&F(n,"X-HTTP-Session-Id",this.D),xn(this,n),i&&(this.N?e="headers="+encodeURIComponent(String(iu(i)))+"&"+e:this.o&&Fi(n,this.o,i)),Mi(this.h,r),this.Ya&&F(n,"TYPE","init"),this.O?(F(n,"$req",e),F(n,"SID","null"),r.Z=!0,Jr(r,n,null)):Jr(r,n,e),this.G=2}}else this.G==3&&(t?ea(this,t):this.i.length==0||Xc(this.h)||ea(this))};function ea(t,e){var n;e?n=e.m:n=t.U++;const s=Oe(t.F);F(s,"SID",t.I),F(s,"RID",n),F(s,"AID",t.T),xn(t,s),t.o&&t.s&&Fi(s,t.o,t.s),n=new On(t,t.j,n,t.C+1),t.o===null&&(n.H=t.s),e&&(t.i=e.D.concat(t.i)),e=cu(t,n,1e3),n.setTimeout(Math.round(.5*t.ta)+Math.round(.5*t.ta*Math.random())),Mi(t.h,n),Jr(n,s,e)}function xn(t,e){t.ia&&bi(t.ia,function(n,s){F(e,s,n)}),t.l&&Hc({},function(n,s){F(e,s,n)})}function cu(t,e,n){n=Math.min(t.i.length,n);var s=t.l?te(t.l.Ra,t.l,t):null;e:{var r=t.i;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=r[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let u=r[c].h;const l=r[c].g;if(u-=i,0>u)i=Math.max(0,r[c].h-100),a=!1;else try{Vf(l,o,"req"+u+"_")}catch{s&&s(l)}}if(a){s=o.join("&");break e}}}return t=t.i.splice(0,n),e.D=t,s}function uu(t){t.g||t.u||(t.Z=1,Rc(t.Ia,t),t.A=0)}function Bi(t){return t.g||t.u||3<=t.A?!1:(t.Z++,t.u=Dn(te(t.Ia,t),du(t,t.A)),t.A++,!0)}_.Ia=function(){if(this.u=null,lu(this),this.$&&!(this.K||this.g==null||0>=this.P)){var t=2*this.P;this.j.info("BP detection timer enabled: "+t),this.B=Dn(te(this.eb,this),t)}};_.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,ae(10),Zs(this),lu(this))};function $i(t){t.B!=null&&(b.clearTimeout(t.B),t.B=null)}function lu(t){t.g=new On(t,t.j,"rpc",t.Z),t.o===null&&(t.g.H=t.s),t.g.N=0;var e=Oe(t.sa);F(e,"RID","rpc"),F(e,"SID",t.I),F(e,"CI",t.L?"0":"1"),F(e,"AID",t.T),F(e,"TYPE","xmlhttp"),xn(t,e),t.o&&t.s&&Fi(e,t.o,t.s),t.J&&t.g.setTimeout(t.J);var n=t.g;t=t.ka,n.K=1,n.v=Xs(Oe(e)),n.s=null,n.P=!0,Bc(n,t)}_.cb=function(){this.v!=null&&(this.v=null,Zs(this),Bi(this),ae(19))};function bs(t){t.v!=null&&(b.clearTimeout(t.v),t.v=null)}function hu(t,e){var n=null;if(t.g==e){bs(t),$i(t),t.g=null;var s=2}else if(ei(t.h,e))n=e.D,Jc(t.h,e),s=1;else return;if(t.G!=0){if(t.pa=e.Y,e.i)if(s==1){n=e.s?e.s.length:0,e=Date.now()-e.F;var r=t.C;s=Gs(),Y(s,new xc(s,n)),er(t)}else uu(t);else if(r=e.o,r==3||r==0&&0<t.pa||!(s==1&&zf(t,e)||s==2&&Bi(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),r){case 1:it(t,5);break;case 4:it(t,10);break;case 3:it(t,6);break;default:it(t,2)}}}function du(t,e){let n=t.Xa+Math.floor(Math.random()*t.bb);return t.l||(n*=2),n*e}function it(t,e){if(t.j.info("Error code "+e),e==2){var n=null;t.l&&(n=null);var s=te(t.kb,t);n||(n=new at("//www.google.com/images/cleardot.gif"),b.location&&b.location.protocol=="http"||Is(n,"https"),Xs(n)),Bf(n.toString(),s)}else ae(2);t.G=0,t.l&&t.l.va(e),fu(t),au(t)}_.kb=function(t){t?(this.j.info("Successfully pinged google.com"),ae(2)):(this.j.info("Failed to ping google.com"),ae(1))};function fu(t){if(t.G=0,t.la=[],t.l){const e=Zc(t.h);(e.length!=0||t.i.length!=0)&&(jo(t.la,e),jo(t.la,t.i),t.h.i.length=0,Ii(t.i),t.i.length=0),t.l.ua()}}function pu(t,e,n){var s=n instanceof at?Oe(n):new at(n,void 0);if(s.g!="")e&&(s.g=e+"."+s.g),Ts(s,s.m);else{var r=b.location;s=r.protocol,e=e?e+"."+r.hostname:r.hostname,r=+r.port;var i=new at(null,void 0);s&&Is(i,s),e&&(i.g=e),r&&Ts(i,r),n&&(i.l=n),s=i}return n=t.D,e=t.za,n&&e&&F(s,n,e),F(s,"VER",t.ma),xn(t,s),s}function gu(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Da&&!t.ra?new B(new Ln({jb:!0})):new B(t.ra),e.Ka(t.H),e}function mu(){}_=mu.prototype;_.xa=function(){};_.wa=function(){};_.va=function(){};_.ua=function(){};_.Ra=function(){};function Ss(){if(Dt&&!(10<=Number(cf)))throw Error("Environmental error: no available transport.")}Ss.prototype.g=function(t,e){return new pe(t,e)};function pe(t,e){W.call(this),this.g=new ou(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.S=t,(t=e&&e.Yb)&&!_s(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!_s(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new Vt(this)}J(pe,W);pe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;ae(0),t.V=e,t.ia=n||{},t.L=t.Y,t.F=pu(t,null,t.V),er(t)};pe.prototype.close=function(){Vi(this.g)};pe.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=Ri(t),t=n);e.i.push(new xf(e.ab++,t)),e.G==3&&er(e)};pe.prototype.M=function(){this.g.l=null,delete this.j,Vi(this.g),delete this.g,pe.X.M.call(this)};function yu(t){Pi.call(this);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}J(yu,Pi);function vu(){Li.call(this),this.status=1}J(vu,Li);function Vt(t){this.g=t}J(Vt,mu);Vt.prototype.xa=function(){Y(this.g,"a")};Vt.prototype.wa=function(t){Y(this.g,new yu(t))};Vt.prototype.va=function(t){Y(this.g,new vu)};Vt.prototype.ua=function(){Y(this.g,"b")};Ss.prototype.createWebChannel=Ss.prototype.g;pe.prototype.send=pe.prototype.u;pe.prototype.open=pe.prototype.m;pe.prototype.close=pe.prototype.close;Ks.NO_ERROR=0;Ks.TIMEOUT=8;Ks.HTTP_ERROR=6;Uc.COMPLETE="complete";Fc.EventType=Nn;Nn.OPEN="a";Nn.CLOSE="b";Nn.ERROR="c";Nn.MESSAGE="d";W.prototype.listen=W.prototype.N;B.prototype.listenOnce=B.prototype.O;B.prototype.getLastError=B.prototype.Oa;B.prototype.getLastErrorCode=B.prototype.Ea;B.prototype.getStatus=B.prototype.aa;B.prototype.getResponseJson=B.prototype.Sa;B.prototype.getResponseText=B.prototype.fa;B.prototype.send=B.prototype.da;B.prototype.setWithCredentials=B.prototype.Ka;var Gf=function(){return new Ss},Kf=function(){return Gs()},Nr=Ks,Wf=Uc,Qf=vt,ta={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},Xf=Ln,ts=Fc,Yf=B;const na="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Z.UNAUTHENTICATED=new Z(null),Z.GOOGLE_CREDENTIALS=new Z("google-credentials-uid"),Z.FIRST_PARTY=new Z("first-party-uid"),Z.MOCK_USER=new Z("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bt="9.12.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=new vi("@firebase/firestore");function sa(){return ft.logLevel}function E(t,...e){if(ft.logLevel<=O.DEBUG){const n=e.map(qi);ft.debug(`Firestore (${Bt}): ${t}`,...n)}}function Pe(t,...e){if(ft.logLevel<=O.ERROR){const n=e.map(qi);ft.error(`Firestore (${Bt}): ${t}`,...n)}}function ti(t,...e){if(ft.logLevel<=O.WARN){const n=e.map(qi);ft.warn(`Firestore (${Bt}): ${t}`,...n)}}function qi(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(t="Unexpected state"){const e=`FIRESTORE (${Bt}) INTERNAL ASSERTION FAILED: `+t;throw Pe(e),new Error(e)}function M(t,e){t||S()}function k(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class v extends Se{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Jf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Z.UNAUTHENTICATED))}shutdown(){}}class Zf{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class ep{constructor(e){this.t=e,this.currentUser=Z.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new De;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new De,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},a=c=>{E("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(E("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new De)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(E("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(M(typeof s.accessToken=="string"),new _u(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return M(e===null||typeof e=="string"),new Z(e)}}class tp{constructor(e,n,s,r){this.h=e,this.l=n,this.m=s,this.g=r,this.type="FirstParty",this.user=Z.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():(M(!(typeof this.h!="object"||this.h===null||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class np{constructor(e,n,s,r){this.h=e,this.l=n,this.m=s,this.g=r}getToken(){return Promise.resolve(new tp(this.h,this.l,this.m,this.g))}start(e,n){e.enqueueRetryable(()=>n(Z.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class sp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class rp{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,n){const s=i=>{i.error!=null&&E("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.A;return this.A=i.token,E("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{E("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.T.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.T.getImmediate({optional:!0});i?r(i):E("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(M(typeof n.token=="string"),this.A=n.token,new sp(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(t){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=ip(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function P(t,e){return t<e?-1:t>e?1:0}function Nt(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new v(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new v(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new v(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new v(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return H.fromMillis(Date.now())}static fromDate(e){return H.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new H(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?P(this.nanoseconds,e.nanoseconds):P(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.timestamp=e}static fromTimestamp(e){return new C(e)}static min(){return new C(new H(0,0))}static max(){return new C(new H(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,n,s){n===void 0?n=0:n>e.length&&S(),s===void 0?s=e.length-n:s>e.length-n&&S(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return mn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof mn?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class U extends mn{construct(e,n,s){return new U(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new v(f.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new U(n)}static emptyPath(){return new U([])}}const op=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ee extends mn{construct(e,n,s){return new ee(e,n,s)}static isValidIdentifier(e){return op.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ee.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ee(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new v(f.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new v(f.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new v(f.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new v(f.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ee(n)}static emptyPath(){return new ee([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e){this.path=e}static fromPath(e){return new I(U.fromString(e))}static fromName(e){return new I(U.fromString(e).popFirst(5))}static empty(){return new I(U.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&U.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return U.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new I(new U(e.slice()))}}function ap(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=C.fromTimestamp(s===1e9?new H(n+1,0):new H(n,s));return new We(r,I.empty(),e)}function cp(t){return new We(t.readTime,t.key,-1)}class We{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new We(C.min(),I.empty(),-1)}static max(){return new We(C.max(),I.empty(),-1)}}function up(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=I.comparator(t.documentKey,e.documentKey),n!==0?n:P(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class hp{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(t){if(t.code!==f.FAILED_PRECONDITION||t.message!==lp)throw t;E("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&S(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new g((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof g?n:g.resolve(n)}catch(n){return g.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):g.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):g.reject(n)}static resolve(e){return new g((n,s)=>{n(e)})}static reject(e){return new g((n,s)=>{s(e)})}static waitFor(e){return new g((n,s)=>{let r=0,i=0,o=!1;e.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(e){let n=g.resolve(!1);for(const s of e)n=n.next(r=>r?g.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new g((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(l=>{o[u]=l,++a,a===i&&s(o)},l=>r(l))}})}static doWhile(e,n){return new g((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function Fn(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ut(s),this.ct=s=>n.writeSequenceNumber(s))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ct&&this.ct(e),e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function _t(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Eu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ji.at=-1;class G{constructor(e,n){this.comparator=e,this.root=n||Q.EMPTY}insert(e,n){return new G(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Q.BLACK,null,null))}remove(e){return new G(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Q.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ns(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ns(this.root,e,this.comparator,!1)}getReverseIterator(){return new ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ns(this.root,e,this.comparator,!0)}}class ns{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Q{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s!=null?s:Q.RED,this.left=r!=null?r:Q.EMPTY,this.right=i!=null?i:Q.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new Q(e!=null?e:this.key,n!=null?n:this.value,s!=null?s:this.color,r!=null?r:this.left,i!=null?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Q.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return Q.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Q.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Q.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw S();const e=this.left.check();if(e!==this.right.check())throw S();return e+(this.isRed()?0:1)}}Q.EMPTY=null,Q.RED=!0,Q.BLACK=!1;Q.EMPTY=new class{constructor(){this.size=0}get key(){throw S()}get value(){throw S()}get color(){throw S()}get left(){throw S()}get right(){throw S()}copy(t,e,n,s,r){return this}insert(t,e,n){return new Q(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.comparator=e,this.data=new G(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new ia(this.data.getIterator())}getIteratorFrom(e){return new ia(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof z)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new z(this.comparator);return n.data=e,n}}class ia{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.fields=e,e.sort(ee.comparator)}static empty(){return new me([])}unionWith(e){let n=new z(ee.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new me(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Nt(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.binaryString=e}static fromBase64String(e){const n=atob(e);return new ie(n)}static fromUint8Array(e){const n=function(s){let r="";for(let i=0;i<s.length;++i)r+=String.fromCharCode(s[i]);return r}(e);return new ie(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return P(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ie.EMPTY_BYTE_STRING=new ie("");const dp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qe(t){if(M(!!t),typeof t=="string"){let e=0;const n=dp.exec(t);if(M(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:j(t.seconds),nanos:j(t.nanos)}}function j(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Ot(t){return typeof t=="string"?ie.fromBase64String(t):ie.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Tu(t){const e=t.mapValue.fields.__previous_value__;return Iu(e)?Tu(e):e}function yn(t){const e=Qe(t.mapValue.fields.__local_write_time__.timestampValue);return new H(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e,n,s,r,i,o,a,c){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class vn{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new vn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof vn&&e.projectId===this.projectId&&e.database===this.database}}function tr(t){return t==null}function ks(t){return t===0&&1/t==-1/0}function pp(t){return typeof t=="number"&&Number.isInteger(t)&&!ks(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function pt(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Iu(t)?4:gp(t)?9007199254740991:10:S()}function be(t,e){if(t===e)return!0;const n=pt(t);if(n!==pt(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return yn(t).isEqual(yn(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const i=Qe(s.timestampValue),o=Qe(r.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,r){return Ot(s.bytesValue).isEqual(Ot(r.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,r){return j(s.geoPointValue.latitude)===j(r.geoPointValue.latitude)&&j(s.geoPointValue.longitude)===j(r.geoPointValue.longitude)}(t,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return j(s.integerValue)===j(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const i=j(s.doubleValue),o=j(r.doubleValue);return i===o?ks(i)===ks(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return Nt(t.arrayValue.values||[],e.arrayValue.values||[],be);case 10:return function(s,r){const i=s.mapValue.fields||{},o=r.mapValue.fields||{};if(ra(i)!==ra(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!be(i[a],o[a])))return!1;return!0}(t,e);default:return S()}}function _n(t,e){return(t.values||[]).find(n=>be(n,e))!==void 0}function Pt(t,e){if(t===e)return 0;const n=pt(t),s=pt(e);if(n!==s)return P(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return P(t.booleanValue,e.booleanValue);case 2:return function(r,i){const o=j(r.integerValue||r.doubleValue),a=j(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return oa(t.timestampValue,e.timestampValue);case 4:return oa(yn(t),yn(e));case 5:return P(t.stringValue,e.stringValue);case 6:return function(r,i){const o=Ot(r),a=Ot(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(r,i){const o=r.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=P(o[c],a[c]);if(u!==0)return u}return P(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(r,i){const o=P(j(r.latitude),j(i.latitude));return o!==0?o:P(j(r.longitude),j(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(r,i){const o=r.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=Pt(o[c],a[c]);if(u)return u}return P(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(r,i){if(r===ss.mapValue&&i===ss.mapValue)return 0;if(r===ss.mapValue)return 1;if(i===ss.mapValue)return-1;const o=r.fields||{},a=Object.keys(o),c=i.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let l=0;l<a.length&&l<u.length;++l){const h=P(a[l],u[l]);if(h!==0)return h;const d=Pt(o[a[l]],c[u[l]]);if(d!==0)return d}return P(a.length,u.length)}(t.mapValue,e.mapValue);default:throw S()}}function oa(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return P(t,e);const n=Qe(t),s=Qe(e),r=P(n.seconds,s.seconds);return r!==0?r:P(n.nanos,s.nanos)}function kt(t){return ni(t)}function ni(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(s){const r=Qe(s);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Ot(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,I.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(s){let r="[",i=!0;for(const o of s.values||[])i?i=!1:r+=",",r+=ni(o);return r+"]"}(t.arrayValue):"mapValue"in t?function(s){const r=Object.keys(s.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${ni(s.fields[a])}`;return i+"}"}(t.mapValue):S();var e,n}function aa(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function si(t){return!!t&&"integerValue"in t}function Hi(t){return!!t&&"arrayValue"in t}function ca(t){return!!t&&"nullValue"in t}function ua(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function as(t){return!!t&&"mapValue"in t}function sn(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return _t(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=sn(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=sn(t.arrayValue.values[n]);return e}return Object.assign({},t)}function gp(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.value=e}static empty(){return new he({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!as(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=sn(n)}setAll(e){let n=ee.emptyPath(),s={},r=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=sn(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());as(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return be(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];as(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){_t(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new he(sn(this.value))}}function bu(t){const e=[];return _t(t.fields,(n,s)=>{const r=new ee([n]);if(as(s)){const i=bu(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new me(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e,n,s,r,i,o){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.data=i,this.documentState=o}static newInvalidDocument(e){return new X(e,0,C.min(),C.min(),he.empty(),0)}static newFoundDocument(e,n,s){return new X(e,1,n,C.min(),s,0)}static newNoDocument(e,n){return new X(e,2,n,C.min(),he.empty(),0)}static newUnknownDocument(e,n){return new X(e,3,n,C.min(),he.empty(),2)}convertToFoundDocument(e,n){return this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=he.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=he.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=C.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof X&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new X(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e,n=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.ht=null}}function la(t,e=null,n=[],s=[],r=null,i=null,o=null){return new mp(t,e,n,s,r,i,o)}function zi(t){const e=k(t);if(e.ht===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>{return(r=s).field.canonicalString()+r.op.toString()+kt(r.value);var r}).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),tr(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>kt(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>kt(s)).join(",")),e.ht=n}return e.ht}function yp(t){let e=t.path.canonicalString();return t.collectionGroup!==null&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(n=>{return`${(s=n).field.canonicalString()} ${s.op} ${kt(s.value)}`;var s}).join(", ")}]`),tr(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(n=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(n)).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>kt(n)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>kt(n)).join(",")),`Target(${e})`}function Gi(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let r=0;r<t.orderBy.length;r++)if(!Sp(t.orderBy[r],e.orderBy[r]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let r=0;r<t.filters.length;r++)if(n=t.filters[r],s=e.filters[r],n.op!==s.op||!n.field.isEqual(s.field)||!be(n.value,s.value))return!1;var n,s;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!da(t.startAt,e.startAt)&&da(t.endAt,e.endAt)}function ri(t){return I.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}class ce extends class{}{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.lt(e,n,s):new vp(e,n,s):n==="array-contains"?new Ep(e,s):n==="in"?new Ip(e,s):n==="not-in"?new Tp(e,s):n==="array-contains-any"?new bp(e,s):new ce(e,n,s)}static lt(e,n,s){return n==="in"?new _p(e,s):new wp(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.ft(Pt(n,this.value)):n!==null&&pt(this.value)===pt(n)&&this.ft(Pt(n,this.value))}ft(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return S()}}dt(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class vp extends ce{constructor(e,n,s){super(e,n,s),this.key=I.fromName(s.referenceValue)}matches(e){const n=I.comparator(e.key,this.key);return this.ft(n)}}class _p extends ce{constructor(e,n){super(e,"in",n),this.keys=Su("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class wp extends ce{constructor(e,n){super(e,"not-in",n),this.keys=Su("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Su(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>I.fromName(s.referenceValue))}class Ep extends ce{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Hi(n)&&_n(n.arrayValue,this.value)}}class Ip extends ce{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&_n(this.value.arrayValue,n)}}class Tp extends ce{constructor(e,n){super(e,"not-in",n)}matches(e){if(_n(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!_n(this.value.arrayValue,n)}}class bp extends ce{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Hi(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>_n(this.value.arrayValue,s))}}class Cs{constructor(e,n){this.position=e,this.inclusive=n}}class rn{constructor(e,n="asc"){this.field=e,this.dir=n}}function Sp(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function ha(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=I.comparator(I.fromName(o.referenceValue),n.key):s=Pt(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function da(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!be(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,n=null,s=[],r=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this._t=null,this.wt=null,this.startAt,this.endAt}}function kp(t,e,n,s,r,i,o,a){return new Vn(t,e,n,s,r,i,o,a)}function nr(t){return new Vn(t)}function fa(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function ku(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Cu(t){for(const e of t.filters)if(e.dt())return e.field;return null}function Au(t){return t.collectionGroup!==null}function wn(t){const e=k(t);if(e._t===null){e._t=[];const n=Cu(e),s=ku(e);if(n!==null&&s===null)n.isKeyField()||e._t.push(new rn(n)),e._t.push(new rn(ee.keyField(),"asc"));else{let r=!1;for(const i of e.explicitOrderBy)e._t.push(i),i.field.isKeyField()&&(r=!0);if(!r){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e._t.push(new rn(ee.keyField(),i))}}}return e._t}function Le(t){const e=k(t);if(!e.wt)if(e.limitType==="F")e.wt=la(e.path,e.collectionGroup,wn(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of wn(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new rn(i.field,o))}const s=e.endAt?new Cs(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Cs(e.startAt.position,e.startAt.inclusive):null;e.wt=la(e.path,e.collectionGroup,n,e.filters,e.limit,s,r)}return e.wt}function ii(t,e,n){return new Vn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function sr(t,e){return Gi(Le(t),Le(e))&&t.limitType===e.limitType}function Ru(t){return`${zi(Le(t))}|lt:${t.limitType}`}function oi(t){return`Query(target=${yp(Le(t))}; limitType=${t.limitType})`}function Ki(t,e){return e.isFoundDocument()&&function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):I.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(t,e)&&function(n,s){for(const r of n.explicitOrderBy)if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(t,e)&&function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0}(t,e)&&function(n,s){return!(n.startAt&&!function(r,i,o){const a=ha(r,i,o);return r.inclusive?a<=0:a<0}(n.startAt,wn(n),s)||n.endAt&&!function(r,i,o){const a=ha(r,i,o);return r.inclusive?a>=0:a>0}(n.endAt,wn(n),s))}(t,e)}function Cp(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Du(t){return(e,n)=>{let s=!1;for(const r of wn(t)){const i=Ap(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function Ap(t,e,n){const s=t.field.isKeyField()?I.comparator(e.key,n.key):function(r,i,o){const a=i.data.field(r),c=o.data.field(r);return a!==null&&c!==null?Pt(a,c):S()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return S()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(t,e){if(t.gt){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ks(e)?"-0":e}}function Ou(t){return{integerValue:""+t}}function Rp(t,e){return pp(e)?Ou(e):Nu(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(){this._=void 0}}function Dp(t,e,n){return t instanceof As?function(s,r){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&(i.fields.__previous_value__=r),{mapValue:i}}(n,e):t instanceof En?Lu(t,e):t instanceof In?Mu(t,e):function(s,r){const i=Pu(s,r),o=pa(i)+pa(s.yt);return si(i)&&si(s.yt)?Ou(o):Nu(s.It,o)}(t,e)}function Np(t,e,n){return t instanceof En?Lu(t,e):t instanceof In?Mu(t,e):n}function Pu(t,e){return t instanceof Rs?si(n=e)||function(s){return!!s&&"doubleValue"in s}(n)?e:{integerValue:0}:null;var n}class As extends rr{}class En extends rr{constructor(e){super(),this.elements=e}}function Lu(t,e){const n=xu(e);for(const s of t.elements)n.some(r=>be(r,s))||n.push(s);return{arrayValue:{values:n}}}class In extends rr{constructor(e){super(),this.elements=e}}function Mu(t,e){let n=xu(e);for(const s of t.elements)n=n.filter(r=>!be(r,s));return{arrayValue:{values:n}}}class Rs extends rr{constructor(e,n){super(),this.It=e,this.yt=n}}function pa(t){return j(t.integerValue||t.doubleValue)}function xu(t){return Hi(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function Op(t,e){return t.field.isEqual(e.field)&&function(n,s){return n instanceof En&&s instanceof En||n instanceof In&&s instanceof In?Nt(n.elements,s.elements,be):n instanceof Rs&&s instanceof Rs?be(n.yt,s.yt):n instanceof As&&s instanceof As}(t.transform,e.transform)}class Pp{constructor(e,n){this.version=e,this.transformResults=n}}class ye{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new ye}static exists(e){return new ye(void 0,e)}static updateTime(e){return new ye(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function cs(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class ir{}function Uu(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Vu(t.key,ye.none()):new Bn(t.key,t.data,ye.none());{const n=t.data,s=he.empty();let r=new z(ee.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new et(t.key,s,new me(r.toArray()),ye.none())}}function Lp(t,e,n){t instanceof Bn?function(s,r,i){const o=s.value.clone(),a=ma(s.fieldTransforms,r,i.transformResults);o.setAll(a),r.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof et?function(s,r,i){if(!cs(s.precondition,r))return void r.convertToUnknownDocument(i.version);const o=ma(s.fieldTransforms,r,i.transformResults),a=r.data;a.setAll(Fu(s)),a.setAll(o),r.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(s,r,i){r.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function on(t,e,n,s){return t instanceof Bn?function(r,i,o,a){if(!cs(r.precondition,i))return o;const c=r.value.clone(),u=ya(r.fieldTransforms,a,i);return c.setAll(u),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),null}(t,e,n,s):t instanceof et?function(r,i,o,a){if(!cs(r.precondition,i))return o;const c=ya(r.fieldTransforms,a,i),u=i.data;return u.setAll(Fu(r)),u.setAll(c),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(l=>l.field))}(t,e,n,s):function(r,i,o){return cs(r.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function Mp(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=Pu(s.transform,r||null);i!=null&&(n===null&&(n=he.empty()),n.set(s.field,i))}return n||null}function ga(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Nt(n,s,(r,i)=>Op(r,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Bn extends ir{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class et extends ir{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fu(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function ma(t,e,n){const s=new Map;M(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,Np(o,a,n[r]))}return s}function ya(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,Dp(i,o,e))}return s}class Vu extends ir{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class xp extends ir{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e){this.count=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q,R;function Fp(t){switch(t){default:return S();case f.CANCELLED:case f.UNKNOWN:case f.DEADLINE_EXCEEDED:case f.RESOURCE_EXHAUSTED:case f.INTERNAL:case f.UNAVAILABLE:case f.UNAUTHENTICATED:return!1;case f.INVALID_ARGUMENT:case f.NOT_FOUND:case f.ALREADY_EXISTS:case f.PERMISSION_DENIED:case f.FAILED_PRECONDITION:case f.ABORTED:case f.OUT_OF_RANGE:case f.UNIMPLEMENTED:case f.DATA_LOSS:return!0}}function Bu(t){if(t===void 0)return Pe("GRPC error has no .code"),f.UNKNOWN;switch(t){case q.OK:return f.OK;case q.CANCELLED:return f.CANCELLED;case q.UNKNOWN:return f.UNKNOWN;case q.DEADLINE_EXCEEDED:return f.DEADLINE_EXCEEDED;case q.RESOURCE_EXHAUSTED:return f.RESOURCE_EXHAUSTED;case q.INTERNAL:return f.INTERNAL;case q.UNAVAILABLE:return f.UNAVAILABLE;case q.UNAUTHENTICATED:return f.UNAUTHENTICATED;case q.INVALID_ARGUMENT:return f.INVALID_ARGUMENT;case q.NOT_FOUND:return f.NOT_FOUND;case q.ALREADY_EXISTS:return f.ALREADY_EXISTS;case q.PERMISSION_DENIED:return f.PERMISSION_DENIED;case q.FAILED_PRECONDITION:return f.FAILED_PRECONDITION;case q.ABORTED:return f.ABORTED;case q.OUT_OF_RANGE:return f.OUT_OF_RANGE;case q.UNIMPLEMENTED:return f.UNIMPLEMENTED;case q.DATA_LOSS:return f.DATA_LOSS;default:return S()}}(R=q||(q={}))[R.OK=0]="OK",R[R.CANCELLED=1]="CANCELLED",R[R.UNKNOWN=2]="UNKNOWN",R[R.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",R[R.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",R[R.NOT_FOUND=5]="NOT_FOUND",R[R.ALREADY_EXISTS=6]="ALREADY_EXISTS",R[R.PERMISSION_DENIED=7]="PERMISSION_DENIED",R[R.UNAUTHENTICATED=16]="UNAUTHENTICATED",R[R.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",R[R.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",R[R.ABORTED=10]="ABORTED",R[R.OUT_OF_RANGE=11]="OUT_OF_RANGE",R[R.UNIMPLEMENTED=12]="UNIMPLEMENTED",R[R.INTERNAL=13]="INTERNAL",R[R.UNAVAILABLE=14]="UNAVAILABLE",R[R.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){_t(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return Eu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp=new G(I.comparator);function Me(){return Vp}const $u=new G(I.comparator);function en(...t){let e=$u;for(const n of t)e=e.insert(n.key,n);return e}function qu(t){let e=$u;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function ot(){return an()}function ju(){return an()}function an(){return new $t(t=>t.toString(),(t,e)=>t.isEqual(e))}const Bp=new G(I.comparator),$p=new z(I.comparator);function A(...t){let e=$p;for(const n of t)e=e.add(n);return e}const qp=new z(P);function Hu(){return qp}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,$n.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new or(C.min(),r,Hu(),Me(),A())}}class $n{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new $n(s,n,A(),A(),A())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,n,s,r){this.Tt=e,this.removedTargetIds=n,this.key=s,this.Et=r}}class zu{constructor(e,n){this.targetId=e,this.At=n}}class Gu{constructor(e,n,s=ie.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class va{constructor(){this.Rt=0,this.bt=wa(),this.Pt=ie.EMPTY_BYTE_STRING,this.vt=!1,this.Vt=!0}get current(){return this.vt}get resumeToken(){return this.Pt}get St(){return this.Rt!==0}get Dt(){return this.Vt}Ct(e){e.approximateByteSize()>0&&(this.Vt=!0,this.Pt=e)}xt(){let e=A(),n=A(),s=A();return this.bt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:S()}}),new $n(this.Pt,this.vt,e,n,s)}Nt(){this.Vt=!1,this.bt=wa()}kt(e,n){this.Vt=!0,this.bt=this.bt.insert(e,n)}Ot(e){this.Vt=!0,this.bt=this.bt.remove(e)}Mt(){this.Rt+=1}Ft(){this.Rt-=1}$t(){this.Vt=!0,this.vt=!0}}class jp{constructor(e){this.Bt=e,this.Lt=new Map,this.Ut=Me(),this.qt=_a(),this.Kt=new z(P)}Gt(e){for(const n of e.Tt)e.Et&&e.Et.isFoundDocument()?this.Qt(n,e.Et):this.jt(n,e.key,e.Et);for(const n of e.removedTargetIds)this.jt(n,e.key,e.Et)}Wt(e){this.forEachTarget(e,n=>{const s=this.zt(n);switch(e.state){case 0:this.Ht(n)&&s.Ct(e.resumeToken);break;case 1:s.Ft(),s.St||s.Nt(),s.Ct(e.resumeToken);break;case 2:s.Ft(),s.St||this.removeTarget(n);break;case 3:this.Ht(n)&&(s.$t(),s.Ct(e.resumeToken));break;case 4:this.Ht(n)&&(this.Jt(n),s.Ct(e.resumeToken));break;default:S()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Lt.forEach((s,r)=>{this.Ht(r)&&n(r)})}Yt(e){const n=e.targetId,s=e.At.count,r=this.Xt(n);if(r){const i=r.target;if(ri(i))if(s===0){const o=new I(i.path);this.jt(n,o,X.newNoDocument(o,C.min()))}else M(s===1);else this.Zt(n)!==s&&(this.Jt(n),this.Kt=this.Kt.add(n))}}te(e){const n=new Map;this.Lt.forEach((i,o)=>{const a=this.Xt(o);if(a){if(i.current&&ri(a.target)){const c=new I(a.target.path);this.Ut.get(c)!==null||this.ee(o,c)||this.jt(o,c,X.newNoDocument(c,e))}i.Dt&&(n.set(o,i.xt()),i.Nt())}});let s=A();this.qt.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.Xt(c);return!u||u.purpose===2||(a=!1,!1)}),a&&(s=s.add(i))}),this.Ut.forEach((i,o)=>o.setReadTime(e));const r=new or(e,n,this.Kt,this.Ut,s);return this.Ut=Me(),this.qt=_a(),this.Kt=new z(P),r}Qt(e,n){if(!this.Ht(e))return;const s=this.ee(e,n.key)?2:0;this.zt(e).kt(n.key,s),this.Ut=this.Ut.insert(n.key,n),this.qt=this.qt.insert(n.key,this.ne(n.key).add(e))}jt(e,n,s){if(!this.Ht(e))return;const r=this.zt(e);this.ee(e,n)?r.kt(n,1):r.Ot(n),this.qt=this.qt.insert(n,this.ne(n).delete(e)),s&&(this.Ut=this.Ut.insert(n,s))}removeTarget(e){this.Lt.delete(e)}Zt(e){const n=this.zt(e).xt();return this.Bt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Mt(e){this.zt(e).Mt()}zt(e){let n=this.Lt.get(e);return n||(n=new va,this.Lt.set(e,n)),n}ne(e){let n=this.qt.get(e);return n||(n=new z(P),this.qt=this.qt.insert(e,n)),n}Ht(e){const n=this.Xt(e)!==null;return n||E("WatchChangeAggregator","Detected inactive target",e),n}Xt(e){const n=this.Lt.get(e);return n&&n.St?null:this.Bt.se(e)}Jt(e){this.Lt.set(e,new va),this.Bt.getRemoteKeysForTarget(e).forEach(n=>{this.jt(e,n,null)})}ee(e,n){return this.Bt.getRemoteKeysForTarget(e).has(n)}}function _a(){return new G(I.comparator)}function wa(){return new G(I.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),zp=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))();class Gp{constructor(e,n){this.databaseId=e,this.gt=n}}function Ds(t,e){return t.gt?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ku(t,e){return t.gt?e.toBase64():e.toUint8Array()}function Kp(t,e){return Ds(t,e.toTimestamp())}function Ne(t){return M(!!t),C.fromTimestamp(function(e){const n=Qe(e);return new H(n.seconds,n.nanos)}(t))}function Wi(t,e){return function(n){return new U(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function Wu(t){const e=U.fromString(t);return M(Yu(e)),e}function ai(t,e){return Wi(t.databaseId,e.path)}function Or(t,e){const n=Wu(e);if(n.get(1)!==t.databaseId.projectId)throw new v(f.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new v(f.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new I(Qu(n))}function ci(t,e){return Wi(t.databaseId,e)}function Wp(t){const e=Wu(t);return e.length===4?U.emptyPath():Qu(e)}function ui(t){return new U(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Qu(t){return M(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Ea(t,e,n){return{name:ai(t,e),fields:n.value.mapValue.fields}}function Qp(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:S()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(c,u){return c.gt?(M(u===void 0||typeof u=="string"),ie.fromBase64String(u||"")):(M(u===void 0||u instanceof Uint8Array),ie.fromUint8Array(u||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?f.UNKNOWN:Bu(c.code);return new v(u,c.message||"")}(o);n=new Gu(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Or(t,s.document.name),i=Ne(s.document.updateTime),o=new he({mapValue:{fields:s.document.fields}}),a=X.newFoundDocument(r,i,o),c=s.targetIds||[],u=s.removedTargetIds||[];n=new us(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Or(t,s.document),i=s.readTime?Ne(s.readTime):C.min(),o=X.newNoDocument(r,i),a=s.removedTargetIds||[];n=new us([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Or(t,s.document),i=s.removedTargetIds||[];n=new us([],i,r,null)}else{if(!("filter"in e))return S();{e.filter;const s=e.filter;s.targetId;const r=s.count||0,i=new Up(r),o=s.targetId;n=new zu(o,i)}}return n}function Xp(t,e){let n;if(e instanceof Bn)n={update:Ea(t,e.key,e.value)};else if(e instanceof Vu)n={delete:ai(t,e.key)};else if(e instanceof et)n={update:Ea(t,e.key,e.data),updateMask:og(e.fieldMask)};else{if(!(e instanceof xp))return S();n={verify:ai(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(r,i){const o=i.transform;if(o instanceof As)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof En)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof In)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Rs)return{fieldPath:i.field.canonicalString(),increment:o.yt};throw S()}(0,s))),e.precondition.isNone||(n.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:Kp(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:S()}(t,e.precondition)),n}function Yp(t,e){return t&&t.length>0?(M(e!==void 0),t.map(n=>function(s,r){let i=s.updateTime?Ne(s.updateTime):Ne(r);return i.isEqual(C.min())&&(i=Ne(r)),new Pp(i,s.transformResults||[])}(n,e))):[]}function Jp(t,e){return{documents:[ci(t,e.path)]}}function Zp(t,e){const n={structuredQuery:{}},s=e.path;e.collectionGroup!==null?(n.parent=ci(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=ci(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(c){if(c.length===0)return;const u=c.map(l=>function(h){if(h.op==="=="){if(ua(h.value))return{unaryFilter:{field:Et(h.field),op:"IS_NAN"}};if(ca(h.value))return{unaryFilter:{field:Et(h.field),op:"IS_NULL"}}}else if(h.op==="!="){if(ua(h.value))return{unaryFilter:{field:Et(h.field),op:"IS_NOT_NAN"}};if(ca(h.value))return{unaryFilter:{field:Et(h.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Et(h.field),op:sg(h.op),value:h.value}}}(l));return u.length===1?u[0]:{compositeFilter:{op:"AND",filters:u}}}(e.filters);r&&(n.structuredQuery.where=r);const i=function(c){if(c.length!==0)return c.map(u=>function(l){return{field:Et(l.field),direction:ng(l.dir)}}(u))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(c,u){return c.gt||tr(u)?u:{value:u}}(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),n}function eg(t){let e=Wp(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){M(s===1);const l=n.from[0];l.allDescendants?r=l.collectionId:e=e.child(l.collectionId)}let i=[];n.where&&(i=Xu(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(l=>function(h){return new rn(bt(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;n.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,tr(h)?null:h}(n.limit));let c=null;n.startAt&&(c=function(l){const h=!!l.before,d=l.values||[];return new Cs(d,h)}(n.startAt));let u=null;return n.endAt&&(u=function(l){const h=!l.before,d=l.values||[];return new Cs(d,h)}(n.endAt)),kp(e,r,o,i,a,"F",c,u)}function tg(t,e){const n=function(s,r){switch(r){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return S()}}(0,e.purpose);return n==null?null:{"goog-listen-tags":n}}function Xu(t){return t?t.unaryFilter!==void 0?[ig(t)]:t.fieldFilter!==void 0?[rg(t)]:t.compositeFilter!==void 0?t.compositeFilter.filters.map(e=>Xu(e)).reduce((e,n)=>e.concat(n)):S():[]}function ng(t){return Hp[t]}function sg(t){return zp[t]}function Et(t){return{fieldPath:t.canonicalString()}}function bt(t){return ee.fromServerFormat(t.fieldPath)}function rg(t){return ce.create(bt(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return S()}}(t.fieldFilter.op),t.fieldFilter.value)}function ig(t){switch(t.unaryFilter.op){case"IS_NAN":const e=bt(t.unaryFilter.field);return ce.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=bt(t.unaryFilter.field);return ce.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=bt(t.unaryFilter.field);return ce.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=bt(t.unaryFilter.field);return ce.create(r,"!=",{nullValue:"NULL_VALUE"});default:return S()}}function og(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Yu(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&Lp(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=on(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=on(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=ju();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const c=Uu(o,a);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(C.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),A())}isEqual(e){return this.batchId===e.batchId&&Nt(this.mutations,e.mutations,(n,s)=>ga(n,s))&&Nt(this.baseMutations,e.baseMutations,(n,s)=>ga(n,s))}}class Qi{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){M(e.mutations.length===s.length);let r=Bp;const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new Qi(e,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,n,s,r,i=C.min(),o=C.min(),a=ie.EMPTY_BYTE_STRING){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new ct(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,n){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e){this.re=e}}function lg(t){const e=eg({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?ii(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(){this.Ye=new dg}addToCollectionParentIndex(e,n){return this.Ye.add(n),g.resolve()}getCollectionParents(e,n){return g.resolve(this.Ye.getEntries(n))}addFieldIndex(e,n){return g.resolve()}deleteFieldIndex(e,n){return g.resolve()}getDocumentsMatchingTarget(e,n){return g.resolve(null)}getIndexType(e,n){return g.resolve(0)}getFieldIndexes(e,n){return g.resolve([])}getNextCollectionGroupToUpdate(e){return g.resolve(null)}getMinOffset(e,n){return g.resolve(We.min())}getMinOffsetFromCollectionGroup(e,n){return g.resolve(We.min())}updateCollectionGroup(e,n,s){return g.resolve()}updateIndexEntries(e,n){return g.resolve()}}class dg{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new z(U.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new z(U.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new Lt(0)}static vn(){return new Lt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(){this.changes=new $t(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,X.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?g.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gg{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.getBaseDocument(e,n,s))).next(r=>(s!==null&&on(s.mutation,r,me.empty(),H.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,A()).next(()=>s))}getLocalViewOfDocuments(e,n,s=A()){const r=ot();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=en();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=ot();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,A()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,s,r){let i=Me();const o=an(),a=an();return n.forEach((c,u)=>{const l=s.get(u.key);r.has(u.key)&&(l===void 0||l.mutation instanceof et)?i=i.insert(u.key,u):l!==void 0&&(o.set(u.key,l.mutation.getFieldMask()),on(l.mutation,u,l.mutation.getFieldMask(),H.now()))}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,l)=>o.set(u,l)),n.forEach((u,l)=>{var h;return a.set(u,new pg(l,(h=o.get(u))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const s=an();let r=new G((o,a)=>o-a),i=A();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let l=s.get(c)||me.empty();l=a.applyToLocalView(u,l),s.set(c,l);const h=(r.get(a.batchId)||A()).add(c);r=r.insert(a.batchId,h)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,l=c.value,h=ju();l.forEach(d=>{if(!i.has(d)){const p=Uu(n.get(d),s.get(d));p!==null&&h.set(d,p),i=i.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,h))}return g.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s){return function(r){return I.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Au(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s):this.getDocumentsMatchingCollectionQuery(e,n,s)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):g.resolve(ot());let a=-1,c=i;return o.next(u=>g.forEach(u,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(l)?g.resolve():this.getBaseDocument(e,l,h).next(d=>{c=c.insert(l,d)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,A())).next(l=>({batchId:a,changes:qu(l)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new I(n)).next(s=>{let r=en();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s){const r=n.collectionGroup;let i=en();return this.indexManager.getCollectionParents(e,r).next(o=>g.forEach(o,a=>{const c=function(u,l){return new Vn(l,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(r));return this.getDocumentsMatchingCollectionQuery(e,c,s).next(u=>{u.forEach((l,h)=>{i=i.insert(l,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,s){let r;return this.remoteDocumentCache.getAllFromCollection(e,n.path,s).next(i=>(r=i,this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId))).next(i=>{i.forEach((a,c)=>{const u=c.getKey();r.get(u)===null&&(r=r.insert(u,X.newInvalidDocument(u)))});let o=en();return r.forEach((a,c)=>{const u=i.get(a);u!==void 0&&on(u.mutation,c,me.empty(),H.now()),Ki(n,c)&&(o=o.insert(a,c))}),o})}getBaseDocument(e,n,s){return s===null||s.mutation.type===1?this.remoteDocumentCache.getEntry(e,n):g.resolve(X.newInvalidDocument(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e){this.It=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,n){return g.resolve(this.Zn.get(n))}saveBundleMetadata(e,n){var s;return this.Zn.set(n.id,{id:(s=n).id,version:s.version,createTime:Ne(s.createTime)}),g.resolve()}getNamedQuery(e,n){return g.resolve(this.ts.get(n))}saveNamedQuery(e,n){return this.ts.set(n.name,function(s){return{name:s.name,query:lg(s.bundledQuery),readTime:Ne(s.readTime)}}(n)),g.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(){this.overlays=new G(I.comparator),this.es=new Map}getOverlay(e,n){return g.resolve(this.overlays.get(n))}getOverlays(e,n){const s=ot();return g.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.ue(e,n,i)}),g.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.es.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.es.delete(s)),g.resolve()}getOverlaysForCollection(e,n,s){const r=ot(),i=n.length+1,o=new I(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return g.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new G((u,l)=>u-l);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>s){let l=i.get(u.largestBatchId);l===null&&(l=ot(),i=i.insert(u.largestBatchId,l)),l.set(u.getKey(),u)}}const a=ot(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,l)=>a.set(u,l)),!(a.size()>=r)););return g.resolve(a)}ue(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.es.get(r.largestBatchId).delete(s.key);this.es.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new cg(n,s));let i=this.es.get(n);i===void 0&&(i=A(),this.es.set(n,i)),this.es.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(){this.ns=new z(K.ss),this.rs=new z(K.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,n){const s=new K(e,n);this.ns=this.ns.add(s),this.rs=this.rs.add(s)}us(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.cs(new K(e,n))}hs(e,n){e.forEach(s=>this.removeReference(s,n))}ls(e){const n=new I(new U([])),s=new K(n,e),r=new K(n,e+1),i=[];return this.rs.forEachInRange([s,r],o=>{this.cs(o),i.push(o.key)}),i}fs(){this.ns.forEach(e=>this.cs(e))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){const n=new I(new U([])),s=new K(n,e),r=new K(n,e+1);let i=A();return this.rs.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new K(e,0),s=this.ns.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class K{constructor(e,n){this.key=e,this._s=n}static ss(e,n){return I.comparator(e.key,n.key)||P(e._s,n._s)}static os(e,n){return P(e._s,n._s)||I.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.ws=1,this.gs=new z(K.ss)}checkEmpty(e){return g.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ag(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.gs=this.gs.add(new K(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return g.resolve(o)}lookupMutationBatch(e,n){return g.resolve(this.ys(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.ps(s),i=r<0?0:r;return g.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return g.resolve(this.mutationQueue.length===0?-1:this.ws-1)}getAllMutationBatches(e){return g.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new K(n,0),r=new K(n,Number.POSITIVE_INFINITY),i=[];return this.gs.forEachInRange([s,r],o=>{const a=this.ys(o._s);i.push(a)}),g.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new z(P);return n.forEach(r=>{const i=new K(r,0),o=new K(r,Number.POSITIVE_INFINITY);this.gs.forEachInRange([i,o],a=>{s=s.add(a._s)})}),g.resolve(this.Is(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;I.isDocumentKey(i)||(i=i.child(""));const o=new K(new I(i),0);let a=new z(P);return this.gs.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(a=a.add(c._s)),!0)},o),g.resolve(this.Is(a))}Is(e){const n=[];return e.forEach(s=>{const r=this.ys(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){M(this.Ts(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.gs;return g.forEach(n.mutations,r=>{const i=new K(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.gs=s})}An(e){}containsKey(e,n){const s=new K(n,0),r=this.gs.firstAfterOrEqual(s);return g.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,g.resolve()}Ts(e,n){return this.ps(e)}ps(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}ys(e){const n=this.ps(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e){this.Es=e,this.docs=new G(I.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Es(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return g.resolve(s?s.document.mutableCopy():X.newInvalidDocument(n))}getEntries(e,n){let s=Me();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():X.newInvalidDocument(r))}),g.resolve(s)}getAllFromCollection(e,n,s){let r=Me();const i=new I(n.child("")),o=this.docs.getIteratorFrom(i);for(;o.hasNext();){const{key:a,value:{document:c}}=o.getNext();if(!n.isPrefixOf(a.path))break;a.path.length>n.length+1||up(cp(c),s)<=0||(r=r.insert(c.key,c.mutableCopy()))}return g.resolve(r)}getAllFromCollectionGroup(e,n,s,r){S()}As(e,n){return g.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new wg(this)}getSize(e){return g.resolve(this.size)}}class wg extends fg{constructor(e){super(),this.Yn=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.Yn.addEntry(e,r)):this.Yn.removeEntry(s)}),g.waitFor(n)}getFromCache(e,n){return this.Yn.getEntry(e,n)}getAllFromCache(e,n){return this.Yn.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(e){this.persistence=e,this.Rs=new $t(n=>zi(n),Gi),this.lastRemoteSnapshotVersion=C.min(),this.highestTargetId=0,this.bs=0,this.Ps=new Xi,this.targetCount=0,this.vs=Lt.Pn()}forEachTarget(e,n){return this.Rs.forEach((s,r)=>n(r)),g.resolve()}getLastRemoteSnapshotVersion(e){return g.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return g.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),g.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.bs&&(this.bs=n),g.resolve()}Dn(e){this.Rs.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.vs=new Lt(n),this.highestTargetId=n),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,n){return this.Dn(n),this.targetCount+=1,g.resolve()}updateTargetData(e,n){return this.Dn(n),g.resolve()}removeTargetData(e,n){return this.Rs.delete(n.target),this.Ps.ls(n.targetId),this.targetCount-=1,g.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.Rs.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.Rs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),g.waitFor(i).next(()=>r)}getTargetCount(e){return g.resolve(this.targetCount)}getTargetData(e,n){const s=this.Rs.get(n)||null;return g.resolve(s)}addMatchingKeys(e,n,s){return this.Ps.us(n,s),g.resolve()}removeMatchingKeys(e,n,s){this.Ps.hs(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),g.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Ps.ls(n),g.resolve()}getMatchingKeysForTargetId(e,n){const s=this.Ps.ds(n);return g.resolve(s)}containsKey(e,n){return g.resolve(this.Ps.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e,n){this.Vs={},this.overlays={},this.Ss=new ji(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new Eg(this),this.indexManager=new hg,this.remoteDocumentCache=function(s){return new _g(s)}(s=>this.referenceDelegate.xs(s)),this.It=new ug(n),this.Ns=new mg(this.It)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new yg,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.Vs[e.toKey()];return s||(s=new vg(n,this.referenceDelegate),this.Vs[e.toKey()]=s),s}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,n,s){E("MemoryPersistence","Starting transaction:",e);const r=new Tg(this.Ss.next());return this.referenceDelegate.ks(),s(r).next(i=>this.referenceDelegate.Os(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ms(e,n){return g.or(Object.values(this.Vs).map(s=>()=>s.containsKey(e,n)))}}class Tg extends hp{constructor(e){super(),this.currentSequenceNumber=e}}class Yi{constructor(e){this.persistence=e,this.Fs=new Xi,this.$s=null}static Bs(e){return new Yi(e)}get Ls(){if(this.$s)return this.$s;throw S()}addReference(e,n,s){return this.Fs.addReference(s,n),this.Ls.delete(s.toString()),g.resolve()}removeReference(e,n,s){return this.Fs.removeReference(s,n),this.Ls.add(s.toString()),g.resolve()}markPotentiallyOrphaned(e,n){return this.Ls.add(n.toString()),g.resolve()}removeTarget(e,n){this.Fs.ls(n.targetId).forEach(r=>this.Ls.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Ls.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}ks(){this.$s=new Set}Os(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return g.forEach(this.Ls,s=>{const r=I.fromPath(s);return this.Us(e,r).next(i=>{i||n.removeEntry(r,C.min())})}).next(()=>(this.$s=null,n.apply(e)))}updateLimboDocument(e,n){return this.Us(e,n).next(s=>{s?this.Ls.delete(n.toString()):this.Ls.add(n.toString())})}xs(e){return 0}Us(e,n){return g.or([()=>g.resolve(this.Fs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ms(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.Si=s,this.Di=r}static Ci(e,n){let s=A(),r=A();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ji(e,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(){this.xi=!1}initialize(e,n){this.Ni=e,this.indexManager=n,this.xi=!0}getDocumentsMatchingQuery(e,n,s,r){return this.ki(e,n).next(i=>i||this.Oi(e,n,r,s)).next(i=>i||this.Mi(e,n))}ki(e,n){if(fa(n))return g.resolve(null);let s=Le(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=ii(n,null,"F"),s=Le(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=A(...i);return this.Ni.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,s).next(c=>{const u=this.Fi(n,a);return this.$i(n,u,o,c.readTime)?this.ki(e,ii(n,null,"F")):this.Bi(e,u,n,c)}))})))}Oi(e,n,s,r){return fa(n)||r.isEqual(C.min())?this.Mi(e,n):this.Ni.getDocuments(e,s).next(i=>{const o=this.Fi(n,i);return this.$i(n,o,s,r)?this.Mi(e,n):(sa()<=O.DEBUG&&E("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),oi(n)),this.Bi(e,o,n,ap(r,-1)))})}Fi(e,n){let s=new z(Du(e));return n.forEach((r,i)=>{Ki(e,i)&&(s=s.add(i))}),s}$i(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Mi(e,n){return sa()<=O.DEBUG&&E("QueryEngine","Using full collection scan to execute query:",oi(n)),this.Ni.getDocumentsMatchingQuery(e,n,We.min())}Bi(e,n,s,r){return this.Ni.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e,n,s,r){this.persistence=e,this.Li=n,this.It=r,this.Ui=new G(P),this.qi=new $t(i=>zi(i),Gi),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(s)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new gg(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ui))}}function kg(t,e,n,s){return new Sg(t,e,n,s)}async function Ju(t,e){const n=k(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.Qi(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let c=A();for(const u of r){o.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}for(const u of i){a.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}return n.localDocuments.getDocuments(s,c).next(u=>({ji:u,removedBatchIds:o,addedBatchIds:a}))})})}function Cg(t,e){const n=k(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.Gi.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const l=c.batch,h=l.keys();let d=g.resolve();return h.forEach(p=>{d=d.next(()=>u.getEntry(a,p)).next(m=>{const w=c.docVersions.get(p);M(w!==null),m.version.compareTo(w)<0&&(l.applyToRemoteDocument(m,c),m.isValidDocument()&&(m.setReadTime(c.commitVersion),u.addEntry(m)))})}),d.next(()=>o.mutationQueue.removeMutationBatch(a,l))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let a=A();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function Zu(t){const e=k(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Cs.getLastRemoteSnapshotVersion(n))}function Ag(t,e){const n=k(t),s=e.snapshotVersion;let r=n.Ui;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Gi.newChangeBuffer({trackRemovals:!0});r=n.Ui;const a=[];e.targetChanges.forEach((l,h)=>{const d=r.get(h);if(!d)return;a.push(n.Cs.removeMatchingKeys(i,l.removedDocuments,h).next(()=>n.Cs.addMatchingKeys(i,l.addedDocuments,h)));let p=d.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.has(h)?p=p.withResumeToken(ie.EMPTY_BYTE_STRING,C.min()).withLastLimboFreeSnapshotVersion(C.min()):l.resumeToken.approximateByteSize()>0&&(p=p.withResumeToken(l.resumeToken,s)),r=r.insert(h,p),function(m,w,y){return m.resumeToken.approximateByteSize()===0||w.snapshotVersion.toMicroseconds()-m.snapshotVersion.toMicroseconds()>=3e8?!0:y.addedDocuments.size+y.modifiedDocuments.size+y.removedDocuments.size>0}(d,p,l)&&a.push(n.Cs.updateTargetData(i,p))});let c=Me(),u=A();if(e.documentUpdates.forEach(l=>{e.resolvedLimboDocuments.has(l)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,l))}),a.push(Rg(i,o,e.documentUpdates).next(l=>{c=l.Wi,u=l.zi})),!s.isEqual(C.min())){const l=n.Cs.getLastRemoteSnapshotVersion(i).next(h=>n.Cs.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(l)}return g.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.Ui=r,i))}function Rg(t,e,n){let s=A(),r=A();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=Me();return n.forEach((a,c)=>{const u=i.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(a)),c.isNoDocument()&&c.version.isEqual(C.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):E("LocalStore","Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{Wi:o,zi:r}})}function Dg(t,e){const n=k(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function Ng(t,e){const n=k(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Cs.getTargetData(s,e).next(i=>i?(r=i,g.resolve(r)):n.Cs.allocateTargetId(s).next(o=>(r=new ct(e,o,0,s.currentSequenceNumber),n.Cs.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.Ui.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ui=n.Ui.insert(s.targetId,s),n.qi.set(e,s.targetId)),s})}async function li(t,e,n){const s=k(t),r=s.Ui.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!Fn(o))throw o;E("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ui=s.Ui.remove(e),s.qi.delete(r.target)}function Ia(t,e,n){const s=k(t);let r=C.min(),i=A();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const l=k(a),h=l.qi.get(u);return h!==void 0?g.resolve(l.Ui.get(h)):l.Cs.getTargetData(c,u)}(s,o,Le(e)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Cs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>s.Li.getDocumentsMatchingQuery(o,e,n?r:C.min(),n?i:A())).next(a=>(Og(s,Cp(e),a),{documents:a,Hi:i})))}function Og(t,e,n){let s=t.Ki.get(e)||C.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Ki.set(e,s)}class Ta{constructor(){this.activeTargetIds=Hu()}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Pg{constructor(){this.Lr=new Ta,this.Ur={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e){return this.Lr.er(e),this.Ur[e]||"not-current"}updateQueryState(e,n,s){this.Ur[e]=n}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.Ur[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new Ta,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{qr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}qr(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){E("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Wr)e(0)}jr(){E("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Wr)e(1)}static C(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.oo=n+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,n,s,r,i){const o=this.ho(e,n);E("RestConnection","Sending: ",o,s);const a={};return this.lo(a,r,i),this.fo(e,o,a,s).then(c=>(E("RestConnection","Received: ",c),c),c=>{throw ti("RestConnection",`${e} failed with error: `,c,"url: ",o,"request:",s),c})}_o(e,n,s,r,i,o){return this.ao(e,n,s,r,i)}lo(e,n,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+Bt,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}ho(e,n){const s=Mg[e];return`${this.oo}/v1/${n}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,n,s,r){return new Promise((i,o)=>{const a=new Yf;a.setWithCredentials(!0),a.listenOnce(Wf.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Nr.NO_ERROR:const u=a.getResponseJson();E("Connection","XHR received:",JSON.stringify(u)),i(u);break;case Nr.TIMEOUT:E("Connection",'RPC "'+e+'" timed out'),o(new v(f.DEADLINE_EXCEEDED,"Request time out"));break;case Nr.HTTP_ERROR:const l=a.getStatus();if(E("Connection",'RPC "'+e+'" failed with status:',l,"response text:",a.getResponseText()),l>0){const h=a.getResponseJson().error;if(h&&h.status&&h.message){const d=function(p){const m=p.toLowerCase().replace(/_/g,"-");return Object.values(f).indexOf(m)>=0?m:f.UNKNOWN}(h.status);o(new v(d,h.message))}else o(new v(f.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new v(f.UNAVAILABLE,"Connection failed."));break;default:S()}}finally{E("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(r);a.send(n,"POST",c,s,15)})}wo(e,n,s){const r=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Gf(),o=Kf(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new Xf({})),this.lo(a.initMessageHeaders,n,s),a.encodeInitMessageHeaders=!0;const c=r.join("");E("Connection","Creating WebChannel: "+c,a);const u=i.createWebChannel(c,a);let l=!1,h=!1;const d=new xg({Hr:m=>{h?E("Connection","Not sending because WebChannel is closed:",m):(l||(E("Connection","Opening WebChannel transport."),u.open(),l=!0),E("Connection","WebChannel sending:",m),u.send(m))},Jr:()=>u.close()}),p=(m,w,y)=>{m.listen(w,N=>{try{y(N)}catch(D){setTimeout(()=>{throw D},0)}})};return p(u,ts.EventType.OPEN,()=>{h||E("Connection","WebChannel transport opened.")}),p(u,ts.EventType.CLOSE,()=>{h||(h=!0,E("Connection","WebChannel transport closed"),d.io())}),p(u,ts.EventType.ERROR,m=>{h||(h=!0,ti("Connection","WebChannel transport errored:",m),d.io(new v(f.UNAVAILABLE,"The operation could not be completed")))}),p(u,ts.EventType.MESSAGE,m=>{var w;if(!h){const y=m.data[0];M(!!y);const N=y,D=N.error||((w=N[0])===null||w===void 0?void 0:w.error);if(D){E("Connection","WebChannel received error:",D);const x=D.status;let L=function(ge){const ke=q[ge];if(ke!==void 0)return Bu(ke)}(x),ue=D.message;L===void 0&&(L=f.INTERNAL,ue="Unknown error status: "+x+" with message "+D.message),h=!0,d.io(new v(L,ue)),u.close()}else E("Connection","WebChannel received:",y),d.ro(y)}}),p(o,Qf.STAT_EVENT,m=>{m.stat===ta.PROXY?E("Connection","Detected buffering proxy"):m.stat===ta.NOPROXY&&E("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.so()},0),d}}function Pr(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(t){return new Gp(t,!0)}class el{constructor(e,n,s=1e3,r=1.5,i=6e4){this.Hs=e,this.timerId=n,this.mo=s,this.yo=r,this.po=i,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();const n=Math.floor(this.Io+this.bo()),s=Math.max(0,Date.now()-this.Eo),r=Math.max(0,n-s);r>0&&E("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Io} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,r,()=>(this.Eo=Date.now(),e())),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){this.To!==null&&(this.To.skipDelay(),this.To=null)}cancel(){this.To!==null&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,n,s,r,i,o,a,c){this.Hs=e,this.vo=s,this.Vo=r,this.So=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Do=0,this.Co=null,this.xo=null,this.stream=null,this.No=new el(e,n)}ko(){return this.state===1||this.state===5||this.Oo()}Oo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Mo()}async stop(){this.ko()&&await this.close(0)}Fo(){this.state=0,this.No.reset()}$o(){this.Oo()&&this.Co===null&&(this.Co=this.Hs.enqueueAfterDelay(this.vo,6e4,()=>this.Bo()))}Lo(e){this.Uo(),this.stream.send(e)}async Bo(){if(this.Oo())return this.close(0)}Uo(){this.Co&&(this.Co.cancel(),this.Co=null)}qo(){this.xo&&(this.xo.cancel(),this.xo=null)}async close(e,n){this.Uo(),this.qo(),this.No.cancel(),this.Do++,e!==4?this.No.reset():n&&n.code===f.RESOURCE_EXHAUSTED?(Pe(n.toString()),Pe("Using maximum backoff delay to prevent overloading the backend."),this.No.Ao()):n&&n.code===f.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Ko(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(n)}Ko(){}auth(){this.state=1;const e=this.Go(this.Do),n=this.Do;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Do===n&&this.Qo(s,r)},s=>{e(()=>{const r=new v(f.UNKNOWN,"Fetching auth token failed: "+s.message);return this.jo(r)})})}Qo(e,n){const s=this.Go(this.Do);this.stream=this.Wo(e,n),this.stream.Yr(()=>{s(()=>(this.state=2,this.xo=this.Hs.enqueueAfterDelay(this.Vo,1e4,()=>(this.Oo()&&(this.state=3),Promise.resolve())),this.listener.Yr()))}),this.stream.Zr(r=>{s(()=>this.jo(r))}),this.stream.onMessage(r=>{s(()=>this.onMessage(r))})}Mo(){this.state=5,this.No.Ro(async()=>{this.state=0,this.start()})}jo(e){return E("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Go(e){return n=>{this.Hs.enqueueAndForget(()=>this.Do===e?n():(E("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Fg extends tl{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.It=i}Wo(e,n){return this.So.wo("Listen",e,n)}onMessage(e){this.No.reset();const n=Qp(this.It,e),s=function(r){if(!("targetChange"in r))return C.min();const i=r.targetChange;return i.targetIds&&i.targetIds.length?C.min():i.readTime?Ne(i.readTime):C.min()}(e);return this.listener.zo(n,s)}Ho(e){const n={};n.database=ui(this.It),n.addTarget=function(r,i){let o;const a=i.target;return o=ri(a)?{documents:Jp(r,a)}:{query:Zp(r,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0?o.resumeToken=Ku(r,i.resumeToken):i.snapshotVersion.compareTo(C.min())>0&&(o.readTime=Ds(r,i.snapshotVersion.toTimestamp())),o}(this.It,e);const s=tg(this.It,e);s&&(n.labels=s),this.Lo(n)}Jo(e){const n={};n.database=ui(this.It),n.removeTarget=e,this.Lo(n)}}class Vg extends tl{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.It=i,this.Yo=!1}get Xo(){return this.Yo}start(){this.Yo=!1,this.lastStreamToken=void 0,super.start()}Ko(){this.Yo&&this.Zo([])}Wo(e,n){return this.So.wo("Write",e,n)}onMessage(e){if(M(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Yo){this.No.reset();const n=Yp(e.writeResults,e.commitTime),s=Ne(e.commitTime);return this.listener.tu(s,n)}return M(!e.writeResults||e.writeResults.length===0),this.Yo=!0,this.listener.eu()}nu(){const e={};e.database=ui(this.It),this.Lo(e)}Zo(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>Xp(this.It,s))};this.Lo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.So=s,this.It=r,this.su=!1}iu(){if(this.su)throw new v(f.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,n,s){return this.iu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.So.ao(e,n,s,r,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new v(f.UNKNOWN,r.toString())})}_o(e,n,s,r){return this.iu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.So._o(e,n,s,i,o,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new v(f.UNKNOWN,i.toString())})}terminate(){this.su=!0}}class $g{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.ru=0,this.ou=null,this.uu=!0}cu(){this.ru===0&&(this.au("Unknown"),this.ou=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ou=null,this.hu("Backend didn't respond within 10 seconds."),this.au("Offline"),Promise.resolve())))}lu(e){this.state==="Online"?this.au("Unknown"):(this.ru++,this.ru>=1&&(this.fu(),this.hu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.au("Offline")))}set(e){this.fu(),this.ru=0,e==="Online"&&(this.uu=!1),this.au(e)}au(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}hu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.uu?(Pe(n),this.uu=!1):E("OnlineStateTracker",n)}fu(){this.ou!==null&&(this.ou.cancel(),this.ou=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.du=[],this._u=new Map,this.wu=new Set,this.mu=[],this.gu=i,this.gu.qr(o=>{s.enqueueAndForget(async()=>{wt(this)&&(E("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=k(a);c.wu.add(4),await qn(c),c.yu.set("Unknown"),c.wu.delete(4),await cr(c)}(this))})}),this.yu=new $g(s,r)}}async function cr(t){if(wt(t))for(const e of t.mu)await e(!0)}async function qn(t){for(const e of t.mu)await e(!1)}function nl(t,e){const n=k(t);n._u.has(e.targetId)||(n._u.set(e.targetId,e),to(n)?eo(n):qt(n).Oo()&&Zi(n,e))}function sl(t,e){const n=k(t),s=qt(n);n._u.delete(e),s.Oo()&&rl(n,e),n._u.size===0&&(s.Oo()?s.$o():wt(n)&&n.yu.set("Unknown"))}function Zi(t,e){t.pu.Mt(e.targetId),qt(t).Ho(e)}function rl(t,e){t.pu.Mt(e),qt(t).Jo(e)}function eo(t){t.pu=new jp({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),se:e=>t._u.get(e)||null}),qt(t).start(),t.yu.cu()}function to(t){return wt(t)&&!qt(t).ko()&&t._u.size>0}function wt(t){return k(t).wu.size===0}function il(t){t.pu=void 0}async function jg(t){t._u.forEach((e,n)=>{Zi(t,e)})}async function Hg(t,e){il(t),to(t)?(t.yu.lu(e),eo(t)):t.yu.set("Unknown")}async function zg(t,e,n){if(t.yu.set("Online"),e instanceof Gu&&e.state===2&&e.cause)try{await async function(s,r){const i=r.cause;for(const o of r.targetIds)s._u.has(o)&&(await s.remoteSyncer.rejectListen(o,i),s._u.delete(o),s.pu.removeTarget(o))}(t,e)}catch(s){E("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Ns(t,s)}else if(e instanceof us?t.pu.Gt(e):e instanceof zu?t.pu.Yt(e):t.pu.Wt(e),!n.isEqual(C.min()))try{const s=await Zu(t.localStore);n.compareTo(s)>=0&&await function(r,i){const o=r.pu.te(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=r._u.get(c);u&&r._u.set(c,u.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach(a=>{const c=r._u.get(a);if(!c)return;r._u.set(a,c.withResumeToken(ie.EMPTY_BYTE_STRING,c.snapshotVersion)),rl(r,a);const u=new ct(c.target,a,1,c.sequenceNumber);Zi(r,u)}),r.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(s){E("RemoteStore","Failed to raise snapshot:",s),await Ns(t,s)}}async function Ns(t,e,n){if(!Fn(e))throw e;t.wu.add(1),await qn(t),t.yu.set("Offline"),n||(n=()=>Zu(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{E("RemoteStore","Retrying IndexedDB access"),await n(),t.wu.delete(1),await cr(t)})}function ol(t,e){return e().catch(n=>Ns(t,n,e))}async function ur(t){const e=k(t),n=Xe(e);let s=e.du.length>0?e.du[e.du.length-1].batchId:-1;for(;Gg(e);)try{const r=await Dg(e.localStore,s);if(r===null){e.du.length===0&&n.$o();break}s=r.batchId,Kg(e,r)}catch(r){await Ns(e,r)}al(e)&&cl(e)}function Gg(t){return wt(t)&&t.du.length<10}function Kg(t,e){t.du.push(e);const n=Xe(t);n.Oo()&&n.Xo&&n.Zo(e.mutations)}function al(t){return wt(t)&&!Xe(t).ko()&&t.du.length>0}function cl(t){Xe(t).start()}async function Wg(t){Xe(t).nu()}async function Qg(t){const e=Xe(t);for(const n of t.du)e.Zo(n.mutations)}async function Xg(t,e,n){const s=t.du.shift(),r=Qi.from(s,e,n);await ol(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await ur(t)}async function Yg(t,e){e&&Xe(t).Xo&&await async function(n,s){if(r=s.code,Fp(r)&&r!==f.ABORTED){const i=n.du.shift();Xe(n).Fo(),await ol(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ur(n)}var r}(t,e),al(t)&&cl(t)}async function Sa(t,e){const n=k(t);n.asyncQueue.verifyOperationInProgress(),E("RemoteStore","RemoteStore received new credentials");const s=wt(n);n.wu.add(3),await qn(n),s&&n.yu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.wu.delete(3),await cr(n)}async function Jg(t,e){const n=k(t);e?(n.wu.delete(2),await cr(n)):e||(n.wu.add(2),await qn(n),n.yu.set("Unknown"))}function qt(t){return t.Iu||(t.Iu=function(e,n,s){const r=k(e);return r.iu(),new Fg(n,r.So,r.authCredentials,r.appCheckCredentials,r.It,s)}(t.datastore,t.asyncQueue,{Yr:jg.bind(null,t),Zr:Hg.bind(null,t),zo:zg.bind(null,t)}),t.mu.push(async e=>{e?(t.Iu.Fo(),to(t)?eo(t):t.yu.set("Unknown")):(await t.Iu.stop(),il(t))})),t.Iu}function Xe(t){return t.Tu||(t.Tu=function(e,n,s){const r=k(e);return r.iu(),new Vg(n,r.So,r.authCredentials,r.appCheckCredentials,r.It,s)}(t.datastore,t.asyncQueue,{Yr:Wg.bind(null,t),Zr:Yg.bind(null,t),eu:Qg.bind(null,t),tu:Xg.bind(null,t)}),t.mu.push(async e=>{e?(t.Tu.Fo(),await ur(t)):(await t.Tu.stop(),t.du.length>0&&(E("RemoteStore",`Stopping write stream with ${t.du.length} pending writes`),t.du=[]))})),t.Tu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new De,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,a=new no(e,n,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new v(f.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function so(t,e){if(Pe("AsyncQueue",`${e}: ${t}`),Fn(t))return new v(f.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.comparator=e?(n,s)=>e(n,s)||I.comparator(n.key,s.key):(n,s)=>I.comparator(n.key,s.key),this.keyedMap=en(),this.sortedSet=new G(this.comparator)}static emptySet(e){return new Ct(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ct)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Ct;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(){this.Eu=new G(I.comparator)}track(e){const n=e.doc.key,s=this.Eu.get(n);s?e.type!==0&&s.type===3?this.Eu=this.Eu.insert(n,e):e.type===3&&s.type!==1?this.Eu=this.Eu.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.Eu=this.Eu.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.Eu=this.Eu.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.Eu=this.Eu.remove(n):e.type===1&&s.type===2?this.Eu=this.Eu.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.Eu=this.Eu.insert(n,{type:2,doc:e.doc}):S():this.Eu=this.Eu.insert(n,e)}Au(){const e=[];return this.Eu.inorderTraversal((n,s)=>{e.push(s)}),e}}class Mt{constructor(e,n,s,r,i,o,a,c,u){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Mt(e,n,Ct.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&sr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(){this.Ru=void 0,this.listeners=[]}}class em{constructor(){this.queries=new $t(e=>Ru(e),sr),this.onlineState="Unknown",this.bu=new Set}}async function ro(t,e){const n=k(t),s=e.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new Zg),r)try{i.Ru=await n.onListen(s)}catch(o){const a=so(o,`Initialization of query '${oi(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.listeners.push(e),e.Pu(n.onlineState),i.Ru&&e.vu(i.Ru)&&oo(n)}async function io(t,e){const n=k(t),s=e.query;let r=!1;const i=n.queries.get(s);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),r=i.listeners.length===0)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function tm(t,e){const n=k(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.vu(r)&&(s=!0);o.Ru=r}}s&&oo(n)}function nm(t,e,n){const s=k(t),r=s.queries.get(e);if(r)for(const i of r.listeners)i.onError(n);s.queries.delete(e)}function oo(t){t.bu.forEach(e=>{e.next()})}class ao{constructor(e,n,s){this.query=e,this.Vu=n,this.Su=!1,this.Du=null,this.onlineState="Unknown",this.options=s||{}}vu(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new Mt(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Su?this.Cu(e)&&(this.Vu.next(e),n=!0):this.xu(e,this.onlineState)&&(this.Nu(e),n=!0),this.Du=e,n}onError(e){this.Vu.error(e)}Pu(e){this.onlineState=e;let n=!1;return this.Du&&!this.Su&&this.xu(this.Du,e)&&(this.Nu(this.Du),n=!0),n}xu(e,n){if(!e.fromCache)return!0;const s=n!=="Offline";return(!this.options.ku||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Cu(e){if(e.docChanges.length>0)return!0;const n=this.Du&&this.Du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Nu(e){e=Mt.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Su=!0,this.Vu.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e){this.key=e}}class ll{constructor(e){this.key=e}}class sm{constructor(e,n){this.query=e,this.Uu=n,this.qu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=A(),this.mutatedKeys=A(),this.Gu=Du(e),this.Qu=new Ct(this.Gu)}get ju(){return this.Uu}Wu(e,n){const s=n?n.zu:new ka,r=n?n.Qu:this.Qu;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,u=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((l,h)=>{const d=r.get(l),p=Ki(this.query,h)?h:null,m=!!d&&this.mutatedKeys.has(d.key),w=!!p&&(p.hasLocalMutations||this.mutatedKeys.has(p.key)&&p.hasCommittedMutations);let y=!1;d&&p?d.data.isEqual(p.data)?m!==w&&(s.track({type:3,doc:p}),y=!0):this.Hu(d,p)||(s.track({type:2,doc:p}),y=!0,(c&&this.Gu(p,c)>0||u&&this.Gu(p,u)<0)&&(a=!0)):!d&&p?(s.track({type:0,doc:p}),y=!0):d&&!p&&(s.track({type:1,doc:d}),y=!0,(c||u)&&(a=!0)),y&&(p?(o=o.add(p),i=w?i.add(l):i.delete(l)):(o=o.delete(l),i=i.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),i=i.delete(l.key),s.track({type:1,doc:l})}return{Qu:o,zu:s,$i:a,mutatedKeys:i}}Hu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s){const r=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;const i=e.zu.Au();i.sort((u,l)=>function(h,d){const p=m=>{switch(m){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return S()}};return p(h)-p(d)}(u.type,l.type)||this.Gu(u.doc,l.doc)),this.Ju(s);const o=n?this.Yu():[],a=this.Ku.size===0&&this.current?1:0,c=a!==this.qu;return this.qu=a,i.length!==0||c?{snapshot:new Mt(this.query,e.Qu,r,i,e.mutatedKeys,a===0,c,!1,!!s&&s.resumeToken.approximateByteSize()>0),Xu:o}:{Xu:o}}Pu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new ka,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.Uu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach(n=>this.Uu=this.Uu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Uu=this.Uu.delete(n)),this.current=e.current)}Yu(){if(!this.current)return[];const e=this.Ku;this.Ku=A(),this.Qu.forEach(s=>{this.Zu(s.key)&&(this.Ku=this.Ku.add(s.key))});const n=[];return e.forEach(s=>{this.Ku.has(s)||n.push(new ll(s))}),this.Ku.forEach(s=>{e.has(s)||n.push(new ul(s))}),n}tc(e){this.Uu=e.Hi,this.Ku=A();const n=this.Wu(e.documents);return this.applyChanges(n,!0)}ec(){return Mt.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,this.qu===0,this.hasCachedResults)}}class rm{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class im{constructor(e){this.key=e,this.nc=!1}}class om{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.sc={},this.ic=new $t(a=>Ru(a),sr),this.rc=new Map,this.oc=new Set,this.uc=new G(I.comparator),this.cc=new Map,this.ac=new Xi,this.hc={},this.lc=new Map,this.fc=Lt.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return this.dc===!0}}async function am(t,e){const n=ym(t);let s,r;const i=n.ic.get(e);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.ec();else{const o=await Ng(n.localStore,Le(e));n.isPrimaryClient&&nl(n.remoteStore,o);const a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,r=await cm(n,e,s,a==="current",o.resumeToken)}return r}async function cm(t,e,n,s,r){t._c=(h,d,p)=>async function(m,w,y,N){let D=w.view.Wu(y);D.$i&&(D=await Ia(m.localStore,w.query,!1).then(({documents:ue})=>w.view.Wu(ue,D)));const x=N&&N.targetChanges.get(w.targetId),L=w.view.applyChanges(D,m.isPrimaryClient,x);return Aa(m,w.targetId,L.Xu),L.snapshot}(t,h,d,p);const i=await Ia(t.localStore,e,!0),o=new sm(e,i.Hi),a=o.Wu(i.documents),c=$n.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),u=o.applyChanges(a,t.isPrimaryClient,c);Aa(t,n,u.Xu);const l=new rm(e,n,o);return t.ic.set(e,l),t.rc.has(n)?t.rc.get(n).push(e):t.rc.set(n,[e]),u.snapshot}async function um(t,e){const n=k(t),s=n.ic.get(e),r=n.rc.get(s.targetId);if(r.length>1)return n.rc.set(s.targetId,r.filter(i=>!sr(i,e))),void n.ic.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await li(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),sl(n.remoteStore,s.targetId),hi(n,s.targetId)}).catch(Un)):(hi(n,s.targetId),await li(n.localStore,s.targetId,!0))}async function lm(t,e,n){const s=vm(t);try{const r=await function(i,o){const a=k(i),c=H.now(),u=o.reduce((d,p)=>d.add(p.key),A());let l,h;return a.persistence.runTransaction("Locally write mutations","readwrite",d=>{let p=Me(),m=A();return a.Gi.getEntries(d,u).next(w=>{p=w,p.forEach((y,N)=>{N.isValidDocument()||(m=m.add(y))})}).next(()=>a.localDocuments.getOverlayedDocuments(d,p)).next(w=>{l=w;const y=[];for(const N of o){const D=Mp(N,l.get(N.key).overlayedDocument);D!=null&&y.push(new et(N.key,D,bu(D.value.mapValue),ye.exists(!0)))}return a.mutationQueue.addMutationBatch(d,c,y,o)}).next(w=>{h=w;const y=w.applyToLocalDocumentSet(l,m);return a.documentOverlayCache.saveOverlays(d,w.batchId,y)})}).then(()=>({batchId:h.batchId,changes:qu(l)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(i,o,a){let c=i.hc[i.currentUser.toKey()];c||(c=new G(P)),c=c.insert(o,a),i.hc[i.currentUser.toKey()]=c}(s,r.batchId,n),await jn(s,r.changes),await ur(s.remoteStore)}catch(r){const i=so(r,"Failed to persist write");n.reject(i)}}async function hl(t,e){const n=k(t);try{const s=await Ag(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.cc.get(i);o&&(M(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.nc=!0:r.modifiedDocuments.size>0?M(o.nc):r.removedDocuments.size>0&&(M(o.nc),o.nc=!1))}),await jn(n,s,e)}catch(s){await Un(s)}}function Ca(t,e,n){const s=k(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.ic.forEach((i,o)=>{const a=o.view.Pu(e);a.snapshot&&r.push(a.snapshot)}),function(i,o){const a=k(i);a.onlineState=o;let c=!1;a.queries.forEach((u,l)=>{for(const h of l.listeners)h.Pu(o)&&(c=!0)}),c&&oo(a)}(s.eventManager,e),r.length&&s.sc.zo(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function hm(t,e,n){const s=k(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.cc.get(e),i=r&&r.key;if(i){let o=new G(I.comparator);o=o.insert(i,X.newNoDocument(i,C.min()));const a=A().add(i),c=new or(C.min(),new Map,new z(P),o,a);await hl(s,c),s.uc=s.uc.remove(i),s.cc.delete(e),co(s)}else await li(s.localStore,e,!1).then(()=>hi(s,e,n)).catch(Un)}async function dm(t,e){const n=k(t),s=e.batch.batchId;try{const r=await Cg(n.localStore,e);fl(n,s,null),dl(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await jn(n,r)}catch(r){await Un(r)}}async function fm(t,e,n){const s=k(t);try{const r=await function(i,o){const a=k(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.mutationQueue.lookupMutationBatch(c,o).next(l=>(M(l!==null),u=l.keys(),a.mutationQueue.removeMutationBatch(c,l))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,u,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>a.localDocuments.getDocuments(c,u))})}(s.localStore,e);fl(s,e,n),dl(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await jn(s,r)}catch(r){await Un(r)}}function dl(t,e){(t.lc.get(e)||[]).forEach(n=>{n.resolve()}),t.lc.delete(e)}function fl(t,e,n){const s=k(t);let r=s.hc[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.hc[s.currentUser.toKey()]=r}}function hi(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.rc.get(e))t.ic.delete(s),n&&t.sc.wc(s,n);t.rc.delete(e),t.isPrimaryClient&&t.ac.ls(e).forEach(s=>{t.ac.containsKey(s)||pl(t,s)})}function pl(t,e){t.oc.delete(e.path.canonicalString());const n=t.uc.get(e);n!==null&&(sl(t.remoteStore,n),t.uc=t.uc.remove(e),t.cc.delete(n),co(t))}function Aa(t,e,n){for(const s of n)s instanceof ul?(t.ac.addReference(s.key,e),pm(t,s)):s instanceof ll?(E("SyncEngine","Document no longer in limbo: "+s.key),t.ac.removeReference(s.key,e),t.ac.containsKey(s.key)||pl(t,s.key)):S()}function pm(t,e){const n=e.key,s=n.path.canonicalString();t.uc.get(n)||t.oc.has(s)||(E("SyncEngine","New document in limbo: "+n),t.oc.add(s),co(t))}function co(t){for(;t.oc.size>0&&t.uc.size<t.maxConcurrentLimboResolutions;){const e=t.oc.values().next().value;t.oc.delete(e);const n=new I(U.fromString(e)),s=t.fc.next();t.cc.set(s,new im(n)),t.uc=t.uc.insert(n,s),nl(t.remoteStore,new ct(Le(nr(n.path)),s,2,ji.at))}}async function jn(t,e,n){const s=k(t),r=[],i=[],o=[];s.ic.isEmpty()||(s.ic.forEach((a,c)=>{o.push(s._c(c,e,n).then(u=>{if((u||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(c.targetId,u!=null&&u.fromCache?"not-current":"current"),u){r.push(u);const l=Ji.Ci(c.targetId,u);i.push(l)}}))}),await Promise.all(o),s.sc.zo(r),await async function(a,c){const u=k(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>g.forEach(c,h=>g.forEach(h.Si,d=>u.persistence.referenceDelegate.addReference(l,h.targetId,d)).next(()=>g.forEach(h.Di,d=>u.persistence.referenceDelegate.removeReference(l,h.targetId,d)))))}catch(l){if(!Fn(l))throw l;E("LocalStore","Failed to update sequence numbers: "+l)}for(const l of c){const h=l.targetId;if(!l.fromCache){const d=u.Ui.get(h),p=d.snapshotVersion,m=d.withLastLimboFreeSnapshotVersion(p);u.Ui=u.Ui.insert(h,m)}}}(s.localStore,i))}async function gm(t,e){const n=k(t);if(!n.currentUser.isEqual(e)){E("SyncEngine","User change. New user:",e.toKey());const s=await Ju(n.localStore,e);n.currentUser=e,function(r,i){r.lc.forEach(o=>{o.forEach(a=>{a.reject(new v(f.CANCELLED,i))})}),r.lc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await jn(n,s.ji)}}function mm(t,e){const n=k(t),s=n.cc.get(e);if(s&&s.nc)return A().add(s.key);{let r=A();const i=n.rc.get(e);if(!i)return r;for(const o of i){const a=n.ic.get(o);r=r.unionWith(a.view.ju)}return r}}function ym(t){const e=k(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=hl.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=mm.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=hm.bind(null,e),e.sc.zo=tm.bind(null,e.eventManager),e.sc.wc=nm.bind(null,e.eventManager),e}function vm(t){const e=k(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=dm.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=fm.bind(null,e),e}class _m{constructor(){this.synchronizeTabs=!1}async initialize(e){this.It=ar(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,n){return null}Ec(e,n){return null}Ic(e){return kg(this.persistence,new bg,e.initialUser,this.It)}yc(e){return new Ig(Yi.Bs,this.It)}gc(e){return new Pg}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class wm{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Ca(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=gm.bind(null,this.syncEngine),await Jg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new em}createDatastore(e){const n=ar(e.databaseInfo.databaseId),s=(r=e.databaseInfo,new Ug(r));var r;return function(i,o,a,c){return new Bg(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return n=this.localStore,s=this.datastore,r=e.asyncQueue,i=a=>Ca(this.syncEngine,a,0),o=ba.C()?new ba:new Lg,new qg(n,s,r,i,o);var n,s,r,i,o}createSyncEngine(e,n){return function(s,r,i,o,a,c,u){const l=new om(s,r,i,o,a,c);return u&&(l.dc=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=k(e);E("RemoteStore","RemoteStore shutting down."),n.wu.add(5),await qn(n),n.gu.shutdown(),n.yu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gl(t,e,n){if(!n)throw new v(f.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Em(t,e,n,s){if(e===!0&&s===!0)throw new v(f.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Ra(t){if(!I.isDocumentKey(t))throw new v(f.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Da(t){if(I.isDocumentKey(t))throw new v(f.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function lr(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":S()}function fe(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new v(f.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=lr(t);throw new v(f.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na=new Map;class Oa{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new v(f.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new v(f.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,Em("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oa({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new v(f.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new v(f.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oa(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Jf;switch(n.type){case"gapi":const s=n.client;return new np(s,n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new v(f.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Na.get(e);n&&(E("ComponentProvider","Removing Datastore"),Na.delete(e),n.terminate())}(this),Promise.resolve()}}function Im(t,e,n,s={}){var r;const i=(t=fe(t,hr))._getSettings();if(i.host!=="firestore.googleapis.com"&&i.host!==e&&ti("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},i),{host:`${e}:${n}`,ssl:!1})),s.mockUserToken){let o,a;if(typeof s.mockUserToken=="string")o=s.mockUserToken,a=Z.MOCK_USER;else{o=hc(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const c=s.mockUserToken.sub||s.mockUserToken.user_id;if(!c)throw new v(f.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new Z(c)}t._authCredentials=new Zf(new _u(o,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ze(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}}class jt{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new jt(this.firestore,e,this._query)}}class ze extends jt{constructor(e,n,s){super(e,n,nr(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new I(e))}withConverter(e){return new ze(this.firestore,e,this._path)}}function uw(t,e,...n){if(t=V(t),gl("collection","path",e),t instanceof hr){const s=U.fromString(e,...n);return Da(s),new ze(t,null,s)}{if(!(t instanceof se||t instanceof ze))throw new v(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(U.fromString(e,...n));return Da(s),new ze(t.firestore,null,s)}}function Tm(t,e,...n){if(t=V(t),arguments.length===1&&(e=wu.R()),gl("doc","path",e),t instanceof hr){const s=U.fromString(e,...n);return Ra(s),new se(t,null,new I(s))}{if(!(t instanceof se||t instanceof ze))throw new v(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(U.fromString(e,...n));return Ra(s),new se(t.firestore,t instanceof ze?t.converter:null,new I(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):Pe("Uncaught Error in snapshot listener:",e)}bc(){this.muted=!0}Rc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,n,s,r){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=Z.UNAUTHENTICATED,this.clientId=wu.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async i=>{E("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(s,i=>(E("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new v(f.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new De;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=so(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Sm(t,e){t.asyncQueue.verifyOperationInProgress(),E("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Ju(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t.offlineComponents=e}async function km(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Cm(t);E("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener(r=>Sa(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>Sa(e.remoteStore,i)),t.onlineComponents=e}async function Cm(t){return t.offlineComponents||(E("FirestoreClient","Using default OfflineComponentProvider"),await Sm(t,new _m)),t.offlineComponents}async function ml(t){return t.onlineComponents||(E("FirestoreClient","Using default OnlineComponentProvider"),await km(t,new wm)),t.onlineComponents}function Am(t){return ml(t).then(e=>e.syncEngine)}async function Os(t){const e=await ml(t),n=e.eventManager;return n.onListen=am.bind(null,e.syncEngine),n.onUnlisten=um.bind(null,e.syncEngine),n}function Rm(t,e,n={}){const s=new De;return t.asyncQueue.enqueueAndForget(async()=>function(r,i,o,a,c){const u=new uo({next:h=>{i.enqueueAndForget(()=>io(r,l));const d=h.docs.has(o);!d&&h.fromCache?c.reject(new v(f.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?c.reject(new v(f.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new ao(nr(o.path),u,{includeMetadataChanges:!0,ku:!0});return ro(r,l)}(await Os(t),t.asyncQueue,e,n,s)),s.promise}function Dm(t,e,n={}){const s=new De;return t.asyncQueue.enqueueAndForget(async()=>function(r,i,o,a,c){const u=new uo({next:h=>{i.enqueueAndForget(()=>io(r,l)),h.fromCache&&a.source==="server"?c.reject(new v(f.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new ao(o,u,{includeMetadataChanges:!0,ku:!0});return ro(r,l)}(await Os(t),t.asyncQueue,e,n,s)),s.promise}class Nm{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.Uc=!1,this.qc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.No=new el(this,"async_queue_retry"),this.Wc=()=>{const n=Pr();n&&E("AsyncQueue","Visibility state changed to "+n.visibilityState),this.No.Po()};const e=Pr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.Uc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.Uc){this.Uc=!0,this.Qc=e||!1;const n=Pr();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.Uc)return new Promise(()=>{});const n=new De;return this.Hc(()=>this.Uc&&this.Qc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Lc.push(e),this.Jc()))}async Jc(){if(this.Lc.length!==0){try{await this.Lc[0](),this.Lc.shift(),this.No.reset()}catch(e){if(!Fn(e))throw e;E("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.No.Ro(()=>this.Jc())}}Hc(e){const n=this.Bc.then(()=>(this.Gc=!0,e().catch(s=>{this.Kc=s,this.Gc=!1;const r=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(s);throw Pe("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.Gc=!1,s))));return this.Bc=n,n}enqueueAfterDelay(e,n,s){this.zc(),this.jc.indexOf(e)>-1&&(n=0);const r=no.createAndSchedule(this,e,n,s,i=>this.Yc(i));return this.qc.push(r),r}zc(){this.Kc&&S()}verifyOperationInProgress(){}async Xc(){let e;do e=this.Bc,await e;while(e!==this.Bc)}Zc(e){for(const n of this.qc)if(n.timerId===e)return!0;return!1}ta(e){return this.Xc().then(()=>{this.qc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.qc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Xc()})}ea(e){this.jc.push(e)}Yc(e){const n=this.qc.indexOf(e);this.qc.splice(n,1)}}function Pa(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const r of n)if(r in s&&typeof s[r]=="function")return!0;return!1}(t,["next","error","complete"])}class Ye extends hr{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new Nm,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||yl(this),this._firestoreClient.terminate()}}function lw(t,e){const n=typeof t=="object"?t:wi(),s=typeof t=="string"?t:e||"(default)",r=Vs(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=uc("firestore");i&&Im(r,...i)}return r}function dr(t){return t._firestoreClient||yl(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function yl(t){var e;const n=t._freezeSettings(),s=function(r,i,o,a){return new fp(r,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new bm(t._authCredentials,t._appCheckCredentials,t._queue,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new xt(ie.fromBase64String(e))}catch(n){throw new v(f.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new xt(ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new v(f.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ee(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new v(f.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new v(f.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return P(this._lat,e._lat)||P(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om=/^__.*__$/;class Pm{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new et(e,this.data,this.fieldMask,n,this.fieldTransforms):new Bn(e,this.data,n,this.fieldTransforms)}}class vl{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new et(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function _l(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw S()}}class fo{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.It=s,this.ignoreUndefinedProperties=r,i===void 0&&this.na(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new fo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.It,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.ia({path:s,oa:!1});return r.ua(e),r}ca(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.ia({path:s,oa:!1});return r.na(),r}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return Ps(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(e.length===0)throw this.ha("Document fields must not be empty");if(_l(this.sa)&&Om.test(e))throw this.ha('Document fields cannot begin and end with "__"')}}class Lm{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.It=s||ar(e)}da(e,n,s,r=!1){return new fo({sa:e,methodName:n,fa:s,path:ee.emptyPath(),oa:!1,la:r},this.databaseId,this.It,this.ignoreUndefinedProperties)}}function pr(t){const e=t._freezeSettings(),n=ar(t._databaseId);return new Lm(t._databaseId,!!e.ignoreUndefinedProperties,n)}function wl(t,e,n,s,r,i={}){const o=t.da(i.merge||i.mergeFields?2:0,e,n,r);po("Data must be an object, but it was:",o,s);const a=El(s,o);let c,u;if(i.merge)c=new me(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const l=[];for(const h of i.mergeFields){const d=di(e,h,n);if(!o.contains(d))throw new v(f.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);Tl(l,d)||l.push(d)}c=new me(l),u=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,u=o.fieldTransforms;return new Pm(new he(a),c,u)}class gr extends lo{_toFieldTransform(e){if(e.sa!==2)throw e.sa===1?e.ha(`${this._methodName}() can only appear at the top level of your update data`):e.ha(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof gr}}function Mm(t,e,n,s){const r=t.da(1,e,n);po("Data must be an object, but it was:",r,s);const i=[],o=he.empty();_t(s,(c,u)=>{const l=go(e,c,n);u=V(u);const h=r.ca(l);if(u instanceof gr)i.push(l);else{const d=Hn(u,h);d!=null&&(i.push(l),o.set(l,d))}});const a=new me(i);return new vl(o,a,r.fieldTransforms)}function xm(t,e,n,s,r,i){const o=t.da(1,e,n),a=[di(e,s,n)],c=[r];if(i.length%2!=0)throw new v(f.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(di(e,i[d])),c.push(i[d+1]);const u=[],l=he.empty();for(let d=a.length-1;d>=0;--d)if(!Tl(u,a[d])){const p=a[d];let m=c[d];m=V(m);const w=o.ca(p);if(m instanceof gr)u.push(p);else{const y=Hn(m,w);y!=null&&(u.push(p),l.set(p,y))}}const h=new me(u);return new vl(l,h,o.fieldTransforms)}function Um(t,e,n,s=!1){return Hn(n,t.da(s?4:3,e))}function Hn(t,e){if(Il(t=V(t)))return po("Unsupported field value:",e,t),El(t,e);if(t instanceof lo)return function(n,s){if(!_l(s.sa))throw s.ha(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.ha(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.oa&&e.sa!==4)throw e.ha("Nested arrays are not supported");return function(n,s){const r=[];let i=0;for(const o of n){let a=Hn(o,s.aa(i));a==null&&(a={nullValue:"NULL_VALUE"}),r.push(a),i++}return{arrayValue:{values:r}}}(t,e)}return function(n,s){if((n=V(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Rp(s.It,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=H.fromDate(n);return{timestampValue:Ds(s.It,r)}}if(n instanceof H){const r=new H(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Ds(s.It,r)}}if(n instanceof ho)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof xt)return{bytesValue:Ku(s.It,n._byteString)};if(n instanceof se){const r=s.databaseId,i=n.firestore._databaseId;if(!i.isEqual(r))throw s.ha(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Wi(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s.ha(`Unsupported field value: ${lr(n)}`)}(t,e)}function El(t,e){const n={};return Eu(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):_t(t,(s,r)=>{const i=Hn(r,e.ra(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function Il(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof H||t instanceof ho||t instanceof xt||t instanceof se||t instanceof lo)}function po(t,e,n){if(!Il(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=lr(n);throw s==="an object"?e.ha(t+" a custom object"):e.ha(t+" "+s)}}function di(t,e,n){if((e=V(e))instanceof fr)return e._internalPath;if(typeof e=="string")return go(t,e);throw Ps("Field path arguments must be of type string or ",t,!1,void 0,n)}const Fm=new RegExp("[~\\*/\\[\\]]");function go(t,e,n){if(e.search(Fm)>=0)throw Ps(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new fr(...e.split("."))._internalPath}catch{throw Ps(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ps(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new v(f.INVALID_ARGUMENT,a+t+c)}function Tl(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Vm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(mo("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Vm extends bl{data(){return super.data()}}function mo(t,e){return typeof e=="string"?go(t,e):e instanceof fr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new v(f.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Bm{}function hw(t,...e){for(const n of e)t=n._apply(t);return t}class $m extends Bm{constructor(e,n,s){super(),this.ma=e,this.ga=n,this.ya=s,this.type="where"}_apply(e){const n=pr(e.firestore),s=function(r,i,o,a,c,u,l){let h;if(c.isKeyField()){if(u==="array-contains"||u==="array-contains-any")throw new v(f.INVALID_ARGUMENT,`Invalid Query. You can't perform '${u}' queries on documentId().`);if(u==="in"||u==="not-in"){Ma(l,u);const p=[];for(const m of l)p.push(La(a,r,m));h={arrayValue:{values:p}}}else h=La(a,r,l)}else u!=="in"&&u!=="not-in"&&u!=="array-contains-any"||Ma(l,u),h=Um(o,i,l,u==="in"||u==="not-in");const d=ce.create(c,u,h);return function(p,m){if(m.dt()){const y=Cu(p);if(y!==null&&!y.isEqual(m.field))throw new v(f.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${y.toString()}' and '${m.field.toString()}'`);const N=ku(p);N!==null&&qm(p,m.field,N)}const w=function(y,N){for(const D of y.filters)if(N.indexOf(D.op)>=0)return D.op;return null}(p,function(y){switch(y){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(m.op));if(w!==null)throw w===m.op?new v(f.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${m.op.toString()}' filter.`):new v(f.INVALID_ARGUMENT,`Invalid query. You cannot use '${m.op.toString()}' filters with '${w.toString()}' filters.`)}(r,d),d}(e._query,"where",n,e.firestore._databaseId,this.ma,this.ga,this.ya);return new jt(e.firestore,e.converter,function(r,i){const o=r.filters.concat([i]);return new Vn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),o,r.limit,r.limitType,r.startAt,r.endAt)}(e._query,s))}}function dw(t,e,n){const s=e,r=mo("where",t);return new $m(r,s,n)}function La(t,e,n){if(typeof(n=V(n))=="string"){if(n==="")throw new v(f.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Au(e)&&n.indexOf("/")!==-1)throw new v(f.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=e.path.child(U.fromString(n));if(!I.isDocumentKey(s))throw new v(f.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return aa(t,new I(s))}if(n instanceof se)return aa(t,n._key);throw new v(f.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${lr(n)}.`)}function Ma(t,e){if(!Array.isArray(t)||t.length===0)throw new v(f.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new v(f.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function qm(t,e,n){if(!n.isEqual(e))throw new v(f.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{convertValue(e,n="none"){switch(pt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return j(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Ot(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw S()}}convertObject(e,n){const s={};return _t(e.fields,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertGeoPoint(e){return new ho(j(e.latitude),j(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=Tu(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(yn(e));default:return null}}convertTimestamp(e){const n=Qe(e);return new H(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=U.fromString(e);M(Yu(s));const r=new vn(s.get(1),s.get(3)),i=new I(s.popFirst(5));return r.isEqual(n)||Pe(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Cl extends bl{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new ls(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(mo("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class ls extends Cl{data(e={}){return super.data(e)}}class Al{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new tn(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new ls(this._firestore,this._userDataWriter,s.key,s,new tn(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new v(f.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let i=0;return s._snapshot.docChanges.map(o=>({type:"added",doc:new ls(s._firestore,s._userDataWriter,o.doc.key,o.doc,new tn(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter),oldIndex:-1,newIndex:i++}))}{let i=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(o=>r||o.type!==3).map(o=>{const a=new ls(s._firestore,s._userDataWriter,o.doc.key,o.doc,new tn(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,u=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),u=i.indexOf(o.doc.key)),{type:Hm(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function Hm(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return S()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fw(t){t=fe(t,se);const e=fe(t.firestore,Ye);return Rm(dr(e),t._key).then(n=>Rl(e,t,n))}class yo extends jm{constructor(e){super(),this.firestore=e}convertBytes(e){return new xt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,n)}}function pw(t){t=fe(t,jt);const e=fe(t.firestore,Ye),n=dr(e),s=new yo(e);return Sl(t._query),Dm(n,t._query).then(r=>new Al(e,s,t,r))}function gw(t,e,n){t=fe(t,se);const s=fe(t.firestore,Ye),r=kl(t.converter,e,n);return vo(s,[wl(pr(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,ye.none())])}function mw(t,e,n,...s){t=fe(t,se);const r=fe(t.firestore,Ye),i=pr(r);let o;return o=typeof(e=V(e))=="string"||e instanceof fr?xm(i,"updateDoc",t._key,e,n,s):Mm(i,"updateDoc",t._key,e),vo(r,[o.toMutation(t._key,ye.exists(!0))])}function yw(t,e){const n=fe(t.firestore,Ye),s=Tm(t),r=kl(t.converter,e);return vo(n,[wl(pr(t.firestore),"addDoc",s._key,r,t.converter!==null,{}).toMutation(s._key,ye.exists(!1))]).then(()=>s)}function vw(t,...e){var n,s,r;t=V(t);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Pa(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(Pa(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(s=h.error)===null||s===void 0?void 0:s.bind(h),e[o+2]=(r=h.complete)===null||r===void 0?void 0:r.bind(h)}let c,u,l;if(t instanceof se)u=fe(t.firestore,Ye),l=nr(t._key.path),c={next:h=>{e[o]&&e[o](Rl(u,t,h))},error:e[o+1],complete:e[o+2]};else{const h=fe(t,jt);u=fe(h.firestore,Ye),l=h._query;const d=new yo(u);c={next:p=>{e[o]&&e[o](new Al(u,d,h,p))},error:e[o+1],complete:e[o+2]},Sl(t._query)}return function(h,d,p,m){const w=new uo(m),y=new ao(d,w,p);return h.asyncQueue.enqueueAndForget(async()=>ro(await Os(h),y)),()=>{w.bc(),h.asyncQueue.enqueueAndForget(async()=>io(await Os(h),y))}}(dr(u),l,a,c)}function vo(t,e){return function(n,s){const r=new De;return n.asyncQueue.enqueueAndForget(async()=>lm(await Am(n),s,r)),r.promise}(dr(t),e)}function Rl(t,e,n){const s=n.docs.get(e._key),r=new yo(t);return new Cl(t,r,e._key,s,new tn(n.hasPendingWrites,n.fromCache),e.converter)}(function(t,e=!0){(function(n){Bt=n})(Ut),dt(new Ke("firestore",(n,{instanceIdentifier:s,options:r})=>{const i=n.getProvider("app").getImmediate(),o=new Ye(new ep(n.getProvider("auth-internal")),new rp(n.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new v(f.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vn(a.options.projectId,c)}(i,s),i);return r=Object.assign({useFetchStreams:e},r),o._setSettings(r),o},"PUBLIC").setMultipleInstances(!0)),Ee(na,"3.7.1",t),Ee(na,"3.7.1","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl="firebasestorage.googleapis.com",Nl="storageBucket",zm=2*60*1e3,Gm=10*60*1e3,Km=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $ extends Se{constructor(e,n,s=0){super(Lr(e),`Firebase Storage: ${n} (${Lr(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,$.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Lr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function Lr(t){return"storage/"+t}function _o(){const t="An unknown error occurred, please check the error payload for server response.";return new $("unknown",t)}function Wm(t){return new $("object-not-found","Object '"+t+"' does not exist.")}function Qm(t){return new $("quota-exceeded","Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Xm(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new $("unauthenticated",t)}function Ym(){return new $("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function Jm(t){return new $("unauthorized","User does not have permission to access '"+t+"'.")}function Ol(){return new $("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function Pl(){return new $("canceled","User canceled the upload/download.")}function Zm(t){return new $("invalid-url","Invalid URL '"+t+"'.")}function ey(t){return new $("invalid-default-bucket","Invalid default bucket '"+t+"'.")}function ty(){return new $("no-default-bucket","No default bucket found. Did you set the '"+Nl+"' property when initializing the app?")}function Ll(){return new $("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function ny(){return new $("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.")}function fi(t){return new $("invalid-argument",t)}function Ml(){return new $("app-deleted","The Firebase app was deleted.")}function sy(t){return new $("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function cn(t,e){return new $("invalid-format","String does not match format '"+t+"': "+e)}function Wt(t){throw new $("internal-error","Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=de.makeFromUrl(e,n)}catch{return new de(e,"")}if(s.path==="")return s;throw ey(e)}static makeFromUrl(e,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function i(L){L.path.charAt(L.path.length-1)==="/"&&(L.path_=L.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+r+o,"i"),c={bucket:1,path:3};function u(L){L.path_=decodeURIComponent(L.path)}const l="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",p=new RegExp(`^https?://${h}/${l}/b/${r}/o${d}`,"i"),m={bucket:1,path:3},w=n===Dl?"(?:storage.googleapis.com|storage.cloud.google.com)":n,y="([^?#]*)",N=new RegExp(`^https?://${w}/${r}/${y}`,"i"),x=[{regex:a,indices:c,postModify:i},{regex:p,indices:m,postModify:u},{regex:N,indices:{bucket:1,path:2},postModify:u}];for(let L=0;L<x.length;L++){const ue=x[L],ge=ue.regex.exec(e);if(ge){const ke=ge[ue.indices.bucket];let tt=ge[ue.indices.path];tt||(tt=""),s=new de(ke,tt),ue.postModify(s);break}}if(s==null)throw Zm(e);return s}}class ry{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iy(t,e,n){let s=1,r=null,i=null,o=!1,a=0;function c(){return a===2}let u=!1;function l(...y){u||(u=!0,e.apply(null,y))}function h(y){r=setTimeout(()=>{r=null,t(p,c())},y)}function d(){i&&clearTimeout(i)}function p(y,...N){if(u){d();return}if(y){d(),l.call(null,y,...N);return}if(c()||o){d(),l.call(null,y,...N);return}s<64&&(s*=2);let x;a===1?(a=2,x=0):x=(s+Math.random())*1e3,h(x)}let m=!1;function w(y){m||(m=!0,d(),!u&&(r!==null?(y||(a=2),clearTimeout(r),h(0)):y||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,w(!0)},n),w}function oy(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ay(t){return t!==void 0}function cy(t){return typeof t=="function"}function uy(t){return typeof t=="object"&&!Array.isArray(t)}function wo(t){return typeof t=="string"||t instanceof String}function xa(t){return Eo()&&t instanceof Blob}function Eo(){return typeof Blob!="undefined"}function Ua(t,e,n,s){if(s<e)throw fi(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw fi(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(t,e,n){let s=e;return n==null&&(s=`https://${e}`),`${n}://${s}/v0${t}`}function ly(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const r=e(s)+"="+e(t[s]);n=n+r+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ut;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(ut||(ut={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(t,e){const n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||r||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e,n,s,r,i,o,a,c,u,l,h,d=!0){this.url_=e,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=l,this.connectionFactory_=h,this.retry=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((p,m)=>{this.resolve_=p,this.reject_=m,this.start_()})}start_(){const e=(s,r)=>{if(r){s(!1,new rs(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=a=>{const c=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const a=i.getErrorCode()===ut.NO_ERROR,c=i.getStatus();if((!a||xl(c,this.additionalRetryCodes_))&&this.retry){const l=i.getErrorCode()===ut.ABORT;s(!1,new rs(!1,null,l));return}const u=this.successCodes_.indexOf(c)!==-1;s(!0,new rs(u,i))})},n=(s,r)=>{const i=this.resolve_,o=this.reject_,a=r.connection;if(r.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());ay(c)?i(c):i()}catch(c){o(c)}else if(a!==null){const c=_o();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(r.canceled){const c=this.appDelete_?Ml():Pl();o(c)}else{const c=Ol();o(c)}};this.canceled_?n(!1,new rs(!1,null,!0)):this.backoffId_=iy(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&oy(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class rs{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}}function dy(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function fy(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e!=null?e:"AppManager")}function py(t,e){e&&(t["X-Firebase-GMPID"]=e)}function gy(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function my(t,e,n,s,r,i,o=!0){const a=ly(t.urlParams),c=t.url+a,u=Object.assign({},t.headers);return py(u,e),dy(u,n),fy(u,i),gy(u,s),new hy(c,t.method,u,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yy(){return typeof BlobBuilder!="undefined"?BlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:void 0}function vy(...t){const e=yy();if(e!==void 0){const n=new e;for(let s=0;s<t.length;s++)n.append(t[s]);return n.getBlob()}else{if(Eo())return new Blob(t);throw new $("unsupported-environment","This browser doesn't seem to support creating Blobs")}}function _y(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wy(t){return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Mr{constructor(e,n){this.data=e,this.contentType=n||null}}function Ey(t,e){switch(t){case we.RAW:return new Mr(Ul(e));case we.BASE64:case we.BASE64URL:return new Mr(Fl(t,e));case we.DATA_URL:return new Mr(Ty(e),by(e))}throw _o()}function Ul(t){const e=[];for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);if(s<=127)e.push(s);else if(s<=2047)e.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const i=s,o=t.charCodeAt(++n);s=65536|(i&1023)<<10|o&1023,e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?e.push(239,191,189):e.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(e)}function Iy(t){let e;try{e=decodeURIComponent(t)}catch{throw cn(we.DATA_URL,"Malformed data URL.")}return Ul(e)}function Fl(t,e){switch(t){case we.BASE64:{const r=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(r||i)throw cn(t,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case we.BASE64URL:{const r=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(r||i)throw cn(t,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=wy(e)}catch{throw cn(t,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class Vl{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw cn(we.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=Sy(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=e.substring(e.indexOf(",")+1)}}function Ty(t){const e=new Vl(t);return e.base64?Fl(we.BASE64,e.rest):Iy(e.rest)}function by(t){return new Vl(t).contentType}function Sy(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,n){let s=0,r="";xa(e)?(this.data_=e,s=e.size,r=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),s=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),s=e.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,n){if(xa(this.data_)){const s=this.data_,r=_y(s,e,n);return r===null?null:new Fe(r)}else{const s=new Uint8Array(this.data_.buffer,e,n-e);return new Fe(s,!0)}}static getBlob(...e){if(Eo()){const n=e.map(s=>s instanceof Fe?s.data_:s);return new Fe(vy.apply(null,n))}else{const n=e.map(o=>wo(o)?Ey(we.RAW,o).data:o.data_);let s=0;n.forEach(o=>{s+=o.byteLength});const r=new Uint8Array(s);let i=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)r[i++]=o[a]}),new Fe(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(t){let e;try{e=JSON.parse(t)}catch{return null}return uy(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function Ay(t,e){const n=e.split("/").filter(s=>s.length>0).join("/");return t.length===0?n:t+"/"+n}function Bl(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ry(t,e){return e}class oe{constructor(e,n,s,r){this.server=e,this.local=n||e,this.writable=!!s,this.xform=r||Ry}}let is=null;function Dy(t){return!wo(t)||t.length<2?t:Bl(t)}function Ny(){if(is)return is;const t=[];t.push(new oe("bucket")),t.push(new oe("generation")),t.push(new oe("metageneration")),t.push(new oe("name","fullPath",!0));function e(i,o){return Dy(o)}const n=new oe("name");n.xform=e,t.push(n);function s(i,o){return o!==void 0?Number(o):o}const r=new oe("size");return r.xform=s,t.push(r),t.push(new oe("timeCreated")),t.push(new oe("updated")),t.push(new oe("md5Hash",null,!0)),t.push(new oe("cacheControl",null,!0)),t.push(new oe("contentDisposition",null,!0)),t.push(new oe("contentEncoding",null,!0)),t.push(new oe("contentLanguage",null,!0)),t.push(new oe("contentType",null,!0)),t.push(new oe("metadata","customMetadata",!0)),is=t,is}function Oy(t,e){function n(){const s=t.bucket,r=t.fullPath,i=new de(s,r);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function Py(t,e,n){const s={};s.type="file";const r=n.length;for(let i=0;i<r;i++){const o=n[i];s[o.local]=o.xform(s,e[o.server])}return Oy(s,t),s}function Ly(t,e,n){const s=ky(e);return s===null?null:Py(t,s,n)}function $l(t,e){const n={},s=e.length;for(let r=0;r<s;r++){const i=e[r];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}class zn{constructor(e,n,s,r){this.url=e,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(t){if(!t)throw _o()}function To(t,e){function n(s,r){const i=Ly(t,r,e);return Ge(i!==null),i}return n}function Gn(t){function e(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=Ym():r=Xm():n.getStatus()===402?r=Qm(t.bucket):n.getStatus()===403?r=Jm(t.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return e}function My(t){const e=Gn(t);function n(s,r){let i=e(s,r);return s.getStatus()===404&&(i=Wm(t.path)),i.serverResponse=r.serverResponse,i}return n}function xy(t,e,n){const s=e.fullServerUrl(),r=Io(s,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,a=new zn(r,i,To(t,n),o);return a.errorHandler=My(e),a}function Uy(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function ql(t,e,n){const s=Object.assign({},n);return s.fullPath=t.path,s.size=e.size(),s.contentType||(s.contentType=Uy(null,e)),s}function Fy(t,e,n,s,r){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let x="";for(let L=0;L<2;L++)x=x+Math.random().toString().slice(2);return x}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const u=ql(e,s,r),l=$l(u,n),h="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+l+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,d=`\r
--`+c+"--",p=Fe.getBlob(h,s,d);if(p===null)throw Ll();const m={name:u.fullPath},w=Io(i,t.host,t._protocol),y="POST",N=t.maxUploadRetryTime,D=new zn(w,y,To(t,n),N);return D.urlParams=m,D.headers=o,D.body=p.uploadData(),D.errorHandler=Gn(e),D}class Ls{constructor(e,n,s,r){this.current=e,this.total=n,this.finalized=!!s,this.metadata=r||null}}function bo(t,e){let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch{Ge(!1)}return Ge(!!n&&(e||["active"]).indexOf(n)!==-1),n}function Vy(t,e,n,s,r){const i=e.bucketOnlyServerUrl(),o=ql(e,s,r),a={name:o.fullPath},c=Io(i,t.host,t._protocol),u="POST",l={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${s.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},h=$l(o,n),d=t.maxUploadRetryTime;function p(w){bo(w);let y;try{y=w.getResponseHeader("X-Goog-Upload-URL")}catch{Ge(!1)}return Ge(wo(y)),y}const m=new zn(c,u,p,d);return m.urlParams=a,m.headers=l,m.body=h,m.errorHandler=Gn(e),m}function By(t,e,n,s){const r={"X-Goog-Upload-Command":"query"};function i(u){const l=bo(u,["active","final"]);let h=null;try{h=u.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Ge(!1)}h||Ge(!1);const d=Number(h);return Ge(!isNaN(d)),new Ls(d,s.size(),l==="final")}const o="POST",a=t.maxUploadRetryTime,c=new zn(n,o,i,a);return c.headers=r,c.errorHandler=Gn(e),c}const Fa=256*1024;function $y(t,e,n,s,r,i,o,a){const c=new Ls(0,0);if(o?(c.current=o.current,c.total=o.total):(c.current=0,c.total=s.size()),s.size()!==c.total)throw ny();const u=c.total-c.current;let l=u;r>0&&(l=Math.min(l,r));const h=c.current,d=h+l;let p="";l===0?p="finalize":u===l?p="upload, finalize":p="upload";const m={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":`${c.current}`},w=s.slice(h,d);if(w===null)throw Ll();function y(L,ue){const ge=bo(L,["active","final"]),ke=c.current+l,tt=s.size();let nt;return ge==="final"?nt=To(e,i)(L,ue):nt=null,new Ls(ke,tt,ge==="final",nt)}const N="POST",D=e.maxUploadRetryTime,x=new zn(n,N,y,D);return x.headers=m,x.body=w.uploadData(),x.progressCallback=a||null,x.errorHandler=Gn(t),x}const le={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function xr(t){switch(t){case"running":case"pausing":case"canceling":return le.RUNNING;case"paused":return le.PAUSED;case"success":return le.SUCCESS;case"canceled":return le.CANCELED;case"error":return le.ERROR;default:return le.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,n,s){if(cy(e)||n!=null||s!=null)this.next=e,this.error=n!=null?n:void 0,this.complete=s!=null?s:void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(t){return(...e)=>{Promise.resolve().then(()=>t(...e))}}class jy{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ut.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ut.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ut.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,s,r){if(this.sent_)throw Wt("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),r!==void 0)for(const i in r)r.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,r[i].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Wt("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Wt("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Wt("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Wt("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Hy extends jy{initXhr(){this.xhr_.responseType="text"}}function Qt(){return new Hy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(e,n,s=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=n,this._metadata=s,this._mappings=Ny(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=r=>{if(this._request=void 0,this._chunkMultiplier=1,r._codeEquals("canceled"))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(xl(r.status,[]))if(i)r=Ol();else{this.sleepTime=Math.max(this.sleepTime*2,Km),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=r,this._transition("error")}},this._metadataErrorHandler=r=>{this._request=void 0,r._codeEquals("canceled")?this.completeTransitions_():(this._error=r,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((r,i)=>{this._resolve=r,this._reject=i,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return n=>this._updateProgress(e+n)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([n,s])=>{switch(this._state){case"running":e(n,s);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,n)=>{const s=Vy(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(s,Qt,e,n);this._request=r,r.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((n,s)=>{const r=By(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(r,Qt,n,s);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Fa*this._chunkMultiplier,n=new Ls(this._transferred,this._blob.size()),s=this._uploadUrl;this._resolveToken((r,i)=>{let o;try{o=$y(this._ref._location,this._ref.storage,s,this._blob,e,this._mappings,n,this._makeProgressCallback())}catch(c){this._error=c,this._transition("error");return}const a=this._ref.storage._makeRequest(o,Qt,r,i,!1);this._request=a,a.getPromise().then(c=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(c.current),c.finalized?(this._metadata=c.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Fa*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,n)=>{const s=xy(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(s,Qt,e,n);this._request=r,r.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,n)=>{const s=Fy(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(s,Qt,e,n);this._request=r,r.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const n=this._transferred;this._transferred=e,this._transferred!==n&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const n=this._state==="paused";this._state=e,n&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Pl(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=xr(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,n,s,r){const i=new qy(n||void 0,s||void 0,r||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,n){return this._promise.then(e,n)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const n=this._observers.indexOf(e);n!==-1&&this._observers.splice(n,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(n=>{this._notifyObserver(n)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(xr(this._state)){case le.SUCCESS:It(this._resolve.bind(null,this.snapshot))();break;case le.CANCELED:case le.ERROR:const n=this._reject;It(n.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(xr(this._state)){case le.RUNNING:case le.PAUSED:e.next&&It(e.next.bind(e,this.snapshot))();break;case le.SUCCESS:e.complete&&It(e.complete.bind(e))();break;case le.CANCELED:case le.ERROR:e.error&&It(e.error.bind(e,this._error))();break;default:e.error&&It(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,n){this._service=e,n instanceof de?this._location=n:this._location=de.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new gt(e,n)}get root(){const e=new de(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Bl(this._location.path)}get storage(){return this._service}get parent(){const e=Cy(this._location.path);if(e===null)return null;const n=new de(this._location.bucket,e);return new gt(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw sy(e)}}function Gy(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new zy(t,new Fe(e),n)}function Ky(t,e){const n=Ay(t._location.path,e),s=new de(t._location.bucket,n);return new gt(t.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wy(t){return/^[A-Za-z]+:\/\//.test(t)}function Qy(t,e){return new gt(t,e)}function jl(t,e){if(t instanceof So){const n=t;if(n._bucket==null)throw ty();const s=new gt(n,n._bucket);return e!=null?jl(s,e):s}else return e!==void 0?Ky(t,e):t}function Xy(t,e){if(e&&Wy(e)){if(t instanceof So)return Qy(t,e);throw fi("To use ref(service, url), the first argument must be a Storage instance.")}else return jl(t,e)}function Va(t,e){const n=e==null?void 0:e[Nl];return n==null?null:de.makeFromBucketSpec(n,t)}function Yy(t,e,n,s={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:r}=s;r&&(t._overrideAuthToken=typeof r=="string"?r:hc(r,t.app.options.projectId))}class So{constructor(e,n,s,r,i){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=Dl,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=zm,this._maxUploadRetryTime=Gm,this._requests=new Set,r!=null?this._bucket=de.makeFromBucketSpec(r,this._host):this._bucket=Va(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=de.makeFromBucketSpec(this._url,e):this._bucket=Va(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ua("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ua("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new gt(this,e)}_makeRequest(e,n,s,r,i=!0){if(this._deleted)return new ry(Ml());{const o=my(e,this._appId,s,r,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,r).getPromise()}}const Ba="@firebase/storage",$a="0.9.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl="storage";function _w(t,e,n){return t=V(t),Gy(t,e,n)}function ww(t,e){return t=V(t),Xy(t,e)}function Ew(t=wi(),e){t=V(t);const s=Vs(t,Hl).getImmediate({identifier:e}),r=uc("storage");return r&&Jy(s,...r),s}function Jy(t,e,n,s={}){Yy(t,e,n,s)}function Zy(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new So(n,s,r,e,Ut)}function ev(){dt(new Ke(Hl,Zy,"PUBLIC").setMultipleInstances(!0)),Ee(Ba,$a,""),Ee(Ba,$a,"esm2017")}ev();var tv="firebase",nv="9.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ee(tv,nv,"app");function ko(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function zl(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const sv=zl,Gl=new kn("auth","Firebase",zl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa=new vi("@firebase/auth");function hs(t,...e){qa.logLevel<=O.ERROR&&qa.error(`Auth (${Ut}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(t,...e){throw Co(t,...e)}function Ie(t,...e){return Co(t,...e)}function rv(t,e,n){const s=Object.assign(Object.assign({},sv()),{[e]:n});return new kn("auth","Firebase",s).create(e,{appName:t.name})}function Co(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Gl.create(t,...e)}function T(t,e,...n){if(!t)throw Co(e,...n)}function Ae(t){const e="INTERNAL ASSERTION FAILED: "+t;throw hs(e),new Error(e)}function xe(t,e){t||Ae(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=new Map;function Re(t){xe(t instanceof Function,"Expected a class definition");let e=ja.get(t);return e?(xe(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ja.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(t,e){const n=Vs(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(ms(i,e!=null?e:{}))return r;ve(r,"already-initialized")}return n.initialize({options:e})}function ov(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Re);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function av(){return Ha()==="http:"||Ha()==="https:"}function Ha(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(av()||kh()||"connection"in navigator)?navigator.onLine:!0}function uv(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,n){this.shortDelay=e,this.longDelay=n,xe(n>e,"Short delay should be less than long delay!"),this.isMobile=Sh()||Ch()}get(){return cv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(t,e){xe(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;Ae("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;Ae("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;Ae("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv=new Kn(3e4,6e4);function Ht(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function zt(t,e,n,s,r={}){return Wl(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Cn(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Kl.fetch()(Ql(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function Wl(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},lv),e);try{const r=new dv(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw os(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw os(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw os(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw os(t,"user-disabled",o);const l=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw rv(t,l,u);ve(t,l)}}catch(r){if(r instanceof Se)throw r;ve(t,"network-request-failed")}}async function Wn(t,e,n,s,r={}){const i=await zt(t,e,n,s,r);return"mfaPendingCredential"in i&&ve(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Ql(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?Ao(t.config,r):`${t.config.apiScheme}://${r}`}class dv{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Ie(this.auth,"network-request-failed")),hv.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function os(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Ie(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fv(t,e){return zt(t,"POST","/v1/accounts:delete",e)}async function pv(t,e){return zt(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function gv(t,e=!1){const n=V(t),s=await n.getIdToken(e),r=Ro(s);T(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:un(Ur(r.auth_time)),issuedAtTime:un(Ur(r.iat)),expirationTime:un(Ur(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ur(t){return Number(t)*1e3}function Ro(t){var e;const[n,s,r]=t.split(".");if(n===void 0||s===void 0||r===void 0)return hs("JWT malformed, contained fewer than 3 sections"),null;try{const i=ac(s);return i?JSON.parse(i):(hs("Failed to decode base64 JWT payload"),null)}catch(i){return hs("Caught error parsing JWT payload as JSON",(e=i)===null||e===void 0?void 0:e.toString()),null}}function mv(t){const e=Ro(t);return T(e,"internal-error"),T(typeof e.exp!="undefined","internal-error"),T(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Se&&yv(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function yv({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(n){((e=n)===null||e===void 0?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=un(this.lastLoginAt),this.creationTime=un(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ms(t){var e;const n=t.auth,s=await t.getIdToken(),r=await Tn(t,pv(n,{idToken:s}));T(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Ev(i.providerUserInfo):[],a=wv(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Xl(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,h)}async function _v(t){const e=V(t);await Ms(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function wv(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Ev(t){return t.map(e=>{var{providerId:n}=e,s=ko(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(t,e){const n=await Wl(t,{},async()=>{const s=Cn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=Ql(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Kl.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){T(e.idToken,"internal-error"),T(typeof e.idToken!="undefined","internal-error"),T(typeof e.refreshToken!="undefined","internal-error");const n="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):mv(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return T(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await Iv(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new bn;return s&&(T(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(T(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(T(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new bn,this.toJSON())}_performRefresh(){return Ae("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(t,e){T(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class lt{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=ko(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Xl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Tn(this,this.stsTokenManager.getToken(this.auth,e));return T(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return gv(this,e)}reload(){return _v(this)}_assign(e){this!==e&&(T(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new lt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){T(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Ms(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Tn(this,fv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,a,c,u,l;const h=(s=n.displayName)!==null&&s!==void 0?s:void 0,d=(r=n.email)!==null&&r!==void 0?r:void 0,p=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,m=(o=n.photoURL)!==null&&o!==void 0?o:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,y=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,N=(u=n.createdAt)!==null&&u!==void 0?u:void 0,D=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:x,emailVerified:L,isAnonymous:ue,providerData:ge,stsTokenManager:ke}=n;T(x&&ke,e,"internal-error");const tt=bn.fromJSON(this.name,ke);T(typeof x=="string",e,"internal-error"),Ue(h,e.name),Ue(d,e.name),T(typeof L=="boolean",e,"internal-error"),T(typeof ue=="boolean",e,"internal-error"),Ue(p,e.name),Ue(m,e.name),Ue(w,e.name),Ue(y,e.name),Ue(N,e.name),Ue(D,e.name);const nt=new lt({uid:x,auth:e,email:d,emailVerified:L,displayName:h,isAnonymous:ue,photoURL:m,phoneNumber:p,tenantId:w,stsTokenManager:tt,createdAt:N,lastLoginAt:D});return ge&&Array.isArray(ge)&&(nt.providerData=ge.map(Eh=>Object.assign({},Eh))),y&&(nt._redirectEventId=y),nt}static async _fromIdTokenResponse(e,n,s=!1){const r=new bn;r.updateFromServerResponse(n);const i=new lt({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Ms(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Yl.type="NONE";const za=Yl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(t,e,n){return`firebase:${t}:${e}:${n}`}class At{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=ds(this.userKey,r.apiKey,i),this.fullPersistenceKey=ds("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?lt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new At(Re(za),e,s);const r=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=r[0]||Re(za);const o=ds(s,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(o);if(l){const h=lt._fromJSON(e,l);u!==i&&(a=h),i=u;break}}catch{}const c=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new At(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new At(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(eh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Jl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(nh(e))return"Blackberry";if(sh(e))return"Webos";if(Do(e))return"Safari";if((e.includes("chrome/")||Zl(e))&&!e.includes("edge/"))return"Chrome";if(th(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Jl(t=re()){return/firefox\//i.test(t)}function Do(t=re()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zl(t=re()){return/crios\//i.test(t)}function eh(t=re()){return/iemobile/i.test(t)}function th(t=re()){return/android/i.test(t)}function nh(t=re()){return/blackberry/i.test(t)}function sh(t=re()){return/webos/i.test(t)}function mr(t=re()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Tv(t=re()){var e;return mr(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function bv(){return Ah()&&document.documentMode===10}function rh(t=re()){return mr(t)||th(t)||sh(t)||nh(t)||/windows phone/i.test(t)||eh(t)}function Sv(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ih(t,e=[]){let n;switch(t){case"Browser":n=Ga(re());break;case"Worker":n=`${Ga(re())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ut}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){var n;if(this.auth.currentUser===e)return;const s=[];try{for(const r of this.queue)await r(e),r.onAbort&&s.push(r.onAbort)}catch(r){s.reverse();for(const i of s)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(n=r)===null||n===void 0?void 0:n.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(e,n,s){this.app=e,this.heartbeatServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ka(this),this.idTokenSubscription=new Ka(this),this.beforeStateQueue=new kv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Gl,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Re(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await At.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c==null?void 0:c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return T(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){var n;try{await Ms(e)}catch(s){if(((n=s)===null||n===void 0?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=uv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?V(e):null;return n&&T(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&T(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Re(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new kn("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Re(e)||this._popupRedirectResolver;T(n,this,"argument-error"),this.redirectPersistenceManager=await At.create(this,[Re(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return T(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,s,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return T(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ih(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return s&&(n["X-Firebase-Client"]=s),n}}function Qn(t){return V(t)}class Ka{constructor(e){this.auth=e,this.observer=null,this.addObserver=$h(n=>this.observer=n)}get next(){return T(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Av(t,e,n){const s=Qn(t);T(s._canInitEmulator,s,"emulator-config-failed"),T(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!!(n!=null&&n.disableWarnings),i=oh(e),{host:o,port:a}=Rv(e),c=a===null?"":`:${a}`;s.config.emulator={url:`${i}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||Dv()}function oh(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Rv(t){const e=oh(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Wa(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Wa(o)}}}function Wa(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Dv(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ae("not implemented")}_getIdTokenResponse(e){return Ae("not implemented")}_linkToIdToken(e,n){return Ae("not implemented")}_getReauthenticationResolver(e){return Ae("not implemented")}}async function Nv(t,e){return zt(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ov(t,e){return Wn(t,"POST","/v1/accounts:signInWithPassword",Ht(t,e))}async function Pv(t,e){return zt(t,"POST","/v1/accounts:sendOobCode",Ht(t,e))}async function Lv(t,e){return Pv(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mv(t,e){return Wn(t,"POST","/v1/accounts:signInWithEmailLink",Ht(t,e))}async function xv(t,e){return Wn(t,"POST","/v1/accounts:signInWithEmailLink",Ht(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends No{constructor(e,n,s,r=null){super("password",s),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new Sn(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Sn(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if((n==null?void 0:n.email)&&(n==null?void 0:n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Ov(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Mv(e,{email:this._email,oobCode:this._password});default:ve(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return Nv(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return xv(e,{idToken:n,email:this._email,oobCode:this._password});default:ve(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rt(t,e){return Wn(t,"POST","/v1/accounts:signInWithIdp",Ht(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uv="http://localhost";class mt extends No{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new mt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ve("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=ko(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new mt(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Rt(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Rt(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Rt(e,n)}buildRequest(){const e={requestUri:Uv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Cn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fv(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vv(t){const e=Xt(Yt(t)).link,n=e?Xt(Yt(e)).deep_link_id:null,s=Xt(Yt(t)).deep_link_id;return(s?Xt(Yt(s)).link:null)||s||n||e||t}class Oo{constructor(e){var n,s,r,i,o,a;const c=Xt(Yt(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,l=(s=c.oobCode)!==null&&s!==void 0?s:null,h=Fv((r=c.mode)!==null&&r!==void 0?r:null);T(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Vv(e);try{return new Oo(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(){this.providerId=Gt.PROVIDER_ID}static credential(e,n){return Sn._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=Oo.parseLink(n);return T(s,"argument-error"),Sn._fromEmailAndCode(e,s.code,s.tenantId)}}Gt.PROVIDER_ID="password";Gt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Gt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends ah{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends Xn{constructor(){super("facebook.com")}static credential(e){return mt._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ve.credential(e.oauthAccessToken)}catch{return null}}}Ve.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ve.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be extends Xn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return mt._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Be.credential(n,s)}catch{return null}}}Be.GOOGLE_SIGN_IN_METHOD="google.com";Be.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e extends Xn{constructor(){super("github.com")}static credential(e){return mt._fromParams({providerId:$e.PROVIDER_ID,signInMethod:$e.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $e.credentialFromTaggedObject(e)}static credentialFromError(e){return $e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $e.credential(e.oauthAccessToken)}catch{return null}}}$e.GITHUB_SIGN_IN_METHOD="github.com";$e.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe extends Xn{constructor(){super("twitter.com")}static credential(e,n){return mt._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return qe.credential(n,s)}catch{return null}}}qe.TWITTER_SIGN_IN_METHOD="twitter.com";qe.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bv(t,e){return Wn(t,"POST","/v1/accounts:signUp",Ht(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await lt._fromIdTokenResponse(e,s,r),o=Qa(s);return new yt({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Qa(s);return new yt({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Qa(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs extends Se{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,xs.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new xs(e,n,s,r)}}function ch(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?xs._fromErrorAndOperation(t,i,e,s):i})}async function $v(t,e,n=!1){const s=await Tn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return yt._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qv(t,e,n=!1){var s;const{auth:r}=t,i="reauthenticate";try{const o=await Tn(t,ch(r,i,e,t),n);T(o.idToken,r,"internal-error");const a=Ro(o.idToken);T(a,r,"internal-error");const{sub:c}=a;return T(t.uid===c,r,"user-mismatch"),yt._forOperation(t,i,o)}catch(o){throw((s=o)===null||s===void 0?void 0:s.code)==="auth/user-not-found"&&ve(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uh(t,e,n=!1){const s="signIn",r=await ch(t,s,e),i=await yt._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function jv(t,e){return uh(Qn(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hv(t,e,n){var s;T(((s=n.url)===null||s===void 0?void 0:s.length)>0,t,"invalid-continue-uri"),T(typeof n.dynamicLinkDomain=="undefined"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(T(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(T(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iw(t,e,n){const s=V(t),r={requestType:"PASSWORD_RESET",email:e};n&&Hv(s,r,n),await Lv(s,r)}async function Tw(t,e,n){const s=Qn(t),r=await Bv(s,{returnSecureToken:!0,email:e,password:n}),i=await yt._fromIdTokenResponse(s,"signIn",r);return await s._updateCurrentUser(i.user),i}function bw(t,e,n){return jv(V(t),Gt.credential(e,n))}function zv(t,e,n,s){return V(t).onIdTokenChanged(e,n,s)}function Gv(t,e,n){return V(t).beforeAuthStateChanged(e,n)}function Sw(t,e,n,s){return V(t).onAuthStateChanged(e,n,s)}function kw(t){return V(t).signOut()}const Us="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Us,"1"),this.storage.removeItem(Us),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(){const t=re();return Do(t)||mr(t)}const Wv=1e3,Qv=10;class hh extends lh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Kv()&&Sv(),this.fallbackToPolling=rh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(s);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!n)return}const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);bv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Qv):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},Wv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}hh.type="LOCAL";const Xv=hh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh extends lh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}dh.type="SESSION";const fh=dh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yv(t){return Promise.all(t.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new yr(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async u=>u(n.origin,i)),c=await Yv(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}yr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const u=Po("",20);r.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(h){const d=h;if(d.data.eventId===u)switch(d.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(l),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(){return window}function Zv(t){Te().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(){return typeof Te().WorkerGlobalScope!="undefined"&&typeof Te().importScripts=="function"}async function e_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function t_(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function n_(){return ph()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh="firebaseLocalStorageDb",s_=1,Fs="firebaseLocalStorage",mh="fbase_key";class Yn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function vr(t,e){return t.transaction([Fs],e?"readwrite":"readonly").objectStore(Fs)}function r_(){const t=indexedDB.deleteDatabase(gh);return new Yn(t).toPromise()}function gi(){const t=indexedDB.open(gh,s_);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Fs,{keyPath:mh})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Fs)?e(s):(s.close(),await r_(),e(await gi()))})})}async function Xa(t,e,n){const s=vr(t,!0).put({[mh]:e,value:n});return new Yn(s).toPromise()}async function i_(t,e){const n=vr(t,!1).get(e),s=await new Yn(n).toPromise();return s===void 0?null:s.value}function Ya(t,e){const n=vr(t,!0).delete(e);return new Yn(n).toPromise()}const o_=800,a_=3;class yh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await gi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>a_)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ph()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yr._getInstance(n_()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await e_(),!this.activeServiceWorker)return;this.sender=new Jv(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);!s||((e=s[0])===null||e===void 0?void 0:e.fulfilled)&&((n=s[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||t_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await gi();return await Xa(e,Us,"1"),await Ya(e,Us),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Xa(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>i_(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ya(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=vr(r,!1).getAll();return new Yn(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),o_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}yh.type="LOCAL";const c_=yh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function l_(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=Ie("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",u_().appendChild(s)})}function h_(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Kn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d_(t,e){return e?Re(e):(T(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo extends No{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Rt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Rt(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function f_(t){return uh(t.auth,new Lo(t),t.bypassAuthState)}function p_(t){const{auth:e,user:n}=t;return T(n,e,"internal-error"),qv(n,new Lo(t),t.bypassAuthState)}async function g_(t){const{auth:e,user:n}=t;return T(n,e,"internal-error"),$v(n,new Lo(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return f_;case"linkViaPopup":case"linkViaRedirect":return g_;case"reauthViaPopup":case"reauthViaRedirect":return p_;default:ve(this.auth,"internal-error")}}resolve(e){xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_=new Kn(2e3,1e4);class St extends vh{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,St.currentPopupAction&&St.currentPopupAction.cancel(),St.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return T(e,this.auth,"internal-error"),e}async onExecution(){xe(this.filter.length===1,"Popup operations only handle one event");const e=Po();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,St.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ie(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,m_.get())};e()}}St.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_="pendingRedirect",fs=new Map;class v_ extends vh{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=fs.get(this.auth._key());if(!e){try{const s=await __(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}fs.set(this.auth._key(),e)}return this.bypassAuthState||fs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function __(t,e){const n=I_(e),s=E_(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function w_(t,e){fs.set(t._key(),e)}function E_(t){return Re(t._redirectPersistence)}function I_(t){return ds(y_,t.config.apiKey,t.name)}async function T_(t,e,n=!1){const s=Qn(t),r=d_(s,e),o=await new v_(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_=10*60*1e3;class S_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!k_(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!_h(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(Ie(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=b_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ja(e))}saveEventToCache(e){this.cachedEventUids.add(Ja(e)),this.lastProcessedEventTime=Date.now()}}function Ja(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function _h({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function k_(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _h(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function C_(t,e={}){return zt(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,R_=/^https?/;async function D_(t){if(t.config.emulator)return;const{authorizedDomains:e}=await C_(t);for(const n of e)try{if(N_(n))return}catch{}ve(t,"unauthorized-domain")}function N_(t){const e=pi(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!R_.test(n))return!1;if(A_.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=new Kn(3e4,6e4);function Za(){const t=Te().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function P_(t){return new Promise((e,n)=>{var s,r,i;function o(){Za(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Za(),n(Ie(t,"network-request-failed"))},timeout:O_.get()})}if(!((r=(s=Te().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=Te().gapi)===null||i===void 0)&&i.load)o();else{const a=h_("iframefcb");return Te()[a]=()=>{gapi.load?o():n(Ie(t,"network-request-failed"))},l_(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw ps=null,e})}let ps=null;function L_(t){return ps=ps||P_(t),ps}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_=new Kn(5e3,15e3),x_="__/auth/iframe",U_="emulator/auth/iframe",F_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},V_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function B_(t){const e=t.config;T(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ao(e,U_):`https://${t.config.authDomain}/${x_}`,s={apiKey:e.apiKey,appName:t.name,v:Ut},r=V_.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Cn(s).slice(1)}`}async function $_(t){const e=await L_(t),n=Te().gapi;return T(n,t,"internal-error"),e.open({where:document.body,url:B_(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:F_,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Ie(t,"network-request-failed"),a=Te().setTimeout(()=>{i(o)},M_.get());function c(){Te().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},j_=500,H_=600,z_="_blank",G_="http://localhost";class ec{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function K_(t,e,n,s=j_,r=H_){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c=Object.assign(Object.assign({},q_),{width:s.toString(),height:r.toString(),top:i,left:o}),u=re().toLowerCase();n&&(a=Zl(u)?z_:n),Jl(u)&&(e=e||G_,c.scrollbars="yes");const l=Object.entries(c).reduce((d,[p,m])=>`${d}${p}=${m},`,"");if(Tv(u)&&a!=="_self")return W_(e||"",a),new ec(null);const h=window.open(e||"",a,l);T(h,t,"popup-blocked");try{h.focus()}catch{}return new ec(h)}function W_(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q_="__/auth/handler",X_="emulator/auth/handler";function tc(t,e,n,s,r,i){T(t.config.authDomain,t,"auth-domain-config-required"),T(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Ut,eventId:r};if(e instanceof ah){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Bh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,u]of Object.entries(i||{}))o[c]=u}if(e instanceof Xn){const c=e.getScopes().filter(u=>u!=="");c.length>0&&(o.scopes=c.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))a[c]===void 0&&delete a[c];return`${Y_(t)}?${Cn(a).slice(1)}`}function Y_({config:t}){return t.emulator?Ao(t,X_):`https://${t.authDomain}/${Q_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr="webStorageSupport";class J_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=fh,this._completeRedirectFn=T_,this._overrideRedirectResult=w_}async _openPopup(e,n,s,r){var i;xe((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=tc(e,n,s,pi(),r);return K_(e,o,Po())}async _openRedirect(e,n,s,r){return await this._originValidation(e),Zv(tc(e,n,s,pi(),r)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(xe(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await $_(e),s=new S_(e);return n.register("authEvent",r=>(T(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Fr,{type:Fr},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[Fr];o!==void 0&&n(!!o),ve(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=D_(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return rh()||Do()||mr()}}const Z_=J_;var nc="@firebase/auth",sc="0.20.10";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{var r;e(((r=s)===null||r===void 0?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){T(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function nw(t){dt(new Ke("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:o}=s.options;return((a,c)=>{T(i&&!i.includes(":"),"invalid-api-key",{appName:a.name}),T(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const u={apiKey:i,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ih(t)},l=new Cv(a,c,u);return ov(l,n),l})(s,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),dt(new Ke("auth-internal",e=>{const n=Qn(e.getProvider("auth").getImmediate());return(s=>new ew(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ee(nc,sc,tw(t)),Ee(nc,sc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw=5*60,rw=lc("authIdTokenMaxAge")||sw;let rc=null;const iw=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>rw)return;const r=n==null?void 0:n.token;rc!==r&&(rc=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function ow(t=wi()){const e=Vs(t,"auth");if(e.isInitialized())return e.getImmediate();const n=iv(t,{popupRedirectResolver:Z_,persistence:[c_,Xv,fh]}),s=lc("authTokenSyncURL");if(s){const i=iw(s);Gv(n,i,()=>i(n.currentUser)),zv(n,o=>i(o))}const r=cc("auth");return r&&Av(n,`http://${r}`),n}nw("Browser");const aw={apiKey:"AIzaSyCS8IGk-zwb_9IFygDfUn6lX9RwJHY_l4E",authDomain:"moda-archive.firebaseapp.com",projectId:"moda-archive",storageBucket:"moda-archive.appspot.com",messagingSenderId:"69869751266",appId:"1:69869751266:web:e5bdf8ab9c39af3d8647bb",measurementId:"G-ZWTS6YX264"};let mi,wh;mi=pc(aw),wh=ow(mi);const Cw=wh;var Aw=mi;function Rw(t){Ih({message:t,type:"error",showClose:!0,duration:8e3})}function Dw(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function Nw(){return["0x9b75874f5313463011e22aDd4540d2b8A24e3958","0xd8945d98ed4233Cf87cfA4fDCC7a54FE279E8ee7","0x2ee434a49C4C5A254669d05E1602c656017bAC1f","0x0599B2ddEF49E3Ef6b11a5969cBB9aDE7fA614dd","0xEa53074F2972F2EE9C00410b127e107F29c7D4E3"]}export{dw as $,vw as I,lw as L,hw as M,Rw as a,Cw as b,Tm as c,fw as d,uw as e,Aw as f,Nw as g,pw as h,Dw as i,mw as j,Ew as k,Tw as l,gw as m,H as n,Sw as o,yw as p,bw as q,ww as r,kw as s,Iw as t,_w as u};
