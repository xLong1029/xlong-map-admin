import{j as s}from"./brushes.0945eb3a.js";import{I as t}from"./Utils.56a5b8e8.js";import{a}from"./WGLContainer.c4152aca.js";class p extends a{get requiresDedicatedFBO(){return this.children.some(e=>e.blendFunction==="additive")}prepareRenderPasses(e){const r=e.registerRenderPass({name:"bitmap",brushes:[s.bitmap],target:()=>this.children,drawPhase:t.MAP});return[...super.prepareRenderPasses(e),r]}}export{p as t};