import{na as y,nD as l,n4 as m,mT as F,nd as h,m_ as f,nc as s,mZ as b,n6 as j}from"./index.988b09cd.js";import{J as d}from"./arcadeUtils.746c6190.js";import{WhereClause as g}from"./WhereClause.4a84b2da.js";import"./vendor.c6be4c00.js";import"./index.25aa0880.js";/* empty css              */import"./qrcode.0911187d.js";/* empty css                 */import"./FeatureSetReader.c688f927.js";import"./centroid.0322b186.js";function i(t,e,u,n,a,r){if(n.length===1){if(m(n[0]))return f(d(t,n[0],s(n[1],-1)));if(h(n[0]))return f(d(t,n[0].toArray(),s(n[1],-1)))}else if(n.length===2){if(m(n[0]))return f(d(t,n[0],s(n[1],-1)));if(h(n[0]))return f(d(t,n[0].toArray(),s(n[1],-1)));if(l(n[0]))return n[0].load().then(c=>p(g.create(n[1],c.getFieldsIndex()),r,a).then(o=>n[0].calculateStatistic(t,o,s(n[2],1e3),e.abortSignal)))}else if(n.length===3&&l(n[0]))return n[0].load().then(c=>p(g.create(n[1],c.getFieldsIndex()),r,a).then(o=>n[0].calculateStatistic(t,o,s(n[2],1e3),e.abortSignal)));return f(d(t,n,-1))}function p(t,e,u){try{const n=t.getVariables();if(n.length>0){const a=[];for(let r=0;r<n.length;r++){const c={name:n[r]};a.push(e.evaluateIdentifier(u,c))}return b(a).then(r=>{const c={};for(let o=0;o<n.length;o++)c[n[o]]=r[o];return t.parameters=c,t})}return f(t)}catch(n){return j(n)}}function L(t){t.mode==="async"&&(t.functions.stdev=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("stdev",n,a,r,e,t)})},t.functions.variance=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("variance",n,a,r,e,t)})},t.functions.average=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("mean",n,a,r,e,t)})},t.functions.mean=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("mean",n,a,r,e,t)})},t.functions.sum=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("sum",n,a,r,e,t)})},t.functions.min=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("min",n,a,r,e,t)})},t.functions.max=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){return i("max",n,a,r,e,t)})},t.functions.count=function(e,u){return t.standardFunctionAsync(e,u,function(n,a,r){if(y(r,1,1),l(r[0]))return r[0].count(n.abortSignal);if(m(r[0])||F(r[0]))return r[0].length;if(h(r[0]))return r[0].length();throw new Error("Invalid Parameters for Count")})})}export{L as registerFunctions};