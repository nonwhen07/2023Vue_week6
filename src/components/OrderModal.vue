<template>
  <div
    id="orderModal"
    ref="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="orderModalLabel" class="modal-title">
            <span>訂單編號 {{ editOrder.id }} </span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="editOrder.user">
                  <tr>
                    <th style="width: 100px;">姓名</th>
                    <td>{{ editOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ editOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ editOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ editOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px;">訂單編號</th>
                    <td>{{ editOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td> {{ new Date(editOrder.create_at * 1000).toLocaleDateString() }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <!-- <div class="form-check form-switch">
                        <input type="checkbox" name="" :id="`paidSwitch${tempOrder.id}`"
                          v-model="tempOrder.is_paid" @change="updatePaid(tempOrder)">
                        <label class="form-check-label" :for="`paidSwitch${tempOrder.id}`">
                          <span v-if="tempOrder.is_paid">已付款</span>
                          <span v-else>未付款</span>
                        </label>
                      </div> -->
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="" :id="`paidSwitch${editOrder.id}`"
                          v-model="editOrder.is_paid" >
                        <label class="form-check-label" :for="`paidSwitch${editOrder.id}`">
                          <span v-if="editOrder.is_paid">已付款</span>
                          <span v-else>未付款</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ editOrder.total }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="item in editOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td style="max-height: 100%; max-width: 100%; position: static;">
                      <img 
                        :src="item.product.imageUrl"
                        :alt="item.product.title"
                        :title="item.product.title + ':' + item.product.description"
                        class="img-fluid" style="height:100px;"
                      />
                    </td>
                    <td>
                      {{ item.qty }} {{ item.product.unit }}
                    </td>
                    <td class="text-end">
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updatePaid(tempOrder)">
            確認送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Modal } from 'bootstrap';
//import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempOrder', 'updatePaid'],
  data() {
    return {
      ordModal: null,
      editOrder: {}
    }
  },
  methods: {
    openModal() {
      this.ordModal.show()
    },
    closeModal() {
      this.ordModal.hide()
    }
  },
  watch: {
    tempOrder() {
      //由於eslint 不能直接在 v-model使用 props傳入的 tempOrder，
      this.editOrder = this.tempOrder //所以新定義一個參數 editOrder v-model
    }
  },
  mounted() {
    this.ordModal = new Modal(this.$refs.orderModal)
    this.editOrder = this.tempOrder
  }
}
</script>