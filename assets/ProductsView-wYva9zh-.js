import{_ as T,o as n,c as r,b as t,t as i,F as x,g as M,h as V,v as Q,i as v,f as m,a as f,L as E,d as u,n as _,w as P,r as y,j as w}from"./index-CkW3i1ZR.js";import{M as j,P as R}from"./modal-C9JrQzSo.js";import"./component-functions-Cn8GKEeV.js";const S={props:["tempProduct","addToCart"],data(){return{userModal:null,editProduct:{},status:{addCartLoading:""}}},template:"",methods:{openModal(){this.userModal.show()},closeModal(){this.userModal.hide()}},watch:{tempProduct(){this.editProduct=this.tempProduct,this.qty=1}},mounted(){this.userModal=new j(this.$refs.userProductModal),this.editProduct=this.tempProduct}},N={id:"userProductModal",ref:"userProductModal",class:"modal fade",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},D={class:"modal-dialog modal-xl",role:"document"},B={class:"modal-content border-0"},O={class:"modal-header bg-dark text-white"},F={class:"modal-title",id:"exampleModalLabel"},I=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),z={class:"modal-body"},H={class:"row"},G={class:"col-sm-6"},J=["src","alt","title"],K={class:"col-sm-6"},W={class:"badge bg-primary rounded-pill"},X={class:"h5"},Y={class:"h6"},Z={class:"h5"},$={class:"input-group"},tt=["value"],st=["disabled"],et={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"};function ot(a,o,l,b,s,d){return n(),r("div",N,[t("div",D,[t("div",B,[t("div",O,[t("h5",F,[t("span",null,i(l.tempProduct.title),1)]),I]),t("div",z,[t("div",H,[t("div",G,[(n(!0),r(x,null,M(l.tempProduct.imagesUrl,(h,C)=>(n(),r("img",{key:C,src:h,alt:l.tempProduct.title,class:"card-img-top primary-image",title:l.tempProduct.title+":"+l.tempProduct.description},null,8,J))),128))]),t("div",K,[t("span",W,i(l.tempProduct.title),1),t("p",null,"商品描述："+i(l.tempProduct.description),1),t("p",null,"商品內容："+i(l.tempProduct.content),1),t("div",X,i(l.tempProduct.origin_price)+" 元",1),t("del",Y,"原價 "+i(l.tempProduct.origin_price)+" 元",1),t("div",Z,"現在只要 "+i(l.tempProduct.price)+" 元",1),t("div",null,[t("div",$,[V(t("select",{class:"form-control",min:"1","onUpdate:modelValue":o[0]||(o[0]=h=>s.editProduct.qty=h)},[(n(),r(x,null,M(20,h=>t("option",{value:h,key:h},i(h),9,tt)),64))],512),[[Q,s.editProduct.qty]]),t("button",{type:"button",class:"btn btn-primary",onClick:o[1]||(o[1]=h=>l.addToCart(l.tempProduct.id,l.tempProduct.qty)),disabled:l.tempProduct.id===s.status.addCartLoading},[l.tempProduct.id===s.status.addCartLoading?(n(),r("span",et)):v("",!0),m(" 加入購物車 ")],8,st)])])])])])])])],512)}const lt=T(S,[["render",ot]]);var at={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/2023Vue_week6",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:p,VITE_PATH:g}=at,it={props:["category"],data(){return{tempProduct:{},selectID:"",products:[],pages:{},carts:[],cartslength:0,status:{checkProduct:"",addCartLoading:"",cartQtyLoading:"",delCart:""},isActive:"all",isLoading:!1,form:{user:{name:"",email:"",tel:"",address:""},message:""}}},inject:["emitter"],methods:{openModal(a){this.$refs.uModal.openModal(),this.status.checkProduct=a.id,this.tempProduct={...a},setTimeout(()=>{this.status.checkProduct=""},200)},getProducts(a=1){this.isLoading=!0;let o=`${p}/api/${g}/products?page=${a}`;this.category!=="all"&&(o=`${p}/api/${g}/products?page=${a}&category=${this.category}`),f.get(o).then(l=>{this.products=l.data.products,this.pages=l.data.pagination}),setTimeout(()=>{this.isLoading=!1},1e3)},getCarts(){this.isLoading=!0;const a=`${p}/api/${g}/cart`;f.get(a).then(o=>{this.carts=o.data.data,this.cartslength=o.data.data.carts.length}).catch(()=>{this.carts=[],this.cartslength=0}),setTimeout(()=>{this.isLoading=!1},1e3)},addToCart(a,o=1){this.status.addCartLoading=a;let l=`${p}/api/${g}/cart`,b="post",s={product_id:a,qty:o};f[b](l,{data:s}).then(d=>{this.status.addCartLoading="",this.$refs.uModal.closeModal(),d.data.success&&(this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"加入購物車成功"}))}).catch(()=>{this.status.addCartLoading=""})},cartChangeQty(a,o=1){this.status.cartQtyLoading=a.id;let l=`${p}/api/${g}/cart/${a.id}`,b="put",s={product_id:a.id,qty:o};f[b](l,{data:s}).then(d=>{this.status.cartQtyLoading="",this.$refs.uModal.closeModal(),d.data.success&&(this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"加入購物車成功"}))}).catch(d=>{this.emitter.emit("push-message",{style:"danger",title:"加入失敗",content:d.data.message.join("、")}),this.status.cartQtyLoading=""})},delCart(a){this.status.delCart=a;let o=`${p}/api/${g}/cart/${a}`;f["delete"](o).then(b=>{this.status.delCart="",b.data.success&&(this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"刪除品項成功"}))})},delAllCart(){this.status.delCart="delAll";let a=`${p}/api/${g}/carts`;f["delete"](a).then(l=>{this.getCarts(),this.status.delCart="",l.data.success&&(this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"已清空購物車"}))})},sendOrder(){this.isLoading=!0;let a=`${p}/api/${g}/order`;const o=this.form;f.post(a,{data:o}).then(l=>{this.$refs.form.resetForm(),this.isLoading=!1,l.data.success?(this.getCarts(),this.emitter.emit("push-message",{style:"success",title:"已送出訂單"})):this.emitter.emit("push-message",{style:"danger",title:"送出訂單失敗",content:l.data.message.join("、")})})},isPhone(a){return/^(09)[0-9]{8}$/.test(a)?!0:"電話為必填，須為有效的電話號碼"},getPath(){this.isActive=this.category}},created(){},watch:{category(){this.getProducts(),this.getPath()}},mounted(){this.isLoading=!0,this.getPath(),this.getProducts(),this.getCarts(),setTimeout(()=>{this.isLoading=!1},1e3)},components:{Loading:E,Pagination:R,UserModal:lt}},dt={class:"container"},nt={class:"mt-4"},rt=t("h2",{class:"d-flex justify-content-center",style:{"margin-top":"50px"}},"商品列表",-1),ct={class:"category list-unstyled d-flex justify-content-center mt-4",style:{"margin-bottom":"50px"}},ut={class:"row list-unstyled"},ht={class:"img-fluid hovereffect px-3",style:{"background-size":"cover","background-position":"center",width:"100%",height:"250px"}},mt=["src","alt","title"],_t={class:"overlay",style:{"margin-top":"100px"}},pt=["disabled","onClick"],gt={class:"",style:{"text-align":"center"}},bt={class:"products-title m-0",role:"button"},ft={key:0,class:"products-title mt-1",role:"button"},yt={class:"small"},vt={class:"small",style:{color:"red"}},Ct={key:1,class:"products-title mt-1",role:"button"},xt={class:"small",style:{color:"red"}},Pt=["disabled","onClick"],kt=t("i",{class:"fas fa-spinner fa-pulse"},null,-1),Lt={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},Mt={class:"text-end"},Vt=["disabled"],wt={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},Tt={class:"table align-middle"},Ut=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"170px"}},"數量/單位"),t("th",null,"單價")])],-1),At=["onClick","disabled"],qt={key:0,class:"bi bi-x-lg"},Qt={key:1,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},Et={class:"input-group input-group-sm"},jt={class:"input-group mb-3"},Rt=["onClick","disabled"],St=["onUpdate:modelValue","disabled"],Nt=["onClick","disabled"],Dt={class:"input-group-text",id:"basic-addon2"},Bt={class:"text-end"},Ot=t("small",{class:"text-success"},"折扣價：",-1),Ft=t("td",{colspan:"3",class:"text-end"},"總計",-1),It={class:"text-end"},zt={key:0},Ht=t("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),Gt={class:"text-end text-success"},Jt={class:"my-5 row justify-content-center"},Kt={class:"mb-3"},Wt=t("label",{for:"email",class:"form-label"},"Email",-1),Xt={class:"mb-3"},Yt=t("label",{for:"name",class:"form-label"},"收件人姓名",-1),Zt={class:"mb-3"},$t=t("label",{for:"tel",class:"form-label"},"收件人電話",-1),ts={class:"mb-3"},ss=t("label",{for:"address",class:"form-label"},"收件人地址",-1),es={class:"mb-3"},os=t("label",{for:"message",class:"form-label"},"留言",-1),ls={class:"text-end"},as=["disabled"];function is(a,o,l,b,s,d){const h=y("Loading"),C=y("RouterLink"),U=y("Pagination"),k=y("v-field"),L=y("error-message"),A=y("v-form"),q=y("User-Modal");return n(),r(x,null,[u(h,{active:s.isLoading},null,8,["active"]),t("div",dt,[t("div",nt,[rt,t("ul",ct,[t("li",{class:_(["btn btn-outline-secondary p-0 ms-1",s.isActive==="all"?"active":""])},[u(C,{class:"router-link-active active px-3 px-md-4 py-1",to:"/products/all"},{default:P(()=>[m("全部")]),_:1})],2),t("li",{class:_(["btn btn-outline-secondary p-0 ms-1",s.isActive==="旅遊"?"active":""])},[u(C,{class:"router-link-active active px-3 px-md-4 py-1",to:"/products/旅遊"},{default:P(()=>[m("旅遊")]),_:1})],2),t("li",{class:_(["btn btn-outline-secondary p-0 ms-1",s.isActive==="蔬果"?"active":""])},[u(C,{class:"router-link-active active px-3 px-md-4 py-1",to:"/products/蔬果"},{default:P(()=>[m("蔬果")]),_:1})],2),t("li",{class:_(["btn btn-outline-secondary p-0 ms-1",s.isActive==="肉品"?"active":""])},[u(C,{class:"router-link-active active px-3 px-md-4 py-1",to:"/products/肉品"},{default:P(()=>[m("肉品")]),_:1})],2)]),t("ul",ut,[(n(!0),r(x,null,M(s.products,e=>(n(),r("li",{class:"col-10 col-md-4 mx-auto",key:e.id},[t("div",ht,[t("img",{class:"img-responsive",style:{width:"100%",height:"100%"},src:e.imageUrl,alt:e.title,title:e.title+":"+e.description},null,8,mt),t("div",_t,[t("h2",null,i(e.title),1),t("a",{href:"#",type:"button",class:"info",disabled:e.id===s.status.checkProduct,onClick:c=>d.openModal(e)}," 查看更多 ",8,pt)])]),t("div",gt,[t("p",bt,i(e.title),1),e.price?(n(),r("p",ft,[t("del",yt,"$ "+i(e.origin_price),1),m(" 現在只要  "),t("span",vt,"$ "+i(e.price),1)])):(n(),r("p",Ct,[t("span",xt,"$ "+i(e.origin_price),1)])),t("button",{type:"button",class:"btn btn-outline-secondary btn-sm mx-auto fs-6",disabled:e.id===s.status.addCartLoading,onClick:c=>d.addToCart(e.id,1)},[kt,e.id===s.status.addCartLoading?(n(),r("span",Lt)):v("",!0),m(" 加入購物車 ")],8,Pt)])]))),128))]),u(U,{pages:s.pages,"update-page":d.getProducts},null,8,["pages","update-page"]),s.cartslength>0?(n(),r(x,{key:0},[t("div",Mt,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:o[0]||(o[0]=(...e)=>d.delAllCart&&d.delAllCart(...e)),disabled:s.status.delCart==="delAll"},[s.status.delCart==="delAll"?(n(),r("span",wt)):v("",!0),m(" 清空購物車 ")],8,Vt)]),t("table",Tt,[Ut,t("tbody",null,[(n(!0),r(x,null,M(s.carts.carts,e=>(n(),r("tr",{key:e.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:c=>d.delCart(e.id),disabled:e.id===s.status.delCart},[e.id!==s.status.delCart?(n(),r("i",qt)):v("",!0),e.id===s.status.delCart?(n(),r("span",Qt)):v("",!0)],8,At)]),t("td",null,i(e.product.title),1),t("td",null,[t("div",Et,[t("div",jt,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:c=>(e.qty--,d.cartChangeQty(e,e.qty)),disabled:e.qty===1||e.id===s.status.cartQtyLoading}," - ",8,Rt),V(t("input",{min:"1",type:"number",class:"form-control",style:{"text-align":"center"},"onUpdate:modelValue":c=>e.qty=c,disabled:e.id===s.status.cartQtyLoading,readonly:""},null,8,St),[[w,e.qty]]),t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:c=>(e.qty++,d.cartChangeQty(e,e.qty)),disabled:e.id===s.status.cartQtyLoading}," + ",8,Nt),t("span",Dt,i(e.product.unit),1)])])]),t("td",Bt,[Ot,t("del",null,i(e.product.origin_price),1),m(" "+i(e.product.price),1)])]))),128))]),t("tfoot",null,[t("tr",null,[Ft,t("td",It,i(s.carts.total),1)]),s.carts.final_total?(n(),r("tr",zt,[Ht,t("td",Gt,i(s.carts.final_total),1)])):v("",!0)])]),t("div",Jt,[u(A,{ref:"form",class:"col-md-6",onSubmit:d.sendOrder},{default:P(({errors:e})=>[t("div",Kt,[Wt,u(k,{id:"email",name:"email",type:"email",class:_(["form-control",{"is-invalid":e.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:s.form.user.email,"onUpdate:modelValue":o[1]||(o[1]=c=>s.form.user.email=c)},null,8,["class","modelValue"]),u(L,{name:"email",class:"invalid-feedback"})]),t("div",Xt,[Yt,u(k,{id:"name",name:"姓名",type:"text",class:_(["form-control",{"is-invalid":e.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:s.form.user.name,"onUpdate:modelValue":o[2]||(o[2]=c=>s.form.user.name=c)},null,8,["class","modelValue"]),u(L,{name:"姓名",class:"invalid-feedback"})]),t("div",Zt,[$t,u(k,{id:"tel",name:"電話",type:"text",class:_(["form-control",{"is-invalid":e.電話}]),placeholder:"請輸入電話",rules:d.isPhone,modelValue:s.form.user.tel,"onUpdate:modelValue":o[3]||(o[3]=c=>s.form.user.tel=c)},null,8,["class","rules","modelValue"]),u(L,{name:"電話",class:"invalid-feedback"})]),t("div",ts,[ss,u(k,{id:"address",name:"地址",type:"text",class:_(["form-control",{"is-invalid":e.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:s.form.user.address,"onUpdate:modelValue":o[4]||(o[4]=c=>s.form.user.address=c)},null,8,["class","modelValue"]),u(L,{name:"地址",class:"invalid-feedback"})]),t("div",es,[os,V(t("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":o[5]||(o[5]=c=>s.form.message=c)},null,512),[[w,s.form.message]])]),t("div",ls,[t("button",{type:"submit",class:"btn btn-danger",disabled:s.form.user.id===s.status.cartQtyLoading}," 送出訂單 ",8,as)])]),_:1},8,["onSubmit"])])],64)):v("",!0)])]),u(q,{"temp-product":s.tempProduct,"add-to-cart":d.addToCart,ref:"uModal"},null,8,["temp-product","add-to-cart"])],64)}const cs=T(it,[["render",is]]);export{cs as default};
