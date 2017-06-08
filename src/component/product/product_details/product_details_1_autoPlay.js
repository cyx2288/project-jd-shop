
/*图片手动轮播*/
var productInfoShow={

    "figer":{

        "ischange":true,

        "ismove":true //true表示左右移动，执行轮播的JS，false表示上下移动，不执行轮播的JS

    },



    /*图片弹出*/
    showImages:function(details){

        var _this=this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        _this.thisImgEle = details.thisImgEle || 'allimg';//当前显示的banner图片的整个div,class选择器

        _this.saveImgEle=details.saveImgEle||'img_content';//点击后显示的图片的整个div.calss选择器

        _this.allShowEle=details.allShowEle||'showImg';//整个弹出的元素,class选择器

        _this.moveDistanceX = 0;//x方向移动的距离(一根手指)

        _this.moveDistanceY=0;//y方向移動的距離

        _this.thisPosition = 0;//初始化现在在第几个页面


        var AllBannerImg=document.getElementsByClassName(_this.thisImgEle)[0];//显示中的banner图片

        var showImgEle=document.getElementsByClassName(_this.saveImgEle)[0];//包裹所有主体中的banner图片的父级元素

        var thisSaveImgDiv=AllBannerImg.getElementsByTagName('div');//获取显示图片的父级元素

        var AllShowContent=document.getElementsByClassName( _this.allShowEle)[0];////整个弹出的元素

        showImgEle.innerHTML=AllBannerImg.innerHTML;//获取所有的图片=主体内容图片部分

        _this.initPointEle();//初始化点点元素

        AllShowContent.style.display='block';//弹出元素显示

        _this.moveEvent();//调用绑定事件

    },

    /*元素绑定事件*/
    moveEvent:function(details){

        var _this=this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        _this.moveEle = details.moveEle || 'img_content';//当前显示的banner图片的整个div,class选择器

        _this.pointEle=details.pointEle||'point_content';//点点的父元素

        _this.thisPosition = 0;//初始化现在在第几个页面

        var moveEle=document.getElementsByClassName(_this.moveEle)[0];//banner轮播图

        var thisWindowWidth = window.innerWidth;//屏幕可视窗口宽度

        var firstTouchesClientX; //初次点击的位置X坐标

        var firstTouchesClientY;//初次点击的位置Y坐标

        var moveTouchesClientX;//移动一段距离后，停止点的位置(X)

        var moveTouchesClientY;//移动一段距离后，停止点的位置(Y)

        var lastDis=0;//前一次距离

        var newDis=0;//最新的距离

        var lastDistanceSpeed=0;//最后一次速度

        moveEle.addEventListener('touchstart',function(event){

            var evt = event ? event : window.event;

            _this.figer.ischange=true;//初始化可移动

            getFirstPosition(event)

        },false);//获取初始位置

        moveEle.addEventListener('touchmove',function(event){

            var evt = event ? event : window.event;

            lastDistanceSpeed=getLastPosition(event);

            if(_this.figer.ischange){

                if(Math.abs(_this.moveDistanceY)>Math.abs(_this.moveDistanceX)){//如果在Y軸方向移動的距離大於X軸方向，則不轮播

                    _this.figer.ismove=false
                }else {

                    _this.figer.ismove=true
                }

                _this.figer.ischange=false;//进行锁定一次，
            }

            if( _this.figer.ismove){//判断为左右移动时，即可运行相应的JS

                evt.preventDefault();//阻止浏览器的默认行为

                if((_this.thisPosition==0)&&_this.moveDistanceX>0){

                    _this.moveDistanceX=_this.moveDistanceX/3;   //第一页以及最后一页，滑动会产生一个阻力

                }

                if((_this.thisPosition==-4) &&_this.moveDistanceX<0){

                    _this.moveDistanceX=_this.moveDistanceX/3;   //第一页以及最后一页，滑动会产生一个阻力

                }

                _this.changeTranslate(moveEle, parseFloat(_this.thisPosition*thisWindowWidth)+parseFloat(_this.moveDistanceX) + 'px');//移动中

            }

        },false);

        moveEle.addEventListener('touchend',function(event){

            var evt = event ? event : window.event;

            if(_this.figer.ismove){

                evt.preventDefault();//阻止浏览器的默认行为

                moveEle.className= ""+_this.moveEle+" contentchange";//添加class,带有Transition的属性

                if(Math.abs(_this.moveDistanceX)>(thisWindowWidth/3)||lastDistanceSpeed>6){//当手指的移动距离大于屏幕的1/3时，变化

                    _this.movePosition(_this.moveDistanceX)

                }else {

                    _this.changeTranslate(moveEle, parseFloat(_this.thisPosition*thisWindowWidth) + 'px');//变化到指定位置
                }

                moveEle.addEventListener("TransitionEnd",transitionMoveEndFn,false);

                moveEle.addEventListener("webkitTransitionEnd",transitionMoveEndFn,false);

            }


        },false);

        //绑定平滑过渡后的方法
        function transitionMoveEndFn(){

            moveEle.className=""+_this.moveEle+"";//移除class,带有Transition的属性


            moveEle.removeEventListener('transitionend', transitionMoveEndFn, false);

            moveEle.removeEventListener('transitionend', transitionMoveEndFn, false);

        }

        //初始移送的位置
        function getFirstPosition(event) {

            var evt = event ? event : window.event;

            firstTouchesClientX = parseFloat(evt.touches[0].clientX);//当前点击事件距离屏幕左边的距离(初始位置-X);

            firstTouchesClientY=parseFloat(evt.touches[0].clientY);//当前点击事件距离屏幕左边的距离(初始位置-X);

            lastDis=newDis=firstTouchesClientX;

            if(moveEle.className=""+_this.moveEle+" contentchange"){

                moveEle.className=""+_this.moveEle+""

            }
        }

        //手指即将离开的位置
        function getLastPosition(event) {

            var evt = event ? event : window.event;

            moveTouchesClientX = parseFloat(evt.changedTouches[0].clientX);//末尾位置(X);

            moveTouchesClientY = parseFloat(evt.changedTouches[0].clientY);//末尾位置(Y);

            lastDis=newDis;

            newDis=moveTouchesClientX;

            _this.moveDistanceX = moveTouchesClientX - firstTouchesClientX;//x軸方向最终移动的距离（第一根手指）

            _this.moveDistanceY = moveTouchesClientY - firstTouchesClientY;//Y軸方向最终移动的距离（第一根手指）

            return Math.abs(newDis-lastDis);

        }
    },


    /*元素移动*/
    movePosition:function(position){
        var _this=this;

        var thisWindowWidth = window.innerWidth;//屏幕可视窗口宽度

        var moveEle=document.getElementsByClassName(_this.moveEle)[0];//包裹所有主体中的banner图片的父级元素

        var thisNum = moveEle.getElementsByTagName('div').length - 1;

        var PointParent=document.getElementsByClassName(_this.pointEle)[0];//点点的父元素

        var allPointEle=PointParent.getElementsByTagName('span');


        //如果向右滚动，则不能超过最大图片个数
        if (parseFloat(position) < 0) {

            _this.thisPosition > -thisNum ? _this.thisPosition-- : _this.thisPosition = -thisNum;

        }

        //如果向左边滚动，不能超过最左边
        else if (parseFloat(position) > 0) {

            _this.thisPosition < 0 ? _this.thisPosition++ : _this.thisPosition = 0;
        }

        _this.changeTranslate(moveEle, thisWindowWidth * this.thisPosition + 'px',1);//变化到指定位置

        if(allPointEle){
            //变化点点的位置
            PointParent.getElementsByClassName('showpoint')[0].className="";

            allPointEle[-this.thisPosition].className="showpoint"
        }


    },

    /*添加元素*/
    initPointEle:function(){
        var _this = this;

        var AllBannerImg=document.getElementsByClassName(_this.thisImgEle)[0];//显示中的banner图片

        var thisSaveImgDiv=AllBannerImg.getElementsByTagName('div');//获取显示图片的父级元素

        var pointEle="";//点点元素

        for(var i=0;i<thisSaveImgDiv.length;i++){


            if (i == 0) {

                pointEle += '<span class="showpoint"></span>';
            }

            else {

                pointEle += '<span></span>';

            }

        }

        addnode("div",pointEle);

        function addnode(tag, innerHtml, className){

            var obj = document.createElement(tag);

            if (className) {

                obj.className = className
            }

            obj.innerHTML = innerHtml;

            document.getElementsByClassName('point_content')[0].appendChild(obj);
        }

    },

    //元素位置变化的方法
    changeTranslate:function(ele,num1){

        var _this=this;

        ele.style.transform = 'translateX(' + num1 + ')';

        ele.style.webkitTransform = 'translateX(' + num1 + ')';

    }

};