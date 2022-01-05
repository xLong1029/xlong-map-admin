import{bD as u,b1 as g,f2 as m,fI as b,b6 as d,bJ as y,bw as p}from"./vendor.47ccae81.js";import{e as I}from"./centroid.db30e28e.js";class n{constructor(t,e){this._mask=0,this._buf=t,this._mask=e}static fromBuffer(t,e){return new n(t,e)}static create(t,e=4294967295){const r=new Uint32Array(Math.ceil(t/32));return new n(r,e)}_getIndex(t){return Math.floor(t/32)}has(t){const e=this._mask&t;return!!(this._buf[this._getIndex(e)]&1<<e%32)}hasRange(t,e){let r=t,s=e;for(;r%32&&r!==s;){if(this.has(r))return!0;r++}for(;s%32&&r!==s;){if(this.has(r))return!0;s--}if(r===s)return!1;for(let i=r/32;i!==s/32;i++)if(this._buf[i])return!0;return!1}set(t){const e=this._mask&t,r=this._getIndex(e),s=1<<e%32;this._buf[r]|=s}setRange(t,e){let r=t,s=e;for(;r%32&&r!==s;)this.set(r++);for(;s%32&&r!==s;)this.set(s--);if(r!==s)for(let i=r/32;i!==s/32;i++)this._buf[i]=4294967295}unset(t){const e=this._mask&t,r=this._getIndex(e),s=1<<e%32;this._buf[r]&=4294967295^s}resize(t){const e=this._buf,r=new Uint32Array(Math.ceil(t/32));r.set(e),this._buf=r}or(t){for(let e=0;e<this._buf.length;e++)this._buf[e]|=t._buf[e];return this}and(t){for(let e=0;e<this._buf.length;e++)this._buf[e]&=t._buf[e];return this}xor(t){for(let e=0;e<this._buf.length;e++)this._buf[e]^=t._buf[e];return this}ior(t){for(let e=0;e<this._buf.length;e++)this._buf[e]|=~t._buf[e];return this}iand(t){for(let e=0;e<this._buf.length;e++)this._buf[e]&=~t._buf[e];return this}ixor(t){for(let e=0;e<this._buf.length;e++)this._buf[e]^=~t._buf[e];return this}any(){for(let t=0;t<this._buf.length;t++)if(this._buf[t])return!0;return!1}copy(t){for(let e=0;e<this._buf.length;e++)this._buf[e]=t._buf[e];return this}clone(){return new n(this._buf.slice(),this._mask)}clear(){for(let t=0;t<this._buf.length;t++)this._buf[t]=0}forEachSet(t){for(let e=0;e<this._buf.length;e++){let r=this._buf[e],s=32*e;if(r)for(;r;)1&r&&t(s),r>>>=1,s++}}countSet(){let t=0;return this.forEachSet(e=>{t++}),t}}var l,_,c;let h=0;const a=(l=u("featurelayer-simplify-thresholds"))!=null?l:[.5,.5,.5,.5],x=a[0],A=a[1],S=a[2],C=a[3],f=(_=u("featurelayer-simplify-payload-size-factors"))!=null?_:[1,2,4],j=f[0],v=f[1],T=f[2],w=(c=u("featurelayer-simplify-mobile-factor"))!=null?c:2,R=u("esri-mobile");class D{constructor(t){this.type="FeatureSetReader",this.seen=!1,this.instance=0,this._tx=0,this._ty=0,this._sx=1,this._sy=1,this._deleted=null,this._joined=[],this._objectIdToIndex=null,this._level=0,this.instance=t}static createInstance(){return h++,h=h>65535?0:h,h}get isEmpty(){return g(this._deleted)&&this._deleted.countSet()===this.getSize()}set level(t){this._level=t}getAreaSimplificationThreshold(t,e){let r=1;const s=R?w:1;e>4e6?r=T*s:e>1e6?r=v*s:e>5e5?r=j*s:e>1e5&&(r=s);let i=0;t>4e3?i=C*r:t>2e3?i=S*r:t>100?i=A:t>15&&(i=x);let o=8;return this._level<4?o=1:this._level<5?o=2:this._level<6&&(o=4),i*o}setArcadeSpatialReference(t){this._arcadeSpatialReference=t}attachStorage(t){this._storage=t}getQuantizationTransform(){throw new Error("Unable to find transform for featureSet")}getStorage(){return this._storage}getComputedNumeric(t){return this.getComputedNumericAtIndex(0)}setComputedNumeric(t,e){return this.setComputedNumericAtIndex(e,0)}getComputedString(t){return this.getComputedStringAtIndex(0)}setComputedString(t,e){return this.setComputedStringAtIndex(0,e)}getComputedNumericAtIndex(t){return this._storage.getComputedNumericAtIndex(this.getDisplayId(),t)}setComputedNumericAtIndex(t,e){this._storage.setComputedNumericAtIndex(this.getDisplayId(),t,e)}getComputedStringAtIndex(t){return this._storage.getComputedStringAtIndex(this.getDisplayId(),t)}setComputedStringAtIndex(t,e){return this._storage.setComputedStringAtIndex(this.getDisplayId(),t,e)}transform(t,e,r,s){const i=this.copy();return i._tx+=t,i._ty+=e,i._sx*=r,i._sy*=s,i}readAttribute(t,e=!1){const r=this._readAttribute(t,e);if(r!==void 0)return r;for(const s of this._joined){s.setIndex(this.getIndex());const i=s._readAttribute(t,e);if(i!==void 0)return i}}readAttributes(){const t=this._readAttributes();for(const e of this._joined){e.setIndex(this.getIndex());const r=e._readAttributes();for(const s of Object.keys(r))t[s]=r[s]}return t}joinAttributes(t){this._joined.push(t)}readArcadeFeature(){return this}geometry(){const t=this.readHydratedGeometry(),e=m(t,this.geometryType,this.hasZ,this.hasM),r=b(e);return r&&(r.spatialReference=this._arcadeSpatialReference),r}field(t){return this.readAttribute(t,!0)}hasField(t){return!0}setField(t,e){}keys(){return[]}castToText(){return""}removeIds(t){if(d(this._objectIdToIndex)){const r=new Map,s=this.getCursor();for(;s.next();)r.set(s.getObjectId(),s.getIndex());this._objectIdToIndex=r}const e=this._objectIdToIndex;for(const r of t)e.has(r)&&this.removeAtIndex(e.get(r))}removeAtIndex(t){d(this._deleted)&&(this._deleted=n.create(this.getSize())),this._deleted.set(t)}readGeometryForDisplay(){return this.readUnquantizedGeometry(!0)}readLegacyGeometryForDisplay(){return this.readLegacyGeometry(!0)}*features(){const t=this.getCursor();for(;t.next();)yield t.readOptimizedFeature()}_getExists(){return d(this._deleted)||!this._deleted.has(this.getIndex())}_computeCentroid(){if(this.geometryType!=="esriGeometryPolygon")return null;const t=this.readUnquantizedGeometry();if(!t||t.hasIndeterminateRingOrder)return null;const e=y(this.getQuantizationTransform(),null);return I(new p,t,this.hasM,this.hasZ,e)}copyInto(t){t.seen=this.seen,t._storage=this._storage,t._arcadeSpatialReference=this._arcadeSpatialReference,t._joined=this._joined,t._tx=this._tx,t._ty=this._ty,t._sx=this._sx,t._sy=this._sy,t._deleted=this._deleted,t._objectIdToIndex=this._objectIdToIndex}}export{D as b,n as t};