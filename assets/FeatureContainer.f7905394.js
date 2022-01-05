import{db as k,fB as X,fC as G,ee as W,df as tt,dc as et,dd as st,en as it,d2 as rt,b1 as E,b6 as p,bF as at,f6 as O,eI as f,bD as V,cp as _,c5 as P,eN as A,f7 as nt,fD as b,cQ as L,bJ as C,cN as ot,e2 as dt,d1 as R,fE as ht,dl as ut,b2 as lt,fF as ct}from"./vendor.47ccae81.js";import{o as I,Z as N,K as _t,A as U,B as $,C as B,D as q,r as pt}from"./definitions.21e97413.js";import{n as Et,l as ft,f as K}from"./visualVariablesUtils.169867fe.js";import{Q as m,H as xt,b as j,P as Y}from"./Utils.30b0e1a1.js";import{o as Rt}from"./TileContainer.b343a31f.js";class vt{acquire(t){return{refCount:1,version:-1,labelMat2d:k(),tileMat3:k(),dvs:k()}}release(t){}}class y extends X{constructor(t,e,s){super(t,e,s,I,I)}destroy(){super.destroy(),this._transforms&&y.TransformCache.release(this.key.hash)}setTransform(t,e){const s=e/(t.resolution*t.pixelRatio),i=this.transforms.tileMat3,[r,a]=t.toScreenNoRotation([0,0],[this.x,this.y]),o=this.width/this.rangeX*s,n=this.height/this.rangeY*s;G(i,o,0,0,0,n,0,r,a,1),W(this.transforms.dvs,t.displayViewMat3,i);const h=this.transforms.labelMat2d,l=t.getScreenTransform(h,e),c=rt();tt(c,[this.x,this.y],l),et(h),st(h,h,c),it(h,t.viewMat2d,h)}_createTransforms(){return y.TransformCache.acquire(this.key.hash)}}y.TransformCache=new vt;const T=2147483647;class x{constructor(t){this._head=t,this._cursor=t}static from(t,e=0,s=t.byteLength/d.BYTES_PER_RECORD-e){const i=new d(new Int32Array(t,e*d.BYTES_PER_RECORD,s*d.ELEMENTS_PER_RECORD));return new x(i)}size(){let t=this._cursor,e=0;for(;t;)e+=t.size(),t=t._link;return e}get id(){return this._cursor.id}set id(t){this._cursor.id=t}get materialKey(){return this._cursor.materialKey}set materialKey(t){this._cursor.materialKey=t}get insertAfter(){return this._cursor.insertAfter}get indexFrom(){return this._cursor.indexFrom}set indexFrom(t){this._cursor.indexFrom=t}get indexCount(){return this._cursor.indexCount}set indexCount(t){this._cursor.indexCount=t}get vertexFrom(){return this._cursor.vertexFrom}set vertexFrom(t){this._cursor.vertexFrom=t}get vertexCount(){return this._cursor.vertexCount}set vertexCount(t){this._cursor.vertexCount=t}get sortKey(){return this._cursor.sortKey}set sortKey(t){this._cursor.sortKey=t}get index(){return this._cursor._indexStart+this._cursor._index}seekIndex(t){let e=t;for(this._cursor=this._head;this._cursor;){const s=this._cursor.size();if(e<s)return this._cursor._index=e,!0;e-=s,this._cursor=this._cursor._link}return!1}forEach(t){const e=this.getCursor();for(;e.next();)t(e)}link(t){if(!this._head)return void(this._head=t._head);let e=this._head;for(;e._link;)e=e._link;e._link=t._head,e._link._indexStart=e._indexStart+e.size()}getCursor(){return this.copy()}lookup(t){for(this._cursor=this._head;this._cursor&&!this._cursor.lookup(t);){if(!this._cursor._link)return!1;this._cursor=this._cursor._link}return!!this._cursor}copy(){var t;const e=new x((t=this._head)==null?void 0:t.copy());if(!e._head)return e;let s=e._head,i=e._head._link;for(;i;)s._link=i.copy(),s=i,i=s._link;return e}next(){return!!this._cursor&&(!!this._cursor.next()||!!this._cursor._link&&(this._cursor=this._cursor._link,this.next()))}peekId(){var t;return(t=this._cursor.peekId())!=null?t:this._cursor._link.peekId()}delete(t){let e=this._head,s=null;for(;e;){if(e.delete(t))return e.isEmpty()&&(E(s)&&(s._link=e._link),e===this._head&&(this._head=e._link),e===this._cursor&&(this._cursor=e._link)),!0;s=e,e=e._link}return!1}}x.ELEMENTS_PER_RECORD=N,x.BYTES_PER_RECORD=x.ELEMENTS_PER_RECORD*Int32Array.BYTES_PER_ELEMENT;class d{constructor(t){this._link=null,this._index=-1,this._indexStart=0,this._deletedCount=0,this._offsets={instance:null},this._packedRecords=t}static from(t,e=0,s=t.byteLength/this.BYTES_PER_RECORD-e){return new d(new Int32Array(t,e*this.BYTES_PER_RECORD,s*this.ELEMENTS_PER_RECORD))}delete(t){const e=this._index,s=this.lookup(t);if(s)for(this.id=T,++this._deletedCount;this.next()&&this.id===t;)this.id=T,++this._deletedCount;return this._index=e,s}isEmpty(){return this._deletedCount===this.size()}link(t){this._link?this._link.link(t):this._link=t}lookup(t){if(p(this._offsets.instance)){this._offsets.instance=new Map;const s=this.copy();s._index=-1;let i=0;for(;s.next();)s.id!==i&&(this._offsets.instance.set(s.id,s._index),i=s.id)}if(!this._offsets.instance.has(t))return!1;const e=this._index;return this._index=this._offsets.instance.get(t),this.id!==T||(this._index=e,!1)}get id(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD]}set id(t){this._packedRecords[this._index*d.ELEMENTS_PER_RECORD]=t}get materialKey(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+1]}set materialKey(t){this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+1]=t}get insertAfter(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+2]}get indexFrom(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+3]}set indexFrom(t){this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+3]=t}get indexCount(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+4]}set indexCount(t){this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+4]=t}get vertexFrom(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+5]}set vertexFrom(t){this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+5]=t}get vertexCount(){return this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+6]}set vertexCount(t){this._packedRecords[this._index*d.ELEMENTS_PER_RECORD+6]=t}get sortKey(){return this._packedRecordsF32||(this._packedRecordsF32=new Float32Array(this._packedRecords.buffer)),this._packedRecordsF32[this._index*d.ELEMENTS_PER_RECORD+7]}set sortKey(t){this._packedRecordsF32||(this._packedRecordsF32=new Float32Array(this._packedRecords.buffer)),this._packedRecordsF32[this._index*d.ELEMENTS_PER_RECORD+7]=t}get index(){return this._index}size(){return this._packedRecords.length/d.ELEMENTS_PER_RECORD}next(){for(;++this._index<this.size()&&this.id===T;);return this._index<this.size()}peekId(){const t=(this._index+1)*d.ELEMENTS_PER_RECORD;return t>=this._packedRecords.length?0:this._packedRecords[t]}getCursor(){return this.copy()}copy(){const t=new d(this._packedRecords);return t._indexStart=this._indexStart,t._link=this._link,t._index=this._index,t._offsets=this._offsets,t._deletedCount=this._deletedCount,t}}d.ELEMENTS_PER_RECORD=N,d.BYTES_PER_RECORD=d.ELEMENTS_PER_RECORD*Int32Array.BYTES_PER_ELEMENT;const z=at.getLogger("esri.views.2d.engine.webgl.AttributeStoreView"),D=Et(ft,z);class Q{constructor(t,e,s){this._texture=null,this._lastTexture=null,this._fbos={},this.texelSize=4;const{buffer:i,pixelType:r,textureOnly:a}=t,o=m(r);this.shared=s,this.pixelType=r,this.size=e,this.textureOnly=a,a||(this.data=new o(_(i))),this._resetRange()}destroy(){f(this._texture,t=>t.dispose());for(const t in this._fbos)f(this._fbos[t],e=>{t==="0"&&e.detachColorTexture(),e.dispose()}),this._fbos[t]=null;this._texture=null}get _textureDesc(){return{target:3553,wrapMode:33071,pixelFormat:6408,dataType:this.pixelType,samplingMode:9728,width:this.size,height:this.size}}setData(t,e,s){const i=K(t),r=_(this.data),a=i*this.texelSize+e;!r||a>=r.length||(r[a]=s,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i))}getData(t,e){if(p(this.data))return null;const s=K(t)*this.texelSize+e;return!this.data||s>=this.data.length?null:this.data[s]}getTexture(t){return C(this._texture,()=>this._initTexture(t))}getFBO(t,e=0){if(p(this._fbos[e])){const s={colorTarget:0,depthStencilTarget:0},i=e===0?this.getTexture(t):this._textureDesc;this._fbos[e]=new ot(t,s,i)}return this._fbos[e]}get locked(){return!(this.pixelType!==5121||!this.shared||this.textureOnly||!V("esri-atomics")||!this.data)&&Atomics.load(this.data,0)===1}get hasDirty(){const t=this.dirtyStart;return this.dirtyEnd>=t}updateTexture(t,e){if(!this.locked){try{const s=this.dirtyStart,i=this.dirtyEnd;if(!this.hasDirty)return;this._resetRange();const r=_(this.data).buffer,a=this.getTexture(t),o=4,n=(s-s%this.size)/this.size,h=(i-i%this.size)/this.size,l=n,c=this.size,v=h,g=n*this.size*o,S=(c+v*this.size)*o-g,M=m(this.pixelType),Z=new M(r,g*M.BYTES_PER_ELEMENT,S),J=this.size,F=v-l+1;if(F>this.size)return void z.error(new P("mapview-webgl","Out-of-bounds index when updating AttributeData"));a.updateData(0,0,l,J,F,Z)}catch{}e()}}update(t){const{data:e,start:s,end:i}=t;if(E(e)){const r=this.data,a=s*this.texelSize;for(let o=0;o<e.length;o++){const n=1<<o%this.texelSize;t.layout&n&&(r[a+o]=e[o])}}this.dirtyStart=Math.min(this.dirtyStart,s),this.dirtyEnd=Math.max(this.dirtyEnd,i)}resize(t,e){const s=this.size;if(this.size=e,this.textureOnly)return void(s!==this.size&&(this._lastTexture=this._texture,this._texture=null));const i=m(this.pixelType);this.destroy(),this.data=new i(_(t.buffer))}_resetRange(){this.dirtyStart=2147483647,this.dirtyEnd=0}_initTexture(t){const e=new L(t,this._textureDesc,C(this.data,void 0));if(E(this._lastTexture)&&this._fbos[0]){const s=this._lastTexture.descriptor.width,i=this._lastTexture.descriptor.height,r=this._lastTexture.descriptor.dataType,a=this._lastTexture.descriptor.pixelFormat,o=this.getFBO(t),n=xt(r),h=new(m(r))(new ArrayBuffer(s*i*n*this.texelSize)),l=t.getBoundFramebufferObject(),{x:c,y:v,width:g,height:S}=t.getViewport();t.bindFramebuffer(o),o.readPixels(0,0,s,i,a,r,h),e.updateData(0,0,0,2*s,i/2,h),t.setViewport(c,v,g,S),t.bindFramebuffer(l)}return this.destroy(),this._texture=e,this._texture}}class gt{constructor(t){this._onUpdate=t,this._initialized=!1,this._forceNextUpload=!1,this._locked=!1}initialize(t){const{blocks:e,shared:s,size:i}=t;if(this.shared=s,this.size=i,D("Initializing AttributeStoreView",t),p(this._data))this._data=O(e,r=>new Q(r,i,s));else for(let r=0;r<this._data.length;r++){const a=this._data[r],o=e[r];E(o)&&(p(a)?this._data[r]=new Q(o,i,s):a.resize(o,i))}this._initialized=!0}destroy(){f(this._data,t=>O(t,e=>e.destroy())),f(this._defaultTexture,t=>t.dispose())}isEmpty(){const t=this._data;return p(t)}isUpdating(){const t=E(this._pendingAttributeUpdate),e=t;return V("esri-2d-log-updating")&&console.log(`Updating AttributeStoreView ${e}
  -> hasPendingUpdate ${t}`),e}getBlock(t){return p(this._data)?null:this._data[t]}setLabelMinZoom(t,e){this.setData(t,0,1,e)}getLabelMinZoom(t){return this.getData(t,0,1,255)}getFilterFlags(t){return this.getData(t,0,0,0)}getVVSize(t){return this.getData(t,_t,0,0)}getData(t,e,s,i){if(!this._data)return 0;const r=_(this._data)[e];if(p(r))return 0;const a=r.getData(t,s);return E(a)?a:i}setData(t,e,s,i){const r=_(this._data)[e];_(r).setData(t,s,i)}lockTextureUpload(){this._locked=!0}unlockTextureUpload(){this._locked=!1}forceTextureUpload(){this._forceNextUpload=!0}async requestUpdate(t){if(this._pendingAttributeUpdate)return void z.error(new P("mapview-webgl","Tried to update attribute data with a pending update"));const e=A();return D("AttributeStoreView Update Requested",t),this._pendingAttributeUpdate={data:t,resolver:e},e.promise}update(){if(this._initialized&&E(this._pendingAttributeUpdate)){const{data:t,resolver:e}=this._pendingAttributeUpdate,s=_(this._data);for(let i=0;i<t.blocks.length;i++){const r=t.blocks[i],a=s[i];f(a,o=>f(r,n=>{D(`Updating block ${i}`,n),o.update(n)}))}this._pendingAttributeUpdate=null,e(),this._onUpdate()}}bindTextures(t,e=!0){this.update();const s=this._getDefaultTexture(t);if(!this._initialized)return t.bindTexture(s,U),void(e&&(t.bindTexture(s,$),t.bindTexture(s,B),t.bindTexture(s,q)));const i=_(this._data);this._locked&&!this._forceNextUpload||(nt(i,r=>r.updateTexture(t,()=>this._onUpdate())),this._forceNextUpload=!1),t.bindTexture(b(i[0],s,r=>r.getTexture(t)),U),e&&(t.bindTexture(b(i[1],s,r=>r.getTexture(t)),$),t.bindTexture(b(i[2],s,r=>r.getTexture(t)),B),t.bindTexture(b(i[3],s,r=>r.getTexture(t)),q))}_getDefaultTexture(t){if(p(this._defaultTexture)){const e={wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1};this._defaultTexture=new L(t,e,new Uint8Array(4))}return this._defaultTexture}}function w(u,t){const e=t.length;if(u<t[0].value||e===1)return t[0].size;for(let s=1;s<e;s++)if(u<t[s].value){const i=(u-t[s-1].value)/(t[s].value-t[s-1].value);return t[s-1].size+i*(t[s].size-t[s-1].size)}return t[e-1].size}function H(u,t,e=0){if(p(t))return u[e+0]=0,u[e+1]=0,u[e+2]=0,void(u[e+3]=0);const{r:s,g:i,b:r,a}=t;u[e+0]=s*a/255,u[e+1]=i*a/255,u[e+2]=r*a/255,u[e+3]=a}class bt{constructor(){this.symbolLevels=[],this.vvColorValues=new Float32Array(8),this.vvColors=new Float32Array(32),this.vvOpacityValues=new Float32Array(8),this.vvOpacities=new Float32Array(8),this.vvSizeMinMaxValue=new Float32Array(4),this.ddColors=new Float32Array(32),this.ddBackgroundColor=new Float32Array(4),this.ddActiveDots=new Float32Array(8),this._vvMaterialParameters={vvSizeEnabled:!1,vvColorEnabled:!1,vvRotationEnabled:!1,vvRotationType:"geographic",vvOpacityEnabled:!1}}getSizeVVFieldStops(t){const e=this._vvSizeFieldStops;switch(e.type){case"static":return e;case"level-dependent":return C(e.levels[t],()=>{let s=1/0,i=0;for(const n in e.levels){const h=parseFloat(n),l=Math.abs(t-h);l<s&&(s=l,i=h)}if(s===1/0)return{sizes:new Float32Array([0,0,0,0,0,0]),values:new Float32Array([0,0,0,0,0,0])};const r=2**((t-i)/2),a=_(e.levels[i]),o=new Float32Array(a.values);return o[2]*=r,o[3]*=r,{sizes:_(a.sizes),values:o}})}}get vvMaterialParameters(){return this._vvMaterialParameters}update(t){E(this._vvInfo)&&this._updateVisualVariables(this._vvInfo.vvRanges,t)}setInfo(t,e,s){this._updateEffects(s),this._vvInfo=e,t.type==="dot-density"&&this._updateDotDensityInfo(t)}getVariation(){return{ddDotBlending:this.ddDotBlending,outsideLabelsVisible:this.outsideLabelsVisible,oesTextureFloat:dt().supportsTextureFloat}}getVariationHash(){return(this.ddDotBlending?1:0)|(this.outsideLabelsVisible?1:0)<<1}_updateEffects(t){E(t)?this.outsideLabelsVisible=t.excludedLabelsVisible:this.outsideLabelsVisible=!1}_updateVisualVariables(t,e){const s=this._vvMaterialParameters;if(s.vvOpacityEnabled=!1,s.vvSizeEnabled=!1,s.vvColorEnabled=!1,s.vvRotationEnabled=!1,!t)return;const i=t.size;if(i){if(s.vvSizeEnabled=!0,i.minMaxValue){const n=i.minMaxValue;let h,l;if(j(n.minSize)&&j(n.maxSize))if(Y(n.minSize)&&Y(n.maxSize))h=R(n.minSize),l=R(n.maxSize);else{const c=e.scale;h=R(w(c,n.minSize.stops)),l=R(w(c,n.maxSize.stops))}this.vvSizeMinMaxValue.set([n.minDataValue,n.maxDataValue,h,l])}if(i.scaleStops&&(this.vvSizeScaleStopsValue=R(w(e.scale,i.scaleStops.stops))),i.unitValue){const n=ht(e.spatialReference)/ut[i.unitValue.unit];this.vvSizeUnitValueToPixelsRatio=n/e.resolution}i.fieldStops&&(this._vvSizeFieldStops=i.fieldStops)}const r=t.color;r&&(s.vvColorEnabled=!0,this.vvColorValues.set(r.values),this.vvColors.set(r.colors));const a=t.opacity;a&&(s.vvOpacityEnabled=!0,this.vvOpacityValues.set(a.values),this.vvOpacities.set(a.opacities));const o=t.rotation;o&&(s.vvRotationEnabled=!0,s.vvRotationType=o.type)}_updateDotDensityInfo(t){const e=t.attributes;this.ddDotValue=t.dotValue,this.ddDotScale=t.referenceScale,this.ddDotSize=t.dotSize,this.ddDotBlending=t.dotBlendingEnabled,this.ddSeed=t.seed;for(let s=0;s<pt;s++){const i=s>=e.length?new lt([0,0,0,0]):e[s].color;H(this.ddColors,i,4*s)}for(let s=0;s<8;s++)this.ddActiveDots[s]=s<t.attributes.length?1:0;H(this.ddBackgroundColor,t.backgroundColor)}}class Ct extends Rt{constructor(t){super(t),this._rendererInfo=new bt,this._materialItemsRequestQueue=new ct,this.attributeView=new gt(()=>this.onAttributeStoreUpdate())}destroy(){this.removeAllChildren(),this.children.forEach(t=>t.destroy()),this.attributeView.destroy(),this._materialItemsRequestQueue.clear()}setRendererInfo(t,e,s){this._rendererInfo.setInfo(t,e,s),this.requestRender()}async getMaterialItems(t,e){if(!t||t.length===0)return null;const s=A();return this._materialItemsRequestQueue.push({items:t,abortOptions:e,resolver:s}),this.requestRender(),s.promise}doRender(t){if(t.context.capabilities.enable("textureFloat"),t.context.capabilities.enable("vao"),this._materialItemsRequestQueue.length>0){let e=this._materialItemsRequestQueue.pop();for(;e;)this._processMaterialItemRequest(t,e),e=this._materialItemsRequestQueue.pop()}super.doRender(t)}renderChildren(t){for(const e of this.children)e.commit(t);this._rendererInfo.update(t.state),super.renderChildren(t)}createRenderParams(t){const e=super.createRenderParams(t);return e.rendererInfo=this._rendererInfo,e.attributeView=this.attributeView,e}onAttributeStoreUpdate(){}_processMaterialItemRequest(t,{items:e,abortOptions:s,resolver:i}){const{painter:r,pixelRatio:a}=t,o=e.map(n=>r.textureManager.rasterizeItem(n.symbol,a,n.glyphIds,s));Promise.all(o).then(n=>{if(!this.stage)return void i.reject();const h=n.map((l,c)=>({id:e[c].id,mosaicItem:l}));i.resolve(h)},i.reject)}}export{y as f,x as i,Ct as o};