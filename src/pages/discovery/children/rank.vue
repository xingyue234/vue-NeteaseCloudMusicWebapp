<template>
  <div class="dis-rank">
    <div class="offical">
      <header class="top-header">
        官方榜
      </header>
      <ul class="offical-ul">
        <li class="offical-li" v-for="(item,index) in officalList" 
         :key="index"
         @touchstart="playStart"
         @touchend="goDetail($event,item.idx)"
         >
          <span class="o-bg-url">
            <img :src="item.coverImgUrl" alt=""  v-pic>
            <span class="update-time">{{ getUpdateText(item.trackUpdateTime,'minutes') }} 更新</span>
          </span>
          <span class="o-song-list">
            <span class="o-song-text" v-for="(item,index) in getThreesongs(item)" :key="index">
              {{(index + 1) + '. ' + item.name + ' - '+ getArtistsName(item.ar)}}
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="global">
      <header class="top-header">
        全球榜
      </header>
      <ul class="global-ul">
        <li :class="{'global-li':true,'no-padding-r':(index+1)%3 == 0}" v-for="(item,index) in globalList" 
        :key="index"
        @touchstart="playStart"
        @touchend="goDetail($event,item.idx)"
        >
          <span class="g-bg-url">
            <img :src="item.coverImgUrl" alt="" v-pic><span class="update-time" >{{ getUpdateText(item.trackUpdateTime, 'minutes') }}</span>
          </span>
          <span class="g-description">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {pic} from '@/common/js/directives';
import {topList} from '@/service/getData';
import axios from 'axios';
import { Indicator } from 'mint-ui';
import {scrollMixin} from '@/common/js/mixin';

export default {
  name:'rank',
  data(){
    return {
      officalList: [],
      globalList: []  
    }
  },
  mixins:[scrollMixin],
  created(){
    Indicator.open();
    let idxO = [0,1,2,3,4,7,17];
    let idxG = [5,6,8,9,10,11,12,13,14,15,16,18,19,21];
    let _this = this;

    topList({
      idxs:idxO
    }).then(axios.spread(function(res1,res2){

        Array.from(arguments).forEach((item,index)=>{
               console.log(arguments)
                if(item.data.code == 200){

                   _this.officalList.push({
                      coverImgUrl:item.data.playlist.coverImgUrl,
                      name:item.data.playlist.name,
                      updateTime:item.data.playlist.updateTime,
                      trackUpdateTime: item.data.playlist.trackUpdateTime,
                      tracks:item.data.playlist.tracks,
                      idx:idxO[index]

                   });

                }
        })
      setTimeout(()=>{
        Indicator.close();
      },300)
    })).catch((err)=>{
      console.log(err)
    })

    topList({
      idxs:idxG
    }).then(axios.spread(function(res1,res2){

        Array.from(arguments).forEach((item,index)=>{
          console.log(arguments, 'globalList')
               
                if(item.data.code == 200){
                   
                   _this.globalList.push({
                      coverImgUrl:item.data.playlist.coverImgUrl,
                      name:item.data.playlist.name,
                      updateTime:item.data.playlist.updateTime,
                      trackUpdateTime: item.data.playlist.trackUpdateTime,
                      tracks:item.data.playlist.tracks,
                      idx:idxG[index]
                   });

                }
        })
    })).catch((err)=>{
      console.log(err)
    })
  },
  directives:{
    pic
  },
  methods:{
    getThreesongs(item){
      return item.tracks.slice(0,3);
    },
    goDetail(e,idx){
      if(this.getTouchDis(e) < 10){
        this.$store.commit('updateIdx',idx);
        this.$router.push('/ranksongs');
      }
    },





  },
}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';
.dis-rank{
  width:100%;
   //公共
   .top-header{
     height:121/$a+rem;
     line-height:121/$a+rem;
     padding-left:26/$a+rem;
     position: relative;
     color:#2c2d2d;
     font-size:1.05em;
   }
   .top-header::after{
       content:'';
       display: block;
       position:absolute;
       left:0;
       top:50%;
       margin-top:-20/$a+rem;
       width:4px;
       height:40/$a+rem;
       background:$bgcolor;
    }
    .update-time{
       position:absolute;
       left:17/$a+rem;
       bottom:14/$a+rem;
       color:#fefeff;
       font-size:.9em;
       z-index:55;
    }
    // 专题
   .offical{
     .offical-ul{
       width:100%;
       .offical-li{
         display: flex;
         display: -webkit-flex;
         margin-bottom: 7/$a+rem;
         .o-bg-url{
           width: 317/$a+rem;
           height: 317/$a+rem;
           position: relative;
           z-index: 7;
           box-shadow: 0 -76/$a+rem 0 rgba(0, 0, 0, .4) inset;
           img{
             width: 317/$a+rem;
             height: 317/$a+rem;
             position: relative;
             z-index: -1;
           }
         }
         .o-song-list{
           border-bottom:1px solid #e0e2e3;
           padding: 23/$a+rem 20/$a+rem 29/$a+rem 26/$a+rem;
           width:643/$a+rem;
           .o-song-text{
             display: block;
             color:#656666;
             line-height: 91/$a+rem;
             max-width:595/$a+rem;
             overflow: hidden;
             white-space: nowrap;
             text-overflow: ellipsis;
             font-size:.96em;
           }

         }

       }
     }

   }
   .global{
     width:100%;
     margin-top:60/$a+rem;
     .global-ul{
       width:100%;
       .global-li{
         width: 33.3333%;
         display: inline-block;
         vertical-align: top;
         margin-bottom:32/$a+rem;
         padding-right:5/$a+rem;
         .g-bg-url{
           width:100%;
           display: inline-block;
           height:317/$a+rem;
           position:relative;
           box-shadow: 0 -76/$a+rem 0 rgba(0, 0, 0, .4) inset;
           img{
             width:100%;
             height:317/$a+rem;
             position: relative;
             z-index: -1;
           }
         }
         .g-description{
           display: block;
           padding: 18/$a+rem;
           width:100%;
           font-size:.95em;

         }
       }
       .no-padding-r{
         padding-right:0;
       }
     }


   }
  
}

</style>

