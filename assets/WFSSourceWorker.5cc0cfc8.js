import{a4 as p,aV as l,qD as u,r as g,eP as _,dq as d,f9 as f,fj as w,n as E,aD as h,co as q,u as F,ae as x,dp as S}from"./index.a33ecea7.js";import{g as T}from"./FeatureStore.b2caf56c.js";import{e as j}from"./QueryEngine.c2c9f6b5.js";import{T as I,I as b}from"./geojson.9a4fcbb9.js";import{m as C}from"./sourceUtils.cd5892fe.js";import{K as P}from"./wfsUtils.877584a4.js";import"./BoundsStore.499f4d64.js";import"./PooledRBush.efdefeda.js";import"./optimizedFeatureQueryEngineAdapter.19cbae31.js";import"./centroid.5ec46060.js";import"./QueryEngineCapabilities.a5e1050d.js";import"./timeSupport.2b30b818.js";import"./xmlUtils.fd9b232b.js";class N{constructor(){this._queryEngine=null,this._customParameters=null,this._snapshotFeatures=async e=>{var i;const{objectIdField:t}=this._queryEngine,r=await P((i=this._getFeatureUrl)!=null?i:"",this._featureType.typeName,this._getFeatureOutputFormat,{customParameters:this._customParameters,dateFields:this._queryEngine.fieldsIndex.dateFields.map(s=>s.name),signal:e});await I(r),p(e);const a=b(r,{geometryType:this._queryEngine.geometryType,hasZ:!1,objectIdField:t});if(!l(this._queryEngine.spatialReference,u))for(const s of a)g(s.geometry)&&(s.geometry=_(d(f(s.geometry,this._queryEngine.geometryType,!1,!1),u,this._queryEngine.spatialReference)));let n=1;for(const s of a){const o={};C(this._fieldsIndex,o,s.attributes,!0),s.attributes=o,s.attributes[t]==null&&(s.objectId=s.attributes[t]=n++)}return a}}destroy(){var e;(e=this._queryEngine)==null||e.destroy(),this._queryEngine=null}async load(e,t){const{getFeatureUrl:r,getFeatureOutputFormat:a,spatialReference:n,fields:i,geometryType:s,featureType:o,objectIdField:y,customParameters:c}=e;this._featureType=o,this._customParameters=c,this._getFeatureUrl=r,this._getFeatureOutputFormat=a,this._fieldsIndex=new w(i),await this._checkProjection(n),p(t),this._queryEngine=new j({fields:i,geometryType:s,hasM:!1,hasZ:!1,objectIdField:y,spatialReference:n,timeInfo:null,featureStore:new T({geometryType:s,hasM:!1,hasZ:!1})});const m=await this._snapshotFeatures(E(t.signal));return this._queryEngine.featureStore.addMany(m),{extent:(await this._queryEngine.fetchRecomputedExtents()).fullExtent}}async applyEdits(){throw new h("wfs-source:editing-not-supported","applyEdits() is not supported on WFSLayer")}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){var t;return this._customParameters=e,(t=this._snapshotTask)==null||t.abort(),this._snapshotTask=q(this._snapshotFeatures),this._snapshotTask.promise.then(r=>{this._queryEngine.featureStore.clear(),r&&this._queryEngine.featureStore.addMany(r)},r=>{this._queryEngine.featureStore.clear(),F(r)||x.getLogger("esri.layers.WFSLayer").error(new h("wfs-layer:getfeature-error","An error occurred during the GetFeature request",{error:r}))}),await this._waitSnapshotComplete(),{extent:(await this._queryEngine.fetchRecomputedExtents()).fullExtent}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _checkProjection(e){try{await S(u,e)}catch{throw new h("unsupported-projection","Projection not supported",{spatialReference:e})}}}export{N as default};