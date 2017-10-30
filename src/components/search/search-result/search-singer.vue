<template>
  <div class="search-singer">
     <search-menu></search-menu>
         <iscroll-view class="search-singer-result sroll-view" ref="myscroll"
          :options="options"
          @pullUp="load(100,'artists','artistCount')">
           <ul  v-if="artists.length">
             <li class="s-singer-list" v-for="(item,index) in artists" :key="index">
                <div class="singer-pic">
                  <img :src="item.img1v1Url" alt="" v-pic>
                </div>
                <div class="singer-title">
                    <span class="singer-title-text" v-if="item.name" v-sign="currentSearchValue">
                      {{item.name}}
                      <span class="singer-title-text-alias" v-if="item.alias.length">
                        （{{item.alias[0]}}）
                      </span>
                    </span>
                    <span class="singer-title-msg" v-if="item.accountId">
                     <span class="singer-title-msg-text">
                        <span class="icon-user2-box">
                          <i class="iconfont icon-user2"></i>
                        </span>
                        <span class="yiruzhu">已入驻</span>
                     </span>
                    </span>
                </div>
            </li>
            <li v-if="onLoad" class="on-refresh"> <mt-spinner type="double-bounce"></mt-spinner>  </li>
            <li v-if="isNoData" class="on-refresh"> 没有更多数据了 </li>
          </ul>
         </iscroll-view>
  </div>
</template>
<script>
import {searchMixin} from './search-mixin';

export default {
  name:'searchSinger',
  data(){
    return{
    }
  },
  mixins:[searchMixin],
  created(){
     //console.log('created');
     this.getData(100,'artists','artistCount');
     this.$store.commit('updatepage',1);
  },
  activated(){
        //console.log('activated');
        this.$store.commit('updatepage',1);
        this.$refs.myscroll.refresh();
   },

}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
@import url('../../../common/icon/iconfont.css');

.search-singer{
  .sroll-view{
    touch-action: none;
  }
  .search-singer-result{
    background: #f2f4f5;
    @include fixedTopBottom(239/$a+rem,131/$a+rem);
    .on-refresh{
      height: 150/$a+rem;
      color:$bgcolor;
      text-align: center;
      line-height:150/$a+rem;
      font-size:1.2em;
    }
   .s-singer-list{
      height: 160/$a+rem;
      line-height: 160/$a+rem;
      display: flex;
      display: -webkit-flex;
     .singer-pic{
       width:19.375%;
       height:100%;
       display: flex;
       display: -webkit-flex;
       justify-content: center;
       align-items: center;
       img{
         width:144/$a+rem;
         height: 145/$a+rem;
       }

     }
     .singer-title{
       width:80.625%;
       border-bottom:1px solid #e3e5e6;
       display: flex;
       display: -webkit-flex;
       justify-content: space-between;
       align-items: center;
       .singer-title-text{
           font-size:1.1em;
           display: flex;
           display: -webkit-flex;
           align-items: center;
       }
       .singer-title-text-alias{
         color:#bcbdbe;
       }
       .singer-title-msg{
          width:265/$a+rem;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
          .singer-title-msg-text{
            display: flex;
            display: -webkit-flex;
            align-items: center;
          }
         .icon-user2-box{
           width:40/$a+rem;
           height:40/$a+rem;
           border-radius: 50px;
           background: $bgcolor;
           display: flex;
           display: -webkit-flex;
           justify-content: center;
           align-items: center;
           margin-right:18/$a+rem;
           i.icon-user2{
             color: white;
             font-size:.8em;
           }
         }
         .yiruzhu{
           color:#9c9d9e;
           display:inline-block;
           vertical-align: middle;
         }
       }
     }
   }
  }
}

</style>

