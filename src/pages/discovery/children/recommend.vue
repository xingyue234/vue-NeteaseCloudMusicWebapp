<template>
    <div class="main">
       <div class="main-s">
         <my-swiper></my-swiper>
         <div class="find-nav">
           <ul class="nav-ul">
             <li  class="nav-li">
               <router-link to="/index">
                 <span class="icon-box">
                   <span class="icon-box-s"><i class="iconfont icon-FMxia"></i></span>
                   <span class="description">私人FM</span>
                 </span>
               </router-link>
             </li>
             <li   class="nav-li">
               <router-link to="/index">
                 <span class="icon-box">
                   <span class="icon-box-s"><i class="iconfont icon-date"></i></span>
                   <span class="description">每日推荐</span>
                 </span>
               </router-link>
             </li>
             <li class="nav-li" @click="goSongsList">
               <router-link to="/index">
                 <span class="icon-box">
                   <span class="icon-box-s"><i class="iconfont icon-Music"></i></span>
                   <span class="description">歌单</span>
                 </span>
               </router-link>
             </li>
             <li   class="nav-li">
               <router-link to="/rank2">
                 <span class="icon-box">
                   <span class="icon-box-s"><i class="iconfont icon-rank"></i></span>
                   <span class="description">排行榜</span>
                 </span>
               </router-link>
             </li>
           </ul>
         </div>
         <div id="recommend">
             <div id="song-list" class="list-item">
                  <h4 class="list-header">
                    <b class="b-left"></b>
                    推荐歌单
                    <i class="iconfont icon-more song-icon"></i>
                  </h4>
                  <div class="rec-list">
                     <div class="con-box" v-for="(item,index) in recommendSongList" 
                     :key="index"
                     :class="{paddingRight: (index+1)%3 == 0 }"
                     >
                      <div class="content" 
                      @touchstart="playStart"
                      @touchend="playListEnd($event,item)"
                      >
                          <img :src="item.picUrl" alt="" v-pic>
                          <span class="play-num play-icon">
                            <i class="iconfont icon-kefu play-num"></i>
                            {{parseInt(item.playCount/10000)}}万
                          </span>
                      </div>
                      <div class="title"><span>{{item.name}}</span></div>
                    </div>
                  </div>
             </div>
             <div id="private-list" class="list-item">
                  <h4 class="list-header">
                     <b class="b-left"></b>
                    独家放送
                    <i class="iconfont icon-more song-icon"></i>
                  </h4>
                  <div class="rec-list">
                     <div class="con-box" v-for="(item,index) in privateMsg" 
                     :key="index"
                     :class="{paddingRight: (index+1)%2 == 0 }"
                     >
                      <div class="content">
                          <img :src="item.picUrl" alt="独家放送" v-pic>
                          <span class="play-icon paly-mv">
                            <i class="iconfont icon-mv video"></i>
                          </span>
                      </div>
                      <div class="title"><span>{{item.name}}</span></div>
                    </div>
                  </div>
             </div>
             <div id="new-song" class="list-item">
                  <h4 class="list-header">
                    <b class="b-left"></b>
                    最新音乐
                    <i class="iconfont icon-more song-icon"></i>
                  </h4>
                  <div class="rec-list">
                     <div class="con-box" v-for="(item,index) in newSongs" 
                     :key="index"
                     :class="{paddingRight: (index+1)%3 == 0 }"
                     >
                      <div class="content" 
                      @touchstart="playStart"
                      @touchend="playListEnd($event,item)"
                      >
                          <img :src="item.song.album.picUrl" alt="" v-pic>
                      </div>
                      <div class="title">
                        <span class="song-name">{{item.song.name}}</span>
                        <span class="singer-name">{{getArtistsName(item.song.artists)}}</span>
                      </div>
                    </div>
                  </div>
             </div>
         </div>
       </div>
     </div>
</template>

<script>
import mySwiper from '@/components/view/my-swiper'
import {recSongList,privatecontent,recommend,newsong,highquality} from '@/service/getData'
import { Indicator } from 'mint-ui';
import {scrollMixin} from '@/common/js/mixin';

