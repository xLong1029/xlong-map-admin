import"./index.988b09cd.js";function w(r,e,n,t){const o=r.clone(),c=1<<o.level,l=o.col+e,d=o.row+n;return t&&l<0?(o.col=l+c,o.world-=1):l>=c?(o.col=l-c,o.world+=1):o.col=l,o.row=d,o}export{w as l};
