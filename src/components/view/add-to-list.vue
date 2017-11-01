<template>
  <transition name="slide-in">
    <div class="add-to-list">
     <div class="add-list-cover" @click="updateshowAddToList(false)"></div>
     <div class="add-list-content">
       <h1>收藏到歌单</h1>
       <div class="ul-box">
         <ul  id="list-ul">
          <li class="col-list-li" v-for="(item,index) in myCreatePlayList" 
             :key="index"
             @click="addToList(item.id)"
             >
               <div class="col-pic">
                 <span class="pic">
                   <span class="img-con">
                     <img :src="item.coverImgUrl" alt="">
                   </span>
                 </span>
               </div>
               <div class="col-text">
                  <h6 class="col-text-title">{{item.name}}</h6>
                  <span class="col-text-con">{{item.trackCount}}首，播放{{covertWan(item.playCount)}}次</span>
               </div>
          </li>
       </ul>
       </div>
     </div>
  </div>
  </transition>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {addPlayList} from '@/service/getData'


export default {
  name:'addList',
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['myCreatePlayList','next','pop']),
  },
  methods:{
    ...mapMutations(['updateshowAddToList']),
    covertWan(count){
      return count < 10000 ? count : Math.floor(count/10000)+'万';
    },
    addToList(pid){
      addPlayList({
          op:'add',
          pid,
          tracks:this.next.id
      }).then((res)=>{
        console.log(res,'收藏歌曲到歌单');
        if(res.data.code == 200){
          this.$store.commit('updateshowAddToList',false);
          setTimeout(()=>{
            this.$store.commit('updatepop',{
              title:'已收藏到歌单',
              show:true
            })
          },300)
        }
      })

    },


  }

}
</script>
<style scoped lang="scss">
@import 'src/common/css/mixin.scss';
.add-to-list{
  .add-list-cover{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
    position: fixed;
    left:0;
    top:0;
    z-index:8888888;
  }
  .add-list-content{
      width:95%;
      height: 1065/$a+rem;
      margin: 0 auto;
      background:white;
      position: fixed;
      left:50%;
      top:348/$a+rem;
      bottom:296/$a+rem;
      transform: translateX(-50%);
      z-index:8888889;
      background:#f3f3f3;
       h1{
         padding-left:26/$a+rem;
         width:100%;
         font-weight:normal;
         color:#7a7a7a;
         font-size:1.1em;
         height:112/$a+rem;
         line-height:112/$a+rem;
       }
  }

}

.ul-box{
  position:absolute;
  top:112/$a+rem;
  width:100%;
  height: 950/$a+rem;
  overflow-x: hidden;
  overflow-y: auto;
}
 #list-ul{
         width:100%;
         background:#f2f4f5;
         padding-left:14/$a+rem;
          .col-list-li{
            height: 160/$a+rem;
            display: flex;
            display: -webkit-flex;
            .col-pic{
              width:176/$a+rem;
              @include center;
              .pic{
                width:144/$a+rem;
                height:144/$a+rem;
                @include center;
                .img-con{
                  width:144/$a+rem;
                  height:144/$a+rem;
                  @include center;
                  border:1px solid #b1adb0;
                  img{
                    width:100%;
                    height:100%;
                  }
                }
                .icon-rank{
                     font-size:1.45rem;
                     color:white; 
                 }
                 .icon-like{
                   font-size:1.5rem;
                     color:white; 
                 }
              }
              
            }
            .col-text{
              width:784/$a+rem;
              padding: 10/$a+rem 0 13/$a+rem 21/$a+rem;
              .col-text-title{
                width:86%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height:68/$a+rem;
                color:#282928;
                font-size:1.1em;
                font-weight:normal;

              }
              .col-text-con{
                 line-height:52/$a+rem;
                 color:#707173;
                 font-size:.9em;
              }
            }
              
          } 
      }

</style>

