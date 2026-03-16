import{j as t,L as n}from"./app-sVO7WKlK.js";function s({links:r}){return t.jsx("nav",{className:"mt-6 mb-4 flex justify-center items-center gap-1",children:r?.map((e,a)=>t.jsx(n,{preserveScroll:!0,href:e.url||"#",dangerouslySetInnerHTML:{__html:e.label},className:`inline-flex justify-center items-center h-8 min-w-8 px-3 rounded-lg text-sm transition-colors
                        ${e.active?"bg-orange-500 text-white font-medium":""}
                        ${e.url?"text-neutral-700 dark:text-neutral-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-300":"text-neutral-400 dark:text-neutral-600 cursor-not-allowed"}
                    `},a))})}export{s as P};
