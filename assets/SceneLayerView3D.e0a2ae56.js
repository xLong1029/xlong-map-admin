import{X as y,ef as f,r as a,t as d,hd as g,b as v,k as u,al as F,h as m,e as i,d as n,eE as b,eC as w,i as _}from"./index.988b09cd.js";import{WhereClause as j}from"./WhereClause.4a84b2da.js";import{$ as S,u as E}from"./I3SMeshView3D.75d00cd8.js";import{o as I,c as C,s as x,i as Q,a as q}from"./SceneLayerView.9cb00d2e.js";import{O as h,d as D,a as O,n as R}from"./I3SQueryFeatureStore.578cb949.js";import{d as A}from"./I3SUtil.099700d0.js";import{p as $}from"./DefinitionExpressionSceneLayerView.0105c0fc.js";import{c as L}from"./PopupSceneLayerView.be09a96c.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */import"./I3SAttributeOverrides.42306241.js";import"./I3SBinaryReader.5e4e1dc7.js";import"./SceneModification.5a303e34.js";import"./Graphics3DScaleVisibility.c198a3d2.js";import"./rendererConversion.5da3920a.js";import"./optimizedFeatureQueryEngineAdapter.9e9e115c.js";import"./centroid.0322b186.js";import"./PooledRBush.2b6c8939.js";import"./SceneLayerWorker.c09d805d.js";import"./attributeUtils.a1b96ab7.js";import"./QueryEngine.eafdf93f.js";import"./projectionSupport.0aea5e60.js";import"./json.2d0d6862.js";import"./QueryEngineCapabilities.83e56447.js";import"./utils.88386124.js";import"./ClassBreaksDefinition.34fb124d.js";import"./spatialQuerySupport.939b4706.js";import"./popupUtils.54225bd2.js";const V=y.getLogger("esri.views.3d.layers.SceneLayerView3D"),c=q();let r=class extends S($(L(f(I)))){constructor(){super(...arguments),this.type="scene-layer-3d",this.lodFactor=1,this.progressiveLoadFactor=1,this._elevationContext="scene",this._isIntegratedMesh=!1,this._supportsLabeling=!0,this._interactiveEditingSessions=new Map,this._queryEngine=null}get filter(){return a(this.viewFilter)?this.viewFilter.filter:null}set filter(e){!d(e)&&h.checkSupport(e)?a(this.viewFilter)?this.viewFilter.filter=e:this.viewFilter=new h({filter:e,layerFieldsIndex:this.layer.fieldsIndex,loadAsyncModule:t=>this._loadAsyncModule(t),applyFilters:()=>this._applyFilters(!0),addSqlFilter:(t,s)=>this.addSqlFilter(t,s,this.logError)}):this.viewFilter=null}get requiredFields(){var e,t;return(e=(t=this.fieldsHelper)==null?void 0:t.requiredFields)!=null?e:[]}get floorFilterClause(){const e=g(this);return a(e)?j.create(e,this.layer.fieldsIndex):null}get lodCrossfadeinDuration(){var e,t;return(e=(t=this.view)==null?void 0:t.qualitySettings.sceneService["3dObject"].lodCrossfadeinDuration)!=null?e:0}get lodCrossfadeoutDuration(){var e,t;return(e=(t=this.view)==null?void 0:t.qualitySettings.sceneService["3dObject"].lodCrossfadeoutDuration)!=null?e:0}get lodCrossfadeUncoveredDuration(){var e,t;return(e=(t=this.view)==null?void 0:t.qualitySettings.sceneService["3dObject"].lodCrossfadeUncoveredDuration)!=null?e:0}initialize(){this.fieldsHelper=new C({layerView:this}),this.updatingHandles.add(this.layer,"rangeInfos",e=>this._rangeInfosChanged(e),2),this.updatingHandles.add(this.layer,"renderer",e=>this.updatingHandles.addPromise(this._rendererChange(e)),2);for(const e of["parsedDefinitionExpression","filter","viewFilter.parsedWhereClause","viewFilter.parsedGeometry","viewFilter.sortedObjectIds","floorFilterClause"])this.updatingHandles.add(this,e,()=>this._filterChange());for(const e of["filter","viewFilter.parsedGeometry"])this.updatingHandles.add(this,e,()=>this._geometryFilterChange());this.handles.add(this.layer.on("apply-edits",e=>this.updatingHandles.addPromise(e.result))),this.handles.add(this.layer.on("edits",e=>this._handleEdits(e)))}destroy(){this.fieldsHelper=v(this.fieldsHelper)}_rangeInfosChanged(e){e!=null&&e.length>0&&V.warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")}createQuery(){const e={outFields:["*"],returnGeometry:!1,outSpatialReference:this.view.spatialReference};return a(this.filter)?this.filter.createQuery(e):new u(e)}queryExtent(e,t){return this._ensureQueryEngine().executeQueryForExtent(this._ensureQuery(e),t==null?void 0:t.signal)}queryFeatureCount(e,t){return this._ensureQueryEngine().executeQueryForCount(this._ensureQuery(e),t==null?void 0:t.signal)}queryFeatures(e,t){return this._ensureQueryEngine().executeQuery(this._ensureQuery(e),t==null?void 0:t.signal).then(s=>{if(s==null||!s.features)return s;const o=this.layer;for(const l of s.features)l.layer=o,l.sourceLayer=o;return s})}queryObjectIds(e,t){return this._ensureQueryEngine().executeQueryForIds(this._ensureQuery(e),t==null?void 0:t.signal)}_ensureQueryEngine(){return this._queryEngine||(this._queryEngine=this._createQueryEngine()),this._queryEngine}_createQueryEngine(){const e=E(this.view.spatialReference,this.view.renderSpatialReference,this._collection);return new D({layerView:this,priority:F.FEATURE_QUERY_ENGINE,spatialIndex:new O({featureAdapter:new R({objectIdField:this.layer.objectIdField,attributeStorageInfo:this.layer.attributeStorageInfo,getFeatureExtent:e}),forAllFeatures:(t,s)=>this._forAllFeatures((o,l,p)=>t({id:o,index:l,meta:p}),s,2),getFeatureExtent:e,sourceSpatialReference:A(this.layer),viewSpatialReference:this.view.spatialReference})})}highlight(e){const t=this._highlights;if(e instanceof u){const{set:s,handle:o}=t.acquireSet();return this.queryObjectIds(e).then(l=>t.setFeatureIds(s,l)),o}return super.highlight(e)}createInteractiveEditSession(e){return x(this.attributeEditingContext,e)}_createLayerGraphic(e){const t=new m(null,null,e);return t.layer=this.layer,t.sourceLayer=this.layer,t}canResume(){return super.canResume()&&(!this._controller||this._controller.rootNodeVisible)}getFilters(){const e=super.getFilters();return this.floorFilterClause&&this.addSqlFilter(e,this.floorFilterClause,this.logError),this.addSqlFilter(e,this.parsedDefinitionExpression,this.logError),a(this.viewFilter)&&this.viewFilter.addFilters(e,this.view,this._controller.crsIndex,this._collection),e}_ensureQuery(e){return this._addDefinitionExpressionToQuery(d(e)?this.createQuery():u.from(e))}get attributeEditingContext(){return{sessions:this._interactiveEditingSessions,fieldsIndex:this.layer.fieldsIndex,objectIdField:this._getObjectIdField(),forEachNode:e=>this._forAllNodes(t=>a(t)?e(t.node,t.featureIds):null),attributeStorageInfo:this.i3slayer.attributeStorageInfo,attributeOverrides:this.attributeOverrides,getAttributeData:e=>this.getAttributeData(e),setAttributeData:(e,t)=>this.setAttributeData(e,t),clearMemCache:()=>this.clearMemCache()}}_handleEdits(e){Q(this.attributeEditingContext,e)}get hasGeometryFilter(){const e=this.viewFilter;return a(e)&&a(e.parsedGeometry)}computeNodeFiltering(e){const t=this.viewFilter;return d(t)||t.isMBSGeoemtryVisible(e,this.view.spatialReference,this._controller.crsIndex)?0:1}};i([n({aliasOf:"layer"})],r.prototype,"i3slayer",void 0),i([n()],r.prototype,"suspended",void 0),i([n(b)],r.prototype,"updatingProgress",void 0),i([n({type:w})],r.prototype,"filter",null),i([n()],r.prototype,"viewFilter",void 0),i([n(c.requiredFields)],r.prototype,"requiredFields",null),i([n(c.availableFields)],r.prototype,"availableFields",void 0),i([n()],r.prototype,"fieldsHelper",void 0),i([n()],r.prototype,"floorFilterClause",null),i([n({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.3dObject.lodFactor"})],r.prototype,"lodFactor",void 0),i([n({readOnly:!0,aliasOf:"_controller.updatingProgress"})],r.prototype,"updatingProgressValue",void 0),r=i([_("esri.views.3d.layers.SceneLayerView3D")],r);const fe=r;export{fe as default};