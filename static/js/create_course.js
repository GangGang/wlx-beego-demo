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

	var current_arr = [];
	// var current_data = teacher_list.data;//当前数组(测试用)
	// var current_data_c = course_data.data;

	var org_id
	var school_id
	var teacher_user_id
	var baseprice  //价格最小的输入值
	var upfile_url  //url
	var course_duration   //时长
	var class_type_code   //顶级的code
	var class_child_type_code //子级的code
	var grade_type_code     //集体课  一对一
	var is_enabled   //是否上架
	var is_single


	org_id = $('.org_id').val();
	    school_id = $('.school_id').val();

	    console.log(org_id + 'hdsdhfjksahf' + school_id)

	    var course_second_type_list = JSON.parse($('.drop_li_types').val());

	    //选择是上架
	    $('.isshopping').click(function () {
	        $('.isshopping_warning').text('上架')
	    })
	    //选择不上架
	    $('.isnotshopping').click(function () {
	        $('.isshopping_warning').text('暂不上架')
	    })
	    //选择课程大类
	    $('.chosse_topskill_btn').click(function () {
	        if ($('.course_name_input input').val() == "") {
	            $('.course_name_input span').css('color', 'red')
	            $('.course_name_input span').text('*请给课程起个响当当的名字吧')  //提示要填写课程
	        }
	        else {
	            $('.chosse_skill_btn').removeClass('disabled')

	        }
	    })

	    $('.chosse_topskill li').click(function () {
	        //清除子类选择
	        $('.chosse_skill ul').find('li').remove()
	        $('.chosse_issingle_btn').addClass('disabled')
	        $('.chosse_teacher_btn').addClass('disabled')
	        $('.delete_teacher_button').addClass('disabled')
	        $('.delete_teacher_button').siblings("input").val("")

	        $('.chosse_skill input').val('')
	        $('.chosse_issingle input').val('')
	        class_type_code = $(this).attr('wlx-code')

	        $('.chosse_topskill input').val($(this).text())
	        $('.chosse_skill_btn').removeClass('disabled')

	        var j = $(this).attr("wlx-topskill")

	        $.each(course_second_type_list[j], function (drop_index, drop_li) {
	            var $drop_next_li = $('<li></li>')
	            $drop_next_li.attr('wlx-skill', drop_index)
	            $drop_next_li.attr('wlx-child-code', drop_li.code)
	            $drop_next_li.text(drop_li.name)
	            $('.chosse_skill ul').append($drop_next_li)
	        })

	        $('.chosse_skill li').click(function () {
	            class_child_type_code = $(this).attr('wlx-child-code')
	            $('.chosse_teacher_btn').addClass('disabled')
	            $('.chosse_skill input').val($(this).text())

	            //清除选择
	            $('.chosse_issingle_btn').removeClass('disabled')
	            $('.chosse_issingle input').val('')
	            $('.delete_teacher_button').addClass('disabled')
	            $('.delete_teacher_button').siblings("input").val("")

	            $('.chosse_issingle li').click(function () {
	                $('.delete_teacher_button').addClass('disabled')
	                $('.delete_teacher_button').siblings("input").val("")
	                grade_type_code = $(this).attr('wlx-class-type')
	                course_duration = $(this).attr('course_duration')
	                baseprice = $(this).attr('wlx-baseprice')

	                $('.course_length_warming').text('课程时长:' + course_duration + '分钟')
	                $('.course_price_warming').text('平台底价:¥' + baseprice + '')
	                $('.chosse_issingle input').val($(this).text())
	                $('.chosse_teacher_btn').removeClass('disabled')
	                $('.submit_btn').removeClass('disabled')

	                //TODO 提示不能小于平台低价
	                $('.class_price').find('input').blur(function () {
	                    if (this.value < Number(baseprice)) {
	                        // TODO 提示不能小于平台低价
	                        mizhu.upload("提示,不能小于平台底价")
	                        $('.course_price_warming').css('color', 'red')

	                    }
	                    else {
	                        // TODO 提示不能小于平台低价
	                        $('.course_price_warming').css('color', 'green')
	                    }
	                })

	            })
	        })
	    })


	    var course_input_judge = function () {
	        if ($('.course_name_input input').val() == "") {
	            $('.course_name_input span').text('课程的名字不能是空的哦!!!')
	            $('.course_name_input span').css('color', 'red')

	        }
	        else {
	            $('.course_name_input span').text('')
	        }

	    }

	    //当输入了课程的名字后失去输入框的焦点的时候
	    $('.course_name_input input').blur(function () {
	        course_input_judge()
	    });
	    //判断有没有输入课程名字
	    $('.chosse_teacher_btn').click(function () {
	        //判断有没有输入课程名字
	        //course_input_judge()
	        if ($(this).hasClass('disabled')) {

	        }
	        else {
	            getData("/orgs/" + org_id + "/schools/" + school_id + "/classes/teachers/?firstCourseType=" + class_type_code + "&secondCourseType=" + class_child_type_code + "");
	            $('#teacher_alert').modal()
	        }
	    })

	    $('.delete_teacher_button').click(function () {
	        //选取自己的兄会级的input区删除内容就可以
	        $(this).siblings("input").val("");

	    })


	    //上传文件
	    $('#UpLoadFile').change(function (e) {
	        var _self = this;
	        //$(_self).siblings(0).attr('src',window.URL.createObjectURL($(_self)[0].files[0]));
	        var file = e.target.files[0];
	        if(window.FileReader){

	            var fr = new FileReader();
	            fr.onload = function(e) {
	                var image = new Image();
	                image.src = e.target.result;
	                console.log('-------' + e.target.result);
	                console.log(image.width + '---' + image.height);
	                if (image.width < 200 || image.height < 200 || !uploadimg.imgfiletesting(file)) {
	                    alert('wrong');
	                    return
	                }

	                fr.readAsDataURL(file)
	        }

	        if (uploadimg.imgfiletesting(file)) {
	            $('.loading').attr('src', '/static/images/loading2.gif');

	        }
	        else {
	            mizhu.upload("文件格式不支持")
	            return
	        }
	            $('.loading').show()
	            $('.upload_file label').text('')

	            uploadimg.upfile(file, function (err) {
	                console.log(err)
	            }, function (storeAs) {
	                $(_self).siblings('img.double').attr('ali', storeAs)
	                upfile_url = storeAs
	                $('.img_fire').attr('src', window.URL.createObjectURL(file));
	            });
	        }

	    });


	    // TODO 提交

	    $('.submit_btn').click(function () {
	        if ($(this).hasClass('disabled')) {

	        }
	        else {
	            function getFileName2(o) {//通过第二种方式获取文件名
	                var arr = o.split('\\');//通过\分隔字符串，成字符串数组
	                return arr[arr.length - 1];//取最后一个，就是文件名
	            }

	            //undefined
	            if (upfile_url == undefined) {
	                mizhu.upload('必须上传课程图片')
	                return
	                //upfile_url = "http://p1.bqimg.com/1949/ea6e21b39e71c0b7.jpg"
	            }
	            var submit_souce = new Object();

	            submit_souce.teacher_user_id = teacher_user_id;

	            submit_souce.title = $('.course_name_input input').val();//教室的名称

	            if (getFileName2(upfile_url) == "jpeg" || getFileName2(upfile_url) == "jpg" || getFileName2(upfile_url) == "png") {
	                submit_souce.image_url = upfile_url;    //'图片URL';
	                submit_souce.video_url = ""
	            }
	            if (getFileName2(upfile_url) == "mp4" || getFileName2(upfile_url) == "rmvb" || getFileName2(upfile_url) == "MKV" || getFileName2(upfile_url) == "FLV") {
	                submit_souce.video_url = upfile_url;    //'图片URL';
	                submit_souce.image_url = ""
	            }
	            else {
	                submit_souce.image_url = upfile_url;    //'图片URL';
	                submit_souce.video_url = ""
	            }
	            submit_souce.price = $('.class_price').find('input').val();//class_price//价格

	            if (submit_souce.price == "") {
	                mizhu.upload('课程底价能不能为空')
	                return
	            }
	            submit_souce.price = $('.class_price input').val();//class_price//价格

	            submit_souce.class_duration = course_duration; //时长

	            submit_souce.class_type_code = class_type_code; // 课程顶级类型

	            submit_souce.class_child_type_code = class_child_type_code; //课程子级类型

	            submit_souce.grade_type_code = grade_type_code;  //集体课  一对一

	            is_enabled = true
	            if ($('.btn-group_warning input[name="options"]:checked').val() == 1) {
	                is_enabled = false
	            }

	            submit_souce.is_enabled = is_enabled;//上架

	            if (grade_type_code == "one") {
	                is_single = "true"
	            }
	            else
	                is_single = "false"

	            submit_souce.is_single = is_single;//

	            $(this).text('正在提交')
	            $(this).addClass('disabled')

	            function callback(data){
	                if (data.code == 0) {
	                    mizhu.upload('提交成功')
	                    $(this).text('提交')
	                    $(this).removeClass('disabled')

	                    //TODO 支付完成的业务完成后做以下跳转  让用户看到订单完成页面
	                    $('.href a').attr('href', '/orgs/' + org_id + '/schools/' + school_id + '/courses/')
	                    $('.href a').get(0).click()
	                }
	                else {
	                    mizhu.fail(data.message)
	                    $(this).text('提交')
	                    $(this).removeClass('disabled')

	                }
	            }

	            ajaxRequest('/orgs/' + org_id + '/schools/' + school_id + '/classes/','post',JSON.stringify(submit_souce),
	               callback)

	           /*$.ajax({
	                    type: 'POST',
	                    url: '/orgs/' + org_id + '/schools/' + school_id + '/classes/',
	                    data: JSON.stringify(submit_souce),
	                    dataType: 'json',
	                    contentType: "application/json;charset=utf-8",

	                    error: function (status, error) {

	                        mizhu.upload('提交请求失败')
	                        $(this).text('提交')
	                        $(this).removeClass('disabled')
	                    },
	                    success: function (data, text) {


	                    }
	                }
	            )*/
	        }
	    });

	$('#teacher_alert .all').addClass('select_active');

	$('#teacher_alert .carousel').carousel({
	    interval: 0
	})


	//TODO:GET请求
	function getData(URL) {
	    $.ajax({
	        url: URL,
	        type: "GET",
	        headers: {
	            "Accept": "application/json"
	        },
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        error: function (jqXHR, textStatus, errorThrown) {
	            mizhu.fail('获取老师请求失败')
	            $('#carousel-teacher .aaaabox').empty();
	        },
	        success: function (data, textStatus, jqXHR) {
	            console.log(data);
	            if (data.code == 0) {
	                reload(data);
	                $('.teacher_item').removeClass('chosse_active')
	            }
	            else {

	                $('#carousel-teacher .aaaabox').empty();
	                mizhu.upload(data.message)
	                // $('.alert-warning strong').text(data.message)
	                //
	                // $('.alert').css("display","inline-block")
	                // setTimeout(function () {
	                //     $('.alert').css("display","none")
	                // }, 5000);
	            }
	        }
	    })
	}


	$('.sure').click(function () {
	    teacher_user_id = $('.chosse_active .teacher_box').attr('wlx-teacherId')
	    $('.chosse_teacher_input input').val($('.chosse_active .course_name').text())
	    $('#teacher_alert').modal('hide');
	})

	//选择老师弹框
	//重新刷新UI
	function reload(all_data) {
	    // $('.teacher_item').remove();
	    $('#carousel-teacher .aaaabox').empty();
	    var data_count = all_data.data.length

	    if (data_count <= 4) {
	        $('#carousel-teacher .aaaabox').append('<div id="' + 1 + '" class="item cell active"></div>')
	    }
	    if (data_count > 4) {
	        var page_count = Math.ceil(data_count / 4)

	        for (var k = 1; k <= page_count; k++) {
	            if (k == 1) {
	                $('#carousel-teacher .aaaabox').append('<div id="' + k + '" class="item cell1 active"></div>')
	            }
	            if (k > 1) {
	                $('#carousel-teacher .aaaabox').append('<div id="' + k + '" class="item cell2"></div>')
	            }
	        }
	    }

	    $.each(all_data.data, function (teacher_index, teacehr_info) {

	        // $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag = "'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')

	        // {
	        //     "id": 10,
	        //     "name": "黄明",
	        //     "avatar_url": "http://static-wlx.oss-cn-beijing.aliyuncs.com/681AE09A-7AB5-459F-9DF9-2780F3E9E95E.jpg",
	        //     "teacherIntro": "暂无数据"
	        // }
	        var $teacher_item = $("<div></div>")
	        var $teacher_box = $("<div></div>")
	        var $teacher_img = $("<img/>")
	        var $teacher_name = $("<div></div>")
	        var $teacher_info = $("<div></div>")

	        var indexxx = parseInt(teacher_index / 4) + 1

	        $('#teacher_alert #' + (parseInt(teacher_index / 4) + 1)).append($teacher_item);

	        $teacher_item.addClass('teacher_item')
	        $teacher_item.attr('tag_flag', teacher_index)
	        $teacher_item.append($teacher_box)
	        $teacher_box.attr('wlx-teacherId', teacehr_info.id)
	        $teacher_box.append($teacher_img)
	        $teacher_box.append($teacher_name)
	        $teacher_box.append($teacher_info)
	        $teacher_box.addClass('teacher_box')
	        $teacher_img.addClass('teacher_img')
	        $teacher_name.addClass('course_name')
	        $teacher_info.addClass('course_desc')
	        $teacher_img.attr('src', teacehr_info.avatar_url)
	        $teacher_name.text(teacehr_info.name)
	        $teacher_info.text(teacehr_info.teacherIntro)

	    })


	    $('.teacher_item').click(function () {

	        if ($(this).children(".add_img").length > 0) {
	            $(this).children(".add_img").remove()
	            $(this).removeClass('chosse_active')
	        }
	        else {
	            //先删
	            $('.teacher_item').children(".add_img").remove()
	            $('.teacher_item').removeClass('chosse_active')
	            //后加
	            console.log(all_data.cdnUrl)
	            $(this).append('<img src=/static/images/selectcheck_h.png class="add_img">')
	            $(this).addClass('chosse_active')

	        }
	    })
	}



/***/ }
/******/ ]);