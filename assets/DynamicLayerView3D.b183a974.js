var U=Object.defineProperty,B=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var G=(e,t,a)=>t in e?U(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,D=(e,t)=>{for(var a in t||(t={}))Y.call(t,a)&&G(e,a,t[a]);if(L)for(var a of L(t))Z.call(t,a)&&G(e,a,t[a]);return e},P=(e,t)=>B(e,W(t));import{e3 as w,e4 as x,f$ as k,d$ as X,g0 as N,bF as O,fX as J,fY as K,g1 as Q,b9 as S,b6 as T,g2 as ee,cw as A,c7 as te,bS as z,g3 as ae,g4 as ie,cX as se,cZ as re,cY as H,cC as E,g5 as ne,b1 as j,g6 as oe,bA as le,bB as F,g7 as he,g8 as de,g9 as ce,cd as ge,aY as f,aZ as _,a_ as ue}from"./vendor.47ccae81.js";import{l as me}from"./projectExtentUtils.066a3971.js";import{i as ye}from"./RefreshableLayerView.c34d7575.js";function pe(e,t,a){const s=w(e)/x(e),i={width:a,height:a};return s>1.0001?i.height=a/s:s<.9999&&(i.width=a*s),i.width=Math.round(i.width/(w(e)/w(t))),i.height=Math.round(i.height/(x(e)/x(t))),i}function V(e){return k.createSquareGeometry([[e[0],e[1],-1],[e[2],e[1],-1],[e[2],e[3],-1],[e[0],e[3],-1]])}function fe(e,t){if(!X(e,t))return V(t);const a=[e[1]-t[1],Math.min(e[3],t[3])-Math.max(e[1],t[1]),t[3]-e[3],123456],s=[e[0]-t[0],Math.min(e[2],t[2])-Math.max(e[0],t[0]),t[2]-e[2],123456],i=t[2]-t[0],l=t[3]-t[1],n=s[0]>0&&s[2]>0?3:2,r=a[0]>0&&a[2]>0?3:2,d=(r+1)*(n+1),o=new Float64Array(3*d),c=new Float32Array(2*d),h=new Uint32Array(6*(r*n-1));let v=0,b=0,C=0,g=0,m=0;for(let y=0;y<4;y++){const I=a[y];if(I<=0)continue;let R=0;for(let p=0;p<4;p++){const $=s[p];$<=0||(o[b++]=t[0]+R,o[b++]=t[1]+v,o[b++]=-1,c[C++]=R/i,c[C++]=v/l,p<3&&y<3&&(p!==1||y!==1)&&(h[m++]=g,h[m++]=g+1,h[m++]=g+n+1,h[m++]=g+1,h[m++]=g+n+2,h[m++]=g+n+1),g++,R+=$)}v+=I}const q=new Uint32Array(h.length);return new N([["position",{size:3,data:o,exclusive:!0}],["normal",{size:3,data:we,exclusive:!0}],["uv0",{size:2,data:c,exclusive:!0}]],[["position",h],["normal",q],["uv0",h]])}const we=[0,0,1],M=O.getLogger("esri.views.3d.layers.DynamicLayerView3D");let u=class extends ye(J(K)){constructor(){super(...arguments),this.drapeSourceType=0,this.updatePolicy=1,this.fullExtentInLocalViewSpatialReference=null,this.maximumDataResolution=null,this._images=new Array,this._extents=new Array,this._overlays=new Array,this.updateWhenStationary=!0,this.refreshDebounced=Q(async e=>{this.destroyed||await this._doRefresh(e).catch(t=>{S(t)||O.getLogger(this.declaredClass).error(t)})},2e3)}initialize(){this.addResolvingPromise(me(this).then(e=>this._set("fullExtentInLocalViewSpatialReference",e))),this.updatingHandles.add(this,"suspended",()=>this._suspendedChangeHandler()),this.handles.add(this.view.resourceController.scheduler.registerIdleStateCallbacks(()=>{this._isScaleRangeActive()&&this.notifyChange("suspended")},()=>{})),this._isScaleRangeLayer()&&this.updatingHandles.add(this.layer,"scaleRangeId",()=>this.notifyChange("suspended"))}destroy(){this.clear()}setDrapingExtent(e,t){this._spatialReference=t,e.forEach(a=>{this._overlays[a.index]=a,this._updateImageExtent(a)})}_updateImageExtent(e){const t=this._clippedExtent(e.extent,xe);if(T(t))return;const a=pe(e.extent,t,e.resolution);let s=e.pixelRatio*this.view.pixelRatio;if("imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){const l=this.layer.imageMaxWidth,n=this.layer.imageMaxHeight;if(a.width>l){const r=l/a.width;a.height=Math.floor(a.height*r),a.width=l,s*=r}if(a.height>n){const r=n/a.height;a.width=Math.floor(a.width*r),a.height=n,s*=r}}const i=this._extents[e.index];i&&ee(i.extent,t)&&this._imageSizeEquals(t,i.imageSize,a)||(this._extents[e.index]={extent:A(t),imageSize:a,pixelRatio:s},this.suspended||this._fetch(e.index).catch(l=>{S(l)||M.error(l)}))}clear(){for(let e=0;e<this._images.length;e++)this._clearImage(e)}async doRefresh(){return this._doRefresh()}async _doRefresh(e){if(this.suspended)return;const t=[];for(let a=0;a<this._extents.length;a++)this._extents[a]&&t.push(this._fetch(a,e));await te(t)}canResume(){if(!super.canResume())return!1;if(this._isScaleRangeLayer()){const{minScale:e,maxScale:t}=this.layer;if(e>0||t>0){const a=this.view.scale;if(a<t||e>0&&a>e)return!1}}return!0}isUpdating(){return this._images.some(e=>!!e.loadingPromise)}async processResult(e,t,a){(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)&&(e.image=t)}findExtentInfoAt(e){for(const t of this._extents){const a=t.extent;if(new z(a[0],a[1],a[2],a[3],this._spatialReference).contains(e))return t}return null}getFetchOptions(){}async redraw(e,t){await ae(this._images,async(a,s)=>{a&&(await e(a,t),await this._createStageObjects(s,a.image,t))})}_imageSizeEquals(e,t,a){if(!this.maximumDataResolution)return!1;const s=w(e)/this.maximumDataResolution.x,i=x(e)/this.maximumDataResolution.y,l=s/t.width,n=i/t.height,r=s/a.width,d=i/a.height,o=Math.abs(l-r),c=Math.abs(n-d),h=ie.TESTS_DISABLE_OPTIMIZATIONS?0:1.5;return o<=h&&c<=h}async _fetch(e,t){if(this.suspended)return;const a=this._extents[e],s=a.extent;this._images[e]||(this._images[e]={texture:null,material:null,renderGeometry:null,loadingPromise:null,loadingAbortController:null,image:null,pixelData:null,renderExtent:A(s)});const i=this._images[e];i.loadingAbortController&&(i.loadingAbortController.abort(),i.loadingAbortController=null);const l=new z(s[0],s[1],s[2],s[3],this._spatialReference);if(l.width===0||l.height===0)return void this._clearImage(e);const n=new AbortController;i.loadingAbortController=n,se(t,()=>n.abort());const r=n.signal,d=this._waitFetchReady(r).then(()=>{const o=P(D({requestAsImageElement:!0,pixelRatio:this._overlays[e].pixelRatio},this.getFetchOptions()),{signal:r}),{height:c,width:h}=a.imageSize;return this.layer.fetchImage(l,h,c,o)}).then(o=>{if(re(r))throw M.warnOnce("A call to fetchImage resolved even though the request was aborted. fetchImage should not resolve if options.signal.aborted is true."),H();return this.processResult(i,o)}).then(()=>E(i.renderExtent,s));i.loadingPromise=d,ne(d,()=>{d===i.loadingPromise&&(i.loadingPromise=null,i.loadingAbortController=null)}),this.notifyChange("updating"),await d.then(async()=>{if(r.aborted)throw H();await this._createStageObjects(e,i.image,r),this.notifyChange("updating")}).catch(o=>{throw o&&!S(o)&&M.error(o),this.notifyChange("updating"),o})}_clearImage(e){const t=this._images[e];if(t){j(t.renderGeometry)&&(this.view.basemapTerrain.overlayManager.renderer.removeGeometries([t.renderGeometry],this,2),t.renderGeometry=null);const a=this.view._stage;a.remove(t.texture),t.texture=null,a.remove(t.material),t.material=null,t.loadingAbortController&&(t.loadingAbortController.abort(),t.loadingAbortController=null),t.loadingPromise=null,t.image=null,t.pixelData=null}}async _createStageObjects(e,t,a){const s=this.view._stage,i=this._images[e],l=this.view.basemapTerrain.overlayManager.renderer,n=()=>{s.remove(i.texture),i.texture=null,j(i.renderGeometry)&&(l.removeGeometries([i.renderGeometry],this,2),i.renderGeometry=null)};if(t){const r=new oe(t,{width:t.width,height:t.height,preMultiplyAlpha:!0,wrap:{s:33071,t:33071}});let d;if(await le(this._images[e===0?1:0].loadingPromise),F(a),e===0)d=V(i.renderExtent);else{const o=this._images[0].renderExtent;if(!o)return void n();d=fe(o,i.renderExtent)}n(),s.add(r),s.loadSynchronous(r),i.texture=r,T(i.material)?(i.material=new he({transparent:!0,textureId:r.id}),s.add(i.material)):i.material.setParameters({textureId:r.id}),i.renderGeometry=new de(d,i.material),i.renderGeometry.origin=this._overlays[e].renderLocalOrigin,l.addGeometries([i.renderGeometry],this,2)}else n(),s.remove(i.material),i.material=null}_isScaleRangeLayer(){return"minScale"in this.layer&&"maxScale"in this.layer}_isScaleRangeActive(){return!!this._isScaleRangeLayer()&&(this.layer.minScale>0||this.layer.maxScale>0)}_clippedExtent(e,t){if(this.view.viewingMode!=="local")return E(t,e);const a=this.view.basemapTerrain;return a.ready?ce(e,a.extent,t):E(t,e)}_suspendedChangeHandler(){this.suspended?this.clear():this.refreshDebounced()}async _waitFetchReady(e){await ge(this.view,"stationary",e),F(e)}};f([_()],u.prototype,"layer",void 0),f([_()],u.prototype,"suspended",void 0),f([_({readOnly:!0})],u.prototype,"fullExtentInLocalViewSpatialReference",void 0),f([_()],u.prototype,"updating",void 0),u=f([ue("esri.views.3d.layers.DynamicLayerView3D")],u);const xe=A(),Se=u;export{Se as V};