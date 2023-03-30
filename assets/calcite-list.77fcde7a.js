import{rZ as F,r_ as k,s1 as D,r$ as u,s9 as Y,s8 as Z}from"./index.a33ecea7.js";import{u as j}from"./interactive.04cc47fb.js";import{c as J}from"./observers.9780c1c0.js";import{u as Q,g as N,M as ee}from"./utils3.2f6dc612.js";import{s as S,a as _,c as O}from"./loadable.e0e8428c.js";import{S as y,i as b,r as te,b as g,f as ie,a as ae,c as M,d as p}from"./debounce.b855d660.js";import{u as ne,s as re,c as se,a as oe,d as ce,b as le}from"./t9n.4603275f.js";import{d as $}from"./icon.e216e26e.js";import{a as P,d as z}from"./input.279e5029.js";import{d as de}from"./loader.8ded4966.js";import{d as ue}from"./scrim.538e6412.js";import"./key.df37f926.js";import"./form.a880bfec.js";import"./label2.0908ee41.js";import"./guid.51085e85.js";/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */function fe(e,t){for(var i=-1,n=e==null?0:e.length,a=Array(n);++i<n;)a[i]=t(e[i],i,e);return a}var R=Array.isArray,me=1/0,v=y?y.prototype:void 0,I=v?v.toString:void 0;function H(e){if(typeof e=="string")return e;if(R(e))return fe(e,H)+"";if(ae(e))return I?I.call(e):"";var t=e+"";return t=="0"&&1/e==-me?"-0":t}function he(e){return e}var pe="[object AsyncFunction]",be="[object Function]",ge="[object GeneratorFunction]",ye="[object Proxy]";function ve(e){if(!M(e))return!1;var t=g(e);return t==be||t==ge||t==pe||t==ye}var Ie=9007199254740991,xe=/^(?:0|[1-9]\d*)$/;function we(e,t){var i=typeof e;return t=t==null?Ie:t,!!t&&(i=="number"||i!="symbol"&&xe.test(e))&&e>-1&&e%1==0&&e<t}var Ee=9007199254740991;function U(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Ee}function Ae(e){return e!=null&&U(e.length)&&!ve(e)}var Le=Object.prototype;function Te(e){var t=e&&e.constructor,i=typeof t=="function"&&t.prototype||Le;return e===i}function Ce(e,t){for(var i=-1,n=Array(e);++i<e;)n[i]=t(i);return n}var Fe="[object Arguments]";function x(e){return b(e)&&g(e)==Fe}var B=Object.prototype,ke=B.hasOwnProperty,De=B.propertyIsEnumerable,je=x(function(){return arguments}())?x:function(e){return b(e)&&ke.call(e,"callee")&&!De.call(e,"callee")};function Se(){return!1}var K=typeof exports=="object"&&exports&&!exports.nodeType&&exports,w=K&&typeof module=="object"&&module&&!module.nodeType&&module,_e=w&&w.exports===K,E=_e?te.Buffer:void 0,Oe=E?E.isBuffer:void 0,Me=Oe||Se,$e="[object Arguments]",Pe="[object Array]",ze="[object Boolean]",Re="[object Date]",He="[object Error]",Ue="[object Function]",Be="[object Map]",Ke="[object Number]",qe="[object Object]",Ge="[object RegExp]",Ve="[object Set]",We="[object String]",Xe="[object WeakMap]",Ye="[object ArrayBuffer]",Ze="[object DataView]",Je="[object Float32Array]",Qe="[object Float64Array]",Ne="[object Int8Array]",et="[object Int16Array]",tt="[object Int32Array]",it="[object Uint8Array]",at="[object Uint8ClampedArray]",nt="[object Uint16Array]",rt="[object Uint32Array]",s={};s[Je]=s[Qe]=s[Ne]=s[et]=s[tt]=s[it]=s[at]=s[nt]=s[rt]=!0;s[$e]=s[Pe]=s[Ye]=s[ze]=s[Ze]=s[Re]=s[He]=s[Ue]=s[Be]=s[Ke]=s[qe]=s[Ge]=s[Ve]=s[We]=s[Xe]=!1;function st(e){return b(e)&&U(e.length)&&!!s[g(e)]}function ot(e){return function(t){return e(t)}}var q=typeof exports=="object"&&exports&&!exports.nodeType&&exports,m=q&&typeof module=="object"&&module&&!module.nodeType&&module,ct=m&&m.exports===q,h=ct&&ie.process,A=function(){try{var e=m&&m.require&&m.require("util").types;return e||h&&h.binding&&h.binding("util")}catch{}}(),L=A&&A.isTypedArray,lt=L?ot(L):st,dt=Object.prototype,ut=dt.hasOwnProperty;function ft(e,t){var i=R(e),n=!i&&je(e),a=!i&&!n&&Me(e),l=!i&&!n&&!a&&lt(e),r=i||n||a||l,c=r?Ce(e.length,String):[],d=c.length;for(var o in e)(t||ut.call(e,o))&&!(r&&(o=="length"||a&&(o=="offset"||o=="parent")||l&&(o=="buffer"||o=="byteLength"||o=="byteOffset")||we(o,d)))&&c.push(o);return c}function mt(e){var t=[];if(e!=null)for(var i in Object(e))t.push(i);return t}var ht=Object.prototype,pt=ht.hasOwnProperty;function bt(e){if(!M(e))return mt(e);var t=Te(e),i=[];for(var n in e)n=="constructor"&&(t||!pt.call(e,n))||i.push(n);return i}function gt(e){return Ae(e)?ft(e,!0):bt(e)}function yt(e){return e==null?"":H(e)}function vt(e){return function(t,i,n){for(var a=-1,l=Object(t),r=n(t),c=r.length;c--;){var d=r[e?c:++a];if(i(l[d],d,l)===!1)break}return t}}var It=vt();function xt(e){return typeof e=="function"?e:he}var G=/[\\^$.*+?()[\]{}|]/g,wt=RegExp(G.source);function Et(e){return e=yt(e),e&&wt.test(e)?e.replace(G,"\\$&"):e}function At(e,t){return e==null?e:It(e,xt(t),gt)}const T=(e,t)=>{const i=Et(t),n=new RegExp(i,"i");e.length===0&&console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);const a=(r,c)=>{if((r==null?void 0:r.constant)||(r==null?void 0:r.filterDisabled))return!0;let d=!1;return At(r,o=>{typeof o=="function"||o==null||(Array.isArray(o)||typeof o=="object"&&o!==null?a(o,c)&&(d=!0):c.test(o)&&(d=!0))}),d};return e.filter(r=>a(r,n))};/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */const Lt={container:"container",searchIcon:"search-icon"},Tt={search:"search",close:"x"},Ct=250,Ft="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{display:flex;inline-size:100%;padding:0.5rem}label{position:relative;margin-inline:0.25rem;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}input[type=text]{margin-block-end:0.25rem;inline-size:100%;border-style:none;background-color:transparent;padding-block:0.25rem;font-family:inherit;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-ui-text-1);padding-inline-end:0.25rem;padding-inline-start:1.5rem;transition:padding var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}input[type=text]::-ms-clear{display:none}calcite-input{inline-size:100%}.search-icon{position:absolute;display:flex;color:var(--calcite-ui-text-2);inset-inline-start:0;transition:inset-inline-start var(--calcite-animation-timing), inset-inline-end var(--calcite-animation-timing), opacity var(--calcite-animation-timing)}input[type=text]:focus{border-color:var(--calcite-ui-brand);outline:2px solid transparent;outline-offset:2px;padding-inline:0.25rem}input[type=text]:focus~.search-icon{inset-inline-start:calc(1rem * -1);opacity:0}.clear-button{display:flex;cursor:pointer;align-items:center;border-width:0px;background-color:transparent;color:var(--calcite-ui-text-2)}.clear-button:hover,.clear-button:focus{color:var(--calcite-ui-text-1)}",kt=F(class extends k{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteFilterChange=D(this,"calciteFilterChange",6),this.filter=p((e,t=!1)=>this.updateFiltered(T(this.items,e),t),Ct),this.inputHandler=e=>{const t=e.target;this.value=t.value,this.filter(t.value,!0)},this.keyDownHandler=e=>{e.key==="Escape"&&(this.clear(),e.preventDefault()),e.key==="Enter"&&e.preventDefault()},this.clear=()=>{this.value="",this.filter("",!0),this.setFocus()},this.items=[],this.disabled=!1,this.filteredItems=[],this.placeholder=void 0,this.scale="m",this.value="",this.messages=void 0,this.messageOverrides=void 0,this.effectiveLocale=void 0,this.defaultMessages=void 0}watchItemsHandler(){this.filter(this.value)}onMessagesChange(){}valueHandler(e){this.filter(e)}effectiveLocaleChange(){ne(this,this.effectiveLocale)}async componentWillLoad(){S(this),this.updateFiltered(T(this.items,this.value)),await re(this)}connectedCallback(){se(this),oe(this)}componentDidRender(){j(this)}disconnectedCallback(){ce(this),le(this)}componentDidLoad(){_(this)}async setFocus(){var e;await O(this),(e=this.el)==null||e.focus()}updateFiltered(e,t=!1){this.filteredItems.length=0,this.filteredItems=this.filteredItems.concat(e),t&&this.calciteFilterChange.emit()}render(){const{disabled:e,scale:t}=this;return u(Y,null,u("div",{class:Lt.container},u("label",null,u("calcite-input",{"aria-label":this.messages.label,clearable:!0,disabled:e,icon:Tt.search,messageOverrides:{clear:this.messages.clear},onCalciteInputInput:this.inputHandler,onKeyDown:this.keyDownHandler,placeholder:this.placeholder,ref:i=>{this.textInput=i},scale:t,type:"text",value:this.value}))))}static get delegatesFocus(){return!0}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{items:["watchItemsHandler"],messageOverrides:["onMessagesChange"],value:["valueHandler"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return Ft}},[17,"calcite-filter",{items:[1040],disabled:[516],filteredItems:[1040],placeholder:[1],scale:[513],value:[1025],messages:[1040],messageOverrides:[1040],effectiveLocale:[32],defaultMessages:[32],setFocus:[64]}]);function V(){if(typeof customElements=="undefined")return;["calcite-filter","calcite-icon","calcite-input","calcite-progress"].forEach(t=>{switch(t){case"calcite-filter":customElements.get(t)||customElements.define(t,kt);break;case"calcite-icon":customElements.get(t)||$();break;case"calcite-input":customElements.get(t)||z();break;case"calcite-progress":customElements.get(t)||P();break}})}V();/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */const f={container:"container",table:"table",scrim:"scrim",tableContainer:"table-container",sticky:"sticky-pos"},Dt=100,jt="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{position:relative}.table-container{position:relative;z-index:1;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}::slotted(calcite-list-item){margin-block-end:1px;--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}::slotted(calcite-list-item:last-child){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.sticky-pos{position:sticky;inset-block-start:0px;z-index:300}calcite-filter{margin-block-end:1px}",C="calcite-list-item",W=F(class extends k{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteListFilter=D(this,"calciteListFilter",6),this.listItems=[],this.enabledListItems=[],this.mutationObserver=J("mutation",()=>this.updateListItems()),this.handleDefaultSlotChange=e=>{Q(N(e))},this.setActiveListItem=()=>{const{enabledListItems:e}=this;e.some(t=>t.active)||e[0]&&(e[0].active=!0)},this.updateSelectedItems=p(()=>{this.selectedItems=this.enabledListItems.filter(e=>e.selected)},Dt),this.updateFilteredItems=p(()=>{const{listItems:e,filteredData:t,filterText:i}=this,n=t.map(r=>r.value),a=new Set,l=(e==null?void 0:e.filter(r=>{const c=r.parentElement;c.matches("calcite-list-item-group")&&a.add(c);const o=i?n.includes(r.value):!0;return r.hidden=!o,o}))||[];this.filteredItems=l,a.forEach(r=>{const c=l.some(o=>r.contains(o));if(r.hidden=!c,!c)return;const d=r.closest("calcite-list-item");d&&(d.hidden=!1,l.includes(d)&&Array.from(r.querySelectorAll("calcite-list-item")).forEach(o=>o.hidden=!1))}),a.clear()}),this.handleFilter=e=>{e.stopPropagation();const{filteredItems:t,value:i}=e.currentTarget;this.filteredData=t,this.filterText=i,this.updateFilteredItems(),this.calciteListFilter.emit()},this.getItemData=()=>this.listItems.map(e=>({label:e.label,description:e.description,metadata:e.metadata,value:e.value})),this.queryListItems=()=>Array.from(this.el.querySelectorAll(C)),this.focusRow=e=>{const{enabledListItems:t}=this;!e||(t.forEach(i=>i.active=i===e),e.setFocus())},this.isNavigable=e=>{var i;const t=(i=e.parentElement)==null?void 0:i.closest(C);return t?t.open&&this.isNavigable(t):!0},this.handleListKeydown=e=>{const{key:t}=e,i=this.enabledListItems.filter(a=>this.isNavigable(a)),n=i.findIndex(a=>a.active);if(t==="ArrowDown"){e.preventDefault();const a=n+1;i[a]&&this.focusRow(i[a])}else if(t==="ArrowUp"){e.preventDefault();const a=n-1;i[a]&&this.focusRow(i[a])}else if(t==="Home"){e.preventDefault();const a=i[0];a&&this.focusRow(a)}else if(t==="End"){e.preventDefault();const a=i[i.length-1];a&&this.focusRow(a)}},this.disabled=!1,this.filterEnabled=!1,this.filteredItems=[],this.filteredData=[],this.filterPlaceholder=void 0,this.filterText=void 0,this.label=void 0,this.loading=!1,this.openable=!1,this.selectedItems=[],this.selectionMode="none",this.selectionAppearance="icon",this.dataForFilter=[]}handleFilterEnabledChange(){this.updateListItems()}handleSelectionAppearanceChange(){this.updateListItems()}handleCalciteInternalFocusPreviousItem(e){e.stopPropagation();const{enabledListItems:t}=this,n=t.findIndex(a=>a.active)-1;t[n]&&this.focusRow(t[n])}handleCalciteListItemActive(e){const t=e.target,{listItems:i}=this;i.forEach(n=>{n.active=n===t})}handleCalciteListItemSelect(e){const t=e.target,{listItems:i,selectionMode:n}=this;i.forEach(a=>{n==="single"&&(a.selected=a===t)}),this.updateSelectedItems()}connectedCallback(){var e;(e=this.mutationObserver)==null||e.observe(this.el,{childList:!0,subtree:!0}),this.updateListItems()}disconnectedCallback(){var e;(e=this.mutationObserver)==null||e.disconnect()}componentWillLoad(){S(this)}componentDidRender(){j(this)}componentDidLoad(){_(this);const{filterEl:e}=this,t=e==null?void 0:e.filteredItems;t&&(this.filteredData=t),this.updateFilteredItems()}async setFocus(){var e;await O(this),(e=this.enabledListItems.find(t=>t.active))==null||e.setFocus()}render(){const{loading:e,label:t,disabled:i,dataForFilter:n,filterEnabled:a,filterPlaceholder:l,filterText:r}=this;return u("div",{class:f.container},e?u("calcite-scrim",{class:f.scrim,loading:e}):null,u("table",{"aria-busy":Z(e),"aria-label":t||"",class:f.table,onKeyDown:this.handleListKeydown,role:"treegrid"},a?u("thead",null,u("tr",{class:{[f.sticky]:!0}},u("th",{colSpan:ee},u("calcite-filter",{"aria-label":l,disabled:e||i,items:n,onCalciteFilterChange:this.handleFilter,placeholder:l,ref:c=>this.filterEl=c,value:r})))):null,u("tbody",{class:f.tableContainer},u("slot",{onSlotchange:this.handleDefaultSlotChange}))))}updateListItems(){const{selectionAppearance:e,selectionMode:t}=this,i=this.queryListItems();i.forEach(n=>{n.selectionAppearance=e,n.selectionMode=t}),this.listItems=i,this.enabledListItems=i.filter(n=>!n.disabled),this.filterEnabled&&(this.dataForFilter=this.getItemData()),this.setActiveListItem(),this.updateSelectedItems(),this.updateFilteredItems()}get el(){return this}static get watchers(){return{filterEnabled:["handleFilterEnabledChange"],selectionMode:["handleSelectionAppearanceChange"],selectionAppearance:["handleSelectionAppearanceChange"]}}static get style(){return jt}},[1,"calcite-list",{disabled:[516],filterEnabled:[516,"filter-enabled"],filteredItems:[1040],filteredData:[1040],filterPlaceholder:[513,"filter-placeholder"],filterText:[1537,"filter-text"],label:[1],loading:[516],openable:[4],selectedItems:[1040],selectionMode:[513,"selection-mode"],selectionAppearance:[513,"selection-appearance"],dataForFilter:[32],setFocus:[64]},[[0,"calciteInternalFocusPreviousItem","handleCalciteInternalFocusPreviousItem"],[0,"calciteInternalListItemActive","handleCalciteListItemActive"],[0,"calciteInternalListItemSelect","handleCalciteListItemSelect"]]]);function X(){if(typeof customElements=="undefined")return;["calcite-list","calcite-filter","calcite-icon","calcite-input","calcite-loader","calcite-progress","calcite-scrim"].forEach(t=>{switch(t){case"calcite-list":customElements.get(t)||customElements.define(t,W);break;case"calcite-filter":customElements.get(t)||V();break;case"calcite-icon":customElements.get(t)||$();break;case"calcite-input":customElements.get(t)||z();break;case"calcite-loader":customElements.get(t)||de();break;case"calcite-progress":customElements.get(t)||P();break;case"calcite-scrim":customElements.get(t)||ue();break}})}X();const Wt=W,Xt=X;export{Wt as CalciteList,Xt as defineCustomElement};