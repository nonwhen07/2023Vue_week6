import{_ as f,a as h,c as k,b as i,d as o,w as s,e,f as l,F as g,r as a,o as c}from"./index-CKgh4Iv4.js";import{e as u,T}from"./ToastMessages-BRn-wkRv.js";import"./component-functions-JXA-nrxV.js";var V={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/2023Vue_week6",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:v}=V,x={data(){return{isSignIn:!1}},methods:{check(){const n=document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.isSignIn=!!n.length},logout(){const n=`${v}/logout`;h.post(n).then(()=>{u.emit("push-message",{style:"success",title:"登出成功"});const r="";document.cookie=`shopToken=${r}; expires=${new Date}`}),this.isSignIn=!1}},provide(){return{emitter:u}},components:{ToastMessages:T},created(){},mounted(){this.check()}},R=i("h2",null,"這是前台",-1),$={class:"container-fluid mt-3 position-relative"};function w(n,r,E,I,_,d){const t=a("RouterLink"),p=a("ToastMessages"),m=a("RouterView");return c(),k(g,null,[R,i("nav",null,[o(t,{to:"/"},{default:s(()=>[e("Home")]),_:1}),e(" | "),o(t,{to:"/about"},{default:s(()=>[e("關於我們")]),_:1}),e(" | "),o(t,{to:"/products"},{default:s(()=>[e("商品列表")]),_:1}),e(" | "),o(t,{to:"/admin/products"},{default:s(()=>[e("後台 產品列表")]),_:1}),e(" | "),o(t,{to:"/admin/orders"},{default:s(()=>[e("後台 訂單列表")]),_:1}),e(" | "),o(t,{to:"/admin/coupon"},{default:s(()=>[e("後台 優惠卷列表")]),_:1}),e("| "),_.isSignIn?(c(),l(t,{key:1,to:"",onClick:d.logout},{default:s(()=>[e("登出")]),_:1},8,["onClick"])):(c(),l(t,{key:0,to:"/login"},{default:s(()=>[e("登入頁面")]),_:1}))]),i("div",$,[o(p),o(m)])],64)}const y=f(x,[["render",w]]);export{y as default};
