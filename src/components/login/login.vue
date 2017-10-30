<template>
  <div class="login">
     <my-header>
       <span class="header-text">手机号登录</span>
     </my-header>
     <div class="login-form">
       <form action="" class="forms">
         <input type="text" class="iphone" placeholder="请输入手机号"  v-model="myphone"/>
         <i class="iconfont icon-shouji"></i>
         <i class="iconfont icon-password1"></i>
         <input type="password" class="password" placeholder="请输入密码" v-model="mypassword"/>
         <input type="button" :class="{'submit':true, 'forbiden':!isForbiden}" :value="titleValue" @click="goLogin">
       </form>
     </div>
     <popup 
     :title="p.title" 
     :position="p.position" 
     v-model="p.showpop" 
     :err="p.err">
     </popup>
  </div>
</template>
<script>
import myHeader from '../header'
import popup from './popup'
import {Login} from '../../service/getData';
import {setStore,getStore} from '../../service/storage';

export default {
  name:'login',
  data(){
    return{
      myphone:'',
      mypassword:'',
      titleValue:'登录',
      p:{
        title:'',
        showpop:false,
        position:'top',
      }
    }
  },
  components:{
    myHeader,
    popup
  },
  computed:{
    //是否禁止登录按钮点击
    isForbiden(){
      return !!this.myphone && !!this.mypassword;
    }
  },
  beforeRouteEnter(to, from, next){
    if(getStore('loginInfo')){
         next('/my');
    }else{
      next();
    }
    next();
  },
  created(){
    console.log('login');
    //隐藏底部播放条
		this.$store.commit('updateshowPlayfooter',false);
    //获取storage
    if(getStore('loginInfo')){
        let info = JSON.parse(getStore('loginInfo'));
        this.myphone = info.phone;
        this.mypassword = info.password;
    }
    
  },
  methods:{
    goLogin(){
      if(!this.isForbiden){
          this.p.showpop = true;
          this.p.err = true;
          this.p.title = '账号或密码不能为空!';
          return;
      }
      this.titleValue = '登陆中...';
      Login({
        phone:this.myphone,
        password:this.mypassword
      }).then((res)=>{
            this.titleValue = '登录';
            console.log(res,'登录信息');
            if(res.data.code == 200){
              this.p.showpop = true;
              this.p.title = '登录成功';
              this.p.err = false;
              setTimeout(()=>{
                this.$router.push('/my');
              },2000)
              setStore('loginInfo',{
                 id:res.data.account.id,
                 nickname:res.data.profile.nickname,
                 phone:this.myphone,
                 password:this.mypassword,
              });
              this.$store.commit('updateloginMsg',{
                id:res.data.account.id,
                nickname:res.data.profile.nickname
              });
            }else{
                this.p.showpop = true;
                this.p.err = true;
                this.p.title = '账号或密码错误!';
            }
          
      }).catch((err)=>{
         console.log(err);
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../common/css/mixin.scss';
.login{
  color:white;
  font-size:1.2em;
  .header-text{
     height: 100%;
     line-height:2.28333rem;
   }
.login-form{
  width: 90.83%;
  margin: 49/$a+rem auto;
  position: relative;
  .icon-shouji{
    font-size:1.1rem;
    color:#919293;
    position: absolute;
    left:0;
    top:45/$a+rem;
  }
  .icon-password1{
    font-size:1.3rem;
    color:#919293;
    position: absolute;
    left:0;
    top:170/$a+rem;
  }
  .iphone,
  .password
  {
    font-size:1em;
    width:100%;
    display:block;
    height:150/$a+rem;
    border-bottom: 1px solid #cbcdcd;
    padding-left:100/$a+rem;
    padding-bottom:0;
  }
  .submit{
    width:100%;
    display:block;
    height:110/$a+rem;
    background:$bgcolor;
    text-align: center;
    line-height: 110/$a+rem;
    border-radius: 40/$a+rem;
    margin-top:82/$a+rem;
    color:white;
    font-size:1em;
  }
  .forbiden{
    cursor:not-allowed;
    background: rgba(0,0,0,.5);
  }
}

}

    /*placeholder文字样式*/

    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #c2c3c4;
        font-weight: 100;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #c2c3c4;
        font-weight: 100;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #c2c3c4;
        font-weight: 100;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #c2c3c4;
        font-weight: 100;
    }

</style>

