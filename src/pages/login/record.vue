<template>
  <div class="record" :id="isLinktoRecord">
     <my-header :title="nickname + '的听歌排行'"></my-header>
     <div class="r-nav" :id="id">
        <div :class="{'r-nav-div':true,'r-nav-div-active':weekActive}" @click="tabWeek">
            最近一周
        </div>
        <div :class="{'r-nav-div':true,'r-nav-div-active':allActive}" @click="tabAll">
            所有时间
        </div>
     </div>
     <transition name="fade-in">
       <div class="r-week-con" v-if="weekActive" ref="week" :options="options">
          <ul class="r-week-ul">   
            <li class="r-week-li" v-for="(item,index) in weekRecord" :key="index" 
            @touchstart="playStart"
            @touchend="playEnd($event,item.song.id,item.song.name,getArtistsName(item.song.ar),item.song.al.picUrl)"
            >
              <div class="num" v-if="item.song.id == id"><i class="iconfont icon-volume-"></i></div>
              <div class="num" v-else>{{index+1}}</div>
              <div class="r-week-li-main">
                <div class="text">
                  <h4 class="title">{{item.song.name}}<i class="iconfont icon-mv" v-if="item.song.mv"></i></h4>
                  <div class="singer-text">{{getArtistsName(item.song.ar)}} - {{item.song.al.name}}</div>
                </div>
                <div class="play-count">
                    <i class="iconfont icon-bofang"></i>
                    <span class="play-count-t">{{item.playCount}}次</span>
                </div>
              </div>
            </li>
          </ul>
      </div>
     </transition>
     <transition name="fade-in">
       <div class="r-week-con" v-if="allActive" :options="options">
          <ul class="r-week-ul">
            <li class="r-week-li" v-for="(item,index) in allRecord" :key="index"
            @touchstart="playStart"
            @touchend="playEnd($event,item.song.id,item.song.name,getArtistsName(item.song.ar),item.song.al.picUrl,item)"
            >
              <div class="num" v-if="item.song.id == id"><i class="iconfont icon-volume-"></i></div>
              <div class="num" v-else>{{index+1}}</div>
              <div class="r-week-li-main">
                <div class="text">
                  <h4 class="title">{{item.song.name}}<i class="iconfont icon-mv"></i></h4>
                  <div class="singer-text">{{getArtistsName(item.song.ar)}} - {{item.song.al.name}}</div>
                </div>
                <div class="play-count">
                    <i class="iconfont icon-bofang"></i>
                    <span class="play-count-t">{{item.playCount}}次</span>
                </div>
              </div>
            </li>
          </ul>
      </div>
     </transition>
  </div>
</template>
<script>
import myHeader from '@/components/header'
import popup from '@/components/base/popup'
import {userRecord} from '@/service/getData';
import {setStore,getStore} from '@/service/storage';
import { Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import {animation} from '@/common/js/animation-scroll'
import {scrollMixin} from '@/common/js/mixin';

 export default{
   name:'record',
   data(){
     return{
       weekActive:true,
       allActive:false,
       weekRecord:[],
       allRecord:[],
       uid:this.$store.state.loginMsg.uid,
       nickname:this.$store.state.loginMsg.nickname,
       linkIndex:0,
       //iscroll配置
      options:{
        mouseWheel: true,
        click: true,
        preventDefault: false,
        tap: false,
        bounce: false,
        disableTouch: false,
        disableMouse:false,
        scrollbars:true,
        fadeScrollbars:true,
        interactiveScrollbars:true
       },
     }
   },
   beforeRouteEnter(to,from,next){
    //如果未登录，去登录
    if(!getStore('loginInfo')){
       next('/login');
    }else{
      next();
    }
  },
  mixins:[scrollMixin],
  created(){
    Indicator.open();
    userRecord({
      uid:this.uid,
      type:1
    }).then((res)=>{
      //console.log(res,'周播放记录');
      if(res.data.code == 200){
         this.weekRecord = res.data.weekData.concat();
         setTimeout(()=>{
             Indicator.close();
         },300)
      }
    }).catch((err)=>{
      console.log(err);
    })
    userRecord({
      uid:this.uid,
      type:0
    }).then((res)=>{
      //console.log(res,'所有播放放记录');
      if(res.data.code == 200){
         this.allRecord = res.data.allData.concat();
      }
    }).catch((err)=>{
      console.log(err);
    })

  },
  mounted(){
   setTimeout(()=>{
     if(this.isLinktoRecord){
        this.weekRecord.forEach((item,index)=>{
            if(item.song.id == this.isLinktoRecord){
              console.log(item.song.id,'item.song.id')
                this.linkIndex = index;
            }
        })
     }
     let li = this.$refs.week.children[0].children[this.linkIndex];
     animation(this.$refs.week,li.offsetTop,500,'easeOut');
     console.log(li.offsetTop,'li.offsetTop');
   },2000)
  },
  watch:{
  },
  computed:{
     ...mapState(['isLinktoRecord']),
     id(){
       return this.$store.state.play.id;
     }
  },
  components:{
    myHeader
  },
  methods:{
    tabWeek(){
      Indicator.open();
      this.weekActive = true;
      this.allActive = false;
      setTimeout(()=>{
         Indicator.close();
      },300)
    },
    tabAll(){
      Indicator.open();
      this.weekActive = false;
      this.allActive = true;
      setTimeout(()=>{
         Indicator.close();
      },300)
    },

  }
 }
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';

.record{
  .r-nav{
    height:102/$a+rem;
    display: flex;
    display: -webkit-flex;
    .r-nav-div{
      height: 100%;
      line-height:102/$a+rem;
      text-align:center;
      width:50%;
      color:#6b6b6b;
      border-bottom:3px solid transparent;
    }
    .r-nav-div-active{
       border-bottom-color:$bgcolor;
       color:$bgcolor;
    }

  }
  .r-week-con{
    position:fixed;
    left:0;
    right:0;
    top:239/$a+rem;
    bottom:131/$a+rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .r-week-ul{
      background:#f2f4f5;
      .r-week-li{
        width: 100%;
        height:146/$a+rem;
        display: flex;
        display: -webkit-flex;
        .num{
          width: 14%;
          height:100%;
          text-align: center;
          color:#8f8f8f;
          line-height:146/$a+rem;
          font-size:1em;
          .icon-volume-{
            font-size:1rem;
            color:$bgcolor;
          }

        }
        .r-week-li-main{
          border-bottom:1px solid #e4e6e7;
          width:86%;
          height: 100%;
          display: flex;
          display: -webkit-flex;
        }
        .text{
          padding:20/$a+rem 0 16/$a+rem 0;
          .title{
            width: 684/$a+rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 500;
            font-size:1.1em;
            color:#1c1d1d;
            line-height:58/$a+rem;
            .icon-mv{
              font-size:.78rem;
              color:$bgcolor;
              margin-left:10/$a+rem;
              position: relative;
              top:3px;
            }


          }
          .singer-text{
            width: 684/$a+rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color:#666667;
            line-height:48/$a+rem;
            font-size:.9em;

          }

        }
        .play-count{
          color:#9b9b9b;
          line-height: 146/$a+rem;
          .icon-bofang{
            color:#9b9b9b;
            font-size:.6rem;
            display: inline-block;
            vertical-align: middle;
            margin-right:10/$a+rem;
          }
          .play-count-t{
            display: inline-block;
            vertical-align: middle;
            font-size:.9em;
          }

        }


      }

    }
  }


}

</style>
