var O=Object.defineProperty,I=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var x=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))j.call(t,r)&&x(e,r,t[r]);if(f)for(var r of f(t))E.call(t,r)&&x(e,r,t[r]);return e},c=(e,t)=>I(e,M(t));import{t6 as N,tu as P,t7 as J,u2 as L,u3 as T,mh as q,mi as F,mj as U,mk as k,t8 as R,tb as A,ts as z,dk as K,b9 as V,a$ as W,e3 as C,u4 as S,u5 as w,u6 as D,c3 as $,cS as v,b7 as G,bQ as H,nO as B,td as _,aW as i,aX as n,gM as Q,eT as X,u7 as Y,gN as Z,mo as ee,aY as te}from"./vendor.70daa49e.js";import{c as re}from"./ExportImageParameters.dc11e236.js";let s=class extends N(P(J(L(T(q(F(U(k(R(A(z(K(V))))))))))))){constructor(...e){super(...e),this.datesInUnknownTimezone=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.isReference=null,this.labelsVisible=!1,this.operationalLayerType="ArcGISMapServiceLayer",this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,t){return typeof e=="string"?p({url:e},t):e}load(e){const t=W(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(C).then(()=>this._fetchService(t))),Promise.resolve(this)}readImageFormat(e,t){const r=t.supportedImageFormatTypes;return r&&r.indexOf("PNG32")>-1?"png32":"png24"}writeSublayers(e,t,r,a){if(!this.loaded||!e)return;const u=e.slice().reverse().flatten(({sublayers:o})=>o&&o.toArray().reverse()).toArray();let l=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&this.capabilities.exportMap.supportsDynamicLayers){const o=S(a.origin);if(o===3){const d=this.createSublayersForOrigin("service").sublayers;l=w(u,d,2)}else if(o>3){const d=this.createSublayersForOrigin("portal-item");l=w(u,d.sublayers,S(d.origin))}}const y=[],h=p({writeSublayerStructure:l},a);let m=l;u.forEach(o=>{const d=o.write({},h);y.push(d),m=m||o.originOf("visible")==="user"}),y.some(o=>Object.keys(o).length>1)&&(t.layers=y),m&&(t.visibleLayers=u.filter(o=>o.visible).map(o=>o.id))}createExportImageParameters(e,t,r,a){const u=a&&a.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const l=new re({layer:this,floors:a==null?void 0:a.floors,scale:D({extent:e,width:t})*u}),y=l.toJSON();l.destroy();const h=!a||!a.rotation||this.version<10.3?{}:{rotation:-a.rotation},m=e&&e.spatialReference,o=m.wkid||JSON.stringify(m.toJSON());y.dpi*=u;const d={};if(a!=null&&a.timeExtent){const{start:g,end:b}=a.timeExtent.toJSON();d.time=g&&b&&g===b?""+g:`${g==null?"null":g},${b==null?"null":b}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(d.time="null,null");return p(p(p({bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:o,imageSR:o,size:t+","+r},y),h),d)}async fetchImage(e,t,r,a){var u;const l={responseType:"image",signal:(u=a==null?void 0:a.signal)!=null?u:null,query:c(p(p(c(p(p({},this.parsedUrl.query),this.createExportImageParameters(e,t,r,a)),{f:"image"}),this.refreshParameters),this.customParameters),{token:this.apiKey})},y=this.parsedUrl.path+"/export";return l.query.dynamicLayers!=null&&!this.capabilities.exportMap.supportsDynamicLayers?Promise.reject(new $("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:l.query})):v(y,l).then(h=>h.data).catch(h=>{throw G(h)?h:new $("mapimagelayer:image-fetch-error",`Unable to load image: ${y}`,{error:h})})}async fetchRecomputedExtents(e={}){const t=c(p({},e),{query:c(p({returnUpdates:!0,f:"json"},this.customParameters),{token:this.apiKey})}),{data:r}=await v(this.url,t),{extent:a,fullExtent:u,timeExtent:l}=r,y=a||u;return{fullExtent:y&&H.fromJSON(y),timeExtent:l&&B.fromJSON({start:l[0],end:l[1]})}}loadAll(){return _(this,e=>{e(this.allSublayers)})}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:t,ssl:r}=await v(this.parsedUrl.path,{query:c(p(p({f:"json"},this.parsedUrl.query),this.customParameters),{token:this.apiKey}),signal:e});r&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=t,this.read(t,{origin:"service",url:this.parsedUrl})}};i([n({type:Boolean})],s.prototype,"datesInUnknownTimezone",void 0),i([n()],s.prototype,"dpi",void 0),i([n()],s.prototype,"gdbVersion",void 0),i([n()],s.prototype,"imageFormat",void 0),i([Q("imageFormat",["supportedImageFormatTypes"])],s.prototype,"readImageFormat",null),i([n({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],s.prototype,"imageMaxHeight",void 0),i([n({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],s.prototype,"imageMaxWidth",void 0),i([n()],s.prototype,"imageTransparency",void 0),i([n({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"labelsVisible",void 0),i([n({type:["ArcGISMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),i([n()],s.prototype,"sourceJSON",void 0),i([n({json:{write:{ignoreOrigin:!0}}})],s.prototype,"sublayers",void 0),i([X("sublayers",{layers:{type:[Y]},visibleLayers:{type:[Z]}})],s.prototype,"writeSublayers",null),i([n({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),i([n({json:{read:!1},readOnly:!0,value:"map-image"})],s.prototype,"type",void 0),i([n(ee)],s.prototype,"url",void 0),s=i([te("esri.layers.MapImageLayer")],s);const oe=s;export{oe as default};