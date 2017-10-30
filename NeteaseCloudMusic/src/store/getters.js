
export default{
   playListIdType(state, getters){

       let playListId = state.playListId;

        /*
        ** 列表循环id
        */
        let id_xunhuan = playListId.slice();
        
       /*
        ** 随机播放id
        */
        playListId.sort(()=>{
              return .5 - Math.random();
        })
        let id_suiji = playListId.slice();

        return{
          xunhuan:id_xunhuan,
          suiji:id_suiji
        }

   },
   getMyplayList(state, getters){
      return  state.myplayList.reverse();
   },


}