<template>
  <iscroll-view class="fine-song" style="touch-action:none" 
    :options="options" 
    ref="myscroll"
    @pullUp="loadMore"
  >
    <div class="f-s-con">
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
                 <img :src="item.coverImgUrl" alt=""  v-pic  @load="imgLoad">
                 <span class="p-c"><i class="iconfont icon-kefu"></i>{{covertWan(item.playCount)}}</span>
                 <span class="user"><i class="iconfont icon-user2"></i>{{item.creator.nickname}}</span>
               </div>
               <div class="s-name">{{item.name}}</div>
             </li>
             <li class="no-more" v-if="isLoading">
               <mt-spinner type="double-bounce"></mt-spinner> 
             </li>
             <li class="no-more" v-if="noMore">
                全部加载完成
             </li>
           </ul>
         </div>

    </div>
  </iscroll-view>
</template>
<script>
import {highquality} from '@/service/getData';
import {mapState} from 'vuex';
import {scrollMixin} from '@/common/js/mixin';
import { Indicator,Spinner } from 'mint-ui';
 export default{
   name:'allListSong',
   data(){
     return{
       fineSongs:[],
       num:1,
       limit:20,
       isLoading:false,
       noMore:false,
       total:0,    



     }
   },
   mixins:[scrollMixin],
   created(){
     Indicator.open();
     highquality({
       limit:this.limit
     }).then((res)=>{
       console.log(res,'精品歌单');
       if(res.data.code == 200){
           this.fineSongs = res.data.playlists.concat();
           this.total = res.data.total > 100 ? 100 : res.data.total; //只加载100条
           setTimeout(()=>{
             Indicator.close();
           },300)
           console.log(this.num,'start');
       }
     })
     
   },
   components:{
   },
   methods:{
     playListEnd(e,item){
       if( this.getTouchDis(e) < 10){
         this.$store.commit('updatecopywriter',item.copywriter);
         this.$router.push('/songsdetail/'+item.id);
       }
     },
     imgLoad(){
       this.$refs.myscroll.refresh();
     },
     loadMore(){
        if(this.fineSongs.length >= this.total){
          this.noMore = true;
          return;
        }
        this.isLoading = true;
        this.num ++;
        console.log(this.num);
        highquality({
          limit:this.limit*this.num
        }).then((res)=>{
         console.log(res,'new歌单');
        if(res.data.code == 200){
            this.fineSongs = res.data.playlists.concat();
            this.isLoading = false;
        }
      })

     },


   }
   
 }
</script>
<style lang="scss" scoped >
@import 'src/common/css/mixin.scss';

.no-more{
  width:100%;
  height: 150/$a+rem;
  color:$bgcolor;
  text-align: center;
  line-height:150/$a+rem;
  font-size:1.2em;
}

.fine-song{
    position: fixed;
    top: 3.96667rem;
    left: 0;
    right: 0;
    bottom: 2.18333rem;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 40;
  .f-s-con{
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

