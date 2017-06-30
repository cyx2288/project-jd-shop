/**
 * Created by ZHUANGYI on 2017/6/26.
 */


function clickTSortChange() {

    var fatherEle = document.getElementsByClassName('product_category_slide')[0];

    var allEle = fatherEle.getElementsByTagName('div');


    for (var i = 0; i < allEle.length; i++) {

        allEle[i].addEventListener('click', function () {

            var eleHeight = this.offsetTop;
            //元素到父元素的高度

            var screenHeight = window.innerHeight;
            //浏览器的高度

            var thisEleHeight = this.offsetHeight;
            //点击元素的高度

            var distance = eleHeight - screenHeight/2 + thisEleHeight/2;

            fatherEle.getElementsByClassName('select_sort')[0].className = fatherEle.getElementsByClassName('select_sort')[0].className.replace('select_sort', '');

            this.className += ' select_sort';

            this.parentNode.scrollTop = distance;




        }, false);










    }


}
