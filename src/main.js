// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuecookie from 'vue-cookie'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import FastClick from 'fastclick'
import IScroll from 'iscroll/build/iscroll-probe.js' 
import IScrollView from 'vue-iscroll-view'

/**
 * mint-ui
 */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import '@/common/css/mixin.scss';       //scss公共样式
import '@/common/icon/iconfont.css';    //字体样式
import '@/common/css/animation.scss'     //vue animation 样式
import '@/common/css/mint-cover.scss'     //覆盖mint-ui的样式
import '@/utils/rem'



/*解决移动端点击延迟*/
if ('addEventListener' in document) {  
    document.addEventListener('DOMContentLoaded', function() {  
        FastClick.attach(document.body);  
    }, false);  
} 

Vue.use(IScrollView, IScroll)
Vue.use(Vuecookie)
require('swiper/dist/css/swiper.css')    /*加载vue-awesome-swiper的样式*/

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



/*iscroll指令*/

Vue.directive('iscroll', {
    bind(el, binding, vnode, oldVnode) {
        console.log(binding.value);
        // 设置iscorll属性的参数
        let iscrollOptions  = binding.value;

        // 阻止touchmove默认事件
        el.addEventListener('touchmove', event => {
            event.preventDefault();
        })

        // 使用vnode绑定iscroll是为了让iscroll对象能够夸状态传递，避免iscroll重复建立
        vnode.scroll = new IScroll(el, iscrollOptions);
    },
    update(el, binding, vnode, oldVnode) {

        // 将scroll绑定到新的vnode上
        vnode.scroll = oldVnode.scroll;

        // 使用settimeout让refresh跳到事件流结尾，保证refresh时数据已经更新完毕
        setTimeout(() => {
            vnode.scroll.refresh();
        }, 0)
    },
    unbind(el, binding, vnode, oldVnode) {

        /**
         * 解除绑定时要把iscroll销毁
         */
        vnode.scroll = oldVnode.scroll;
        vnode.scroll.destroy();
        vnode.scroll = null;
    }
})
