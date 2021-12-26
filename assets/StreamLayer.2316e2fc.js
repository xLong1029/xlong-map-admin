var $=Object.defineProperty,j=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var m=(t,r,o)=>r in t?$(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,p=(t,r)=>{for(var o in r||(r={}))F.call(r,o)&&m(t,o,r[o]);if(c)for(var o of c(r))R.call(r,o)&&m(t,o,r[o]);return t},h=(t,r)=>j(t,T(r));import{e,d as i,i as f,eb as k,X as P,rQ as O,rt as N,rR as D,ru as E,rv as _,kF as L,kG as U,kH as G,kI as A,rP as C,f as J,cn as g,an as d,r as M,co as V,rS as v,sE as q,aN as W,dg as z,fc as X,k as H,bb as Q,rT as Z,ed as B,fd as Y,rU as K,a8 as ee,hm as b,rV as te,rW as re,rX as ie,rM as se,f7 as w,sF as oe,sG as ae,ff as ne,fg as le,rZ as pe,fe as de,f6 as I,r_ as ye,kM as ue,sH as ce,sI as me,fi as he}from"./index.988b09cd.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */var y;let n=y=class extends k{constructor(){super(...arguments),this.age=null,this.ageReceived=null,this.displayCount=null,this.maxObservations=1}clone(){return new y({age:this.age,ageReceived:this.ageReceived,displayCount:this.displayCount,maxObservations:this.maxObservations})}};e([i({type:Number,json:{write:!0}})],n.prototype,"age",void 0),e([i({type:Number,json:{write:!0}})],n.prototype,"ageReceived",void 0),e([i({type:Number,json:{write:!0}})],n.prototype,"displayCount",void 0),e([i({type:Number,json:{write:!0}})],n.prototype,"maxObservations",void 0),n=y=e([f("esri.layers.support.PurgeOptions")],n);const S=n,fe=P.getLogger("esri.layers.StreamLayer"),x=he();let s=class extends O(N(D(E(_(L(U(G(A(C(J)))))))))){constructor(...t){super(...t),this.copyright=null,this.definitionExpression=null,this.displayField=null,this.elevationInfo=null,this.featureReduction=null,this.fields=null,this.fieldsIndex=null,this.geometryDefinition=null,this.geometryType=null,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.maxReconnectionAttempts=0,this.maxReconnectionInterval=20,this.maxScale=0,this.minScale=0,this.objectIdField=null,this.operationalLayerType="ArcGISStreamLayer",this.popupEnabled=!0,this.popupTemplate=null,this.purgeOptions=new S,this.screenSizePerspectiveEnabled=!0,this.sourceJSON=null,this.spatialReference=g.WGS84,this.type="stream",this.url=null,this.updateInterval=300,this.webSocketUrl=null}normalizeCtorArgs(t,r){return typeof t=="string"?p({url:t},r):t}load(t){if(!("WebSocket"in globalThis))return this.addResolvingPromise(Promise.reject(new d("stream-layer:websocket-unsupported","WebSocket is not supported in this browser. StreamLayer will not have real-time connection with the stream service."))),Promise.resolve(this);const r=M(t)?t.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Stream Service","Feed"]},t).catch(V).then(()=>this._fetchService(r))),Promise.resolve(this)}get defaultPopupTemplate(){return this.createPopupTemplate()}set renderer(t){v(t,this.fieldsIndex),this._set("renderer",t)}readRenderer(t,r,o){const a=(r=r.layerDefinition||r).drawingInfo&&r.drawingInfo.renderer||void 0;if(a){const l=q(a,r,o)||void 0;return l||fe.error("Failed to create renderer",{rendererDefinition:r.drawingInfo.renderer,layer:this,context:o}),l}if(r.defaultSymbol)return r.types&&r.types.length?new W({defaultSymbol:u(r.defaultSymbol,r,o),field:r.typeIdField,uniqueValueInfos:r.types.map(l=>({id:l.id,symbol:u(l.symbol,l,o)}))}):new z({symbol:u(r.defaultSymbol,r,o)})}createPopupTemplate(t){return X(this,t)}createQuery(){const t=new H;return t.returnGeometry=!0,t.outFields=["*"],t.where=this.definitionExpression||"1=1",t}getFieldDomain(t,r){if(!this.fields)return null;let o=null;return this.fields.some(a=>(a.name===t&&(o=a.domain),!!o)),o}getField(t){return this.fieldsIndex.get(t)}async _fetchService(t){var r;if(this.webSocketUrl){var o;if((o=this.timeInfo)==null||!o.trackIdField)throw new d("stream-layer:missing-metadata","The stream layer trackIdField must be specified.");if(!this.objectIdField)throw new d("stream-layer:missing-metadata","The stream layer objectIdField must be specified.");if(!this.fields)throw new d("stream-layer:missing-metadata","The stream layer fields must be specified.");if(!this.geometryType)throw new d("stream-layer:missing-metadata","The stream layer geometryType must be specified.");this.url=this.webSocketUrl}else if(!this.sourceJSON){const{data:a}=await Q(this.parsedUrl.path,{query:p(p({f:"json"},this.customParameters),this.parsedUrl.query),responseType:"json",signal:t});this.sourceJSON=a}return this.sourceJSON=h(p({},(r=this.sourceJSON)!=null?r:{}),{objectIdField:"__esri_stream_id__"}),this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl}),v(this.renderer,this.fieldsIndex),Z(this.timeInfo,this.fieldsIndex),B(this,{origin:"service"})}};e([i({type:String})],s.prototype,"copyright",void 0),e([i({readOnly:!0})],s.prototype,"defaultPopupTemplate",null),e([i({type:String,json:{name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],s.prototype,"definitionExpression",void 0),e([i({type:String})],s.prototype,"displayField",void 0),e([i({type:Y})],s.prototype,"elevationInfo",void 0),e([i(K)],s.prototype,"featureReduction",void 0),e([i(x.fields)],s.prototype,"fields",void 0),e([i(x.fieldsIndex)],s.prototype,"fieldsIndex",void 0),e([i({type:ee})],s.prototype,"geometryDefinition",void 0),e([i({type:b.apiValues,json:{read:{reader:b.read}}})],s.prototype,"geometryType",void 0),e([i(te)],s.prototype,"labelsVisible",void 0),e([i({type:[re],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:ie},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],s.prototype,"labelingInfo",void 0),e([i(se)],s.prototype,"legendEnabled",void 0),e([i({type:["show","hide"]})],s.prototype,"listMode",void 0),e([i({type:w})],s.prototype,"maxReconnectionAttempts",void 0),e([i({type:w})],s.prototype,"maxReconnectionInterval",void 0),e([i(oe)],s.prototype,"maxScale",void 0),e([i(ae)],s.prototype,"minScale",void 0),e([i({type:String})],s.prototype,"objectIdField",void 0),e([i({value:"ArcGISStreamLayer",type:["ArcGISStreamLayer"]})],s.prototype,"operationalLayerType",void 0),e([i(ne)],s.prototype,"popupEnabled",void 0),e([i({type:le,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],s.prototype,"popupTemplate",void 0),e([i({type:S})],s.prototype,"purgeOptions",void 0),e([i({types:pe,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}},"web-scene":{name:"layerDefinition.drawingInfo.renderer",types:de,write:!0}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],s.prototype,"renderer",null),e([I("service","renderer",["drawingInfo.renderer","defaultSymbol"]),I("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol"])],s.prototype,"readRenderer",null),e([i(ye)],s.prototype,"screenSizePerspectiveEnabled",void 0),e([i({type:g,json:{origins:{service:{read:{source:"spatialReference"}}}}})],s.prototype,"spatialReference",void 0),e([i({json:{read:!1}})],s.prototype,"type",void 0),e([i(ue)],s.prototype,"url",void 0),e([i({type:Number})],s.prototype,"updateInterval",void 0),e([i({type:String})],s.prototype,"webSocketUrl",void 0),s=e([f("esri.layers.StreamLayer")],s);const u=ce({types:me}),$e=s;export{$e as default};