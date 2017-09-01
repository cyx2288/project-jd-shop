/**
 * Created by Administrator on 2017/6/1.
 */

var jfShowPop = function (details) {

    this.details = details;

    var thisEle = document.getElementById(this.details.ele);


    thisEle.getElementsByClassName('pop_cancel')[0].addEventListener('click', clickEven.bind(this), false);

    thisEle.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('click', clickEven.bind(this), false);

    function clickEven() {

        this.hide();

    }

    /*this.ban=function (e) {


        window.event? window.event.cancelBubble = true : e.stopPropagation();//阻止冒泡

    };*/

    if(thisEle.getElementsByClassName('jf_pop_up_bg')[0]) {

        addEvent(thisEle.getElementsByClassName('jf_pop_up_bg')[0]);

    }

     if(thisEle.getElementsByClassName('pop_top')[0]) {

         addEvent(thisEle.getElementsByClassName('pop_top')[0]);
         
     }


    function addEvent(ele) {

        var allEvent=['touchstart','touchmove','touchend'];

         for(var i=0;i<allEvent.length;i++) {

           ele.addEventListener(allEvent[i],eventBan,false)

         }

     }

     function eventBan(e) {

            // window.event? window.event.cancelBubble = true : e.stopPropagation();

         if(browser.os.iOS) {

             window.event ? window.event.returnValue = false : e.preventDefault();

         }
     }

};

jfShowPop.prototype.show = function (details) {


    if(details){

        details.fn();


    }


   /* this.ban();*/

    /*document.body.addEventListener('touchmove', this.ban, true);*/

    var thisEle = document.getElementById(this.details.ele);


    var thisScrollEle = this.details.thisScrollEle || 0;//含有滚动条元素的classname


    if(this.details.thisScrollEle){//如果有值 则执行

        clickThrough(thisScrollEle);
    }



    thisEle.style.display = 'block';

    setTimeout(function () {

        if (thisEle.className.indexOf('show') == -1) {

            thisEle.className += ' show'

        }

    }, 1);

    document.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('touchmove',windowBanEvent.Canceling);//给阴影绑定禁止事件


    //解决弹框点击穿透问题-0831

    function clickThrough(thisScrollEle) {

        var _thisScrollEle = document.getElementsByClassName(thisScrollEle)[0];

        var startY, endY, distance;//开始距离、移动距离

        _thisScrollEle.addEventListener('touchstart', touchStartEle, false);

        _thisScrollEle.addEventListener('touchmove', touchMoveDistance, false);

        _thisScrollEle.addEventListener('touchmove', reachEdge, false);


        function touchStartEle(e) {

            //touchstart 获取位置startY

            startY = e.touches[0].pageY;

        }


        function touchMoveDistance(e) {

            //touchmove 获取位置 endY

            endY = e.touches[0].pageY;

            //两者之减的距离用来判断是向上活动还是向下滑动
            distance = startY - endY;

            //此时touchmove的值等于touchstart的值 循环
            endY = startY;

        }


        function reachEdge(event) {

            var _this = this;

            var eleScrollHeight = _this.scrollTop;//获取滚动条的位置 206

            var eleHeight = _this.scrollHeight;//元素实际高度 506

            var containerHeight = _this.offsetHeight;//容器高度 300


            //滚动条到达底部

            if (Math.abs(parseFloat(eleHeight) - parseFloat(eleScrollHeight + containerHeight)) <= 2) {


                //如果距离为正数 则向上滑动时候 禁止浏览器事件

                if (distance > 0) {

                    event.preventDefault();


                }


            }

            else if (Math.abs(parseFloat(eleScrollHeight)) == 0) {

                //如果距离为负数 则向下滑动 禁止浏览器事件

                if (distance < 0) {

                    event.preventDefault();

                }


            }

        }


    }



};

jfShowPop.prototype.hide = function () {

    var thisEle = document.getElementById(this.details.ele);

     /*document.body.removeEventListener('touchmove', this.ban, true);*/

    if (thisEle.className.indexOf('show') > -1) {

        transitionMove(thisEle);

        thisEle.className = thisEle.className.replace(' show', '')

    }

    windowBanEvent.unbundling();//解绑页面禁止事件

    function transitionMove(ele) {

        // Safari 3.1 到 6.0 代码
        ele.addEventListener("webkitTransitionEnd", MFunction);
        // 标准语法
        ele.addEventListener("transitionend", MFunction);

        function MFunction() {

            ele.style.display = 'none';
            // Safari 3.1 到 6.0 代码
            ele.removeEventListener("webkitTransitionEnd", MFunction);
            // 标准语法
            ele.removeEventListener("transitionend", MFunction);


        }


    }


};