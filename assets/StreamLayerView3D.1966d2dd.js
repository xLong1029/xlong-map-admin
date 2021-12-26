var V=Object.defineProperty;var m=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var f=(t,e,r)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,g=(t,e)=>{for(var r in e||(e={}))k.call(e,r)&&f(t,r,e[r]);if(m)for(var r of m(e))C.call(e,r)&&f(t,r,e[r]);return t};import{e as i,d as o,i as c,bF as F,ew as M,p as $,hm as L,r as d,h as T,eC as D,ef as U,eg as Q,an as N,k as P}from"./index.988b09cd.js";import{t as z,h as A}from"./createConnection.20f2fe63.js";import{s as J,E as q}from"./EventedSet.3b70ef14.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */import"./CircularArray.73e04f63.js";import"./Graphics3DFeatureLikeLayerView.0ce0e003.js";import"./Graphics3DScaleVisibility.c198a3d2.js";import"./rendererConversion.5da3920a.js";import"./optimizedFeatureQueryEngineAdapter.9e9e115c.js";import"./centroid.0322b186.js";import"./PooledRBush.2b6c8939.js";import"./Graphics3DObjectStates.fd1455f9.js";import"./QueryEngine.eafdf93f.js";import"./WhereClause.4a84b2da.js";import"./projectionSupport.0aea5e60.js";import"./json.2d0d6862.js";import"./QueryEngineCapabilities.83e56447.js";import"./utils.88386124.js";import"./ClassBreaksDefinition.34fb124d.js";import"./spatialQuerySupport.939b4706.js";import"./Graphics3DFrustumVisibility.66c72684.js";import"./attributeUtils.a1b96ab7.js";import"./projectExtentUtils.237a1767.js";var h;const B=2500;let p=h=class extends T{getObjectId(){return this.objectId}clone(){return new h(g({objectId:this.objectId},this.cloneProperties()))}};i([o({type:Number,json:{read:!0}})],p.prototype,"objectId",void 0),p=h=i([c("esri.layers.graphics.controllers.StreamGraphic")],p);class Z{constructor(e){this.onUpdate=e,this._idToGraphic=new Map}destroy(){this._idToGraphic.clear()}add(e){this._idToGraphic.set(e.objectId,e)}get(e){return this._idToGraphic.get(e)}forEach(e){this._idToGraphic.forEach(e)}removeById(e){const r=this._idToGraphic.get(e);return r?(r.sourceLayer=r.layer=null,this._idToGraphic.delete(e),r):null}update(e,r){this.onUpdate(e,r)}get size(){return this._idToGraphic.size}}let n=class extends F(M($)){constructor(){super(...arguments),this._updateInfo={websocket:0,client:0},this.graphics=new J}initialize(){this.addResolvingPromise(this.layer.when(()=>this._startup()))}destroy(){this.clear()}clear(){this._updateIntervalId&&(clearInterval(this._updateIntervalId),this._updateIntervalId=0),this.connection&&(this.connection.destroy(),this.connection=null),this.store&&(this.store.destroy(),this.store=null),this.graphics.clear(),this.handles.removeAll()}get updating(){return!this.connection||this.connection.connectionStatus==="connected"}_startup(){const{parsedUrl:t,spatialReference:e,definitionExpression:r,geometryDefinition:j,objectIdField:b,timeInfo:v,purgeOptions:w,maxReconnectionAttempts:_,maxReconnectionInterval:I,updateInterval:S}=this.layer,O=L.toJSON(this.layer.geometryType),E=e,u=this.layerView.view.spatialReference,x={geometry:j,where:r};this.clear(),this._set("connection",z(t,E,u,O,x,_,I)),this._outSpatialReference=u.toJSON(),this.store=new Z(this._onUpdate.bind(this)),this.featuresManager=new A(this.store,b,v.toJSON(),w),this.handles.add([this.connection.on("feature",a=>this._onFeature(a)),this.layer.watch("definitionExpression",()=>this._startup()),this.layer.watch("geometryDefinition",()=>this._startup()),this.layer.watch("purgeOptions",()=>this._startup())]);let y=performance.now();this._updateIntervalId=setInterval(()=>{const a=performance.now(),l=a-y;if(l>B){y=a;const G=Math.round(this._updateInfo.client/(l/1e3)),R=Math.round(this._updateInfo.websocket/(l/1e3));this._updateInfo.client=0,this._updateInfo.websocket=0,this.layerView.emit("update-rate",{client:G,websocket:R})}this.featuresManager.checkForUpdates()},S)}_onFeature(t){this._updateInfo.websocket++,this.layerView.hasEventListener("data-received")&&this.layerView.emit("data-received",{attributes:t.attributes,centroid:t.centroid,geometry:t.geometry});try{d(t.geometry)&&!t.geometry.spatialReference&&(t.geometry.spatialReference=this._outSpatialReference);const e=p.fromJSON(t);e.sourceLayer=e.layer=this.layer,this.featuresManager.add(e)}catch{}}_onUpdate(t,e){d(e)&&this.graphics.removeMany(e),d(t)&&(this._updateInfo.client+=t.length,this.graphics.addMany(t))}};i([o()],n.prototype,"connection",void 0),i([o()],n.prototype,"layer",void 0),i([o()],n.prototype,"layerView",void 0),i([o({readOnly:!0})],n.prototype,"updating",null),n=i([c("esri.layers.graphics.controllers.StreamController")],n);const W=n,H=t=>{let e=class extends t{constructor(...r){super(...r),this.connectionError=null,this.connectionStatus="disconnected",this.filter=null}};return i([o({readOnly:!0})],e.prototype,"connectionError",void 0),i([o({aliasOf:"controller.connection.connectionStatus",readOnly:!0})],e.prototype,"connectionStatus",void 0),i([o({type:D})],e.prototype,"filter",void 0),e=i([c("esri.layers.mixins.StreamLayerView")],e),e};let s=class extends H(q(U(Q))){constructor(){super(...arguments),this.type="stream-3d",this.updatePolicy=0,this.hasZ=!0,this.hasM=!1}get connectionError(){const t=this.get("controller.connection.errorString");if(t)return new N("stream-controller",t)}createQuery(){return new P({outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference})}queryLatestObservations(t,e){return this.queryEngine.executeQueryForLatestObservations(this._ensureQuery(t),e==null?void 0:e.signal)}createController(){return new W({layer:this.layer,layerView:this})}beforeSetController(){}};i([o({readOnly:!0})],s.prototype,"updatePolicy",void 0),i([o({readOnly:!0})],s.prototype,"connectionError",null),i([o()],s.prototype,"controller",void 0),i([o({readOnly:!0})],s.prototype,"hasZ",void 0),i([o({readOnly:!0})],s.prototype,"hasM",void 0),s=i([c("esri.views.3d.layers.StreamLayerView3D")],s);const Oe=s;export{Oe as default};