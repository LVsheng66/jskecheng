
window.onload = function(){
    fe1311.header_bg();
    fe1311.timer();
    fe1311.lunbo_jd();
}

var fe1311 = {
    tool: {
        zero: function(m) {
            return m < 10 ? "0" + m : m;
        }
    },
    header_bg:function(){
        var header=document.querySelector('.header');
        var lunbo=document.querySelector('.jd_banner');
        var lunbo_dis=lunbo.offsetTop+lunbo.offsetHeight;
        window.onscroll = function(){
            var top=document.documentElement.scrollTop || document.body.scrollTop;
            header.style.backgroundColor="rgb(228, 49, 48,"+(top/lunbo_dis)+")";
        }
    },
    //倒计时
    timer:function(){
        var shi=document.querySelector('.t_t_shi');
        var fen=document.querySelector('.t_t_fen');
        var miao=document.querySelector('.t_t_miao');
        var oTime=2*60*60;
        var tate=this;
        var time = setInterval(function(){
            oTime--;
            var oShi=Math.floor(oTime/60/60);
             var oFen=Math.floor(oTime%3600/60);
            var oMiao=oTime%60;
            shi.innerHTML =tate.tool.zero(oShi);
            fen.innerHTML =tate.tool.zero(oFen);
            miao.innerHTML =tate.tool.zero(oMiao);
        },1000)
    },
    //轮播图
    lunbo_jd:function(){
        var oUl=document.querySelector('.jd_banner>.l_img');
         var oLi=oUl.querySelectorAll('li');
        var aLi=document.querySelectorAll('.nav_yuan li');
        var lWi=oLi[0].offsetWidth;
        console.log(lWi);
        var index=1;
        function addTransition(){
            oUl.style.transition='all 1s';
            oUl.style.webkitTransform='all 1s';
        }
        function removeTransition(){
            oUl.style.transition='none';
            oUl.style.webkitTransform='none';
        }
        function translateX(x){
            console.log(x);
            oUl.style.transform='translateX('+x+'+px)';
            oUl.style.webkitTransform='translateX('+x+'+px)';
        }
        var time=setInterval(function(){
            index++;
            if(index>aLi.length-2){
                index=1;
            }
            //自动切换
            addTransition();
           
            translateX(-index*lWi)
            //小圆圈跟着走
            document.querySelector('.nav_yuan li.ativer').classList.remove('ativer');
        //    console.log( ativer1);
            
             aLi[index-1].classList.add('ativer');             
        },1000)
        oUl.addEventListener('touchstart',function(e){
          var startX=e.touches[0].clientX;
            
        })
        //手指滑动
       oUl.addEventListener('touchmove',function(e){
            // var moveX=e.toushes.clientX;
            // disX=moveX-startX;
    })
        oUl.addEventListener('touchend',function(e){
            
        })
       
    }
}
