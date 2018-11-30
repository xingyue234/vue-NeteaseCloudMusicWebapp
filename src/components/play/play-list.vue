<template>
        <div>
          <transition name="fade-in">
            <div class="bg-cover" v-if="showPlayList" @click="updateshowPlayList(false)"></div>
          </transition>
          <transition name="slide-in">
            <div class="play-list" v-if="showPlayList" >
            <div class="p-l-c-header" >
              <div class="left">
                <span class="play-type" @click="changePlay">
                  <i :class="[{iconfont:true},playClass]"></i>
                  <span class="play-type-t">{{playText}}({{ getMyplayList.length }})</span>
                </span>
                <span class="love-to">
                  <i class="iconfont icon-shoucang1"></i>
                  <span class="love-to-t">收藏</span>
                </span>
              </div>
              <div class="right" @click="delAllSong">
                <i class="iconfont icon-del"></i>
                <span class="right-t">清空</span>
              </div>
            </div>
            <div class="p-l-c-con">
                <ul class="p-l-c-ul">
                <li :class="{'p-l-c-li':true,'is-play':item.song.id == songId}" v-for="(item,index) in getMyplayList" 
                :key="index"
                @touchstart="playStart"
                @touchend="playListEnd($event,item.song.id,item.song.name,getArtistsName(item.song.ar),(item.al && item.al.picUrl)"
                >
                  <div class="text">
                    <h4 class="p-l-c-li-h4">
                      <i class="iconfont icon-volume-" v-if="item.song.id == songId"></i>
                      {{item.song.name.trim()}}
                    </h4>
                      <span class="p-l-c-li-singer"> - {{getArtistsName(item.song.ar)}}</span>
                  </div>
                  <span class="link-to"  @touchend.stop="linktoRecord(item.song.id)" v-if="item.song.id == songId">
                          <i class="iconfont icon-link1"></i>
                  </span>
                  <div class="del"  @touchend.stop="delSong(item.song.id)">
                      <i class="iconfont icon-close"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </transition>
        </div>
</template>
<script>
import {userPlayList} from '@/service/getData';
import {setStore,getStore} from '@/service/storage';
import { Indicator } from 'mint-ui';
import { mapMutations,mapGetters,mapState } from 'vuex';
import {scrollMixin} from '@/common/js/mixin';
import axios from 'axios';

 export default{
   name:'playList',
   props:{
     value:{
       type:Boolean
     }
   },
   data(){
     return{
       currentValue:false,
       playClass:'icon-xunhuan',
       playText:'列表循环',
       i:0,
       playType:[
          {
            text:'列表循环',
            Class:'icon-xunhuan'
          },
          {
            text:'随机播放',
            Class:'icon-suijibofang'
          },
          {
            text:'单曲循环',
            Class:'icon-danquxunhuan'
          }
       ],

     }
   },
   mixins:[scrollMixin],
   computed:{
        ...mapState(['showPlayList','playListId','myplayList']),
        uid(){
           return this.$store.state.loginMsg.uid;
        },
        ...mapGetters(['playListIdType','getMyplayList']),

   },
   created(){
     let _this = this;
     if(this.uid){
       userPlayList({
          ids:this.playListId
        }).then(axios.spread(function(res1,res2){
             let arr = [];
              Array.from(arguments).forEach((item,index)=>{
                     arr.push({
                        song: item.data.songs[0]
                     })
              })
              _this.$store.commit('updatemyplayList',arr);
        }))
     }
   },
   methods:{
     ...mapMutations(['updateshowPlayList']),
     delSong(id){
        let _myPlayList = this.myplayList.filter((item,index)=>{
             return item.song.id !== id;
        })
        let _playListId = this.playListId.filter((itemId)=>{
             return itemId !== id
        })
        this.$store.commit('updateplayListId',_playListId);
        this.$store.commit('updatemyplayList',_myPlayList);

        let storeIds = JSON.parse(getStore('playListId'));
        let index = storeIds.indexOf(id);
        if(index !== -1){
          storeIds.splice(index,1);
          setStore('playListId',storeIds);
        }
     },
     delAllSong(){
       this.$store.commit('updateplayListId',[]);
       this.$store.commit('updatemyplayList',[]);
       setStore('playListId',[]);
     },
     changePlay(){
      this.i++;
      if(this.i > this.playType.length - 1){
          this.i = 0;
      }
      this.playClass = this.playType[this.i].Class;
      this.playText = this.playType[this.i].text;

      
      if(this.playText == '列表循环'){
       
        this.$store.commit('updateplayListId',this.playListIdType.xunhuan);

      }else if(this.playText == '随机播放'){

        this.$store.commit('updateplayListId',this.playListIdType.suiji);

      }else if(this.playText == '单曲循环'){

         this.$store.commit('updateloop',true);

      }

     },
     linktoRecord(id){
       this.$store.commit('updateisLinktoRecord',id);
       setTimeout(()=>{
         this.$store.commit('updateshowPlayList',false);
         this.$store.commit('updateshowPlay',false);
         this.$router.push('/record');
       },100)
     },


   }
 }
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';

