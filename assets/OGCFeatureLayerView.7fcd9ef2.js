import{aW as i,aX as r,aY as l,c3 as o}from"./vendor.70daa49e.js";const p=s=>{let e=class extends s{initialize(){const{layer:a,view:t}=this;a.source.supportsSpatialReference(t.spatialReference)||this.addResolvingPromise(Promise.reject(new o("layerview:spatial-reference-incompatible","The spatial references supported by this OGC layer are incompatible with the spatial reference of the view",{layer:a})))}get availableFields(){return this.layer.fieldsIndex.fields.map(a=>a.name)}};return i([r()],e.prototype,"layer",void 0),i([r({readOnly:!0})],e.prototype,"availableFields",null),e=i([l("esri.views.layers.OGCFeatureLayerView")],e),e};export{p as a};