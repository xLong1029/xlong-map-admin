import{Y as $,n_ as j,az as g,U as y,w as S,aM as m,r as p,ap as b,tj as F,F as c,e as s,y as i,tk as M,g7 as d,b as w,hd as I,sj as C,sl as K,sk as N,pU as P,pV as R,pW as T,l8 as z,dj as k,qi as A,dk as J,g8 as W,p_ as V,A as q}from"./index.a33ecea7.js";import{j as H,S as x,g as E,d as _}from"./kmlUtils.11d5e6a8.js";var u;let a=u=class extends $.EventedMixin(j(I)){constructor(...e){super(...e),this.description=null,this.id=null,this.networkLink=null,this.sublayers=null,this.title=null,this.sourceJSON=null,this.fullExtent=null,this.addHandles([g(()=>this.sublayers,"after-add",({item:t})=>{t.parent=this,t.layer=this.layer},y),g(()=>this.sublayers,"after-remove",({item:t})=>{t.layer=t.parent=null},y),S(()=>this.sublayers,(t,l)=>{if(l)for(const r of l)r.layer=r.parent=null;if(t)for(const r of t)r.parent=this,r.layer=this.layer},y)])}initialize(){m(()=>this.networkLink).then(()=>m(()=>this.visible===!0)).then(()=>this.load())}load(e){var r,n;if(!this.networkLink||this.networkLink.viewFormat)return;const t=p(e)?e.signal:null,l=this._fetchService((n=(r=this._get("networkLink"))==null?void 0:r.href)!=null?n:"",t).then(h=>{var f;const O=H(h.sublayers);this.fullExtent=b.fromJSON(O),this.sourceJSON=h;const v=F(c.ofType(u),x(u,h));this.sublayers?this.sublayers.addMany(v):this.sublayers=v,(f=this.layer)==null||f.emit("sublayer-update"),this.layer&&this.layer.notifyChange("visibleSublayers")});return this.addResolvingPromise(l),Promise.resolve(this)}get visible(){return this._get("visible")}set visible(e){this._get("visible")!==e&&(this._set("visible",e),this.layer&&this.layer.notifyChange("visibleSublayers"))}readVisible(e,t){return!!t.visibility}set layer(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach(t=>t.layer=e)}_fetchService(e,t){return E(e,this.layer.outSpatialReference,this.layer.refreshInterval,t).then(l=>_(l.data))}};s([i()],a.prototype,"description",void 0),s([i()],a.prototype,"id",void 0),s([i({readOnly:!0,value:null})],a.prototype,"networkLink",void 0),s([i({json:{write:{allowNull:!0}}})],a.prototype,"parent",void 0),s([i({type:c.ofType(u),json:{write:{allowNull:!0}}})],a.prototype,"sublayers",void 0),s([i({value:null,json:{read:{source:"name",reader:e=>M(e)}}})],a.prototype,"title",void 0),s([i({value:!0})],a.prototype,"visible",null),s([d("visible",["visibility"])],a.prototype,"readVisible",null),s([i()],a.prototype,"sourceJSON",void 0),s([i({value:null})],a.prototype,"layer",null),s([i({type:b})],a.prototype,"fullExtent",void 0),a=u=s([w("esri.layers.support.KMLSublayer")],a);const L=a,U=["kml","xml"];let o=class extends C(K(N(P(R(T(q)))))){constructor(...e){super(...e),this._visibleFolders=[],this.allSublayers=new z({getCollections:()=>[this.sublayers],getChildrenFunction:t=>t.sublayers}),this.outSpatialReference=k.WGS84,this.path=null,this.legendEnabled=!1,this.operationalLayerType="KML",this.sublayers=null,this.type="kml",this.url=null}initialize(){this.addHandles([S(()=>this.sublayers,(e,t)=>{t&&t.forEach(l=>{l.parent=null,l.layer=null}),e&&e.forEach(l=>{l.parent=this,l.layer=this})},y),this.on("sublayer-update",()=>this.notifyChange("fullExtent"))])}normalizeCtorArgs(e,t){return typeof e=="string"?{url:e,...t}:e}readSublayersFromItemOrWebMap(e,t){this._visibleFolders=t.visibleFolders}readSublayers(e,t,l){return x(L,t,l,this._visibleFolders)}writeSublayers(e,t){const l=[],r=e.toArray();for(;r.length;){const n=r[0];n.networkLink||(n.visible&&l.push(n.id),n.sublayers&&r.push(...n.sublayers.toArray())),r.shift()}t.visibleFolders=l}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?A(this.url,U)||"KML":e||""}set title(e){this._set("title",e)}get visibleSublayers(){const e=this.sublayers,t=[],l=r=>{r.visible&&(t.push(r),r.sublayers&&r.sublayers.forEach(l))};return e&&e.forEach(l),t}get fullExtent(){return this._recomputeFullExtent()}load(e){const t=p(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"],supportsData:!1},e).catch(J).then(()=>this._fetchService(t))),Promise.resolve(this)}destroy(){super.destroy(),this.allSublayers.destroy()}async _fetchService(e){const t=await Promise.resolve().then(()=>{var r;return this.resourceInfo?{ssl:!1,data:this.resourceInfo}:E((r=this.url)!=null?r:"",this.outSpatialReference,this.refreshInterval,e)}),l=_(t.data);l&&this.read(l,{origin:"service"})}_recomputeFullExtent(){let e=null;p(this.extent)&&(e=this.extent.clone());const t=l=>{if(l.sublayers)for(const r of l.sublayers.items)t(r),r.visible&&r.fullExtent&&(p(e)?e.union(r.fullExtent):e=r.fullExtent.clone())};return t(this),e}};s([i({readOnly:!0})],o.prototype,"allSublayers",void 0),s([i({type:k})],o.prototype,"outSpatialReference",void 0),s([i({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],o.prototype,"path",void 0),s([i({readOnly:!0,json:{read:!1,write:!1}})],o.prototype,"legendEnabled",void 0),s([i({type:["show","hide","hide-children"]})],o.prototype,"listMode",void 0),s([i({type:["KML"]})],o.prototype,"operationalLayerType",void 0),s([i({})],o.prototype,"resourceInfo",void 0),s([i({type:c.ofType(L),json:{write:{ignoreOrigin:!0}}})],o.prototype,"sublayers",void 0),s([d(["web-map","portal-item"],"sublayers",["visibleFolders"])],o.prototype,"readSublayersFromItemOrWebMap",null),s([d("service","sublayers",["sublayers"])],o.prototype,"readSublayers",null),s([W("sublayers")],o.prototype,"writeSublayers",null),s([i({readOnly:!0,json:{read:!1}})],o.prototype,"type",void 0),s([i({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}}})],o.prototype,"title",null),s([i(V)],o.prototype,"url",void 0),s([i({readOnly:!0})],o.prototype,"visibleSublayers",null),s([i({type:b})],o.prototype,"extent",void 0),s([i()],o.prototype,"fullExtent",null),o=s([w("esri.layers.KMLLayer")],o);const Y=o;export{Y as default};