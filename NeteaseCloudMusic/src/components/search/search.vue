<template>
  <div class="search">
    <my-header>
      <form action="" class="search-form"  @submit.prevent>
        <input type="search" class="search-input" 
        placeholder="音乐、视频、歌词、电台" 
        @focus="searchFocus" 
        @blur="searchBlur" 
        @input="searchInput"
        v-model="searchVal"
        @search ="submitSearch"/>
        <i class="iconfont icon-close close" v-if="showClose"></i>
      </form>
    </my-header>
    <div class="search-recommend" v-if="showRecommend" @click="closeRecommend">
      <div class="content">
          <ul>
            <li v-for="(item,index) in searchRecommendResult" :key="index" @click.stop="recommendSearchData(item)">
              <i class="iconfont icon-search02"></i>
              {{item}}
            </li>
          </ul>
      </div>
   </div>
    <keep-alive>
      <component :is="currentContent" 
        v-on:goSearch="hotSearchResult" 
        v-on:searchHistory="historySearchResult"
     ></component>
    </keep-alive>
  </div>
</template>
<script>

import {searchRecommend,searchData} from '@/service/getData';
import {setStore,getStore} from '@/service/storage';
import searchMain from './search-main';
import searchMusic from './search-result/search-music';
import searchSinger from './search-result/search-singer';
import myHeader from '../header';
import {mapState} from 'vuex';
import { Indicator } from 'mint-ui';

export default {
  name:'search',
  data(){
    return{
       showClose:false,
       searchVal:'',
       showRecommend:false,
       searchRecommendResult:[],
       searchHistory: [],
       getSearchStorage: JSON.parse(getStore('searchHistory')),

    }
  },
  activated(){
    console.log('search activatd');
  },
  computed:{
    ...mapState(['page','perpage','currentSearchValue']),
    offset(){
       return  (this.page-1)*this.perpage;
    },
    currentContent(){
      return this.$store.state.searchClass;
    }
  },
  components:{
    myHeader,
    searchMain,
    searchMusic,
    searchSinger

  },
  methods:{
  closeRecommend(){
     this.showRecommend = false;
  },
  searchInput(){
     if(this.searchVal){
       this.showRecommend = true;
     }
  },
  searchFocus(){
     this.showClose = true;
     this.$store.commit('changeplayFooter',{value:'play-footer-hide'})
   },
   searchBlur(){
     this.showClose = false;
     this.showRecommend = false;
     this.$store.commit('changeplayFooter',{value:'play-footer-show'})
   },
   //搜索建议搜索
   recommendSearchData(value){
     
     this.$store.commit('updatesearchClass','search-music');
      
     this.updateStorage(value);

     this.$store.commit('updateSearchValue',value);
     this.$store.commit('updatesearchData',{
       songs:[],
       artists:[]
     })

     this.getData(1,'songs','songCount');

     this.getData(100,'artists','artistCount');
     
   },
   //热门搜索
   hotSearchResult(value){
     
    this.$store.commit('updatesearchClass','search-music');
        
    this.updateStorage(value);

    this.$store.commit('updateSearchValue',value);

    this.getData(1,'songs','songCount');

    this.getData(100,'artists','artistCount');

    this.$store.commit('updatesearchData',{
       songs:[],
       artists:[]
     })

  },
  //历史搜索
  historySearchResult(value){
    
    this.$store.commit('updatesearchClass','search-music');
  
    this.$store.commit('updateSearchValue',value);

    this.getData(1,'songs','songCount');

    this.getData(100,'artists','artistCount');

    this.$store.commit('updatesearchData',{
       songs:[],
       artists:[]
     })

  },
   //提交表单搜索
   submitSearch(){
     
      this.updateStorage(this.searchVal);
       
      this.$store.commit('updatesearchClass','search-music');
        
      this.$store.commit('updateSearchValue',this.searchVal);

      this.getData(1,'songs','songCount');

      this.getData(100,'artists','artistCount');

      this.$store.commit('updatesearchData',{
       songs:[],
       artists:[]
     })
   },
   //更新搜索本地存储
   updateStorage(value){
      if(value.match(/^(\s+)$/)){return};
       //将之前的存储和新的搜索连接
       this.searchHistory = this.getSearchStorage ?  this.searchHistory.concat(this.getSearchStorage) : this.searchHistory;
       this.searchHistory.push(value);
       //去重
       let s = new Set(this.searchHistory);
       let newArray = [...s];
      //  while(newArray.length > 6){
      //     newArray.splice(newArray.length-1,1);
      //  }
      if(newArray.length > 6){
        newArray.splice(0,6);
      }
       setStore('searchHistory',newArray);
        //更新Dom
       this.getSearchStorage = JSON.parse(getStore('searchHistory'));
   },
   getData(type,text,count){

            Indicator.open();

            this.$store.commit('updatepage',1);

            searchData({
              type,
              limit:this.perpage,
              offset:this.offset,
              keywords:this.currentSearchValue
            }).then((res)=>{
              if(res.data.code==200 && res.data.result[text].length){
                this.$store.commit('updatesearchData',{
                          [text]:{
                            data: res.data.result[text],
                            isCover: true
                          }                      
                 }) 

                 this.$store.commit('updatesearchCount',{
                          [text]:res.data.result[count]
                 });

                setTimeout(()=>{
                      Indicator.close();
                },300)
                this.$store.commit('updatepage',1);
               // console.log(this.page,this.offset,'newold');   //this.page什么时候加1了？？？？？
              }
            }).catch((err)=>{
              console.log(err);
            })
    },
},
  //监听搜索值变化，显示搜索建议
  watch:{
    searchVal(val, oldVal){
      if(val.match(/^[\s]+$/)){
        return;
      };
       searchRecommend(val).then((res)=>{
         this.searchRecommendResult = [];
        // console.log(res.data.result);
         if(!res.data.result){
           return;
          }
          let data = res.data.result;
          let _this = this;
          //获取各自的name
          function getName(item){
              if(data[item]){
                  data[item].forEach((item,index)=>{
                      if(_this .searchRecommendResult.length < 10){
                            _this.searchRecommendResult.push(item.name.replace(/\(em(.+?)\)/g,'')); 
                      }
                  })
              }    
          }
          getName('alnums');
          getName('songs');
            //console.log(res);
            //console.log(this.searchRecommendResult);
       }).catch((err)=>{
           console.log(err)
       })
    }
  }

}
</script>

