import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['@/pages/index'], resolve) 
const Find = resolve => require(['@/pages/discovery/discovery'], resolve) 
const myMusic = resolve => require(['@/pages/my_music'], resolve) 
const Friends = resolve => require(['@/pages/friends/friends'], resolve) 
const Search = resolve => require(['@/pages/search/search'], resolve) 
const Rank = resolve => require(['@/pages/discovery/children/rank'], resolve) 
const Recommend = resolve => require(['@/pages/discovery/children/recommend'], resolve) 
const SongList = resolve => require(['@/pages/discovery/children/song-list'], resolve)
const SongListDetail = resolve => require(['@/pages/discovery/song-list-detail'], resolve)
const RankSongs = resolve => require(['@/pages/discovery/children/rank-songs'], resolve)
const FineSong = resolve => require(['@/pages/discovery/fine-song'], resolve)
const Rank2 = resolve => require(['@/pages/discovery/rank2'], resolve)

const My = resolve => require(['@/pages/login/my'], resolve) 
const Login = resolve => require(['@/pages/login/login'], resolve) 
const Record = resolve => require(['@/pages/login/record'], resolve) 
// import Index from '@/pages/index'
// import Find from '@/pages/discovery'
// import myMusic from '@/pages/mymusic'
// import Friends from '@/pages/friends'
// import Search from '@/pages/search/search'
// import Video from '@/pages/discovery/children/video'
// import Radio from '@/pages/discovery/children/radio'
// import Music from '@/pages/discovery/children/music'
// import Login from '@/pages/login/login'
// import My from '@/pages/login/my'
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
    } 
  ]
})
