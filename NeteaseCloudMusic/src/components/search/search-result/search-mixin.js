import searchMenu from './search-menu';
import {searchData} from '@/service/getData';
import { Indicator } from 'mint-ui';
import {mapState} from 'vuex';

export const searchMixin = {
        data(){
          return{
            //iscroll配置
            options:{
                mouseWheel: true,
                click: true,
                preventDefault: true,
                tap: false,
                bounce: true,
                disableTouch: false,
                disableMouse:false,
                scrollbars:true,
                fadeScrollbars:true,
                interactiveScrollbars:true,
                shrinkScrollbars:'clip',
             },
            onLoad:false,   //正在加载
            isNoData:false,          //没有数据了
            onRefresh:false,            //正在刷新
            searchValue:this.$store.state.currentSearchValue,         //存储searchValue 以便监听
          }
        },
        computed:{
          ...mapState([
              'page',
              'songs',
              'artists',
              'getsearchClass',
              'perpage',
              'searchCount',
              'currentSearchValue'
            ]),
            offset(){
              return (this.page-1)*this.perpage;
            },
            
        },
        updated(){
          this.$nextTick(function(){
            setTimeout(()=>{
                this.$refs.myscroll.refresh();
            })
          })
        },
       directives:{
          sign:{
            inserted(el,binding,vnode){
              let result = el.innerHTML.replace (new RegExp(binding.value,'g'),`<b style="color:#4978ac;font-weight:normal">${binding.value}</b>`);
               el.innerHTML = result;
            }
          }
       },
       components:{
           searchMenu
       },
       methods:{
         getData(type,text,count){

            Indicator.open();

            this.$store.commit('updatepage',1);

            searchData({
              type,
              limit:this.perpage,
              offset:this.offset,
              keywords:this.currentSearchValue
            }).then((res)=>{
              if(res.data.code==200 && res.data.result[text].length){
                this.$store.commit('updatesearchData',{
                          [text]:{
                            data: res.data.result[text],
                            isCover: true
                          }                      
                 }) 

                 this.$store.commit('updatesearchCount',{
                          [text]:res.data.result[count]
                 });

                setTimeout(()=>{
                      Indicator.close();
                },300)
                this.$store.commit('updatepage',1);
               // console.log(this.page,this.offset,'newold');   //this.page什么时候加1了？？？？？
              }
            }).catch((err)=>{
              console.log(err);
            })
         },

         load(type,text,count){

            if(this[text].length >= this.searchCount[text]){
                this.isNoData = true;
                setTimeout(()=>{
                  this.isNoData = false;
                },3000)
                console.log('全部完成');
                return false;
            }

              this.onLoad = true;

              this.$store.commit('updatepage',this.page+1);

              searchData({
                  type,
                  limit:this.perpage,
                  offset:this.offset,
                  keywords:this.currentSearchValue
              }).then((res)=>{
                if(res.data.code == 200 && res.data.result[text]){

                    this.$store.commit('updatesearchCount',{
                          [text]:res.data.result[count]
                    });

                    setTimeout(()=>{
                      this.$store.commit('updatesearchData',{
                          [text]:{
                              data: res.data.result[text],
                              isCover: false
                          }
                      });
                      this.onLoad = false;
                    },1000)
                    
                }
              }).catch((err)=>{
                  console.log(err);
              })
              
         },

      },

        

}