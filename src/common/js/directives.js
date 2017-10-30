export const drag = {
    bind(el, binding, vnode){
          el.ontouchstart = function(e){
            let disX = e.changedTouches[0].clientX - this.offsetLeft;
            let disY = e.changedTouches[0].clientY - this.offsetTop;
            
            el.ontouchmove = function(e){
              let L = e.changedTouches[0].clientX - disX;
              let T = e.changedTouches[0].clientY - disY;
              if(!binding.modifiers.infinity){
                let html = document.documentElement;
                if(L < 0){
                  L = 0
                }else if(L > html.clientWidth - el.offsetWidth){
                  L = html.clientWidth - el.offsetWidth
                }
                if(T < 0){
                  T = 0
                }else if(T > html.clientHeight - el.offsetHeight){
                  T = html.clientHeight - el.offsetHeight;
                }
              }
              el.style.left = L + 'px';
              el.style.top = T + 'px';
            }
            el.ontouchend= function(){
              el.ontouchmove = null;
            }
            return false;
          }
        }
}

/*
* 显示默认图片
*/
export const pic = {
  inserted: function (el, binding, vnode) {
    if(!el.getAttribute('src')){
      el.setAttribute('src','/static/default.jpg');
    }
  }
}





