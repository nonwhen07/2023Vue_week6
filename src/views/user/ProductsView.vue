<template>
  <Loading :active="isLoading" />
  <div class="container">
    <div class="mt-4">
      <h2 class="d-flex justify-content-center" style="margin-top: 50px;">商品列表</h2>
      <!-- 產品分類 -->
      <ul class="category list-unstyled d-flex justify-content-center mt-4" style="margin-bottom: 50px;">
        <!-- <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === undefined ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/">全部</RouterLink>
        </li> -->
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === 'all' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/all">全部</RouterLink>
        </li>
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '旅遊' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/旅遊">旅遊</RouterLink>
        </li>
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '蔬果' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蔬果">蔬果</RouterLink>
        </li>
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '肉品' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/肉品">肉品</RouterLink>
        </li>
        <!-- <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/吐司">吐司</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/漢堡">漢堡</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蛋餅">蛋餅</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/飲品">飲品</RouterLink>
        </li> -->
      </ul> 
      <!-- 產品列表 -->
      <ul class="row list-unstyled">
        <li class="col-10 col-md-4 mx-auto" v-for="product in products" :key="product.id">
         
          <!-- USE_https://miketricking.github.io/bootstrap-image-hover/ HOVER EFFECT 9 -->
          <div class="img-fluid hovereffect px-3" style="background-size: cover; background-position: center; width: 100%; height: 250px;">
            <img class="img-responsive" style="width: 100%; height: 100%;" :src="product.imageUrl" :alt="product.title" :title="product.title + ':' + product.description">
              <div class="overlay" style="margin-top: 100px;">
                <h2>{{product.title}}</h2>
                <a href="#" type="button"
                  class="info"
                  :disabled="product.id === status.checkProduct"
                  @click="openModal(product)">
                  查看更多
                  <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                  <!-- <span
                    v-if="product.id === status.checkProduct"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span> -->
                </a>
              </div>
          </div>
          <div class="" style="text-align: center;">
            <p class="products-title m-0" role="button">{{product.title}}</p>
            <p v-if="product.price" class="products-title mt-1" role="button">
              <del class="small">$ {{ product.origin_price }} </del>&nbsp;現在只要&nbsp;
              <span class="small" style="color:red;">$ {{ product.price }} </span>
            </p>
            <p v-else class="products-title mt-1" role="button">
              <span class="small" style="color:red;">$ {{ product.origin_price }} </span>
            </p>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm mx-auto fs-6"
              :disabled="product.id === status.addCartLoading"
              @click="addToCart(product.id, 1)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              <span
                v-if="product.id === status.addCartLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              加入購物車
            </button>
          </div>
        </li>
      </ul>
      <!-- pagination -->
      <Pagination :pages="pages" :update-page="getProducts"></Pagination>
      <!-- 購物車列表 -->
      <template v-if="cartslength > 0">
        <div class="text-end">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="delAllCart"
            :disabled="status.delCart === 'delAll'"
          >
            <span
              v-if="status.delCart === 'delAll'"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 170px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cartitem in carts.carts" :key="cartitem.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="delCart(cartitem.id)"
                  :disabled="cartitem.id === status.delCart"
                >
                  <i v-if="cartitem.id !== status.delCart" class="bi bi-x-lg"></i>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="cartitem.id === status.delCart"
                  ></span>
                </button>
              </td>
              <td>
                {{ cartitem.product.title }}
                <!-- <div class="text-success">
                    已套用優惠券
                    </div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <!-- <span v-if="cartitem.id === status.cartQtyLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> -->
                    <!-- <input min="1" type="number" class="form-control" v-model="cartitem.qty"
                        @change="cartChangeQty(cartitem, cartitem.qty)" :disabled="cartitem.id === status.cartQtyLoading"> -->
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="cartitem.qty--, cartChangeQty(cartitem, cartitem.qty)"
                      :disabled="cartitem.qty === 1 || cartitem.id === status.cartQtyLoading"
                    >
                      -
                    </button>
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      style="text-align: center"
                      v-model="cartitem.qty"
                      :disabled="cartitem.id === status.cartQtyLoading"
                      readonly
                    />
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="cartitem.qty++, cartChangeQty(cartitem, cartitem.qty)"
                      :disabled="cartitem.id === status.cartQtyLoading"
                    >
                      +
                    </button>
                    <span class="input-group-text" id="basic-addon2">{{
                      cartitem.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small class="text-success">折扣價：</small>
                <del>{{ cartitem.product.origin_price }}</del>
                {{ cartitem.product.price }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ carts.total }}</td>
            </tr>
            <tr v-if="carts.final_total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ carts.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <!-- 購物車客戶資訊 -->
        <div class="my-5 row justify-content-center">
          <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                placeholder="請輸入 Email"
                :class="{ 'is-invalid': errors['email'] }"
                rules="email|required"
                v-model="form.user.email"
              ></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                placeholder="請輸入姓名"
                :class="{ 'is-invalid': errors['姓名'] }"
                rules="required"
                v-model="form.user.name"
              ></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field
                id="tel"
                name="電話"
                type="text"
                class="form-control"
                placeholder="請輸入電話"
                :class="{ 'is-invalid': errors['電話'] }"
                :rules="isPhone"
                v-model="form.user.tel"
              ></v-field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                placeholder="請輸入地址"
                :class="{ 'is-invalid': errors['地址'] }"
                rules="required"
                v-model="form.user.address"
              ></v-field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end">
              <button
                type="submit"
                class="btn btn-danger"
                :disabled="form.user.id === status.cartQtyLoading"
              >
                送出訂單
              </button>
            </div>
          </v-form>
        </div>
      </template>
    </div>
  </div>
  <!-- 產品Modal -->
  <User-Modal :temp-product="tempProduct" :add-to-cart="addToCart" ref="uModal"></User-Modal>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Pagination from '@/components/PaginationTool.vue'
import UserModal from '@/components/UserProductModal.vue'



// import Navbar from '@/components/FrontNavbar.vue'


const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['category'],
  data() {
    return {
      //category: {}, //動態路由-category 

      tempProduct: {}, //點選產品
      selectID: '', //點選產品ID
      products: [], //產品菜單
      pages: {}, //產品菜單-頁碼
      carts: [], //購物車菜單
      cartslength: 0,

      status: {
        checkProduct: '',
        addCartLoading: '',
        cartQtyLoading: '',
        delCart: ''
      },


      isActive: 'all',

      isLoading: false, //loading狀態
      form: {
        //購物車user
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '' //購物車user-message
      }
    }
  },
  inject: ['emitter'],
  methods: {
    openModal(item) {
      this.$refs.uModal.openModal()

      this.status.checkProduct = item.id
      this.tempProduct = { ...item }
      //this.status.checkProduct = '';
      setTimeout(() => {
        this.status.checkProduct = ''
      }, 200)
    },
    getProducts(page = 1) {
      this.isLoading = true

      let api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`;
      // if(this.category !== undefined) {
      //   api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
      // }
      if(this.category !== 'all') {
        api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
      }

      axios.get(api)
      .then((res) => {
        this.products = res.data.products
        this.pages = res.data.pagination
      })

      setTimeout(() => {
        this.isLoading = false //狀態驅動'元件'
      }, 1000)
    },
    getCarts() {
      this.isLoading = true

      const api = `${VITE_URL}/api/${VITE_PATH}/cart`
      axios.get(api)
        .then((res) => {
          this.carts = res.data.data
          //console.log('carts',  this.carts.carts)
          this.cartslength = res.data.data.carts.length
        })
        .catch(() => {
          this.carts = []
          this.cartslength = 0
        })

      setTimeout(() => {
        this.isLoading = false //狀態驅動'元件'
      }, 1000)
    },
    addToCart(itemId, qty = 1) {
      this.status.addCartLoading = itemId
      let api = `${VITE_URL}/api/${VITE_PATH}/cart`
      let httpMethod = 'post'
      let cart = {
        product_id: itemId,
        qty: qty
      }
      axios[httpMethod](api, { data: cart })
        .then((res) => {
          //this.getCarts()
          this.status.addCartLoading = ''
          this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '加入購物車成功',
            });
          } 
        })
        .catch(() => {
          //alert(err.data.message)
          this.status.addCartLoading = ''
        })
    },
    cartChangeQty(item, qty = 1) {
      this.status.cartQtyLoading = item.id
      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`
      let httpMethod = 'put'
      let order = {
        product_id: item.id,
        qty: qty
      }
      axios[httpMethod](api, { data: order })
        .then((res) => {
          //this.getCarts()
          this.status.cartQtyLoading = ''
          this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '加入購物車成功',
            });
          }

        })
        .catch((err) => {
          //alert(err.data.message)
          this.emitter.emit('push-message', {
              style: 'danger',
              title: '加入失敗',
              content: err.data.message.join('、'),
            });
          this.status.cartQtyLoading = ''
        })
    },
    delCart(itemID) {
      this.status.delCart = itemID
      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${itemID}` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          //this.getCarts()
          this.status.delCart = ''
          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '刪除品項成功',
            });
          }
        })
        // .catch((err) => {
        //   alert(err.data.message)
        //   this.status.delCart = ''
        // })
    },
    delAllCart() {
      this.status.delCart = 'delAll'
      let api = `${VITE_URL}/api/${VITE_PATH}/carts` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          this.getCarts()
          this.status.delCart = ''
          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '已清空購物車',
            });
          }
        })
        // .catch((err) => {
        //   alert(err.data.message)
        //   this.status.delCart = ''
        // })
    },
    sendOrder() {
      this.isLoading = true
      let api = `${VITE_URL}/api/${VITE_PATH}/order`
      const order = this.form
      axios
        .post(api, { data: order })
        .then((res) => {
          //alert(res.data.message);
          //this.getCarts()
          this.$refs.form.resetForm()
          this.isLoading = false

          if (res.data.success) {
            this.getCarts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '已送出訂單',
            });
          }
          else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '送出訂單失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        // .catch((err) => {
        //   alert(err.data.message)
        //   this.isLoading = false
        // })
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '電話為必填，須為有效的電話號碼'
    },




    getPath() { //路由判定使用
      this.isActive = this.category;
    },

  },
  created() {
  },
  watch: {
    category() {// watch 動態路由 props
      this.getProducts();
      //console.log(this.$route.params.category); //測試動態路由匯入

      this.getPath()
    }
  },
  mounted() { 
    

    //VueLoading作為'元件'使用方式
    this.isLoading = true
    this.getPath() //路由判定使用


    this.getProducts()
    this.getCarts()
    //VueLoading作為'元件'使用方式
    setTimeout(() => {
      this.isLoading = false //狀態驅動'元件'
    }, 1000)
    //VueLoading作為'插件'使用方式
    // const loader = this.$loading.show(); //方法驅動'插件'
    // setTimeout(() => {
    //     loader.hide()
    // }, 1000);
  },
  components: {
    Loading,
    Pagination,
    UserModal,
    //Navbar
  }
}
</script>
