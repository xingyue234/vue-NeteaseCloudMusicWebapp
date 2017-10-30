<template>
  <div class="my" 
  @scroll="scrollchanges" 
  @touchmove="move"
  @touchend="end"
  ref="my">
     <my-header class="header-box-custom" :title="mytitle" :style="{background:'rgba(0,0,0,'+ hOpacity +')'}">
       <span class="icon-share-box">
         <i class="iconfont icon-share1"></i>
       </span>
     </my-header>
     <div>
       <div class="my-con">
       <div class="c-top-box" ref="topBox" :style="{'background': 'url('+myDetail.profile.backgroundUrl+')'}">
          <div class="c-top" :style="{'opacity':topOpacity}">
              <div class="my-avatar">
                <img :src="myDetail.profile.avatarUrl" alt="" v-pic>
              </div>
              <div class="my-name">
                {{myDetail.profile.nickname}}
                <i :class="{'iconfont':true,'icon-nan':sex =='男','icon-nv':sex =='女'}"></i>
              </div>
              <div class="my-follower">
                <span>关注{{myDetail.profile.follows}} </span><span>|</span>
                <span>粉丝{{myDetail.profile.followeds}} </span>
              </div>
              <div class="my-detail">
                <router-link to="/">
                <i class="iconfont icon-bianji"></i>
                  我的资料
                </router-link>
              </div>
        </div>
       </div>
       <div :class="{'nav-bar':true,'fixed-nav':fixedNav}">
          <ul class="nav-bar-list">
            <li :class="{'active':item.active}" v-for="(item,index) in navBar" :key="index" @click="tabItem(item)">
              {{item.title}}
              <span>{{item.count}}</span>
            </li>
          </ul>
       </div>
      <div :class="{'main-fixed':mainFixed}" ref="mainFixed">
         <div class="love-list" id="love-list" v-if="tab.loveList">
           <div class="col-title">
             <span class="songlist-count">创建的歌单({{myCreatePlayList.length}})</span>
             <span class="songlist-col">共被收藏0次</span>
           </div>
           <ul id="list-ul">
             <li class="col-list-li" @click="goRecord">
               <div class="col-pic">
                 <span class="pic">
                    <span class="img-con">
                      <i class="iconfont icon-rank"></i>
                    </span>
                 </span>
               </div>
               <div class="col-text">
                  <h6 class="col-text-title">我的听歌排行</h6>
                  <span class="col-text-con">累计听歌{{myDetail.listenSongs}}首</span>
               </div>
             </li>
             <li class="col-list-li" v-for="(item,index) in myCreatePlayList" 
             :key="index"
             @touchstart="playStart"
             @touchend="myGoPlay($event,item.id)"
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
           <div class="col-title">
             <span class="songlist-count">收藏的歌单({{myFavoritePalyList.length}})</span>
           </div>
           <ul id="list-ul">
             <li class="col-list-li" v-for="(item,index) in myFavoritePalyList" 
             :key="index"
             @touchstart="playStart"
             @touchend="myGoPlay($event,item.id)"
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
                  <span class="col-text-con">{{item.trackCount}}首，by {{ item.creator.nickname }}，播放{{covertWan(item.playCount)}}次</span>
               </div>
             </li>
           </ul>
         </div>
         <div class="trends" id="trends" v-if="tab.trends">
           <ul class="trends-ul" v-if="userEvents.length">
             <li class="trends-con-li" v-for="(item,index) in userEvents" :key="index">
                 <div class="trends-header">
                   <div class="trends-header-i-box">
                      <img :src="item.user.avatarUrl" alt="" v-pic>
                   </div>
                   <div class="trends-header-des">
                     <div class="name-fen">
                       <span class="myname">{{item.user.nickname}}</span>
                       <span class="fen">分享单曲:</span>
                      </div>
                     <div class="fen-time">{{getShowTime(item)}}</div>
                   </div>
                 </div>
                 <div class="trends-text">
                    <div class="fen-description">{{getMsg(item)}}</div>
                    <div class="fen-play" 
                    @touchstart="playStart"
                    @touchend="playEnd($event,JSON.parse(item.json).song.id)"
                    >
                      <div class="fen-play-pic">
                        <img :src="getImgUrl(item)" alt="" v-pic>
                        <i class="iconfont icon-bofang"></i>
                      </div>
                      <div class="fen-play-text">
                        <div class="title">{{getName(item)}}</div>
                        <div class="singer">{{getSinger(item)}}</div>
                      </div>
                    </div>
                    <div class="fen-more-con">
                      <span class="fen-cions">
                        <i :class="{'iconfont':true,'icon-like1':true,'liked':item.info.liked}"></i><span>{{ item.info.liked ? item.info.likedCount : '赞'}}</span>
                      </span>
                      <span class="fen-cions">
                        <i :class="{'iconfont':true,'icon-pinglun1':true,'commented':!!item.info.commentCount}"></i><span>{{item.info.commentCount ? item.info.commentCount : '评论'}}</span>
                      </span>
                      <span class="fen-cions">
                        <i class="iconfont icon-share"></i><span>分享</span>
                      </span>
                      <span class="fen-cions">
                        <i class="iconfont icon-more3"></i>
                      </span>
                    </div>
                 </div>
             </li>
           </ul>
           <div v-else class="no-event">
             <span class="no-e-text">
                  暂时还没有动态哦
             </span>
           </div>
         </div>
         <div class="about-me" id="about" v-if="tab.about">
             <h4 class="myinfo-head">个人信息</h4>
             <ul class="myinfo-list">
               <li class="infolist-li"><span class="t">等级：</span><span class="t-c">{{myDetail.level}}</span></li>
               <li class="infolist-li"><span class="t">年龄：</span><span class="t-c">{{old}}</span></li>
               <li class="infolist-li"><span class="t">性别：</span><span class="t-c">{{sex}}</span></li>
               <li class="infolist-li"><span class="t">地区：</span><span class="t-c">{{myLocation}}</span></li>
               <li class="infolist-li" v-for="(item,index) in bindings" :key="index">
                 <template v-if="item.url"><span class="t">绑定微博：</span><a :href="item.url" target="_blank" class="t-c">{{'微博'}}</a></template>
                 <template v-else><span class="t">绑定手机：</span><span class="t-c">{{getPhone(item)}}</span></template>
               </li>
             </ul>
             <h4 class="myinfo-head">个人介绍</h4>
             <ul class="myinfo-list">
               <li class="infolist-li" v-if="myDetail.profile.signature">{{myDetail.profile.signature}}</li>
               <li class="infolist-li no-info" v-else> 还没有填写个人介绍哦 </li>
             </ul>
         </div>
      </div>
     </div>
     </div>
  </div>
