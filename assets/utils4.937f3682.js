/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */function r(n){for(let t=n;t;t=o(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=o(n);t;t=o(t)){if(!(t instanceof Element))continue;const e=getComputedStyle(t);if(e.display!=="contents"&&(e.position!=="static"||e.filter!=="none"||t.tagName==="BODY"))return t}return null}function o(n){return n.assignedSlot?n.assignedSlot:n.parentNode instanceof ShadowRoot?n.parentNode.host:n.parentNode}export{r as offsetParent};
