import{e as n,d as m,i as d,an as p,ap as h,r as f,ei as w}from"./index.988b09cd.js";const F=u=>{let r=class extends u{async fetchPopupFeatures(s,l){const{layer:a}=this;if(!s)return Promise.reject(new p("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:a}));if(a.type!=="tile")return Promise.reject(new p("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:a.type}));const o=this.get("view.scale"),c=a.allSublayers.toArray().filter(e=>{const t=e.minScale===0||o<=e.minScale,i=e.maxScale===0||o>=e.maxScale;return e.popupTemplate&&e.popupEnabled&&e.visible&&t&&i});return h(c.map(async e=>{const t=e.createQuery(),i=f(l)?l.event:null,y=w({renderer:e.renderer,event:i});return t.geometry=this.createFetchPopupFeaturesQueryGeometry(s,y),t.outFields=await e.popupTemplate.getRequiredFields(),(await e.queryFeatures(t)).features})).then(e=>[].concat(...e.map(t=>t.value).filter(Boolean)))}};return n([m()],r.prototype,"layer",void 0),r=n([d("esri.layers.mixins.TileLayerView")],r),r};export{F as i};