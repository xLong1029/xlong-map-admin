import{X as L,e as t,d as l,i as p,p as w,u as m,f as C,kh as k,ki as j,r as n,jm as y,av as _,kj as $,t as u,kk as z,kl as D,km as G,kn as O,ko as R,kp as A,kq as B,jn as S,b as v,aw as F,fV as P,jR as I,kr as M,ks as E,kt as q,fF as U,ku as T,kv as H,kw as N,jl as X,kx as J,ky as K}from"./index.988b09cd.js";import{p as Q}from"./AnalysisView3D.e6f70945.js";import{U as W}from"./BuildingComponentSublayer.a555bf5f.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */import"./capabilities.2e888fa1.js";import"./I3SIndexInfo.c2d3f440.js";import"./I3SLayerDefinitions.3938f828.js";function Y(e,i,s){s.warnOnce(`Failed to project analysis geometry (id: '${e.id}'), projection from spatial reference (wkid: '${i.wkid}') to view spatial reference is not supported. Projection may be possible after calling projection.load().`)}const f=L.getLogger("esri.views.3d.analysis.Slice.SliceController");let d=class extends w{constructor(e){super(e),this._handles=new m,this._internalChange=!1,this._currentSlicePlane=null,this.state="pending"}get ready(){return this.state==="ready"}initialize(){this._handles.add(this.analysis.excludedLayers.on("before-add",e=>{const i=e.item;i!=null&&(i instanceof C||i instanceof W)?i instanceof C&&k(i)?(f.error("excludedLayers",`Layer '${i.title}, id:${i.id}' of type '${i.type}' can not be individually excluded from slicing. Use 'excludeGroundSurface' instead.`),e.preventDefault()):this.analysis.excludedLayers.includes(i)&&e.preventDefault():(f.error("excludedLayers","Invalid layer type, layer must derive from Layer or BuildingComponentSublayer"),e.preventDefault())})),this._handles.add(j(()=>this.view.ready&&n(this.view.renderCoordsHelper),()=>this._initialize(),{sync:!0,initial:!0,once:!0}))}_initialize(){this.state!=="destroyed"&&this.state!=="ready"&&(ee(this.view,this),this._handles.add([y(()=>this.analysisView.analysisViewData.plane,()=>{this._internalChange||this._updateSlicePlaneFromBoundedPlane(),this._updateLayerViews()},{sync:!0}),y(()=>this.analysis.excludeGroundSurface,()=>this._updateLayerViews(),{sync:!0}),this.analysis.excludedLayers.on("change",()=>this._updateLayerViews()),y(()=>[this.analysisView.active,this.analysisView.visible],()=>{this._updateActiveController(),this._updateViewSlicePlane()},{sync:!0}),y(()=>this._allLayerAndSubLayerViews,()=>this._updateLayerViews())]),this._handles.add([y(()=>this.analysis.shape,()=>{this._internalChange||(this._updateBoundedPlaneFromSlicePlane(),this._updateViewSlicePlane())},{sync:!0})],"analysis"),this._set("state","ready"),this._updateActiveController(),this._updateBoundedPlaneFromSlicePlane(),this._updateViewSlicePlane())}destroy(){this.state!=="destroyed"&&this.state!=="pending"&&(this.analysisView.active=!1,ie(this.view,this),this._handles.destroy(),this.view.slicePlane=null,this.set("view",null),this._set("state","destroyed"))}async whenReady(){return await _(this,"ready"),this}get _allLayerAndSubLayerViews(){const e=this.view.allLayerViews.items;return e.concat(e.filter($).flatMap(({sublayerViews:i})=>i.items))}_updateBoundedPlaneFromSlicePlane(){const e=this.analysis.shape,i=this._currentSlicePlane;if(u(i)&&u(e)||n(i)&&n(e)&&e.equals(i))return;let s=null,a=null;if(n(e)&&n(e.position)){const o=e.position.spatialReference,b=z(e,this.view.spatialReference);u(b)&&Y(this.analysis,o,f),s=D(b,this.view,{tiltEnabled:this.analysis.tiltEnabled},G()),n(s)&&(a={heading:e.heading,tilt:e.tilt,position:e.position,width:e.width,height:e.height})}this._currentSlicePlane=a,this._internalChange=!0,this.analysisView.analysisViewData.plane=s,this._internalChange=!1}_updateSlicePlaneFromBoundedPlane(){const e=this.analysisView.analysisViewData.plane,i=O(e,this.view,this.view.spatialReference,new R);let s=null;n(i)&&(s={heading:i.heading,tilt:i.tilt,position:i.position,width:i.width,height:i.height}),this._currentSlicePlane=s,this._internalChange=!0,this.analysis.shape=i,this._internalChange=!1,this._updateViewSlicePlane()}_updateActiveController(){if(g)return;const e=x(this.view);if(this.analysisView.active)n(e.activeController)&&e.activeController!==this?(g=!0,e.activeController.analysisView.active=!1,g=!1):n(e.activeController)&&e.activeController,this._updateLayerViews(),e.activeController=this;else{if(n(e.activeController)&&e.activeController!==this)return;n(e.activeController)&&e.activeController===this&&(e.activeController=null,this._updateLayerViews())}}_updateViewSlicePlane(){this.state==="ready"&&Z(this.view)}_updateLayerViews(){const e=n(this.analysisView.analysisViewData.plane)&&this.analysisView.visible&&this.analysisView.active,i=[],s=a=>{"layers"in a?a.layers.forEach(s):i.push(a)};this.analysis.excludedLayers.forEach(s),this.view.allLayerViews.forEach(a=>{a.destroyed||("slicePlaneEnabled"in a&&(a.slicePlaneEnabled=e&&i.indexOf(a.layer)<0),"sublayerViews"in a&&a.sublayerViews.forEach(o=>{o.slicePlaneEnabled=e&&i.indexOf(o.sublayer)<0}))}),this.view.basemapTerrain!=null&&(this.view.basemapTerrain.slicePlaneEnabled=e&&!this.analysis.excludeGroundSurface)}};t([l({readOnly:!0})],d.prototype,"state",void 0),t([l()],d.prototype,"view",void 0),t([l()],d.prototype,"analysis",void 0),t([l()],d.prototype,"analysisView",void 0),t([l()],d.prototype,"ready",null),t([l()],d.prototype,"_allLayerAndSubLayerViews",null),d=t([p("esri.views.3d.analysis.Slice.SliceController")],d);const c=new Map;let g=!1;function Z(e){const i=x(e).activeController;n(i)&&n(i.analysisView.analysisViewData.plane)&&i.analysisView.visible?e.slicePlane=i.analysisView.analysisViewData.plane:e.slicePlane=null}function ee(e,i){c.has(e)||c.set(e,{all:[],activeController:null}),c.get(e).all.push(i)}function x(e){return c.get(e)}function ie(e,i){if(!c.has(e))throw new Error("view expected in global slice register");const s=c.get(e),a=s.all.lastIndexOf(i);if(a===-1)throw new Error("controller expected in global slice register");s.all.splice(a,1),s.all.length===0&&c.delete(e)}let V=class extends w{constructor(){super(...arguments),this.plane=null}};t([l()],V.prototype,"plane",void 0),V=t([p("esri.views.3d.analysis.Slice.SliceViewData")],V);let r=class extends w{constructor(e){super(e),this._handles=new m,this._gridVisualElement=null,this._outlineVisualElement=null,this.state="pending",this.showGrid=!1,this.editable=!0}get ready(){return this.state==="ready"}initialize(){this._initialize()}async _initialize(){if(this.state==="destroyed"||this.state==="ready")return;await _(this.view,"ready",!0);const e=this.analysisView.analysisViewData;if(u(e))throw new Error("expected internal object to be valid");this._gridVisualElement=A(this.view),this._outlineVisualElement=B(this.view),this._handles.add([y(()=>({visible:n(e.plane)&&this.analysisView.visible,active:this.analysisView.active,editable:this.editable,showGrid:this.showGrid}),i=>this._updateMaterials(i),S),y(()=>e.plane,i=>this._updatePlane(i),S)],"internal"),this._set("state","ready")}destroy(){this.state!=="destroyed"&&this.state!=="pending"&&(this._handles.destroy(),this._gridVisualElement=v(this._gridVisualElement),this._outlineVisualElement=v(this._outlineVisualElement),this.set("view",null),this._set("state","destroyed"))}async whenReady(){return await _(this,"ready"),this}_updatePlane(e){if(u(e))return;const i=F(I.get(),P(e.basis1),P(e.basis2),1),s=M(E.get(),i),a=q(e,E.get()),o=U(s,a,s);this._outlineVisualElement.transform=o,this._gridVisualElement.transform=o}_updateMaterials({visible:e,active:i,editable:s,showGrid:a}){this._outlineVisualElement.color=T,this._outlineVisualElement.width=s?H:N,this._outlineVisualElement.stipplePattern=i?null:X(5);const o=a?K:[0,0,0,0];this._gridVisualElement.backgroundColor=J,this._gridVisualElement.gridColor=o,this._gridVisualElement.visible=e,this._outlineVisualElement.visible=e}};t([l({readOnly:!0})],r.prototype,"state",void 0),t([l()],r.prototype,"view",void 0),t([l()],r.prototype,"analysis",void 0),t([l()],r.prototype,"analysisView",void 0),t([l()],r.prototype,"ready",null),t([l()],r.prototype,"showGrid",void 0),t([l()],r.prototype,"editable",void 0),r=t([p("esri.views.3d.analysis.Slice.SliceVisualization")],r);let h=class extends Q(w){constructor(e){super(e),this.type="slice-view",this.analysisVisualization=null,this.analysisController=null,this.analysisViewData=new V,this.active=!0,this.showGrid=!1,this.editable=!1}initialize(){this.analysisVisualization=new r({view:this.view,analysis:this.analysis,analysisView:this}),this.analysisController=new d({view:this.view,analysis:this.analysis,analysisView:this})}destroy(){this.analysisVisualization=v(this.analysisVisualization),this.analysisController=v(this.analysisController)}async when(){return await this.analysisVisualization.whenReady(),await this.analysisController.whenReady(),this}get testData(){return{visualization:this.analysisVisualization,controller:this.analysisController}}};t([l()],h.prototype,"type",void 0),t([l()],h.prototype,"analysis",void 0),t([l()],h.prototype,"analysisViewData",void 0),t([l()],h.prototype,"active",void 0),t([l({aliasOf:"analysisVisualization.showGrid"})],h.prototype,"showGrid",void 0),t([l({aliasOf:"analysisVisualization.editable"})],h.prototype,"editable",void 0),h=t([p("esri.views.3d.analysis.Slice.SliceView3D")],h);const ue=h;export{ue as default};