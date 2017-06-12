/**
 * Created by ZHUANGYI on 2017/6/12.
 */

/*切换tab*/

var jfShoppinCart = {

    editDeleteChange: function () {

        document.getElementById('editTabBtn').addEventListener('click', function () {


            if (this.innerText == '编辑') {                                                                                   //当文字为编辑时候

                this.innerText = '完成';                                                                                    //点击为'完成'

                document.getElementById('settlementTab').style.transform = 'translateY(55px)';

                document.getElementById('deleteTab').style.transform = 'translateY(0)';

            }

            else if (this.innerText == '完成') {

                this.innerText = '编辑';

                document.getElementById('settlementTab').style.transform = 'translateY(0)';

                document.getElementById('deleteTab').style.transform = 'translateY(55px)';
            }

        })

    },


    /*选择radio*/
    checkBoxChange: function () {

        var allCheckBox = document.getElementsByClassName('allcheck');

        var checkBox = document.getElementsByName('radio');

        for (var i = 0; i < checkBox.length; i++) {

            var thischeckBox = checkBox[i];

            /*thischeckBox.checked = allCheckBox.checked;*/
        }


        //判断checkbox亮否

        function judgeRadioChecked() {

            var checkBoxTab = document.getElementsByTagName('input').document.getElementsByClassName('radio');

            for (var i = 0; i < checkBoxTab.length; i++) {

                if (checkBoxTab[i].checked) {

                    return false;
                }
            }
            return true;
        }
        
        //亮灯方式

        function RadioCheckWay() {

            var checkBoxTab = document.getElementsByTagName('input').document.getElementsByClassName('radio');
            
        }

    }


};






