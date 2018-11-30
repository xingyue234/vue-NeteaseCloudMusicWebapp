<template>
  <swiper :options="swiperOption" :not-next-tick="notNextTick"  ref="mySwiper">
    <swiper-slide class="swiper-item" v-for="(item,index) in getBanners" :key="index">
      <router-link class="swiper-item-link" v-if="item.targetId" :to="'/songsdetail/' + item.targetId">
        <img :src="item.imageUrl" alt="" v-pic>
      </router-link>
      <a  class="swiper-item-link"  :href="item.url" target="_blank" v-else-if="item.url">
        <img :src="item.imageUrl" alt="" v-pic>
      </a>
      <img v-else :src="item.imageUrl" alt="" v-pic>
      <span class="img-dp" :style="{'background-color': item.titleColor}" v-show="item.typeTitle">{{item.typeTitle}}</span>
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
          autoplay:false,
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
              this.getBanners = res.data.banners || []
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
  .swiper-item-link{
    width: 100%;
  }
</style>