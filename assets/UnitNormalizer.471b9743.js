import{aN as l,aP as o,aQ as h,mz as m,mA as f,mB as s,fD as i}from"./index.a33ecea7.js";function R(t,e){if(l(e,0,0,0),t.length>0){for(let r=0;r<t.length;++r)o(e,e,t[r]);h(e,e,1/t.length)}}function P(t,e,r,a){a.projectToRenderScreen(t,n),a.projectToRenderScreen(e,c),m(r,_,p),f(r,r)}const n=s(),p=n,c=s(),_=c;class U{constructor(e=null){this.spatialReference=e}get spatialReference(){return this._spatialReference}set spatialReference(e){e!==this._spatialReference&&(this._spatialReference=e,this._updateNormalizationFactors())}normalizeDistance(e){return e*this._metersPerDistanceUnit}normalizeElevation(e){return e*this._metersPerElevationUnit}normalizeArea(e){return e*this._squareMetersPerAreaUnit}_updateNormalizationFactors(){this._metersPerDistanceUnit=i(this._spatialReference,1),this._metersPerElevationUnit=i(this._spatialReference,1),this._squareMetersPerAreaUnit=this._metersPerDistanceUnit*this._metersPerDistanceUnit}}export{R as c,P as f,U as t};