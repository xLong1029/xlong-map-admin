/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.8-next.4
 */function i(){}function l(e,t=!1){if(e.disabled){e.el.setAttribute("tabindex","-1"),e.el.setAttribute("aria-disabled","true"),e.el.contains(document.activeElement)&&document.activeElement.blur(),e.el.click=i;return}e.el.click=HTMLElement.prototype.click,typeof t=="function"?e.el.setAttribute("tabindex",t.call(e)?"0":"-1"):t===!0?e.el.setAttribute("tabindex","0"):t===!1&&e.el.removeAttribute("tabindex"),e.el.removeAttribute("aria-disabled")}export{l as u};
