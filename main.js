/* eslint-disable eqeqeq */
/* eslint-disable space-before-function-paren */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'
import axios from 'axios'
import moment from 'moment'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VuePreview)
Vue.use(mint)
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD  HH:mm:ss') {
  return moment(dateStr).format(pattern)
})
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$http = axios

Vue.config.productionTip = false
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    // eslint-disable-next-line space-before-function-paren
    addShop(state, goodsobj) {
      var shopflage = false
      state.car.some(item => {
        // eslint-disable-next-line eqeqeq
        if (item.id == goodsobj.id) {
          item.count += parseInt(goodsobj.count)
          shopflage = true
          return true
        }
      })
      if (!shopflage) {
        state.car.push(goodsobj)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    addNum(state, goodsobj) {
      state.car.some(item => {
        if (item.id == goodsobj.id) {
          item.count = parseInt(goodsobj.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeNum(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updatestatus(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.status = info.status
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getallcount(state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getbuynum(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getstatus(state) {
      var s = {}
      state.car.forEach(item => {
        s[item.id] = item.status
      })
      return s
    },
    getanmount(state) {
      var a = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.status) {
          a.count += item.count
          a.amount += item.count * item.price
        }
      })
      return a
    }
  }
})
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: {
//     App
//   },
//   template: '<App/>'
// })
new Vue({
  el: '#app',
  router,
  render: c => c(App),
  store
})
