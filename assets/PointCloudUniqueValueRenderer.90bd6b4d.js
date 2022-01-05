var A=Object.defineProperty,M=Object.defineProperties;var F=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var D=(o,s,l)=>s in o?A(o,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[s]=l,T=(o,s)=>{for(var l in s||(s={}))U.call(s,l)&&D(o,l,s[l]);if(k)for(var l of k(s))W.call(s,l)&&D(o,l,s[l]);return o},w=(o,s)=>M(o,F(s));import{aY as e,aZ as t,a_ as n,fT as m,fH as K,gY as b,jY as Y,ek as i,b2 as B,gP as q,jZ as j,j_ as Z}from"./vendor.47ccae81.js";var V;let h=V=class extends m{constructor(){super(...arguments),this.field=null,this.minValue=0,this.maxValue=255}clone(){return new V({field:this.field,minValue:this.minValue,maxValue:this.maxValue})}};e([t({type:String,json:{write:!0}})],h.prototype,"field",void 0),e([t({type:Number,nonNullable:!0,json:{write:!0}})],h.prototype,"minValue",void 0),e([t({type:Number,nonNullable:!0,json:{write:!0}})],h.prototype,"maxValue",void 0),h=V=e([n("esri.renderers.support.pointCloud.ColorModulation")],h);const _=h,S=new K({pointCloudFixedSizeAlgorithm:"fixed-size",pointCloudSplatAlgorithm:"splat"});let g=class extends m{};e([t({type:S.apiValues,readOnly:!0,nonNullable:!0,json:{type:S.jsonValues,read:!1,write:S.write}})],g.prototype,"type",void 0),g=e([n("esri.renderers.support.pointCloud.PointSizeAlgorithm")],g);const C=g;var $;let f=$=class extends C{constructor(){super(...arguments),this.type="fixed-size",this.size=0,this.useRealWorldSymbolSizes=null}clone(){return new $({size:this.size,useRealWorldSymbolSizes:this.useRealWorldSymbolSizes})}};e([b({pointCloudFixedSizeAlgorithm:"fixed-size"})],f.prototype,"type",void 0),e([t({type:Number,nonNullable:!0,json:{write:!0}})],f.prototype,"size",void 0),e([t({type:Boolean,json:{write:!0}})],f.prototype,"useRealWorldSymbolSizes",void 0),f=$=e([n("esri.renderers.support.pointCloud.PointSizeFixedSizeAlgorithm")],f);const G=f;var x;let v=x=class extends C{constructor(){super(...arguments),this.type="splat",this.scaleFactor=1}clone(){return new x({scaleFactor:this.scaleFactor})}};e([b({pointCloudSplatAlgorithm:"splat"})],v.prototype,"type",void 0),e([t({type:Number,value:1,nonNullable:!0,json:{write:!0}})],v.prototype,"scaleFactor",void 0),v=x=e([n("esri.renderers.support.pointCloud.PointSizeSplatAlgorithm")],v);const H=v,E={key:"type",base:C,typeMap:{"fixed-size":G,splat:H}},z=Y()({pointCloudClassBreaksRenderer:"point-cloud-class-breaks",pointCloudRGBRenderer:"point-cloud-rgb",pointCloudStretchRenderer:"point-cloud-stretch",pointCloudUniqueValueRenderer:"point-cloud-unique-value"});let p=class extends m{constructor(o){super(o),this.type=void 0,this.pointSizeAlgorithm=null,this.colorModulation=null,this.pointsPerInch=10}clone(){return console.warn(".clone() is not implemented for "+this.declaredClass),null}cloneProperties(){return{pointSizeAlgorithm:i(this.pointSizeAlgorithm),colorModulation:i(this.colorModulation),pointsPerInch:i(this.pointsPerInch)}}};e([t({type:z.apiValues,readOnly:!0,nonNullable:!0,json:{type:z.jsonValues,read:!1,write:z.write}})],p.prototype,"type",void 0),e([t({types:E,json:{write:!0}})],p.prototype,"pointSizeAlgorithm",void 0),e([t({type:_,json:{write:!0}})],p.prototype,"colorModulation",void 0),e([t({json:{write:!0},nonNullable:!0,type:Number})],p.prototype,"pointsPerInch",void 0),p=e([n("esri.renderers.PointCloudRenderer")],p),function(o){o.fieldTransformTypeKebabDict=new K({none:"none",lowFourBit:"low-four-bit",highFourBit:"high-four-bit",absoluteValue:"absolute-value",moduloTen:"modulo-ten"})}(p||(p={}));const r=p;var P;let a=P=class extends m{constructor(){super(...arguments),this.description=null,this.label=null,this.minValue=0,this.maxValue=0,this.color=null}clone(){return new P({description:this.description,label:this.label,minValue:this.minValue,maxValue:this.maxValue,color:i(this.color)})}};e([t({type:String,json:{write:!0}})],a.prototype,"description",void 0),e([t({type:String,json:{write:!0}})],a.prototype,"label",void 0),e([t({type:Number,json:{read:{source:"classMinValue"},write:{target:"classMinValue"}}})],a.prototype,"minValue",void 0),e([t({type:Number,json:{read:{source:"classMaxValue"},write:{target:"classMaxValue"}}})],a.prototype,"maxValue",void 0),e([t({type:B,json:{type:[q],write:!0}})],a.prototype,"color",void 0),a=P=e([n("esri.renderers.support.pointCloud.ColorClassBreakInfo")],a);const J=a;var R;let d=R=class extends r{constructor(o){super(o),this.type="point-cloud-class-breaks",this.field=null,this.legendOptions=null,this.fieldTransformType=null,this.colorClassBreakInfos=null}clone(){return new R(w(T({},this.cloneProperties()),{field:this.field,fieldTransformType:this.fieldTransformType,colorClassBreakInfos:i(this.colorClassBreakInfos),legendOptions:i(this.legendOptions)}))}};e([b({pointCloudClassBreaksRenderer:"point-cloud-class-breaks"})],d.prototype,"type",void 0),e([t({json:{write:!0},type:String})],d.prototype,"field",void 0),e([t({type:j,json:{write:!0}})],d.prototype,"legendOptions",void 0),e([t({type:r.fieldTransformTypeKebabDict.apiValues,json:{type:r.fieldTransformTypeKebabDict.jsonValues,read:r.fieldTransformTypeKebabDict.read,write:r.fieldTransformTypeKebabDict.write}})],d.prototype,"fieldTransformType",void 0),e([t({type:[J],json:{write:!0}})],d.prototype,"colorClassBreakInfos",void 0),d=R=e([n("esri.renderers.PointCloudClassBreaksRenderer")],d);const ee=d;var I;let u=I=class extends r{constructor(o){super(o),this.type="point-cloud-stretch",this.field=null,this.legendOptions=null,this.fieldTransformType=null,this.stops=null}clone(){return new I(w(T({},this.cloneProperties()),{field:i(this.field),fieldTransformType:i(this.fieldTransformType),stops:i(this.stops),legendOptions:i(this.legendOptions)}))}};e([b({pointCloudStretchRenderer:"point-cloud-stretch"})],u.prototype,"type",void 0),e([t({json:{write:!0},type:String})],u.prototype,"field",void 0),e([t({type:j,json:{write:!0}})],u.prototype,"legendOptions",void 0),e([t({type:r.fieldTransformTypeKebabDict.apiValues,json:{type:r.fieldTransformTypeKebabDict.jsonValues,read:r.fieldTransformTypeKebabDict.read,write:r.fieldTransformTypeKebabDict.write}})],u.prototype,"fieldTransformType",void 0),e([t({type:[Z],json:{write:!0}})],u.prototype,"stops",void 0),u=I=e([n("esri.renderers.PointCloudStretchRenderer")],u);const te=u;var N;let y=N=class extends m{constructor(){super(...arguments),this.description=null,this.label=null,this.values=null,this.color=null}clone(){return new N({description:this.description,label:this.label,values:i(this.values),color:i(this.color)})}};e([t({type:String,json:{write:!0}})],y.prototype,"description",void 0),e([t({type:String,json:{write:!0}})],y.prototype,"label",void 0),e([t({type:[String],json:{write:!0}})],y.prototype,"values",void 0),e([t({type:B,json:{type:[q],write:!0}})],y.prototype,"color",void 0),y=N=e([n("esri.renderers.support.pointCloud.ColorUniqueValueInfo")],y);const L=y;var O;let c=O=class extends r{constructor(o){super(o),this.type="point-cloud-unique-value",this.field=null,this.fieldTransformType=null,this.colorUniqueValueInfos=null,this.legendOptions=null}clone(){return new O(w(T({},this.cloneProperties()),{field:i(this.field),fieldTransformType:i(this.fieldTransformType),colorUniqueValueInfos:i(this.colorUniqueValueInfos),legendOptions:i(this.legendOptions)}))}};e([b({pointCloudUniqueValueRenderer:"point-cloud-unique-value"})],c.prototype,"type",void 0),e([t({json:{write:!0},type:String})],c.prototype,"field",void 0),e([t({type:r.fieldTransformTypeKebabDict.apiValues,json:{type:r.fieldTransformTypeKebabDict.jsonValues,read:r.fieldTransformTypeKebabDict.read,write:r.fieldTransformTypeKebabDict.write}})],c.prototype,"fieldTransformType",void 0),e([t({type:[L],json:{write:!0}})],c.prototype,"colorUniqueValueInfos",void 0),e([t({type:j,json:{write:!0}})],c.prototype,"legendOptions",void 0),c=O=e([n("esri.renderers.PointCloudUniqueValueRenderer")],c);const oe=c;export{oe as a,te as b,r as c,ee as d};