import{b2 as u}from"./vendor.47ccae81.js";const d={fill:[{type:"path",path:"M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"}],squareFill:[{type:"path",path:"M -10,-10 L 10,-10 L 10,10 L -10,10 L -10,-10 Z"}],pathSymbol3DLayer:[{type:"path",path:"M 3,12 L 12,0 L 11,-2 L -4,5 L -1,5 L 1,7 L 3,10 L 3,12 Z"},{type:"circle",cx:-2,cy:10,r:5}],extrudeSymbol3DLayer:[{type:"path",path:"M -7,-5 L -2,0 L -2,7 L -7,3 L -7,-5 Z"},{type:"path",path:"M -2,0 L -2,7 L 10,-3 L 10,-10 L -2,0 Z"},{type:"path",path:"M -7,-5 L -2,0 L 10,-10 L -2,-10 L -7,-5 Z"}],cone:[{type:"path",path:"M 0,-10 L -8,5 L -4,6.5 L 0,7 L 4,6.5 L 8,5 Z"}],tallCone:[{type:"path",path:"M 0,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 0,-9 Z"}],invertedCone:[{type:"path",path:"M 0,7 L -8,-8 L 8,-8 Z"},{type:"path",path:"M -8,-8 L -4,-9.5 L 0,-10 L 4,-9.5 L 8,-8 L 4,-6.5 L 0,-6 L -4,-6.5 Z"}],cube:[{type:"path",path:"M -10,-7 L 0,-12 L 10,-7 L 0,-2 L -10,-7 Z"},{type:"path",path:"M -10,-7 L 0,-2 L 0,12 L -10,7 L -10,-7 Z"},{type:"path",path:"M 0,-2 L 10,-7 L 10,7 L 0,12 L 0,-2 Z"}],tallCube:[{type:"path",path:"M -3.5,-8.5 L 0,-9.5 L 3.5,-8.5 L 0,-7.5 L -3.5,-8.5 Z"},{type:"path",path:"M -3.5,-8.5 L 0,-7.5 L 0,9 L -3.5,8 L -3.5,-8.5 Z"},{type:"path",path:"M 0,-7.5 L 3.5,-8.5 L 3.5,8 L 0,9 L 0,-7.5 Z"}],cylinder:[{type:"path",path:"M -8,-9 L -8,7 L -4,8.5 L 0,9 L 4,8.5 L 8,7 L 8,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:8,ry:2}],tallCylinder:[{type:"path",path:"M -3.5,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 3.5,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:3.5,ry:1}],diamond:[{type:"path",path:"M 0,-10 L 10,-1 L -1,1 L 0,-10 Z"},{type:"path",path:"M 0,-10 L -1,1 L -8,-1 L 0,-10 Z"},{type:"path",path:"M -1,1 L 0,10 L -8,-1 L -1,1 Z"},{type:"path",path:"M -1,0 L 0,10 L 10,-1 L -1,1 Z"}],tetrahedron:[{type:"path",path:"M 0,-10 L 10,7 L 0,0 L 0,-10 Z"},{type:"path",path:"M 0,-10 L 0,0 L -8,7 L 0,-10 Z"},{type:"path",path:"M 10,7 L 0,0 L -8,7 L 10,7 Z"}]};function v(e,t,a){const n=22;let m=n,p=n;e<1?m*=.75:e>1&&(p*=1.25);const c=0,o=0;let L=n,s=n;return t&&a&&(m=p=L=s=0),[{type:"path",path:[{command:"M",values:[L,c]},{command:"L",values:[a?L:.875*L,c]},{command:"L",values:[a?m-.5*L:o,p-.5*s]},{command:"L",values:[m-.5*L,p-.5*s]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[L,c]},{command:"L",values:[L,t?c:.125*s]},{command:"L",values:[m-.5*L,t?p-.5*s:s]},{command:"L",values:[m-.5*L,p-.5*s]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[m-.5*L,p-.5*s]},{command:"L",values:[a?m-.5*L:o,p-.5*s]},{command:"L",values:[a?m-.5*L:o,t?p-.5*s:s]},{command:"L",values:[m-.5*L,t?p-.5*s:s]},{command:"Z",values:[]}]}]}function y(e){const t=22,a=.5*e,n=0,m=0;return[{type:"path",path:[{command:"M",values:[m,.7*t*.5]},{command:"L",values:[.3*t,.7*t]},{command:"L",values:[.3*t,.7*t+a]},{command:"L",values:[m,.7*t+a-.7*t*.5]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.3*t,.7*t]},{command:"L",values:[.3*t,.7*t+a]},{command:"L",values:[t,a]},{command:"L",values:[t,n]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.3*t,n]},{command:"L",values:[t,n]},{command:"L",values:[.3*t,.7*t]},{command:"L",values:[m,.7*t*.5]},{command:"Z",values:[]}]}]}function r(){return[{type:"path",path:"M80,80.2v-27c-1.5,0.7-2.8,1.6-3.9,2.8c-1.8,2.1-4.4,3.3-7.1,3.5c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.4,3.6c-1.8,2.1-4.4,3.3-7.2,3.4C8.3,59.3,5.7,58,3.9,56c-1.1-1.2-2.4-2.1-3.9-2.8v27"},{type:"path",path:"M11,59.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.4-3.6s5.1,1.3,7.4,3.6c1.8,2,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.3-3.6s5.1,1.3,7.4,3.6c1.8,2.1,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c1.1-1.2,2.4-2.1,3.9-2.8v-24c-1.5,0.7-2.8,1.6-3.9,2.8c-1.8,2.1-4.4,3.3-7.1,3.5c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.4,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.7-0.1-5.3-1.4-7.1-3.4c-1.1-1.2-2.4-2.1-3.9-2.8v24c1.5,0.7,2.8,1.6,3.9,2.8C5.7,58,8.3,59.3,11,59.4z"},{type:"path",path:"M11,35.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.4-3.6s5.1,1.3,7.4,3.6c1.8,2,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.3-3.6s5.1,1.3,7.4,3.6c1.8,2.1,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c1.1-1.2,2.4-2.1,3.9-2.8V3.6c-1.5,0.7-2.8,1.6-3.9,2.8c-2.2,2.1-4.6,3.4-7.1,3.4s-5-1.3-7.1-3.4s-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6S42.5,9.9,40,9.9s-5-1.3-7.1-3.4s-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.5,0-5-1.3-7.1-3.4C2.8,5.3,1.4,4.3,0,3.6v25.6c1.5,0.7,2.8,1.6,3.9,2.8C5.7,34.1,8.3,35.3,11,35.4z"}]}function M(e,t){let a=t?20:e;const n=t?4:6;a-=a<=22?.5*n:n;const m=0,p=0,c=t?.35*a:.5*a;return[{type:"path",path:[{command:"M",values:[.5*a,m]},{command:"L",values:[a,.5*c]},{command:"L",values:[.5*a,c]},{command:"L",values:[p,.5*c]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[m,.5*c]},{command:"L",values:[.5*a,c]},{command:"L",values:[.5*a,e]},{command:"L",values:[p,e-.5*c]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.5*a,c]},{command:"L",values:[.5*a,e]},{command:"L",values:[a,e-.5*c]},{command:"L",values:[a,.5*c]},{command:"Z",values:[]}]}]}function Z(e,t){let a=t?20:e;const n=t?4:6;a-=a<=22?.5*n:n;const m=.5*a,p=.15*a,c=0,o=e-p;return[{type:"ellipse",cx:.5*a,cy:o,rx:m,ry:p},{type:"path",path:[{command:"M",values:[c,p]},{command:"L",values:[c,o]},{command:"L",values:[a,o]},{command:"L",values:[a,p]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*a,cy:p,rx:m,ry:p}]}function i(e,t){let a=t?20:e;const n=t?4:6;a-=a<=22?.5*n:n;const m=.15*a,p=e-m;return[{type:"ellipse",cx:.5*a,cy:p,rx:.5*a,ry:m},{type:"path",path:[{command:"M",values:[.5*a,0]},{command:"L",values:[a,p]},{command:"L",values:[0,p]},{command:"Z",values:[]}]}]}function x(e){let t=e;const a=6;t-=t<22?.5*a:a;const n=.15*t,m=0;return[{type:"path",path:[{command:"M",values:[0,m]},{command:"L",values:[t,m]},{command:"L",values:[.5*t,e-n]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*t,cy:m,rx:.5*t,ry:n}]}function f(e){let t=e;const a=e,n=4;t-=t<22?.5*n:n;const m=0,p=0,c=t,o=a,L=Math.floor(e/10)-1||1;return[{type:"path",path:[{command:"M",values:[.45*c,m]},{command:"L",values:[c,.5*o-L]},{command:"L",values:[.45*c-L,.5*o+L]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*c,m]},{command:"L",values:[.45*c-L,.5*o+L]},{command:"L",values:[p,.5*o-L]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[p,.5*o-L]},{command:"L",values:[.45*c-L,.5*o+L]},{command:"L",values:[.45*c,a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*c,a]},{command:"L",values:[c,.5*o-L]},{command:"L",values:[.45*c-L,.5*o+L]},{command:"Z",values:[]}]}]}function C(e){const t=2;let a=e;a-=a<22?.5*t:t;const n=0,m=0;return[{type:"path",path:[{command:"M",values:[.45*e,n]},{command:"L",values:[e,a]},{command:"L",values:[.45*e,.6*a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*e,n]},{command:"L",values:[.45*e,.6*a]},{command:"L",values:[m,a]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[m,a]},{command:"L",values:[.45*e,.6*a]},{command:"L",values:[e,a]},{command:"Z",values:[]}]}]}function l(e,t){const a=.75;return Math.round(Math.min(Math.max(e+255*t*a,0),255))}function b(e,t){if("type"in e&&(e.type==="linear"||e.type==="pattern"))return e;const a=new u(e);return new u([l(a.r,t),l(a.g,t),l(a.b,t),a.a])}export{Z as L,r as c,v as e,b as h,C as l,y as m,i as n,x as o,M as p,f as s,d as t,l as u};