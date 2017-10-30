<template>
  <div class="fine-song">
    <my-header title="歌单" class="fine-header"></my-header>
    <div class="f-s-con">
       <div class="header">
          <img :src="fineSongs[0].coverImgUrl" alt="" class="songs-bg">
          <div class="bg-cover"></div>
          <img :src="fineSongs[0].coverImgUrl" alt="" class="songs-bg front">
         <div class="h-img">
           <img :src="fineSongs[0].coverImgUrl" alt="" v-pic>
         </div>
         <div class="h-text">
           <div class="h-txt-title"> 精品歌单<i class="iconfont icon-more"></i></div>
           <div class="h-txt-name">{{fineSongs[0].name}}</div>
           <div class="special">{{fineSongs[0].copywriter}}</div>
         </div>
       </div>
       <div class="f-s-nav">
            <span class="cls-song">
              全部歌单
              <i class="iconfont icon-more"></i>
            </span>
            <span class="tags">
              <span class="tag-txt">欧美</span>
              <span class="tag-txt">民谣</span>
              <span class="tag-txt">电子</span>
            </span>
        </div>
         <div class="f-s-list">
           <ul class="f-s-ul">
             <li :class="{'f-s-li':true,'no-right': index%2 == 1}" v-for="(item,index) in fineSongs" 
             :key="index"
             @touchstart="playStart"
             @touchend="playListEnd($event,item)"
              >
               <div class="s-img-box">
                 <img :src="item.coverImgUrl" alt=""  v-pic>
                 <span class="p-c"><i class="iconfont icon-kefu"></i>{{covertWan(item.playCount)}}</span>
                 <span class="user"><i class="iconfont icon-user2"></i>{{item.creator.nickname}}</span>
               </div>
               <div class="s-name">{{item.name}}</div>
             </li>
           </ul>
         </div>

    </div>
  </div>
</template>
<script>
import myHeader from '../header'
import {highquality} from '@/service/getData';
import {mapState} from 'vuex';
import {scrollMixin} from '@/common/js/mixin';
import { Indicator } from 'mint-ui';

 export default{
   name:'finesong',
   data(){
     return{
       fineSongs:[],


     }
   },
   mixins:[scrollMixin],
   created(){
     Indicator.open();
     highquality({
       limit:20
     }).then((res)=>{
       console.log(res,'精品歌单');
       if(res.data.code == 200){
           this.fineSongs = res.data.playlists.concat();
           setTimeout(()=>{
             Indicator.close();
           },300)
       }
          
     })
   },
   components:{
     myHeader,
   },
   methods:{
     playListEnd(e,item){
       if( this.getTouchDis(e) < 10){
         this.$store.commit('updatecopywriter',item.copywriter);
         this.$router.push('/songsdetail/'+item.id);
       }
     }
   }
   
 }
</script>
<style lang="scss" scoped >
@import 'src/common/css/mixin.scss';

.songs-bg{
  width:100%;
  height:100%;
  position:absolute;
  left: 0;
  top:0;
  z-index:-1;
}
.bg-cover{
  width:100%;
  height:100%;
  position:absolute;
  left: 0;
  top:0;
  background:rgba(0,0,0,.4);
  z-index:3;
}
.front{
   -webkit-filter: blur(50px);
    -moz-filter: blur(50px);
    -o-filter: blur(50px);
    -ms-filter: blur(50px);
    filter: blur(50px);
    z-index:1;
}
.fine-song{
  .fine-header{
    position:fixed;
    left:0;
    top:0;
  }
  .f-s-con{
    @include fixedTop(137/$a+rem);
    .header{
      width:100%;
      height:368/$a+rem;
      padding:61/$a+rem 0 40/$a+rem 27/$a+rem;
      display: flex;
      display: -webkit-flex;
      background:green;
      position:relative;
      overflow: hidden;
      .h-img{
        width: 266/$a+rem;
        height: 266/$a+rem;
        position: relative;
        z-index:5;
        img{
          width: 266/$a+rem;
          height: 266/$a+rem;
        }

      }
      .h-text{
        position: relative;
        z-index:5;
        margin-left:29/$a+rem;
        color:white;
        max-width:640/$a+rem;
        .h-txt-title{
          font-size:1.2em;
          line-height:97/$a+rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          i.icon-more{
            font-size:.86rem;
            color:rgba(255,255,255,.5);
            position: relative;
            top:2/$a+rem;
            left:5/$a+rem;
          }
        }
        .h-txt-name{
          line-height:94/$a+rem;
          font-size:1em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .special{
          margin-bottom:48/$a+rem;
          color:rgba(255,255,255,.7);
          font-size:.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

      }

    }
    .f-s-nav{
      display: flex;
      display: -webkit-flex;
      height:162/$a+rem;
      .cls-song{
        margin-left:28/$a+rem;
        width:262/$a+rem;
        color:#252526;
        height: 76/$a+rem;
        line-height: 76/$a+rem;
        margin-top:43/$a+rem;
        border:1px solid #c9cbca;
        position:relative;
        border-radius:38/$a+rem;
        padding-left:34/$a+rem;
        display:inline-block;
        vertical-align: middle;
        i.icon-more{
          font-size:.89rem;
          position:absolute;
          right:8/$a+rem;
          top:0;
          color:#8b8c8d;
        }

      }
      .tags{
        margin-left:300/$a+rem;
        display:inline-block;
        vertical-align: middle;
        height:100%;
        line-height: 162/$a+rem;
        .tag-txt{
          padding: 0  26/$a+rem;
          line-height:60/$a+rem;
          border-right:1px solid #dfe1e2;
          color:#575858;
        }
        .tag-txt::nth-child(3){
          border-right:none;
        }

      }
    }
    .f-s-list{
      .f-s-ul{
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        .f-s-li{
          width:50%;
          padding-right:6/$a+rem;
          margin-bottom:35/$a+rem;
          .s-img-box{
            width:478/$a+rem;
            height:478/$a+rem;
            position:relative;
            font-size:.86em;
            color:#fff;
            img{
              position: absolute;
              left:0;
              top:0;
              width:478/$a+rem;
              height:478/$a+rem;
              z-index: -1;
            }
            .user{
              position: absolute;
              left:0;
              bottom:0;
              height: 76/$a+rem;
              line-height: 76/$a+rem;
              padding-left:15/$a+rem;
              i{
                font-size:.7rem;
                margin-top: -10/$a+rem;
                margin-right:5/$a+rem;
              }

            }
            .p-c{
              position: absolute;
              right:0;
              top:0;
              padding: 20/$a+rem 14/$a+rem;
              i{
                font-size:.6rem;
                margin-right:6/$a+rem;
                margin-top:-3/$a+rem;
              }
            }

          }
          .s-name{
            padding: 20/$a+rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        li.no-right{
          padding-right:0;
          display: flex;
          flex-direction: column;
          .s-img-box{
             align-self: flex-end;
          }
        }

      }
    }

  }

}

</style>
