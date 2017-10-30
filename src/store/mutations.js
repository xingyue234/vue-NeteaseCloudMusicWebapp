export default{
  //显示header高亮
  changeActive(state,{name}){
    for (let p in state.headerActive){
      state.headerActive[p] = false;
    }  
    state.headerActive[name] = true;
  },
  //切换底部播放条
  updateshowPlayfooter(state,value){
  	state.showPlayfooter = value;
  },
  //显示find高亮
  changeFindActive(state,{name}){
    for (let p in state.findActive){
      state.findActive[p] = false;
    }  
    state.findActive[name] = true;
  },
  /**
   * 排行
   */
  updateIdx(state,value){
     state.idx = value;
  },
  //左侧导航显示切换
  changeLeftMenu(state,value){
        state.showLeftMenu = value;
  },
  //切换底部播放条样式
  changeplayFooter(state,{value}){
       state.playFooter = value;
  },
  //copywriter
  updatecopywriter(state,newVal){
      state.copywriter = newVal;
  },
  //跟新搜索数据
  updatesearchData(state,{songs,artists}){
    if(songs){
        if(songs.isCover){
          state.songs = songs.data;
          console.log(state.songs,'songs');
       }else{
          state.songs = [...state.songs].concat(songs.data); 
       }
    }
    if(artists){
        if(artists.isCover){
            state.artists = artists.data;
        }else{
            state.artists = state.artists.concat(artists.data); 
        }
    }
  },
  //更新页数
  updatepage(state,newVal){
    state.page = newVal
  },
  //更新搜索内容
  updateSearchValue(state,newVal){
    //每次设置搜索值的时候都清空searchData并重置page，因为每次重新搜索都要重新记录数据
     state.searchData = [];
     state.page = 1;
     state.currentSearchValue = newVal
  },
  //更新搜索总条数
  updatesearchCount(state,{songs,artists}){
      if(songs){
        state.searchCount.songs = songs
      }
      if(artists){
        console.log(artists,'arCount');
         state.searchCount.artists = artists
      }
     
  },
  //跟新搜索分分类
  updatesearchClass(state,newVal){
      state.searchClass = newVal;
  },
  //lrcData
  updatelrcData(state,newVal){
     state.lrcData = newVal;
  },
  updateduration(state,newVal){
      state.duration = newVal;
  },
  updateplayInfo(state,{id,name,singer,singerImg}){
    if(id){
        state.play.id = id;
    }
    if(name){
       state.play.name = name;
    }
    if(singer){
        state.play.singer = singer;
    }
    if(singerImg){
        state.play.singerImg = singerImg;
    }
  },
  /*
  ** 更新启动播放
  */
  updateisplaying(state,newVal){
    state.isplaying = newVal;
  },
  /*
  ** 显示播放界面
  */
  updateshowPlay(state,show){
     state.showPlay = show;
  },
  //用户信息
  updateloginMsg(state,{uid,nickname}){
    if(uid){
        state.loginMsg.uid = uid;
    }
    if(nickname){
       state.loginMsg.nickname = nickname;
    }
     
  },
  //用户详情
  updateuserDetail(state,newVal){
      state.userDetail = newVal;
  },
  /**
   * 更新显示播放列表
   */
  updateshowPlayList(state,newVal){
         state.showPlayList = newVal;
  },
  /**
   * 播放模式
   */
  updateplayListId(state,newVal){
      state.playListId = newVal;
  },
  updateloop(state,newVal){
      state.loop = newVal;
  },
  updatemyplayList(state,newVal){
      state.myplayList = newVal;
  },
  updateisLinktoRecord(state,newVal){
     state.isLinktoRecord = newVal;
  },
  updatepop(state,{title,position,show}){
    if(title){state.pop.title = title}
    if(position){state.pop.position = position}
    if(show){state.pop.show = show}
  },
  updateshowSongMore(state,newVal){
      state.showSongMore = newVal;
  },
  updateshowPlaySongMore(state,newVal){
      state.showPlaySongMore = newVal;
  },
  updatenext(state,{id,name}){
      if(id){
          state.next.id = id;
      }
      if(name){
           state.next.name = name;
      }
  },
  //我创建的歌单
  updatemyCreatePlayList(state,item){
      this.state.myCreatePlayList = item.splice(1);
  },
  updateshowAddToList(state,value){
      state.showAddToList = value;
  },
  updateshowSetTime(state,value){
      state.showSetTime = value
  },
  updatecloseTime(state,value){
      state.closeTime = value
  },
  updatetimeDelay(state,value){
      state.timeDelay = value
  },
  
















  
}