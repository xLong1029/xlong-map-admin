import{fY as p,as as o,be as h,aY as a,aZ as c,a_ as l}from"./vendor.47ccae81.js";import{l as n}from"./LayerView2D.867d4d61.js";import{i as m}from"./GraphicContainer.c526c2e7.js";import{i as d}from"./BaseGraphicContainer.b7a8e357.js";import"./Container.034dd5d7.js";import"./EffectView.fdd4aaf1.js";import"./Utils.30b0e1a1.js";import"./number.dfbabd3f.js";import"./CIMSymbolHelper.280cbd1b.js";import"./BidiEngine.aae60613.js";import"./definitions.21e97413.js";import"./GeometryUtils.d4e26b77.js";import"./normalizeUtilsSync.eec123ce.js";import"./projectionSupport.f43af219.js";import"./json.2d0d6862.js";import"./FeatureContainer.f7905394.js";import"./visualVariablesUtils.169867fe.js";import"./visualVariablesUtils.2eeaf118.js";import"./TileContainer.b343a31f.js";import"./WGLContainer.22553251.js";import"./brushes.c1614039.js";import"./programUtils.780f0e0a.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.fbe0cf96.js";import"./pixelUtils.b67e8c28.js";import"./Matcher.4cb2e421.js";import"./tileUtils.19949ed1.js";import"./TileClipper.553919cf.js";import"./cimAnalyzer.c8eeedb3.js";import"./cimSymbolUtils.b4522afd.js";import"./schemaUtils.7b9d1644.js";import"./MD5.f9440c6b.js";import"./util.5b46dbb6.js";import"./ComputedAttributeStorage.a3dbe5bf.js";import"./FeatureSetReader.2bd24612.js";import"./centroid.db30e28e.js";import"./GraphicsView.b3d3600e.js";const g={remove(){},pause(){},resume(){}};let s=class extends n(p){initialize(){this.graphicsView=new d({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:this.layer.graphics,container:new m(this.view.featuresTilingScheme)})}attach(){this.container.addChild(this.graphicsView.container),this.handles.add(this.layer.on("graphic-update",this.graphicsView.graphicUpdateHandler),"graphicslayerview2d")}detach(){this.container.removeAllChildren(),this.graphicsView.destroy(),this.handles.remove("graphicslayerview2d")}async hitTest(i){return this.graphicsView?this.graphicsView.hitTest(i):null}async fetchPopupFeatures(i){if(this.graphicsView)return this.graphicsView.hitTest(i).filter(r=>!!r.popupTemplate)}update(i){this.graphicsView.processUpdate(i)}moveStart(){}viewChange(){this.graphicsView.viewChange()}moveEnd(){}isUpdating(){return!this.graphicsView||this.graphicsView.updating}highlight(i){var r;let e;return typeof i=="number"?e=[i]:i instanceof o?e=[i.uid]:Array.isArray(i)&&i.length>0?e=typeof i[0]=="number"?i:i.map(t=>t&&t.uid):h.isCollection(i)&&i.length>0&&(e=i.map(t=>t&&t.uid).toArray()),e=(r=e)==null?void 0:r.filter(t=>t!=null),e.length?(this.graphicsView.addHighlight(e),{remove:()=>this.graphicsView.removeHighlight(e)}):g}queryGraphics(){return Promise.resolve(this.graphicsView.graphics)}};a([c()],s.prototype,"graphicsView",void 0),s=a([l("esri.views.2d.layers.GraphicsLayerView2D")],s);const Q=s;export{Q as default};