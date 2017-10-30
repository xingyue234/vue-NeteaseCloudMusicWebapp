<template>
  <div class="friends">
     <h1>friends</h1>
  </div>
</template>
<script>

export default {
  name:'friends',
  data(){
    return {
       
    }
  },
  created(){
      //提交header高亮
      this.$store.commit('changeActive',{name:'friendsActive',value:true});
  },
  components:{
  }
}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';

.friends{
 @include fixedTop(137/$a+rem);
  background:palegoldenrod;
  color:white;
}
</style>

