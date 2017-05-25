/**
 * Created by Qiaodan on 2017/5/25.
 */


/*图片懒加载*/
var jfLazyLoad={

    init:function(details){//初始化

        var _this=this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        _this.thisImgEle=details.thisImgEle||'loading_img';//显示的图片,class选择器

        _this.bottomDistance=details.bottomDistance||'50';//图片未显示时距离底部的距离。触发加载的距离


        //鼠标滚动事件
        addEventListener("scroll",function(){

            _this.getMoveDistance()

        },false)
    },


    getMoveDistance:function(){

        var _this=this;

        var thisScrollTop=document.body.scrollTop;//获取滚动条的距离

        var thisWindowHeight= window.innerHeight;//屏幕可视窗口高度

        var thisMaxHeight=parseFloat(thisScrollTop)+parseFloat(thisWindowHeight);//变化的距离(窗口高度+滚动条距离)

        var allLazyEle=document.getElementsByClassName(_this.thisImgEle);

        for(var i=0;i<allLazyEle.length;i++){

            var thisTopDistance=allLazyEle[i].offsetTop;//元素距离文档顶部的距离

            var thisImgSrc=allLazyEle[i].getAttribute('data-src');//获取当前元素的地址

            if(parseFloat(thisTopDistance)-thisMaxHeight<= _this.bottomDistance){

                allLazyEle[i].setAttribute('src',thisImgSrc)

            }

        }

    }

};

/*图片懒加载结束*/

/**异步加载*/
var jfAjaxLoad={

    init:function(details){

        var _this=this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }
        _this.bottomDistance=details.bottomDistance||'50';//元素未显示时距离底部的距离。触发加载的距离

        _this.fn=details.fn||0;//默认执行的脚本

        //鼠标滚动事件
        addEventListener("scroll",function(){

            _this.getMoveDistance()

        },false)

    },
    getMoveDistance:function(){

        var _this=this;

        var thisScrollTop=document.body.scrollTop;//获取滚动条的距离

        var thisDocumentHeight=document.body.scrollHeight;//获取当前文档的高度

        var thisWindowHeight= window.innerHeight;//屏幕可视窗口高度

        if(parseFloat(thisDocumentHeight)-parseFloat(thisScrollTop+thisWindowHeight)<=_this.bottomDistance){//如果当前文档底部距离窗口底部的距离小于50，执行相应的脚本
            if(_this.fn){

                _this.fn();

            }

        }

    }

};

/*异步加载结束*/

/*异步加载的内容*/
var jfAjzxContent={

    init:function(details){

        var _this=this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        _this.productdata=details.productdata||[

                {"data_src":"../../images/product_list_1.jpg",
                    "acc_text":"附",
                    "gift_text":"赠",
                    "product":"小米(MI)Air 13.3英寸全金属超轻薄笔记本电脑(i5-6200U 8G 256G PCIE固态硬盘 940MX独显 FHD WIN10)银",
                    "price_text":"￥4999.00",
                    "praise":"99%"
                }
            ];


        var thisInner='';

        for(var i=0;i< _this.productdata.length;i++){

            thisInner='<div class="product_main_img"><img class="loading_img" data-src='+_this.productdata[i].data_src+' src="../../images/img_loading.gif"></div><div class="product_main_title"><span class="acc">'+ _this.productdata[i].acc_text+'</span><span class="gift">'+ _this.productdata[i].gift_text+'</span>'+ _this.productdata[i].product+'</div><div class="product_main_price"><span class="price">'+ _this.productdata[i].price_text+'</span><span class="praise"><span>'+ _this.productdata[i].praise+'</span>好评</span></div>';

            _this.addNode('a',thisInner,'product')

        }

        var allAccEle=document.getElementsByClassName('hot_goods_list')[0].getElementsByClassName('acc');//所有‘附’字的span元素；

        var allGiftEle=document.getElementsByClassName('hot_goods_list')[0].getElementsByClassName('gift');//所有‘赠’字的span元素

        for(var i=0;i<allAccEle.length;i++){

            if(allAccEle[i].innerHTML==""){

                allAccEle[i].style.display="none"
            }

        }

        for(var i=0;i<allGiftEle.length;i++){

            if(allGiftEle[i].innerHTML==""){
                allGiftEle[i].style.display="none"
            }

        }



    },


    //新建元素的方法
    addNode: function (tag, innerHtml,  className) {

        var _this=this;

        var obj = document.createElement(tag);

        if(className){

            obj.className=className
        }

        obj.innerHTML = innerHtml;

        obj.setAttribute('href','#');

        document.getElementsByClassName('hot_goods_list')[0].appendChild(obj);
    }



};
