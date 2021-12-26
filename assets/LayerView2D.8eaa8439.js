import{e as t,d as s,e0 as w,i as u,mw as q,a8 as R,v as b,mx as y,n as f,my as U,ht as x,q as h}from"./index.988b09cd.js";import{s as $}from"./Container.b0eab594.js";var v;const M={base:q,key:"type",typeMap:{extent:R,polygon:b}};let r=v=class extends y{constructor(){super(...arguments),this.type="geometry",this.geometry=null}get version(){return(this._get("version")||0)+1}clone(){return new v({geometry:this.geometry.clone()})}};t([s({types:M,json:{read:w,write:!0}})],r.prototype,"geometry",void 0),t([s({readOnly:!0})],r.prototype,"version",null),r=v=t([u("esri.views.layers.support.Geometry")],r);const S=r;let o=class extends y{constructor(){super(...arguments),this.type="path",this.path=[]}get version(){return(this._get("version")||0)+1}};t([s({type:[[[Number]]],json:{write:!0}})],o.prototype,"path",void 0),t([s({readOnly:!0})],o.prototype,"version",null),o=t([u("esri.views.layers.support.Path")],o);const V=o,g=f.ofType({key:"type",base:y,typeMap:{rect:U,path:V,geometry:S}}),P=m=>{let i=class extends m{constructor(){super(...arguments),this.clips=new g,this.moving=!1,this.attached=!1,this.lastUpdateId=-1,this.updateRequested=!1}initialize(){var a;this.container||(this.container=new $),this.container.fadeTransitionEnabled=!0,this.container.opacity=0,this.container.clips=this.clips,this.handles.add([h(this,"suspended",e=>{this.container&&(this.container.visible=!e),this.view&&!e&&this.updateRequested&&this.view.requestUpdate()},!0),h(this,["layer.opacity","container"],()=>{var e,n;this.container&&(this.container.opacity=(e=(n=this.layer)==null?void 0:n.opacity)!=null?e:1)},!0),h(this,["layer.blendMode"],e=>{this.container&&(this.container.blendMode=e)},!0),h(this,["layer.effect"],e=>{this.container&&(this.container.effect=e)},!0),this.clips.on("change",()=>{this.container.clips=this.clips,this.notifyChange("clips")})]),(a=this.view)!=null&&a.whenLayerView?this.view.whenLayerView(this.layer).then(e=>{e!==this||this.attached||this.destroyed||(this.attach(),this.requestUpdate(),this.attached=!0)},()=>{}):this.when().then(()=>{this.attached||this.destroyed||(this.attach(),this.requestUpdate(),this.attached=!0)},()=>{})}destroy(){this.attached&&(this.detach(),this.attached=!1),this.handles.remove("initialize"),this.updateRequested=!1}get updating(){return!this.attached||!this.suspended&&(this.updateRequested||this.isUpdating())||!(!this.updatingHandles||!this.updatingHandles.updating)}isVisibleAtScale(a){let e=!0;const n=this.layer,p=n.minScale,d=n.maxScale;if(p!=null&&d!=null){let l=!p,c=!d;!l&&a<=p&&(l=!0),!c&&a>=d&&(c=!0),e=l&&c}return e}requestUpdate(){this.destroyed||this.updateRequested||(this.updateRequested=!0,this.suspended||this.view.requestUpdate())}processUpdate(a){!this.isFulfilled()||this.isResolved()?(this._set("updateParameters",a),this.updateRequested&&!this.suspended&&(this.updateRequested=!1,this.update(a))):this.updateRequested=!1}hitTest(a,e){return Promise.resolve(null)}isUpdating(){return!1}isRendering(){return!1}canResume(){return!!super.canResume()&&this.isVisibleAtScale(this.view.scale)}};return t([s({type:g,set(a){const e=x(a,this._get("clips"),g);this._set("clips",e)}})],i.prototype,"clips",void 0),t([s()],i.prototype,"moving",void 0),t([s()],i.prototype,"attached",void 0),t([s()],i.prototype,"container",void 0),t([s()],i.prototype,"suspended",void 0),t([s({readOnly:!0})],i.prototype,"updateParameters",void 0),t([s()],i.prototype,"updateRequested",void 0),t([s()],i.prototype,"updating",null),t([s()],i.prototype,"view",void 0),i=t([u("esri.views.2d.layers.LayerView2D")],i),i};export{P as l};