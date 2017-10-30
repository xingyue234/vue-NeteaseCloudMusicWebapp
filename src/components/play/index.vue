<template>
	<transition name="slide-in">
		<div class="play">
		<img :src="getPlayinfo.singerImg" alt="" class="bg-img">
		<div class="cover-img-bg"></div>
		<img :src="getPlayinfo.singerImg" alt="" class="bg-img front">
		<header class="header-box header-custom"  :style="{'background-color': 'transparent'}">
      <a @click="updateshowPlay(false)" href="javascript:;" class="back"></a>
      <div class="title-box">
				<span class="title" v-over>{{getPlayinfo.name}}</span>
			    <span class="singer">{{getPlayinfo.singer}}</span>
			</div>
			<span class="icon-box"><i class="iconfont icon-share1"></i></span>
    </header>
		<audio :src="PlayUrl" ref="radio" :autoplay="isautoplay" :loop="loop"
			@play= "play"
			@pause= "pause"
			@canplay="canplay"
		></audio>
		<transition>
			<div :class="{'play-front':true,'show-me':playFront}"  
			@touchstart="toggleBFstart"
			@touchmove="togglemove"
			@touchend="toggleBFend"
			>
     <div class="play-bar">
			 <img src="../../assets/images/play-bar-s.png" alt="" class="play-br-pic-s">
			 <img src="../../assets/images/play-bar.png" alt="" 
			 :class="{'play-br-pic':true,'play-br-pic-rotate':isplaying}">
     </div>
     <div class="rotate-img">
			 <div :class="[{'rotate-img-wrap':true},{wrap1:true}]"  :style="{transform:'translate3d('+transSongs+'px,0,0)',transition:tranwrap}">
					<div :class="{'rotate-img-bg':true,'rotate-img-on':isplaying}" ref="targetdiv">
           <div class="rotate-img-center">
              <img :src=" getPlayinfo.singerImg " alt="" v-pic>
           </div>
          </div>
				</div>
        <div :class="[{'rotate-img-wrap':true},{wrap2:true}]"  :style="{transform:'translate3d('+transSongs+'px,0,0)',transition:tranwrap}">
					<div :class="{'rotate-img-bg':true,'rotate-img-on':isplaying}" ref="targetdiv">
           <div class="rotate-img-center">
              <img :src=" getPlayinfo.singerImg " alt="" v-pic>
           </div>
          </div>
				</div>
				<div :class="[{'rotate-img-wrap':true},{wrap3:true}]"  :style="{transform:'translate3d('+transSongs+'px,0,0)',transition:tranwrap}">
					<div :class="{'rotate-img-bg':true,'rotate-img-on':isplaying}" ref="targetdiv">
           <div class="rotate-img-center">
              <img :src=" getPlayinfo.singerImg " alt="" v-pic>
           </div>
          </div>
				</div>
     </div>
     <div class="like-load-c">
         <span class="icon-m-list" @touchstart.stop="Like">
					 <i class="iconfont icon-like" v-if="iconUnlike"></i>
					 <i class="iconfont icon-__ " v-if="iconLike"></i>
					</span>
         <span class="icon-m-list"><i class="iconfont icon-xiazai1"></i></span>
         <span class="icon-m-list"><i class="iconfont icon-pinglun1"></i></span>
         <span class="icon-m-list" @touchstart.stop.prevent="showMore"><i class="iconfont icon-more3"></i></span>
     </div>
    </div>
		</transition>
	 <transition>
		 <div :class="{'play-back':true,'show-me':playBack}">
		 <div class="vol-control">
			   <span class="vol-icon">
					 <i class="iconfont icon-volume-"></i>
				 </span>
         <div class="control-bar" ref="volControl">
            <div class="control-bar-bg" :style="{width:vol.voldisX+'px'}"></div>
						<div class="hide-vol-click" @touchstart="changeVol"></div>
						<span class="vol-control-dot" :style="{transform:'translateX('+vol.voldisX+'px)'}"></span>
						<span class="vol-control-dots"
						 @touchstart="VolStart"
						 @touchmove="VolMove"
						 @touchend="VolEnd"
						 :style="{transform:'translateX('+vol.voldisX+'px)'}"
						>
						</span>
				 </div>
		 </div>
     <div class="play-lyric-box" ref="lyricBox"  
		    @touchstart="toggleBFstart"
	    	@touchend="toggleBFend" >
          <ul class="play-lyric-list" v-if="lrcData.length">
						<li :class="{'play-lyric-text':true,'play-lyric-text-active':index == activeIndex}" v-for="(item,index) in lrcData" :key="index">
							{{ item.lrc }}
						</li>
					</ul>
					<div v-else class="no-lyric">
					 	Sorry,暂时没有歌词~
					</div>
		 </div>
	 </div>
	 </transition>
		<div class="play-fotter-box">
			<div class="slider-box-s">
				<span class="current-time">{{convertTime(currentTime)}}</span>
				<div class="slider-box" ref="myslider">
					<!--slider播放条开始-->
					<div class="slider-bar" id="slider"   ref="slider"
							>
							<div class="hide-click" 	@touchstart="jump"></div>
							<div class="slider-bg" :style="{width: disX + 'px'}">
							</div>
							<div class="load-progress"></div>
							<span class="slider-dot" ref="dots"
									@touchstart="sliderStart"
									@touchmove="sliderMove"
									@touchend="sliderEnd"
									:style="{transform:'translate3d('+disX+'px,0,0)'}"
									>
								</span>
						</div>
						<!--slider播放条结束-->
				</div>
				<span class="duration">{{convertTime(duration)}}</span>
			</div>
			<div class="control-box">
				<div class="play-type-icon" @click="changePlayType">
					<i :class="[{iconfont:true}, playClass]"></i>
				</div>
				<div  class="play-pause-center">
					<span class="more-i-b" @click="playPrevSong(true)"><i class="iconfont icon-more prev"></i></span>
					<span class="bofang-i-b" @click="bofang">
						<i :class="{'iconfont':true, 'icon-bofang':!isplaying,'icon-zanting':isplaying}"></i>
						</span>
					<span class="more-i-b"  @click="playNextSong(true)"><i class="iconfont icon-more"></i></span>
					
				</div>
				<div  class="play-list-icon" @click="updateshowPlayList(true)">
					<i class="iconfont icon-gengduo"></i>
				</div>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
