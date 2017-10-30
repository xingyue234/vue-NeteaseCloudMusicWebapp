<template>
  <transition :name="ownPosition">
    <div class="popup" v-show="currentValue" :style="{'top': topval }">
      <span class="title" :style="{color:err?'#d33a31':'white'}">
        {{title}}
      </span>
    </div>
  </transition>
</template>
<script>
export default {
  name:'popup',
  props:{
    //通过v-model来控制popup的显示消失
    value:{
      type:Boolean
    },
    //标题
    title:{
      type:String,
      required:true,
    },
    //弹出位置，可选top,bottom
    position:{
      type:String,
      default:'top'
    },
    //是否错误
    err:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      currentValue:false,
      duration:2000,
      timer:null

    }
  },
  watch:{
    currentValue(val) {
        this.$emit('input', val);
    },
    value(val) {
      this.currentValue = val;
    }
  },
  updated(){
   if(this.timer){clearTimeout(this.timer)}
   this.timer = setTimeout(()=>{
      this.currentValue = false;
    },this.duration)
  },
  computed:{
    ownPosition(){
      let newP = '';
      switch(this.position){
        case 'top':
            newP = 'slide-top';
            break;
        case 'bottom':
             newP = 'slide-bottom';
             break;
      }
      return newP;
    },
    topval(){
      let newT = '';
      switch(this.position){
        case 'top':
            newT = '18%';
            break;
        case 'bottom':
             newT = '78%';
             break;
      }
      return newT;
    }
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';
.popup{
  padding: 15/$a+rem 30/$a+rem;
  text-align:center;
  background: rgba(0,0,0,.8);
  font-size: 1em;
  border-radius: 30/$a+rem;
  position:fixed;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  z-index:5555555;
  .title{
    white-space:nowrap;
  }
  transition:all .5s ease;
  -webkit-transition:all .5s ease;
}


.slide-top-enter,
.slide-top-leave-to{
    transform: translate3d(-50%,-400%,0);
   -webkit-transform: translate3d(-50%,-400%,0);
   opacity:0;
}



.slide-bottom-enter,
.slide-bottom-leave-to{
    transform: translate3d(-50%,400%,0);
    -webkit-transform: translate3d(-50%,400%,0);
    opacity:0;
}

</style>


