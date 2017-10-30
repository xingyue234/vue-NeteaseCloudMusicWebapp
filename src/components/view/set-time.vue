<template>
  <div class="set-time">
    <div class="set-time-cover" @click="updateshowSetTime(false)"></div>
    <div class="set-time-content">
        <h4>定时停止播放</h4>
        <div class="time-con">
          <ul class="time-ul">
            <li class="time-li" v-for="(item,i) in time" :key="i" @click="goSetTime(item)">
              <span class="time-txt">
                {{item.title}}
              </span>
              <span class="icon-chenck" v-if="item.checked">
                <i class="iconfont icon-checkcopy"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="time-delay">
          <mt-switch v-model="value" @change="changeme"></mt-switch>
          <span class="time-delay-txt">计时结束后播完当前歌曲再停止</span>
        </div>
    </div>

  </div>
</template>
<script>
import { Swithc } from 'mint-ui'
import {mapState,mapMutations} from 'vuex'
export default {
  name:'setTime',
  data(){
    return{
      time:[
        {
          title:'不开启',
          checked:false
        },
        {
          title:'1分钟后',
          checked:false
        },
        {
          title:'20分钟后',
          checked:false
        },
        {
          title:'30分钟后',
          checked:false
        },
        {
          title:'45分钟后',
          checked:false
        },
        {
          title:'60分钟后',
          checked:false
        }
      ],
      value:false,
    }
  },
  created(){
    if(isNaN(this.closeTime)){
      this.time[0].checked = true;
    }else{
      this.time.forEach((item)=>{
            item.checked = false;
            if(parseInt(item.title) === this.closeTime){
                item.checked = true;
            }
     })
    }
  },
  computed:{
    ...mapState(['closeTime','pop','timeDelay','updatetimeDelay']),
  },
  methods:{
    ...mapMutations(['updateshowSetTime','updatecloseTime']),
   goSetTime(item){
     let minutes = parseInt(item.title);
     this.$store.commit('updatecloseTime',minutes);
     this.$store.commit('updateshowSetTime',false);
     setTimeout(()=>{
        this.$store.commit('updatepop',{
             title:`设置成功，将于${minutes}分钟后关闭`,
             show:true
        })
     },200)
   },
   changeme(v){
     this.$store.commit('updatetimeDelay',!v);
   },


  }
}
</script>
<style lang="scss" scoped>
@import 'src/common/css/mixin.scss';


.set-time{
  .set-time-cover{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    z-index: 222222;
    background: rgba(0,0,0,.5);
  }
  .set-time-content{
    background: #f3f3f3;
    width:78.12%;
    color:#272727;
    position: fixed;
    left:50%;
    top:296/$a+rem;
    bottom:358/$a+rem;
    transform: translateX(-50%);
    z-index: 222222;
    overflow: hidden;
    padding-left:56/$a+rem;
    padding-top:10/$a+rem;
    border-radius:14/$a+rem;
    h4{
      height:152/$a+rem;
      line-height:152/$a+rem;
      font-weight: normal;
      font-size:1.1em;
    }
    .time-con{
      .time-ul{
        .time-li{
          height: 120/$a+rem;
          line-height:120/$a+rem;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .icon-chenck{
            width: 154/$a+rem;
            @include center;
              i{
                color:$bgcolor;
                font-size:1rem;
              }
          }
        }

      }

    }
    .time-delay{
      height: 128/$a+rem;
      line-height: 128/$a+rem;
      color:#5d5d5d;
      display: flex;
      display: -webkit-flex;
      .time-delay-txt{
        margin-left:18/$a+rem;
      }

    }

  }

}

</style>

