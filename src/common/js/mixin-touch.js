// 定义一个混合对象
export const Ztouch = {
 data(){
   return{
     startPoint: {   //初始手指位置
       pageX:0,
       pageY:0
     },             
     lastDateNow: 0,//上一次时间戳
     lastTime: 0, //最后一次时间差
     lastDis: 0, //最后一次距离差
     isLR: false, //是否左右滑动
     isFirst:false,

     
   }
 },
 methods: {
   toStart(e){
     this.startPoint.pageX = e.changedTouches[0].pageX;
     this.startPoint.pageY = e.changedTouches[0].pageY;
     this.lastDateNow = Date.now();
     this.lastTime = 0;
     this.lastDis = 0;
     this.isLR = true;
     this.isFirst = true;
   },
   toMove(e){
     if(!this.isLR){
        return;
     }
     let nowPoint = e.changedTouches[0];
     if(this.isFirst){
       this.isFirst =false;
       if(Math.abs(nowPoint.pageX - this.startPoint.pageX) < Math.abs(nowPoint.pageY - this.startPoint.pageY)){
          this.isLR = false;
          return;
			 }
     }
     let dis = nowPoint.pageX - this.startPoint.pageX;
     let DateNow = Date.now()
		 this.lastTime = DateNow - this.lastDateNow;
		 this.lastDis = nowPoint.pageX -this.lastTranslate;
		 this.lastDateNow = DateNow;
		 this.lastTranslate = nowPoint.pageX;
   },
   endSpeed(){
     if(!this.isLR){
		  	return;
	   }
     let speed = this.lastDis/this.lastTime;
		 speed = isNaN(speed)? 0 : speed;
     return speed;
   },
   


  },

}