import myHeader from '../header'
import {lyric,playUrl,songDetail,like} from '@/service/getData';
//import {TextArr,SecondArr} from '@/assets/others/lyric'
import { mapMutations,mapGetters,mapState } from 'vuex'
import {animation} from '@/common/js/animation-scroll'
import {pic} from '@/common/js/directives';

export default{
	name:'play',
	data(){
		return{
			currentTime:0,    //当前播放位置 时间
			timer:null,        //监听currentTime的值
			transformRotate:0,        //图片当前旋转值
			playFront:true,
			playBack:false,
			id:0,     //当前播放的id
			isPlayings:false,   //暂时存储isplaying的值，以便监听
//  slider播放条数据
			sliderstart:false,            //开始touch
			disX:0,   //当前位移,滑块位移和背景长度
			startX:0,      //box的offsetLeft
			boxW:0,
//音量slider状态
     vol:{
			  volStart:false,
				voldisX:0,
				volLeft:0,
				volboxW:0,
				currentVol:0
		 },
		 //防止误触
		 startPosX:0,
		 startPosY:0,
		 endPos:0,
		 transSongs:0,
		 tranwrap:'',
		 wrap:'',
		 PlayUrl:'/static/tonghuazheng2.mp3',   //播放url
//歌词
			activeIndex:-1,

	//操作
	   iconUnlike:true,
		 iconLike:false,
		 /*
		 ** 播放模式
		 */
		 playClass:'icon-xunhuan',
		 playType:[
          {
            text:'列表循环',
            Class:'icon-xunhuan'
          },
          {
            text:'随机播放',
            Class:'icon-suijibofang'
          },
          {
            text:'单曲循环',
            Class:'icon-danquxunhuan'
          }
      ],
			i:0,
			//定时
			time:false,

		}
	},
	directives:{
		over: {
				inserted: function (el) {
             let len = el.innerHTML.split('').length;
						 if(len >= 14){
                el.className += ' ' + 'move';
						 }else{
							 el.className.replace('move','');
						 }
				}
     },
		 pic

	},
	computed:{
		...mapState([
				'showPlayList',
				'playListId',
				'lrcData',
				'duration',
				'pop',
				'loop',
				'timeDelay'
		]),
		...mapGetters(['playListIdType']),
		getPlayinfo(){
			this.id = this.$store.state.play.id;
			return this.$store.state.play;
		},
		//是否正在播放
		isplaying(){
			this.isPlayings = this.$store.state.isplaying;
			return this.$store.state.isplaying;
		},
		isautoplay(){
			return this.$store.state.isplaying;
		},
		closeTime(){
			this.time = this.$store.state.closeTime;
			return this.$store.state.closeTime;
		},
		
	},
	watch:{
		time(v){
			if(v === 0){
				this.$store.commit('updateisplaying',false);
			}
		},
    id(newValue){
      this.getSongData(newValue);
		},
		isPlayings(play){
			if(play){
					this.$refs.radio.play();
				}else{
					console.log('定时paused');
					this.$refs.radio.pause();
			}
		}
	},
	mounted(){
		setTimeout(()=>{
			this.vol.currentVol = this.$refs.radio.volume;
		  this.vol.voldisX  = this.$refs.volControl.offsetWidth;
		},0)
	},
	created(){
    this.getSongData(this.$store.state.play.id);
	},
	components:{
		myHeader,
	},
	methods:{
		...mapMutations(['updateshowPlay','updateshowPlayList']),
		/*
		**更新播放数据
		*/
		getSongData(id){
			 this.$store.commit('updatelrcData',[]);//清空之前的歌词
				//获取歌词
				lyric({
					id
				}).then((res)=>{
						if(res.data.code == 200){
								let list = res.data.lrc.lyric.split('\n').join('');
								let a = list.split('[');
								a.splice(0,1);  //去除第一个空元素
								let tempLrcData = [];
								a.forEach((v,i)=>{
									let arr = v.split(']');
									if(arr[1].trim() !== ''){  //过滤为空的歌词
											let T = arr[0].match(/(.+)?\:(.+)?\.(.+)?/);
								    	let minutes =  Math.round((+T[1]*60) + (+T[2]) + (+T[3]/1000));
											tempLrcData.push({
												minutes,
												lrc:arr[1]
											})
											this.$store.commit('updatelrcData',tempLrcData);
									}
									
								})
						}
				}).catch((err)=>{
					console.log(err);
				})
				//获取播放url
				playUrl({
					id
				}).then((res)=>{
					console.log(res,'播放url');
					if(res.data.code == 200 && res.data.data[0].url){
						this.PlayUrl = res.data.data[0].url;
					}else{
						this.PlayUrl = '';
						this.$store.commit('updateisplaying',false);
						this.$store.commit('updatepop',{
							show:true,
							title:'sorry,因为版权原因无法播放~'
						})
					}
				}).catch((err)=>{
					console.log(err)
				})
				/*
				**获取歌曲详情
				*/
				songDetail({
					ids:id
				}).then((res)=>{
						if(res.data.code == 200){
								this.$store.commit('updateplayInfo',{
									name: res.data.songs[0].name,
									singer: this.getArtists(res.data.songs[0].ar),
									singerImg: res.data.songs[0].al.picUrl
								})
						}
				}).catch((err)=>{
					console.log(err)
				})
		},
		getArtists(ar){
        let arName = [];
        ar.forEach((item)=>{
          arName.push(item.name);
        })
        return arName.join('/');
    },
		playNextSong(isClick){
			if(isClick){
			  	//console.log('回到列表循环');
          this.$store.commit('updateplayListId',this.playListIdType.xunhuan);
			}
			let index = 0;
			this.playListId.forEach((id,i)=>{
						if(this.id == id){
							index = i;
						}
			})
			index = index == this.playListId.length - 1 ? 0 : index + 1;
			this.id = this.playListId[index];
			this.$store.commit('updateplayInfo',{
				id:this.id
			})
			this.$store.commit('updateisplaying',true);
		},
		playPrevSong(isClick){
			if(isClick ){
          this.$store.commit('updateplayListId',this.playListIdType.xunhuan);
			}
			let index = 0;
			//console.log(this.id,'之前的');
			this.playListId.forEach((id,i)=>{
						if(this.id == id){
							index = i;
						}
			})
			index = index == 0 ? this.playListId.length - 1 : index - 1;
			this.id = this.playListId[index];
			this.$store.commit('updateplayInfo',{
				id:this.id
			})
			this.$store.commit('updateisplaying',true);
		},
		changePlayType(){
			this.$store.commit('updateloop',false);
			this.i++;
			if(this.i >= this.playType.length){this.i = 0};
      this.playClass = this.playType[this.i].Class;
			this.$store.commit('updatepop',{
				 show:true,
				 title:this.playType[this.i].text
			});
			if(this.playClass == 'icon-xunhuan'){
            this.$store.commit('updateplayListId',this.playListIdType.xunhuan);
			}else if(this.playClass == 'icon-suijibofang'){
            this.$store.commit('updateplayListId',this.playListIdType.suiji);
			}else if(this.playClass == 'icon-danquxunhuan'){
				    this.$store.commit('updateloop',true);
			}
		},
		//自动播放函数
		play(){
		   clearInterval(this.timer);
	     this.timer = null;
			 this.boxW = this.$refs.myslider.offsetWidth;
		   this.timer = setInterval(()=>{
		   	  this.currentTime = this.$refs.radio.currentTime;
					this.$emit('getCurTime',this.currentTime);
				  this.disX = Math.round(this.currentTime/this.duration*this.boxW); 
					/*
					** 当前音乐播放完成
					*/
				  if( Math.ceil(this.currentTime) >= Math.floor(this.$refs.radio.duration)){
					    this.disX = this.boxW;
							//播放完一首继续下一首
							this.playNextSong();
				  }
					//歌词播放计算位移
			    this.calTranslate(this.currentTime);
		   },1000)
	    },
	    pause(){
	    	clearInterval(this.timer);
	    	this.timer = null;
	    },
		canplay(e){
			e = e || event;
			this.$store.commit('updateduration',e.target.duration);
		},
		stopPlay(){
				setTimeout(()=>{
				 	  this.$refs.radio.pause();
						this.$store.commit('updateisplaying',false);
						clearInterval(this.timer);
						this.timer = null;
				},500);
		},
		//点击播放
		bofang(){
			//获取slider-box高度
     this.boxW = this.$refs.myslider.offsetWidth;
		 if(this.isplaying){
			 this.stopPlay();
		 }else{
			  this.startPlay();
		 }
		},
		startPlay(){
			if(this.disX >= this.boxW){
          this.disX = 0;
			}
			this.$refs.radio.play();
			this.$store.commit('updateisplaying',true);
		},
		//转换成网页显示时间
		convertTime(Time){
      let minutes =	Math.floor(Time/60);
			minutes = minutes < 0 ? '0' + minutes : minutes; 
			let seconds = Math.round(Time%60);
			seconds = seconds < 10 ? '0' + seconds : seconds;
			return minutes + ':' + seconds;
		},
		

		/*
		* slider播放条方法
		*/
		jump(e){
			//手指按下时跳转到固定位置
			this.disX = e.touches[0].pageX - this.$refs.slider.offsetLeft;
			this.boxW = e.touches[0].target.parentElement.offsetWidth;
			this.currentTime = Math.ceil(this.disX/this.boxW*this.duration)
			this.$refs.radio.currentTime = this.currentTime;
			this.$emit('getCurTime',this.currentTime);
			//计算位移
			this.calTranslate(this.currentTime);
		},
		sliderStart(e){
			clearInterval(this.timer);   //touch时停止自动播放
			//如果duration还没获取到，禁止拖动
			if(!this.duration){
				return;
			}
			this.sliderstart = true;
			this.boxW = e.touches[0].target.parentElement.offsetWidth;
			this.startX = e.touches[0].target.parentElement.offsetLeft;
		},
		sliderMove(e){
			if(this.sliderstart){
				let el = e.touches[0].target;
				this.disX = e.touches[0].pageX - this.startX;
				if(this.disX < 0){
					this.disX = 0;
				}else if(this.disX > this.boxW){
					this.disX = this.boxW;
				}
				//修改currentTime
				this.currentTime = Math.ceil(this.disX/this.boxW*this.duration);
			}
		},
		sliderEnd(e){
			this.sliderstart = false;
			this.$refs.radio.currentTime = this.currentTime;
			this.$emit('getCurTime',this.currentTime);
			//计算位移
			this.calTranslate(this.currentTime);
		},
		//根据currentTime计算位移
		calTranslate(curTime){
			this.lrcData.forEach((item,i)=>{
					if(Math.round(curTime) == item.minutes){
						  let boxH =  this.$refs.lyricBox.offsetHeight*0.38;
							let dis = this.$refs.lyricBox.children[0].children[i].offsetTop;
							animation(this.$refs.lyricBox,dis-boxH,500);
							this.activeIndex = i;
					}
			})
		},
		toggleBFstart(e){
			this.startPosY = e.changedTouches[0].clientY;
			this.startPosX = e.changedTouches[0].clientX;

      this.tranwrap = 'none';
			this.transSongs = 0;
		},
		togglemove(e){
			let DisX = e.changedTouches[0].clientX;
			let DisY = e.changedTouches[0].clientY;
			let dis = DisX - this.startPosX;
			
			this.transSongs = dis;
      
		},
		toggleBFend(e){
			this.endPosY = e.changedTouches[0].clientY;
			this.endPosX = e.changedTouches[0].clientX;
			let disY = this.endPosY - this.startPosY;
			let disX = this.endPosX - this.startPosX;
			if( Math.abs(disY) < 10 && Math.abs(disX) < 10){
					this.playFront = !this.playFront;
					this.playBack = !this.playBack;
			}
      
			let W = e.changedTouches[0].target.offsetWidth;
			this.tranwrap = 'all .5s';
			if( disX < 0 ){
				let a = Math.abs(disX/W*2) > 0.5 ? '-100%' : 0;
        this.transSongs = Math.abs(disX/W*2) > 0.5 ? '-100%' : 0;
			}else if( disX > 0 ){
        this.transSongs = Math.abs(disX/W*2) > 0.5 ? 0 : '100%';
			}
		},
		//音量调节方法
		VolStart(e){
			  this.vol.volStart = true;
	    	this.vol.volLeft =	e.touches[0].target.parentElement.offsetLeft;
				this.vol.volboxW = e.touches[0].target.parentElement.offsetWidth;
		},
		VolMove(e){
        if(this.vol.volStart){
             this.vol.voldisX = e.touches[0].clientX - this.vol.volLeft;
						 if(this.vol.voldisX < 0){
                 this.vol.voldisX = 0;
						 }else if(this.vol.voldisX > this.vol.volboxW){
							   this.vol.voldisX = this.vol.volboxW;
						 }
				}
		},
		VolEnd(e){
      this.vol.currentVol = this.vol.voldisX/this.vol.volboxW;
			this.$refs.radio.volume = this.vol.currentVol;
		},
		changeVol(e){
			this.vol.voldisX = e.changedTouches[0].clientX -	e.changedTouches[0].target.parentElement.offsetLeft;
			this.vol.volboxW = e.changedTouches[0].target.parentElement.offsetWidth;
			this.vol.currentVol = this.vol.voldisX/this.vol.volboxW;
      this.$refs.radio.volume = this.vol.currentVol;
		},
		//like方法
		Like(){
			this.iconUnlike = !this.iconUnlike;
		  this.iconLike = !this.iconLike;
			if(this.iconLike){
				like({
					id:this.id,
					like:true
				}).then((res)=>{
					console.log(res,'喜欢音乐');
					if(res.data.code == 200){
						this.$store.commit('updatepop',{
							title:'喜欢成功',
							show:true
						})
					}
				})
			}
			if(this.iconUnlike){
				like({
					id:this.id,
					like:false
				}).then((res)=>{
					console.log(res,'取消喜欢音乐');
					if(res.data.code){
						this.$store.commit('updatepop',{
							title:'取消喜欢',
							show:true
						})
					}
				})
			}
		},
		showMore(){
			this.$store.commit('updateshowPlaySongMore',true);
		},




		
	},
	
}
</script>

