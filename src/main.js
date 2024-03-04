// Vue外部
//import './assets/main.css'
import 'bootstrap/scss/bootstrap.scss'
// 改用自定義的bootstrap
//import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vue內部
import App from './App.vue'
import router from './router'

// codeing
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('LoadingOverlay',Loading)
app.mount('#app')
