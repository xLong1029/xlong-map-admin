import{sa as c}from"./index.a33ecea7.js";import{c as i}from"./observers.9780c1c0.js";/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */const n=new Set;let e;const s={childList:!0};function f(o){e||(e=i("mutation",r)),e.observe(o.el,s)}function l(o){n.delete(o.el),r(e.takeRecords()),e.disconnect();for(const[t]of n.entries())e.observe(t,s)}function r(o){o.forEach(({target:t})=>{c(t)})}export{f as c,l as d};
