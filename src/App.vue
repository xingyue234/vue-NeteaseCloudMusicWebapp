<template>
  <div id="app">
    <left-menu></left-menu>

    <play :class="{'hidde-play':true,'show-play':showPlay}" v-on:getCurTime="getCurrentTime"></play>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件 -->
       </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>

    <div :class="playFooter" v-if="showPlayfooter">
      <div class="bf-progress" :style="{width:bgWidth}"></div>
      <div class="main-footer" @click="goPlay(true)">
         <div class="left-img">
            <img :src="play.singerImg" alt="" v-pic :class="{paused:true,running:isplaying}" @click.stop="showDrag = !showDrag">
            <span class="song">
              <span class="song-name">{{ play.name }}</span>
              <span class="song-lrc">{{ lyric }}</span>
            </span>
         </div>
         <div class="control">
            <i :class="{'iconfont':true,'icon-bofang':!isplaying,'icon-zanting':isplaying}" @click.stop="updateisplaying(!isplaying)"></i>
            <i class="iconfont icon-gengduo" @click.stop="updateshowPlayList(true)"></i>
         </div>
      </div>
    </div>

    <play-list></play-list>

    <div class="drag" v-drag v-if="showDrag">
       <span class="drag-lyric">{{lyric}}</span>
    </div>

    <popup :title="pop.title" :position="pop.position" v-model="pop.show"></popup>

    <song-more></song-more>

    <song-play-more></song-play-more>

    <add-list v-if="showAddToList"></add-list>

    <set-time v-if="showSetTime"></set-time>

  </div>
</template>

<script>
import leftMenu from './components/view/left-menu';
import Vue from 'vue';
import play from '@/components/play/'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import {setStore,getStore} from '@/service/storage';
import {userRecord,userPlaylist} from '@/service/getData';
import playList from '@/components/play/play-list';
import {drag} from '@/common/js/directives';
import popup from '@/components/login/popup';
import songMore from '@/components/view/song-more';
import addList from '@/components/view/add-to-list';
import songPlayMore from '@/components/view/play-song-more';
import setTime from '@/components/view/set-time';

Vue.directive('pic',{
  inserted: function (el, binding, vnode) {
    if(!el.getAttribute('src')){
      el.setAttribute('src','/static/default.jpg');
    }
  }
})

export default {
  name: 'app',
  data(){
    return {
      uid:0,
      currentTime:0,
      lyric:this.$store.state.play.singer,
      bgWidth:0,
      showDrag:false,
    }
  },
  directives:{
    drag
  },
  created(){
    if(getStore('loginInfo')){
      let id = JSON.parse(getStore('loginInfo')).id;
      let nickname = JSON.parse(getStore('loginInfo')).nickname;
      this.$store.commit('updateloginMsg',{
        uid:id,
        nickname
      })
      this.uid = id;

      let _nowId = JSON.parse(getStore('nowId'));
      this.$store.commit('updateplayInfo',{
        id:_nowId
      })

    
      if(getStore('playListId')){
          let ids = JSON.parse(getStore('playListId'));
          this.$store.commit('updateplayListId',ids);
      }

      //获取我创建的歌单
      userPlaylist({
        uid:this.uid
      }).then((res)=>{
        let createList = [];
        if(res.data.code == 200){
          res.data.playlist.forEach((item)=>{
              if(item.creator.userId == this.uid){
                    createList.push(item);
              }
          })
          this.$store.commit('updatemyCreatePlayList',createList)
        }
      }).catch((err)=>{
        console.log(err)
      })

    }
  },
  computed:{
      ...mapState([
        'showPlay',
        'playFooter',
        'showPlayfooter',
        'play',
        'showPlayList',
        'showPlaySongMore',
        'lrcData',
        'duration',
        'pop',
        'showAddToList',
        'showSetTime',
       ]),
       isplaying(){
        if(!this.$store.state.isplaying){
          setTimeout(()=>{
            this.lyric = this.$store.state.play.singer;
          },500)
        }
        return this.$store.state.isplaying;
      },

  },
  watch:{
    currentTime(newVal){
      this.lrcData.forEach((item)=>{
         if(item.minutes == newVal){
            this.lyric = item.lrc;
         }
      })
      this.bgWidth = ((newVal/Math.round(this.duration))*100).toFixed(1) + '%';
    },
    
  },
  components:{
    leftMenu,
    play,
    playList,
    popup,
    songMore,
    addList,
    songPlayMore,
    setTime
  },
  methods:{
    ...mapMutations({
      goPlay:'updateshowPlay',
      updateisplaying:'updateisplaying',
      updateshowPlayList:'updateshowPlayList',
    }),
    getCurrentTime(value){
      this.currentTime = Math.round(value);
    },
  }
}
</script>

<style lang="scss">
@import './common/css/reset.css';
@import './common/css/mixin.scss';
@import url('./common/icon/iconfont.css');

.drag{
  position: fixed;
  max-width:100%;
  text-align:center;
  height:1.5rem;
  left: 36%;
  top:93.5%;
  z-index:999999;
  padding: 15/$a+rem 60/$a+rem 15/$a+rem 30/$a+rem;
  font-size:1.2em;
  color:$bgcolor;
  border-radius:18/$a+rem;
  white-space:nowrap;
}
.hidde-play{
  transform:translate3d(0,100%,0);
  -webkit-transform:translate3d(0,100%,0);
  transition:all .4s ease-out;
}
.show-play{
  transform:translate3d(0,0,0);
  -webkit-transform:translate3d(0,0,0);
}
.play-footer-show{
  position: fixed;
  left:0;
  bottom: 0;
  right:0;
  height:131/$a+rem;
  background: rgba(255,255,255,.8);
  z-index: 10;
}
.play-footer-hide{
  position: fixed;
  left:0;
  bottom: 0;
  right:0;
  height:131/$a+rem;
  background: rgba(255,255,255,.8);
  z-index: -5;
}

    .bf-progress{
      position: absolute;
      left: 0;
      bottom:0;
      height:3px;
      background: $bgcolor;
    }
  .main-footer{
    height: 100%;
    width:100%;
    padding: 16/$a+rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .left-img{
      overflow: hidden;
      max-width:700/$a+rem;
    }
    img.paused{
       width: 99/$a+rem;
       height: 99/$a+rem;
       float: left;
       border-radius:50%;
       animation:CDturn 18s linear infinite;
       -webkit-animation:CDturn 18s linear infinite;
       animation-play-state:paused;
       -webkit-animation-paly-state:paused;
    }
    img.running{
       animation-play-state:running;
       -webkit-animation-paly-state:running;
    }
     @keyframes CDturn{
        from{transform:rotate(0deg)}
        to{transform:rotate(360deg)}
      }
      @-webkit-keyframes CDturn{
        from{-webkit-transform:rotate(0deg)}
        to{-webkit-transform:rotate(360deg)}
      }
    .song{
      padding: 0  16/$a+rem;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      flex-direction: column;
      height: 100%;
       .song-name{
           color:#343434;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
        }
        .song-lrc{
           color:#7d7c7c;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           font-size:.86em;
           margin-top:8/$a+rem;
        }
    }
    .control{
      width:242/$a+rem;
      height:100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding:0 14/$a+rem;
      .icon-zanting{
        margin-right: 52/$a+rem;
        color:#cccccc;
          
      }
      .icon-bofang{
        margin-right: 52/$a+rem;
      }
      i{
          font-size:1.15rem;
          color:#444444;
      }
    }
  }
</style>
