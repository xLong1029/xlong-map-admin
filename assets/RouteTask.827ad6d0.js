var v=Object.defineProperty,j=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var d=(r,e,t)=>e in r?v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,c=(r,e)=>{for(var t in e||(e={}))S.call(e,t)&&d(r,t,e[t]);if(B)for(var t of B(e))k.call(e,t)&&d(r,t,e[t]);return r},m=(r,e)=>j(r,w(e));import{mb as N,id as R,cS as P,aW as T,aY as q,mc as x}from"./vendor.70daa49e.js";import{u as p,d as M,b as W,p as C,f as E,o as G}from"./networkService.989ee5d4.js";import"./GPMessage.76e85221.js";const K=G({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,directionsTimeAttribute:{name:"directionsTimeAttributeName"},impedanceAttribute:{name:"impedanceAttributeName"},outSpatialReference:{name:"outSR",getter:r=>r.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},stops:!0,travelMode:!0});async function Q(r,e,t){const f=[],i=[],a={},o={},y=N(r),{path:n}=y;e.stops&&e.stops.features&&p(e.stops.features,i,"stops.features",a),e.pointBarriers&&e.pointBarriers.features&&p(e.pointBarriers.features,i,"pointBarriers.features",a),e.polylineBarriers&&e.polylineBarriers.features&&p(e.polylineBarriers.features,i,"polylineBarriers.features",a),e.polygonBarriers&&e.polygonBarriers.features&&p(e.polygonBarriers.features,i,"polygonBarriers.features",a);const b=await R(i);for(const s in a){const u=a[s];f.push(s),o[s]=b.slice(u[0],u[1])}if(M(o,f)){let s=null;try{s=await W(n,e.apiKey,t)}catch{}s&&!s.hasZ&&C(o,f)}for(const s in o)o[s].forEach((u,$)=>{e.get(s)[$].geometry=u});const g=m(c({},t),{query:m(c(c({},y.query),K.toQueryParams(e)),{f:"json"})}),A=n.endsWith("/solve")?n:`${n}/solve`,h=await P(A,g);return E(h)}let l=class extends x{constructor(r){super(r)}solve(r,e){return Q(this.url,r,e)}};l=T([q("esri.tasks.RouteTask")],l);const D=l;export{D as default};