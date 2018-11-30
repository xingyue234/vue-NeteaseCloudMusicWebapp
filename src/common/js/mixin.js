import {setStore,getStore,removeStore} from '@/service/storage';
import {playUrl,songDetail} from '@/service/getData';

// 定义一个混合对象
export const scrollMixin = {
 data(){
   return{
     tsX:0,
     tsY:0,
     //iscroll配置
     options:{
        mouseWheel: true,
        click: true,
        preventDefault: false,
        tap: false,
        bounce: true,
        disableTouch: false,
        disableMouse:false,
        scrollbars:true,
        fadeScrollbars:true,
        interactiveScrollbars:true,
        shrinkScrollbars:'clip',
        probeType: 2
     },
   }
 },
 computed:{
   songId(){
     return this.$store.state.play.id;
   },
   myplayList(){
     return this.$store.state.myplayList;
   }
 },
 methods: {
    playStart(e) {
      this.tsX = e.changedTouches[0].clientX;
      this.tsY = e.changedTouches[0].clientY;
    },
    getTouchDis(e){
      let sX =  e.changedTouches[0].clientX;
      let sY =  e.changedTouches[0].clientY;
      return Math.sqrt( ( sX - this.tsX )*( sX - this.tsX ) + ( sY - this.tsY )*( sY - this.tsY ) );
    },
    playEnd (e,id,name,singer,singerImg, item){
      if(this.getTouchDis(e) < 10){
         //存储storage
          setStore('nowId',id);
          let storeId = JSON.parse(getStore('playListId'));
          
          if(!storeId){
            setStore('playListId',[id]);
          }
          let noSame = storeId.indexOf(id) == -1;
          if(noSame){
            storeId.unshift(id);
            let s = new Set(storeId);
            let nopIds = [...s];
            if(nopIds.length < 20){
              this.$store.commit('updateplayListId',nopIds);
              setStore('playListId',nopIds);
            }
           //更新播放列表
            let _myplayList = this.myplayList.concat();
            _myplayList.unshift({
                song: item
            })
            this.$store.commit('updatemyplayList',_myplayList);
          }
         

         //提交播放
          if(id == this.songId){
              this.$store.commit('updateshowPlay',true);
           }
          this.$store.commit('updateplayInfo',{
            id,
            name,
            singer,
            singerImg
          })
          this.$store.commit('updateisplaying',true);
          
      }
    },
    playListEnd (e,id,name,singer,singerImg){
      if(this.getTouchDis(e) < 10){
        console.log(singer, 'singer')
        console.log(singerImg, 'singerImg')
          if(id == this.songId){
            this.$store.commit('updateshowPlay',true);
          }
        this.$store.commit('updateplayInfo',{
          id,
          name,
          singer,
          singerImg
        })
        this.$store.commit('updateisplaying',true);
      }
    },
    getArtistsName(ar){
      if(!ar){
        return;
       }
       let artist = [];
       ar.forEach((item)=>{
           artist.push(item.name);
       })
       return artist.join('/');
    },
    getUpdateText (time, type) {
      let T = new Date(time);
      let Y = T.getFullYear();
      let M = T.getMonth() + 1;
      let D = T.getDate();
      let H = T.getHours();
      H = H < 10 ? '0' + H : H;
      let Minutes = T.getMinutes();
      Minutes = Minutes < 10 ? '0' + Minutes : Minutes;
      if (type === 'minutes') {
        return `${M}月${D}日 ${H}:${Minutes}`;
      } else if (type === 'date') {
        return `${M}月${D}日`;
      }
    },
    covertWan(count){
      return count < 10000 ? count : Math.floor(count/10000)+'万';
    },


  },

}