<style lang="scss" scoped>
@import '../../common/css/mixin.scss';

@import './slider.scss';
.play{
	overflow: hidden;
	.bg-cover{
		  background:rgba(0,0,0,.4);
      position:fixed;
			top:0;
			left:0;
			right:0;
			height:42%;
			z-index:210;
	}
	.header-box{
  background: $bgcolor;
  width: 100%;
  height: 137/$a+rem;  /*137*/
  display: flex;
  display: -webkit-flex;
  position: relative;
  z-index: 10;
 }
.back{
  width: 15.625%;     /*149*/
  height: 100%;
  background: url('../../assets/images/search-back.png') no-repeat 0 0;
  background-size: 149/$a+rem 137/$a+rem;   /*149*/  /*137*/
}
	.header-custom{
		z-index: 110;
	}
	color: white;
	position:fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	z-index:9999;
	.bg-img{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	.cover-img-bg{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index:104;
		background-color:rgba(0,0,0,.5);
	}
	.front{
   -webkit-filter: blur(28px); /* Chrome, Opera */
			-moz-filter: blur(28px);
			-ms-filter: blur(28px);    
					filter: blur(28px); 
					z-index:102; 
	}
	.title-box{
		width:71.041%;
		height:100%;
		color:white;
		position: relative;
		overflow: hidden;
		span.title{
			position: absolute;
      left:0;
			top:18/$a+rem;
			display: block;
			font-size: .7rem;
			white-space: nowrap;
		}
		span.move{
     animation: titlemove 8s linear 5s infinite;
		 -webkit-animation: titlemove 8s linear 5s infinite;
		}
		span.singer{
			position: absolute;
			left:0;
			top:76/$a+rem;
			width:100%;
			display: block;
			color: rgba(255,255,255,.7);
			font-size: .6rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			
		}
		
	}
	.icon-box{
		width: 13.333%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		i{
		   color: white;
		   font-size: 1.3rem;
		}
		
	}
	
	.play-fotter-box{
		height: 320/$a+rem;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 104;
		.slider-box-s{
			width: 100%;
			height: 105/$a+rem;
			line-height: 105/$a+rem;
			color:rgba(255,255,255,.8);
			display: flex;
			display: -webkit-flex;
			align-items: center;
			padding: 0 50/$a+rem;
			font-size:.9em;
			justify-content: space-between;
			.slider-box{
         width: 704/$a+rem;
				 height:5px;
				 margin: 0 20/$a+rem;
			}
			.current-time{
				display: inline-block;
				font-size:.6rem;
			}
			.duration{
				display: inline-block;
				font-size:.6rem;
			}
		}
		.control-box{
			height: 215/$a+rem;
			display: flex;
			display: -webkit-flex;
			
			.play-type-icon{
				width: 154/$a+rem;
				font-size: 1.4rem;
				height: 170/$a+rem;
				display: flex;
			    display: -webkit-flex;
			    justify-content: center;
			    align-items: center;
			    i{
			    	font-size: 1.2rem;
						color:rgba(255,255,255,.8);
			    }
			}
			.play-pause-center{
				width:653/$a+rem;
				padding: 0 40/$a+rem;
				display: flex;
				display: -webkit-flex;
				.more-i-b{
					width: 160/$a+rem;
					height: 170/$a+rem;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					i{
						font-size: 1.5rem;
					}
					i.prev{
						transform: rotate(180deg);
					}
				}
				.bofang-i-b{
					width: 224/$a+rem;
					margin: 0 15/$a+rem;
					height: 170/$a+rem;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					i{
						font-size: 1.8rem;
							color:rgba(255,255,255,.9);
					}
				}
			}
			.play-list-icon{
				width: 154/$a+rem;
				height: 169/$a+rem;
				font-size: 1.4rem;
				display: flex;
			    display: -webkit-flex;
			    justify-content: center;
			    align-items: center;
			    i{
			    	font-size: 1.2rem;
						color:rgba(255,255,255,.7);
			    }
			}
		}
	}
	
}

.play-back{
    position: fixed;
    width:100%;
    top:137/$a+rem;
    bottom:320/$a+rem;
    z-index: 120;
		opacity: 0;
		transition: all .4s;
		-webkit-transition: all .4s;
		.vol-control{
			height: 48/$a+rem;
			display: flex;
			display: -webkit-flex;
			align-items: center;
			justify-content: center;
			.vol-icon{
				margin-right:46/$a+rem;
        i{
					font-size:.8rem;
					color: rgba(255,255,255,.6);
				}
			}
			.control-bar{
        width:728/$a+rem;
				background: rgba(255,255,255,.3);
				position: relative;
				height: 5px;
				border-radius: 6px;
				.hide-vol-click{
					position: absolute;
					width:100%;
					height:52/$a+rem;
					background: rgba(0,0,0,.7);
					left:0;
					top:0;
					transform: translateY(-50%);
					z-index: 333;
					opacity: 0;
				}
				.control-bar-bg{
							width:100%;
							height:100%;
							background: rgba(255,255,255,.7);
							position: absolute;
							left:0;
							top:0;
							border-radius: 6px;
							z-index: 111;
				}
				.vol-control-dots{
					    width:50/$a+rem;
							height:50/$a+rem;
							background:red;
							border-radius:50%;
							position:absolute;
							left:-25/$a+rem;
							top:-25/$a+rem;
							opacity: 0;
							border-radius: 50%;
							z-index: 555;
				}
				.vol-control-dot{
              width:30/$a+rem;
							height:30/$a+rem;
							background:white;
							border-radius:50%;
							position:absolute;
							left:-15/$a+rem;
							top:-15/$a+rem;
							transition:width .5s ease;
							-webkit-transition:width .5s ease;

				}
			}

		}
		.play-lyric-box{
			width: 100%;
			position: absolute;
			top:48/$a+rem;
			left:0;
			right: 0;
			bottom:0;
			overflow-x: hidden;
			overflow-y: auto;
			.play-lyric-list{
				 transition: all 1s ease;
				 -webkit-transition: all 1s ease;
				 padding:564/$a+rem 0;
				 .play-lyric-text{
					 padding:32/$a+rem 0;
					 line-height:55/$a+rem;
					 max-width: 80%;
					 margin: 0 auto;
					 color:rgba(255,255,255,.6);
					 transition: all 1s ease;
					 -webkit-transition: all 1s ease;
					 text-align: center;
				 }
				 .play-lyric-text-active{
					  color:rgba(255,255,255,1);
						transform: scale(1.15);
					  -webkit-transform: scale(1.15);
					}
			}
			.no-lyric{
				width:100%;
				text-align:center;
				margin-top:3rem;
				color:white;
			}
		}

}

.play-front{
    position: fixed;
    width:100%;
    top:137/$a+rem;
    bottom:320/$a+rem;
		overflow-x: hidden;
    overflow-y: auto;
		border-top: 1px solid rgba(255,255,255,.1);
		z-index: 105;
		opacity: 0;
		transition: all .4s;
		-webkit-transition: all .4s;
    .play-bar{
      height:166/$a+rem;
			position: relative;
			.play-br-pic-s{
				position: absolute;
				 width: 1.14rem;
         left: 7.58rem;
				 z-index: 777;
				 top: -34/$a+rem;
			}
			.play-br-pic{
				position: absolute;
         left: 6.9999rem;
				 width: 4.9rem;
				 top: -10/$a+rem;
				 transition: all 1s;
				 -webkit-transition: all 1s;
				 z-index:666;
			}
			.play-br-pic-rotate{
         transform: rotate(-25deg);
				 -webkit-transform: rotate(-25deg);
				 transform-origin:20% 10.81%;
				 -webkit-transform-origin:20% 10.81%;
			}
			
    }
    .rotate-img{
      margin: auto;
      width: 722/$a+rem;
      height:722/$a+rem;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
      display: flex;
      display: -webkit-flex;
			.rotate-img-wrap{
				width:100%;
				position:fixed;
				left:0;
				top:314/$a+rem;
				transition:transform .5s;
				-webkit-transition:transform .5s;
			}
			.wrap1{
				left:-100%;
			}
			.wrap3{
				left:100%;
			}
      .rotate-img-bg{
        margin: auto;
        width: 700/$a+rem;
        height: 700/$a+rem;
        background: url('../../assets/images/play_bg.png') no-repeat;
        background-size:  700/$a+rem 700/$a+rem;
        display: flex;
        display: -webkit-flex;
        animation-fill-mode: forwards;
				animation:CDturn 18s linear infinite;
				-webkit-animation:CDturn 18s linear infinite;
				animation-play-state:paused;
				-webkit-animation-paly-state:paused;
        .rotate-img-center{
          margin:auto;
          img{
            width:480/$a+rem;
            height: 480/$a+rem;
            border-radius: 50%;
          }

        }
      }
      .rotate-img-on{
				 animation-play-state:running;
       -webkit-animation-paly-state:running;
      }
      @keyframes CDturn{
        from{transform:rotate(0deg)}
        to{transform:rotate(360deg)}
      }
      @-webkit-keyframes CDturn{
        from{-webkit-transform:rotate(0deg)}
        to{-webkit-transform:rotate(360deg)}
      }
    }
		.like-load-c{
        height: 126/$a+rem;
				width:100%;
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				margin-top: 200/$a+rem;
				position: relative;
        z-index: 20;
				.icon-m-list{
					 width:189/$a+rem;
					 height: 100%;
					 display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					i{
						color:rgba(255, 255, 255, .7);
					}
					.icon-like{
             font-size:1rem;
					}
					.icon-xiazai1{
            font-size:1.2rem;
					}
					.icon-pinglun1{
             font-size:1.2rem;
					}
					.icon-more3{
             font-size:1.2rem;
					}
					.icon-__{
						 font-size:.9rem;
						 color:$bgcolor;
					}



	    	}
  }
}
.show-me{
	opacity: 1;
	z-index: 122;
}

::-webkit-scrollbar {/*隐藏滚轮*/
   display: none;
}

@keyframes titlemove
{
 from {
	transform: translateX(0);
	-webkit-transform: translateX(0);
 }
 to {
	transform: translateX(-100%);
	-webkit-transform: translateX(-100%);
	}
}

@-webkit-keyframes titlemove /*Safari and Chrome*/
{
from {
	transform: translateX(0);
	-webkit-transform: translateX(0);
	}
to {
	transform: translateX(-100%);
	-webkit-transform: translateX(-100%);
	}
}

</style>