</template>
<script>
import myHeader from '../header'
import {reLogin,userDetail,userCount,userPlaylist,userEvent} from '@/service/getData'
import {placesMap} from '@/common/js/province'
import {animation} from '@/common/js/animation-scroll'
import {setStore,getStore} from '@/service/storage'
import {scrollMixin} from '@/common/js/mixin'
import {mapState} from 'vuex'

export default {
  name:'my',
  data(){
    return{
       //header 背景透明度
       start:false,//是否触摸
       mytitle:'',
       hOpacity:0, 
       fixedNav:false, 
       topBoxH:0,  
       mainFixed:false,
       clickCount:0,
        tab:{
          loveList:true,
          trends:false,
          about:false
        },
        navBar:[
          {
            title:'音乐',
            count:0,
            active:true,
            content:'loveList'
          },
          {
            title:'动态',
            count:0,
            active:false,
            content:'trends'
          },
          {
            title:'关于我',
            count:6,
            active:false,
            content:'about'
          }
        ],
        topOpacity:1,
        myDetail:null,
        birthday:0,
        sex:'男',
        old:0,
        myFavoritePalyList:[],
        myCreatePlayList:[],
        //用户动态
        userEvents:[],
        //绑定信息
        bindings:[],
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
    userDetail({
      uid: this.uid
    }).then((res)=>{
      if(res.data.code == 200){
        //console.log(res.data,'用户详情');
        this.myDetail = res.data;
        this.bindings = res.data.bindings;
      }else{
       // console.log('获取用户详情出错');
      }
    }).catch((err)=>{
      console.log(err)
    })

    userPlaylist({
      uid:this.uid
    }).then((res)=>{
      if(res.data.code == 200){
         this.navBar[0].count = res.data.playlist.length;
         res.data.playlist.forEach((item)=>{
             if(item.creator.userId == this.uid){
                  this.myCreatePlayList.push(item);
             }else{
                  this.myFavoritePalyList.push(item);
             }
         })
      }
    }).catch((err)=>{
      console.log(err)
    })

    userEvent({
      uid:this.uid
    }).then((res)=>{
       //console.log(res,'用户动态');
       if(res.data.code == 200){
          this.navBar[1].count = res.data.events.length;
          this.userEvents = res.data.events;
       }
    }).catch((err)=>{
      console.log(err);
    })
  },
  watch:{
   myDetail(detail){
      this.sex = detail.profile.gender == 1 ? '女' : '男';
      let Dates = new Date(detail.profile.birthday);
      let m = Dates.getMonth()+1;
      let y = Dates.getFullYear();
      let d = Dates.getDate();
      let nowYear = new Date().getFullYear();
      this.birthday = y + '-' + m + '-' + d;
      this.old = nowYear - y;
      this.navBar.forEach((item)=>{
           if(item.title == '动态'){
               item.count = detail.profile.eventCount;
           }
      })
   }
  },
  computed:{
    ...mapState(['myCreatePlayList']),
    myLocation(){
      let location = '';
      for(var p in placesMap){
        if( Number(p) == this.myDetail.profile.province){
              location += placesMap[p];
        }
        if( Number(p) == this.myDetail.profile.city){
              location += ' ' + placesMap[p];
        }
      }
      return location;
    },
    uid(){
      return this.$store.state.loginMsg.uid;
    },

  },
  components:{
    myHeader
  },
  mounted(){
   setTimeout(()=>{
     this.topBoxH = this.$refs.topBox.offsetHeight;
      if(this.$refs.my.scrollTop <= this.topBoxH*0.194){
          animation(this.$refs.my,this.topBoxH*0.194,500,'easeOut');
      }
   },500)
  },
  methods:{
    getName(item){
      return JSON.parse(item.json).song.name;
    },
    getSinger(item){
      let artist = [];
      JSON.parse(item.json).song.artists.forEach((item)=>{
                  artist.push(item.name);
      })
      return artist.join('/');
    },
    getMsg(item){
      return JSON.parse(item.json).msg;
    },
    getImgUrl(item){
      return JSON.parse(item.json).song.album.img80x80;
    },
    getShowTime(item){
      let T = new Date(item.showTime);
      let Y = T.getFullYear();
      let M = T.getMonth() + 1;
      let D = T.getDate();
      let Now = new Date();
      let nowY = Now.getFullYear();
      let nowM = Now.getMonth() + 1;
      let nowD = Now.getDate();
      
      if( nowY == Y && nowM == M && (nowD - D <= 2)){
           let timeText = '';
            switch(nowD - D)
            {
              case 1:
                timeText = '昨天';
                break;
              case 2:
                timeText = '前天';
                break;
            }
           let H = T.getHours() < 10 ? ('0'+ T.getHours()) : T.getHours();
           let Min = T.getMinutes() < 10 ? ('0'+T.getMinutes()) : T.getMinutes();
           return timeText + H + ':' + Min;
      }else{
        return Y + '年' + M + '月' + D +'日';
      }

    },
    getPhone(item){
      return JSON.parse(item.tokenJsonStr).cellphone;
    },
    tabItem(item){
      this.navBar.forEach((item)=>{
            item.active = false;
      })
      for (let p in this.tab){
         this.tab[p] = false;
      }
      item.active = true;
      this.tab[item.content] = true;
    },
    scrollchanges(){
      this.topOpacity = Math.abs(this.topBoxH - (this.$refs.my.scrollTop- this.topBoxH*0.194))/this.topBoxH;
      let sc = (this.$refs.my.scrollTop-this.topBoxH*0.194)/this.topBoxH;
      this.hOpacity = sc*0.7 >= 0.7 ? 0.7 :sc*0.7;
      if(this.$refs.my.scrollTop >= this.topBoxH*0.8){
          this.mytitle = '星月234';
      }else{
          this.mytitle = '';
      }
      if(!this.start){
          if(this.$refs.my.scrollTop <= this.topBoxH*0.194){
              animation(this.$refs.my,this.topBoxH*0.194,500,'easeOut');
          }
      }
    },
    move(){
      this.start = true;
    },
    end(){
      if(this.$refs.my.scrollTop <= this.topBoxH*0.194){
        animation(this.$refs.my,this.topBoxH*0.194,500,'easeOut');
      }
      this.start = false;
    },
    goRecord(){
      this.$router.push('/record');
    },
    myGoPlay(e,id){
       if(this.getTouchDis(e)<10){
           this.$router.push('/songsdetail/'+id);
       }
    },

    
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';
.my{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:131/$a+rem;
  overflow-y: auto;
  overflow-x:hidden;
  .header-box-custom{
    @include space-between;
    position:fixed;
    left:0;
    right:0;
    top:0;
  }
  .icon-share-box{
        width: 128/$a+rem;
        height:100%;
        @include center;
        .icon-share1{
            color:white;
            font-size:1rem;
        }
  }
  .scroll-content{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:131/$a+rem;
    overflow-y: auto;
    overflow-x:hidden;
  }
  .my-con{
    .main-fixed{
      position: fixed;
      left: 0;
      right:0;
      top:243/$a+rem;
      bottom:131/$a+rem;
      overflow-x: hidden;
      overflow-y: auto;
    }
    width:100%;
    height:auto;
    .c-top-box{
      width: 100%;
      height: 900/$a+rem;
    }
    .c-top{
      width: 100%;
      height: 900/$a+rem;
      border:1px solid transparent;
    color: #fff;
      text-align: center;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      align-items: center;
      .my-avatar{
        margin-top:285/$a+rem;
        height: 214/$a+rem;
        width:214/$a+rem;
        height: 214/$a+rem;
        border-radius:50%;
        img{
          width:214/$a+rem;
          height: 214/$a+rem;
          border-radius:50%;
        }
      }
      .my-name{
          height: 86/$a+rem;
          line-height: 86/$a+rem;
          font-size:1.2em;
          i{
            font-size:.75rem;
          }
      }
      .my-follower{
        height:52/$a+rem;
        span{
          display: inline-block;
          vertical-align: middle;
          opacity:0.8;
        }
        span:nth-child(1){
          margin-right:26/$a+rem;
        }
        span:nth-child(3){
          margin-left:26/$a+rem;
        }
      }
      .my-detail{
        margin-top: 56/$a+rem;
        height: 80/$a+rem;
        line-height:80/$a+rem;
        border:2px solid white;
        border-radius:40/$a+rem;
        width:320/$a+rem;
        opacity:.8;
        font-size:.95em;
        .icon-bianji{
          font-size:.95em;
          margin-right:10/$a+rem;
        }
        a{
          color:white;
        }
      }
    }
    .nav-bar{
      height:106/$a+rem;
      .nav-bar-list{
        width:100%;
        display: flex;
        display: -webkit-flex;
        background:white;
        li{
          width:33.333%;
          text-align: center;
          height: 106/$a+rem;
          line-height:106/$a+rem;
          border-bottom:3px solid transparent;
          color:#5a5b5b;
          span{
            color:#939494;
            font-size:.8em;
            margin-left:8/$a+rem;
          }
        }
        li.active{
          color:$bgcolor;
          border-bottom-color:$bgcolor
        }
      }
    }
    .fixed-nav{
      position: fixed;
      left:0;
      right: 0;
      top:137/$a+rem;
    }
    .love-list{
      .col-title{
        height: 66/$a+rem;
        line-height:66/$a+rem;
        background:#e7e9e9;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        font-size:.9em;
        .songlist-count{
          padding:0 28/$a+rem;
          color:#5f6161;
        }
        .songlist-col{
          padding:0 36/$a+rem;
          color:#8a8b8b;
        }

      }
       #list-ul{
         width:100%;
         background:#f2f4f5;
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
              border-bottom:1px solid #e0e2e3;
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
    }

    .trends{
      .no-event{
         background: #f2f4f5;
         min-height:1044/$a+rem;
         text-align: center;
         border:1px solid transparent;
         .no-e-text{
           display: block;
           color: #666667;
           margin: 150/$a+rem 0;
         }
      }
      .trends-ul{
        background: #f2f4f5;
        min-height:1044/$a+rem;
         .trends-con-li{
             padding:52/$a+rem 26/$a+rem 0 26/$a+rem;
             border-bottom:1px solid #e9ebec;
             .trends-header{
               display:flex;
               display:-webkit-flex;
               align-items: center;
               .trends-header-i-box{
                 width:98/$a+rem;
                 height:98/$a+rem;
                 img{
                   width:98/$a+rem;
                   height:98/$a+rem;
                   border-radius:50%;
                 }
               }
               .trends-header-des{
                  padding-left:26/$a+rem;
                  .myname{
                      color:#386ba4;
                  }
                  .fen{
                    color:#666667;
                  }
                  .fen-time{
                    color:#8f8f90;
                    font-size:.9em;
                    margin-top:5/$a+rem;
                  }
               }
             }
             .trends-text{
               padding-left:122/$a+rem;
               padding-top:6/$a+rem;
               .fen-description{
                 line-height:85/$a+rem;
               }
               .fen-play{
                 height:128/$a+rem;
                 background:#e7e9e9;
                 border:1px solid #e5e7e7;
                 display: flex;
                 display:-webkit-flex;
                 .fen-play-pic{
                   width:127/$a+rem;
                   height: 100%;
                   position: relative;
                   img{
                    width:98/$a+rem;
                    height:98/$a+rem;
                    position:absolute;
                    left:50%;
                    top:50%;
                    transform:translate(-50%,-50%);
                    -webkit-transform:translate(-50%,-50%);
                   }
                   .icon-bofang{
                     position:absolute;
                     left:50%;
                     top:50%;
                     transform:translate(-50%,-50%);
                     -webkit-transform:translate(-50%,-50%);
                     font-size:1rem;
                     color:white;
                   }

                 }
                 .fen-play-text{
                   padding:18/$a+rem 0 10/$a+rem 0;
                   .title{
                     color:#2a2b2b;

                   }
                   .singer{
                      color:#747575;
                      font-size:.9em;
                      margin-top:5/$a+rem;
                   }
                 }
               }
               .fen-more-con{
                 display: flex;
                 display:-webkit-flex;
                 justify-content: space-between;
                 align-items: center;
                 color:#8e9090;
                 font-size:.9em;
                 height:142/$a+rem;
                 .fen-cions{
                    i{
                      font-size:.68rem;
                      margin-right:10/$a+rem;
                      display: inline-block;
                      vertical-align: middle;
                    }
                    .liked,
                    .commented{
                      color:$bgcolor;
                    }
                    span{
                      display: inline-block;
                      vertical-align: middle;
                      height:100%;
                    }
                    .icon-share{
                      font-size:.85rem;

                    }
                    .icon-more3{
                        font-size:.85rem;
                    }
                 }
                 
               }

             }
         }
      }
    }
   .about-me{
     background:#f2f4f5;
     border:1px solid transparent;
     .myinfo-head{
          height:41/$a+rem;
          line-height:41/$a+rem;
          border-left:6px solid $bgcolor;
          padding-left:22/$a+rem;
          color:#191919;
          margin-top:48/$a+rem;
          margin-bottom:24/$a+rem;
          font-weight: normal;
          font-size:1em;
     }
     .myinfo-list{
       padding-bottom:30/$a+rem;
       .infolist-li{
         padding:16/$a+rem 0 16/$a+rem 28/$a+rem;
         .t{
           color:#727374;
         }
         .t-c{
           color:#636464;
         }
         
       }
       .no-info{
         color:#8e9090;
       }

     }
   }

  }
}
</style>

