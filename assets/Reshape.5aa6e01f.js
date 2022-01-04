var z=Object.defineProperty,U=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var C=(e,t,i)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,V=(e,t)=>{for(var i in t||(t={}))P.call(t,i)&&C(e,i,t[i]);if(O)for(var i of O(t))j.call(t,i)&&C(e,i,t[i]);return e},M=(e,t)=>U(e,L(t));import{rl as q,pr as u,bD as K,br as N,aU as R,bc as H,cb as B,ro as k,b8 as I,b4 as w,lw as J,kC as W,aE as X,qq as Y,pu as Q,a$ as b,lO as $,rm as S,ar as x,ap as f,c9 as A,rs as F,dF as Z,rj as ee,rt as te,c3 as ie,aW as v,aX as m,aY as se,rh as re,dm as oe}from"./vendor.70daa49e.js";import ne from"./GraphicMover.cf21f8f8.js";class ae{constructor(t,i,s){this.graphic=t,this.mover=i,this.selected=s,this.type="reshape-start"}}class he{constructor(t,i,s){this.graphic=t,this.mover=i,this.selected=s,this.type="reshape"}}class ce{constructor(t,i,s){this.graphic=t,this.mover=i,this.selected=s,this.type="reshape-stop"}}class pe{constructor(t,i,s){this.mover=t,this.dx=i,this.dy=s,this.type="move-start"}}class le{constructor(t,i,s){this.mover=t,this.dx=i,this.dy=s,this.type="move"}}class de{constructor(t,i,s){this.mover=t,this.dx=i,this.dy=s,this.type="move-stop"}}class ve{constructor(t){this.added=t,this.type="vertex-select"}}class me{constructor(t){this.removed=t,this.type="vertex-deselect"}}class ye{constructor(t,i,s,r){this.added=t,this.graphic=i,this.oldGraphic=s,this.vertices=r,this.type="vertex-add"}}class _e{constructor(t,i,s,r){this.removed=t,this.graphic=i,this.oldGraphic=s,this.vertices=r,this.type="vertex-remove"}}const y=q.reshapeGraphics,E={vertices:{default:new u({style:"circle",size:y.vertex.size,color:y.vertex.color,outline:{color:y.vertex.outlineColor,width:1}}),hover:new u({style:"circle",size:y.vertex.hoverSize,color:y.vertex.hoverColor,outline:{color:y.vertex.hoverOutlineColor,width:1}}),selected:new u({style:"circle",size:y.selected.size,color:y.selected.color,outline:{color:y.selected.outlineColor,width:1}})},midpoints:{default:new u({style:"circle",size:y.midpoint.size,color:y.midpoint.color,outline:{color:y.midpoint.outlineColor,width:1}}),hover:new u({style:"circle",size:y.midpoint.size,color:y.midpoint.color,outline:{color:y.midpoint.outlineColor,width:1}})}},T="esri.views.draw.support.Reshape",ge=K.getLogger(T);let d=class extends N.EventedAccessor{constructor(e){super(e),this._activeOperationInfo=null,this._editGeometryOperations=null,this._handles=new R,this._graphicAttributes={esriSketchTool:"box"},this._mover=null,this._snappingTask=null,this._stagedVertex=null,this._viewHandles=new R,this.callbacks={onReshapeStart(){},onReshape(){},onReshapeStop(){},onMoveStart(){},onMove(){},onMoveStop(){},onGraphicClick(){}},this.enableMidpoints=!0,this.enableMovement=!0,this.enableVertices=!0,this.graphic=null,this.vertexGraphics=new H,this.layer=null,this.midpointGraphics=new H,this.midpointSymbol=new u({style:"circle",size:6,color:[200,200,200],outline:{color:[100,100,100],width:1}}),this.selectedVertices=[],this.snappingManager=null,this.type="reshape",this.view=null}initialize(){this._setup(),this._handles.add([B(this,"view.ready",()=>{const{layer:e,view:t}=this;re(t,e),this._viewHandles.add([t.on("key-down",i=>this._keyDownHandler(i),oe.TOOL)])}),k(this,"graphic",()=>this.refresh()),k(this,"layer",(e,t)=>{t&&(this._clearSelection(),this._resetGraphics(t)),this.refresh()}),k(this,"enableMidpoints",()=>{this.refresh()})])}destroy(){var e;this._reset(),(e=this._mover)==null||e.destroy(),this._mover=null,this._handles=I(this._handles),this._viewHandles=I(this._viewHandles)}get state(){const e=!!this.get("view.ready"),t=!(!this.get("graphic")||!this.get("layer"));return e&&t?"active":e?"ready":"disabled"}set symbols(e){const{midpoints:t=E.midpoints,vertices:i=E.vertices}=e||{};this._set("symbols",{midpoints:t,vertices:i})}isUIGraphic(e){const t=[];return this.graphic&&t.push(this.graphic),t.concat(this.vertexGraphics.items,this.midpointGraphics.items),t.length&&t.includes(e)}refresh(){this._reset(),this._setup()}reset(){this.graphic=null}clearSelection(){this._clearSelection()}removeSelectedVertices(){this.selectedVertices.length&&this._removeVertices(this.selectedVertices)}_setup(){const{graphic:e,layer:t}=this;if(!t||!e||w(e.geometry))return;const i=e.geometry;i.type!=="mesh"&&i.type!=="extent"?(this._setupGraphics(),this._setupMover()):this._logGeometryTypeError()}_setUpGeometryHelper(){const e=this.graphic.geometry;if(w(e)||e.type==="mesh"||e.type==="extent")return void this._logGeometryTypeError();const t=e.type==="multipoint"?new J({paths:e.points,spatialReference:e.spatialReference}):e;this._editGeometryOperations=W.fromGeometry(t,2)}_saveSnappingContextForHandle(e,t){var i;this._snappingGraphicsLayer=new X({listMode:"hide",internal:!0,title:"Reshape snapping layer"}),this.view.map.layers.add(this._snappingGraphicsLayer),this._snappingContext=new Y({editGeometryOperations:this._editGeometryOperations,elevationInfo:{mode:"on-the-ground",offset:0},pointer:((i=t.viewEvent)==null?void 0:i.pointerType)||"mouse",excludeFeature:this.graphic,visualizer:new Q(this._snappingGraphicsLayer),vertexHandle:this._getVertexFromEditGeometry(e)})}_reset(){this._clearSelection(),this._resetGraphics(),this._resetSnappingStateVars(),this._activeOperationInfo=null,this._mover&&this._mover.destroy(),this._mover=null,this.view.cursor="default"}_resetSnappingStateVars(){b(this.snappingManager)&&this.snappingManager.doneSnapping(),b(this._snappingGraphicsLayer)&&(this.view.map.layers.remove(this._snappingGraphicsLayer),this._snappingGraphicsLayer.destroy()),this._editGeometryOperations=I(this._editGeometryOperations),this._snappingTask=$(this._snappingTask),this._snappingTask=null,this._snappingContext=null,this._stagedVertex=null}_resetGraphics(e){this._removeMidpointGraphics(e),this._removeVertexGraphics(e),this._set("selectedVertices",[])}_removeMidpointGraphics(e){const t=e||this.layer;t&&t.removeMany(this.midpointGraphics.items),this.midpointGraphics.items.forEach(i=>i.destroy()),this.midpointGraphics.removeAll()}_removeVertexGraphics(e){const t=e||this.layer;t&&t.removeMany(this.vertexGraphics.items),this.vertexGraphics.items.forEach(i=>i.destroy()),this.vertexGraphics.removeAll()}_getCoordinatesForUI(e){const t=S(e.clone());if(e.type==="polygon")for(const i of t){const s=i[i.length-1];i[0][0]===s[0]&&i[0][1]===s[1]&&i.length>2&&i.pop()}return t}_setupGraphics(){const e=this.graphic.geometry;if(b(e)&&(e.type==="polyline"||e.type==="polygon")){const t=this._getCoordinatesForUI(e);this.enableMidpoints&&this._setUpMidpointGraphics(t),this.enableVertices&&this._setUpVertexGraphics(t)}}_setUpMidpointGraphics(e){this._removeMidpointGraphics();const t=this._createMidpointGraphics(e);this.midpointGraphics.addMany(t),this.layer.addMany(t)}_setUpVertexGraphics(e){this._removeVertexGraphics();const t=this._createVertexGraphics(e);this.vertexGraphics.addMany(t),this._storeRelatedVertexIndices(),this.layer.addMany(t)}_createVertexGraphics(e){const{_graphicAttributes:t,symbols:i,view:{spatialReference:s}}=this,r=[];return e==null||e.forEach((n,o)=>{n.forEach((c,a)=>{var h;const[p,l]=c;r.push(new x({geometry:new f({x:p,y:l,spatialReference:s}),symbol:i==null||(h=i.vertices)==null?void 0:h.default,attributes:M(V({},t),{pathIndex:o,pointIndex:a})}))})}),r}_createMidpointGraphics(e){const{_graphicAttributes:t,symbols:i,view:{spatialReference:s}}=this,r=[];return e==null||e.forEach((n,o)=>{n.forEach((c,a)=>{const[h,p]=c,l=n[a+1]?a+1:0;if(A(this.graphic.geometry,"type")==="polygon"||l!==0){const[_,g]=n[l],[G,D]=F([h,p],[_,g]);r.push(new x({geometry:new f({x:G,y:D,spatialReference:s}),symbol:i.midpoints.default,attributes:M(V({},t),{pathIndex:o,pointIndexStart:a,pointIndexEnd:l})}))}})}),r}_storeRelatedVertexIndices(){const e=this.vertexGraphics.items;if(!e)return;const t=e.map(({geometry:i})=>({x:i.x,y:i.y}));for(let i=0;i<t.length;i++){const s=[];for(let r=0;r<t.length;r++){if(i===r)continue;const n=t[i],o=t[r];n.x===o.x&&n.y===o.y&&s.push(r)}e[i].attributes.relatedGraphicIndices=s}}_setupMover(){const{enableMovement:e,graphic:t,midpointGraphics:i,vertexGraphics:s,view:r}=this,n=A(t.geometry,"type"),o=n==="point"||n==="multipoint",c=s.concat(i).items;e&&c.push(t),this._mover=new ne({enableMoveAllGraphics:!1,indicatorsEnabled:o,graphics:c,view:r,callbacks:{onGraphicClick:a=>this._onGraphicClickCallback(a),onGraphicMoveStart:a=>this._onGraphicMoveStartCallback(a),onGraphicMove:a=>this._onGraphicMoveCallback(a),onGraphicMoveStop:a=>this._onGraphicMoveStopCallback(a),onGraphicPointerOver:a=>this._onGraphicPointerOverCallback(a),onGraphicPointerOut:a=>this._onGraphicPointerOutCallback(a)}})}_onGraphicClickCallback(e){e.viewEvent.stopPropagation();const t=e.graphic;if(t===this.graphic)this.clearSelection(),this.emit("graphic-click",e),this.callbacks.onGraphicClick&&this.callbacks.onGraphicClick(e);else if(this._isMidpoint(t)){if(e.viewEvent.button===2)return;const i=this.graphic.clone(),s=this._createVertexFromMidpoint(t);this.refresh(),this._emitVertexAddEvent([t],i,s)}else this._isVertex(t)&&(e.viewEvent.stopPropagation(),e.viewEvent.button===2?this._removeVertices(t):(e.viewEvent.native.shiftKey||this._clearSelection(),this.selectedVertices.includes(t)?this._removeFromSelection(t,!0):this._addToSelection(t)))}_setUpOperation(e){const{graphic:t,dx:i,dy:s}=e,r=t===this.graphic;this._resetSnappingStateVars(),this._setUpGeometryHelper(),this._saveSnappingContextForHandle(t,e),this._activeOperationInfo={target:this.graphic,mover:t,operationType:r?"move":"reshape",totalDx:i,totalDy:s}}_onGraphicMoveStartCallback(e){const t=e.graphic,{dx:i,dy:s}=e;if(t===this.graphic)return this._clearSelection(),this._resetGraphics(),this._setUpOperation(e),this._emitMoveStartEvent(i,s),void(this._editGeometryOperations.data.type==="point"&&this._onHandleMove(t,i,s,e,()=>this._emitMoveEvent(i,s)));if(!this.selectedVertices.includes(t)){if(this._clearSelection(),this._isMidpoint(t)){const r=this.graphic.clone(),n=this._createVertexFromMidpoint(t);this._emitVertexAddEvent([t],r,n)}this._addToSelection(t)}this._setUpOperation(e),this._emitReshapeStartEvent(t),this._onHandleMove(t,i,s,e,()=>this._emitReshapeEvent(t))}_onGraphicMoveCallback(e){const{graphic:t,dx:i,dy:s}=e;this._activeOperationInfo.totalDx+=i,this._activeOperationInfo.totalDy+=s;const{operationType:r}=this._activeOperationInfo;r==="move"?this._editGeometryOperations.data.type==="point"?this._onHandleMove(t,i,s,e,()=>this._emitMoveEvent(i,s)):this._emitMoveEvent(i,s):this._onHandleMove(t,i,s,e,()=>this._emitReshapeEvent(t))}_onGraphicMoveStopCallback(e){const{graphic:t,dx:i,dy:s}=e;this._activeOperationInfo.totalDx+=i,this._activeOperationInfo.totalDy+=s,t===this.graphic?(this._emitMoveStopEvent(),this.refresh()):(this._onHandleMove(t,i,s,e,()=>this._emitReshapeStopEvent(t)),this._resetSnappingStateVars(),this._activeOperationInfo=null,this._isMidpoint(t)&&this.refresh())}_updateMidpointGraphicLocations(e){for(const t of this.midpointGraphics){const{pathIndex:i,pointIndexStart:s,pointIndexEnd:r}=t.attributes,[n,o]=e[i][s],[c,a]=e[i][r],[h,p]=F([n,o],[c,a]);t.geometry=new f({x:h,y:p,spatialReference:this.view.spatialReference})}}_getIndicesForVertexGraphic({attributes:e}){return[(e==null?void 0:e.pathIndex)||0,(e==null?void 0:e.pointIndex)||0]}_getVertexFromEditGeometry(e){const[t,i]=this._getIndicesForVertexGraphic(e);return this._editGeometryOperations.data.components[t].vertices[i]}_onHandleMove(e,t,i,s,r){if($(this._snappingTask),!this._snappingContext)return;const n=e.geometry,o=s.type==="graphic-move-stop";if(b(this.snappingManager)&&this.selectedVertices.length<2&&!o){const c=this.snappingManager;this._stagedVertex=c.update(n,this._snappingContext),this._syncGeometryAfterVertexMove(e,new f(this._stagedVertex),t,i,o),r(),this._snappingTask=Z(async a=>{const h=await c.snap(n,this._snappingContext,a);h.valid&&(this._stagedVertex=h.apply(),this._syncGeometryAfterVertexMove(e,new f(this._stagedVertex),t,i,o),r())})}else{const c=b(this._stagedVertex)?new f(this._stagedVertex):n;this._syncGeometryAfterVertexMove(e,c,t,i,o),r()}}async _syncGeometryAfterVertexMove(e,t,i,s,r=!1){const n=this._editGeometryOperations.data.geometry;if(n.type==="point")e.geometry=t;else{const{x:o,y:c}=t,[a,h]=this._getIndicesForVertexGraphic(e);let p=S(n);const l=p[a].length-1;p[a][h]=[o,c],n.type==="polygon"&&(h===0?p[a][l]=[o,c]:h===l&&(p[a][0]=[o,c])),this._isVertex(e)&&(p=this._moveRelatedCoordinates(p,e,o,c),p=this._moveSelectedHandleCoordinates(p,e,i,s,n.type==="polygon"),this._updateMidpointGraphicLocations(p)),this.graphic.geometry=n.clone();const _=this._getVertexFromEditGeometry(e),g=o-_.pos[0],G=c-_.pos[1];this._editGeometryOperations.moveVertices([_],g,G,0),r&&(this._mover?this._mover.updateGeometry(this._mover.graphics.indexOf(e),t):e.geometry=t)}}_moveRelatedCoordinates(e,t,i,s){const{relatedGraphicIndices:r}=t.attributes;for(const n of r){const o=this.vertexGraphics.getItemAt(n),{pathIndex:c,pointIndex:a}=o.attributes;e[c][a]=[i,s],o.geometry=t.geometry}return e}_moveSelectedHandleCoordinates(e,t,i,s,r){for(const n of this.selectedVertices)if(n!==t){const{pathIndex:o,pointIndex:c,relatedGraphicIndices:a}=n.attributes,h=ee(n.geometry,i,s,this.view),p=e[o].length-1;e[o][c]=[h.x,h.y],n.geometry=h,r&&(c===0?e[o][p]=[h.x,h.y]:c===p&&(e[o][0]=[h.x,h.y]));for(const l of a){const _=this.vertexGraphics.getItemAt(l),{pathIndex:g,pointIndex:G}=_.attributes;e[g][G]=[h.x,h.y],_.geometry=h}}return e}_onGraphicPointerOverCallback(e){const t=e.graphic;this._isVertex(t)&&!this._isSelected(t)&&(t.symbol=this.symbols.vertices.hover),this._updateHoverCursor(t)}_onGraphicPointerOutCallback(e){const t=e.graphic;this._isVertex(t)&&!this._isSelected(t)&&(t.symbol=this.symbols.vertices.default),this.view.cursor="default"}_createVertexFromMidpoint(e){const{_graphicAttributes:t,graphic:i}=this,s=i.geometry;if(w(s)||s.type!=="polygon"&&s.type!=="polyline")return[];const r=s.clone(),n=[],{pathIndex:o,pointIndexStart:c,pointIndexEnd:a}=e.attributes,{x:h,y:p}=e.geometry,l=a===0?c+1:a,_=S(r);return _[o].splice(l,0,[h,p]),e.attributes=M(V({},t),{pathIndex:o,pointIndex:l,relatedGraphicIndices:[]}),n.push({coordinates:_[o][l],componentIndex:o,vertexIndex:l}),this.graphic.geometry=r,n}_addToSelection(e){e instanceof x&&(e=[e]);for(const t of e)t.symbol=this.symbols.vertices.selected;this._set("selectedVertices",this.selectedVertices.concat(e)),this._emitSelectEvent(e)}_removeFromSelection(e,t){const{vertices:i}=this.symbols,s=t?i.hover:i.default;e instanceof x&&(e=[e]);for(const r of e)this.selectedVertices.splice(this.selectedVertices.indexOf(r),1),this._set("selectedVertices",this.selectedVertices),r.set("symbol",s);this._emitDeselectEvent(e)}_clearSelection(){if(this.selectedVertices.length){const e=this.selectedVertices;for(const t of this.selectedVertices)t.set("symbol",this.symbols.vertices.default);this._set("selectedVertices",[]),this._emitDeselectEvent(e)}}_keyDownHandler(e){te.delete.includes(e.key)&&!e.repeat&&this.selectedVertices.length&&this._removeVertices(this.selectedVertices)}_removeVertices(e){const t=this.graphic.geometry;if(w(t)||t.type!=="polygon"&&t.type!=="polyline"||t.type==="polygon"&&this.vertexGraphics.length<4||this.vertexGraphics.length<3)return;e instanceof x&&(e=[e]);const i=this.graphic.clone(),s=t.clone();let r=S(s);const n=[];e instanceof x&&(e=[e]);for(const o of e){const{x:c,y:a}=o.geometry;for(let h=0;h<r.length;h++){const p=r[h];for(let l=0;l<p.length;l++){const[_,g]=p[l];c===_&&a===g&&(n.push({coordinates:r[h][l],componentIndex:h,vertexIndex:l}),r[h].splice(Number(l),1))}}}if(s.type==="polygon")r=r.filter(o=>{if(o.length<2)return!1;const[c,a]=o[0],[h,p]=o[o.length-1];return(o.length!==2||c!==h||a!==p)&&(c===h&&a===p||o.push(o[0]),!0)}),s.rings=r;else{for(const o of r)o.length===1&&r.splice(r.indexOf(o),1);s.paths=r}this.graphic.geometry=s,this.refresh(),this._emitVertexRemoveEvent(e,i,n)}_isVertex(e){return this.vertexGraphics.includes(e)}_isSelected(e){return this._isVertex(e)&&this.selectedVertices.includes(e)}_isMidpoint(e){return this.midpointGraphics.includes(e)}_updateHoverCursor(e){this.view.cursor=this._isMidpoint(e)?"copy":"move"}_emitMoveStartEvent(e,t){const i=new pe(this.graphic,e,t);this.emit("move-start",i),this.callbacks.onMoveStart&&this.callbacks.onMoveStart(i)}_emitMoveEvent(e,t){const i=new le(this.graphic,e,t);this.emit("move",i),this.callbacks.onMove&&this.callbacks.onMove(i)}_emitMoveStopEvent(){const{totalDx:e,totalDy:t}=this._activeOperationInfo,i=new de(this.graphic,e,t);this.emit("move-stop",i),this.callbacks.onMoveStop&&this.callbacks.onMoveStop(i)}_emitReshapeStartEvent(e){const t=new ae(this.graphic,e,this.selectedVertices);this.emit("reshape-start",t),this.callbacks.onReshapeStart&&this.callbacks.onReshapeStart(t)}_emitReshapeEvent(e){const t=new he(this.graphic,e,this.selectedVertices);this.emit("reshape",t),this.callbacks.onReshape&&this.callbacks.onReshape(t)}_emitReshapeStopEvent(e){const t=new ce(this.graphic,e,this.selectedVertices);this.emit("reshape-stop",t),this.callbacks.onReshapeStop&&this.callbacks.onReshapeStop(t)}_emitSelectEvent(e){const t=new ve(e);this.emit("select",t),this.callbacks.onVertexSelect&&this.callbacks.onVertexSelect(t)}_emitDeselectEvent(e){const t=new me(e);this.emit("deselect",t),this.callbacks.onVertexDeselect&&this.callbacks.onVertexDeselect(t)}_emitVertexAddEvent(e,t,i){const s=new ye(e,this.graphic,t,i);this.emit("vertex-add",s),this.callbacks.onVertexAdd&&this.callbacks.onVertexAdd(s)}_emitVertexRemoveEvent(e,t,i){const s=new _e(e,this.graphic,t,i);this.emit("vertex-remove",s),this.callbacks.onVertexRemove&&this.callbacks.onVertexRemove(s)}_logGeometryTypeError(){ge.error(new ie("reshape:invalid-geometry","Reshape operation not supported for the provided graphic. The geometry type is not supported."))}};v([m()],d.prototype,"callbacks",void 0),v([m()],d.prototype,"enableMidpoints",void 0),v([m()],d.prototype,"enableMovement",void 0),v([m()],d.prototype,"enableVertices",void 0),v([m()],d.prototype,"graphic",void 0),v([m({readOnly:!0})],d.prototype,"vertexGraphics",void 0),v([m()],d.prototype,"layer",void 0),v([m({readOnly:!0})],d.prototype,"midpointGraphics",void 0),v([m()],d.prototype,"midpointSymbol",void 0),v([m({readOnly:!0})],d.prototype,"selectedVertices",void 0),v([m()],d.prototype,"snappingManager",void 0),v([m({readOnly:!0})],d.prototype,"state",null),v([m({value:E})],d.prototype,"symbols",null),v([m({readOnly:!0})],d.prototype,"type",void 0),v([m()],d.prototype,"view",void 0),d=v([se(T)],d);const Ge=d;export{Ge as default};