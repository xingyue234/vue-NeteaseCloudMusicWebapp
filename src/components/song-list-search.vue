<template>
 <div class="song-list-search">
   <my-header class="song-list-search-header">
      <form action="" class="search-form"  @submit.prevent>
        <input type="search" class="search-input" 
        placeholder="搜索歌单内歌曲" 
        @input="searchInput"
        v-model="searchVal"
        />
        <i class="iconfont icon-close close" v-if="showClose"></i>
     </form>
   </my-header>
   <div class="scroll-content">
    <div>
      <div class="songs-list">
        <div class="s-l-con">
            <ul class="s-l-ul">
              <li class="s-l-li" v-for="(item,index) in searchResult" 
              @touchstart="playStart"
              @touchend="playEnd($event,item.id,item.name,getArtistsName(item.ar),item.al.picUrl)"
              :key="index">
               <div class="num" v-if="item.id == songId"><i class="iconfont icon-volume-"></i></div>
               <div class="num" v-else>{{index+1}}</div>
                <div class="text-right">
                   <div class="s-l-li-text">
                    <div class="song-name">{{item.name}}
                      <span class="alias" v-if="item.alia.length">({{item.alia[0]}})</span>
                      <span class="mv" v-if="item.mv"><i class="iconfont icon-MV"></i></span>
                    </div>
                    <div class="singer">{{getArtistsName(item.ar)}} - {{item.al.name}}</div>
                  </div>
                  <div class="more" @click="goLayer(item.id,item.name)" @touchend.stop>
                    <i class="iconfont icon-more3"></i>
                  </div>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>
<script>
import myHeader from '@/components/header'
import {mapState,mapMutations} from 'vuex';
import { Indicator } from 'mint-ui';
import {scrollMixin} from '@/common/js/mixin';
export default {
  name:'searchLsit',
  props:{
    searchResult:{
      type:Array
    }
  },
  data(){
    return{
      searchVal:'',
      showClose:false,

    }
  },
  mixins:[scrollMixin],
  components:{
    myHeader
  },
  methods:{
    goLayer(id,name){
      console.log(8888888888);
      this.$store.commit('updateshowSongMore',true);
      this.$store.commit('updatenext',{
        id,
        name
      });
    },
    searchInput(){
      if(/^\s*$/.test(this.searchVal)){
            return;
      }
      console.log(this.searchVal);
      this.showClose = true;
      this.$emit('startSearch',this.searchVal);
    },

  }


  
}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
.song-list-search-header{
  position:fixed;
  left:0;
  top:0;
  z-index:55555555555;
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


  .scroll-content{
    position:fixed;
    top:137/$a+rem;
    width:100%;
    bottom:131/$a+rem;
    overflow-y: auto;
    z-index:200;
    background: #f2f4f5;
  }
 .songs-list{
    background:#f2f4f5;
    .s-l-con{
      
      .s-l-ul{
        .s-l-li{
          height:147/$a+rem;
          display: flex;
          display: -webkit-flex;
          .num{
            width: 133/$a+rem;
            height:100%;
            @include center;
            color:#8f9091;
            text-align: center;
            font-size: 1em;
            i{
              font-size: 1rem;
              color: #d33a31;
            }
          }
          .text-right{
            width:86.14%;
            border-bottom:1px solid #e7e9ea;
            position: relative;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            .s-l-li-text{
               max-width: 700/$a+rem;
               height:100%;
               padding: 14/$a+rem 0;
                .song-name{
                  color:#313231;
                  font-size:1.1em;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-weight:500;
                  .alias{
                    color:#777879;
                    font-size:.9em;
                  }
                  .mv{
                    position: relative;
                    top:6/$a+rem;
                    .icon-MV{
                      font-size:1rem;
                      color:$bgcolor;
                    }
                  }
                }
                .singer{
                  font-size:.9em;
                  color:#777879;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin-top:10/$a+rem;
                }

              }
              .more{
                width: 126/$a+rem;
                position: absolute;
                right:0;
                top:0;
                height: 100%;
                @include center;
                .icon-more3{
                  color:#aaabac;
                  font-size:1.1rem;
                }

              }
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

