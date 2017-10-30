import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['@/components/index'], resolve) 
const Find = resolve => require(['@/components/discovery'], resolve) 
const myMusic = resolve => require(['@/components/mymusic'], resolve) 
const Friends = resolve => require(['@/components/friends'], resolve) 
const Search = resolve => require(['@/components/search/search'], resolve) 
const Rank = resolve => require(['@/components/discovery/children/rank'], resolve) 
const Recommend = resolve => require(['@/components/discovery/children/recommend'], resolve) 
const SongList = resolve => require(['@/components/discovery/children/song-list'], resolve)
const SongListDetail = resolve => require(['@/components/discovery/song-list-detail'], resolve)
const RankSongs = resolve => require(['@/components/discovery/children/rank-songs'], resolve)
const FineSong = resolve => require(['@/components/discovery/fine-song'], resolve)
const Rank2 = resolve => require(['@/components/discovery/rank2'], resolve)

const Play = resolve => require(['../components/play'], resolve) 
const My = resolve => require(['../components/login/my'], resolve) 
const Login = resolve => require(['@/components/login/login'], resolve) 
const Record = resolve => require(['../components/login/record'], resolve) 
// import Index from '@/components/index'
// import Find from '@/components/discovery'
// import myMusic from '@/components/mymusic'
// import Friends from '@/components/friends'
// import Search from '@/components/search/search'
// import Video from '@/components/discovery/children/video'
// import Radio from '@/components/discovery/children/radio'
// import Music from '@/components/discovery/children/music'
// import Login from '@/components/login/login'
// import My from '@/components/login/my'
Vue.use(Router)

export default new Router({
  mode: 'history',     /*去除#，需要后台配置*/
  routes: [
    {
      path: '/',
      alias:'/index',
      component: Index,
      meta: {
        keepAlive:true
      },
      children:[
            {
              path:'/',
              component:Find,
              redirect:'/recommend',      /*首页默认是recommend页，加“/”表示是根路径*/
              children:[
                    {
                      path:'rank',
                      name:'rank',
                      component:Rank
                    },
                    {
                      path:'recommend',
                      name:'recommend',
                      component:Recommend
                    },
                    {
                      path:'songs',
                      name:'songs',
                      component:SongList
                    },
              ]
            },
            {
              path:'songsdetail/:id',
              name:'songsdetail',
              component:SongListDetail
            },
            {
              path:'ranksongs',
              name:'ranksongs',
              component:RankSongs
            },
            {
              path:'finesong',
              name:'finesong',
              component:FineSong
            },
            {
              path:'rank2',
              name:'rank2',
              component:Rank2
            },
            {
              path: 'mymusic',
              name: 'mymusic',
              component: myMusic,
          
            },
            {
              path: 'friends',
              name: 'friends',
              component: Friends,
        
            },
            {
              path: 'search',
              name: 'search',
              component: Search,
            },
      ]

    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/my',
      name:'my',
      component:My
    },
    {
      path:'/record',
      name:'record',
      component:Record
    },
    
  ]
})
