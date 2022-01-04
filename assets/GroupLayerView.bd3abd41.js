import{aW as a,aX as t,j7 as n,aY as d,fW as y,bc as o,j8 as V}from"./vendor.70daa49e.js";let r=class extends y{constructor(e){super(e),this.type="group",this.layerViews=new o}initialize(){this.handles.add([this.layerViews.on("change",e=>this._layerViewsChangeHandler(e)),this.layerViews.on("after-changes",()=>this._layerViewsAfterChangesHandler()),this.layer.watch("visibilityMode",()=>this._visibilityModeHandler(),!0),this.watch("visible",()=>this._visibleHandler(),!0)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]}),this._layerViewsAfterChangesHandler()}set layerViews(e){this._set("layerViews",V(e,this._get("layerViews")))}isUpdating(){return this.layerViews.some(e=>e.updating)}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((e,i)=>e+i.updatingProgress,0)/this.layerViews.length}_hasLayerViewVisibleOverrides(){return this.layerViews.some(e=>e._isOverridden("visible"))}_findLayerViewForLayer(e){return e&&this.layerViews.find(i=>i.layer===e)}_firstVisibleOnLayerOrder(){const e=this.layer.layers.find(i=>{const s=this._findLayerViewForLayer(i);return s&&s.visible});return e&&this._findLayerViewForLayer(e)}_enforceExclusiveVisibility(e){this._hasLayerViewVisibleOverrides()&&(e||!(e=this._firstVisibleOnLayerOrder())&&this.layerViews.length>0&&(e=this._findLayerViewForLayer(this.layer.layers.getItemAt(0))),this.layerViews.forEach(i=>{i.visible=i===e}))}_layerViewsChangeHandler(e){this.handles.remove("grouplayerview:visible"),this.handles.add(this.layerViews.map(l=>l.watch("visible",h=>this._layerViewVisibleHandler(h,l),!0)).toArray(),"grouplayerview:visible");const i=e.added[e.added.length-1];let s=null;i&&i.visible&&(s=i),this._enforceVisibility(s)}_layerViewsAfterChangesHandler(){this.handles.remove("grouplayerview:updating"),this.handles.add(this.layerViews.map(e=>e.watch("updating",()=>this._updateUpdating(),!0)).toArray(),"grouplayerview:updating"),this._updateUpdating()}_enforceVisibility(e){if(this._hasLayerViewVisibleOverrides())switch(this.layer.visibilityMode){case"inherited":{const i=this.visible;this.layerViews.forEach(s=>{s.visible=i});break}case"exclusive":this._enforceExclusiveVisibility(e)}}_visibilityModeHandler(){this._enforceVisibility()}_layerViewVisibleHandler(e,i){if(this._hasLayerViewVisibleOverrides())switch(this.layer.visibilityMode){case"inherited":e!==this.visible&&(i.visible=this.visible);break;case"exclusive":this._enforceExclusiveVisibility(e&&i)}}_visibleHandler(){var e;this._hasLayerViewVisibleOverrides()&&((e=this.layer)==null?void 0:e.visibilityMode)==="inherited"&&this._enforceVisibility()}_updateUpdating(){this.notifyChange("updating")}};a([t({cast:n})],r.prototype,"layerViews",null),a([t()],r.prototype,"view",void 0),a([t({readOnly:!0})],r.prototype,"updatingProgress",null),r=a([d("esri.views.layers.GroupLayerView")],r);const v=r;export{v as default};