<template>
  <div class="search-music">
    <search-menu></search-menu>
    <iscroll-view class="search-music-result sroll-view" ref="myscroll"
     :options="options"
     @pullUp="load(1,'songs','songCount')"
     >
        <ul v-if="songs.length" class="search-i-ul">
          <li class="s-m-list" v-for="(item,index) in songs" 
            :key="index"
            @touchstart="playStart"
            @touchend="playEnd($event,item.id,item.name,getArtistsName(item.artists))"
          >
            <div class="s-m-list-h" v-sign="currentSearchValue">
              <h6 class="s-m-list-h-h6 s-m-list-h-h6-mv">
                <span class="s-m-list-h-h6-text">{{item.name}}
                  <i class="iconfont icon-MV" v-if="item.mvid"></i>
                </span>
                
              </h6>
              <p class="s-m-list-h-p s-m-list-h-p-sure">
                <i class="iconfont icon-sure"></i>
                <i class="iconfont icon-sq"></i>
                <span class="artists">
                   {{getArtistsName(item.artists)}}  
                </span>
                <span class="album-text"> - {{item.album.name}} </span>
              </p>
              <span class="sourse" v-if="item.alias.length">
               {{item.alias[0].trim()}}
             </span>
            </div>
            <div class="s-m-list-singer" @click="goLayer(item.id,item.name)" @touchend.stop.prevent>
             <i class="iconfont icon-more3 more"></i>
            </div>
          </li>
          <li v-if="onLoad" class="on-refresh">
            <mt-spinner type="double-bounce"></mt-spinner> 
          </li>
          <li v-if="isNoData" class="on-refresh"> 没有更多数据了 </li>
        </ul>
    </iscroll-view>
  </div>
</template>
<script>
import { Indicator,Spinner } from 'mint-ui';
import {scrollMixin} from '@/common/js/mixin';
import {searchMixin} from './search-mixin';

import Vue from 'vue'
 export default{
   name:'searchMusic',
   data(){
     return{
     }
   },
   mixins:[scrollMixin,searchMixin],
   created(){
     this.getData(1,'songs','songCount');
     this.$store.commit('updatepage',1);
   },
   activated(){
       //console.log('activated');
       this.$store.commit('updatepage',1);
       this.$refs.myscroll.refresh();
   },
   methods:{
     goLayer(id,name){
      this.$store.commit('updateshowSongMore',true);
      this.$store.commit('updatenext',{
        id,
        name
      });
    },
  }

 }
</script>

<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
@import url('../../../common/icon/iconfont.css');

.search-music{
  width:100%;
  height:102/$a+rem;
  overflow-x: auto;
  overflow-y: hidden;
  .sroll-view{
    touch-action: none;
  }
  .search-music-result{
    background: #f2f4f5;
    @include fixedTopBottom(239/$a+rem,131/$a+rem);
    .on-refresh{
      height: 150/$a+rem;
      color:$bgcolor;
      text-align: center;
      line-height:150/$a+rem;
      font-size:1.2em;
    }
    .search-i-ul{
       width:100%;
    }
    .s-m-list{
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      border-bottom:2px solid #e7e9ea;
      .s-m-list-h{
        width:833/$a+rem;
        padding: 17/$a+rem 0 20/$a+rem 18/$a+rem;
       .s-m-list-h-h6{
          font-weight: normal;
          height: 68/$a+rem;
          line-height:68/$a+rem;
          position: relative;
          .s-m-list-h-h6-text{
              display: inline-block;
              font-size:1.54em;
              width:833/$a+rem;
              height:100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
          }
        }
        .s-m-list-h-h6-mv{
           i.icon-MV{
           color: $bgcolor;
           font-size:1.22em;
          }
        }
        .s-m-list-h-p{
          margin:0;
          line-height:46/$a+rem;
          height: 46/$a+rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
        font-size:.9em;
          .icon-sure{
             display: none;
          }
          .icon-sq{
            color:#ff4c07;
            font-size:1.4em;
            margin-right:7px;
            margin-top:-10/$a+rem;
          }
          .artists{
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
          }
          .album-text{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:#727374;
            margin-left:5px;
          }

        }
        .s-m-list-h-p-sure{
          .icon-sure{
             display: block;
             font-size:1.3em;
             color:#5ab5e7;
             margin-right:5px;
          }
        }

      }
      .s-m-list-singer{
        width:127/$a+rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        i.more{
          font-size:1.6em;
          color:#aaabac;
        }
      }
      .sourse{
        height:53/$a+rem;
        line-height: 53/$a+rem;
        color:#7e8080;
        font-size:.9em;

      }
    }
    
  }
  
  
}

</style>
