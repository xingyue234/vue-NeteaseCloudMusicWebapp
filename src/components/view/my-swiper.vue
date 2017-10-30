<template>
  <swiper :options="swiperOption" :not-next-tick="notNextTick"  ref="mySwiper">
    <swiper-slide class="swiper-item" v-for="(item,index) in getBanners" :key="index">
      <img :src="item.pic" alt="" v-pic>
      <span class="img-dp">{{item.typeTitle}}</span>
    </swiper-slide>
    <div class="swiper-pagination my-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper' 
import {banners} from '../../service/getData'
  export default {
    data() {
      return {
        notNextTick: true,
        swiperOption: {
          autoplay:3000,
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          autoHeight: true,
          paginationClickable: true,
          mousewheelControl: true,
          loop:true,
          onClick: item => {
            console.log(11111)
          }
        },
        //banners数据
        getBanners:[]
      }
    },
    created(){
       banners.then((res)=>{
              res.data.banners.forEach((item)=>{
                     this.getBanners.push(
                       {
                         pic:item.pic,
                         typeTitle:item.typeTitle
                      }
                     )
              });
        })
    }

  }
</script>

<style lang="scss">
@import 'src/common/css/mixin.scss';
  .swiper-item {

    img{
      width: 100%;
    }
    .img-dp{
      position: absolute;
      right: 0;
      display: inline-block;
      height:60/$a+rem;
      line-height: 60/$a+rem;
      bottom: 20/$a+rem;
      padding: 0 18/$a+rem 0 36/$a+rem;
      background: $bgcolor;
      opacity: .6;
      color:white;
      font-size: 20px;
      border-radius: 36/$a+rem 0 0 36/$a+rem;
    }
  }
  span.swiper-pagination-bullet{
       width: 20/$a+rem;
       height: 20/$a+rem;
       background:gray;
  }
  span.swiper-pagination-bullet-active{
     background:$bgcolor;
  }
  .swiper-container-autoheight{
    //height:500px;
  }
</style>