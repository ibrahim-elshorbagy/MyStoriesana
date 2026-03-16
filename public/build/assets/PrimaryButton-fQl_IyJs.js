import{j as n}from"./app-sVO7WKlK.js";function j({className:t="",disabled:s,children:l,icon:e=null,rounded:r="rounded-xl",withShadow:i=!0,size:o="default",as:a="button",type:c="button",...u}){const g=o==="large"?"md:text-base":"",x=i?"shadow":"",b=e?n.jsx("i",{className:`fa-solid ${e}`}):null,m=o==="large"?"gap-2":"gap-1",p=/\bbg-/.test(t)?"":"bg-orange-500 hover:bg-orange-600",d=`
      flex items-center ${m} px-4 py-2 text-sm font-semibold text-white
      ${p} ${r} transition-all ${x} ${g}
      ${s?"opacity-70":""} ${t}
  `.trim(),f=a==="button"?{type:c}:{};return n.jsxs(a,{...f,...u,className:d,disabled:s,children:[b,l]})}export{j as P};
