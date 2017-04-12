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

	/**
	 * Created by leibin on 17/2/22.
	 */



	var current_arr = [];
	// var current_data = teacher_list.data;//当前数组(测试用)
	// var current_data_c = course_data.data;

	var lb_tid = $('#teacher').text();
	var lb_tname = $('#tname').val();
	var org_id
	var school_id
	var teacher_user_id = lb_tid
	var baseprice = $('#base_price').text() //价格最小的输入值
	var course_id = $('#course_id').text() //课程id

	var upfile = $('#upfile').text()   //url
	var course_duration = $('#duration').text()  //时长
	var class_type_code = $('#class_type_code').text()  //顶级的code
	var class_child_type_code = $('#class_child_type_code').text()//子级的code
	var grade_type_code = $('#grade_type_code').text()    //集体课  一对一
	//var is_enabled = $('#enabled').text()  //是否上架




	$().ready(function () {
	    var is_enabled = $('.switch').hasClass('changing') ? false:true;

	    $('.circle').click(function () {
	        $(this).toggleClass('actives');
	        $('.switch').toggleClass('changing');
	        if ($('.switch').hasClass('changing')) {
	            $('.state').text('暂不上架');
	            is_enabled = false
	        } else {
	            $('.state').text('上架');
	            is_enabled = true
	        }
	    })

	    org_id = $('.org_id').val();
	    school_id = $('.school_id').val();

	    console.log(org_id+'hdsdhfjksahf'+school_id)

	    var is_enabled = $('.switch').hasClass('changing') ? false:true;
	    //课程名称不能为空
	    var course_input_judge = function () {
	        if($('.course_name_input input').val() == "")
	        {
	            $('.course_name_input span').text('课程的名字不能是空的哦!!!')
	            $('.course_name_input span').css('color','red')
	        }
	        else
	        {
	            $('.course_name_input span').text('')
	        }

	    }

	    //当输入了课程的名字后失去输入框的焦点的时候
	    $('.course_name_input input').blur(function(){
	        course_input_judge()
	    });

	    //上传文件
	    $('#UpLoadFile').change(function (e) {
	        var _self = this;
	        $(_self).siblings(0).attr('src',window.URL.createObjectURL($(_self)[0].files[0]));
	        var file = e.target.files[0];
	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	        },function (storeAs) {
	            $('#UpLoadFile').attr('wlx-upfile-name',storeAs)
	            // upfile_url = storeAs
	            // storeAs是一个上传我们服务器的URL
	        });
	    });

	    // TODO 提交

	    $('.btn-save').click(function () {

	        function getFileName2(o){//通过第二种方式获取文件名
	            var arr = o.split('\\');//通过\分隔字符串，成字符串数组
	            return arr[arr.length-1];//取最后一个，就是文件名
	        }

	        var upfile_url = $('#UpLoadFile').attr('wlx-upfile-name') || upfile
	        //undefined
	        if (upfile_url == undefined)
	        {
	            mizhu.upload('必须上传课程图片')
	            return
	        }
	        var submit_souce = new Object();

	        submit_souce.course_id = course_id;

	        submit_souce.title = $('.course_name_input input').val();//课程的名称

	        if(getFileName2(upfile_url) == "jpeg"||getFileName2(upfile_url) == "jpg" || getFileName2(upfile_url) == "png")
	        {
	            submit_souce.image_url = upfile_url;    //'图片URL';
	            submit_souce.video_url = ""
	        }
	        if (getFileName2(upfile_url) == "mp4" || getFileName2(upfile_url) == "rmvb" || getFileName2(upfile_url) == "MKV" || getFileName2(upfile_url) == "FLV")
	        {
	            submit_souce.video_url = upfile_url;    //'图片URL';
	            submit_souce.image_url = ""
	        }
	        else
	        {
	            submit_souce.image_url = upfile_url;    //'图片URL';
	            submit_souce.video_url = ""
	        }
	        submit_souce.price = $('.class_price').find('input').val();//class_price//价格

	        if (submit_souce.price == "")
	        {
	            mizhu.upload('课程价格不能为空')
	            return
	        }
	        if (parseInt(submit_souce.price) < Number(baseprice))
	            {
	                // TODO 提示不能小于平台低价
	                mizhu.confirm("提示","不能小于平台低价")
	                return
	            }

	        submit_souce.is_enabled = is_enabled;//上架
	        $.ajax({
	                type: 'POST',
	                url: '/orgs/'+org_id+'/schools/'+school_id+'/courses/'+course_id+'/edit/',
	                data: JSON.stringify(submit_souce),
	                dataType:'json',
	                contentType: "application/json;charset=utf-8",

	                error: function (status, error) {

	                },
	                success: function (data, text) {
	                    if (data.code == 0)
	                    {
	                        mizhu.upload('提交成功')
	                        //TODO 支付完成的业务完成后做以下跳转  让用户看到订单完成页面
	                        $('.href a').attr('href','/orgs/'+org_id+'/schools/'+school_id +'/courses/'+course_id+'/')
	                        $('.href a').get(0).click()
	                    }
	                    else
	                    {
	                        alert(data.message)
	                        mizhu.fail(data.message)
	                    }
	                }
	            }
	        )
	    });
	});

	$('.btn-delete').click(function() {
	        mizhu.confirm_delete('是否删除该课程信息,删除后将无法恢复', aa)
	        function aa() {
	            $.ajax({
	                    type: 'POST',
	                    url: '/orgs/' + org_id + '/schools/' + school_id + '/courses/' + course_id + '/delete/',
	                    headers: {
	                        "Accept": "application/json"
	                    },
	                    dataType: 'json',
	                    contentType: "application/json;charset=utf-8",
	                    error: function (status, error) {

	                    },
	                    success: function (data, text) {
	                        console.log(data.code);
	                        if (data.code == 0) {
	                            mizhu.upload('删除成功')
	                            window.open('/orgs/' + org_id + '/schools/' + school_id + '/courses/', '_self')
	                        }
	                    }
	                }
	            )
	        }
	   }
	)



	//选择老师弹框
	//重新刷新UI
	var reload = function (all_data) {
	    // $('.teacher_item').remove();

	    var data = all_data.data.content.teacher_list;

	    $('#carousel-teacher .aaaabox').empty();
	    var  data_count = data.length

	    if (data_count <= 4)
	    {
	        $('#carousel-teacher .aaaabox').append('<div id="'+1+'" class="item cell active"></div>')
	    }
	    if (data_count > 4)
	    {
	        var page_count = Math.ceil(data_count/4)

	        for (var k = 1;k<=page_count;k++)
	        {
	            if(k == 1)
	            {
	                $('#carousel-teacher .aaaabox').append('<div id="'+k+'" class="item cell1 active"></div>')
	            }
	            if (k>1)
	            {
	                $('#carousel-teacher .aaaabox').append('<div id="'+k+'" class="item cell2"></div>')
	            }
	        }
	    }


	    //添加cell

	    // $('.item').empty()

	    //添加子元素
	    if (data_count <= 4)
	    {
	        for (var j=0;j<data_count;j++)
	        {
	            $('#teacher_alert #1').append('<div class="teacher_item" tag_flag = '+j+'><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')
	        }
	    }
	    if (data_count > 4)
	    {
	        var page_count = Math.ceil(data_count/4)
	        for (var k = 1;k<=page_count;k++)
	        {
	            if (k<page_count)
	            {
	                for (var x = 0; x<4;x++)
	                {
	                    var j = (k-1)*4+x
	                    console.log("我添加了"+j);

	                    $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag = "'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')
	                }
	            }
	            if (k==page_count)
	            {
	                var last_count = data_count%4
	                if (last_count==0)
	                {
	                    for (var x = 0; x<4;x++)
	                    {
	                        var j = (k-1)*4+x
	                        console.log("我添加了"+j);
	                        $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag ="'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')
	                    }
	                }
	                else
	                {
	                    for (var x = 0;x<last_count;x++)
	                    {
	                        var j = (k-1)*4+x
	                        console.log("我添加了lelle"+j);
	                        $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag = "'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')

	                    }
	                }
	            }
	        }
	    }

	    //点击教师
	    $('.teacher_item').click(function () {

	        if ($(this).children(".add_img").length>0)
	        {
	            $(this).children(".add_img").remove()
	            $(this).removeClass('chosse_active')
	        }
	        else
	        {
	            //先删
	            $('.teacher_item').children(".add_img").remove()
	            $('.teacher_item').removeClass('chosse_active')
	            //后加
	            console.log(all_data.cdnUrl)
	            $(this).append('<img src='+all_data.data.cdnUrl+'/static/images/selectcheck_h.png class="add_img">')
	            $(this).addClass('chosse_active')
	        }

	    })

	}




	//TODO:GET请求

	var getData = function (URL,callback) {

	    $.ajax({
	        url: URL,
	        type: "GET",
	        headers: {
	            "Accept": "application/json"
	        },
	        dataType:'json',
	        contentType: "application/json;charset=utf-8",
	        error: function (jqXHR, textStatus, errorThrown) {


	            mizhu.fail('获取老师请求失败')

	        },
	        success: function (data, textStatus, jqXHR) {
	            console.log(data);
	            if (data.code == 0)
	            {
	                callback(data);
	            }
	            else
	            {
	                mizhu.fail(data.message)

	            }
	        }
	    })
	}


/***/ }
/******/ ]);