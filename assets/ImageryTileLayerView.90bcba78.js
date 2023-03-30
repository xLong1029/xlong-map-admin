import{e as r,y as n,k9 as j,b as F,n as w,aD as v,i as P,r as I,g as V}from"./index.a33ecea7.js";import{v as T,J as L}from"./rasterProjectionHelper.599a6959.js";import{s as S}from"./popupUtils.5d07a4ea.js";const A=b=>{let t=class extends b{constructor(){super(...arguments),this._rasterFieldPrefix="Raster.",this.layer=null,this.view=null,this.tileInfo=null}get fullExtent(){return this._getfullExtent()}_getfullExtent(){return this.projectFullExtent(this.view.spatialReference)}get hasTilingEffects(){return this.layer.renderer&&"dynamicRangeAdjustment"in this.layer.renderer&&this.layer.renderer.dynamicRangeAdjustment}get datumTransformation(){return T(w(this.layer.fullExtent),this.view.spatialReference,!0)}supportsSpatialReference(i){return!!this.projectFullExtent(i)}projectFullExtent(i){const u=w(this.layer.fullExtent),e=T(u,i,!1);return L(u,i,e)}async fetchPopupFeatures(i,u){const{layer:e}=this;if(!i)throw new v("imageryTileLayerView:fetchPopupFeatures","Nothing to fetch without area",{layer:e});const{popupEnabled:d}=e,m=S(e,u);if(!d||P(m))throw new v("imageryTileLayerView:fetchPopupFeatures","Missing required popupTemplate or popupEnabled",{popupEnabled:d,popupTemplate:m});const h=[],{value:l,magdirValue:s}=await e.identify(i,{timeExtent:this.timeExtent});let c="";if(l&&l.length){c=e.type==="imagery-tile"&&e.hasStandardTime()&&l[0]!=null?l.map(y=>e.getStandardTimeValue(y)).join(", "):l.join(", ");const o={ObjectId:0};o["Raster.ServicePixelValue"]=c;const g=e.rasterInfo.attributeTable;if(I(g)){const{fields:y,features:R}=g,E=y.find(({name:a})=>a.toLowerCase()==="value"),f=E?R.find(a=>String(a.attributes[E.name])===c):null;if(f)for(const a in f.attributes)f.attributes.hasOwnProperty(a)&&(o[this._rasterFieldPrefix+a]=f.attributes[a])}const x=e.rasterInfo.dataType;x!=="vector-magdir"&&x!=="vector-uv"||(o["Raster.Magnitude"]=s==null?void 0:s[0],o["Raster.Direction"]=s==null?void 0:s[1]);const p=new V(this.fullExtent.clone(),null,o);p.layer=e,p.sourceLayer=p.layer,h.push(p)}return h}};return r([n()],t.prototype,"layer",void 0),r([n(j)],t.prototype,"timeExtent",void 0),r([n()],t.prototype,"view",void 0),r([n()],t.prototype,"fullExtent",null),r([n()],t.prototype,"tileInfo",void 0),r([n({readOnly:!0})],t.prototype,"hasTilingEffects",null),r([n()],t.prototype,"datumTransformation",null),t=r([F("esri.views.layers.ImageryTileLayerView")],t),t};export{A as f};