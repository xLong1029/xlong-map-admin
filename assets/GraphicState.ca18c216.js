import{X as D,wn as E,hr as G,Y as C,fq as g,mj as u,oG as S,r as n,mk as m,im as y,nV as $,wo as A,aN as M,aP as I,aQ as j,mF as O,i as p,wp as x,gy as W,mI as v,af as T,ho as R,hQ as H,gp as k,gm as q,ba as z,wq as F,ij as N,hg as Q,vA as V,ak as b,e as c,y as _,b as B}from"./index.a33ecea7.js";class J extends E{constructor(e){var t;super(e),this._attachmentOrigin=G(0,0,0,null),this._attachmentOriginDirty=!0,this.events=new C,this._geometry=null,this._width=1,this._color=g(1,0,1,1),this._innerWidth=0,this._innerColor=g(1,1,1,1),this._stipplePattern=null,this._stippleOffColor=null,this._falloff=0,this._elevationInfo=null,this._laserlineStyle=null,this._laserlineEnabled=!1,this._renderOccluded=u.OccludeAndTransparentStencil,this._attachmentOrigin.spatialReference=e.view.spatialReference,this._laserline=new S({view:e.view}),this.applyProps(e),this.attached=(t=e.attached)!=null?t:!0}destroy(){this._laserline.destroy(),super.destroy()}createObject3DResourceFactory(e){return{view:e,createResources:t=>this._createObject3DResources(t),destroyResources:t=>this._destroyExternalResources(t),recreateGeometry:(t,r)=>{t.geometries.length=0,this._recreateGeometry(r,t.material,t.geometries)}}}createDrapedResourceFactory(e){return{view:e,createResources:()=>this._createDrapedResources(),destroyResources:t=>this._destroyExternalResources(t),recreateGeometry:t=>{t.geometries=this._createRenderGeometriesDraped(t.material),this._attachmentOriginChanged()}}}get _laserlineAttached(){return this.attached&&this.visible&&n(this._laserlineStyle)&&!this.isDraped&&this.laserlineEnabled}onAttachedChange(e){this._laserline.attached=this._laserlineAttached,e&&this._attachmentOriginChanged()}get geometry(){return this._geometry}set geometry(e){this._geometry=e,this.recreateGeometry()}get width(){return this._width}set width(e){e!==this._width&&(this._width=e,this._updateMaterial())}get color(){return this._color}set color(e){m(e,this._color)||(y(this._color,e),this._updateMaterial())}get innerWidth(){return this._innerWidth}set innerWidth(e){e!==this._innerWidth&&(this._innerWidth=e,this._updateMaterial())}get innerColor(){return this._innerColor}set innerColor(e){m(e,this._innerColor)||(y(this._innerColor,e),this._updateMaterial())}get stipplePattern(){return this._stipplePattern}set stipplePattern(e){const t=n(e)!==n(this._stipplePattern);this._stipplePattern=e,t?this.recreate():this._updateMaterial()}get stippleOffColor(){return this._stippleOffColor}set stippleOffColor(e){e&&this._stippleOffColor&&m(e,this._stippleOffColor)||(this._stippleOffColor=e?$(e):null,this._updateMaterial())}get falloff(){return this._falloff}set falloff(e){e!==this._falloff&&(this._falloff=e,this._updateMaterial())}get elevationInfo(){return this._elevationInfo}set elevationInfo(e){this._elevationInfo=e,this.recreateGeometry()}get laserlineStyle(){return this._laserlineStyle}set laserlineStyle(e){this._laserlineStyle=e,this._laserline.attached=this._laserlineAttached,n(e)&&(this._laserline.style=e)}get laserlineEnabled(){return this._laserlineEnabled}set laserlineEnabled(e){this._laserlineEnabled!==e&&(this._laserlineEnabled=e,this._laserline.attached=this._laserlineAttached)}get renderOccluded(){return this._renderOccluded}set renderOccluded(e){e!==this._renderOccluded&&(this._renderOccluded=e,this._updateMaterial())}get attachmentOrigin(){var r;if(!this._attachmentOriginDirty)return this._attachmentOrigin;const e=(r=A(this.object3dResources.resources))==null?void 0:r.geometries;if(!e||e.length===0)return null;M(o,0,0,0);let t=0;for(const s of e)s.computeAttachmentOrigin(w)&&(I(o,o,w),t++);return t===0?null:(j(o,o,1/t),this.view.renderCoordsHelper.fromRenderCoords(o,this._attachmentOrigin),this._attachmentOriginDirty=!1,this._attachmentOrigin)}_updateMaterial(){n(this.object3dResources.resources)&&this.object3dResources.resources.material.setParameters(this._materialParameters),n(this.drapedResources.resources)&&this.drapedResources.resources.material.setParameters(this._materialParameters)}get _isClosed(){return n(this.geometry)&&this.geometry.type==="polygon"}get _materialParameters(){return{width:this._width,color:this._color,stippleOffColor:this._stippleOffColor,stipplePattern:this._stipplePattern,stipplePreferContinuous:!1,isClosed:this._isClosed,falloff:this._falloff,innerColor:this._innerColor,innerWidth:this._innerWidth,join:"round",hasPolygonOffset:!0,renderOccluded:this._normalizedRenderOccluded}}get _normalizedRenderOccluded(){return this.isDraped&&this._renderOccluded===u.OccludeAndTransparentStencil?u.OccludeAndTransparent:this._renderOccluded}_recreateGeometry(e,t,r){this._createRenderGeometries(t,r);for(const s of r)e.addGeometry(s);this._attachmentOriginChanged()}_attachmentOriginChanged(){this._attachmentOriginDirty=!0,this.events.emit("attachment-origin-changed")}_destroyExternalResources(e){e.geometries=[],e.material.dispose()}_createObject3DResources(e){const t=new O(this._materialParameters),r=new Array;return this._recreateGeometry(e,t,r),{material:t,geometries:r,forEach:s=>{s(t),r.forEach(s)}}}_createDrapedResources(){const e=new O(this._materialParameters);return{material:e,geometries:this._createRenderGeometriesDraped(e)}}_createRenderGeometriesDraped(e){const t=this.geometry;if(p(t)||p(this.view.basemapTerrain.spatialReference))return[];const r=x(t,this.view.basemapTerrain.spatialReference),s=[];for(const{position:a}of r.lines){const d={overlayInfo:{spatialReference:this.view.basemapTerrain.spatialReference,renderCoordsHelper:this.view.renderCoordsHelper},attributeData:{position:a},removeDuplicateStartEnd:this._isClosed},h=new W(v(e,d)),i=T(X);R(i,a),H(h.boundingSphere,.5*(i[0]+i[3]),.5*(i[1]+i[4]),0,.5*Math.sqrt((i[3]-i[0])*(i[3]-i[0])+(i[4]-i[1])*(i[4]-i[1]))),s.push(h)}return s}calculateMapBounds(e){if(p(this.object3dResources.resources))return!1;const t=this.view.renderCoordsHelper;for(const r of this.object3dResources.resources.geometries){const s=r.vertexAttributes.get(k.POSITION),a=q(s.data.length);z(s.data,t.spatialReference,0,a,this.view.spatialReference,0,s.data.length/3),R(e,a)}return!0}_createRenderGeometries(e,t){var d;const r=this.geometry;if(p(r))return;const s=F(r,this.view.elevationProvider,this.view.renderCoordsHelper,N.fromElevationInfo((d=this.elevationInfo)!=null?d:new Q({mode:V(r,null)}))),a=new Array;for(const{position:h,mapPositions:i}of s.lines){const P={mapPositions:i,attributeData:{position:h},removeDuplicateStartEnd:this._isClosed};t.push(v(e,P)),a.push(h)}this._laserline.pathVerticalPlane=a}}const X=D(),w=b(),o=b();let l=class extends C.EventedAccessor{constructor(f){super(f),this.tracking=!1,this.displaying=!1,this.isDraped=!1}};c([_({constructOnly:!0})],l.prototype,"graphic",void 0),c([_()],l.prototype,"tracking",void 0),c([_()],l.prototype,"displaying",void 0),c([_()],l.prototype,"isDraped",void 0),l=c([B("esri.views.3d.layers.graphics.GraphicState")],l);export{J as I,l as e};