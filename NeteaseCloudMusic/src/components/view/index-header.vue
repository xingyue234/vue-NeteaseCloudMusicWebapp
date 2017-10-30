<template>
    <div class="header-box">
        <div class="header">
          <a href="javascript:;" class="menu" @click="TabLeftMenu"></a>              
          <div class="center">
            <router-link  :class="{music:true,music_active:active.musicActive}" to="/mymusic" ></router-link>              
            <router-link  :class="{discover:true,discover_active:active.discoverActive}"  to="/recommend" ></router-link>              
            <router-link  :class="{friends:true,friends_active:active.friendsActive}"  to="/friends" ></router-link>              
          </div>
          <router-link  class="search"  to="/search" @touchstart.native="goSearchMain"></router-link> 
        </div>
   </div>
</template>

<script>


export default {
  name: 'indexHeader', 
  data () {
    return {
      
    }
  },
  computed:{
    active(){
      return this.$store.state.headerActive;
    }
  },
  components:{
  },
  methods:{
    TabLeftMenu(){
      this.$store.commit('changeLeftMenu',true);
    },
    goSearchMain(){
      this.$store.commit('updatesearchClass','search-main');
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
  .header-box,.header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height:  2.283333rem;   /*137*/
    background: $bgcolor;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    z-index: 5555;
  }
  .header .center{
    display: flex;
    display: -webkit-flex;
    width: 42.8125%;
  }
  .header a{
    width:  2.283333rem;    /*137*/
    height:  2.283333rem;   /*137*/
    background-repeat: no-repeat;
    background-size: 2.283333rem 2.283333rem;   /*137*/
    background-position: 0 0 ;
  }
  .header .center a{
    width: 33.333%;
  }
  .menu{
      background: url('../../assets/images/titlebar_menu.png');
  }
  .music{
     background: url('../../assets/images/titlebar_music_prs.png');
  }
  .discover{
     background: url('../../assets/images/titlebar_discover.png');
  }
 .friends{
     background: url('../../assets/images/titlebar_friends.png');
  }
  .search{
     background: url('../../assets/images/search.png');
  }
  
  .music_active{
       background: url('../../assets/images/titlebar_music_selected.png');
  }
  .discover_active{
       background: url('../../assets/images/titlebar_discover_selected.png');
  }
  .friends_active{
        background: url('../../assets/images/titlebar_friends_selected.png');
  } 


</style>
