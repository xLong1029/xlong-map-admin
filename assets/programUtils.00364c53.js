function r(i){const{options:e,value:o}=i;return typeof e[o]=="number"}function d(i){let e="";for(const o in i){const n=i[o];if(typeof n=="boolean")n&&(e+=`#define ${o}
`);else if(typeof n=="number")e+=`#define ${o} ${n.toFixed()}
`;else if(typeof n=="object")if(r(n)){const{value:t,options:f,namespace:s}=n,$=s?`${s}_`:"";for(const c in f)e+=`#define ${$}${c} ${f[c].toFixed()}
`;e+=`#define ${o} ${$}${t}
`}else{const t=n.options;let f=0;for(const s in t)e+=`#define ${t[s]} ${(f++).toFixed()}
`;e+=`#define ${o} ${t[n.value]}
`}}return e}export{d as n};
