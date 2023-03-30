import{i as s,a$ as o,aD as n,fW as p,e as r,y as a,b as h}from"./index.a33ecea7.js";import{n as u}from"./LayerView3D.f81b9bae.js";import{c as f}from"./TiledLayerView3D.7ebbd153.js";import{u as m}from"./LayerView.88bcfa48.js";import{i as g}from"./RefreshableLayerView.e0df9b3f.js";import{P as c,S as y}from"./MapServiceLayerViewHelper.5c9468d6.js";import"./floorFilterUtils.095bd939.js";import"./popupUtils.5d07a4ea.js";let i=class extends g(f(u(m))){constructor(){super(...arguments),this.type="tile-3d",this._popupHighlightHelper=null}get imageFormatIsOpaque(){return this.layer.tileInfo.format==="jpg"}get hasMixedImageFormats(){return this.layer.tileInfo.format==="mixed"}get tileInfo(){return this.layer.tileInfo}get dataLevelRange(){if(this.tileInfo){const e=this.tileInfo.lods,t=e[0].scale,l=e[e.length-1].scale;return this.levelRangeFromScaleRange(t,l)}return{minLevel:0,maxLevel:0}}initialize(){if(this.layer.type==="web-tile"){const e=this.layer.get("fullExtent.spatialReference"),t=this.layer.get("tileInfo.spatialReference");if(s(e)||s(t)||!o(e,t)){const l=this.layer.originOf("fullExtent")==="defaults"||s(this.layer.fullExtent)?"SceneView requires fullExtent to be specified by the user on WebTileLayer":"SceneView requires fullExtent to be specified in the same spatial reference as tileInfo on WebTileLayer";this.addResolvingPromise(Promise.reject(new n("layerview:incompatible-fullextent",l)))}}c(this,this.layer)&&(this._popupHighlightHelper=new y({createFetchPopupFeaturesQueryGeometry:(e,t)=>p(e,t,this.view),layerView:this,updatingHandles:this.updatingHandles})),this._addTilingSchemeMatchPromise()}destroy(){var e;(e=this._popupHighlightHelper)==null||e.destroy()}async fetchPopupFeatures(e,t){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(e,t):[]}async doRefresh(){this.suspended||this.emit("data-changed")}};r([a()],i.prototype,"imageFormatIsOpaque",null),r([a()],i.prototype,"hasMixedImageFormats",null),r([a()],i.prototype,"layer",void 0),r([a()],i.prototype,"tileInfo",null),r([a()],i.prototype,"dataLevelRange",null),i=r([h("esri.views.3d.layers.TileLayerView3D")],i);const R=i;export{R as default};