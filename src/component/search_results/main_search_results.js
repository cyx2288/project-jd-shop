/**
 * Created by ZHUANGYI on 2017/6/26.
 */

var jdSearch_results = {

/*
    tickChoose:function () {

    var chooseTab = document.getElementsByClassName('in_stock')[0];

    var labelTab = chooseTab.getElementsByTagName('label')[0];

    chooseTab.addEventListener('click', function () {

        if (this.className.indexOf('select_tab') > -1) {

            this.className = this.className.replace('select_tab', '');
        }

        else {

            this.className += ' select_tab';

        }


    }, false);

    /!*    function inStock() { //打钩变化效果

     if (tickTab.className.indexOf('tick') > -1) {

     tickTab.className = tickTab.className.replace('tick', '');
     }

     else {

     tickTab.className += ' tick'
     }

     }*!/

},
*/

//价格选择
priceChoose:function () {

    var allEle = document.getElementsByClassName('search_tab');

    for (var i = 0; i < allEle.length; i++) {

        allEle[i].addEventListener('click', function () {

            remove();

            this.className += ' show';


        }, false);


        function remove() {

            for (var j = 0; j < allEle.length; j++) {

                if (allEle[j].className.indexOf('show') > -1) {

                    allEle[j].className = allEle[j].className.replace('show', '')

                }
            }

        }
    }
}

};



