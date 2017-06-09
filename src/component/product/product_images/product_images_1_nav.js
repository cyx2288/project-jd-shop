/**
 * Created by ZHUANGYI on 2017/6/5.
 */


var jfProductDetails = {


    //------ 安卓系统滑动到一定位置固定tab

    slidePositionTab: function () {

        if (!browser.os.iOS) {  //判断机型


            var thisNavTab = document.getElementById('NavTab');

            var thisNavTabEmpty = document.getElementById('NavTabEmpty');


            function scrcoll() {

                if (thisNavTabEmpty.getBoundingClientRect().top <= 0) { //元素到页面顶端的位置

                    thisNavTab.style.position = 'fixed';

                    thisNavTab.style.top = '45px';

                }

                else {

                    thisNavTab.style.cssText = "";

                }
            }

            scrcoll();
        }

    },

    //------点击切换class

    clickTabChange: function (fatherEle, changeClass, className) {


        var allEle = fatherEle.getElementsByClassName(className);


        for (var i = 0; i < allEle.length; i++) {

            allEle[i].addEventListener('click', function () {

                fatherEle.getElementsByClassName(changeClass)[0].className = fatherEle.getElementsByClassName(changeClass)[0].className.replace(changeClass, '');

                this.className += ' ' + changeClass;

            }, false);

        }


    },


    //------tab点击切换页面

    tabScrollChange: function () {

        window.addEventListener('scroll', function () {


            var scrollTop = document.body.scrollTop;                                                                       //滚动条的位置

            var divHeigt = document.body.scrollHeight;

            var thisNavTab = document.getElementById('NavTab');

            var topTabHeigt = document.getElementsByClassName('product_nav_contain')[0];

            var a = thisNavTab.offsetHeight + topTabHeigt.offsetHeight;

            var parameterBlockDis = document.getElementsByClassName('product_images_parameter')[0];                         //参数规格到页面顶部的距离

            var serviceBlockDis = document.getElementsByClassName('product_images_service')[0];                             //售后到页面顶部的距离


            var imgBlockDis = document.getElementsByClassName('product_images')[0];


            if (imgBlockDis.getBoundingClientRect().top > thisNavTab.offsetHeight) {                                       //超出部分大于45 = 商品


                slideTabChoose(document.getElementsByClassName('content')[0], 'nav_tab', 0);

            }

            else if (imgBlockDis.getBoundingClientRect().top <= thisNavTab.offsetHeight) {                                //img模块小于等于45 = 图文


                slideTabChoose(document.getElementsByClassName('content')[0], 'nav_tab', 1);


                function titleTabChange() {                                                                                //图文&参数&售后切换


                    if (serviceBlockDis.getBoundingClientRect().top - a <= 0) {                                             //参数模块到页面顶部的距离 a为两个导航的和


                        slideTabChoose(document.getElementById('NavTab'), 'tab', 2);

                    }
                    else if (parameterBlockDis.getBoundingClientRect().top - a <= 0) {


                        slideTabChoose(document.getElementById('NavTab'), 'tab', 1);

                    }
                    else {

                        slideTabChoose(document.getElementById('NavTab'), 'tab', 0);
                    }
                }

                titleTabChange();

            }
            function slideTabChoose(element, childClassName, num) {                                                    //选择切换tab

                if (element.getElementsByClassName('choose_tab')[0]) {


                    element.getElementsByClassName('choose_tab')[0].className = element.getElementsByClassName('choose_tab')[0].className.replace('choose_tab', '');

                }

                element.getElementsByClassName(childClassName)[num].className += ' choose_tab';

            }


        });


    },

    //------点击滚动条到固定位置

    scrollEle: function (ele, distance) {


        var eleScrollTop = ele.getBoundingClientRect().top + document.body.scrollTop - distance;

        //window.scrollTo(0,eleScrollTop);


        var scrollTopMove = setInterval(interValScroll, 5);                                                             //循环

        var iChage = 0;                                                                                                 //循环计数

        var elasticity = 1;                                                                                             //变化的计量

        var thisScrollTop;

        var changeDistanceScrollTop = eleScrollTop - document.body.scrollTop;                                           //真实的相差距离

        function interValScroll() {

            elasticity = (25 - iChage) / 25 * .9 + 1;                                                                   //变化的计量=(25-此时的计数)/25*.9+1; 用于乘法的计量，大概变化过程：1.5 -> 1 -> 0.5 ，模拟平滑过渡

            thisScrollTop = document.body.scrollTop + changeDistanceScrollTop / 50 * elasticity;                        //计算此时的距离


            window.scrollTo(0, thisScrollTop);

            iChage++;                                                                                                   //计数

            if (iChage == 50) {

                window.scrollTo(0, eleScrollTop);


                clearInterval(scrollTopMove);                                                                           //如果到50，则结束循环


            }

        }

    },

    //------切换立即购买&加入购物车

    changeHideBtn:function (classBtn) {

        var FatherBtn = document.getElementsByClassName('prompt_btn')[0];

        FatherBtn.getElementsByClassName('hidebtn')[0].className = FatherBtn.getElementsByClassName('hidebtn')[0].className.replace('hidebtn', '');

        FatherBtn.getElementsByClassName(classBtn)[0].className += ' hidebtn';

},

    //------购物车加减按钮

    numChangeValue:function () {

        var addEle = document.getElementsByClassName('add')[0];

        var reduceEle = document.getElementsByClassName('reduce')[0];

        var thisInput = document.getElementsByClassName('volume_input')[0];

        var lastScrollTop;

        thisInput.addEventListener('focus', function () {

            lastScrollTop = document.body.scrollTop;

            setTimeout(function () {

                window.scrollTo(0, document.body.scrollHeight);

            }, 300)

        });

        thisInput.addEventListener('blur', function () {

            window.scrollTo(0, lastScrollTop);

            this.value = changeValue(this.value);

        });


        addEle.addEventListener("touchstart", function () {

            var thisValue = thisInput.value;

            thisValue++;

            document.getElementsByClassName('volume_input')[0].value = changeValue(thisValue);
        });

        reduceEle.addEventListener("touchstart", function () {

            var thisValue = thisInput.value;

            thisValue--;


            document.getElementsByClassName('volume_input')[0].value = changeValue(thisValue);


        });

        function changeValue(num) {


            if (num <= 1 || !num) {

                return 1;
            }

            else {

                return num;
            }


        }


    }

};

















