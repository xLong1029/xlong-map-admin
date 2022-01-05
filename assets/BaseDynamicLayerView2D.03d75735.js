import{bF as o,b9 as n,aY as a,aZ as s,a_ as d,fY as p}from"./vendor.47ccae81.js";import{t as m}from"./BitmapContainer.0f98133e.js";import{l as h}from"./LayerView2D.867d4d61.js";import{S as c}from"./ExportStrategy.dd315741.js";import{i as f}from"./RefreshableLayerView.c34d7575.js";import"./brushes.c1614039.js";import"./definitions.21e97413.js";import"./Utils.30b0e1a1.js";import"./number.dfbabd3f.js";import"./programUtils.780f0e0a.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.fbe0cf96.js";import"./pixelUtils.b67e8c28.js";import"./WGLContainer.22553251.js";import"./Container.034dd5d7.js";import"./EffectView.fdd4aaf1.js";import"./Bitmap.cada6152.js";const y=o.getLogger("esri.views.2d.layers.BaseDynamicLayerView2D");let t=class extends f(h(p)){update(i){this.strategy.update(i).catch(e=>{n(e)||y.error(e)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new m,this.container.addChild(this._bitmapContainer),this.strategy=new c({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this.strategy.destroy(),this.strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(i,e,r){return this.layer.fetchImage(i,e,r)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}};a([s()],t.prototype,"strategy",void 0),a([s()],t.prototype,"updating",void 0),t=a([d("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const E=t;export{E as default};