import{q3 as M,q4 as C,cL as I}from"./index.988b09cd.js";import{CIMSymbolRasterizer as z}from"./CIMSymbolRasterizer.485e3a31.js";import{l as S}from"./renderUtils.23c8b0c8.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */import"./cimAnalyzer.644bcc6c.js";import"./CIMSymbolHelper.2f431254.js";import"./BidiEngine.aae60613.js";import"./definitions.21e97413.js";import"./number.dfbabd3f.js";import"./GeometryUtils.d4e26b77.js";import"./Rasterizer.994ba421.js";import"./colorUtils.92e1b957.js";const x=new z(null,!0),v=120;async function T(e,t={}){const{size:c,maxSize:d,node:f,opacity:y}=t,h=t.cimOptions||t,{feature:u,fieldMap:j,geometryType:g,style:w}=h,b=M(e),i=Math.min(c!=null?c:b,d!=null?d:I(v));i!==b&&(e=e.clone(),C(e,i,{preserveOutlineWidth:!0}));let s=3;e&&e.data&&e.data.symbol&&e.data.symbol.type!=="CIMPointSymbol"&&(s=1);const m=await x.rasterizeCIMSymbolAsync(e,u,j,g,{scaleFactor:s,style:w}),a=document.createElement("canvas");a.width=m.imageData.width,a.height=m.imageData.height,a.getContext("2d").putImageData(m.imageData,0,0);let l=a.width/s,r=a.height/s;if(c!=null&&((t==null?void 0:t.scale)==null||(t==null?void 0:t.scale))){const o=l/r;l=o<=1?Math.ceil(i*o):i,r=o<=1?i:Math.ceil(i/o)}const n=new Image(l,r);n.src=a.toDataURL(),y!=null&&(n.style.opacity=`${y}`);let p=n;if(t.effectView!=null){const o={shape:{type:"image",x:0,y:0,width:l,height:r,src:n.src},fill:null,stroke:null,offset:[0,0]};p=S([[o]],[l,r],{effectView:t.effectView})}return f&&f.appendChild(p),p}export{T as previewCIMSymbol};