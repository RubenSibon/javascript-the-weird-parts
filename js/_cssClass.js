function classExists(s,t){return s.className.indexOf(t)>0}function isSingleClass(s){return"string"==typeof s}function isClassList(s){return"object"==typeof s}function changeClass(s,t,e){const l=document.querySelectorAll(s);let a,n;const o=()=>{a.setAttribute("class",a.className.replace(n,""))},c=()=>{const s=a.className+" "+n;a.setAttribute("class",s)},i=()=>{"toggle"===e&&(classExists(a,n)?o():c()),"remove"===e&&classExists(a,n)&&o(),"add"!==e||classExists(a,n)||c()},r=()=>{if(isSingleClass(t))n=t,i();else{if(!isClassList(t))throw"Is not a valid CSS class or classLIst.";for(const s of t)n=t[s],i()}};1===l.length?(a=l[0],r()):l.length>1&&(()=>{for(const s of l)a=l[s][0],r()})()}export function addClass(s,t){changeClass(s,t,"add")};export function removeClass(s,t){changeClass(s,t,"remove")};export function toggleClass(s,t){changeClass(s,t,"toggle")};