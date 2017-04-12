/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	$().ready(function () {



	    var org_id = $('.org_id').val()
	    var isable_send = false

	    $('.invitation_input').keyup(function () {

	        console.log('111111')
	        onkeyup = this.value = this.value.replace(/[^\r\n0-9\;]/g, '')
	        $('.warming').text("")

	    })

	    var invitationObject = {}

	    $('.invitation_btn').click(function () {

	        var str = $('.invitation_input').val()
	        var strs = new Array(); //定义一数组
	        strs = str.split(";"); //字符分割

	        $.each(strs, function (index, val) {

	            var warming_str = ""

	            if (/^1[0-9]{10}$/.test(val)) {

	            }
	            else {
	                //document.body.innerHTML.replace(val, '<font color="red">' + val + '</font>')
	                warming_str += val
	                $('.warming').text(warming_str + "手机号填写错误")
	                return

	            }
	            console.log("dasfsafdsafdsa发发的萨芬")

	            isable_send = true
	            invitationObject.user_names = strs

	            if (invitationObject.user_names && isable_send == true)
	            {
	                requst("/orgs/"+org_id+"/teachers/invitation_teacher/","邀请",invitationObject)

	            }
	        })

	    })

	    $('.invitation_again').click(function () {

	        var againObject = {}
	        var strs = []
	        strs.push($(this).siblings("p").text())
	        againObject.user_names = strs
	        requst("/orgs/"+org_id+"/teachers/invitation_teacher/","重新邀请",againObject)


	    })

	    $('.invitation_delete').click(function () {

	        var deteObject = {}
	        deteObject.user_name = $(this).siblings("p").text()

	        requst("/orgs/"+org_id+"/teachers/delete_invitation_teacher/","删除",deteObject)

	    })
	})

	// 邀请要是要扭   // 删除邀请超时的老师
	var requst = function (url,click_type, object) {

	    $.ajax({
	            type: 'POST',
	            url: url,
	            data: JSON.stringify(object),
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",

	            error: function (status, error) {

	                mizhu.fail('请求失败')

	            },
	            success: function (data, text) {
	                if (data.code == 0) 
	                {
	                    if (click_type = "重新邀请")
	                    {

	                    }
	                    if (click_type = "删除")
	                    {

	                    }
	                    if (click_type = "邀请")
	                    {

	                    }
	                    window.location.reload();

	                }
	                else {

	                    mizhu.fail(data.message)

	                }

	            }
	        }
	    )


	}







/***/ }
/******/ ]);