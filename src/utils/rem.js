(function(document,window){
  setSize();
  function setSize(){
    //动态生成meta
    var meta = document.createElement("meta");
    meta.name = "viewport";
    var scale = 1;
    scale = 1/window.devicePixelRatio;
    meta.content = "width=device-width,user-scalable=no,minimum-scale="+ scale +",initial-scale="+scale+",maximum-scale="+scale;
    document.head.appendChild(meta);
    var html = document.documentElement;
    var width = html.clientWidth/16;  //1rem = 20px
    html.style.fontSize = width + "px";

     //根据dpr修改font-size
    let dpr = window.devicePixelRatio;
    let sw = window.screen.width;
    let bSize = '16px';
    function setSw(n){
      if(sw <= 600 && sw > 414){
              bSize = 18*n + 'px';
      }else if(sw <= 414 && sw > 375){
              bSize = 16*n + 'px';
      }else if(sw <= 375 && sw > 320){
            bSize = 14*n + 'px';
      }else if(sw <= 320){
            bSize = 12*n + 'px';
      }else if(sw > 600 && sw < 768){
            bSize = 25*n + 'px';
      }
    }
    if(dpr >= 2 && dpr < 3 ){
      setSw(2)
    }else if( dpr >= 3){
      setSw(3)
    }
    document.body.style.fontSize = bSize;
  }
  window.onresize = setSize;
  if (window.onorientationchange) {
    window.addEventListener('orientationchange','setSize',false);
  }
  document.addEventListener('DOMContentLoaded','setSize',false);
})(document,window)