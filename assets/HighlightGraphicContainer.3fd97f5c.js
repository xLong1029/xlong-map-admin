import{e as s,b as a,fr as d}from"./index.a33ecea7.js";import{T as o}from"./enums.a12f2baf.js";import{n as h}from"./BaseGraphicContainer.cb1cac6c.js";let t=class extends h{doRender(r){r.drawPhase===o.HIGHLIGHT&&super.doRender(r)}renderChildren(r){if(this.attributeView.update(),!this.children.some(n=>n.hasData))return;this.attributeView.bindTextures(r.context),super.renderChildren(r);const{painter:i}=r,e=i.effects.highlight;e.bind(r),r.context.setColorMask(!0,!0,!0,!0),r.context.clear(d.COLOR_BUFFER_BIT),this._renderChildren(r,e.defines.concat(["highlightAll"])),e.draw(r),e.unbind()}};t=s([a("esri.views.2d.layers.support.HighlightGraphicContainer")],t);const u=t;export{u as n};