import axios from 'axios';


/**
 * 获取banner
 */
export const banners = axios.get('/api/banner');


/**
 * 获取推荐歌单（不需要登录）
 */
export const recSongList =  axios.get('/api/personalized');

/**
 * 获取每日推荐歌单（需要登录）
 */
export const recommend =  axios.get('/api/recommend/resource');

/**
 * 获取精品歌单
 */
export const highquality = ({limit})=> axios.get('/api/top/playlist/highquality',{
  params:{
    limit
  }
});

/**
 * 获取独家放送
 */
export const privatecontent =  axios.get('/api/personalized/privatecontent');


/**
 * 获取推荐新音乐
 */
export const newsong =  axios.get('/api/personalized/newsong');

 /**
 * 获取搜索建议
 */
export const searchRecommend = (keywords)=> axios.get('/api/search/suggest',{
  params:{
    type:1,
    limit:30,
    offset:0,
    keywords:keywords
  }
})

 /**
 * 获取搜索
 */
export const searchData = ({type,limit,offset,keywords})=> axios.get('/api/search',{
  params:{
    type,
    limit,
    offset,
    keywords
  }
})

/*
*  获取歌词
*/
export const lyric = ({id})=> axios.get('/api/lyric',{
  params:{
    id
  }
})

/*
*  获取歌曲播放url
*/
export const playUrl = ({id})=> axios.get('/api/song/url',{
  params:{
    id
  }
})
/**
 * 获取歌曲详情
 */
export const songDetail = ({ids})=> axios.get('/api/song/detail',{
  params:{
    ids
  }
})

/**
 * 登录
 */
export const Login = ({phone,password})=> axios.get('/api/login/cellphone',{
  params:{
    phone,
    password
  }
})

/**
 * 刷新登录
 */
export const reLogin = ()=> axios.get('/api/login/refresh');


/**
 * 获取用户详情
 */
export const userDetail = ({uid})=> axios.get('/api/user/detail',{
  params:{
    uid
  }
});

/**
 * 获取用户歌单，收藏，mv, dj 数量
 */
export const userCount =  axios.get('/api/user/subcount');

/**
 * 获取用户歌单
 */
export const userPlaylist = ({uid})=> axios.get('/api/user/playlist',{
  params:{
    uid
  }
});

/**
 * 获取用户关注列表
 */
export const userFollows = ({uid})=> axios.get('/api/user/follows',{
  params:{
    uid
  }
});

/**
 * 获取用户粉丝列表
 */
export const userFolloweds = ({uid})=> axios.get('/api/user/followeds',{
  params:{
    uid
  }
});


/**
 * 获取用户动态
 */
export const userEvent = ({uid})=> axios.get('/api/user/event',{
  params:{
    uid
  }
});

/**
 * 获取用户播放记录
 */
export const userRecord = ({uid,type})=> axios.get('/api/user/record',{
  params:{
    uid,
    type
  }
});

/**
 * 获取歌单详情
 */
export const playlistDetail = ({id})=> axios.get('/api/playlist/detail',{
  params:{
    id
  }
});


/**
 * 获取全部排行榜
 */
export const topList = ({idxs}) => { 

  let getRank = [];

  idxs.forEach((idx)=>{

    getRank.push(axios.get(`/api/top/list?idx=${idx}`));

  })

 return  axios.all(getRank);

}

/**
 * 获取单个排行榜
 */
export const topListSongs = ({idx})=> axios.get('/api/top/list',{
  params:{
    idx
  }
});

/**
 * 获取用户播放列表
 */
export const userPlayList = ({ids}) => { 

  let listId = [];

  ids.forEach((id)=>{

    listId.push(axios.get(`/api/song/detail?ids=${id}`));

  })

 return  axios.all(listId);

}

/**
 * 收藏歌曲,删除歌单歌曲
 */
export const addPlayList = ({op,pid,tracks})=> axios.get('/api/playlist/tracks',{
  params:{
    op,
    pid,
    tracks
  }
});

/**
 * 喜欢音乐
 */
export const like = ({id,like})=> axios.get('/api/like',{
  params:{
    id,
    like
  }
});


