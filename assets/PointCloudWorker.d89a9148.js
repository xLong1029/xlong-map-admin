import{gr as v,b1 as b,hg as A,ar as h,cA as g,ei as S,gH as y,gJ as D,jE as m}from"./vendor.47ccae81.js";import{c as M,a as c,u as j,m as w}from"./PointCloudWorkerUtil.21f4a9f7.js";import"./PointCloudUniqueValueRenderer.90bd6b4d.js";import"./I3SBinaryReader.c42f51a5.js";class z{transform(t){const a=this._transform(t),e=[a.points.buffer,a.rgb.buffer];b(a.pointIdFilterMap)&&e.push(a.pointIdFilterMap.buffer);for(const r of a.attributes)"buffer"in r.values&&A(r.values.buffer)&&r.values.buffer!==a.rgb.buffer&&e.push(r.values.buffer);return Promise.resolve({result:a,transferList:e})}_transform(t){const a=M(t.schema,t.geometryBuffer);let e=a.length/3,r=null;const i=[],f=c(t.primaryAttributeData,a,e);b(t.primaryAttributeData)&&f&&i.push({attributeInfo:t.primaryAttributeData.attributeInfo,values:f});const n=c(t.modulationAttributeData,a,e);b(t.modulationAttributeData)&&n&&i.push({attributeInfo:t.modulationAttributeData.attributeInfo,values:n});let s=j(t.rendererInfo,f,n,e);if(t.filterInfo&&t.filterInfo.length>0&&b(t.filterAttributesData)){const o=t.filterAttributesData.map(l=>{const d=c(l,a,e),p={attributeInfo:l.attributeInfo,values:d};return i.push(p),p});r=new Uint32Array(e),e=w(a,s,r,t.filterInfo,o)}for(const o of t.userAttributesData){const l=c(o,a,e);i.push({attributeInfo:o.attributeInfo,values:l})}3*e<s.length&&(s=new Uint8Array(s.buffer.slice(0,3*e))),this._applyElevationOffsetInPlace(a,e,t.elevationOffset);const u=this._transformCoordinates(a,e,t.obb,h.fromJSON(t.inSR),h.fromJSON(t.outSR));return{obb:t.obb,points:u,rgb:s,attributes:i,pointIdFilterMap:r}}_transformCoordinates(t,a,e,r,i){if(!g(t,r,0,t,i,0,a))throw Error("Can't reproject");const f=S(e.center[0],e.center[1],e.center[2]),n=m(),s=m();y(I,e.quaternion);const u=new Float32Array(3*a);for(let o=0;o<a;o++)n[0]=t[3*o]-f[0],n[1]=t[3*o+1]-f[1],n[2]=t[3*o+2]-f[2],D(s,n,I),e.halfSize[0]=Math.max(e.halfSize[0],Math.abs(s[0])),e.halfSize[1]=Math.max(e.halfSize[1],Math.abs(s[1])),e.halfSize[2]=Math.max(e.halfSize[2],Math.abs(s[2])),u[3*o]=n[0],u[3*o+1]=n[1],u[3*o+2]=n[2];return u}_applyElevationOffsetInPlace(t,a,e){if(e!==0)for(let r=0;r<a;r++)t[3*r+2]+=e}}const I=v();function E(){return new z}export{E as default};