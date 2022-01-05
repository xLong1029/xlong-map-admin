var Z=Object.defineProperty;var z=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var L=(e,a,r)=>a in e?Z(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,R=(e,a)=>{for(var r in a||(a={}))j.call(a,r)&&L(e,r,a[r]);if(z)for(var r of z(a))q.call(a,r)&&L(e,r,a[r]);return e};import{mD as C,p4 as F,px as S,eC as k,py as N,p7 as B,ly as X,ek as Y,nq as J,aX as K,pz as p,b6 as G,pA as Q,fE as W,pB as ee,pC as te,aq as ae,dm as ie,bt as re,pD as ne,aF as se,ba as T,b1 as x,as as A,cH as oe,pE as E,aY as d,aZ as m,a_ as le}from"./vendor.47ccae81.js";function P(e,a){const r=new ae({x:e[0],y:e[1],spatialReference:a});return e.length>2&&(r.z=e[2]),r}function pe(e,a){return new B({points:e,spatialReference:a})}function $(e,a,r){const n=new X({paths:e,spatialReference:a});return r&&S(n),n}function _(e,a,r,n=!0){const l=Y(e);l.forEach(i=>{const s=i[0],o=i[i.length-1];J(s,o)&&i.length!==1||i.push(i[0])});let t=new K({rings:l,spatialReference:a});return t.rings.forEach(i=>{F(i,!1,!1)||i.reverse()}),r&&S(t),n&&t.isSelfIntersecting&&k(a)&&(t=N(t)),t}function D(e,a,r){const n=a.mapToLocalMultiple(e),l=[],t={x:n[0].x,y:n[0].y},i={x:n[1].x,y:n[1].y},s=Math.round(i.x-t.x),o=Math.round(i.y-t.y),h=Math.max(Math.abs(s),Math.abs(o));if(r){const c={x:t.x+h,y:t.y+h},g={x:t.x-h,y:t.y-h};l.push(p(c.x,g.y),p(g.x,g.y),p(g.x,c.y),p(c.x,c.y))}else{const c={x:s>0?t.x+h:t.x-h,y:o>0?t.y+h:t.y-h};l.push(p(t.x,t.y),p(c.x,t.y),p(c.x,c.y),p(t.x,c.y))}return _([C(l.map(c=>a.localToMap(c)))],a.spatialReference,a.doUnnormalization,!0)}function he(e,a,r){let n=a.mapToLocalMultiple(e);if(n.length===1){const s=48,o=n[0];n=[p(o.x-s,o.y+s),p(o.x+s,o.y-s),p(o.x+s,o.y-s),p(o.x-s,o.y+s)]}const l=[],t={x:n[0].x,y:n[0].y},i={x:n[1].x,y:n[1].y};if(r){const s=Math.round(i.x-t.x),o=Math.round(i.y-t.y);l.push(p(t.x-s,t.y-o),p(i.x,t.y-o),p(i.x,i.y),p(t.x-s,i.y))}else l.push(p(t.x,t.y),p(i.x,t.y),p(i.x,i.y),p(t.x,i.y));return _([C(l.map(s=>a.localToMap(s)))],a.spatialReference,a.doUnnormalization,!0)}function H(e,a,r,n){const l=a.mapToLocalMultiple(e);let t=null,i=null;if(r)t=l[0],i=l[1];else{const y=l[0],w=l[1],O=Math.round(w.x-y.x),M=Math.round(w.y-y.y),V=Math.max(Math.abs(O),Math.abs(M));t=p(O>0?y.x+V/2:y.x-V/2,M>0?y.y+V/2:y.y-V/2),i=p(Math.abs(O)>Math.abs(M)?t.x-V/2:t.x,Math.abs(O)>Math.abs(M)?t.y:t.y-V/2)}const s=a.localToMap(t),o=a.localToMap(i);if(G(s)||G(o))return null;a.doUnnormalization&&Q([[s,o]],a.spatialReference);const h=P(s,a.spatialReference),c=P(o,a.spatialReference),g=W(a.spatialReference);let v=0;if(k(a.spatialReference))v=g*ee(h,c,null);else{const y=t.x-i.x,w=t.y-i.y;v=g*Math.sqrt(y*y+w*w)*(n||1)}const b=new te({center:h,radius:v,radiusUnit:"meters",spatialReference:a.spatialReference});return _(b.rings,b.spatialReference,!1)}function ce(e,a,r){const n=a.mapToLocalMultiple(e),l=n[0],t=n[1],i=Math.round(t.x-l.x),s=Math.round(t.y-l.y),o=p(r?l.x:l.x+i/2,r?l.y:l.y+s/2),h=r?i:i/2,c=r?s:s/2,g=60,v=[],b=2*Math.PI/g;for(let y=0;y<g;y++){const w=Math.cos(y*b),O=Math.sin(y*b),M=p(h*w+o.x,c*O+o.y);v.push(M)}return v.push(v[0]),_([C(v.map(y=>a.localToMap(y)))],a.spatialReference,a.doUnnormalization,!1)}let u=class extends ie(re.EventedMixin(ne)){constructor(e){super(e),this._graphic=null,this.defaultZ=0,this.geometryType=null,this.hasZ=!0,this.mode=null,this.snappingManager=null,this.snapToScene=!1}initialize(){this.internalGraphicsLayer=new se({listMode:"hide",internal:!0}),this.view.map.layers.add(this.internalGraphicsLayer),this.drawOperation=this.makeDrawOperation(),this.handles.add([this.drawOperation.on("vertex-add",e=>this.onVertexAdd(e)),this.drawOperation.on("vertex-remove",e=>this.onVertexRemove(e)),this.drawOperation.on("vertex-update",e=>this.onVertexUpdate(e)),this.drawOperation.on("cursor-update",e=>this.onCursorUpdate(e)),this.drawOperation.on("complete",e=>this.onComplete(e))]),this.complete()}destroy(){this.drawOperation=T(this.drawOperation),this._destroyAllVisualisations(),this.view.map.remove(this.internalGraphicsLayer),this.internalGraphicsLayer=T(this.internalGraphicsLayer),this._set("view",null)}get canRedo(){return this.drawOperation.canRedo}get canUndo(){return this.drawOperation.canUndo}set centered(e){this._set("centered",e),this._updateGraphic()}set enabled(e){this.drawOperation.interactive=e,this._set("enabled",e)}set forceUniformSize(e){this._set("forceUniformSize",e),this._updateGraphic()}get graphic(){return this._graphic}set graphicSymbol(e){this._set("graphicSymbol",e),x(this._graphic)&&(this._graphic.symbol=e)}get updating(){var e,a;return(e=(a=this.drawOperation)==null?void 0:a.updating)!=null&&e}completeCreateOperation(){this.drawOperation.complete()}onInputEvent(e){this.drawOperation.onInputEvent(e)}redo(){this.drawOperation.redo()}reset(){}undo(){this.drawOperation.undo()}_createGraphic(e){this._graphic=new A({geometry:e,symbol:this.graphicSymbol}),this.internalGraphicsLayer.add(this._graphic),this.handles.add(this.initializeGraphic(this._graphic)),this.notifyChange("graphic"),this.handles.add(oe(()=>{x(this._graphic)&&(this.internalGraphicsLayer.remove(this._graphic),this._graphic=T(this._graphic))}),U)}_destroyAllVisualisations(){this.handles.remove(f.outline),this.handles.remove(f.regularVertices),this.handles.remove(f.activeVertex),this.handles.remove(U)}_getCreateOperationGeometry(e={operationComplete:!1}){if(this.drawOperation==null||this.drawOperation.numVertices===0)return null;const a=this.drawOperation.stagedVertex,r=this.drawOperation.committedVertices,n=r.slice();x(a)&&n.push(this.drawOperation.coordinateHelper.pointToArray(a));const l=x(a)?this.drawOperation.coordinateHelper.pointToArray(a):r.splice(-1)[0],t={regularVertices:null,activeVertex:null,full:null,outline:null},i=n.length,s=this.drawOperation.spatialReference,o=this.view.type==="3d"&&this.view.viewingMode==="global";switch(this.geometryType){case"point":t.regularVertices=r,t.activeVertex=l,t.full=this.drawOperation.coordinateHelper.arrayToPoint(n[0]);break;case"multipoint":t.regularVertices=r,t.activeVertex=l,i>0&&(t.full=pe(n,s));break;case"polyline":t.regularVertices=r,t.activeVertex=l,i>0&&(t.full=$([n],s,o));break;case"polygon":t.regularVertices=r,t.activeVertex=l,i>0&&(t.full=_([n],s,o,!0));break;case"circle":if(i>0){const h=E(this.view,n[0]);if(i===1&&e.operationComplete){const c=n[0],g=h.makeMapPoint(c[0]+I*this.view.resolution,c[1]);t.full=H([c,g],h,!0)}else i===2&&(t.full=this.forceUniformSize?H(n,h,this.centered):ce(n,h,this.centered))}break;case"rectangle":if(i>0){const h=E(this.view,n[0]);if(i===1&&e.operationComplete){const c=n[0],g=h.makeMapPoint(c[0]+I*this.view.resolution,c[1]);t.full=D([c,g],h,!0)}else i===2&&(t.full=this.forceUniformSize?D(n,h,this.centered):he(n,h,this.centered))}break;default:return null}switch(this.geometryType){case"point":case"multipoint":break;case"polyline":case"polygon":i>1&&(t.outline=$([n],s,o));break;case"circle":case"rectangle":x(t.full)&&t.full.type==="polygon"&&(t.outline=_(t.full.rings,s,o))}return t}initializeGraphic(e){return null}onComplete(e){this._updateGraphic();let a=null;if(this.drawOperation.isCompleted){const r=this._getCreateOperationGeometry({operationComplete:!0});x(r)&&(a=new A(R({geometry:r.full,symbol:this.graphicSymbol,sourceLayer:this.internalGraphicsLayer},this.graphicProperties)))}this.emit("complete",R({graphic:a},e))}onCursorUpdate(e){this._updateGraphic(),this.emit("cursor-update",e)}onDeactivate(){this.drawOperation.isCompleted||this.drawOperation.cancel()}onVertexAdd(e){this._updateGraphic(),this.emit("vertex-add",e)}onVertexRemove(e){this._updateGraphic(),this.emit("vertex-remove",e)}onVertexUpdate(e){this._updateGraphic(),this.emit("vertex-update",e)}_updateGraphic(){const e=this._getCreateOperationGeometry();G(e)?this._destroyAllVisualisations():(x(e.outline)?this.handles.add(this.onOutlineChanged(e.outline),f.outline):this.handles.remove(f.outline),x(e.regularVertices)?this.handles.add(this.onRegularVerticesChanged(e.regularVertices),f.regularVertices):this.handles.remove(f.regularVertices),x(e.activeVertex)?this.handles.add(this.onActiveVertexChanged(e.activeVertex),f.activeVertex):this.handles.remove(f.activeVertex),x(e.full)?G(this._graphic)?this._createGraphic(e.full):this._graphic.geometry=e.full:this.handles.remove(U))}};d([m({value:!0})],u.prototype,"centered",null),d([m({nonNullable:!0})],u.prototype,"defaultZ",void 0),d([m()],u.prototype,"drawOperation",void 0),d([m({value:!0})],u.prototype,"enabled",null),d([m({value:!0})],u.prototype,"forceUniformSize",null),d([m({constructOnly:!0})],u.prototype,"geometryType",void 0),d([m()],u.prototype,"graphic",null),d([m({constructOnly:!0})],u.prototype,"graphicProperties",void 0),d([m()],u.prototype,"graphicSymbol",null),d([m({constructOnly:!0})],u.prototype,"hasZ",void 0),d([m({constructOnly:!0})],u.prototype,"mode",void 0),d([m()],u.prototype,"snappingManager",void 0),d([m()],u.prototype,"snapToScene",void 0),d([m({readOnly:!0})],u.prototype,"type",void 0),d([m({readOnly:!0})],u.prototype,"updating",null),d([m({constructOnly:!0,nonNullable:!0})],u.prototype,"view",void 0),u=d([le("esri.views.draw.DrawGraphicTool")],u);const U="create-operation-graphic",f={outline:"outline-visual",regularVertices:"regular-vertices-visual",activeVertex:"active-vertex-visual"};function ye(e){switch(e){case"point":case"polyline":case"polygon":case"multipoint":return e;case"circle":case"rectangle":return"segment";default:return null}}const I=48;export{u as O,ye as x};