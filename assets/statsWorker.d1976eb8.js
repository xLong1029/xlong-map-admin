import{aM as T,cn as x}from"./index.988b09cd.js";import{T as y,s as w,m as V,c as F,V as I,g as E,h as P,y as b,D as h,z as j}from"./utils.88386124.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */import"./ClassBreaksDefinition.34fb124d.js";let c=null;async function v(e,a){if(!a)return[];const r=e.field,i=e.valueExpression,n=e.normalizationType,l=e.normalizationField,s=e.normalizationTotal,t=[],o=e.viewInfoParams;let m=null,f=null;if(i){if(!c){const{arcadeUtils:u}=await T();c=u}m=c.createFunction(i),f=o&&c.getViewInfo({viewingMode:o.viewingMode,scale:o.scale,spatialReference:new x(o.spatialReference)})}return a.forEach(u=>{const p=u.attributes;let d;if(i){const z=c.createExecContext(u,f);d=c.executeFunction(m,z)}else p&&(d=p[r]);if(n&&isFinite(d)){const z=p&&parseFloat(p[l]);d=y(d,n,z,s)}t.push(d)}),t}async function q(e){const{attribute:a,features:r}=e,{normalizationType:i,normalizationField:n,minValue:l,maxValue:s,fieldType:t}=a,o=await v({field:a.field,valueExpression:a.valueExpression,normalizationType:i,normalizationField:n,normalizationTotal:a.normalizationTotal,viewInfoParams:a.viewInfoParams},r),m=w({normalizationType:i,normalizationField:n,minValue:l,maxValue:s}),f={value:.5,fieldType:t},u=t==="esriFieldTypeString"?V({values:o,supportsNullCount:m,percentileParams:f}):F({values:o,minValue:l,maxValue:s,useSampleStdDev:!i,supportsNullCount:m,percentileParams:f});return I(u,t==="esriFieldTypeDate")}async function N(e){const{attribute:a,features:r}=e,i=await v({field:a.field,valueExpression:a.valueExpression,viewInfoParams:a.viewInfoParams},r),n=E(i);return P(n,a.domain,a.returnAllCodedValues)}async function R(e){const{attribute:a,features:r}=e,{field:i,normalizationType:n,normalizationField:l,normalizationTotal:s,classificationMethod:t}=a,o=await v({field:i,valueExpression:a.valueExpression,normalizationType:n,normalizationField:l,normalizationTotal:s,viewInfoParams:a.viewInfoParams},r),m=b(o,{field:i,normalizationType:n,normalizationField:l,normalizationTotal:s,classificationMethod:t,standardDeviationInterval:a.standardDeviationInterval,numClasses:a.numClasses,minValue:a.minValue,maxValue:a.maxValue});return h(m,t)}async function A(e){const{attribute:a,features:r}=e,{field:i,normalizationType:n,normalizationField:l,normalizationTotal:s,classificationMethod:t}=a,o=await v({field:i,valueExpression:a.valueExpression,normalizationType:n,normalizationField:l,normalizationTotal:s,viewInfoParams:a.viewInfoParams},r);return j(o,{field:i,normalizationType:n,normalizationField:l,normalizationTotal:s,classificationMethod:t,standardDeviationInterval:a.standardDeviationInterval,numBins:a.numBins,minValue:a.minValue,maxValue:a.maxValue})}export{R as classBreaks,A as histogram,q as summaryStatistics,N as uniqueValues};