<template>
  <div class="play-song-more">
        <transition name="fade-in">
          <div class="cover-bg" @click="updateshowPlaySongMore(false)"  v-if="showPlaySongMore">
          </div>
        </transition>
       <div :class="{'s-m-content':true,'hidde-s-m':!showPlaySongMore}"  :id="getTT()">
        <div class="song-name">歌曲：{{next.name}}</div>
        <ul class="song-more-ul">
          <li class="song-more-li" @click="goAddList">
            <span class="icon"><i class="iconfont icon-shoucang1"></i></span>
            <span class="song-more-txt">收藏到歌单</span>
          </li>
          <li class="song-more-li" @click="showSetTimes">
            <span class="icon"><i class="iconfont icon-zuijin"></i></span>
            <span class="song-more-txt">{{timeText}}</span>
          </li>
          <li class="song-more-li">
            <span class="icon"><i class="iconfont icon-icon-collect"></i></span>
            <span class="song-more-txt">歌手</span>
          </li>
          <li class="song-more-li">
            <span class="icon"><i class="iconfont icon-zhuanji"></i></span>
            <span class="song-more-txt">专辑</span>
          </li>
          <li class="song-more-li">
            <span class="icon"><i class="iconfont icon-link1"></i></span>
            <span class="song-more-txt">来源</span>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {songDetail,addPlayList} from '@/service/getData'
import {setStore,getStore} from '@/service/storage';

export default{
  name:'songPlayMore',
  data(){
    return{
      songUrl: '',
      timer:null,
      timeText:'',
      close_time:0,
    }
  },
  computed:{
    ...mapState([
      'showPlaySongMore',
      'next',
      'playListId',
      'myplayList',
      'pop',
      'showSetTime',
      'closeTime',
      ]),
    songId(){
       return this.$store.state.play.id;
    },

  },
  watch:{
    close_time(){
      console.log('watch变化了')
     if(!this.closeTime){
        this.timeText = '定时停止播放';
      }else{
        clearInterval(this.timer);
        let t = this.closeTime*60;
        let H = 0;
        let M = 0;
        let S = 0;
        let re = 0;
        this.timer = setInterval(()=>{
          t = t - 1;
          if(t <= 0){
            clearInterval(this.timer);
            this.timeText = '定时停止播放';
            this.$store.commit('updatecloseTime',0);
          }
          H = Math.floor(t/3600);
          H = H < 10 ? '0' + H : H;
          let level = t%3600;
          M = Math.floor(level/60);
          M = M < 10 ? '0' + M : M;
          let level2 = level%60;
          S = Math.round(level2);
          S = S < 10 ? '0' + S : S;
          this.timeText = H + ':'+ M +':'+ S;
        },1000)
        return re;
      }
    },

  },
  methods:{
    ...mapMutations(['updateshowPlaySongMore','updateshowAddToList','updateshowSetTime']),
    goAddList(){
      this.$store.commit('updateshowPlaySongMore',false);
      setTimeout(()=>{
        this.$store.commit('updateshowAddToList',true);
      },400);
      this.$store.commit('updatenext',{
        id:this.songId
      })
    },
    showSetTimes(){
      this.$store.commit('updateshowPlaySongMore',false);
      setTimeout(()=>{
        this.$store.commit('updateshowSetTime',true);
      },400)
    },
    getTT(){
        console.log('loaded');
        this.close_time = this.closeTime;
        return 1;
    },
    



  }

}
</script>



<style lang="scss">
@import 'src/common/css/mixin.scss';


.play-song-more{
  .cover-bg{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    z-index: 999999;
    background:rgba(0,0,0,.6);
  }
  .s-m-content{
    position: absolute;
    left:0;
    right:0;
    bottom: 0;
    z-index: 999999;
    background: #f3f3f3;
    padding-top:36/$a+rem;
    transition:all .4s;
    -webkit-transition:all .4s;
    transform:translate3d(0,0,0);
  -webkit-transform:translate3d(0,0,0);
    .song-name{
      height:84/$a+rem;
      line-height:84/$a+rem;
      padding-left:28/$a+rem;
      color:#5e5e5e;
    }
    .song-more-ul{
      width:100%;
      .song-more-li{
        height:122/$a+rem;
        display: flex;
        display: -webkit-flex;
        .icon{
          width:13%;
          @include center;
          i{
            font-size:1rem;
            color: $bgcolor;
          }
          .icon-zuijinbofang{
             font-size:.94rem;
             font-size:100;
          }

        }
        .song-more-txt{
          width:87%;
          border-bottom:1px solid #e1e1e1;
          line-height:122/$a+rem;
          padding-left:10/$a+rem;
        }

      }
      .download{
        position:relative;
        .download-a{
          position: absolute;
          width:100%;
          height:100%;
          left:0;
          top:0;
        }
      }

    }

  }
.hidde-s-m{
  transform:translate3d(0,110%,0);
  -webkit-transform:translate3d(0,110%,0);
  display: none;
}
  
}
</style>
