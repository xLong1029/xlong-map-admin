import{aD as c,e as i,y,b as h}from"./index.a33ecea7.js";import{n as u}from"./LayerView3D.f81b9bae.js";import{c as v}from"./TiledLayerView3D.7ebbd153.js";import{u as f}from"./LayerView.88bcfa48.js";let e=class extends v(u(f)){constructor(){super(...arguments),this.type="elevation-3d"}get tileInfo(){return this.layer.tileInfo}initialize(){var a,o,s,l,n;const t=(o=(a=this.view)==null?void 0:a.map)==null?void 0:o.allLayers,d=t&&t.includes(this.layer),r=(n=(l=(s=this.view)==null?void 0:s.map)==null?void 0:l.ground)==null?void 0:n.layers,m=r&&r.includes(this.layer);if(d&&!m){const p=new c("layerview:elevation-layer-only","3D elevation layer '"+this.layer.id+"' can only be added to layers in map.ground");this.addResolvingPromise(Promise.reject(p))}this._addTilingSchemeMatchPromise()}};i([y()],e.prototype,"layer",void 0),i([y()],e.prototype,"tileInfo",null),e=i([h("esri.views.3d.layers.ElevationLayerView3D")],e);const P=e;export{P as default};