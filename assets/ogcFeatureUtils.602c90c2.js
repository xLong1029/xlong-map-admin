import{ae as E,i as y,aD as g,by as T,ri as _,fj as Q,dj as j,rG as U,ad as H,r as k,f9 as V,eP as X,gB as W,qD as Y,rH as ee}from"./index.a33ecea7.js";import{T as te,L as ne,I as ie}from"./geojson.9a4fcbb9.js";import{o as ae}from"./clientSideDefaults.cc23896a.js";const O=E.getLogger("esri.layers.graphics.sources.ogcfeature"),D="http://www.opengis.net/def/crs/",pe=`${D}OGC/1.3/CRS84`;async function ge(e,n,t={},i=5){const{links:r}=e,l=f(r,"items","application/geo+json")||f(r,"http://www.opengis.net/def/rel/ogc/1.0/items","application/geo+json");if(y(l))throw new g("ogc-feature-layer:missing-items-page","Missing items url");const{data:c}=await T(l.href,{signal:t.signal,query:{limit:i,...t.customParameters,token:t.apiKey},headers:{accept:"application/geo+json"}});await te(c);const s=ne(c,{geometryType:n.geometryType}),u=n.fields||s.fields||[],x=n.hasZ!=null?n.hasZ:s.hasZ,F=s.geometryType,m=n.objectIdField||s.objectIdFieldName||"OBJECTID";let o=n.timeInfo;const w=u.find(({name:a})=>a===m);if(w)w.editable=!1,w.nullable=!1;else{if(!s.objectIdFieldType)throw new g("ogc-feature-layer:missing-feature-id","Collection geojson require a feature id as a unique identifier");u.unshift({name:m,alias:m,type:s.objectIdFieldType==="number"?"esriFieldTypeOID":"esriFieldTypeString",editable:!1,nullable:!1})}if(m!==s.objectIdFieldName){const a=u.find(({name:d})=>d===s.objectIdFieldName);a&&(a.type="esriFieldTypeInteger")}u===s.fields&&s.unknownFields.length>0&&O.warn({name:"ogc-feature-layer:unknown-field-types",message:"Some fields types couldn't be inferred from the features and were dropped",details:{unknownFields:s.unknownFields}});for(const a of u){if(a.name==null&&(a.name=a.alias),a.alias==null&&(a.alias=a.name),a.type!=="esriFieldTypeOID"&&a.type!=="esriFieldTypeGlobalID"&&(a.editable=a.editable==null||!!a.editable,a.nullable=a.nullable==null||!!a.nullable),!a.name)throw new g("ogc-feature-layer:invalid-field-name","field name is missing",{field:a});if(!_.jsonValues.includes(a.type))throw new g("ogc-feature-layer:invalid-field-type",`invalid type for field "${a.name}"`,{field:a})}if(o){const a=new Q(u);if(o.startTimeField){const d=a.get(o.startTimeField);d?(o.startTimeField=d.name,d.type="esriFieldTypeDate"):o.startTimeField=null}if(o.endTimeField){const d=a.get(o.endTimeField);d?(o.endTimeField=d.name,d.type="esriFieldTypeDate"):o.endTimeField=null}if(o.trackIdField){const d=a.get(o.trackIdField);d?o.trackIdField=d.name:(o.trackIdField=null,O.warn({name:"ogc-feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:o}}))}o.startTimeField||o.endTimeField||(O.warn({name:"ogc-feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing",details:{timeInfo:o}}),o=null)}return{drawingInfo:F?ae(F):null,extent:de(e),geometryType:F,fields:u,hasZ:!!x,objectIdField:m,timeInfo:o}}async function ye(e,n={}){const{links:t}=e,i=f(t,"data","application/json")||f(t,"http://www.opengis.net/def/rel/ogc/1.0/data","application/json");if(y(i))throw new g("ogc-feature-layer:missing-collections-page","Missing collections url");const{apiKey:r,customParameters:l,signal:c}=n,{data:s}=await T(i.href,{signal:c,headers:{accept:"application/json"},query:{...l,token:r}});return s}async function we(e,n={}){const{links:t}=e,i=f(t,"conformance","application/json")||f(t,"http://www.opengis.net/def/rel/ogc/1.0/conformance","application/json");if(y(i))throw new g("ogc-feature-layer:missing-conformance-page","Missing conformance url");const{apiKey:r,customParameters:l,signal:c}=n,{data:s}=await T(i.href,{signal:c,headers:{accept:"application/json"},query:{...l,token:r}});return s}async function be(e,n={}){const{apiKey:t,customParameters:i,signal:r}=n,{data:l}=await T(e,{signal:r,headers:{accept:"application/json"},query:{...i,token:t}});return l}async function he(e,n={}){const t="application/vnd.oai.openapi+json;version=3.0",i=f(e.links,"service-desc",t);if(y(i))return O.warn("ogc-feature-layer:missing-openapi-page","The OGC API-Features server does not have an OpenAPI page."),null;const{apiKey:r,customParameters:l,signal:c}=n,{data:s}=await T(i.href,{signal:c,headers:{accept:t},query:{...l,token:r}});return s}function Fe(e){var r;const n=(r=/^http:\/\/www\.opengis.net\/def\/crs\/(?<authority>.*)\/(?<version>.*)\/(?<code>.*)$/i.exec(e))==null?void 0:r.groups;if(!n)return null;const{authority:t,code:i}=n;switch(t.toLowerCase()){case"ogc":switch(i.toLowerCase()){case"crs27":return j.GCS_NAD_1927.wkid;case"crs83":return 4269;case"crs84":case"crs84h":return j.WGS84.wkid;default:return null}case"esri":case"epsg":{const l=Number.parseInt(i,10);return Number.isNaN(l)?null:l}default:return null}}async function Ie(e,n,t){const i=await se(e,n,t);return U(i)}async function se(e,n,t){const{collection:i,layerDefinition:r,maxRecordCount:l,queryParameters:{apiKey:c,customParameters:s},spatialReference:u,supportedCrs:x}=e,{links:F}=i,m=f(F,"items","application/geo+json")||f(F,"http://www.opengis.net/def/rel/ogc/1.0/items","application/geo+json");if(y(m))throw new g("ogc-feature-layer:missing-items-page","Missing items url");const{geometry:o,num:w,start:a,timeExtent:d,where:R}=n;if(n.objectIds)throw new g("ogc-feature-layer:query-by-objectids-not-supported","Queries with objectids are not supported");const Z=j.fromJSON(u),I=H(n.outSpatialReference,Z),S=I.isWGS84?null:P(I,x),K=ce(o,x),L=oe(d),J=le(R),A=w!=null?w:a!=null&&a!==void 0?10:l,{data:b}=await T(m.href,{...t,query:{...s,...K,crs:S,datetime:L,query:J,limit:A,startindex:a,token:c},headers:{accept:"application/geo+json"}});let v=!1;b.links&&(v=!!b.links.find(q=>q.rel==="next")),!v&&Number.isInteger(b.numberMatched)&&Number.isInteger(b.numberReturned)&&(v=b.numberReturned<b.numberMatched);const{fields:z,geometryType:N,hasZ:$,objectIdField:C}=r,G=ie(b,{geometryType:N,hasZ:$,objectIdField:C});if(!S&&I.isWebMercator){for(const h of G)if(k(h.geometry)&&N!=null){const q=V(h.geometry,N,$,!1);q.spatialReference=j.WGS84,h.geometry=X(W(q,I))}}for(const h of G)h.objectId=h.attributes[C];const B=S||!S&&I.isWebMercator?I.toJSON():Y,p=new ee;return p.exceededTransferLimit=v,p.features=G,p.fields=z,p.geometryType=N,p.hasZ=$,p.objectIdFieldName=C,p.spatialReference=B,p}function re(e){return k(e)&&e.type==="extent"}function P(e,n){var l,c,s;const{isWebMercator:t,wkid:i}=e;if(!i)return null;const r=t?(s=(c=(l=n[3857])!=null?l:n[102100])!=null?c:n[102113])!=null?s:n[900913]:n[e.wkid];return r?`${D}${r}`:null}function M(e){if(y(e))return"";const{xmin:n,ymin:t,xmax:i,ymax:r}=e;return`${n},${t},${i},${r}`}function oe(e){if(y(e))return null;const{start:n,end:t}=e;return`${k(n)?n.toISOString():".."}/${k(t)?t.toISOString():".."}`}function le(e){return y(e)||!e||e==="1=1"?null:e}function ce(e,n){if(!re(e))return null;const{spatialReference:t}=e;if(!t||t.isWGS84)return{bbox:M(e)};const i=P(t,n);return k(i)?{bbox:M(e),"bbox-crs":i}:t.isWebMercator?{bbox:M(W(e,j.WGS84))}:null}function de(e){var s;const n=(s=e.extent)==null?void 0:s.spatial;if(!n)return null;const t=n.bbox[0],i=t.length===4,r=t[0],l=t[1],c=i?void 0:t[2];return{xmin:r,ymin:l,xmax:i?t[2]:t[3],ymax:i?t[3]:t[4],zmin:c,zmax:i?void 0:t[5],spatialReference:j.WGS84.toJSON()}}function f(e,n,t){return e.find(i=>i.rel===n&&i.type===t)||e.find(i=>i.rel===n&&!i.type)}export{pe as F,ge as I,Ie as N,he as S,ye as T,D as j,we as k,se as q,Fe as v,be as x};