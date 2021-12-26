import{mH as s,mJ as i,mK as o,mL as r}from"./index.988b09cd.js";import{g as l,C as c}from"./dom.f3750ae1.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 *//*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const m={container:"container"},d="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([alignment=start]),:host([alignment=end]) .calcite--rtl{text-align:left}:host([alignment=end]),:host([alignment=start]) .calcite--rtl{text-align:right}:host([alignment=center]){text-align:center}:host([scale=s]) .container{font-size:var(--calcite-font-size--2);line-height:1rem;margin-bottom:0.5rem}:host([scale=m]) .container{font-size:var(--calcite-font-size--1);line-height:1rem;margin-bottom:0.75rem}:host([scale=l]) .container{font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-bottom:1rem}:host .container{color:var(--calcite-ui-text-1);cursor:pointer;width:100%;margin-top:0;margin-right:0;margin-left:0;line-height:1.375}:host([layout=default]) .container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;grid-gap:0.25rem;gap:0.25rem}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-direction:row;flex-direction:row;grid-gap:0.5rem;gap:0.5rem}:host([layout=inline][scale=l]) .container{grid-gap:0.75rem;gap:0.75rem}:host([layout=inline-space-between]) .container{-ms-flex-pack:justify;justify-content:space-between}:host([disabled])>.container{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) ::slotted(*){pointer-events:none}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--bg-opacity:1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--bg-opacity:0}:host([disable-spacing]) .container{grid-gap:0;gap:0;margin:0}";let e=class extends HTMLElement{constructor(){super();this.__registerHost(),this.__attachShadow(),this.calciteInternalLabelClick=s(this,"calciteInternalLabelClick",3),this.alignment="start",this.status="idle",this.scale="m",this.layout="default",this.disableSpacing=!1,this.disabled=!1,this.labelClickHandler=t=>{this.calciteInternalLabelClick.emit({sourceEvent:t})}}render(){const t=l(this.el);return i(o,{onClick:this.labelClickHandler},i("div",{class:{[m.container]:!0,[c.rtl]:t==="rtl"}},i("slot",null)))}get el(){return this}static get style(){return d}};e=r(e,[1,"calcite-label",{alignment:[513],status:[513],for:[513],scale:[513],layout:[513],disableSpacing:[4,"disable-spacing"],disabled:[516]}]);function n(){["calcite-label"].forEach(a=>{switch(a){case"calcite-label":customElements.get(a)||customElements.define(a,e);break}})}n();/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const k=e,w=n;export{k as CalciteLabel,w as defineCustomElement};