/**
 * Created by ZHUANGYI on 2017/6/5.
 */



window.addEventListener('scroll', function () {


    if (!browser.os.iOS) {  //判断机型


        var thisNavTab = document.getElementById('NavTab');

        var thisNavTabEmpty = document.getElementById('NavTabEmpty');


        function scrcoll() {

            if (thisNavTabEmpty.getBoundingClientRect().top <= 0) { //元素到页面顶端的位置

                thisNavTab.style.position = 'fixed';

                thisNavTab.style.top = '45px';


                /*slideTabChange(document.getElementById('tabNav'),'tab',1);*/

            }

            else {

                thisNavTab.style.cssText = "";

            }
        }

        scrcoll();
    }

});

function clickTabChange(fatherEle, changeClass, className) {

    var allEle = fatherEle.getElementsByClassName(className);


    for (var i = 0; i < allEle.length; i++) {

        allEle[i].addEventListener('click', function () {

            fatherEle.getElementsByClassName(changeClass)[0].className = fatherEle.getElementsByClassName(changeClass)[0].className.replace(changeClass, '');

            this.className += ' ' + changeClass;

        }, false);

    }

}


clickTabChange(document.getElementsByClassName('content')[0],'choose_tab','nav_tab');


clickTabChange(document.getElementById('NavTab'),'choose_tab','tab');





function tabSrollChange() {


    window.addEventListener('scroll', function () {

        console.log(scrollEle(document.getElementsByClassName('product_images_parameter')[0]))

        var scrollTop = document.body.scrollTop;                                                                       //滚动条的位置

        var divHeigt = document.body.scrollHeight;

        var thisNavTab = document.getElementById('NavTab');

        var topTabHeigt = document.getElementsByClassName('product_nav_contain')[0];

        var a = thisNavTab.offsetHeight + topTabHeigt.offsetHeight;

        var parameterBlockDis = document.getElementsByClassName('product_images_parameter')[0];                         //参数规格到页面顶部的距离

        var serviceBlockDis = document.getElementsByClassName('product_images_service')[0];                             //售后到页面顶部的距离


        var imgBlockDis = document.getElementsByClassName('product_images')[0];


        if (imgBlockDis.getBoundingClientRect().top > thisNavTab.offsetHeight ) {                                       //超出部分大于45 = 商品


            slideTabChoose(document.getElementsByClassName('content')[0], 'nav_tab', 0);

        }

        else if (imgBlockDis.getBoundingClientRect().top <= thisNavTab.offsetHeight ) {                                //img模块小于等于45 = 图文


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
        function slideTabChoose(element, childClassName, num) {                                                        //

            if(element.getElementsByClassName('choose_tab')[0]) {

                element.getElementsByClassName('choose_tab')[0].className = element.getElementsByClassName('choose_tab')[0].className.replace('choose_tab', '');

            }

            element.getElementsByClassName(childClassName)[num].className += ' choose_tab';

        }

        function scrollEle(ele) {

            var eleScrollTop=ele.getBoundingClientRect().top+document.body.scrollTop;

            return eleScrollTop
        }

    });

}

tabSrollChange();













