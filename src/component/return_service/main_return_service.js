/**
 * Created by ZHUANGYI on 2017/10/16.
 */

var jfReturnService = {


    //切换tab

    tabChange:function () {

        var navTab = document.getElementById('title_contain').getElementsByClassName('tab');

        var orderList = document.getElementsByClassName('after_sales_list');

        for (var i = 0; i < navTab.length; i++) {

            navTab[i].index = i;

            navTab[i].addEventListener('click', function () {

                for (var j = 0; j < navTab.length; j++) {

                    orderList[j].className = orderList[j].className.replace(' show', '');

                }
                orderList[this.index].className += ' show'
            })
        }


    },

    //字数选择

    countWords:function () {

        document.getElementsByClassName('number_words_cancel')[0].getElementsByTagName('span')[0].innerHTML = document.getElementById('textareaCancelList').value.length;

    },

    //日期选择

    dateSelected:function () {


        var thisEle = document.getElementById("myDate").value;

        document.getElementById("myDate").innerHTML = thisEle;

    },


    //申请售后tab页面切换
    selectTab:function () {

    document.getElementsByClassName('type_choose')[0].addEventListener('click', function (e) {


        //事件委托

        var evt = e || window.event;

        var thisTargetEle = evt.srcElement || evt.target;

        //console.log(thisTargetEle);

        //选择服务类型 tab切换

        //如果点击不是type_choose本身

        if (thisTargetEle != this) {


            if (this.getElementsByClassName('selected')[0]) {


                this.getElementsByClassName('selected')[0].className = this.getElementsByClassName('selected')[0].className.replace(' selected', '');


            }

            //给点击的target加class

            thisTargetEle.className += ' selected';

            //遍历

            for (var i = 0; i < 3; i++) {

                //遍历 点击了那个模块

                if (allCheckRelation[i].name.indexOf(thisTargetEle.getAttribute('data-name')) > -1) {

                    //传入 模块1的逻辑
                    type1(allCheckRelation[i].x)

                }

            }


        }


        /*模块1的显示与否*/
        function type1(thisDataName) {

            //无论点击哪个都会出现的模块

            document.getElementsByClassName('application_quantity')[0].style.display = 'block';

            document.getElementsByClassName('return_mode')[0].style.display = 'block';

            document.getElementsByClassName('return_address')[0].style.display = 'block';

            //传参

            var isShow = thisDataName;


            //显示退款模块

            if (isShow) {

                document.getElementsByClassName('refund_method')[0].style.display = 'block';

            }

            //隐藏退款模块

            else {

                document.getElementsByClassName('refund_method')[0].style.display = 'none';

            }

        }

        changeBlock2()

    });

    document.getElementsByClassName('return_choose')[0].addEventListener('click', function (e) {

        var evt = e || window.event;

        var thisTargetEle = evt.srcElement || evt.target;

        //如果点击的不是type_choose本身

        if (thisTargetEle != this) {

            this.getElementsByClassName('selected')[0].className = this.getElementsByClassName('selected')[0].className.replace('selected', '');

            thisTargetEle.className += ' selected';

        }

        if (thisTargetEle.getAttribute('data-name') == 'delivery') {


            document.getElementsByClassName('return_explain')[0].style.zIndex='5';

            document.getElementsByClassName('return_explain')[1].style.zIndex='1';

            document.getElementsByClassName('return_explain')[2].style.zIndex='1';

        }

        else if (thisTargetEle.getAttribute('data-name') == 'picking') {

            document.getElementsByClassName('return_explain')[1].style.zIndex='5';

            document.getElementsByClassName('return_explain')[0].style.zIndex='1';

            document.getElementsByClassName('return_explain')[2].style.zIndex='1';

        }

        else {

            document.getElementsByClassName('return_explain')[2].style.zIndex='5';

            document.getElementsByClassName('return_explain')[0].style.zIndex='1';

            document.getElementsByClassName('return_explain')[1].style.zIndex='1';

        }




        changeBlock2()

    });


    function changeBlock2() {

        var showBlock1 = 'none';

        var showBlock2 = 'none';

        //查找

        var thisIndex = allCheckRelation[indexNum(document.getElementsByClassName('type_choose')[0], 'service_tab')].y[indexNum(document.getElementsByClassName('return_choose')[0], 'return_tab')];

        if (thisIndex[0]) {

            showBlock1 = 'block'

        }

        if (thisIndex[1]) {

            showBlock2 = 'block'

        }

        document.getElementById('fetchAddress').style.display = showBlock1;

        document.getElementById('deliveryAddress').style.display = showBlock2;


        //查找第几个元素被选中的方法

        function indexNum(farEle, className) {

            var eles = farEle.getElementsByClassName(className);

            for (var i = 0; i < 3; i++) {

                if (eles[i].className.indexOf('selected') > -1) {

                    //返回值i

                    return i

                }

            }

            return -1;

        }

    }


    var allCheckRelation = [

        {
            'name': 'return',

            'x': true,

            'y': [

                [true, false],

                [false, false],

                [false, false]

            ]

        },

        {
            'name': 'exchange',

            'x': false,

            'y': [

                [true, true],

                [true, false],

                [true, false]

            ]


        },

        {
            'name': 'repair',

            'x': false,


            'y': [

                [true, true],

                [true, false],

                [true, false]

            ]

        }


    ]

},


    //上传图片

    addPhoto:function () {

    var last_choose=document.getElementsByClassName("choose_file")[document.getElementsByClassName("choose_file").length-1];

    var file_input = last_choose.getElementsByTagName('input')[0];
    //    触发事件用的是change，因为files是数组，需要添加下标
    file_input.addEventListener("change", function () {

        var obj = this;

        var obj_name = this.files[0].name;

        var img_length = obj.files.length;

        //console.log(obj.files);

        imgWrite();

        function imgWrite() {



            for (var i = 0; i < img_length; i++) {

                if (!(/image\/\w+/).test(obj.files[i].type)) {
                    alert("上传的图片格式错误，请上传图片");
                    return false;
                }
                var reader = new FileReader();
                reader.error = function (e) {
                    alert("读取异常")
                };
                reader.onload = function (e) {
//                div_html是包括图片和图片名称的容器
                    var img_html = '<img src="' + e.target.result + '"/>';
                    var div_html = document.createElement("div");
                    var span_html = document.createElement("div");

                    if (document.getElementsByClassName("photo_content")[0].getElementsByClassName('choose_file').length <= 10) {
                        div_html.innerHTML = img_html+'<div class="delete_img"></div>';
                        div_html.className = "choose_file";
                        span_html.className ='delete_img';

                        document.getElementsByClassName("photo_content")[0].insertBefore(div_html,last_choose);

                        document.getElementsByClassName('photo_content')[0].scrollLeft=9999;

                        addImgNum()

                        div_html.getElementsByClassName('delete_img')[0].addEventListener('click',function () {

                            jfShowTips.remove(this.parentNode);

                            addImgNum()

                        },false)

                        function addImgNum() {

                            var num=document.getElementsByClassName('photo_content')[0].getElementsByClassName('choose_file').length-1;

                            document.getElementById('image_length').innerHTML=num;

                        }


                    } else {

                        jfShowTips.loadingShow({
                            'text' : '最多添加10张图片',
                            'thisNode':loadInnerHtml.node.loadingFail
                        });

                       setTimeout(function(){

                          jfShowTips.loadingRemove()

                      },2000)

                    }
                };
                reader.readAsDataURL(obj.files[i]);
            }

        }


    })

},

    //地址不一致

    chooseAddress:function () {

    document.getElementById('switch_jd').addEventListener('click',function () {

        if(this.checked){

            document.getElementsByClassName('address_inconsistency')[0].style.display='block';

        }
        else {

            document.getElementsByClassName('address_inconsistency')[0].style.display='none';

        }

    },false)
},


    countWordsDescription:function () {

    document.getElementsByClassName('number_words')[0].getElementsByTagName('span')[0].innerHTML = document.getElementById('textareaList').value.length;

},



    //修改图片

    chooseImgShow:function () {

    document.getElementsByClassName('images_content')[0].addEventListener('click', function (e) {


        var evt = e || window.event;

        var thisTargetEle = evt.srcElement || evt.target;

        var thisEle = document.getElementById('servicePopUp');

        //console.log(thisTargetEle.tagName)

        if (thisTargetEle.tagName == 'IMG') {

            thisEle.getElementsByClassName('img_content')[0].innerHTML = thisTargetEle.parentNode.innerHTML

            //thisEle.getElementsByClassName('img_box')[0].getElementsByTagName('img')[0].src =  thisTargetEle.src

            serviceDialogShow();

        }


        //弹框出现
        function serviceDialogShow() {

            var serviceDialog = document.getElementById('servicePopUp');

            serviceDialog.style.display = 'block';

            document.getElementById('serviceShadow').addEventListener('touchmove',windowBanEvent.Canceling,false);//给阴影绑定冒泡事件


            document.getElementsByClassName('img_content')[0].addEventListener('touchmove',windowBanEvent.Canceling,false);//给盒子绑定冒泡事件



            document.getElementsByClassName('delete_pic')[0].addEventListener('click', serviceDialogHide, false);


            function serviceDialogHide() {

                var serviceDialog = document.getElementById('servicePopUp');

                serviceDialog.style.display = 'none';

                document.getElementsByClassName('delete_pic')[0].removeEventListener('click', serviceDialogHide, false);

            }

        }

    }, false)

}



}
