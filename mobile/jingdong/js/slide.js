window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];   // 获取focus的第一个孩子，也就是ul
    var w = focus.offsetWidth;    // 获取focus的宽度
    var index = 0;    // 用来记录图片索引
    var timer = setInterval(function() {    // 添加定时器，两秒调用一次
        index++;   // 每调用一次（轮播一次），图片索引号+1
        var translatex = -index * w;    // ul要移动的距离
        ul.style.transition = 'all .4s';   // 添加过渡属性（css3里的属性）
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 给focus绑定监听函数（每次轮播移动的都是整个ul）  过渡结束（transitionend）时执行
    focus.addEventListener("transitionend",function () {
        if(index>2){
            index=0;
            var translatex = -index * w;
            ul.style.transition = '';   // 去掉过渡属性,迅速切换图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        else if(index<0){
            index=2;
            var translatex = -index * w;
            ul.style.transition = '';   // 去掉过渡属性,迅速切换图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
    })

    // 手指滑动轮播图
    var startX = 0;    // 用来存储手指初始位置
    var moveX = 0;     // 用来存储手指在屏幕上移动的距离
    var flag = false;    // 记录用户是否在图上移动了手指

    // 给ul绑定手指触摸事件
    ul.addEventListener('touchstart', function(e) {
         startX = e.targetTouches[0].pageX;  // 手指的初始触摸位置（左右轮播，只记录x就可以了）
         clearInterval(timer);    // 当手指触摸屏幕时清除定时器（不让它自动轮播了）
     })
    // 给ul绑定手指移动事件
    ul.addEventListener('touchmove',function (e) {
        //阻止默认行为,防止屏幕上下滑动
        e.preventDefault();
        moveX=e.targetTouches[0].pageX-startX;
        var translateX = -index * w + moveX;
        ul.style.transition = '';   // 去掉过渡属性,因为慢慢移动已经有过渡的效果了?
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true; // 手指移动了，将flag改为true
    })
    // 给ul绑定手指移开事件,用于轮播图弹回弹进操作
    ul.addEventListener('touchend',function (e) {
        //这块是手指移动后离开屏幕才会触发
        if(flag) {
            //如果手指滑动了超过50px
            if (Math.abs(moveX) > 100) {
                //根据正负调整方向
                if (moveX < 0) {
                    index++;
                } else
                {
                    index--;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';   // 加上过渡效果,快点
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .1s';   // 加上过渡效果,更快
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        //这块只要手指离开就触发
        flag = false;
        //防止bug???
        clearInterval(timer);
        timer = setInterval(function() {    // 添加定时器，两秒调用一次
            index++;   // 每调用一次（轮播一次），图片索引号+1
            var translatex = -index * w;    // ul要移动的距离
            ul.style.transition = 'all .4s';   // 添加过渡属性（css3里的属性）
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })
})