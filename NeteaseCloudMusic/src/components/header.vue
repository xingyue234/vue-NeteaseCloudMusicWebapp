<template>
  <header class="header-box">
     <a @click="goback" href="javascript:;" class="back"></a>
     <span class="title" v-if="title">
       {{title}}
     </span>
     <slot></slot>
  </header>
</template>
<script>
export default {
  name:'myHeader',
  props:{
    title:{
      type:String,
      default:''
    }
  },
  data(){
    return{
    }
  },
  methods:{
    goback(){
      this.$router.go(-1);
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
.header-box{
  background: $bgcolor;
  width: 100%;
  height: 137/$a+rem;  /*137*/
  display: flex;
  display: -webkit-flex;
  position: relative;
  z-index: 10;
}
.back{
  width: 15.625%;     /*149*/
  height: 100%;
  background: url('../assets/images/search-back.png') no-repeat 0 0;
  background-size: 149/$a+rem 137/$a+rem;   /*149*/  /*137*/
}
.title{
  color:white;
  font-size:1.15em;
  height: 137/$a+rem;
  line-height: 137/$a+rem;
}
</style>
