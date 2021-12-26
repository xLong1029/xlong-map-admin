var P=Object.defineProperty,k=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var _=(o,a,e)=>a in o?P(o,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[a]=e,y=(o,a)=>{for(var e in a||(a={}))M.call(a,e)&&_(o,e,a[e]);if(b)for(var e of b(a))F.call(a,e)&&_(o,e,a[e]);return o},O=(o,a)=>k(o,q(a));import{rD as C,rx as V,ap as z,T as J,an as u,R,X as D,e as p,d,rE as B,cn as g,f6 as f,a8 as w,kL as G,kM as H,dc as Z,i as X,el as Q,rF as W,lc as Y,r as ee,rG as te,rH as re,rI as ae,dy as N,bb as S,ec as ie,dx as j}from"./index.988b09cd.js";import{n as se}from"./I3SIndexInfo.c2d3f440.js";import{getSiblingOfSameTypeI as oe}from"./resourceUtils.c74f626c.js";function T(o){o&&o.writtenProperties&&o.writtenProperties.forEach(a=>{const e=a.target;a.newOrigin&&a.oldOrigin!==a.newOrigin&&C(e)&&e.updateOrigin(a.propName,a.newOrigin)})}async function $(o,a,e){if(!a||!a.resources)return;const t=a.portalItem===o.portalItem?new Set(o.paths):new Set;o.paths.length=0,o.portalItem=a.portalItem;const s=new Set(a.resources.toKeep.map(l=>l.resource.path)),r=new Set,i=[];s.forEach(l=>{t.delete(l),o.paths.push(l)});for(const l of a.resources.toUpdate)if(t.delete(l.resource.path),s.has(l.resource.path)||r.has(l.resource.path)){const{resource:h,content:K,finish:A,error:L}=l,x=oe(h,V());o.paths.push(x.path),i.push(E({resource:x,content:K,finish:A,error:L},e))}else o.paths.push(l.resource.path),i.push(ne(l,e)),r.add(l.resource.path);for(const l of a.resources.toAdd)i.push(E(l,e)),o.paths.push(l.resource.path);if(t.forEach(l=>{const h=a.portalItem.resourceFromPath(l);i.push(h.portalItem.removeResource(h).catch(()=>{}))}),i.length===0)return;const n=await z(i);J(e);const c=n.filter(l=>"error"in l).map(l=>l.error);if(c.length>0)throw new u("save:resources","Failed to save one or more resources",{errors:c})}async function E(o,a){const e=await R(o.resource.portalItem.addResource(o.resource,o.content,a));if(e.ok!==!0)throw o.error&&o.error(e.error),e.error;o.finish&&o.finish(o.resource)}async function ne(o,a){const e=await R(o.resource.update(o.content,a));if(e.ok!==!0)throw o.error(e.error),e.error;o.finish(o.resource)}const m=D.getLogger("esri.layers.mixins.SceneService"),he=o=>{let a=class extends o{constructor(){super(...arguments),this.spatialReference=null,this.fullExtent=null,this.heightModelInfo=null,this.minScale=0,this.maxScale=0,this.version={major:Number.NaN,minor:Number.NaN,versionString:""},this.copyright=null,this.sublayerTitleMode="item-title",this.title=null,this.layerId=null,this.indexInfo=null,this._debouncedSaveOperations=Q(async(e,t,s)=>{switch(e){case 0:return this._save(t);case 1:return this._saveAs(s,t)}})}readSpatialReference(e,t){return this._readSpatialReference(t)}_readSpatialReference(e){if(e.spatialReference!=null)return g.fromJSON(e.spatialReference);{const t=e.store,s=t.indexCRS||t.geographicCRS,r=s&&parseInt(s.substring(s.lastIndexOf("/")+1,s.length),10);return r!=null?new g(r):null}}readFullExtent(e,t,s){if(e!=null&&typeof e=="object"){const n=e.spatialReference==null?O(y({},e),{spatialReference:this._readSpatialReference(t)}):e;return w.fromJSON(n,s)}const r=t.store,i=this._readSpatialReference(t);return i==null||r==null||r.extent==null||!Array.isArray(r.extent)||r.extent.some(n=>n<I)?null:new w({xmin:r.extent[0],ymin:r.extent[1],xmax:r.extent[2],ymax:r.extent[3],spatialReference:i})}parseVersionString(e){const t={major:Number.NaN,minor:Number.NaN,versionString:e},s=e.split(".");return s.length>=2&&(t.major=parseInt(s[0],10),t.minor=parseInt(s[1],10)),t}readVersion(e,t){const s=t.store,r=s.version!=null?s.version.toString():"";return this.parseVersionString(r)}readTitlePortalItem(e){return this.sublayerTitleMode!=="item-title"?void 0:e}readTitleService(e,t){const s=this.portalItem&&this.portalItem.title;if(this.sublayerTitleMode==="item-title")return W(this.url,t.name);let r=t.name;if(!r&&this.url){const i=Y(this.url);ee(i)&&(r=i.title)}return this.sublayerTitleMode==="item-title-and-service-name"&&s&&(r=s+" - "+r),te(r)}set url(e){const t=re({layer:this,url:e,nonStandardUrlAllowed:!1,logger:m});this._set("url",t.url),t.layerId!=null&&this._set("layerId",t.layerId)}writeUrl(e,t,s,r){ae(this,e,"layers",t,r)}get parsedUrl(){const e=this._get("url");if(!e)return null;const t=N(e);return this.layerId!=null&&(t.path=`${t.path}/layers/${this.layerId}`),t}async _fetchIndexAndUpdateExtent(e,t){this.indexInfo=se(this.parsedUrl.path,this.rootNode,e,this.apiKey,m,t),this.fullExtent==null||this.fullExtent.hasZ||this._updateExtent(await this.indexInfo)}_updateExtent(e){if((e==null?void 0:e.type)==="page"){var t,s;const i=e.rootIndex%e.pageSize,n=(t=e.rootPage)==null||(s=t.nodes)==null?void 0:s[i];if(n==null||n.obb==null||n.obb.center==null||n.obb.halfSize==null)throw new u("sceneservice:invalid-node-page","Invalid node page.");if(n.obb.center[0]<I||this.fullExtent==null||this.fullExtent.hasZ)return;const c=n.obb.halfSize,l=n.obb.center[2],h=Math.sqrt(c[0]*c[0]+c[1]*c[1]+c[2]*c[2]);this.fullExtent.zmin=l-h,this.fullExtent.zmax=l+h}else if((e==null?void 0:e.type)==="node"){var r;const i=(r=e.rootNode)==null?void 0:r.mbs;if(!Array.isArray(i)||i.length!==4||i[0]<I)return;const n=i[2],c=i[3];this.fullExtent.zmin=n-c,this.fullExtent.zmax=n+c}}async _fetchService(e){if(this.url==null)throw new u("sceneservice:url-not-set","Scene service can not be loaded without valid portal item or url");if(this.layerId==null&&/SceneServer\/*$/i.test(this.url)){const t=await this._fetchFirstLayerId(e);t!=null&&(this.layerId=t)}return this._fetchServiceLayer(e)}async _fetchFirstLayerId(e){const t=await S(this.url,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});if(t.data&&Array.isArray(t.data.layers)&&t.data.layers.length>0)return t.data.layers[0].id}async _fetchServiceLayer(e){const t=await S(this.parsedUrl.path,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});t.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));let s=!1;if(t.data.layerType&&t.data.layerType==="Voxel"&&(s=!0),s)return this.read(t.data,{origin:"service",url:this.parsedUrl}),this._fetchVoxelServiceLayer();const r=t.data;this.read(r,{origin:"service",url:this.parsedUrl}),this.validateLayer(r)}async _fetchVoxelServiceLayer(e){const t=(await S(this.parsedUrl.path+"/layer",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(t,{origin:"service",url:this.parsedUrl}),this.validateLayer(t)}async _ensureLoadBeforeSave(){await this.load(),"beforeSave"in this&&typeof this.beforeSave=="function"&&await this.beforeSave()}validateLayer(e){}_updateTypeKeywords(e,t,s){e.typeKeywords||(e.typeKeywords=[]);const r=t.getTypeKeywords();for(const i of r)e.typeKeywords.push(i);e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter((i,n,c)=>c.indexOf(i)===n),s===1&&(e.typeKeywords=e.typeKeywords.filter(i=>i!=="Hosted Service")))}async _saveAs(e,t){const s=y(y({},U),t);let r=ie.from(e);r||(m.error("_saveAs(): requires a portal item parameter"),await Promise.reject(new u("sceneservice:portal-item-required","_saveAs() requires a portal item to save to"))),r.id&&(r=r.clone(),r.id=null);const i=r.portal||j.getDefault();await this._ensureLoadBeforeSave(),r.type=v,r.portal=i;const n={origin:"portal-item",url:null,messages:[],portal:i,portalItem:r,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},c={layers:[this.write({},n)]};return await Promise.all(n.resources.pendingOperations),await this._validateAgainstJSONSchema(c,n,s),r.url=this.url,r.title||(r.title=this.title),this._updateTypeKeywords(r,s,1),await i._signIn(),await i.user.addItem({item:r,folder:s&&s.folder,data:c}),await $(this.resourceReferences,n,null),this.portalItem=r,T(n),n.portalItem=r,r}async _save(e){const t=y(y({},U),e);this.portalItem||(m.error("_save(): requires the .portalItem property to be set"),await Promise.reject(new u("sceneservice:portal-item-not-set","Portal item to save to has not been set on this SceneService"))),this.portalItem.type!==v&&(m.error("_save(): Non-matching portal item type. Got "+this.portalItem.type+", expected "+v),await Promise.reject(new u("sceneservice:portal-item-wrong-type",`Portal item needs to have type "${v}"`))),await this._ensureLoadBeforeSave();const s={origin:"portal-item",url:this.portalItem.itemUrl&&N(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||j.getDefault(),portalItem:this.portalItem,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},r={layers:[this.write({},s)]};return await Promise.all(s.resources.pendingOperations),await this._validateAgainstJSONSchema(r,s,t),this.portalItem.url=this.url,this.portalItem.title||(this.portalItem.title=this.title),this._updateTypeKeywords(this.portalItem,t,0),await this.portalItem.update({data:r}),await $(this.resourceReferences,s,null),T(s),this.portalItem}async _validateAgainstJSONSchema(e,t,s){let r=t.messages.filter(i=>i.type==="error").map(i=>new u(i.name,i.message,i.details));if(s&&s.validationOptions.ignoreUnsupported&&(r=r.filter(i=>i.name!=="layer:unsupported"&&i.name!=="symbol:unsupported"&&i.name!=="symbol-layer:unsupported"&&i.name!=="property:unsupported"&&i.name!=="url:unsupported"&&i.name!=="scenemodification:unsupported")),s.validationOptions.enabled||le){const i=(await import("./schemaValidator.cc66ea34.js")).validate(e,s.portalItemLayerType);if(i.length>0){const n=`Layer item did not validate:
${i.join(`
`)}`;if(m.error(`_validateAgainstJSONSchema(): ${n}`),s.validationOptions.failPolicy==="throw"){const c=i.map(l=>new u("sceneservice:schema-validation",l)).concat(r);throw new u("sceneservice-validate:error","Failed to save layer item due to schema validation, see `details.errors`.",{combined:c})}}}if(r.length>0)throw new u("sceneservice:save","Failed to save SceneService due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:r})}};return p([d(B)],a.prototype,"id",void 0),p([d({type:g})],a.prototype,"spatialReference",void 0),p([f("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],a.prototype,"readSpatialReference",null),p([d({type:w})],a.prototype,"fullExtent",void 0),p([f("fullExtent",["fullExtent","store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],a.prototype,"readFullExtent",null),p([d({readOnly:!0,type:G})],a.prototype,"heightModelInfo",void 0),p([d({type:Number,json:{name:"layerDefinition.minScale",write:!0,origins:{service:{read:{source:"minScale"},write:!1}}}})],a.prototype,"minScale",void 0),p([d({type:Number,json:{name:"layerDefinition.maxScale",write:!0,origins:{service:{read:{source:"maxScale"},write:!1}}}})],a.prototype,"maxScale",void 0),p([d({readOnly:!0})],a.prototype,"version",void 0),p([f("version",["store.version"])],a.prototype,"readVersion",null),p([d({type:String,json:{read:{source:"copyrightText"}}})],a.prototype,"copyright",void 0),p([d({type:String,json:{read:!1}})],a.prototype,"sublayerTitleMode",void 0),p([d({type:String})],a.prototype,"title",void 0),p([f("portal-item","title")],a.prototype,"readTitlePortalItem",null),p([f("service","title",["name"])],a.prototype,"readTitleService",null),p([d({type:Number,json:{origins:{service:{read:{source:"id"}},"portal-item":{write:{target:"id",isRequired:!0,ignoreOrigin:!0},read:!1}}}})],a.prototype,"layerId",void 0),p([d(H)],a.prototype,"url",null),p([Z("url")],a.prototype,"writeUrl",null),p([d()],a.prototype,"parsedUrl",null),p([d({readOnly:!0})],a.prototype,"store",void 0),p([d({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],a.prototype,"rootNode",void 0),a=p([X("esri.layers.mixins.SceneService")],a),a},I=-1e38,le=!1,v="Scene Service",U={getTypeKeywords:()=>[],portalItemLayerType:"unknown",validationOptions:{enabled:!0,ignoreUnsupported:!1,failPolicy:"throw"}};export{he as N};