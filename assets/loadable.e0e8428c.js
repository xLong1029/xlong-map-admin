/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */const n=new WeakMap,o=new WeakMap;function a(e){o.set(e,new Promise(t=>n.set(e,t)))}function s(e){n.get(e)()}function p(e){return o.get(e)}export{s as a,p as c,a as s};
