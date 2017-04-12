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

	//13237184895
	// function click_student_cell() {
	//
	//     alert("xuan ze xue sheng");
	//
	// }
	// .add_submit_content

	function content_heigth(heigth) {

	    $("#add_student_content").css("height", heigth)

	}

	function add_submit_content_none() {

	    $(".add_submit_content").css("display", "none");


	}

	function add_submit_content_show() {

	    $(".add_submit_content").css("display", "block");

	}

	var getReq = function (url, callback) {


	    var req = $.ajax({
	        url: url,
	        type: "GET",
	        headers: {
	            "Accept": "application/json"
	        },
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        error: function (jqXHR, textStatus, errorThrown) {

	            // alert('输入错误');
	            mizhu.fail('服务器错误')
	            req = null;
	            console.log(errorThrown);


	        },
	        success: function (data, textStatus, jqXHR) {

	            req = null;

	            callback(data);
	        }
	    })
	}


	function ajax_post(url, data_souce, error_back, success_back) {


	    console.log(url)

	    $.ajax({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        data: data_souce,
	        error: function (status, error) {
	            console.log(error)
	            // alert("提交失败!")
	            mizhu.fail("提交失败")
	            error_back(error);

	        },
	        success: function (data, text) {
	            console.log(data.message);
	            success_back(data);

	        }
	    })
	}


	function show_UI() {

	    $(".parent_name").css("display", "block");
	    $(".select_student").css("display", "block");
	    $(".sure_select_stud").css("display", "block");
	    $(".add_new_student").css("display", "block");
	    // $(".add_submit_content").css("display","block");

	}

	function none_UI() {

	    $(".parent_name").css("display", "none");
	    $(".select_student").css("display", "none");
	    $(".sure_select_stud").css("display", "none");
	    $(".add_new_student").css("display", "none");
	    $(".add_submit_content").css("display", "none");

	}


	function slider_action() {

	    $(".add_submit_content").css("display", "block");

	    if (up_down) {


	        $(".add_submit_content").slideDown();

	        $(".new_add_student").text("收起新增学生");

	        up_down = false;

	        content_heigth("1000px");

	    } else {
	        $(".add_submit_content").slideUp();

	        $(".new_add_student").text("新增学生");

	        up_down = true;


	        content_heigth("500px");

	    }

	}


	var student_id;

	var url_add_new;


	var parent_user;


	var select_url;


	var up_down;


	function click_student_cell(ary_students) {


	    $('.img_icon_student').each(function (index) {

	        $(this).click(function () {


	            $('.selct_image').each(function (index_student) {

	                // console.log(ary_students[index_student].studentName);
	                //
	                // $(this).text(ary_students[index_student].studentName);
	                //
	                // $(this).css('color' , 'black');
	                // alert(index_student);


	                $(this).css("display", "none");

	            });


	            // $(this).children().eq(1).text('选中'+ $(this).text());

	            $(this).children().eq(1).css("display", "block");

	            student_id = ary_students[index].id;

	        });

	    });


	}


	function put_student_message(student_by_id, url) {

	    var object = {};

	    object.student_id = student_by_id;


	    $.ajax({

	            type: 'POST',
	            url: url,
	            data: JSON.stringify(object),
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",

	            error: function (status, error) {
	                // alert('系统错误' + status)

	                mizhu.fail('系统错误' + status);
	            },
	            success: function (data, text) {
	                console.log(data)


	                if (data.code == 0) {
	                    mizhu.fail('提交成功');
	                    selcet_stuent(select_url);

	                    student_id = null;
	                }
	                else {
	                    mizhu.fail(data.message);
	                }

	            }
	        }
	    )

	}


	function selcet_stuent(url) {

	    getReq(url, function (data) {

	        console.log(data);

	        if (data.code == 1) {

	            none_UI();


	            if (data.message == "校区存在该账号") {

	                $('.prompt_content').css("display", "none");
	            } else {
	                $('.prompt_content').css("display", "block");
	            }

	            $('.prompt_content').text(data.message);


	            return;

	        }


	        if (data.code == 0) {

	            $('.prompt_content').css("display", "none");
	            show_UI();
	            // slider_action();
	            if (up_down) {
	                content_heigth("1000px");

	            } else {

	                content_heigth("500px");
	            }

	            content_heigth("500px");


	            var ary_students = data.data.student_parent.studentList;


	            // alert(data.data.student_parent.parentsName);


	            $('.student_cell').remove();
	            $(".parent_name_text").text(data.data.student_parent.parentsName);

	            // for(var i = ary_students.length -1 ; i >= 0  ; i--){
	            for (var i = 0; i < ary_students.length; i++) {

	                console.log(ary_students[i].stu_name);

	                var cell = $('<div class="student_cell"  style="float: left; padding: 15px"><div class="img_icon_student"><img class="img_student_icon_ll"/><img class="selct_image" src=""/></div>' +
	                    // '<img   class="img_student_icon_ll"/>' +
	                    '<div class="name_text">' + ary_students[i].stu_name + '</div>' +
	                    '</div>');

	                $(".content_student").append(cell);

	                cell.student_id = ary_students[i].id;

	            }

	            $('.selct_image').attr('src', '/static/images/chooseavatar.png')

	            $('.img_student_icon_ll').each(function (index) {


	                $(this).attr('src', ary_students[index].stu_img)

	            });


	            click_student_cell(ary_students);

	            if (data.message == "success") {


	            } else {

	                if (data.message == "校区存在该账号") {

	                    $('.prompt_content').css("display", "none");
	                } else {

	                    $('.prompt_content').css("display", "block");

	                }

	                $('.prompt_content').text(data.message);


	            }

	        }

	    });

	}

	$().ready(function () {

	    up_down = true;

	    var data = JSON.parse($('#jsonObject').val());


	    console.log(data);


	    var submit_student_url = "/orgs/" + data.org_id + "/schools/" + data.school_id + "/stuparents/confirmadd/";

	    // $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd'});
	    var date = new Date();
	    $('#datetimepicker1').datetimepicker({
	        language: 'zh-CN',
	        weekStart: 1,
	        todayBtn: 1,
	        autoclose: 1,
	        todayHighlight: 1,
	        startView: 2,
	        minView: 2,
	        forceParse: 0,
	        format: 'yyyy-mm-dd',
	        endDate: date
	    }).on("click", function () {
	        console.log($('#datetimepicker1 input').val())
	        var date = new Date()
	        $("#datetimepicker1").datetimepicker("setEndDate", date.toLocaleDateString())
	    })

	    $('#datetimepicker1 span').on("click", function () {
	        console.log($('#datetimepicker1 input').val())
	        var date = new Date()
	        $("#datetimepicker1").datetimepicker("setEndDate", date.toLocaleDateString())
	    });


	    $('.slider_student').click(function () {


	        slider_action();
	        // $(".add_submit_content").slideToggle();

	    });


	    $('.sure_button').click(function () {

	        $(".add_submit_content").slideUp();

	        up_down = true;

	        parent_user = $('.text_file').val();


	        url_add_new = "/orgs/" + data.org_id + "/schools/" + data.school_id + "/create_student/" + $('.text_file').val() + "/";


	        select_url = "/orgs/" + data.org_id + "/schools/" + data.school_id + "/stuparents/addstudent/?username=" + $('.text_file').val();


	        selcet_stuent(select_url);

	    });


	    $('.uploadimg').change(function (e) {
	        var _self = this;
	        if ($(_self)[0].files[0]) {
	            $(_self).parent().find('img.loading').show()
	            var sib = $(_self).siblings('img.double')
	            sib.attr('src', window.URL.createObjectURL($(_self)[0].files[0]));
	            var file = e.target.files[0];
	            uploadimg.upfile(file, function (err) {
	                console.log(err)
	            }, function (storeAs) {
	                $(_self).siblings('img.double').attr('ali', storeAs)
	                $('img.loading').hide()
	            });
	        }
	    });


	    $('.give_up_button').click(function () {


	        slider_action();

	    });


	    $(".student_name_n").blur(function () {


	        if ($('.student_name_n').val()) {


	            $(".prompt").css("display", "none");


	        } else {


	            $(".prompt").css("display", "inline");

	        }

	    })


	    $('.flish_butt').click(function () {


	        // alert($('.student_name_n').val());
	        // alert($('.decoration_date').val());
	        // alert($('.selectpicker').val());
	        // alert($('.pho').attr("ali"));

	        if (!$('.decoration_date').val()) {


	            // $(".prompt").text("*请输入名字");

	            mizhu.fail('*请输入日期');
	            return;

	        }

	        if (!$('.student_name_n').val()) {


	            // $(".prompt").text("*请输入名字");

	            mizhu.fail('*请输入名字');

	            $(".prompt").css("display", "inline");


	            return;


	        }


	        var data_ajx = new Object();

	        data_ajx.name = $('.student_name_n').val();


	        if ($('.selectpicker').val() == '男') {

	            data_ajx.sex = "MALE";

	        } else {

	            data_ajx.sex = "FEMALE";
	        }
	        data_ajx.birth = $('.decoration_date').val();

	        if ($('.pho').attr("ali")) {

	            data_ajx.img_url = $('.pho').attr("ali");

	        } else {

	            mizhu.fail('选择默认图片');


	        }

	        console.log(JSON.stringify(data_ajx));

	        console.log(url_add_new);

	        ajax_post(url_add_new, JSON.stringify(data_ajx), function (error) {

	            // alert(shibai );

	            // mizhu.fail("")

	            // mizhu.fail('');


	        }, function (success) {


	            console.log(success);

	            selcet_stuent(select_url);

	            slider_action();

	            mizhu.fail(success.message);

	            console.log(success);


	        });


	    })


	    $(".sure_button_selct").click(function () {

	        if (!student_id) {

	            // alert('没有选择学生');

	            mizhu.fail('*请选择学生');

	            return;

	        }

	        // alert(student_id);

	        put_student_message(student_id, submit_student_url);


	    })


	})


	// $('.sure_button').click(function () {
	//
	//     // parents_user_account='+id_for_message
	//
	//     // var id_for_message =  $('.modal-body .text_select').val();
	//
	//     getReq("/orgs/1/schools/1/stuparents/addstudent/?username="+$('.add_student').val(),function (data) {
	//
	//         // var student_message = JSON.parse(data);
	//
	//         if(data.code ==1){
	//             console.log(data)
	//
	//             $('.student_cell').remove();
	//
	//             // alert(data.message);
	//
	//             console.log(data.message)
	//             $('.parent_name').text(data.message);
	//
	//             return;
	//
	//         }
	//
	//
	//         if(data.code ==0){
	//
	//
	//             $('.student_cell').remove();
	//
	//             console.log("shujv");
	//             //
	//             console.log(data.data);
	//             //
	//             var ary_students = data.data.student_parent.studentList;
	//             //
	//
	//             //         $('.parent_name').text(data.data.student_parent.parentsName);
	//
	//             for(var i = ary_students.length -1 ; i >= 0  ; i--){
	//
	//                 console.log(ary_students[i].studentName);
	//
	//                 var cell = $('<div class="student_cell"  style="float: left; padding: 15px">' +
	//                     '<img class="img_student_icon_ll"/>' +
	//                     '<div class="name_text">' + ary_students[i].studentName+'</div>' +
	//                     '</div>') ;
	//
	//                 cell.student_id = ary_students[i].id;
	//
	//                 $('.image_add_l').after(cell);
	//
	//             }
	//
	//             $('.img_student_icon_ll').attr('src','/static/images/170.png')
	//
	//
	//             click_student_cell(ary_students);
	//
	//             if(data.message == "success"){
	//
	//
	//             }else {
	//
	//                 $('.parent_name').text(data.message+data.data.student_parent.parentsName);
	//
	//             }
	//
	//         }
	//
	//     });
	//
	//
	//
	// });

/***/ }
/******/ ]);