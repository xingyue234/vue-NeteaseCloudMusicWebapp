export default {
      /**
       * 页面切换
       */
      headerActive:{
        musicActive: false,
        discoverActive: false,
        friendsActive: false
      },
      showLeftMenu:false,              //左侧导航栏显示消失
      playFooter:'play-footer-show',  //解决底部跟随键盘样式问题
      showPlayfooter:true,            //是否显示底部播放条
      /**
       * 歌单详情
       */
      copywriter:'',
      /**
       * 排行
       */
      idx:0,
      /*
      * 搜索信息
      */
      songs:[],
      artists:[],
      page:1,                     //页数
      perpage:10,                 //每页显示数量
      currentSearchValue:'',      //当前正在搜索的值
      searchCount:{
        songs:0,
        artists:0
      },                           //搜索总条数
      searchClass: 'search-main',  //当前显示的搜索分类
      /**
       * 播放信息
       */
      showPlay:false,             //是否显示播放页面 
      play:{                      //当前正在播放的音乐信息
          id:0,
          name:'',
          singer:'',    
          singerImg:''      
      },                       
      isplaying:false,              //是否正在播放
     /**
      * 歌词信息
      */
      lrcData:[],
      duration:0,

      /*
      * 登录信息
      */
      loginMsg:{
        uid:0,
        nickname:''
      },

      /**
       * 个人信息
       */
      userDetail:null,

      /**
       * 显示播放列表
       */
      showPlayList:false,
      isLinktoRecord:0,
      
      /**
       * 播放模式
       */
      playListId:[],
      myplayList:[],
      loop:false,
      /**
       * 提示信息
       */
       pop:{
				title:'',
				position:'bottom',
				show:false
			},
      /**
       * 显示songMore
       */
      showSongMore:false,
      showPlaySongMore:false,
      showSetTime:false,

      /**
       * 定时
       */
      closeTime:false,
      timeDelay:false,

      /**
       * 添加到下一首播放id
       */
       next:{
         id:0,
         name:''
       },
       /**
        * 我创建的歌单
        */
      myCreatePlayList:[],
      showAddToList:false,
      





 

      
}