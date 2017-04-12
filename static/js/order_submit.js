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

	var org_id
	var school_id
	var user_account
	var user_id
	var tag_flag
	var wlx_chosse
	var json_object


	var student_id
	var student_name
	var student_number


	var class_price

	$().ready(function () {

	    org_id = $('.org_id').val();
	    school_id = $('.school_id').val();

	    //获取账户下的孩子
	    $('.user_sure_btn').click(function () {

	        //find_Info/
	        org_id = $('.org_id').val();
	        school_id = $('.school_id').val();
	        user_account = $('.user_box_input input').val()

	        $('.child_box_input input').val("") // 置空孩子
	        $('.child_student_num').text('') //置空学号
	        $('.chosse_child_btn').addClass('disabled')
	        $('.child_box_input ul li').remove()

	        var url = "/orgs/" + org_id + "/schools/" + school_id + "/getparent/?username=" + user_account + ""
	        var req = $.ajax({
	            url: url,
	            type: "GET",
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",
	            headers: {
	                "Accept": "application/json"
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	                req = null;
	                console.log(errorThrown);
	                
	                mizhu.fail('获取账户孩子请求失败')
	                // $('.alert-warning strong').text("失败" + errorThrown)
	                //
	                // $('.alert').css("display", "inline-block")
	                // setTimeout(function () {
	                //     $('.alert').css("display", "none")
	                // }, 5000);
	            },
	            success: function (data, textStatus, jqXHR) {
	                req = null;
	                //callback(data);

	                //console.log("allalallall"+data)

	                //var data = JSON.parse(data)

	                if (data.code == 0) {

	                    $('.chosse_child_btn').removeClass('disabled')

	                    $.each(data.data.student_list,function (index,student_info) {

	                        var $child_box_input_li = $("<li></li>")
	                        $child_box_input_li.attr('wlx-student-num',student_info.studentNum)
	                        $child_box_input_li.attr('wlx-student-id',student_info.id)
	                        $child_box_input_li.text(student_info.studentName)
	                        $('.child_box_input ul').append($child_box_input_li)
	                    })
	                    
	                    //TODO选择孩子
	                    $('.child_box_input ul li').click(function () {

	                        console.log("jdsffhd")

	                        $('.child_student_num').text($(this).attr('wlx-student-num'))
	                        $('.child_box_input input').val($(this).text())
	                        student_id = $(this).attr('wlx-student-id')
	                        student_number = $(this).attr('wlx-student-num')
	                        student_name = $(this).text()
	                        user_id = data.data.student_list[0].parentsUser.id

	                    })

	                }
	                else {
	                    
	                    
	                    mizhu.fail(data.message)
	                    // $('.alert-warning strong').text(data.message)
	                    //
	                    // $('.alert').css("display", "inline-block")
	                    // setTimeout(function () {
	                    //     $('.alert').css("display", "none")
	                    //
	                    //     console.log("1234567890")
	                    // }, 5000);


	                }

	            }
	        })

	    })


	    var type_search

	    //获qu老师的请求
	    $('.chosse_class_btn').click(function () {

	        $('#teacher_alert .all').addClass('select_active')
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=all", reloadUI);
	        // $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        type_search = "all"

	    })



	    console.log("3456786786789")


	    $('#teacher_alert .all').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=all", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "all"
	    })

	    $('#teacher_alert .music').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=music", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "music"
	    })

	    $('#teacher_alert .dance1').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=dance", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "dance"
	    })
	    $('#teacher_alert .art').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=art", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "art"
	    })

	    $('#teacher_alert .media').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=media_art", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "medal_arts"
	    })

	    $('#teacher_alert .wushu').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=wushu", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "wushu"
	    })

	    $('#teacher_alert .chess').click(function () {
	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type=chess", reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        type_search = "chess"
	    })
	    $('#teacher_alert  .searchtea').click(function () {

	        var search_input = $('.input-group input').val()

	        getData("/orgs/" + org_id + "/schools/" + school_id + "/orders/find_classInfo/?type="+type_search+"&search_content="+search_input+"", reloadUI);
	        // $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        // $(this).addClass('select_active')


	    })

	})

	//选择老师弹框
	//重新刷新UI
	var reload = function (all_data) {
	    var course_list = all_data.data.course_list;
	    $('.input-group input').val(all_data.data.search)

	    $('#carousel-teacher .aaaabox').empty();
	    var data_count = course_list.length

	    var page_count = Math.ceil(data_count / 3)

	    var $aaaabox = $('#carousel-teacher .aaaabox');
	    for (var k = 1; k <= page_count; k++) {
	        if (k == 1) {
	            $aaaabox.append('<div id="' + k + '" class="item cell1 active"></div>')
	        }
	        else {
	            $aaaabox.append('<div id="' + k + '" class="item cell1"></div>')
	        }
	    }

	    $.each(course_list, function (index, course) {
	        console.log("我添加了" + index);

	        var $teacher_item = $('<div></div>');
	        $teacher_item.addClass('teacher_item');
	        $teacher_item.attr('tag_flag', index);
	        $('#teacher_alert #' + (parseInt(index / 3) + 1)).append($teacher_item);

	        var $teacher_box = $('<div></div>');
	        $teacher_box.addClass('$teacher_box');
	        $teacher_item.append($teacher_box);

	        var $teacher_img = $('<img/>')
	        $teacher_img.addClass('teacher_img');
	        $teacher_img.attr('src', course.image_url);
	        $teacher_box.append($teacher_img);

	        var $course_name = $('<div></div>');
	        $course_name.addClass('course_name');
	        $course_name.text(course.title);
	        $teacher_box.append($course_name);

	        var $course_desc = $('<div></div>');
	        $course_desc.addClass('course_desc');
	        $course_desc.text(course.name);
	        $teacher_box.append($course_desc);

	        var $wlx_curese_length = $('<div></div>');
	        $wlx_curese_length.addClass('wlx-curese-length');
	        $wlx_curese_length.text("¥" + course.price + "/" + course.class_duration+"分钟");
	        $teacher_box.append($wlx_curese_length);

	        var $hover_box = $('<div></div>');
	        $hover_box.addClass('hover-box');
	        // $hover_box.style('display', 'none')
	        $teacher_item.append($hover_box);

	        var $parent = $hover_box;
	        $.each(course.grade_list, function (g_index, grade) {
	            console.log('今年的分数就打飞机的健康辅导书')
	            var $gradeNade = $('<div class="chosse_class_li" wlx-class-chosse =' + g_index + '></div>')
	            var $item = $("<div class='gradeName'></div>")
	            $item.text(grade.title + " " + grade.exist + "/" + grade.capacity)
	            $parent.append($gradeNade)
	            $gradeNade.append($item);
	            var $table = $('<div class="class_info_table"></div>')
	            $gradeNade.append($table)

	            $.each(grade.schedule_list, function (s_index, schedule) {
	                var $cell = $("<div></div>");
	                console.log('每周有几节课' + schedule.length);
	                //$table
	                var week;
	                switch (schedule.week) {
	                    case 1:
	                        week = "周一"
	                        break;
	                    case 2:
	                        week = "周二"
	                        break;
	                    case 3:
	                        week = "周三"
	                        break;
	                    case 4:
	                        week = "周四"
	                        break;
	                    case 5:
	                        week = "周五"
	                        break;
	                    case 6:
	                        week = "周六"
	                        break;
	                    case 7:
	                        week = "周日"
	                        break;
	                }
	                var start = schedule.start_time
	                var end = schedule.end_time
	                $cell.text(week + ":" + start + "~" + end);
	                $table.append($cell);
	            });
	        });

	        // if (index == 0) {
	        //     $parent.show();
	        // }
	        // else {
	        //     $parent.hide();
	        // }
	    });

	    $('.chosse_class_li').click(function () {
	        //isshow = !isshow;
	        $('.chosse_class_li').removeClass('chosse_class_li_active')
	        $(this).addClass('chosse_class_li_active')
	        $(this).parents().parents('.hover-box').show()//
	        //$(this).parents().parents().addClass('no-hover')
	        tag_flag = $(this).parents().parents().attr('tag_flag')
	        wlx_chosse = $(this).attr('wlx-class-chosse')
	        console.log(tag_flag + "阿拉啦啦啦啦啦了" + wlx_chosse)

	    })
	    // var isshow = false
	    // $('.teacher_item').hover(function () {
	    //
	    //
	    //     $('.teacher_item').find('.hover-box').hide()
	    //     $(this).find('.hover-box').show()
	    //
	    //     $('.chosse_class_li').click(function () {
	    //         isshow = !isshow;
	    //         $('.chosse_class_li').removeClass('chosse_class_li_active')
	    //         $(this).addClass('chosse_class_li_active')
	    //         $(this).parents().parents('.hover-box').show()//
	    //         $(this).parents().parents().addClass('no-hover')
	    //         tag_flag = $(this).parents().parents().attr('tag_flag')
	    //         wlx_chosse = $(this).attr('wlx-class-chosse')
	    //         console.log(tag_flag + "阿拉啦啦啦啦啦了" + wlx_chosse)
	    //
	    //     })
	    //
	    //
	    // }, function () {
	    //
	    //     if (isshow == true)
	    //     {
	    //         $(this).find('.hover-box').hide()
	    //     }
	    // });
	    



	}


	$('.sure').click(function () {


	    //最终选择的所有信息
	    var last = json_object.data.course_list[tag_flag].grade_list[wlx_chosse].schedule_list
	    $('.chosse_class_btn').hide()
	    $('.chosse_order_class_info').show()

	    $('.chosse_class_img').click(function () {

	        $('.chosse_class_btn').show()
	        $('.chosse_order_class_info').hide()

	    })






	    var str = ""

	    $.each(last, function (index) {

	        console.log('啦啦啦啦啦啦啦')
	        var week

	        switch (last[index].week) {
	            case 1:
	                week = "周一:"
	                break;
	            case 2:
	                week = "周二:"
	                break;
	            case 3:
	                week = "周三:"
	                break;
	            case 4:
	                week = "周四:"
	                break;
	            case 5:
	                week = "周五:"
	                break;
	            case 6:
	                week = "周六:"
	                break;
	            case 7:
	                week = "周日:"
	                break;
	        }
	        str += week + last[index].start_time + '~' + last[index].end_time 


	    })

	    console.log("阿拉啦啦啦啦啦了" + JSON.stringify(last))

	    // TODO 终于可以开始展示了
	    //$("div").css("backgroundImage","url(imgs/right.png)");

	    // $('.chosse_class_img img').css("backgroundImage","url("+json_object.data[tag_flag].url+"))")
	    $('.chosse_class_img img').attr("src", json_object.data.course_list[tag_flag].image_url)


	    $('.chosse_class_name').text(json_object.data.course_list[tag_flag].title)
	    //$('.chosse_class_teacher_lv').text(json_object.data[tag_flag].skill.child_name + json_object.data[tag_flag].skill.child_lv)
	    $('.chosse_class_teacher').text(json_object.data.course_list[tag_flag].name)
	    $('.chosse_class_price').text('¥' + json_object.data.course_list[tag_flag].price + '/' + json_object.data.course_list[tag_flag].class_duration + '分钟')

	    var STRR = json_object.data.course_list[tag_flag].grade_list[wlx_chosse].title + '(' + json_object.data.course_list[tag_flag].grade_list[wlx_chosse].exist + '/' + json_object.data.course_list[tag_flag].grade_list[wlx_chosse].capacity + ')' + str


	    // console.log("阿拉啦啦啦啦啦好地方是尽快发货健康了" + json_object.data.course_list[tag_flag].grade_list)


	    $('.chosse_class_detail_info').text(STRR)


	    class_price = json_object.data.course_list[tag_flag].price
	    $('.chosse_class_totail_price').text("¥" + class_price )

	})
	$('.chosse_class_cum input').bind('input propertychange', function () {

	    // $(this).val($(this).val().replace(/[^\d]/g,''))
	    if($('.chosse_class_cum input').val() < 1)
	    {
	        $('.chosse_class_cum input').val('1')
	    }


	    console.log("阿拉啦啦啦啦啦好地方是尽快发货健康了")
	    $('.chosse_class_totail_price').text("¥" + class_price * $('.chosse_class_cum input').val())

	});


	$('.Subtract_chosse_class_btn').click(function () {

	    if ($('.chosse_class_cum input').val() > 1) {
	        $('.chosse_class_cum input').val($('.chosse_class_cum input').val() - 1)
	    }
	    if ($('.chosse_class_cum input').val() == 1) {
	        $('.chosse_class_cum input').val('1')
	    }

	    $('.chosse_class_totail_price').text("¥" + class_price * $('.chosse_class_cum input').val())

	})
	$('.add_chosse_class_btn').click(function () {

	    $('.chosse_class_cum input').val(parseInt($('.chosse_class_cum input').val()) + 1)
	    $('.chosse_class_totail_price').text("¥" + class_price * $('.chosse_class_cum input').val())


	})

	//TODO提交订单
	$('.submit_order_btn').click(function () {

	    console.log('提交订单=========')

	    if (!student_id) {
	        student_id = parseInt($('.child_box_input input').attr('wlx-student-id'))
	        student_number = $('.child_student_num').text()
	        student_name = $('.child_box_input input').val()
	        user_id = parseInt($('.user_box_input input').attr('wlx-user-id'))
	        user_account = $('.user_box_input input').val()
	        console.log('进了判断')
	    }


	    var last = json_object.data.course_list[tag_flag].grade_list[wlx_chosse].schedule_list

	    var objec = {}

	    objec.price = parseInt($('.chosse_class_totail_price').text().substr(1));


	    objec.parents_user_account = user_account;//s
	    objec.parents_user_id = parseInt(user_id);
	    objec.student_id = parseInt(student_id);
	    objec.student_name = student_name;
	    objec.student_number = student_number;//s
	    objec.class_id = parseInt(json_object.data.course_list[tag_flag].id);//clazzId
	    objec.grade_id = parseInt(json_object.data.course_list[tag_flag].grade_list[wlx_chosse].id);
	    objec.count = parseInt($('.chosse_class_cum input').val());
	    objec.class_name = json_object.data.course_list[tag_flag].title;
	    objec.teacher_name = json_object.data.course_list[tag_flag].name;
	    objec.class_image_url = json_object.data.course_list[tag_flag].image_url;
	    objec.class_code_type = json_object.data.course_list[tag_flag].class_type_code;
	    objec.class_child_type_code = json_object.data.course_list[tag_flag].class_child_type_name;
	    objec.teacher_lv = json_object.data.course_list[tag_flag].class_child_type_lv;
	    objec.grade_name = json_object.data.course_list[tag_flag].grade_list[wlx_chosse].title;
	    objec.class_time = $('.chosse_class_detail_info').text();
	    objec.pay_way = "线下支付";
	    objec.order_number = "";
	    objec.pay_number = "暂无数据";


	    console.log("好的撒飞机返回时地方的数据发电量快速减肥" + JSON.stringify(objec))
	    //var url = "/orgs/"+org_id+"/schools/"+school_id+"/orders/"
	    $.ajax({
	            type: 'POST',
	            url: '/orgs/' + org_id + '/schools/' + school_id + '/order_details/',
	            data: JSON.stringify(objec),
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",

	            error: function (status, error) {
	                
	                mizhu.fail('提交订单请求失败')
	                
	                // $('.alert-warning strong').text("失败" + status)
	                //
	                // $('.alert').css("display", "inline-block")
	                // setTimeout(function () {
	                //     $('.alert').css("display", "none")
	                // }, 5000);
	            },
	            success: function (data, text) {
	                if (data.code == 0) {
	                    
	                    window.location = '/orgs/' + org_id + '/schools/' + school_id + '/orders/' + data.data.orderNumber + '/success/';

	                }
	                else {
	                    
	                    mizhu.fail(data.message)
	                    
	                    // $('.alert-warning strong').text(data.message)
	                    //
	                    // $('.alert').css("display", "inline-block")
	                    // setTimeout(function () {
	                    //     $('.alert').css("display", "none")
	                    // }, 5000);
	                }

	            }
	        }
	    )

	})
	$(".cancel").click(function () {
	    window.location.reload()
	});

	$('#teacher_alert .all').addClass('select_active');

	$('#teacher_alert .carousel').carousel({
	    interval: 0
	})


	//TODO:GET请求

	var getData = function (url, callback) {

	    console.log("111111111111")
	    var req = $.ajax({
	        url: url,
	        type: "GET",
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        headers: {
	            "Accept": "application/json"
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            req = null;
	            
	            mizhu.fail('请求失败')
	            
	            // $('.alert-warning strong').text("失败" + errorThrown)
	            //
	            // $('.alert').css("display", "inline-block")
	            // setTimeout(function () {
	            //     $('.alert').css("display", "none")
	            // }, 5000);
	        },
	        success: function (data, textStatus, jqXHR) {
	            req = null;
	            if (data.code == 0) {
	                callback(data);
	            }
	            else {
	                
	                mizhu.fail(data.message)
	                
	                // $('.alert-warning strong').text(data.message)
	                //
	                // $('.alert').css("display", "inline-block")
	                // setTimeout(function () {
	                //     $('.alert').css("display", "none")
	                // }, 5000);
	            }

	        }
	    })
	}
	var reloadUI = function (data) {
	    // current_data = JSON.parse(data).data.content[0].teacher_data;

	    current_data = data
	    json_object = current_data

	    // current_arr = [];
	    // current_arr = current_data.data

	    console.log(JSON.stringify(data))

	    reload(current_data);

	}
	// TODO 获取老师的技能
	var get_teacher_skill = (function (teacher) {

	    // TODO添加老师按钮 选了老师之后的操作
	    var teacher_ID = teacher.teacher_user_id;
	    $.ajax({
	        url: '/orgs/' + org_id + '/schools/' + school_id + '/classes/teacherskill/' + teacher_ID + '/',
	        type: "GET",
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        headers: {
	            "Accept": "application/json"
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            req = null;
	            console.log(errorThrown);
	            mizhu.fail("获取老师技能请求失败")
	            // $('.alert-warning strong').text("失败" + errorThrown)
	            //
	            // $('.alert').css("display", "inline-block")
	            // setTimeout(function () {
	            //     $('.alert').css("display", "none")
	            // }, 5000);
	        },
	        success: function (data, textStatus, jqXHR) {
	            req = null;

	            if (data.code == 0) {
	                var object = data

	                var topskill

	                $('.chosse_topskill_btn').removeClass('disabled')
	                $('.chosse_topskill_btn').siblings('ul').find('li').remove()
	                $('.chosse_topskill_btn').siblings('input').val("")
	                //$("h2").siblings("p");


	                for (var i = 0; i < object.data.length; i++) {
	                    $('.chosse_topskill_btn').siblings('ul').append('<li wlx-topskill=' + i + ' wlx-code = ' + object.data[i].parent[0].classTypeCode + '>' + object.data[i].parentName + '</li>')

	                }
	                $('.chosse_topskill_btn').click(function () {

	                    $('.chosse_skill_btn').removeClass('disabled')
	                    $('.chosse_topskill_btn').siblings('ul').find('li').click(function () {
	                        class_type_code = $(this).attr('wlx-code')
	                    })
	                    //class_type_code

	                })
	                //产生二级技能
	                $('.chosse_skill_btn').click(function () {

	                    $('.chosse_issingle_btn').removeClass('disabled')
	                    $('.chosse_skill_btn').siblings('ul').find('li').remove()
	                    $('.chosse_skill_btn').siblings('input').val("")

	                    for (var j = 0; j < object.data[topskill].child.length; j++) {

	                        $('.chosse_skill_btn').siblings('ul').append('<li wlx-skill=' + j + ' wlx-child-code = ' + object.data[topskill].child[j].childDict.code + ' >' + object.data[topskill].child[j].childDict.name + '</li>')
	                    }
	                    $('.chosse_skill_btn').siblings('ul').find('li').click(function () {
	                        //alert($(this).text())
	                        $(this).parent().siblings('input').val($(this).text())
	                        class_child_type_code = $(this).attr('wlx-child-code')
	                        //alert('222222')
	                    })

	                })

	                //产生类型
	                $('.chosse_issingle_btn').click(function () {

	                    $('.chosse_issingle_btn').siblings('ul').find('li').remove()
	                    $('.chosse_issingle_btn').siblings('input').val("")

	                    for (var j = 0; j < object.data[topskill].parent.length; j++) {
	                        $('.chosse_issingle_btn').siblings('ul').append('<li wlx-issingle=' + object.data[topskill].parent[j].duration + ' wlx-baseprice = ' + object.data[topskill].parent[j].baseprice + ' wlx-class-type = ' + object.data[topskill].parent[j].gradeTypeCode + ' >' + object.data[topskill].parent[j].gradeTypeName + ' </li>')

	                    }

	                    $('.chosse_issingle_btn').siblings('ul').find('li').click(function () {
	                        //alert($(this).text())
	                        var duration = $(this).attr('wlx-issingle')
	                        baseprice = $(this).attr('wlx-baseprice')
	                        $(this).parent().siblings('input').val($(this).text())
	                        //alert('3333333')
	                        course_duration = duration
	                        grade_type_code = $(this).attr('wlx-class-type')

	                        $('course_length_warming').text('课程时长:' + duration + '分钟')
	                        $('.course_price_warming').text('平台底价:¥' + baseprice + '')


	                    })

	                })
	                //点击进入输入框
	                $('.chosse_topskill_btn').siblings('ul').find('li').click(function () {
	                    //alert($(this).text())
	                    $(this).parent().siblings('input').val($(this).text())
	                    if ($(this).attr('wlx-topskill')) {
	                        topskill = $(this).attr('wlx-topskill')
	                        console.log("回家的发挥地方发货的夹河街")
	                    }
	                    $('.chosse_skill_btn').siblings('input').val("")
	                    $('.chosse_issingle_btn').siblings('input').val("")

	                })

	            }
	            else {
	                
	                mizhu.fail(data.message)
	                
	                // $('.alert-warning strong').text(data.message)
	                //
	                // $('.alert').css("display", "inline-block")
	                // setTimeout(function () {
	                //     $('.alert').css("display", "none")
	                // }, 5000);
	            }
	        }
	    })

	});


/***/ }
/******/ ]);