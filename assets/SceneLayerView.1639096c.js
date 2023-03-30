import{dy as G,r as S,i as v,gk as j,gH as z,e as l,b as A,y as u,ae as L,lc as B,d as K,ld as H,ad as x,ka as Q,kc as W,p as J,h$ as X,a$ as Y,aM as M,bp as Z,le as ee,h_ as te}from"./index.a33ecea7.js";import{n as k}from"./FeatureLikeLayerView3D.b0fb7ce1.js";import{a as re,n as ne,u as ie}from"./DefinitionExpressionSceneLayerView.b9d753a9.js";import{u as se}from"./LayerView.88bcfa48.js";const ae={setAttribute(){},rollback(){},commit(){}};var F;function he(e,r){const t=r.attributes[e.objectIdField],n=e.sessions.get(t);if(n)return n;const i=G(r.attributes),s=new Set;if(t==null)return ae;const d=e.i3sOverrides.createInteractiveEditSession(t),a=new Map,y=(p,h)=>{const f=a.get(p);if(f==null){const g=h.indexOf(t);return a.set(p,g),g}return f};let o=F.EDITING;const m={setAttribute(p,h){if(o!==F.EDITING)return;const f=e.fieldsIndex.get(p);if(v(f))return;const g=e.attributeStorageInfo.findIndex(I=>I.name===f.name);if(g<0)return;d.set(g,h);const _=e.attributeStorageInfo[g];let E=!1;s.add(p),e.forEachNode((I,U)=>{const D=y(I,U);if(D===-1)return;const N=e.getAttributeData(I.index);if(N){const T=N[_.name];T&&(T[D]=h,e.setAttributeData(I.index,N,r),E=!0)}}),E&&e.clearMemCache()},rollback(){if(o===F.EDITING){for(const p of s)this.setAttribute(p,i[p]);d.rollback(),o=F.ROLLED_BACK,e.sessions.delete(t)}},commit(){o===F.EDITING&&(d.commit(),o=F.COMMITTED,e.sessions.delete(t))}};return e.sessions.set(t,m),m}function we(e,r){const t=[...r.addedFeatures,...r.updatedFeatures,...r.deletedFeatures];for(const n of t)n.objectId&&e.i3sOverrides.updateGeometry(n.objectId)}function be(e,r){const t=oe(e,r);if(t.size===0)return;const n=new Map;for(let s=0;s<e.attributeStorageInfo.length;s++)n.set(e.attributeStorageInfo[s].name,s);let i=!1;t.forEach((s,d)=>{const a=e.getAttributeData(d);let y=!1;s.forEach((o,m)=>{const p=S(a)?a[m]:null,h=n.get(m);for(const{featureIndex:f,value:g,featureId:_}of o)p&&(p[f]=g,y=!0,i=!0),e.i3sOverrides.updateAttributeValue(_,h,g)}),y&&e.setAttributeData(d,a,null)}),i&&e.clearMemCache()}function oe(e,r){const t=r.edits.updateFeatures;if(!t||t.length===0)return new q;const n=ue(r),i=new q,s=new Map;for(let o=0;o<e.attributeStorageInfo.length;o++)s.set(e.attributeStorageInfo[o].name,o);const d=e.fieldsIndex,a=e.objectIdField,y=t.filter(o=>{const m=k(d,o.attributes,a);return n.has(m)});return e.forEachNode((o,m)=>{const p=new Set(m);for(const h of y){const f=k(d,h.attributes,a);if(!p.has(f))continue;const g=m.indexOf(f);for(const _ in h.attributes){const E=e.fieldsIndex.normalizeFieldName(_),I=le(i,o.index,E),U=h.attributes[_];I.push({featureIndex:g,featureId:f,value:U})}}}),i}function le(e,r,t){const n=de(e,r),i=t!=null&&n.get(t);if(i)return i;const s=new Array;return n.set(t,s),s}function de(e,r){const t=e.get(r);if(t)return t;const n=new ce;return e.set(r,n),n}function ue(e){const r=new Set;if(!e.updatedFeatures)return r;for(const t of e.updatedFeatures)t.objectId!=null&&t.error==null&&r.add(t.objectId);return r}(function(e){e[e.EDITING=0]="EDITING",e[e.ROLLED_BACK=1]="ROLLED_BACK",e[e.COMMITTED=2]="COMMITTED"})(F||(F={}));const ce=Map,q=Map;function Fe(){return{requiredFields:{type:[String],readOnly:!0},availableFields:{type:[String],readOnly:!0,get:function(){const{layer:e,layer:{fieldsIndex:r},requiredFields:t}=this;return e.outFields?j(r,[...z(r,e.outFields),...t]):j(r,t)}}}}const R=e=>{let r=class extends e{constructor(){super(...arguments),this._numUpdating=0,this._asyncUpdateState=new Map}get updating(){return this._numUpdating>0}autoUpdateAsync(t,n){return pe(i=>this._updateAsync(t,i),n)}async _updateAsync(t,n){if(!this._startAsyncUpdate(t)){try{const i=await n();this._set(t,i)}catch{L.getLogger(this.declaredClass).warn(`Async update of "${String(t)}" failed. Async update functions should not throw exceptions.`)}this._endAsyncUpdate(t)&&this._updateAsync(t,n)}}_startAsyncUpdate(t){var i;const n=(i=this._asyncUpdateState.get(t))!=null?i:w.None;return n&w.Updating?(this._asyncUpdateState.set(t,n|w.Invalidated),!0):(++this._numUpdating,this._asyncUpdateState.set(t,n|w.Updating),!1)}_endAsyncUpdate(t){var i;--this._numUpdating;const n=((i=this._asyncUpdateState.get(t))!=null?i:w.None)&~w.Updating;return n&w.Invalidated?(this._asyncUpdateState.set(t,n&~w.Invalidated),!0):(this._asyncUpdateState.set(t,n),!1)}};return l([u({readOnly:!0})],r.prototype,"updating",null),l([u()],r.prototype,"_numUpdating",void 0),r=l([A("esri.core.AsyncUpdate")],r),r};var w;function pe(e,r){const t=()=>{s&&!d&&e(n)},n=()=>{if(!s||d)return r();s.clear(),d=!0;const a=H(s,r);return d=!1,a},i=()=>{s&&(s.destroy(),s=null)};let s=new B(t),d=!1;return e(n),{remove:i}}(function(e){e[e.None=0]="None",e[e.Updating=1]="Updating",e[e.Invalidated=2]="Invalidated"})(w||(w={}));let P=class extends R(K){};P=l([A("esri.core.AsyncUpdate")],P);const C="esri.views.3d.layers.support.SceneLayerViewRequiredFields";let b=class extends R(J){get layer(){return this.layerView.layer}get requiredFields(){const{layerView:{layer:{fieldsIndex:e},definitionExpressionFields:r},rendererFields:t,labelingFields:n,viewFilterFields:i}=this;return j(e,[...x(r,[]),...x(t,[]),...x(n,[]),...x(i,[])])}constructor(e){super(e)}initialize(){this.handles.add([this.autoUpdateAsync("rendererFields",async()=>{const{fieldsIndex:e,renderer:r}=this.layer;return r?O(t=>r.collectRequiredFields(t,e)):null}),this.autoUpdateAsync("labelingFields",async()=>{const{layer:e}=this;return e.labelsVisible?O(r=>Q(r,e)):null}),this.autoUpdateAsync("viewFilterFields",()=>{const{layer:e,filter:r}=this.layerView;return O(t=>W(t,e,r))})])}};async function O(e){const r=new Set;try{return await e(r),Array.from(r).sort()}catch(t){return L.getLogger(C).error(t),null}}l([u()],b.prototype,"layerView",void 0),l([u()],b.prototype,"layer",null),l([u()],b.prototype,"requiredFields",null),l([u()],b.prototype,"rendererFields",void 0),l([u()],b.prototype,"labelingFields",void 0),l([u()],b.prototype,"viewFilterFields",void 0),b=l([A(C)],b);const V="esri.views.layers.SceneLayerView",$=L.getLogger(V);let c=class extends se{constructor(){super(...arguments),this.layer=null,this.filter=null,this._geometryEngine=null,this._projectionEngineLoaded=!1}get availableFields(){return[]}get maximumNumberOfFeatures(){return 0}set maximumNumberOfFeatures(e){throw new Error("Not implemented")}get maximumNumberOfFeaturesExceeded(){return!1}get layerFilter(){return re(this._layerFilter)}get _layerFilter(){const e=this.layer.filter;if(v(e)||e.geometries.length<1)return null;const r=this._geometryEngine;if(v(r)||!this._projectionEngineLoaded&&this._filterNeedsProjectionEngine)return ne;const t=e.geometries.getItemAt(0).spatialReference,n=e.geometries.toArray().map(a=>{try{a=r.simplify(a)}catch{return $.warnOncePerTick("Failed to simplify scene filter mask polygon. Polygon will be ignored."),null}if(a==null)return null;if(a.spatialReference.equals(t))return a;try{return X(a,t)}catch{return $.warnOncePerTick("Failed to project scene filter mask polygon. Polygon will be ignored."),null}}).filter(S).sort((a,y)=>a.extent.xmin-y.extent.xmin),i=new Set,s=new Array,d=new Array;for(let a of n){const y=a.extent.xmin;if(s.length=0,i.forEach(o=>{if(y>=o.extent.xmax)return d.push(o),void i.delete(o);a.extent.ymin<=o.extent.ymax&&a.extent.ymax>=o.extent.ymin&&r.intersects(a,o)&&s.push(o)}),s.length>0){s.push(a);try{a=r.union(s)}catch{$.warnOncePerTick("Failed to unify filter mask polygons. Polygon will be ignored.");continue}s.pop(),s.forEach(o=>i.delete(o))}i.add(a)}return i.forEach(a=>d.push(a)),d.length>0?{spatialRelationship:e.spatialRelationship,geometries:d}:null}get _filterNeedsProjectionEngine(){const e=this.layer.filter;if(v(e)||e.geometries.length<=1)return!1;const r=e.geometries.getItemAt(0).spatialReference;return e.geometries.some(({spatialReference:t})=>!t.equals(r)&&!Y(t,r))}get layerFilterUpdating(){return ie(this._layerFilter)}initialize(){M(()=>!this._geometryEngine&&S(this.layer.filter)&&this.layer.filter.geometries.length).then(async()=>this._geometryEngine=await Z(()=>import("./index.a33ecea7.js").then(function(e){return e.zU}),["assets/index.a33ecea7.js","assets/index.56d92a5e.css"])),this._projectionEngineLoaded=ee(),M(()=>!this._projectionEngineLoaded&&this._filterNeedsProjectionEngine).then(async()=>{await te(),this._projectionEngineLoaded=!0})}highlight(e){throw new Error("Not implemented")}queryFeatures(e,r){throw new Error("Not implemented")}queryObjectIds(e,r){throw new Error("Not implemented")}queryFeatureCount(e,r){throw new Error("Not implemented")}createQuery(){throw new Error("Not implemented")}queryExtent(e,r){throw new Error("Not implemented")}};l([u()],c.prototype,"layer",void 0),l([u()],c.prototype,"availableFields",null),l([u()],c.prototype,"maximumNumberOfFeatures",null),l([u({readOnly:!0})],c.prototype,"maximumNumberOfFeaturesExceeded",null),l([u()],c.prototype,"filter",void 0),l([u({readOnly:!0})],c.prototype,"layerFilter",null),l([u({readOnly:!0})],c.prototype,"_layerFilter",null),l([u()],c.prototype,"_geometryEngine",void 0),l([u()],c.prototype,"_projectionEngineLoaded",void 0),l([u()],c.prototype,"_filterNeedsProjectionEngine",null),l([u()],c.prototype,"layerFilterUpdating",null),c=l([A(V)],c);const Ie=c;export{Ie as E,we as a,Fe as b,b as c,he as i,be as u};