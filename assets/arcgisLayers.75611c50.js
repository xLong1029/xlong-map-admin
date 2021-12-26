var C=Object.defineProperty,j=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var L=(e,r,n)=>r in e?C(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,f=(e,r)=>{for(var n in r||(r={}))F.call(r,n)&&L(e,n,r[n]);if(w)for(var n of w(r))N.call(r,n)&&L(e,n,r[n]);return e},p=(e,r)=>j(e,x(r));import{r as v,lc as J,t as O,an as U,ld as V,le as M,dy as k,bb as E}from"./index.988b09cd.js";import{a as A}from"./lazyLayerLoader.4936de2f.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */async function ee(e){var r;const n=(r=e.properties)==null?void 0:r.customParameters,t=await z(e.url,n),a=p(f({},e.properties),{url:e.url});if(!t.sublayerIds)return t.layerOrTableId!=null&&(a.layerId=t.layerOrTableId,a.sourceJSON=t.sourceJSON),new t.Constructor(a);const l=new(await import("./index.988b09cd.js").then(function(o){return o.tA})).default({title:t.parsedUrl.title});return q(l,t,a),l}function T(e,r){return e?e.find(n=>n.id===r):null}function q(e,r,n){function t(a,l){const o=p(f({},n),{layerId:a,sublayerTitleMode:"service-name"});return v(l)&&(o.sourceJSON=l),new r.Constructor(o)}r.sublayerIds.forEach(a=>{const l=t(a,T(r.sublayerInfos,a));e.add(l)}),r.tableIds.forEach(a=>{const l=t(a,T(r.tableInfos,a));e.tables.add(l)})}async function z(e,r){let n=J(e);if(O(n)&&(n=await B(e,r)),O(n))throw new U("arcgis-layers:url-mismatch","The url '${url}' is not a valid arcgis resource",{url:e});const{serverType:t,sublayer:a}=n;let l;const o={FeatureServer:"FeatureLayer",StreamServer:"StreamLayer",VectorTileServer:"VectorTileLayer"};switch(t){case"MapServer":l=a!=null?"FeatureLayer":X(e,r).then(s=>s?"TileLayer":"MapImageLayer");break;case"ImageServer":l=c(e,r).then(s=>{const d=s.tileInfo&&s.tileInfo.format;return s.tileInfo?!d||d.toUpperCase()!=="LERC"||s.cacheType&&s.cacheType.toLowerCase()!=="elevation"?"ImageryTileLayer":"ElevationLayer":"ImageryLayer"});break;case"SceneServer":l=c(n.url.path,r).then(s=>{if(s){if((s==null?void 0:s.layerType)==="Voxel")return"VoxelLayer";if(s!=null&&s.layers&&Array.isArray(s.layers)&&s.layers.length>0){var d;const m={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"},h=(d=s.layers[0])==null?void 0:d.layerType;if(m[h]!=null)return m[h]}}return"SceneLayer"});break;default:l=o[t]}const i={FeatureLayer:!0,SceneLayer:!0},y=t==="FeatureServer",u={parsedUrl:n,Constructor:null,layerOrTableId:y?a:null,sublayerIds:null,tableIds:null},b=await l;if(i[b]&&a==null){const s=await R(e,t,r);if(y&&(u.sublayerInfos=s.layerInfos,u.tableInfos=s.tableInfos),s.layerIds.length+s.tableIds.length!==1)u.sublayerIds=s.layerIds,u.tableIds=s.tableIds;else if(y){var I,S;u.layerOrTableId=(I=s.layerIds[0])!=null?I:s.tableIds[0],u.sourceJSON=(S=s.layerInfos[0])!=null?S:s.tableInfos[0]}}return u.Constructor=await G(b),u}async function B(e,r){var n;const t=await c(e,r);let a=null,l=null;const o=t.type;if(o==="Feature Layer"||o==="Table"?(a="FeatureServer",l=t.id):o==="indexedVector"?a="VectorTileServer":t.hasOwnProperty("mapName")?a="MapServer":t.hasOwnProperty("bandCount")&&t.hasOwnProperty("pixelSizeX")?a="ImageServer":t.hasOwnProperty("maxRecordCount")&&t.hasOwnProperty("allowGeometryUpdates")?a="FeatureServer":t.hasOwnProperty("streamUrls")?a="StreamServer":g(t)?(a="SceneServer",l=t.id):t.hasOwnProperty("layers")&&g((n=t.layers)==null?void 0:n[0])&&(a="SceneServer"),!a)return null;const i=l!=null?V(e):null;return{title:v(i)&&t.name||M(e),serverType:a,sublayer:l,url:{path:v(i)?i.serviceUrl:k(e).path}}}function g(e){return(e==null?void 0:e.hasOwnProperty("store"))&&e.hasOwnProperty("id")&&typeof e.id=="number"}async function R(e,r,n){var t,a;let l,o=!1;if(r==="FeatureServer"){const u=await D(e,n);o=!!u.layersJSON,l=u.layersJSON||u.serviceJSON}else l=await c(e,n);const i=(t=l)==null?void 0:t.layers,y=(a=l)==null?void 0:a.tables;return{layerIds:(i==null?void 0:i.map(u=>u.id).reverse())||[],tableIds:(y==null?void 0:y.map(u=>u.id).reverse())||[],layerInfos:o?i:[],tableInfos:o?y:[]}}function P(e){return!e.type||e.type==="Feature Layer"}async function D(e,r){var n,t;let a=await c(e,r);a=a||{},a.layers=((n=a.layers)==null?void 0:n.filter(P))||[];const l={serviceJSON:a};if(a.currentVersion<10.5)return l;const o=await c(e+"/layers",r);return l.layersJSON={layers:(o==null||(t=o.layers)==null?void 0:t.filter(P))||[],tables:(o==null?void 0:o.tables)||[]},l}async function G(e){return(0,A[e])()}async function X(e,r){return(await c(e,r)).tileInfo}async function c(e,r){return(await E(e,{responseType:"json",query:f({f:"json"},r)})).data}export{ee as fromUrl};