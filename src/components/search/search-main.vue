<template>
      <div class="search-main">
        <div class="singer">
          <i class="iconfont icon-account"></i>
          <span>歌手分类</span>
          <i class="iconfont icon-more"></i>
        </div>
        <div class="search-hot">
          <h6>热门搜索</h6>
          <div id="search-hot-list">
            <a href="javascript:;" class="search-item" v-for="(item,index) in searchHot" :key="index" v-on:click="emitParent(item)">
              {{item}}
            </a>
          </div>
        </div>
        <div class="search-history">
            <ul  v-if="getSearchStorage">
              <li v-for="(item,index) in getSearchStorage" :key="index" v-on:touchstart="goSearchHistory(item)">
                <span class="icon-left">
                  <i class="iconfont icon-zuijin"></i>
                </span>
                <div class="search-history-con">
                  <span class="search-history-title">{{item}}</span>
                  <i class="iconfont icon-close" @touchstart.stop="delStorage(index)"></i>
                </div>
              </li>
            </ul>
            <a href="javascript:;" class="clear-all-storage" @touchstart="clearAllStorage"   v-if="getSearchStorage">清空</a>
        </div>
    </div>
</template>
<script>
import {setStore,getStore,removeStore} from '../../service/storage';

export default{
  name:'searchMain',
  data(){
    return{
       searchHot:['那年花开月正圆','陈奕迅','Marron5','VaVa','Hop','Nightcore','Justin Bieber','Coldplay','Heartbeat','Seve'],
       searchHistory: [],
       getSearchStorage:JSON.parse(getStore('searchHistory'))
    }
  },
  methods:{
    //删除当前storage
   delStorage(index){
     this.getSearchStorage.splice(index,1);
     setStore('searchHistory',this.getSearchStorage);
   },
   //清空所有searchStorage
   clearAllStorage(){
     removeStore('searchHistory');
    //更新Dom
    this.getSearchStorage = JSON.parse(getStore('searchHistory'));
   },
   emitParent(item){
     this.$emit("goSearch",item);
   },
   goSearchHistory(item){
     //更新storage
     
    this.$emit('searchHistory',item);
   }
  }
}

</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
.search-main{
     position: fixed;
     top:137/$a+rem;
     left:0;
     right: 0;
     bottom:131/$a+rem;
     z-index: 90;
     background: #ffffff;
     overflow: auto;
}
.iconfont{
  font-size: .6666rem;
}
/*歌手分类*/
.singer{
  height: 120/$a+rem;
  text-align: center;
  line-height: 120/$a+rem;
  color: #616262;
  border-bottom: 1px solid #e5e6e7;
  span{
    display: inline-block;
    vertical-align: middle;
    margin: 0 .1rem 0 .11rem;
  }
  i{
    display: inline-block;
    vertical-align: middle;
  }
}


/*热门搜索*/
.search-hot{
  width: 100%;
  height: 457/$a+rem;
  padding: 28/$a+rem 30/$a+rem 21/$a+rem 28/$a+rem;
  h6{
    font-weight: normal;
    font-size: 1em;
    color: #797a7b;
    height: 96/$a+rem;
    line-height: 96/$a+rem;
  }
  #search-hot-list{
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      a.search-item{
        margin: 0 22/$a+rem 22/$a+rem 0;
        display: inline-block;
        height: 82/$a+rem;
        line-height: 82/$a+rem;
        border: 1px solid #cfd1d1;
        padding: 0 32/$a+rem;
        font-size: 1.02em;
        color: #2e2f2f;
        border-radius: 50px;
     }

  }
  
}

/*搜索历史*/
.search-history{
  width: 100%;
  height:auto;
  position: relative;
  li{
    width: 100%;
    height: 120/$a+rem;
    line-height: 120/$a+rem;
    display: flex;
    display: -webkit-flex;
    .search-history-con{
      width: 90%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e6e7;
      .search-history-title{
        color: #2e2f2f;
      }
      .icon-close{
        width: 120/$a+rem;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        color: #a3a4a5;
      }
    }
    .icon-left{
      width: 10%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      color: #bebfc0;
    }
  }
  .clear-all-storage{
    position: absolute;
    padding: 15/$a+rem 34/$a+rem;
    color: #adaeaf;
    right: 0;
    bottom: -85/$a+rem;
  }
}
</style>
