<template>
  <transition :name="animate">
    <div class="index">
      <index-header v-if="showIndexHeader"></index-header>
       <transition name="fade-in">
         <router-view></router-view>
       </transition>
   </div>
  </transition>
</template>
<script>
import indexHeader from '@/components/view/index-header';
export default {
  name:'index',
  data(){
    return {
       showIndexHeaderRoutes:['/','/recommend','/index','/rank','/songs','/mymusic','/friends'],
       animate:'fade-in'
    }
  },
  created(){
    //显示底部播放条
    this.$store.commit('updateshowPlayfooter',true);
  },
  computed:{
     showIndexHeader(){
       //如果是这些路由，就显示index-header
      return this.showIndexHeaderRoutes.filter((item)=>{
              return this.$route.fullPath == item; 
       }).length;
     }
  },
  components:{
    indexHeader,
  }
}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';


</style>