.bg-cover{
  background:rgba(0,0,0,.5);
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:22222;
}
  .play-list{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index:255;
    color:#2e2e2e;
    font-size:1.1em;
    height: 58%;
    width: 100%;
    background:#f3f3f3;
    z-index:22222;
    .p-l-c-header{
      padding-left:26/$a+rem;
      height:132/$a+rem;
      border-bottom:1px solid #e0e0e0;
      display: flex;
      display: -webkit-flex;
       justify-content: space-between;
      .left{
        width:760/$a+rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
         i{
            color:#929292;
         }
        .play-type{
          width: 400/$a+rem;
          display: flex;
          display: -webkit-flex;
          justify-content:flex-start;
          align-items: center;
          i{
            margin-right:22/$a+rem;
            font-size:.88rem;
            color:#929292;
            font-weight:800;
          }

        }
        .love-to{
          display: flex;
          display: -webkit-flex;
          align-items: center;
          width:200/$a+rem;
          height:100%;
          i{
            margin-right:10/$a+rem;
            font-size:1rem;
            color:#929292;
          }

        }
      }
      .right{
        position: relative;
        width:200/$a+rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .icon-del{
              margin-right:14/$a+rem;
              margin-left:28/$a+rem;
              font-size:.8rem;
              color:#929292;
        }

      }
      .right:after{
        content:'';
        display: block;
        width:1px;
        height:55/$a+rem;
        position: absolute;
        left:0;
        top:50%;
        transform:translateY(-50%);
        -webkit-transform:translateY(-50%);
        background:#e0e0e0;
      }

    }
    .p-l-c-con{
      position:absolute;
      top:2.2rem;
      width:100%;
      bottom:0;
      overflow-x: hidden;
      overflow-y: auto;
      .p-l-c-ul{
        padding-left:26/$a+rem;
        .p-l-c-li{
          height: 122/$a+rem;
          line-height: 122/$a+rem;
          border-bottom:1px solid #e0e0e0;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .text{
            width:740/$a+rem;
            display: flex;
            display: -webkit-flex;
            color:#333333;
            .p-l-c-li-h4{
               margin:0;
               font-weight: 500;
               overflow: hidden;
              white-space: nowrap;
            text-overflow: ellipsis;
               .icon-volume-{
                 font-size:.8rem;
                 position: relative;
                 top:4/$a+rem;
               }
            }
            
            .p-l-c-li-singer{
              margin-left:8/$a+rem;
              color:#797979;
              font-size:.85em;
               overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            }

          }
          .link-to{
              width:100/$a+rem;
              height: 100%;
              @include center;
              i{
                  font-size:.8rem;
                  color:#aeaeae;
                  transform:rotate(90deg);
                  -webkit-transform:rotate(90deg);
              }
          }
          .del{
            width: 92/$a+rem;
            @include center;
            .icon-close{
              color:#aeaeae;
              font-size:.9rem;
            }

          }

        }
        .is-play{
          .text{
            .p-l-c-li-h4{
              color:$bgcolor;
            }
            span.p-l-c-li-singer{
                color:$bgcolor;
            }
          }
          
        }
      }

    }

  }
</style>