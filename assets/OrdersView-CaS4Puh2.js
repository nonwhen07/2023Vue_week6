import{_ as y,M as V,o,c as l,a as t,t as s,g as O,f as $,p as k,F as u,e as M,d as v,h as b,L as D,b as p,r as m}from"./index-BF57zz8q.js";import{M as P,P as E}from"./modal-ENeBDjbu.js";import"./component-functions-DoEuF0vs.js";const S={props:["tempOrder","updatePaid"],data(){return{ordModal:null,editOrder:{}}},methods:{openModal(){this.ordModal.show()},closeModal(){this.ordModal.hide()}},watch:{tempOrder(){this.editOrder=this.tempOrder}},mounted(){this.ordModal=new V(this.$refs.orderModal),this.editOrder=this.tempOrder}},T={id:"orderModal",ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"},U={class:"modal-dialog modal-xl"},I={class:"modal-content border-0"},R={class:"modal-header bg-dark text-white"},j={id:"orderModalLabel",class:"modal-title"},B=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),N={class:"modal-body"},A={class:"row"},q={class:"col-md-4"},F=t("h3",null,"用戶資料",-1),H={class:"table"},z={key:0},G=t("th",{style:{width:"100px"}},"姓名",-1),J=t("th",null,"Email",-1),K=t("th",null,"電話",-1),Q=t("th",null,"地址",-1),W={class:"col-md-8"},X=t("h3",null,"訂單細節",-1),Y={class:"table"},Z=t("th",{style:{width:"100px"}},"訂單編號",-1),tt=t("th",null,"下單時間",-1),et=t("th",null,"付款狀態",-1),st={class:"form-check form-switch"},dt=["id"],ot=["for"],lt={key:0},nt={key:1},it=t("th",null,"總金額",-1),at=t("h3",null,"選購商品",-1),rt={class:"table"},ct={style:{"max-height":"100%","max-width":"100%",position:"static"}},ht=["src","alt","title"],_t={class:"text-end"},ut={class:"modal-footer"},pt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function mt(r,d,i,_,e,c){return o(),l("div",T,[t("div",U,[t("div",I,[t("div",R,[t("h5",j,[t("span",null,"訂單編號 "+s(e.editOrder.id),1)]),B]),t("div",N,[t("div",A,[t("div",q,[F,t("table",H,[e.editOrder.user?(o(),l("tbody",z,[t("tr",null,[G,t("td",null,s(e.editOrder.user.name),1)]),t("tr",null,[J,t("td",null,s(e.editOrder.user.email),1)]),t("tr",null,[K,t("td",null,s(e.editOrder.user.tel),1)]),t("tr",null,[Q,t("td",null,s(e.editOrder.user.address),1)])])):O("",!0)])]),t("div",W,[X,t("table",Y,[t("tbody",null,[t("tr",null,[Z,t("td",null,s(e.editOrder.id),1)]),t("tr",null,[tt,t("td",null,s(new Date(e.editOrder.create_at*1e3).toLocaleDateString()),1)]),t("tr",null,[et,t("td",null,[t("div",st,[$(t("input",{class:"form-check-input",type:"checkbox",name:"",id:`paidSwitch${e.editOrder.id}`,"onUpdate:modelValue":d[0]||(d[0]=n=>e.editOrder.is_paid=n)},null,8,dt),[[k,e.editOrder.is_paid]]),t("label",{class:"form-check-label",for:`paidSwitch${e.editOrder.id}`},[e.editOrder.is_paid?(o(),l("span",lt,"已付款")):(o(),l("span",nt,"未付款"))],8,ot)])])]),t("tr",null,[it,t("td",null,s(e.editOrder.total),1)])])]),at,t("table",rt,[t("tbody",null,[(o(!0),l(u,null,M(e.editOrder.products,n=>(o(),l("tr",{key:n.id},[t("th",null,s(n.product.title),1),t("td",ct,[t("img",{src:n.product.imageUrl,alt:n.product.title,title:n.product.title+":"+n.product.description,class:"img-fluid",style:{height:"100px"}},null,8,ht)]),t("td",null,s(n.qty)+" "+s(n.product.unit),1),t("td",_t,s(n.final_total),1)]))),128))])])])])]),t("div",ut,[pt,t("button",{type:"button",class:"btn btn-primary",onClick:d[1]||(d[1]=n=>i.updatePaid(i.tempOrder))}," 確認送出 ")])])])],512)}const bt=y(S,[["render",mt]]),gt={props:["tempOrder","delOrder"],data(){return{delModal:null}},methods:{openModal(){this.delModal.show()},closeModal(){this.delModal.hide()}},mounted(){this.delModal=new P(this.$refs.delOrderModal)}},ft={id:"delOrderModal",ref:"delOrderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"delOrderModalLabel","aria-hidden":"true"},Ot={class:"modal-dialog"},Mt={class:"modal-content border-0"},yt={class:"modal-header bg-danger text-white"},vt={id:"delOrderModalLabel",class:"modal-title"},$t=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),kt={class:"modal-body"},xt={class:"text-danger"},wt={class:"modal-footer"},Lt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Ct(r,d,i,_,e,c){return o(),l("div",ft,[t("div",Ot,[t("div",Mt,[t("div",yt,[t("h5",vt,[t("span",null,"刪除訂單"+s(i.tempOrder.id),1)]),$t]),t("div",kt,[v(" 是否刪除訂單編號 "),t("strong",xt,s(i.tempOrder.id),1),v(" (刪除後將無法恢復)。 ")]),t("div",wt,[Lt,t("button",{type:"button",class:"btn btn-danger",onClick:d[0]||(d[0]=n=>i.delOrder(i.tempOrder.id))}," 確認刪除 ")])])])],512)}const Vt=y(gt,[["render",Ct]]);var Dt={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"jeff_hexschool",BASE_URL:"/2023Vue_week6",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:g,VITE_PATH:f}=Dt,Pt={data(){return{isLoading:!1,tempOrder:{},selectID:"",orders:[],pages:{}}},inject:["emitter"],methods:{getOrders(r=1){this.isLoading=!0;const d=`${g}/api/${f}/admin/orders?page=${r}`;b.get(d).then(i=>{this.orders=i.data.orders,this.pages=i.data.pagination}),setTimeout(()=>{this.isLoading=!1},1e3)},openModal(r="check",d){r=="dele"?this.$refs.dModal.openModal():this.$refs.oModal.openModal(),this.tempOrder={...d}},updatePaid(r){const d=`${g}/api/${f}/admin/order/${r.id}`,i="put",_={is_paid:r.is_paid};b[i](d,{data:_}).then(e=>{this.$refs.oModal.closeModal(),e.data.success?(this.getOrders(),this.emitter.emit("push-message",{style:"success",title:"更新已付款"})):this.emitter.emit("push-message",{style:"danger",title:"更新失敗",content:e.data.message.join("、")})})},delOrder(r){const d=`${g}/api/${f}/admin/order/${r}`;b["delete"](d).then(_=>{this.$refs.dModal.closeModal(),_.data.success?(this.getOrders(),this.emitter.emit("push-message",{style:"success",title:"已刪除訂單"})):this.emitter.emit("push-message",{style:"danger",title:"刪除失敗",content:_.data.message.join("、")})})}},created(){this.getOrders()},mounted(){},components:{Pagination:E,OrdModal:bt,DelModal:Vt,Loading:D}},Et={class:"container"},St={class:"table mt-4"},Tt=t("thead",null,[t("tr",null,[t("th",{width:"120"},"下單時間"),t("th",{width:"120"},"Email"),t("th",null,"訂單品項"),t("th",null,"應付金額"),t("th",{width:"100"},"付款狀態"),t("th",{width:"220"},"編輯")])],-1),Ut={key:0},It=["textContent"],Rt={class:"text-start"},jt={class:"text-right"},Bt={class:"form-check form-switch"},Nt=["id","onUpdate:modelValue","onChange"],At=["for"],qt={key:0},Ft={key:1},Ht={class:"btn-group"},zt=["onClick"],Gt=["onClick"];function Jt(r,d,i,_,e,c){const n=m("Loading"),x=m("Pagination"),w=m("Ord-Modal"),L=m("Del-Modal");return o(),l(u,null,[p(n,{active:e.isLoading},null,8,["active"]),t("div",Et,[t("table",St,[Tt,t("tbody",null,[(o(!0),l(u,null,M(e.orders,a=>(o(),l(u,{key:a.id},[e.orders.length?(o(),l("tr",Ut,[t("td",null,s(new Date(a.create_at*1e3).toLocaleDateString()),1),t("td",null,[a.user?(o(),l("span",{key:0,textContent:s(a.user.email)},null,8,It)):O("",!0)]),t("td",Rt,[t("ul",null,[(o(!0),l(u,null,M(a.products,(h,C)=>(o(),l("li",{key:C}," 品項 : "+s(h.product.title)+" / "+s(h.qty)+s(h.product.unit),1))),128))])]),t("td",jt,s(a.total),1),t("td",null,[t("div",Bt,[$(t("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${a.id}`,"onUpdate:modelValue":h=>a.is_paid=h,onChange:h=>c.updatePaid(a)},null,40,Nt),[[k,a.is_paid]]),t("label",{class:"form-check-label",for:`paidSwitch${a.id}`},[a.is_paid?(o(),l("span",qt,"已付款")):(o(),l("span",Ft,"未付款"))],8,At)])]),t("td",null,[t("div",Ht,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:h=>c.openModal("check",a)}," 查看細節 ",8,zt),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:h=>c.openModal("dele",a)}," 刪除訂單 ",8,Gt)])])])):O("",!0)],64))),128))])])]),p(x,{pages:e.pages,"update-page":c.getOrders},null,8,["pages","update-page"]),p(w,{"temp-order":e.tempOrder,"update-paid":c.updatePaid,ref:"oModal"},null,8,["temp-order","update-paid"]),p(L,{"temp-order":e.tempOrder,"del-order":c.delOrder,ref:"dModal"},null,8,["temp-order","del-order"])],64)}const Xt=y(Pt,[["render",Jt]]);export{Xt as default};
