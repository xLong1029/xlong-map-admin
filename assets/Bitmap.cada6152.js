import{b1 as u,b6 as l,dG as g,db as _,ed as p,ef as d,eg as n,ej as f,fp as m,ee as w,cQ as v}from"./vendor.47ccae81.js";class B{constructor(t,e,i){this.pixelBlock=t,this.extent=e,this.originalPixelBlock=i}get width(){return u(this.pixelBlock)?this.pixelBlock.width:0}get height(){return u(this.pixelBlock)?this.pixelBlock.height:0}render(t){const e=this.pixelBlock;if(l(e))return;const i=this.filter({pixelBlock:e});if(l(i.pixelBlock))return;const r=i.pixelBlock.getAsRGBA(),h=t.createImageData(i.pixelBlock.width,i.pixelBlock.height);h.data.set(r),t.putImageData(h,0,0)}getRenderedRasterPixels(){const t=this.filter({pixelBlock:this.pixelBlock});return l(t.pixelBlock)?null:{width:t.pixelBlock.width,height:t.pixelBlock.height,renderedRasterPixels:new Uint8Array(t.pixelBlock.getAsRGBA().buffer)}}}function R(s){return s&&"render"in s}function k(s){return s&&!("render"in s)}function b(s){const t=document.createElement("canvas");return t.width=s.width,t.height=s.height,s.render(t.getContext("2d")),t}function c(s,t,e){const i={target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071};return t&&e&&(i.width=t,i.height=e),new v(s,i)}class I extends g{constructor(t=null,e,i=!0){super(),this.requestRenderOnSourceChangedEnabled=i,this._textureInvalidated=!0,this.stencilRef=0,this.coordScale=[1,1],this._height=void 0,this.pixelRatio=1,this.resolution=0,this.rotation=0,this._source=null,this._width=void 0,this.x=0,this.y=0,this.blendFunction=e,this.source=t,this.requestRender=this.requestRender.bind(this)}destroy(){this._texture&&(this._texture.dispose(),this._texture=null)}get isSourceScaled(){return this.width!==this.sourceWidth||this.height!==this.sourceHeight}get height(){return this._height!==void 0?this._height:this.sourceHeight}set height(t){this._height=t}get source(){return this._source}set source(t){this._source=t,this.invalidateTexture()}get sourceHeight(){return this._source instanceof HTMLImageElement?this._source.naturalHeight:this._source.height}get sourceWidth(){return this._source instanceof HTMLImageElement?this._source.naturalWidth:this._source.width}get width(){return this._width!==void 0?this._width:this.sourceWidth}set width(t){this._width=t}beforeRender(t){super.beforeRender(t),this.updateTexture(t.context)}invalidateTexture(){this._textureInvalidated||(this._textureInvalidated=!0,this.requestRenderOnSourceChangedEnabled&&this.requestRender())}_createTransforms(){return{dvs:_()}}setTransform(t){const e=p(this.transforms.dvs),[i,r]=t.toScreenNoRotation([0,0],[this.x,this.y]),h=this.resolution/this.pixelRatio/t.resolution,o=h*this.width,a=h*this.height,x=Math.PI*this.rotation/180;d(e,e,n(i,r)),d(e,e,n(o/2,a/2)),f(e,e,-x),d(e,e,n(-o/2,-a/2)),m(e,e,n(o,a)),w(this.transforms.dvs,t.displayViewMat3,e)}setSamplingProfile(t){this._texture&&(t.mips&&!this._texture.descriptor.hasMipmap&&this._texture.generateMipmap(),this._texture.setSamplingMode(t.samplingMode))}bind(t,e){this._texture&&t.bindTexture(this._texture,e)}updateTexture(t){var e;if(!this.stage)return(e=this._texture)==null||e.dispose(),void(this._texture=null);if(!this._textureInvalidated)return;this._textureInvalidated=!1,this._texture||(this.source?this._texture=c(t,this.sourceWidth,this.sourceHeight):this._texture=c(t));const i=this.source;if(i){if(this._texture.resize(this.sourceWidth,this.sourceHeight),R(i))if(i instanceof B){const r=i.getRenderedRasterPixels();this._texture.setData(u(r)?r.renderedRasterPixels:null)}else this._texture.setData(b(i));else k(i)&&this._texture.setData(i);this.ready()}else this._texture.setData(null)}onAttach(){this.invalidateTexture()}onDetach(){this.invalidateTexture()}}export{I as g,B as i};