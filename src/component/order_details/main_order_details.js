/**
 * Created by ZHUANGYI on 2017/6/22.
 */
var jfOrderTips = {

    orderDetailsDialog: function () {

        document.getElementById('view_order').addEventListener('click', function () {

            var orderDialog = document.getElementsByClassName('order_dialog');

            orderDialog[0].style.display = 'block';

            document.getElementById('dialog_bg_order').addEventListener('touchmove',windowBanEvent.Canceling,false);//给阴影绑定冒泡事件

        }, false);

        document.getElementById('dialog_bg_order').addEventListener('click', bgRemove, false);

        document.getElementsByClassName('cancel')[0].addEventListener('click', bgRemove, false);

        function bgRemove() {

            var orderDialog = document.getElementsByClassName('order_dialog');

            orderDialog[0].style.display = 'none';

        }

    },

    orderDiscountChoose:function () {

        document.getElementById('discountBox').addEventListener('click', addEvent, false);


        function addEvent(e) {

            //事件委托 绑定再父元素上
            var evt = e || window.event;

            var thisTargetEle = evt.srcElement || evt.target;

            var selectEle = document.getElementsByClassName('select_use');

            //console.log(thisTargetEle)

            //清楚页面所有的select_use

            if (selectEle[0]) {

                selectEle[0].className = selectEle[0].className.replace(' select_use','')

            }

            //点击的是本身

            if( thisTargetEle.className.indexOf('discount_list')!==-1){


                thisTargetEle.className += ' select_use';

                discountShow.hide();

                return thisTargetEle;


            }


            //点击是监听元素

            if( thisTargetEle == document.getElementById('discountBox')){


                return false


            }


            //点击元素的子元素


            while(thisTargetEle.className.indexOf('discount_list') === -1){

                thisTargetEle = thisTargetEle.parentNode;

            }


            //返回的thisTargetEle添加class 选中

            thisTargetEle.className += ' select_use';


            //选中后弹出框消失

            discountShow.hide();

            //选择的金额对应优惠券

            document.getElementById('discountList').getElementsByClassName('font_red')[0].innerHTML = thisTargetEle.getAttribute('data-name');


        }

    }


};

