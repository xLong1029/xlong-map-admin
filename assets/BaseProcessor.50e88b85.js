import{e as t,d as o,i as s,im as i}from"./index.988b09cd.js";let e=class extends i{initialize(){}destroy(){}get supportsTileUpdates(){return!1}get spatialReference(){const r=this.get("tileStore.tileScheme.spatialReference");return r&&r.toJSON()||null}};t([o({readOnly:!0})],e.prototype,"supportsTileUpdates",null),t([o({constructOnly:!0})],e.prototype,"remoteClient",void 0),t([o({constructOnly:!0})],e.prototype,"service",void 0),t([o()],e.prototype,"spatialReference",null),t([o({constructOnly:!0})],e.prototype,"tileInfo",void 0),t([o({constructOnly:!0})],e.prototype,"tileStore",void 0),e=t([s("esri.views.2d.layers.features.processors.BaseProcessor")],e);const p=e;export{p};