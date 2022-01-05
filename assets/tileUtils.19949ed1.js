import"./vendor.47ccae81.js";function i(r,e,n,t){const o=r.clone(),l=1<<o.level,c=o.col+e,w=o.row+n;return t&&c<0?(o.col=c+l,o.world-=1):c>=l?(o.col=c-l,o.world+=1):o.col=c,o.row=w,o}export{i as l};