<style lang="scss" scoped>
@import url('../../common/icon/iconfont.css');
@import 'src/common/css/mixin.scss';
.iconfont{
  font-size: .6666rem;
}

 .search{
    header{
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
      background: url('../../assets/images/search-back.png') no-repeat 0 0;
      background-size: 149/$a+rem 137/$a+rem;   /*149*/  /*137*/
    }
     .search-form{
      position: relative;
      width:84.375%;
      padding: 0 21/$a+rem  21/$a+rem 0;
      input{
      width: 100%;
      height: 116/$a+rem; /*116*/
      line-height: 137/$a+rem;
      background-color: transparent;
      border: none;
      border-bottom: 2px solid #fff;
      color: #ffffff;
      font-size:38/$a+rem;
      caret-color:white;     /*更改指针颜色*/
      position: relative;
      z-index: 55;
    } 
    .close{
     position: absolute;
     right: 5.4%;
     top: 50%;
     transform: translateY(-50%);
     font-size: 1.1rem;
     color: white;
     z-index: 1;
    }
      input[type=search]::-webkit-search-cancel-button{   /*去掉默认的小×*/
        -webkit-appearance: none;
        position: relative;
        content: '22';
        height: 100/$a+rem;   /*100*/
        width: 96/$a+rem;   /*96*/
        margin-left: 30/$a+rem;
    }
    }
    }


.search-recommend{
    position: fixed;
    top: 150/$a+rem;
    left:0;
    right:0;
    bottom:0;
    padding: 0 24/$a+rem 110/$a+rem 48/$a+rem;
    background: transparent;
    overflow: auto;
    z-index: 2000;
    .content{
        ul{
          box-shadow: -4px 15px 110px 10px rgba(0,0,0,.2);
          background: white;
          li{
            height: 144/$a+rem;
            line-height: 144/$a+rem;
            padding-left: 42/$a+rem;
            padding-right:20/$a+rem;
            border-bottom:1px solid #e9e9e9;
            color:#7a7a7a;
            font-size:1.1em;
            white-space: nowrap;
            text-overflow: ellipsis;
            i{
              color:#bbbdbf;
              font-size:1.1em;
            }
          }
        }
    }
  }

      /*placeholder文字样式*/

    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #fff;
        opacity: .5;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #fff;
        opacity: .5;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #fff;
        opacity: .5;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #fff;
        opacity: .5;
    }

</style>

