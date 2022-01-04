var f=Object.defineProperty;var h=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var p=(e,t,i)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,n=(e,t)=>{for(var i in t||(t={}))g.call(t,i)&&p(e,i,t[i]);if(h)for(var i of h(t))u.call(t,i)&&p(e,i,t[i]);return e};import{aW as a,aY as m,bD as j,oe as b,b7 as y,fX as w,aX as d,fW as v}from"./vendor.70daa49e.js";import{t as C}from"./BitmapContainer.ff910785.js";import{l as U}from"./LayerView2D.291c660d.js";import{t as x,i as I}from"./BaseGraphicContainer.ad159856.js";import{I as G}from"./Utils.8da54d2f.js";import{S}from"./ExportStrategy.f46421bd.js";import{y as V}from"./MapImageLayerView.4f1b082e.js";import{i as M}from"./RefreshableLayerView.765039f7.js";import"./brushes.00614641.js";import"./definitions.21e97413.js";import"./programUtils.96aa856a.js";import"./number.dfbabd3f.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.f8f54134.js";import"./pixelUtils.59d1e551.js";import"./WGLContainer.054d692c.js";import"./Container.879a33d6.js";import"./EffectView.39edae97.js";import"./CIMSymbolHelper.8e5a45e2.js";import"./BidiEngine.aae60613.js";import"./GeometryUtils.d4e26b77.js";import"./normalizeUtilsSync.d0259d5c.js";import"./projectionSupport.850c9ce4.js";import"./json.2d0d6862.js";import"./FeatureContainer.86bb1943.js";import"./visualVariablesUtils.16bece63.js";import"./visualVariablesUtils.e3b233f7.js";import"./TileContainer.26ab15fa.js";import"./Matcher.9dc20079.js";import"./tileUtils.3ef9ae84.js";import"./TileClipper.96955a5e.js";import"./cimAnalyzer.f8c59bac.js";import"./cimSymbolUtils.f85d4916.js";import"./schemaUtils.953db095.js";import"./MD5.f9440c6b.js";import"./util.7ad95d3e.js";import"./ComputedAttributeStorage.9152a833.js";import"./FeatureSetReader.cfa1b3ff.js";import"./centroid.76062f7d.js";import"./GraphicsView.fb49caf7.js";import"./Bitmap.f5efb0a9.js";import"./ExportImageParameters.dc11e236.js";import"./popupUtils.83af9bb7.js";let o=class extends x{renderChildren(e){if(e.drawPhase!==G.HIGHLIGHT||(this.attributeView.bindTextures(e.context),!this.children.some(r=>r.hasData)))return;super.renderChildren(e);const{painter:t}=e,i=t.effects.highlight;i.bind(e),e.context.setColorMask(!0,!0,!0,!0),e.context.clear(16384),this._renderChildren(e,i.defines.concat(["highlightAll"])),i.draw(e),i.unbind()}};o=a([m("esri.views.2d.layers.support.HighlightGraphicContainer")],o);const q=o,_=j.getLogger("esri.views.2d.layers.MapImageLayerView2D");let s=class extends V(M(U(v))){constructor(){super(...arguments),this._highlightGraphics=new b}update(e){this.strategy.update(e).catch(t=>{y(t)||_.error(t)})}attach(){const{imageMaxWidth:e,imageMaxHeight:t,version:i}=this.layer,r=i>=10.3,l=i>=10;this._bitmapContainer=new C,this.container.addChild(this._bitmapContainer);const c=new I({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new q(this.view.featuresTilingScheme)});this.container.addChild(c.container),this.strategy=new S({container:this._bitmapContainer,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxWidth:e,imageMaxHeight:t,imageRotationSupported:r,imageNormalizationSupported:l,hidpi:!0}),this.handles.add(this.watch("exportImageVersion",()=>this.requestUpdate()),"exportImageVersion"),this.handles.add(this.watch("view.floors",()=>this.requestUpdate()),"view.floors"),this.requestUpdate()}detach(){this.handles.remove("exportImageVersion"),this.handles.remove("view.floors"),this.strategy.destroy(),this.container.removeAllChildren(),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}highlight(e,t){return this._highlightGraphics.add(e),{remove:()=>{this._highlightGraphics.remove(e)}}}createFetchPopupFeaturesQueryGeometry(e,t){return w(e,t,this.view)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(e,t,i,r){return this.layer.fetchImage(e,t,i,n({timeExtent:this.timeExtent,floors:this.view.floors},r))}};a([d()],s.prototype,"strategy",void 0),a([d()],s.prototype,"updating",void 0),s=a([m("esri.views.2d.layers.MapImageLayerView2D")],s);const Ce=s;export{Ce as default};