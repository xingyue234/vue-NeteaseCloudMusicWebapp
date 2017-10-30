<template>
  <div class="song-more">
      <transition name="fade-in" v-if="showSongMore">
        <div class="cover-bg" @click="updateshowSongMore(false)">
        </div>
      </transition>
      <transition name="slide-in">
        <div class="s-m-content" v-if="showSongMore">
        <div class="song-name">歌曲：{{next.name}}</div>
        <ul class="song-more-ul">
          <li class="song-more-li" @click="addToNext">
            <span class="icon"><i class="iconfont icon-zuijinbofang"></i></span>
            <span class="song-more-txt">下一首播放</span>
          </li>
          <li class="song-more-li" @click="goAddList()">
            <span class="icon"><i class="iconfont icon-shoucang1"></i></span>
            <span class="song-more-txt">收藏到歌单</span>
          </li>
          <li class="song-more-li download">
            <span class="icon"><i class="iconfont icon-xiazai1"></i></span>
            <span class="song-more-txt">下载</span>
            <a :href="songUrl" class="download-a" ></a>
          </li>
          <li class="song-more-li">
            <span class="icon"><i class="iconfont icon-pinglun1"></i></span>
            <span class="song-more-txt">评论</span>
          </li>
          <li class="song-more-li">
            <span class="icon"><i class="iconfont icon-icon-collect"></i></span>
            <span class="song-more-txt">歌手</span>
          </li>
          <li class="song-more-li">
            <span class="icon"><i class="iconfont icon-zhuanji"></i></span>
            <span class="song-more-txt">专辑</span>
          </li>
        </ul>
      </div>
      </transition>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {songDetail,playUrl,addPlayList} from '@/service/getData'
import {setStore,getStore} from '@/service/storage';

export default{
  name:'songMore',
  data(){
    return{
      songUrl: '',

    }
  },
  computed:{
    ...mapState(['showSongMore','next','playListId','myplayList','pop']),
    songId(){
       return this.$store.state.play.id;
    }
  },
  created(){
    playUrl({
          id:this.next.id
      }).then((res)=>{
          if(res.data.code == 200 && res.data.data[0].url){
            this.songUrl = res.data.data[0].url;
          }else{
            this.songUrl = '';
            this.$store.commit('updatepop',{
              show:true,
              title:'sorry，链接不存在，下载失败~'
            })
          }
   })
  },
  methods:{
    ...mapMutations(['updateshowSongMore','updateshowAddToList']),
    goAddList(){
      this.$store.commit('updateshowSongMore',false);
      setTimeout(()=>{
        this.$store.commit('updateshowAddToList',true);
      },400);
    },
    addToNext(){
          let play_list_id = this.playListId.slice();
          let index = play_list_id.indexOf(this.songId);
          if(play_list_id.indexOf(this.next.id) === -1){
             play_list_id.splice(index,0,this.next.id);
             this.$store.commit('updateplayListId', play_list_id);
             setStore('playListId',play_list_id);
             console.log('添加了id');



              //更新播放列表
              let my_play_list = this.myplayList.slice();
              let pIndex = 0;
              my_play_list.forEach((item,index)=>{
                  if(item.song.id == this.songId){
                      pIndex = index;
                  }
              })
              songDetail({
                ids:this.next.id
              }).then((res)=>{
                  console.log(res,'添加到下一首播放');
                  if(res.data.code == 200){
                      my_play_list.splice(pIndex,0,{
                            song:res.data.songs[0]
                        })
                    this.$store.commit('updatemyplayList',my_play_list);
                  }
              })

              this.$store.commit('updateshowSongMore',false);
              setTimeout(()=>{
                this.$store.commit('updatepop',{
                    title:'已添加到下一首播放',
                    show:true
                })
              },400)
          }
       
        
    },
    



  }

}
</script>



<style lang="scss">
@import 'src/common/css/mixin.scss';

.song-more{
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
  
}
</style>
