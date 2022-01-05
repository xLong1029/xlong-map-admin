import{fH as ut,b1 as dt,bF as pt,bB as mt,e8 as wt,bS as gt,b6 as C,fo as Y,kA as Mt}from"./vendor.47ccae81.js";import{i as Z,u as B}from"./pixelUtils.b67e8c28.js";const T=new Map;T.set("meter-per-second",1),T.set("kilometer-per-hour",.277778),T.set("knots",.514444),T.set("feet-per-second",.3048),T.set("mile-per-hour",.44704);const H=180/Math.PI,K=5,W=new ut({esriMetersPerSecond:"meter-per-second",esriKilometersPerHour:"kilometer-per-hour",esriKnots:"knots",esriFeetPerSecond:"feet-per-second",esriMilesPerHour:"mile-per-hour"});function tt(t,n){return T.get(t)/T.get(n)||1}function et(t){return(450-t)%360}function nt(t,n="geographic"){const[r,h]=t,l=Math.sqrt(r*r+h*h);let o=Math.atan2(h,r)*H;return o=(360+o)%360,n==="geographic"&&(o=et(o)),[l,o]}function rt(t,n="geographic"){let r=t[1];n==="geographic"&&(r=et(r)),r%=360;const h=t[0];return[h*Math.cos(r/H),h*Math.sin(r/H)]}function Bt(t,n,r="geographic",h=1){if(!Z(t))return t;const{pixels:l,width:o,height:i}=t,p=o*i,f=l[0],e=l[1],a=B.createEmptyBand(t.pixelType,p),c=B.createEmptyBand(t.pixelType,p);let s=0;for(let m=0;m<i;m++)for(let g=0;g<o;g++)n==="vector-uv"?([a[s],c[s]]=nt([f[s],e[s]],r),a[s]*=h):([a[s],c[s]]=rt([f[s],e[s]],r),a[s]*=h,c[s]*=h),s++;const d=new B({pixelType:t.pixelType,width:t.width,height:t.height,mask:t.mask,validPixelCount:t.validPixelCount,maskIsAlpha:t.maskIsAlpha,pixels:[a,c]});return d.updateStatistics(),d}function qt(t,n,r=1){if(r===1||!Z(t))return t;const h=t.clone(),{pixels:l,width:o,height:i}=h,p=l[0],f=l[1];let e=0;for(let a=0;a<i;a++)for(let c=0;c<o;c++)n==="vector-uv"?(p[e]*=r,f[e]*=r):p[e]*=r,e++;return h.updateStatistics(),h}function Ot(t,n,r,h,l){if(!dt(l)||!l.spatialReference.equals(t.spatialReference))return{extent:t,width:n,height:r,resolution:t.width/n};const o=l.xmin,i=l.ymax;h=Math.max(h||0,30);const p=Math.ceil(n*(1/h)),f=Math.ceil(r*(1/h)),e=((t.xmax-t.xmin)/p+(t.ymax-t.ymin)/f)/2;return t.xmin=o+Math.floor((t.xmin-o)/e)*e,t.xmax=o+Math.ceil((t.xmax-o)/e)*e,t.ymin=i+Math.floor((t.ymin-i)/e)*e,t.ymax=i+Math.ceil((t.ymax-i)/e)*e,{extent:t,width:Math.round(t.width/e),height:Math.round(t.height/e),resolution:e}}const X=xt(0,0,0);function xt(t=0,n=0,r=Math.PI,h=!0){h&&(r=(2*Math.PI-r)%(2*Math.PI));const l=h?-1:1,o=13*l,i=-7*l,p=-2*l,f=-16*l,e=29,[a,c]=S(0,n+o,r,e),[s,d]=S(t-5.5,n+i,r,e),[m,g]=S(t+5.5,n+i,r,e),[y,M]=S(t-1.5,n+p,r,e),[k,u]=S(t+1.5,n+p,r,e),[w,P]=S(t-1.5,n+f,r,e),[x,v]=S(t+1.5,n+f,r,e);return[a,c,s,d,y,M,k,u,m,g,w,P,x,v]}function yt(t=0,n=Math.PI,r=!0){r&&(n=(2*Math.PI-n)%(2*Math.PI));const h=10,l=r?-1:1,o=5*l,i=20*l,p=25*l,f=45,e=0,a=0,c=2,s=0,d=c*l;let[m,g]=[e+h/2,a-i],[y,M]=[m+c,g],[k,u]=[y-s,M+d],[w,P]=[e-h/2,a-p],[x,v]=[w+s,P-d],I=Math.ceil(t/K),b=Math.floor(I/10);I-=8*b;const A=[],F=[];for(let N=0;N<I/2;N++,b--){b<=0&&I%2==1&&N===(I-1)/2&&(w=e,x=w+s,P=(P+g)/2,v=P-d);const[G,Q]=S(w,P,n,f);if(b>0){const[R,E]=S(y,P,n,f),[J,j]=S(m,g,n,f);A.push(R),A.push(E),A.push(G),A.push(Q),A.push(J),A.push(j)}else{const[R,E]=S(y,M,n,f),[J,j]=S(k,u,n,f),[ct,ft]=S(x,v,n,f);F.push(G),F.push(Q),F.push(ct),F.push(ft),F.push(J),F.push(j),F.push(R),F.push(E)}P+=o,g+=o,M+=o,u+=o,v+=o}const[$,D]=S(e+h/2,a+i,n,f),_=h/2+c,[U,L]=S(e+_,a+i,n,f),[O,st]=S(e+h/2,a-p,n,f),[lt,ht]=S(e+_,a-p,n,f);return{pennants:A,barbs:F,shaft:[$,D,U,L,O,st,lt,ht]}}function S(t,n,r,h=1){const l=Math.sqrt(t*t+n*n)/h,o=(2*Math.PI+Math.atan2(n,t))%(2*Math.PI);return[l,(2*Math.PI+o-r)%(2*Math.PI)]}const q=[0,1,3,6,10,16,21,27,33,40,47,55,63],kt=[0,.5,1,1.5,2],bt=[0,.25,.5,1,1.5,2,2.5,3,3.5,4];function V(t,n,r,h){const l=tt(h||"knots",r);let o;for(o=1;o<n.length;o++)if(o===n.length-1){if(t<n[o]*l)break}else if(t<=n[o]*l)break;return Math.min(o-1,n.length-2)}function Pt(t,n,r,h,l){let o=0;switch(n){case"beaufort_kn":o=V(t,q,"knots",r);break;case"beaufort_km":o=V(t,q,"kilometer-per-hour",r);break;case"beaufort_ft":o=V(t,q,"feet-per-second",r);break;case"beaufort_m":o=V(t,q,"meter-per-second",r);break;case"classified_arrow":o=V(t,l,h,r);break;case"ocean_current_m":o=V(t,kt,"meter-per-second",r);break;case"ocean_current_kn":o=V(t,bt,"knots",r)}return o}function At(t,n){const{style:r,inputUnit:h,outputUnit:l,breakValues:o}=n,i=W.fromJSON(h),p=W.fromJSON(l),f=7*6,e=15;let a=0,c=0;const{width:s,height:d,mask:m}=t,g=t.pixels[0],y=t.pixels[1],M=m?m.filter(P=>P>0).length:s*d,k=new Float32Array(M*f),u=new Uint32Array(e*M);for(let P=0;P<d;P++)for(let x=0;x<s;x++){const v=P*s+x;if(!m||m[P*s+x]){var w;const I=(w=(y[v]+360)%360/180*Math.PI)!=null?w:2*Math.PI*Math.random(),b=Pt(g[v],r,i,p,o);for(let F=0;F<X.length;F+=2)k[a++]=(x+.5)/s,k[a++]=(P+.5)/d,k[a++]=X[F],k[a++]=X[F+1]+I,k[a++]=b,k[a++]=g[v];const A=7*(a/f-1);u[c++]=A,u[c++]=A+1,u[c++]=A+2,u[c++]=A+0,u[c++]=A+4,u[c++]=A+3,u[c++]=A+0,u[c++]=A+2,u[c++]=A+3,u[c++]=A+2,u[c++]=A+5,u[c++]=A+3,u[c++]=A+5,u[c++]=A+6,u[c++]=A+3}}return{vertexData:k,indexData:u}}const z=[];function vt(t,n){if(z.length===0)for(let m=0;m<30;m++)z.push(yt(5*m,0));const r=tt(W.fromJSON(n.inputUnit),"knots"),{width:h,height:l,mask:o}=t,i=t.pixels[0],p=t.pixels[1],f=6,e=[],a=[];let c=0,s=0;for(let m=0;m<l;m++)for(let g=0;g<h;g++){const y=m*h+g,M=i[y]*r;if((!o||o[m*h+g])&&M>=K){var d;const k=(d=(p[y]+360)%360/180*Math.PI)!=null?d:2*Math.PI*Math.random(),{pennants:u,barbs:w,shaft:P}=z[Math.min(Math.floor(M/5),29)];if(u.length+w.length===0)continue;let x=e.length/f;const v=(g+.5)/h,I=(m+.5)/l;for(let b=0;b<u.length;b+=2)e[c++]=v,e[c++]=I,e[c++]=u[b],e[c++]=u[b+1]+k,e[c++]=0,e[c++]=M;for(let b=0;b<w.length;b+=2)e[c++]=v,e[c++]=I,e[c++]=w[b],e[c++]=w[b+1]+k,e[c++]=0,e[c++]=M;for(let b=0;b<P.length;b+=2)e[c++]=v,e[c++]=I,e[c++]=P[b],e[c++]=P[b+1]+k,e[c++]=0,e[c++]=M;for(let b=0;b<u.length/6;b++)a[s++]=x,a[s++]=x+1,a[s++]=x+2,x+=3;for(let b=0;b<w.length/8;b++)a[s++]=x,a[s++]=x+1,a[s++]=x+2,a[s++]=x+1,a[s++]=x+2,a[s++]=x+3,x+=4;a[s++]=x+0,a[s++]=x+1,a[s++]=x+2,a[s++]=x+1,a[s++]=x+3,a[s++]=x+2,x+=4}}return{vertexData:new Float32Array(e),indexData:new Uint32Array(a)}}function It(t,n){const r=4*6;let h=0,l=0;const{width:o,height:i,mask:p}=t,f=t.pixels[0],e=[],a=[],c=n.style==="wind_speed"?K:Number.MAX_VALUE;for(let s=0;s<i;s++)for(let d=0;d<o;d++){const m=s*o+d;if((!p||p[s*o+d])&&f[m]<c){for(let y=0;y<4;y++)e[h++]=(d+.5)/o,e[h++]=(s+.5)/i,e[h++]=y<2?-.5:.5,e[h++]=y%2==0?-.5:.5,e[h++]=0,e[h++]=f[m];const g=4*(h/r-1);a[l++]=g,a[l++]=g+1,a[l++]=g+2,a[l++]=g+1,a[l++]=g+2,a[l++]=g+3}}return{vertexData:new Float32Array(e),indexData:new Uint32Array(a)}}function Nt(t,n){return n.style==="simple_scalar"?It(t,n):n.style==="wind_speed"?vt(t,n):At(t,n)}function Rt(t,n,r,h=[0,0],l=.5){const{width:o,height:i,mask:p}=t,[f,e]=t.pixels,[a,c]=h,s=Math.round((o-a)/r),d=Math.round((i-c)/r),m=s*d,g=new Float32Array(m),y=new Float32Array(m),M=new Uint8Array(m),k=n==="vector-uv";for(let w=0;w<d;w++)for(let P=0;P<s;P++){let x=0;const v=w*s+P,I=Math.max(0,w*r+c),b=Math.max(0,P*r+a),A=Math.min(i,I+r),F=Math.min(o,b+r);for(let $=I;$<A;$++)for(let D=b;D<F;D++){const _=$*o+D;if(!p||p[_]){x++;const U=k?[f[_],e[_]]:[f[_],(360+e[_])%360],[L,O]=k?U:rt(U);g[v]+=L,y[v]+=O}}if(x>=(A-I)*(F-b)*(1-l)){M[v]=1;const[$,D]=nt([g[v]/x,y[v]/x]);g[v]=$,y[v]=D}else M[v]=0,g[v]=0,y[v]=0}const u=new B({width:s,height:d,pixels:[g,y],mask:M});return u.updateStatistics(),u}const Ft=pt.getLogger("esri.views.2d.engine.flow.dataUtils"),ot=8;async function Et(t,n,r){const h=performance.now(),l=St(t,n),o=performance.now(),i=Dt(t,l,n.width,n.height),p=performance.now(),f=Ut(i,!0),e=performance.now(),a=Tt(f),c=performance.now();if(t.profile){const s={"_createFlowFieldFromData()":Math.round(o-h),"_getStreamlines()":Math.round(p-o),"createAnimatedLinesData()":Math.round(e-p),"createLinesMesh()":Math.round(c-e),"Total elapsed time":Math.round(c-h)};Ft.info("createStreamlinesMesh profile",s)}return await Promise.resolve(),mt(r),a}function St(t,n){const r=$t(n.data,n.width,n.height,t.smoothing);return t.interpolate?(h,l)=>{const o=Math.floor(h),i=Math.floor(l);if(o<0||o>=n.width)return[0,0];if(i<0||i>=n.height)return[0,0];const p=h-o,f=l-i,e=o,a=i,c=o<n.width-1?o+1:o,s=i<n.height-1?i+1:i,d=r[2*(a*n.width+e)],m=r[2*(a*n.width+c)],g=r[2*(s*n.width+e)],y=r[2*(s*n.width+c)],M=r[2*(a*n.width+e)+1],k=r[2*(a*n.width+c)+1];return[(d*(1-f)+g*f)*(1-p)+(m*(1-f)+y*f)*p,(M*(1-f)+r[2*(s*n.width+e)+1]*f)*(1-p)+(k*(1-f)+r[2*(s*n.width+c)+1]*f)*p]}:(h,l)=>{const o=Math.round(h),i=Math.round(l);return o<0||o>=n.width||i<0||i>=n.height?[0,0]:[r[2*(i*n.width+o)+0],r[2*(i*n.width+o)+1]]}}function _t(t,n,r,h,l,o,i,p,f){const e=[];let a,c,s=r,d=h,m=0;e.push({x:s,y:d,t:m});for(let g=0;g<t.verticesPerLine;g++){let[y,M]=n(s,d);y*=t.velocityScale,M*=t.velocityScale;const k=Math.sqrt(y*y+M*M);if(k<t.minSpeedThreshold)return e;const u=y/k,w=M/k;if(s+=u*t.segmentLength,d+=w*t.segmentLength,m+=t.segmentLength/k,Math.acos(u*a+w*c)>t.maxTurnAngle)return e;if(t.mergeLines){const P=Math.round(s*f),x=Math.round(d*f);if(P<0||P>i-1||x<0||x>p-1)return e;const v=o[x*i+P];if(v!==-1&&v!==l)return e;o[x*i+P]=l}e.push({x:s,y:d,t:m}),a=u,c=w}return e}function Dt(t,n,r,h){const l=[],o=new Y,i=1/Math.max(t.lineCollisionWidth,1),p=Math.round(r*i),f=Math.round(h*i),e=new Int32Array(p*f);for(let c=0;c<e.length;c++)e[c]=-1;const a=[];for(let c=0;c<h;c+=t.lineSpacing)for(let s=0;s<r;s+=t.lineSpacing)a.push({x:s,y:c,sort:o.getFloat()});a.sort((c,s)=>c.sort-s.sort);for(const{x:c,y:s}of a)if(o.getFloat()<t.density){const d=_t(t,n,c,s,l.length,e,p,f,i);if(d.length<2)continue;l.push(d)}return l}function $t(t,n,r,h){if(h===0)return t;const l=Math.round(3*h),o=new Array(2*l+1);let i=0;for(let e=-l;e<=l;e++){const a=Math.exp(-e*e/(h*h));o[e+l]=a,i+=a}for(let e=-l;e<=l;e++)o[e+l]/=i;const p=new Float32Array(t.length);for(let e=0;e<r;e++)for(let a=0;a<n;a++){let c=0,s=0;for(let d=-l;d<=l;d++){if(a+d<0||a+d>=n)continue;const m=o[d+l];c+=m*t[2*(e*n+(a+d))+0],s+=m*t[2*(e*n+(a+d))+1]}p[2*(e*n+a)+0]=c,p[2*(e*n+a)+1]=s}const f=new Float32Array(t.length);for(let e=0;e<n;e++)for(let a=0;a<r;a++){let c=0,s=0;for(let d=-l;d<=l;d++){if(a+d<0||a+d>=r)continue;const m=o[d+l];c+=m*p[2*((a+d)*n+e)+0],s+=m*p[2*((a+d)*n+e)+1]}f[2*(a*n+e)+0]=c,f[2*(a*n+e)+1]=s}return f}function Ut(t,n){const r=new Y,h=t.reduce((f,e)=>f+e.length,0),l=new Float32Array(3*h),o=new Array(t.length);let i=0,p=0;for(const f of t){const e=i;for(const a of f)l[3*i+0]=a.x,l[3*i+1]=a.y,l[3*i+2]=a.t,i++;o[p++]={startVertex:e,numberOfVertices:f.length,totalTime:f[f.length-1].t,timeSeed:n?r.getFloat():0}}return{lineVertices:l,lineDescriptors:o}}function Tt(t,n=10){const{lineVertices:r,lineDescriptors:h}=t;let l=0,o=0;for(const s of h)l+=2*s.numberOfVertices,o+=6*(s.numberOfVertices-1);const i=new Float32Array(l*ot),p=new Uint32Array(o);let f=0,e=0;function a(){p[e++]=f-2,p[e++]=f,p[e++]=f-1,p[e++]=f,p[e++]=f+1,p[e++]=f-1}function c(s,d,m,g,y,M,k){const u=f*ot;let w=0;i[u+w++]=s,i[u+w++]=d,i[u+w++]=1,i[u+w++]=m,i[u+w++]=M,i[u+w++]=k,i[u+w++]=g,i[u+w++]=y,f++,i[u+w++]=s,i[u+w++]=d,i[u+w++]=-1,i[u+w++]=m,i[u+w++]=M,i[u+w++]=k,i[u+w++]=-g,i[u+w++]=-y,f++}for(const s of h){const{totalTime:d,timeSeed:m}=s;let g=null,y=null,M=null,k=null,u=null;for(let w=0;w<s.numberOfVertices;w++){const P=r[3*(s.startVertex+w)+0],x=r[3*(s.startVertex+w)+1],v=r[3*(s.startVertex+w)+2];let I=null,b=null,A=null,F=null;if(w>0){I=P-g,b=x-y;const $=Math.sqrt(I*I+b*b);if(I/=$,b/=$,w>1){let D=I+k,_=b+u;const U=Math.sqrt(D*D+_*_);D/=U,_/=U;const L=Math.min(1/(D*I+_*b),n);D*=L,_*=L,A=-_,F=D}else A=-b,F=I;A!==null&&F!==null&&(c(g,y,M,A,F,d,m),a())}g=P,y=x,M=v,k=I,u=b}c(g,y,M,-u,k,d,m)}return{vertexData:i,indexData:p}}function at(t,n){const r=n.pixels,{width:h,height:l}=n,o=new Float32Array(h*l*2);if(t==="vector-uv")for(let i=0;i<h*l;i++)o[2*i+0]=r[0][i],o[2*i+1]=-r[1][i];else if(t==="vector-magdir")for(let i=0;i<h*l;i++){const p=r[0][i],f=Mt(r[1][i]),e=Math.cos(f-Math.PI/2),a=Math.sin(f-Math.PI/2);o[2*i+0]=e*p,o[2*i+1]=a*p}return{data:o,width:h,height:l}}async function Jt(t,n,r,h,l){const o=wt(n.spatialReference);if(!o)return it(t,n,r,h,l);const[i,p]=o.valid,f=p-i,e=Math.ceil(n.width/f),a=n.width/e,c=Math.round(r/e);let s=n.xmin;const d=[];for(let M=0;M<e;M++){const k=new gt({xmin:s,xmax:s+a,ymin:n.ymin,ymax:n.ymax,spatialReference:n.spatialReference});d.push(it(t,k,c,h,l)),s+=a}const m=await Promise.all(d),g={data:new Float32Array(r*h*2),width:r,height:h};let y=0;for(const M of m){for(let k=0;k<M.height;k++)for(let u=0;u<M.width;u++)y+u>=r||(g.data[2*(k*r+y+u)+0]=M.data[2*(k*M.width+u)+0],g.data[2*(k*r+y+u)+1]=M.data[2*(k*M.width+u)+1]);y+=M.width}return g}async function it(t,n,r,h,l){if(t.type==="imagery"){await t.load({signal:l});const p=t.rasterInfo.dataType,f=await t.fetchImage(n,r,h,{signal:l});return!f||C(f.pixelData)||C(f.pixelData.pixelBlock)?{data:new Float32Array(r*h*2),width:r,height:h}:at(p,f.pixelData.pixelBlock)}await t.load({signal:l});const o=t.rasterInfo.dataType,i=await t.fetchPixels(n,r,h,{signal:l});return!i||C(i.pixelBlock)?{data:new Float32Array(r*h*2),width:r,height:h}:at(o,i.pixelBlock)}export{Rt as S,Nt as U,It as _,nt as a,qt as b,Et as c,Bt as f,tt as h,W as i,Ot as m,Jt as p};