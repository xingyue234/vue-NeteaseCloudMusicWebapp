<template>
  <div class="mymusic">
      <h1>mymusic</h1>
  </div>
</template>

<script>
export default {
  name:'mymusic',
  data(){
    return{

    }
  },
  created(){
      //提交header高亮
      this.$store.commit('changeActive',{name:'musicActive',value:true});
  },
  components:{
  }
}
</script>

<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';

.mymusic{
    @include fixedTop(137/$a+rem);
    background:pink;
    color:white;
}
</style>



