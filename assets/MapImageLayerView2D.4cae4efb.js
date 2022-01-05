var g=Object.defineProperty;var h=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var p=(e,t,i)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,n=(e,t)=>{for(var i in t||(t={}))f.call(t,i)&&p(e,i,t[i]);if(h)for(var i of h(t))u.call(t,i)&&p(e,i,t[i]);return e};import{aY as a,a_ as d,bF as b,og as j,b9 as y,fZ as w,aZ as m,fY as v}from"./vendor.47ccae81.js";import{t as C}from"./BitmapContainer.0f98133e.js";import{l as U}from"./LayerView2D.867d4d61.js";import{t as x,i as I}from"./BaseGraphicContainer.b7a8e357.js";import{I as G}from"./Utils.30b0e1a1.js";import{S}from"./ExportStrategy.dd315741.js";import{y as V}from"./MapImageLayerView.b25647e0.js";import{i as M}from"./RefreshableLayerView.c34d7575.js";import"./brushes.c1614039.js";import"./definitions.21e97413.js";import"./programUtils.780f0e0a.js";import"./number.dfbabd3f.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.fbe0cf96.js";import"./pixelUtils.b67e8c28.js";import"./WGLContainer.22553251.js";import"./Container.034dd5d7.js";import"./EffectView.fdd4aaf1.js";import"./CIMSymbolHelper.280cbd1b.js";import"./BidiEngine.aae60613.js";import"./GeometryUtils.d4e26b77.js";import"./normalizeUtilsSync.eec123ce.js";import"./projectionSupport.f43af219.js";import"./json.2d0d6862.js";import"./FeatureContainer.f7905394.js";import"./visualVariablesUtils.169867fe.js";import"./visualVariablesUtils.2eeaf118.js";import"./TileContainer.b343a31f.js";import"./Matcher.4cb2e421.js";import"./tileUtils.19949ed1.js";import"./TileClipper.553919cf.js";import"./cimAnalyzer.c8eeedb3.js";import"./cimSymbolUtils.b4522afd.js";import"./schemaUtils.7b9d1644.js";import"./MD5.f9440c6b.js";import"./util.5b46dbb6.js";import"./ComputedAttributeStorage.a3dbe5bf.js";import"./FeatureSetReader.2bd24612.js";import"./centroid.db30e28e.js";import"./GraphicsView.b3d3600e.js";import"./Bitmap.cada6152.js";import"./ExportImageParameters.10308997.js";import"./popupUtils.86aeb7da.js";let o=class extends x{renderChildren(e){if(e.drawPhase!==G.HIGHLIGHT||(this.attributeView.bindTextures(e.context),!this.children.some(r=>r.hasData)))return;super.renderChildren(e);const{painter:t}=e,i=t.effects.highlight;i.bind(e),e.context.setColorMask(!0,!0,!0,!0),e.context.clear(16384),this._renderChildren(e,i.defines.concat(["highlightAll"])),i.draw(e),i.unbind()}};o=a([d("esri.views.2d.layers.support.HighlightGraphicContainer")],o);const q=o,_=b.getLogger("esri.views.2d.layers.MapImageLayerView2D");let s=class extends V(M(U(v))){constructor(){super(...arguments),this._highlightGraphics=new j}update(e){this.strategy.update(e).catch(t=>{y(t)||_.error(t)})}attach(){const{imageMaxWidth:e,imageMaxHeight:t,version:i}=this.layer,r=i>=10.3,l=i>=10;this._bitmapContainer=new C,this.container.addChild(this._bitmapContainer);const c=new I({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new q(this.view.featuresTilingScheme)});this.container.addChild(c.container),this.strategy=new S({container:this._bitmapContainer,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxWidth:e,imageMaxHeight:t,imageRotationSupported:r,imageNormalizationSupported:l,hidpi:!0}),this.handles.add(this.watch("exportImageVersion",()=>this.requestUpdate()),"exportImageVersion"),this.handles.add(this.watch("view.floors",()=>this.requestUpdate()),"view.floors"),this.requestUpdate()}detach(){this.handles.remove("exportImageVersion"),this.handles.remove("view.floors"),this.strategy.destroy(),this.container.removeAllChildren(),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}highlight(e,t){return this._highlightGraphics.add(e),{remove:()=>{this._highlightGraphics.remove(e)}}}createFetchPopupFeaturesQueryGeometry(e,t){return w(e,t,this.view)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(e,t,i,r){return this.layer.fetchImage(e,t,i,n({timeExtent:this.timeExtent,floors:this.view.floors},r))}};a([m()],s.prototype,"strategy",void 0),a([m()],s.prototype,"updating",void 0),s=a([d("esri.views.2d.layers.MapImageLayerView2D")],s);const Ce=s;export{Ce as default};