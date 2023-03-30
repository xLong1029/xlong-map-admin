import{sp as V,aF as q,a4 as C,aD as y,r as U,a3 as j,ae as F,e as p,y as d,su as k,dj as b,g7 as f,ap as _,pZ as M,p_ as z,g8 as J,b as D,ge as B,sv as Z,qg as G,sw as H,sx as W,sy as X,eX as R,by as $,fS as Q,eW as E}from"./index.a33ecea7.js";import{i as N}from"./originUtils.03ac17cc.js";import{n as Y}from"./I3SIndexInfo.a363d6d0.js";import{getSiblingOfSameTypeI as ee}from"./resourceUtils.64e70384.js";let te=null;function re(){return te}async function T(a,o,e){if(!o||!o.resources)return;const t=o.portalItem===a.portalItem?new Set(a.paths):new Set;a.paths.length=0,a.portalItem=o.portalItem;const s=new Set(o.resources.toKeep.map(n=>n.resource.path)),r=new Set,i=[];s.forEach(n=>{t.delete(n),a.paths.push(n)});for(const n of o.resources.toUpdate)if(t.delete(n.resource.path),s.has(n.resource.path)||r.has(n.resource.path)){const{resource:h,content:S,finish:u,error:x}=n,g=ee(h,V());a.paths.push(g.path),i.push(O({resource:g,content:S,compress:n.compress,finish:u,error:x},e))}else a.paths.push(n.resource.path),i.push(se(n,e)),r.add(n.resource.path);for(const n of o.resources.toAdd)i.push(O(n,e)),a.paths.push(n.resource.path);if(t.forEach(n=>{if(o.portalItem){const h=o.portalItem.resourceFromPath(n);i.push(h.portalItem.removeResource(h).catch(()=>{}))}}),i.length===0)return;const l=await q(i);C(e);const c=l.filter(n=>"error"in n).map(n=>n.error);if(c.length>0)throw new y("save:resources","Failed to save one or more resources",{errors:c})}async function O(a,o){var s,r;const e={...U(o)?o:{},compress:a.compress},t=await j(a.resource.portalItem.addResource(a.resource,a.content,e));if(t.ok!==!0)throw(s=a.error)==null||s.call(a,t.error),t.error;(r=a.finish)==null||r.call(a,a.resource)}async function se(a,o){var t,s;const e=await j(a.resource.update(a.content,o));if(e.ok!==!0)throw(t=a.error)==null||t.call(a,e.error),e.error;(s=a.finish)==null||s.call(a,a.resource)}const L="esri.layers.mixins.SceneService",m=F.getLogger(L),le=a=>{let o=class extends a{constructor(){super(...arguments),this.spatialReference=null,this.fullExtent=null,this.heightModelInfo=null,this.minScale=0,this.maxScale=0,this.version={major:Number.NaN,minor:Number.NaN,versionString:""},this.copyright=null,this.sublayerTitleMode="item-title",this.title=null,this.layerId=null,this.indexInfo=null,this._debouncedSaveOperations=B(async(e,t,s)=>{switch(e){case I.SAVE:return this._save(t);case I.SAVE_AS:return this._saveAs(s,t)}})}readSpatialReference(e,t){return this._readSpatialReference(t)}_readSpatialReference(e){if(e.spatialReference!=null)return b.fromJSON(e.spatialReference);{const t=e.store,s=t.indexCRS||t.geographicCRS,r=s&&parseInt(s.substring(s.lastIndexOf("/")+1,s.length),10);return r!=null?new b(r):null}}readFullExtent(e,t,s){if(e!=null&&typeof e=="object"){const l=e.spatialReference==null?{...e,spatialReference:this._readSpatialReference(t)}:e;return _.fromJSON(l,s)}const r=t.store,i=this._readSpatialReference(t);return i==null||r==null||r.extent==null||!Array.isArray(r.extent)||r.extent.some(l=>l<A)?null:new _({xmin:r.extent[0],ymin:r.extent[1],xmax:r.extent[2],ymax:r.extent[3],spatialReference:i})}parseVersionString(e){const t={major:Number.NaN,minor:Number.NaN,versionString:e},s=e.split(".");return s.length>=2&&(t.major=parseInt(s[0],10),t.minor=parseInt(s[1],10)),t}readVersion(e,t){const s=t.store,r=s.version!=null?s.version.toString():"";return this.parseVersionString(r)}readTitlePortalItem(e){return this.sublayerTitleMode!=="item-title"?void 0:e}readTitleService(e,t){const s=this.portalItem&&this.portalItem.title;if(this.sublayerTitleMode==="item-title")return Z(this.url,t.name);let r=t.name;if(!r&&this.url){const i=G(this.url);U(i)&&(r=i.title)}return this.sublayerTitleMode==="item-title-and-service-name"&&s&&(r=s+" - "+r),H(r)}set url(e){const t=W({layer:this,url:e,nonStandardUrlAllowed:!1,logger:m});this._set("url",t.url),t.layerId!=null&&this._set("layerId",t.layerId)}writeUrl(e,t,s,r){X(this,e,"layers",t,r)}get parsedUrl(){const e=this._get("url"),t=R(e);return this.layerId!=null&&(t.path=`${t.path}/layers/${this.layerId}`),t}async _fetchIndexAndUpdateExtent(e,t){this.indexInfo=Y(this.parsedUrl.path,this.rootNode,e,this.apiKey,m,t),this.fullExtent==null||this.fullExtent.hasZ||this._updateExtent(await this.indexInfo)}_updateExtent(e){var t,s,r;if((e==null?void 0:e.type)==="page"){const i=e.rootIndex%e.pageSize,l=(s=(t=e.rootPage)==null?void 0:t.nodes)==null?void 0:s[i];if(l==null||l.obb==null||l.obb.center==null||l.obb.halfSize==null)throw new y("sceneservice:invalid-node-page","Invalid node page.");if(l.obb.center[0]<A||this.fullExtent==null||this.fullExtent.hasZ)return;const c=l.obb.halfSize,n=l.obb.center[2],h=Math.sqrt(c[0]*c[0]+c[1]*c[1]+c[2]*c[2]);this.fullExtent.zmin=n-h,this.fullExtent.zmax=n+h}else if((e==null?void 0:e.type)==="node"){const i=(r=e.rootNode)==null?void 0:r.mbs;if(!Array.isArray(i)||i.length!==4||i[0]<A)return;const l=i[2],c=i[3],{fullExtent:n}=this;n&&(n.zmin=l-c,n.zmax=l+c)}}async _fetchService(e){if(this.url==null)throw new y("sceneservice:url-not-set","Scene service can not be loaded without valid portal item or url");if(this.layerId==null&&/SceneServer\/*$/i.test(this.url)){const t=await this._fetchFirstLayerId(e);t!=null&&(this.layerId=t)}return this._fetchServiceLayer(e)}async _fetchFirstLayerId(e){const t=await $(this.url,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});if(t.data&&Array.isArray(t.data.layers)&&t.data.layers.length>0)return t.data.layers[0].id}async _fetchServiceLayer(e){var i,l;const t=await $((l=(i=this.parsedUrl)==null?void 0:i.path)!=null?l:"",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});t.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));let s=!1;if(t.data.layerType&&t.data.layerType==="Voxel"&&(s=!0),s)return this._fetchVoxelServiceLayer();const r=t.data;this.read(r,this._getServiceContext()),this.validateLayer(r)}async _fetchVoxelServiceLayer(e){var s;const t=(await $(((s=this.parsedUrl)==null?void 0:s.path)+"/layer",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(t,this._getServiceContext()),this.validateLayer(t)}_getServiceContext(){var e;return{origin:"service",portalItem:this.portalItem,portal:(e=this.portalItem)==null?void 0:e.portal,url:this.parsedUrl}}async _ensureLoadBeforeSave(){await this.load(),"beforeSave"in this&&typeof this.beforeSave=="function"&&await this.beforeSave()}validateLayer(e){}_updateTypeKeywords(e,t,s){e.typeKeywords||(e.typeKeywords=[]);const r=t.getTypeKeywords();for(const i of r)e.typeKeywords.push(i);e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter((i,l,c)=>c.indexOf(i)===l),s===v.newItem&&(e.typeKeywords=e.typeKeywords.filter(i=>i!=="Hosted Service")))}async _saveAs(e,t){var n,h;const s={...K,...t};let r=Q.from(e);r||(m.error("_saveAs(): requires a portal item parameter"),await Promise.reject(new y("sceneservice:portal-item-required","_saveAs() requires a portal item to save to"))),r.id&&(r=r.clone(),r.id=null);const i=r.portal||E.getDefault();await this._ensureLoadBeforeSave(),r.type=w,r.portal=i;const l={origin:"portal-item",url:null,messages:[],portal:i,portalItem:r,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},c={layers:[this.write({},l)]};return await Promise.all((n=l.resources.pendingOperations)!=null?n:[]),await this._validateAgainstJSONSchema(c,l,s),r.url=this.url,r.title||(r.title=this.title),this._updateTypeKeywords(r,s,v.newItem),await i.signIn(),await((h=i.user)==null?void 0:h.addItem({item:r,folder:s&&s.folder,data:c})),await T(this.resourceReferences,l,null),this.portalItem=r,N(l),l.portalItem=r,r}async _save(e){var i;const t={...K,...e};if(!this.portalItem)throw m.error("_save(): requires the .portalItem property to be set"),new y("sceneservice:portal-item-not-set","Portal item to save to has not been set on this SceneService");if(this.portalItem.type!==w)throw m.error("_save(): Non-matching portal item type. Got "+this.portalItem.type+", expected "+w),new y("sceneservice:portal-item-wrong-type",`Portal item needs to have type "${w}"`);await this._ensureLoadBeforeSave();const s={origin:"portal-item",url:this.portalItem.itemUrl&&R(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||E.getDefault(),portalItem:this.portalItem,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},r={layers:[this.write({},s)]};return await Promise.all((i=s.resources.pendingOperations)!=null?i:[]),await this._validateAgainstJSONSchema(r,s,t),this.portalItem.url=this.url,this.portalItem.title||(this.portalItem.title=this.title),this._updateTypeKeywords(this.portalItem,t,v.existingItem),await this.portalItem.update({data:r}),await T(this.resourceReferences,s,null),N(s),this.portalItem}async _validateAgainstJSONSchema(e,t,s){var n,h,S;let r=(h=(n=t.messages)==null?void 0:n.filter(u=>u.type==="error").map(u=>new y(u.name,u.message,u.details)))!=null?h:[];(S=s==null?void 0:s.validationOptions)!=null&&S.ignoreUnsupported&&(r=r.filter(u=>u.name!=="layer:unsupported"&&u.name!=="symbol:unsupported"&&u.name!=="symbol-layer:unsupported"&&u.name!=="property:unsupported"&&u.name!=="url:unsupported"&&u.name!=="scenemodification:unsupported"));const i=s==null?void 0:s.validationOptions,l=i==null?void 0:i.enabled,c=re();if(l&&c){const u=(await c()).validate(e,s.portalItemLayerType);if(u.length>0){const x=`Layer item did not validate:
${u.join(`
`)}`;if(m.error(`_validateAgainstJSONSchema(): ${x}`),i.failPolicy==="throw"){const g=u.map(P=>new y("sceneservice:schema-validation",P)).concat(r);throw new y("sceneservice-validate:error","Failed to save layer item due to schema validation, see `details.errors`.",{combined:g})}}}if(r.length>0)throw new y("sceneservice:save","Failed to save SceneService due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:r})}};return p([d(k)],o.prototype,"id",void 0),p([d({type:b})],o.prototype,"spatialReference",void 0),p([f("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],o.prototype,"readSpatialReference",null),p([d({type:_})],o.prototype,"fullExtent",void 0),p([f("fullExtent",["fullExtent","store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],o.prototype,"readFullExtent",null),p([d({readOnly:!0,type:M})],o.prototype,"heightModelInfo",void 0),p([d({type:Number,json:{name:"layerDefinition.minScale",write:!0,origins:{service:{read:{source:"minScale"},write:!1}}}})],o.prototype,"minScale",void 0),p([d({type:Number,json:{name:"layerDefinition.maxScale",write:!0,origins:{service:{read:{source:"maxScale"},write:!1}}}})],o.prototype,"maxScale",void 0),p([d({readOnly:!0})],o.prototype,"version",void 0),p([f("version",["store.version"])],o.prototype,"readVersion",null),p([d({type:String,json:{read:{source:"copyrightText"}}})],o.prototype,"copyright",void 0),p([d({type:String,json:{read:!1}})],o.prototype,"sublayerTitleMode",void 0),p([d({type:String})],o.prototype,"title",void 0),p([f("portal-item","title")],o.prototype,"readTitlePortalItem",null),p([f("service","title",["name"])],o.prototype,"readTitleService",null),p([d({type:Number,json:{origins:{service:{read:{source:"id"}},"portal-item":{write:{target:"id",isRequired:!0,ignoreOrigin:!0},read:!1}}}})],o.prototype,"layerId",void 0),p([d(z)],o.prototype,"url",null),p([J("url")],o.prototype,"writeUrl",null),p([d()],o.prototype,"parsedUrl",null),p([d({readOnly:!0})],o.prototype,"store",void 0),p([d({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],o.prototype,"rootNode",void 0),o=p([D(L)],o),o},A=-1e38;var v;(function(a){a[a.existingItem=0]="existingItem",a[a.newItem=1]="newItem"})(v||(v={}));const w="Scene Service",K={getTypeKeywords:()=>[],portalItemLayerType:"unknown",validationOptions:{enabled:!0,ignoreUnsupported:!1,failPolicy:"throw"}};var I;(function(a){a[a.SAVE=0]="SAVE",a[a.SAVE_AS=1]="SAVE_AS"})(I||(I={}));export{le as E,I as L};