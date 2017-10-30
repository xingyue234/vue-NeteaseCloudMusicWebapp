<template>
  <div class="discovery">
     <div class="nav-box">
        <div class="nav" >
          <router-link to="/recommend"><span :class="{activem:actives.rec}">推荐</span></router-link>
          <router-link to="/songs"><span  :class="{activev:actives.songs}">歌单</span></router-link>
          <router-link to="/rank"><span  :class="{activer:actives.ranks}">排行</span></router-link>
        </div>
      </div>

       <div class="touch-slide" 
        @touchstart="toStart"
        @touchmove="toMove"
        @touchend="toEnd"
       >
        <transition :name="slide">
           <keep-alive><router-view></router-view></keep-alive>
        </transition>
       </div>
     
     
  </div>
</template>

<script>
import {Ztouch} from '@/common/js/mixin-touch';

export default {
  name: 'discovery',
  data () {
    return {
       actives:{
          rec:true,
          songs:false,
          ranks:false
       },
       routers:['/recommend','/songs','/rank'],
       i:0,
       slide:'slide-left',
    }
  },
  mixins:[Ztouch],
  computed:{
  },
  components:{
  },
  created(){
    //提交header高亮
    this.$store.commit('changeActive',{name:'discoverActive',value:true});
  },
  watch:{
    '$route'(to,from){
      console.log(from,'返回');
      for(var p in this.actives){
              this.actives[p] = false;
      }
      if(to.path == '/recommend'){
          this.actives.rec = true;
      }
      if(to.path == '/songs'){
          this.actives.songs = true;
      }
      if(to.path == '/rank'){
          this.actives.ranks = true;
      }

       let toIndex = 0;
       let fromIndex = 0;
       this.routers.forEach((item,index)=>{
            if(to.path == item){toIndex = index}
            if(from.path == item){fromIndex = index}
       })
       this.slide = toIndex > fromIndex ? 'slide-left' : 'slide-right';
    }
  },
  methods:{
     toEnd(e){
       if(this.endSpeed(e) > 1){
         this.i--;
         if(this.i < 0){
            this.i = 0;
         }
         this.$router.push(this.routers[this.i]);

       }else if(this.endSpeed(e) < -1){

         this.i++;
         if(this.i > this.routers.length - 1){
            this.i = this.routers.length - 1;
         }
         this.$router.push(this.routers[this.i]);

       }

     },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
.touch-slide{
    @include fixedTop(238/$a+rem);
    z-index:40;
    background:#f2f4f5;
}
.sroll-view{
   touch-action: none;
}
.long{
  width:100%;
  height:100rem;
  background: red;
}
/*transition过渡*/
/*slide-left*/
.slide-left-enter{
  transform: translate3d(100%,0,0);
}
.slide-left-enter-active {
  transition: all .6s ease;
}
.slide-left-enter-to{
  transform: translate3d(0,0,0);
}
.slide-left-leave{
  transform: translate3d(0,0,0);
}
.slide-left-leave-active {
  transition: all .6s ease;
}
.slide-left-leave-to{
  transform: translate3d(-100%,0,0);
}

/*slide-right*/
.slide-right-enter{
  transform: translate3d(-100%,0,0);
}
.slide-right-enter-active {
  transition: all .6s ease;
}
.slide-right-enter-to{
  transform: translate3d(0,0,0);
}
.slide-right-leave{
  transform: translate3d(0,0,0);
}
.slide-right-leave-active {
  transition: all .6s ease;
}
.slide-right-leave-to{
  transform: translate3d(100%,0,0);
}


/*discovery*/
.discovery{
  @include absoluteTop(137/$a+rem);
}
.nav-box{
  position: fixed;
  left: 0;
  right: 0;
  top: 137/$a+rem;
  height: 101/$a+rem;
  background:#feffff;
}
.nav{
  height: 101/$a+rem;
  line-height: 101/$a+rem;
  display: flex;
  display: -webkit-flex;
  padding: 0 72/$a+rem;
  a{
    width: 33.33333%;
    height: 100%;
    text-align: center;
    padding: 0 35/$a+rem;
    color: #525151;
    >span{
      display: inline-block;
      width: 180/$a+rem;
      height: 100%;
      text-align: center;
      position: relative;
      border-bottom:4px solid transparent;
    }
    >span.activem,
    >span.activev,
    >span.activer{
       border-bottom-color:$bgcolor;
       color: $bgcolor;
       font-size:1.05em;
    }
  }
}
</style>
