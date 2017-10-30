<template>
  <div class="left-menu">
    <div :class="{menumain:true,showmain:showLeftMenu}"> 
      <div v-if="myDetail.profile.backgroundUrl != null" class="login-msg" :style="{'background': 'url('+myDetail.profile.backgroundUrl+')'}">
        <template v-if="uid">
           <div class="my-bg-pic">
              <img :src="myDetail.profile.avatarUrl" alt="" class="my-avatar" v-pic @click="goMy">
              <div class="my-name">
                {{myDetail.profile.nickname}} 等级：{{myDetail.level}}
              </div>
           </div>
        </template>
        <template v-else>
          <p class="login-text">登录云音乐</p>
         <input type="button" value="立即登录" class="login-btn" @click="goLogin">
        </template>
      </div>
      <div class="left-list">
        <ul class="l-list-ul">
          <li class="list-li"><i class="iconfont icon-zuijin"></i><span>定时停止播放</span></li>
          <li class="list-li"><i class="iconfont icon-zuijin"></i><span>个性换肤</span></li>
          <li class="list-li"><i class="iconfont icon-zuijin"></i><span>驾驶模式</span></li>
          <li class="list-li"><i class="iconfont icon-zuijin"></i><span>夜间模式</span></li>
        </ul>
      </div>
    </div>
    <div :class="{menumask:true,showmask:showLeftMenu}" @click="changeLeftMenu(false)"></div>
  </div>
</template>
<script>
import {setStore,getStore} from '../../service/storage';
import {mapMutations,mapState} from 'vuex'
import {userDetail} from '@/service/getData'
import {pic} from '@/common/js/directives'

export default {
  name: 'leftmenu',
  data(){
    return {
      myDetail:'',
       
    }
  },
  created(){
    userDetail({
      uid: this.uid
    }).then((res)=>{
      if(res.data.code == 200){
        this.myDetail = res.data;
      }
    }).catch((err)=>{
      console.log(err)
    })
  },
  directives:{
    pic
  },
  computed:{
    ...mapState(['showLeftMenu']),
    uid(){
      return this.$store.state.loginMsg.uid;
    }
  },
  components:{
  },
  methods:{
    ...mapMutations(['changeLeftMenu']),
    goLogin(){
      this.$store.commit('changeLeftMenu',false);
      setTimeout(()=>{
        this.$router.push('/login');
      },800)
    },
    goMy(){
      this.$store.commit('changeLeftMenu',false);
      setTimeout(()=>{
        this.$router.push('/my');
      },800)
    }
  }
}
</script>

<style lang="scss">
@import 'src/common/css/mixin.scss';

/*左侧导航栏*/
  .menumain{
  position: fixed;
  top: 0;
  left:0;
  bottom: 0;
  right: 20%;
  z-index: 99999;
  height: 100%;
  background:white;
  transform: translate3d(-125%,0,0);
  -webkit-transform: translate3d(-125%,0,0);
  transition: transform .6s ease-in;
  transition: -webkit-transform .6s;
  .login-msg{
    position:absolute;
    left:0;
    top:0;
    color:white;
    background-size: 100% 100%;
    width: 100%;
    height:410/$a+rem;
    overflow:hidden;
    text-align: center;
    background:rgba(0,0,0,.7);
    .login-text{
      margin: 100/$a+rem 0;
      color:rgba(255,255,255,.7);
      font-size:.9em;
    }
    .login-btn{
      background:transparent;
      border:1px solid white;
      text-align: center;
      padding:0 100/$a+rem;
      line-height:78/$a+rem;
      color:white;
      border-radius:40/$a+rem;
      font-size:1em;
    }
    .my-bg-pic{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height: 100%;
      text-align: left;
      .my-avatar{
        margin: 107/$a+rem 0 20/$a+rem 26/$a+rem;
        width: 173/$a+rem;
        height:173/$a+rem;
        border-radius:50%;

      }
      .my-name{
        line-height:71/$a+rem;
        font-size:1.1em;
        margin-left:28/$a+rem;
      }
      

    }
  }
  .left-list{
    width:100%;
    position: absolute;
    left:0;
    top:410/$a+rem;
    .l-list-ul{
      padding-top:15/$a+rem;
      .list-li{
        height:107/$a+rem;
        line-height:107/$a+rem;
        padding-left:30/$a+rem;
        span,i{
          display:inline-block;
          vertical-align: middle;
        }
        span{
            color:#393939;
        }
        i{
          margin-right:26/$a+rem;
          font-size:.8rem;
          color:#8f8f8f;
        }
      }

    }

  }
}
.menumask{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 80%;
  z-index: -1;
  background: #000000;
  opacity: 0;
  transition: opacity 0s;
}

/*transition动画*/
.showmain{
    transform: translate3d(0,0,0);
   -webkit-transform: translate3d(0,0,0);
}
.showmask{
    opacity:.2;
    z-index: 99999;
    transition: opacity .4s .4s;
}
</style>


