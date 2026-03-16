import{j as e,L as l}from"./app-C-Orx0vb.js";import{u as d}from"./useTrans-xk7nYqW5.js";function x(){const{t}=d(),o=[{key:"quick-customize",image:"/assets/home/HowItWorks2.webp",title:t("how_it_works_option2_title"),badge:t("how_it_works_option2_badge"),features:[{text:t("how_it_works_option2_feature1")},{text:t("how_it_works_option2_feature2")}],button:{text:t("how_it_works_option2_button"),href:route("stories")},wrapperGradient:"bg-gradient-to-r from-amber-400/90 to-yellow-200/90",cardShadow:"shadow-[0_35px_60px_rgba(251,191,36,0.45)] shadow-amber-400/60 hover:shadow-[0_45px_80px_rgba(251,191,36,0.4)] hover:shadow-amber-500/70",contentBox:"bg-yellow-50/95 shadow-[0_20px_40px_rgba(251,191,36,0.25)] shadow-amber-300/40",badgeBg:"bg-gradient-to-r from-amber-500 to-orange-400 text-orange-900",buttonBg:"bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/50",isFeatured:!1},{key:"create-story",image:"/assets/home/HowItWorks1.webp",title:t("how_it_works_option1_title"),badge:t("how_it_works_option1_badge"),features:[{text:t("how_it_works_option1_feature1")},{text:t("how_it_works_option1_feature2")}],button:{text:t("how_it_works_option1_button"),href:route("frontend.order.create")},wrapperGradient:"bg-gradient-to-r from-green-400/90 to-green-200/90",cardShadow:"shadow-[0_35px_60px_rgba(34,197,94,0.45)] shadow-green-400/60 hover:shadow-[0_45px_80px_rgba(34,197,94,0.4)] hover:shadow-green-500/70",contentBox:"bg-green-50/95 shadow-[0_20px_40px_rgba(34,197,94,0.25)] shadow-green-300/40",badgeBg:"bg-gradient-to-r from-green-500 to-emerald-500 text-white",buttonBg:"bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-green-500/50",isFeatured:!0},{key:"free-name-story",image:"/assets/home/HowItWorks3.webp",title:t("how_it_works_option3_title"),badge:t("how_it_works_option3_badge"),features:[{text:t("how_it_works_option3_feature1")},{text:t("how_it_works_option3_feature2")}],button:{text:t("how_it_works_option3_button"),href:route("frontend.order.create")},wrapperGradient:"bg-gradient-to-r from-orange-400/90 to-amber-200/90",cardShadow:"shadow-[0_35px_60px_rgba(251,146,60,0.45)] shadow-orange-400/60 hover:shadow-[0_45px_80px_rgba(251,146,60,0.4)] hover:shadow-orange-500/70",contentBox:"bg-orange-50/95 shadow-[0_20px_40px_rgba(251,146,60,0.25)] shadow-orange-300/40",badgeBg:"bg-gradient-to-r from-orange-500 to-red-400 text-white",buttonBg:"bg-gradient-to-r from-orange-500 to-red-400 hover:from-orange-400 hover:to-red-400 shadow-orange-500/50",isFeatured:!1}];return e.jsx("section",{className:"relative py-16 pb-32 bg-neutral-50",id:"how-it-works",children:e.jsxs("div",{className:"container mx-auto flex flex-col gap-14 md:gap-16",children:[e.jsx("div",{className:"text-center mx-auto flex flex-col gap-4 max-w-3xl",children:e.jsxs("div",{className:"flex items-center justify-center flex-col gap-1",children:[e.jsx("h2",{className:"text-4xl pb-2 xl:text-6xl leading-normal font-bold bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent",children:t("how_it_works_title")}),e.jsx("h3",{className:"text-2xl xl:text-3xl font-semibold text-orange-700 mt-4",children:t("how_it_works_subtitle")})]})}),e.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10 mx-5",children:o.map(r=>e.jsx("div",{className:`
                lg:col-span-1
                ${r.isFeatured?"scale-[102%]":""}
                transition-all duration-500
                hover:scale-105
              `,children:e.jsx("div",{className:`
                  relative rounded-[28px]
                  ${r.wrapperGradient}
                `,children:e.jsxs("div",{className:`
                    relative rounded-[26px] bg-white/98 border border-white/80
                    shadow-2xl shadow-black/20
                    ${r.cardShadow}
                    min-h-[450px] sm:min-h-[450px] lg:min-h-[730px]
                    flex flex-col
                  `,children:[e.jsxs("div",{className:"relative flex-shrink-0",children:[e.jsx("div",{className:"overflow-hidden rounded-t-[24px]",children:e.jsx("img",{src:r.image,alt:r.title,className:"w-full h-[380px] sm:h-[650px] lg:h-[500px] xl:h-[450px] object-cover transition-transform duration-500 hover:scale-105",loading:"lazy",decoding:"async"})}),r.badge&&e.jsx("span",{className:`
                          absolute -top-4 left-1/2 -translate-x-1/2 z-10
                          inline-flex items-center justify-center
                          px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-black/30
                          ${r.badgeBg}
                        `,children:r.badge})]}),e.jsx("div",{className:"relative -mt-6 flex-1 flex flex-col",children:e.jsxs("div",{className:`
                        rounded-[24px]
                        ${r.contentBox}
                        shadow-2xl shadow-black/15
                        border border-white/80
                        pt-8 pb-6 px-6
                        flex flex-col items-center text-center
                        hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]
                        flex-1
                        justify-between
                      `,children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-2xl font-semibold text-neutral-800 mb-4 drop-shadow-md",children:r.title}),e.jsx("ul",{className:"w-full text-left rtl:text-right space-y-2 mb-6 text-neutral-700",children:r.features.map((a,s)=>e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-orange-500 flex-shrink-0 drop-shadow-sm",children:e.jsx("i",{className:"fa-solid fa-check text-lg"})}),e.jsx("span",{className:"leading-relaxed",children:a.text})]},`${r.key}-${s}`))})]}),e.jsx(l,{href:r.button.href,className:`
                          px-8 py-3 text-lg font-bold rounded-lg min-w-60
                          text-white shadow-2xl shadow-black/25
                          transform hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]
                          transition-all duration-300
                          w-full sm:w-auto
                          ${r.buttonBg}
                        `,children:r.button.text})]})})]})})},r.key))})]})})}export{x as default};
