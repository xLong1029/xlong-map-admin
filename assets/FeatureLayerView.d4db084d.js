import{ae as G,e as u,y as d,k8 as N,gJ as j,k9 as C,b as D,w as Q,G as S,az as I,gk as v,gH as R,r as p,E as q,b3 as B,aF as P,ka as _,kb as M,kc as $,kd as T,ke as z,kf as y,kg as m,i as F,aD as g,kh as L}from"./index.a33ecea7.js";import{o as O}from"./floorFilterUtils.095bd939.js";import{s as w,d as U}from"./popupUtils.5d07a4ea.js";const A="esri.views.layers.FeatureLayerView",E=G.getLogger(A),W=k=>{let o=class extends k{constructor(...t){super(...t),this._updatingRequiredFieldsPromise=null,this.filter=null,this.timeExtent=null,this.layer=null,this.requiredFields=[],this.view=null}initialize(){this.handles.add([Q(()=>{var e;const t=this.layer;return[(e=t==null?void 0:t.elevationInfo)==null?void 0:e.featureExpressionInfo,t&&"displayField"in t?t.displayField:null,t&&"timeInfo"in t&&t.timeInfo,t&&"renderer"in t&&t.renderer,t&&"labelingInfo"in t&&t.labelingInfo,t&&"floorInfo"in t&&t.floorInfo,this.filter,this.featureEffect,this.timeExtent]},()=>this._handleRequiredFieldsChange(),S),I(()=>{var t;return(t=this.view)==null?void 0:t.floors},"change",()=>this._handleRequiredFieldsChange()),I(()=>{const t=this.layer;return t&&"sublayers"in t?t.sublayers:null},"change",()=>this._handleRequiredFieldsChange())])}get availableFields(){const{layer:t,layer:{fieldsIndex:e},requiredFields:r}=this;return"outFields"in t&&t.outFields?v(e,[...R(e,t.outFields),...r]):v(e,r)}get featureEffect(){return this.layer&&"featureEffect"in this.layer?this.layer.featureEffect:null}set featureEffect(t){this._override("featureEffect",t)}get maximumNumberOfFeatures(){return 0}set maximumNumberOfFeatures(t){E.error("#maximumNumberOfFeatures=","Setting maximum number of features is not supported")}get maximumNumberOfFeaturesExceeded(){return!1}highlight(t){throw new Error("missing implementation")}createQuery(){const t={outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference},e=p(this.filter)?this.filter.createQuery(t):new q(t);if(this.layer.type==="feature"){const r=O(this);p(r)&&(e.where=e.where?`(${e.where}) AND (${r})`:r)}return p(this.timeExtent)&&(e.timeExtent=p(e.timeExtent)?e.timeExtent.intersection(this.timeExtent):this.timeExtent.clone()),e}createAggregateQuery(){const t={outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference};return new q(t)}queryFeatures(t,e){throw new Error("missing implementation")}queryObjectIds(t,e){throw new Error("missing implementation")}queryFeatureCount(t,e){throw new Error("missing implementation")}queryExtent(t,e){throw new Error("missing implementation")}async fetchPopupFeatures(t,e){const r=this.validateFetchPopupFeatures(e);if(r)throw r;return this.fetchClientPopupFeatures(e)}_loadArcadeModules(t){return t.get("expressionInfos.length")||Array.isArray(t.content)&&t.content.some(e=>e.type==="expression")?B():Promise.resolve()}_handleRequiredFieldsChange(){const t=this._updateRequiredFields();this._set("_updatingRequiredFieldsPromise",t),t.then(()=>{this._updatingRequiredFieldsPromise===t&&this._set("_updatingRequiredFieldsPromise",null)})}async _updateRequiredFields(){if(!this.layer||!this.view)return;const t=this.view.type==="3d",{layer:e,layer:{fieldsIndex:r,objectIdField:s}}=this,l="renderer"in e&&e.renderer,n="orderBy"in e&&e.orderBy,a="featureReduction"in e?e.featureReduction:null,i=new Set,c=await P([l?l.collectRequiredFields(i,r):null,_(i,e),t?M(i,e):null,p(this.filter)?$(i,e,this.filter):null,p(this.featureEffect)?$(i,e,this.featureEffect.filter):null,a?T(i,e,a):null,n?z(i,e,n):null]);if("timeInfo"in e&&e.timeInfo&&this.timeExtent&&y(i,e.fieldsIndex,[e.timeInfo.startField,e.timeInfo.endField]),e.type==="feature"&&(e.floorInfo&&y(i,e.fieldsIndex,[e.floorInfo.floorField]),t&&p(e.infoFor3D)&&(e.globalIdField==null&&E.error("globalIdField missing on 3DObjectFeatureLayer"),y(i,e.fieldsIndex,[e.globalIdField]))),e.type==="subtype-group"){m(i,r,e.subtypeField);const f=e.sublayers.map(b=>{var x;return Promise.all([(x=b.renderer)==null?void 0:x.collectRequiredFields(i,r),_(i,b)])});await P(f)}for(const f of c)f.error&&E.error(f.error);m(i,r,s),t&&"displayField"in e&&e.displayField&&m(i,r,e.displayField);const h=Array.from(i).sort();this._set("requiredFields",h)}validateFetchPopupFeatures(t){var e;if(F(t))return null;for(const r of(e=t.clientGraphics)!=null?e:[]){const s=r.layer;if("popupEnabled"in s&&!s.popupEnabled)return new g("featurelayerview:fetchPopupFeatures","Popups are disabled",{layer:s});if(r.isAggregate){const l="featureReduction"in s?s.featureReduction:null;if(!(l&&"popupTemplate"in l&&l.popupEnabled&&l.popupTemplate))return new g("featurelayerview:fetchPopupFeatures","Popups are disabled",{layer:s})}else if("popupTemplate"in s&&!w(s,t))return new g("featurelayerview:fetchPopupFeatures","Layer does not define a popup template",{layer:s})}}async fetchClientPopupFeatures(t){const e=p(t)?t.clientGraphics:null;if(!e||e.length===0)return[];const r=new Array(e.length),s=new Map,l=await this.createPopupQuery(t);for(let n=0;n<e.length;n++){const a=e[n];if(a.isAggregate){r[n]=a;continue}const i=a.layer;if(!("popupEnabled"in i))continue;const c=R(this.layer.fieldsIndex,l.outFields),h=w(i,t);if(F(h))continue;const f=await this._loadArcadeModules(h);f&&f.arcadeUtils.hasGeometryOperations(h)||!L(c,a)?s.set(a.getObjectId(),{graphic:a,index:n}):r[n]=a}if(this.layer.type==="stream"||s.size===0)return r.filter(Boolean);l.objectIds=Array.from(s.keys());try{const n=await this.layer.queryFeatures(l);for(const a of n.features){const{graphic:{geometry:i},index:c}=s.get(a.getObjectId());a.geometry||(a.geometry=i),r[c]=a}}catch{}return r.filter(Boolean)}async createPopupQuery(t){const e=this.layer.createQuery(),r=new Set;let s=!1;const l=p(t)&&t.clientGraphics?t.clientGraphics.map(n=>n.layer):[this.layer];for(const n of l){if(!("popupEnabled"in n))continue;const a=w(n,t);if(F(a))continue;const i=await this._loadArcadeModules(a),c=i&&i.arcadeUtils.hasGeometryOperations(a);s=!(this.layer.geometryType!=="point"&&!c);const h=await U(this.layer,a);for(const f of h)r.add(f)}if(e.returnGeometry=s,e.returnZ=s,e.returnM=s,e.outFields=Array.from(r),e.outSpatialReference=this.view.spatialReference,this.layer.type==="feature"){const n=O(this);p(n)&&(e.where=e.where?`(${e.where}) AND (${n})`:n)}return e}canResume(){return!!super.canResume()&&(!p(this.timeExtent)||!this.timeExtent.isEmpty)}};return u([d()],o.prototype,"_updatingRequiredFieldsPromise",void 0),u([d({readOnly:!0})],o.prototype,"availableFields",null),u([d({type:N})],o.prototype,"featureEffect",null),u([d({type:j})],o.prototype,"filter",void 0),u([d(C)],o.prototype,"timeExtent",void 0),u([d()],o.prototype,"layer",void 0),u([d({type:Number})],o.prototype,"maximumNumberOfFeatures",null),u([d({readOnly:!0,type:Boolean})],o.prototype,"maximumNumberOfFeaturesExceeded",null),u([d({readOnly:!0})],o.prototype,"requiredFields",void 0),u([d()],o.prototype,"suspended",void 0),u([d()],o.prototype,"view",void 0),o=u([D(A)],o),o};export{W as A};