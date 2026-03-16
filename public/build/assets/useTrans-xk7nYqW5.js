function c(){const t=window.translations||{};function e(r,a={}){let n=t[r]||r;return Object.entries(a).forEach(([s,o])=>{n=n.replace(`:${s}`,o)}),n.replace(/\\r\\n|\\n|\\r/g,`
`)}return{t:e}}export{c as u};
