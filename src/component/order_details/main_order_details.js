/**
 * Created by ZHUANGYI on 2017/6/22.
 */
var jfOrderTips = {

    orderDetailsDialog: function () {

        document.getElementById('view_order').addEventListener('click', function () {

            var orderDialog = document.getElementsByClassName('order_dialog');

            orderDialog[0].style.display = 'block';

        }, false);

        document.getElementById('dialog_bg_order').addEventListener('click', bgRemove, false);

        document.getElementsByClassName('cancel')[0].addEventListener('click', bgRemove, false);

        function bgRemove() {

            var orderDialog = document.getElementsByClassName('order_dialog');

            orderDialog[0].style.display = 'none';

        }

    }
}