<template>
   <div class="search-menu" :dataClass="getsearchClass">
      <ul class="search-menu-ul" :style="{width:calWidth()}">
        <li v-for="(item,index) in searchTitle" 
        :class="{'menu-item':true,'active':item.active}" 
        :key="index"
        @click="goSearchClass(item)"
        >
          {{item.title}}
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name:'searchMenu',
  data(){
    return{
       searchTitle:[
         {
           title:'单曲',
           type:'search-music',
           active:false
         },
         {
           title:'歌手',
           type:'search-singer',
           active:false
         },
         {
           title:'专辑',
           type:'search-album',
           active:false
         },
         {
           title:'歌单',
           type:'search-songlist',
           active:false
         },
         {
           title:'MV',
           type:'search-mv',
           active:false
         },
         {
           title:'歌词',
           type:'search-lyric',
           active:false
         },
         {
           title:'电台',
           type:'search-radio',
           active:false
         },
         {
           title:'用户',
           type:'search-user',
           active:false
         }
       ],
    }
  },
  computed:{
    getsearchClass(){
      //根据显示的搜索分类高亮搜索菜单
      this.searchTitle.forEach((item)=>{
             item.active = false;
             if(item.type == this.$store.state.searchClass){
                item.active = true;
             }
        })
      return this.$store.state.searchClass;
    }
  },
  methods:{
     calWidth(){
       return (this.searchTitle.length * 203)/60 + 'rem';
     },
     goSearchClass(target){
        this.$store.commit('updatesearchClass',target.type);
     },

  }

}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
@import url('../../../common/icon/iconfont.css');

  .search-menu::-webkit-scrollbar{
    display: none;
  }
  .search-menu{
    .search-menu-ul{
       display: flex;
       display: -webkit-flex;
    }
    position: fixed;
    top:137/$a+rem;
    left:0;
    width: 100%;
    height:102/$a+rem;
    overflow-x: auto;
    overflow-y: hidden;
    .menu-item{
      width: 203/$a+rem;
      height:102/$a+rem;
      line-height: 102/$a+rem;
      text-align: center;
    }
    .active{
      border-bottom:4px solid $bgcolor;
      color:$bgcolor;
    }

  }

</style>