export default {
   name:'findBar',
   data(){
     return{
       recommendSongList:[],
       privateMsg:[],
       newSongs:[],
       startY:0,
       startX:0
     }
   },
  mixins:[scrollMixin],
  beforeCreate(){
      Indicator.open();
   },
   created(){
      recSongList.then((res)=>{
        if(res.data.code == 200){
           this.recommendSongList = res.data.result;
        }
      })
       privatecontent.then((res)=>{
        if(res.data.code){
          this.privateMsg = res.data.result;
        }
      })
       newsong.then((res)=>{
          if(res.data.code == 200){
             this.newSongs = res.data.result.slice(0,9);
             setTimeout(()=>{
                 Indicator.close();
              },200)
          }
       })
   },
   computed:{ 
   },
   components:{
     mySwiper
   },
   methods:{
    playListEnd(e,item){
      if( this.getTouchDis(e) < 10){
         this.$store.commit('updatecopywriter',item.copywriter);
         this.$router.push('/songsdetail/'+item.id);
      }
    },
    goSongsList(){
      this.$router.push('/finesong');
    }    
   }
}
</script>

<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';

/*固定定位*/

.find-nav{
  width: 100%;
  .nav-ul{
    display:flex;
    display:-webkit-flex;
    border-bottom: 1px solid #e3e5e6;
  }
   .nav-li{
     width:25%;
     height:264/$a+rem;
     text-align: center;
     a{
       width:100%;
       height:264/$a+rem;
       display: flex;
       display: -webkit-flex;
       color:black;
       span.icon-box{
        margin:auto;
        .icon-box-s{
          display: flex;
          display: -webkit-flex;
          width:132/$a+rem;
          height:132/$a+rem;
          border:2px solid $bgcolor;
          border-radius: 50%;
          margin: auto;
          i{
            font-size: 1.08rem;
            color:$bgcolor;
            margin: auto;
          }
        }
        .description{
            display: flex;
            display: -webkit-flex;
            text-align: center;
            justify-content: center;
            margin-top:20/$a+rem;
        }
       }
     }
   }
}


#private-list{
  .con-box{
     width: 50%;
     .paly-mv{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 56/$a+rem;
        height: 56/$a+rem;
        border-radius: 50%;
        border: 1px solid white;
        background: rgba(0, 0, 0, .5);
        display: flex;
        display: -webkit-flex;
        i.video{
           margin: auto;
           font-size: .6rem;
        }
     }
   }
   .con-box:nth-child(3){
     width: 100%;
     padding: 0;
   }
   
}

#new-song{
  .title{
    .song-name{
      display: block;
      width:100%;
      font-size:1em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }
    .singer-name{
       display: block;
      width:100%;
      color:#797777;
      font-size:.8em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top:5/$a+rem;
    }

  }

}

.list-item{
  width: 100%;
  position: relative;
  .list-header{
     margin-top: 22/$a+rem;
     height: 121/$a+rem;
     line-height: 121/$a+rem;
     font-weight: normal;
     font-size: 1.1em;
     display: flex;
     display: -webkit-flex;
     align-items: center;
     .b-left{
        width: 6/$a+rem;
        height: 41/$a+rem;
        background: $bgcolor;
        margin-right: 20/$a+rem;
     }
     i.song-icon{
        font-size: 1.1em;
        margin-left: 5px;
     }
  }

  .con-box{
     padding-right: 6/$a+rem;
     width: 33.33333%;
     display: inline-block;
     vertical-align: top;
     .content{
       position: relative;
       width: 100%;
       img{
         width: 100%;
         max-height: 100%;
       }
       .play-icon{
         position: absolute;
         top: 14px;
         right: 14px;
         color: white;
         i.play-num{
            font-size: .6rem;
         }
       }
     }
     .title{
      width: 100%;
      margin: 0;
      padding: 18/$a+rem 10/$a+rem 50/$a+rem 10/$a+rem;
      font-size: .92em;
      span{
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
      }
     }
  }
  .rec-list{
    width: 100%;
   .paddingRight{
      padding-right: 0;
    }
  }
}


</style>



