import{gu as p,qs as d,an as n,bb as h,r as u,qt as b,a6 as w,qu as v}from"./index.988b09cd.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */let i=a();function a(){return new p(50)}function k(){i=a()}function O(e,r){if(e.type==="icon")return y(e,r);if(e.type==="object")return m(e,r);throw new n("symbol3d:unsupported-symbol-layer","computeLayerSize only works with symbol layers of type Icon and Object")}async function R(e,r){if(e.type==="icon")return j(e,r);if(e.type==="object")return x(e,r);throw new n("symbol3d:unsupported-symbol-layer","computeLayerSize only works with symbol layers of type Icon and Object")}async function y(e,r){if(e.resource.href)return z(e.resource.href).then(t=>[t.width,t.height]);if(e.resource.primitive)return u(r)?[r,r]:[256,256];throw new n("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function j(e,r){return y(e,r).then(t=>{if(e.size==null)return t;const o=t[0]/t[1];return o>1?[e.size,e.size/o]:[e.size*o,e.size]})}function z(e){return h(e,{responseType:"image"}).then(r=>r.data)}function m(e,r){return g(e,r).then(t=>d(t))}async function x(e,r){const t=await m(e,r);return b(t,e)}async function g(e,r){if(!e.isPrimitive){const o=e.resource.href,s=i.get(o);if(s!==void 0)return Promise.resolve(s);const f=await import("./index.988b09cd.js").then(function(l){return l.tx}),c=await f.fetch(o,{disableTextures:!0});return i.put(o,c.referenceBoundingBox),c.referenceBoundingBox}let t=null;if(e.resource&&e.resource.primitive&&(t=w(v(e.resource.primitive)),u(r)))for(let o=0;o<t.length;o++)t[o]*=r;return t?Promise.resolve(t):Promise.reject(new n("symbol:invalid-resource","The symbol does not have a valid resource"))}export{k as clearBoundingBoxCache,y as computeIconLayerResourceSize,O as computeLayerResourceSize,R as computeLayerSize,m as computeObjectLayerResourceSize};