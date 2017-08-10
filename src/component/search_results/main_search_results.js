/**
 * Created by ZHUANGYI on 2017/6/26.
 */

var jdSearch_results = {

//收起下拉框
    hidePrompt: function () {

        var allEle = document.getElementById('search_prompt').getElementsByClassName('jd_drop_down');

        for (var i = 0; i < allEle.length; i++) {

            allEle[i].className = 'jd_drop_down';

        }

    },


//清除show
    hideShow: function (num) {


        var elesOne = ['comprehensive', 'brand', 'filter'];

        var elesTwo = ['volume', 'price'];

        var farEle = document.getElementsByClassName('search_nav_content')[0];

        var thisEle;

        if (num == 1) {

            thisEle = allEle(elesOne);

        }

        else {

            thisEle = allEle(elesTwo);

        }

        function allEle(className) {

            var ele = [];

            for (var i = 0; i < className.length; i++) {

                ele.push(farEle.getElementsByClassName(className[i])[0])

            }


            return ele

        }

        for (var i = 0; i < thisEle.length; i++) {

            if (thisEle[i].className.indexOf('show') > -1) {

                thisEle[i].className = thisEle[i].className.replace('show', '')

            }

        }

    },


    //删除搜索模块时显示在搜索栏
    searchTabBlock: function () {


        var eleBlock = document.getElementsByClassName('product_choose');

        for (var i = 0; i < eleBlock.length; i++) {

            eleBlock[i].addEventListener('click', function (event) {

                for (var j = 0; j < eleBlock.length; j++) { //遍历一遍需要的元素

                    if (eleBlock[j].innerHTML != this.innerHTML) {  //如果他点击的元素不是他本身 break

                        break
                    }

                }

                document.getElementsByClassName('search_tab')[0].getElementsByTagName('span')[0].innerHTML = eleBlock[j].innerHTML; //赋值


                for (var a = 0; a < 2; a++) {   //删除本身

                    eleBlock[0].parentNode.removeChild(eleBlock[0]);
                }

                //阻止事件冒泡&默认事件

                event.preventDefault();

                event.stopPropagation();


            }, false)

        }

    },


    //筛选模块
    filterBlockEvent: function () {


        //加监听和删除监听
        function sortBlockChoose(num) { //如果mun=1加监听，不等于1解除监听

            var sortBlock = document.getElementsByClassName('sort_block');

            for (var i = 0; i < sortBlock.length; i++) {

                if (num == 1) {

                    document.getElementsByClassName('type')[i].addEventListener('click', addFilterEvent, false);

                }

                else {

                    document.getElementsByClassName('type')[i].removeEventListener('click', addFilterEvent, false);

                }

            }


        }

        function addFilterEvent(e) {


            var evt = e || window.event;

            var thisTargetEle = evt.srcElement || evt.target;

            if (thisTargetEle.className == 'type') { //如果点到的是自己 则class不变

                thisTargetEle.className = 'type';
            }
            else {

                if (thisTargetEle.className.indexOf('selected') > -1) {  //点击本身也会取消

                    thisTargetEle.className = '';
                }
                else {

                    thisTargetEle.className += ' selected';        //也可以点击其他的
                }
            }

        }


        //展开内容
        document.getElementsByClassName('filter')[0].addEventListener('click', function () {


            if (this.className.indexOf('show') > -1) {

                jdSearch_results.hideShow(1);

                //点击任意下拉框收回
                jdSearch_results.hidePrompt();

                //收回下拉框
                searchFilter.hide();

                this.className = 'filter';

                sortBlockChoose(0);


            }

            else {


                jdSearch_results.hideShow(1);

                jdSearch_results.hidePrompt();

                this.className += ' show';

                searchFilter.show();


                //多项选择tab
                sortBlockChoose(1);


            }


        });

        //重置
        document.getElementsByClassName('filter_reset')[0].addEventListener('click', filterResetAll, false);


        function filterResetAll() {

            var listBox = document.getElementsByClassName('type');


            for (var i = 0; i < listBox.length; i++) {

                var divEle = listBox[i].getElementsByTagName('div');

                for (var j = 0; j < divEle.length; j++) {

                    divEle[j].className = divEle[j].className.replace('selected', '');

                }

            }

            inputReset();

            //清除input里面的内容

            function inputReset() {

                var inputEle = document.getElementsByTagName('input');


                for (var j = 0; j < inputEle.length; j++) {


                    if (inputEle[j].value) {

                        inputEle[j].value = '';
                    }

                }

            }

        }
    },

    //品牌模块

    brandBlockEvent: function () {

        document.getElementsByClassName('brand_list')[0].addEventListener('click', function (e) {

            var evt = e || window.event;

            var thisTargetEle = evt.srcElement || evt.target;

            if (thisTargetEle.className == 'brand_list') { //如果点到的是自己 则class不变

                thisTargetEle.className = 'brand_list';
            }
            else {

                if (thisTargetEle.className.indexOf('selected') > -1) {  //点击本身也会取消

                    thisTargetEle.className = '';
                }
                else {

                    thisTargetEle.className += ' selected';        //也可以点击其他的
                }
            }

        }, false);

        //下拉框选择
        document.getElementsByClassName('brand')[0].addEventListener('click', function () {


            if (document.getElementById('brand_list').className.indexOf('show') > -1) {

                jdSearch_results.hideShow(1);

                jdSearch_results.hidePrompt();

                searchBrand.hide();

                this.className = 'brand';

            }

            else {

                jdSearch_results.hideShow(1);

                jdSearch_results.hidePrompt();

                this.className += ' show';

                searchBrand.show();


            }


        }, false);


        //重置

        document.getElementsByClassName('brand_reset')[0].addEventListener('click', resetAll, false);

        function resetAll() {

            var boxEle = document.getElementsByClassName('brand_list')[0];

            var allEle = boxEle.getElementsByTagName('div');

            for (var i = 0; i < allEle.length; i++) { //找到页面上所有的selected 并且删除

                allEle[i].className = allEle[i].className.replace('selected', '')

            }

        }

    },

    //综合模块

    generalBlockEvent: function () {


        function addEvent(e) {

            var evt = e || window.event;

            var thisTargetEle = evt.srcElement || evt.target;

            if (document.getElementsByClassName('selected')[0]) {

                document.getElementsByClassName('selected')[0].className = ''

            }

            thisTargetEle.className += ' selected';

            searchGeneral.hide({
                fn: function () {

                    //收回之后删除监听
                    document.getElementsByClassName('general_list')[0].removeEventListener('click', addEvent, false);

                }
            });

            //获取私有值
            document.getElementsByClassName('comprehensive')[0].getElementsByTagName('span')[0].innerHTML = thisTargetEle.getAttribute('data-name');


        }


        document.getElementsByClassName('comprehensive')[0].addEventListener('click', function () {


            if (document.getElementById('general_list').className.indexOf('show') > -1) {


                jdSearch_results.hideShow(1);

                jdSearch_results.hidePrompt();

                searchGeneral.hide();

                //jdSearch_results.hideShow('comprehensive','comprehensive search_tab');

                setTimeout(function () {

                    this.className = 'comprehensive search_results_tab';

                }.bind(this), 1)//指代function外面的


            }

            else {


                jdSearch_results.hideShow(1);

                jdSearch_results.hidePrompt();

                if (this.className.indexOf('show') == -1) {

                    this.className += ' show';

                    searchGeneral.show({
                        fn: function () {

                            document.getElementsByClassName('general_list')[0].addEventListener('click', addEvent, false);


                        }
                    })


                }


            }


        }, false);
    },


    //搜索模块

    searchRecommend: function () {

        var _this = this;

        var thisEle = document.getElementsByClassName('search_results_recommend')[0];

        thisEle.addEventListener('click', function (e) {

            var evt = e || window.event;//兼容性

            var thisTargetEle = evt.srcElement || evt.target;


            if (thisTargetEle != thisEle) {

                var targetEle;

                if (thisTargetEle.className.indexOf('product') > -1) { //如果点击是他本身

                    targetEle = thisTargetEle;

                }

                else {  //如果不是的话

                    targetEle = thisTargetEle.parentNode   //等于他的父元素
                }


                var fatherEle = document.getElementsByClassName('search_tab')[0];

                var productEle = fatherEle.getElementsByClassName('product_choose');


                //删除
                if (productEle.length > 1) { //如有页面有个元素的话 执行

                    for (var i = 0; i < 2; i++) {

                        productEle[0].parentNode.removeChild(productEle[0]);//删除自己


                    }

                }


                //获取需要插入的元素
                caseBox(document.getElementsByClassName('search_tab')[0].getElementsByTagName('span')[0].innerHTML);

                caseBox(targetEle.getElementsByTagName('span')[0].innerHTML);


                //点击之后内容代入至搜索框

                _this.searchTabBlock();

                //小框模板
                function caseBox(caseName) {

                    var addEle = document.createElement('div');  //添加一个元素的tag

                    addEle.className = 'product_choose';   //添加元素的classname

                    addEle.innerHTML = caseName;  //添加元素的innerHtml

                    var tagEle = fatherEle.getElementsByTagName('span')[0];

                    fatherEle.insertBefore(addEle, tagEle);  //在span前插入内容

                }


                //清除两个小框
                document.getElementsByClassName('search_recommend_content')[0].innerHTML = ''


            }


        }, false)

    },


    //价格选择
    priceChoose: function () {

        var _this = this;

        var allEle = document.getElementsByClassName('search_results_tab');

        for (var i = 0; i < allEle.length; i++) {

            allEle[i].addEventListener('click', function () {


                remove();//先清空

                this.className += ' show';

                _this.hidePrompt();
                //  searchGeneral.hide();


            }, false);


            function remove() {

                for (var j = 0; j < allEle.length; j++) {

                    if (allEle[j].className.indexOf('show') > -1) {

                        allEle[j].className = allEle[j].className.replace('show', '')

                    }
                }

            }
        }
    },

};






