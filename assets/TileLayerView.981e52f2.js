import{aW as n,aX as m,aY as d,c3 as p,c5 as h,a$ as f,fY as v}from"./vendor.70daa49e.js";const F=u=>{let a=class extends u{async fetchPopupFeatures(i,l){const{layer:r}=this;if(!i)return Promise.reject(new p("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:r}));if(r.type!=="tile")return Promise.reject(new p("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:r.type}));const o=this.get("view.scale"),c=r.allSublayers.toArray().filter(e=>{const t=e.minScale===0||o<=e.minScale,s=e.maxScale===0||o>=e.maxScale;return e.popupTemplate&&e.popupEnabled&&e.visible&&t&&s});return h(c.map(async e=>{const t=e.createQuery(),s=f(l)?l.event:null,y=v({renderer:e.renderer,event:s});return t.geometry=this.createFetchPopupFeaturesQueryGeometry(i,y),t.outFields=await e.popupTemplate.getRequiredFields(),(await e.queryFeatures(t)).features})).then(e=>[].concat(...e.map(t=>t.value).filter(Boolean)))}};return n([m()],a.prototype,"layer",void 0),a=n([d("esri.layers.mixins.TileLayerView")],a),a};export{F as i};