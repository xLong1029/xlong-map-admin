import{p as s,r as p,e as r,d as o,i as c}from"./index.988b09cd.js";import{o as l}from"./queryEngineUtils.ad7fe527.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */let t=class extends s{constructor(e){super(e)}get availability(){return 1}refresh(){}async fetchCandidates(e,a){const i=this.layerSource.layer.source;return i.querySnapping?(await i.querySnapping({distance:e.distance,point:e.coordinateHelper.vectorToPoint(e.point).toJSON(),types:e.types,query:p(e.filter)?e.filter.createQuery().toJSON():{where:"1=1"}},{signal:a})).candidates.map(n=>l(n,e.coordinateHelper)):[]}};r([o({constructOnly:!0})],t.prototype,"layerSource",void 0),r([o({readOnly:!0})],t.prototype,"availability",null),t=r([c("esri.views.interactive.snapping.featureSources.FeatureCollectionSnappingSource")],t);export{t as FeatureCollectionSnappingSource};