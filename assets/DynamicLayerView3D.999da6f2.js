var U=Object.defineProperty,k=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var G=(e,t,i)=>t in e?U(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,D=(e,t)=>{for(var i in t||(t={}))B.call(t,i)&&G(e,i,t[i]);if(L)for(var i of L(t))N.call(t,i)&&G(e,i,t[i]);return e},P=(e,t)=>k(e,W(t));import{cl as x,cm as w,ej as X,ch as Z,ek as J,X as T,ef as K,eg as Q,el as Y,g as S,t as O,em as ee,aP as A,ap as te,a8 as z,en as ie,eo as ae,be as se,bg as re,bf as H,aV as E,ep as ne,r as j,eq as oe,R as le,T as V,er as he,es as de,et as ce,av as ue,e as f,d as _,i as ge}from"./index.988b09cd.js";import{l as me}from"./projectExtentUtils.237a1767.js";import{i as ye}from"./RefreshableLayerView.c8d2ecf1.js";function pe(e,t,i){const s=x(e)/w(e),a={width:i,height:i};return s>1.0001?a.height=i/s:s<.9999&&(a.width=i*s),a.width=Math.round(a.width/(x(e)/x(t))),a.height=Math.round(a.height/(w(e)/w(t))),a}function q(e){return X.createSquareGeometry([[e[0],e[1],-1],[e[2],e[1],-1],[e[2],e[3],-1],[e[0],e[3],-1]])}function fe(e,t){if(!Z(e,t))return q(t);const i=[e[1]-t[1],Math.min(e[3],t[3])-Math.max(e[1],t[1]),t[3]-e[3],123456],s=[e[0]-t[0],Math.min(e[2],t[2])-Math.max(e[0],t[0]),t[2]-e[2],123456],a=t[2]-t[0],l=t[3]-t[1],n=s[0]>0&&s[2]>0?3:2,r=i[0]>0&&i[2]>0?3:2,d=(r+1)*(n+1),o=new Float64Array(3*d),c=new Float32Array(2*d),h=new Uint32Array(6*(r*n-1));let v=0,R=0,I=0,u=0,m=0;for(let y=0;y<4;y++){const C=i[y];if(C<=0)continue;let b=0;for(let p=0;p<4;p++){const $=s[p];$<=0||(o[R++]=t[0]+b,o[R++]=t[1]+v,o[R++]=-1,c[I++]=b/a,c[I++]=v/l,p<3&&y<3&&(p!==1||y!==1)&&(h[m++]=u,h[m++]=u+1,h[m++]=u+n+1,h[m++]=u+1,h[m++]=u+n+2,h[m++]=u+n+1),u++,b+=$)}v+=C}const F=new Uint32Array(h.length);return new J([["position",{size:3,data:o,exclusive:!0}],["normal",{size:3,data:xe,exclusive:!0}],["uv0",{size:2,data:c,exclusive:!0}]],[["position",h],["normal",F],["uv0",h]])}const xe=[0,0,1],M=T.getLogger("esri.views.3d.layers.DynamicLayerView3D");let g=class extends ye(K(Q)){constructor(){super(...arguments),this.drapeSourceType=0,this.updatePolicy=1,this.fullExtentInLocalViewSpatialReference=null,this.maximumDataResolution=null,this._images=new Array,this._extents=new Array,this._overlays=new Array,this.updateWhenStationary=!0,this.refreshDebounced=Y(async e=>{this.destroyed||await this._doRefresh(e).catch(t=>{S(t)||T.getLogger(this.declaredClass).error(t)})},2e3)}initialize(){this.addResolvingPromise(me(this).then(e=>this._set("fullExtentInLocalViewSpatialReference",e))),this.updatingHandles.add(this,"suspended",()=>this._suspendedChangeHandler()),this.handles.add(this.view.resourceController.scheduler.registerIdleStateCallbacks(()=>{this._isScaleRangeActive()&&this.notifyChange("suspended")},()=>{})),this._isScaleRangeLayer()&&this.updatingHandles.add(this.layer,"scaleRangeId",()=>this.notifyChange("suspended"))}destroy(){this.clear()}setDrapingExtent(e,t){this._spatialReference=t,e.forEach(i=>{this._overlays[i.index]=i,this._updateImageExtent(i)})}_updateImageExtent(e){const t=this._clippedExtent(e.extent,we);if(O(t))return;const i=pe(e.extent,t,e.resolution);let s=e.pixelRatio*this.view.pixelRatio;if("imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){const l=this.layer.imageMaxWidth,n=this.layer.imageMaxHeight;if(i.width>l){const r=l/i.width;i.height=Math.floor(i.height*r),i.width=l,s*=r}if(i.height>n){const r=n/i.height;i.width=Math.floor(i.width*r),i.height=n,s*=r}}const a=this._extents[e.index];a&&ee(a.extent,t)&&this._imageSizeEquals(t,a.imageSize,i)||(this._extents[e.index]={extent:A(t),imageSize:i,pixelRatio:s},this.suspended||this._fetch(e.index).catch(l=>{S(l)||M.error(l)}))}clear(){for(let e=0;e<this._images.length;e++)this._clearImage(e)}async doRefresh(){return this._doRefresh()}async _doRefresh(e){if(this.suspended)return;const t=[];for(let i=0;i<this._extents.length;i++)this._extents[i]&&t.push(this._fetch(i,e));await te(t)}canResume(){if(!super.canResume())return!1;if(this._isScaleRangeLayer()){const{minScale:e,maxScale:t}=this.layer;if(e>0||t>0){const i=this.view.scale;if(i<t||e>0&&i>e)return!1}}return!0}isUpdating(){return this._images.some(e=>!!e.loadingPromise)}async processResult(e,t,i){(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)&&(e.image=t)}findExtentInfoAt(e){for(const t of this._extents){const i=t.extent;if(new z(i[0],i[1],i[2],i[3],this._spatialReference).contains(e))return t}return null}getFetchOptions(){}async redraw(e,t){await ie(this._images,async(i,s)=>{i&&(await e(i,t),await this._createStageObjects(s,i.image,t))})}_imageSizeEquals(e,t,i){if(!this.maximumDataResolution)return!1;const s=x(e)/this.maximumDataResolution.x,a=w(e)/this.maximumDataResolution.y,l=s/t.width,n=a/t.height,r=s/i.width,d=a/i.height,o=Math.abs(l-r),c=Math.abs(n-d),h=ae.TESTS_DISABLE_OPTIMIZATIONS?0:1.5;return o<=h&&c<=h}async _fetch(e,t){if(this.suspended)return;const i=this._extents[e],s=i.extent;this._images[e]||(this._images[e]={texture:null,material:null,renderGeometry:null,loadingPromise:null,loadingAbortController:null,image:null,pixelData:null,renderExtent:A(s)});const a=this._images[e];a.loadingAbortController&&(a.loadingAbortController.abort(),a.loadingAbortController=null);const l=new z(s[0],s[1],s[2],s[3],this._spatialReference);if(l.width===0||l.height===0)return void this._clearImage(e);const n=new AbortController;a.loadingAbortController=n,se(t,()=>n.abort());const r=n.signal,d=this._waitFetchReady(r).then(()=>{const o=P(D({requestAsImageElement:!0,pixelRatio:this._overlays[e].pixelRatio},this.getFetchOptions()),{signal:r}),{height:c,width:h}=i.imageSize;return this.layer.fetchImage(l,h,c,o)}).then(o=>{if(re(r))throw M.warnOnce("A call to fetchImage resolved even though the request was aborted. fetchImage should not resolve if options.signal.aborted is true."),H();return this.processResult(a,o)}).then(()=>E(a.renderExtent,s));a.loadingPromise=d,ne(d,()=>{d===a.loadingPromise&&(a.loadingPromise=null,a.loadingAbortController=null)}),this.notifyChange("updating"),await d.then(async()=>{if(r.aborted)throw H();await this._createStageObjects(e,a.image,r),this.notifyChange("updating")}).catch(o=>{throw o&&!S(o)&&M.error(o),this.notifyChange("updating"),o})}_clearImage(e){const t=this._images[e];if(t){j(t.renderGeometry)&&(this.view.basemapTerrain.overlayManager.renderer.removeGeometries([t.renderGeometry],this,2),t.renderGeometry=null);const i=this.view._stage;i.remove(t.texture),t.texture=null,i.remove(t.material),t.material=null,t.loadingAbortController&&(t.loadingAbortController.abort(),t.loadingAbortController=null),t.loadingPromise=null,t.image=null,t.pixelData=null}}async _createStageObjects(e,t,i){const s=this.view._stage,a=this._images[e],l=this.view.basemapTerrain.overlayManager.renderer,n=()=>{s.remove(a.texture),a.texture=null,j(a.renderGeometry)&&(l.removeGeometries([a.renderGeometry],this,2),a.renderGeometry=null)};if(t){const r=new oe(t,{width:t.width,height:t.height,preMultiplyAlpha:!0,wrap:{s:33071,t:33071}});let d;if(await le(this._images[e===0?1:0].loadingPromise),V(i),e===0)d=q(a.renderExtent);else{const o=this._images[0].renderExtent;if(!o)return void n();d=fe(o,a.renderExtent)}n(),s.add(r),s.loadSynchronous(r),a.texture=r,O(a.material)?(a.material=new he({transparent:!0,textureId:r.id}),s.add(a.material)):a.material.setParameters({textureId:r.id}),a.renderGeometry=new de(d,a.material),a.renderGeometry.origin=this._overlays[e].renderLocalOrigin,l.addGeometries([a.renderGeometry],this,2)}else n(),s.remove(a.material),a.material=null}_isScaleRangeLayer(){return"minScale"in this.layer&&"maxScale"in this.layer}_isScaleRangeActive(){return!!this._isScaleRangeLayer()&&(this.layer.minScale>0||this.layer.maxScale>0)}_clippedExtent(e,t){if(this.view.viewingMode!=="local")return E(t,e);const i=this.view.basemapTerrain;return i.ready?ce(e,i.extent,t):E(t,e)}_suspendedChangeHandler(){this.suspended?this.clear():this.refreshDebounced()}async _waitFetchReady(e){await ue(this.view,"stationary",e),V(e)}};f([_()],g.prototype,"layer",void 0),f([_()],g.prototype,"suspended",void 0),f([_({readOnly:!0})],g.prototype,"fullExtentInLocalViewSpatialReference",void 0),f([_()],g.prototype,"updating",void 0),g=f([ge("esri.views.3d.layers.DynamicLayerView3D")],g);const we=A(),Se=g;export{Se as V};