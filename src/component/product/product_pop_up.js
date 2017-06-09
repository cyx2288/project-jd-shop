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

              window.event? window.event.returnValue = false : e.preventDefault();

     }

};

jfShowPop.prototype.show = function (details) {


    if(details){

        details.fn();

    }

   /* this.ban();*/

    /*document.body.addEventListener('touchmove', this.ban, true);*/

    var thisEle = document.getElementById(this.details.ele);

    thisEle.style.display = 'block';

    setTimeout(function () {

        if (thisEle.className.indexOf('show') == -1) {

            thisEle.className += ' show'

        }

    }, 1)

};

jfShowPop.prototype.hide = function () {

    var thisEle = document.getElementById(this.details.ele);

     /*document.body.removeEventListener('touchmove', this.ban, true);*/

    if (thisEle.className.indexOf('show') > -1) {

        transitionMove(thisEle);

        thisEle.className = thisEle.className.replace(' show', '')

    }



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