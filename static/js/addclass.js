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



	$().ready(function () {

	    org_id = $('.org_id').val();
	    school_id = $('.school_id').val();

	    console.log(org_id+'hdsdhfjksahf'+school_id)

	    //选择是上架
	    $('.isshopping').click(function () {
	        $('.isshopping_warning').text('上架')
	    })
	    //选择不上架
	    $('.isnotshopping').click(function () {
	        $('.isshopping_warning').text('暂不上架')
	    })

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
	    //判断有没有输入课程名字
	    $('.chosse_teacher_btn').click(function () {
	        //判断有没有输入课程名字
	        course_input_judge()


	    })

	    var search_taye = "all"

	    //获qu老师的请求
	    getData("/orgs/"+org_id+"/teachers/?type=all",reloadUI);
	    //$('#teacher_alert .chosse_click_btn').removeClass('select_active')


	    $('#teacher_alert .all').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=all",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "all"
	    })

	    $('#teacher_alert .music').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=music",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "music"
	    })

	    $('#teacher_alert .dance1').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=dance",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "dance"
	    })
	    $('#teacher_alert .art').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=art",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "art"
	    })

	    $('#teacher_alert .media').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=media_art",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "media_art"
	    })

	    $('#teacher_alert .wushu').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=wushu",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "wushu"
	    })

	    $('#teacher_alert .chess').click(function () {
	        getData("/orgs/"+org_id+"/teachers/?type=chess",reloadUI);
	        $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        $(this).addClass('select_active')
	        search_taye = "chess"
	    })

	    $('.search_background button').click(function () {
	        var search = $('.input-group input').val()
	        getData("/orgs/"+org_id+"/teachers/?type="+search_taye+"&search="+search+"",reloadUI);
	        // $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	        // $('#teacher_alert .all').addClass('select_active')

	    })

	    //确定某个老师的后的请求



	    $('.delete_teacher_button').click(function () {
	        //选取自己的兄会级的input区删除内容就可以
	        $(this).siblings("input").val("");

	        //删除之前选中的本页内容
	        $('.chosse_topskill_btn').addClass('disabled')
	        $('.chosse_topskill_btn').siblings('ul').find('li').remove()
	        $('.chosse_topskill_btn').siblings('input').val("")
	        //chosse_skill
	        $('.chosse_skill_btn').addClass('disabled')
	        $('.chosse_skill_btn').siblings('ul').find('li').remove()
	        $('.chosse_skill_btn').siblings('input').val("")
	        //chosse_issingle
	        $('.chosse_issingle_btn').addClass('disabled')
	        $('.chosse_issingle_btn').siblings('ul').find('li').remove()
	        $('.chosse_issingle_btn').siblings('input').val("")
	        //class_price
	        $('.class_price input').val("")
	        $('.course_length_warming').text("")
	        $('.course_price_warming').text("")





	    })


	    //上传文件
	    $('#UpLoadFile').change(function (e) {
	        var _self = this;
	        //$(_self).siblings(0).attr('src',window.URL.createObjectURL($(_self)[0].files[0]));
	        var file = e.target.files[0];

	        if(window.FileReader) {
	            var fr = new FileReader();
	            fr.onload = function(e) {

	                var image = new Image();
	                image.src= e.target.result;
	                console.log(e.target.result);
	                console.log(image.width+'---'+image.height);
	                if(image.width < 200 || image.height  < 200 || !uploadimg.imgfiletesting(file)){
	                    alert('wcnm');
	                    return
	                }
	                var sib = $(_self).siblings('img.img_fire')
	                sib.src = e.target.result;

	            };
	            fr.readAsDataURL(file);

	            $('.loading').show()

	            uploadimg.upfile(file,function (err) {
	                console.log(err)
	            },function (storeAs) {
	                $(_self).siblings('img.double').attr('ali',storeAs)
	                upfile_url = storeAs
	                $('.loading').hide()
	            });
	        }
	        /*if (file)
	        {
	            var sib = $(_self).siblings('img.img_fire')
	            if(uploadimg.imgfiletesting(file))
	            {
	                sib.attr('src',window.URL.createObjectURL(file));
	            }
	            else
	            {
	                mizhu.upload("文件格式不支持")
	                return
	            }
	            $('.loading').show()

	            uploadimg.upfile(file,function (err) {
	                console.log(err)
	            },function (storeAs) {
	                $(_self).siblings('img.double').attr('ali',storeAs)
	                upfile_url = storeAs
	                $('.loading').hide()
	            });
	        }
	*/
	    });

	    
	    // TODO 提交

	    $('.submit_btn').click(function () {


	        function getFileName2(o){//通过第二种方式获取文件名
	            var arr = o.split('\\');//通过\分隔字符串，成字符串数组
	            return arr[arr.length-1];//取最后一个，就是文件名
	        }

	        //undefined
	        if (upfile_url == undefined)
	        {
	            mizhu.upload('必须上传课程图片')
	            return
	            //upfile_url = "http://p1.bqimg.com/1949/ea6e21b39e71c0b7.jpg"
	        }
	        var submit_souce = new Object();

	        submit_souce.teacher_user_id = teacher_user_id;

	        submit_souce.title = $('.course_name_input input').val();//教室的名称

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
	            mizhu.upload('课程底价能不能为空')
	            return
	        }

	       submit_souce.base_price = $('.course_price_warming').text();//class_price//价格

	        submit_souce.class_duration = course_duration; //时长

	        submit_souce.class_type_code =class_type_code ; // 课程顶级类型

	        submit_souce.class_child_type_code = class_child_type_code; //课程子级类型

	        submit_souce.grade_type_code = grade_type_code;  //集体课  一对一

	        is_enabled =  true
	        if ($('.btn-group_warning input[name="options"]:checked').val()==1)
	        {
	            is_enabled =false
	        }

	        submit_souce.is_enabled = is_enabled;//上架

	        if (grade_type_code == "one")
	        {
	            is_single = "true"
	        }
	        else
	            is_single = "false"

	        submit_souce.is_single = is_single;//





	        $.ajax({
	                type: 'POST',
	                url: '/orgs/'+org_id+'/schools/'+school_id+'/classes/',
	                data: JSON.stringify(submit_souce),
	                dataType:'json',
	                contentType: "application/json;charset=utf-8",

	                error: function (status, error) {

	                    // mizhu.fail('提交请求失败')

	                    // $('.alert-warning strong').text("请求失败"+status+error)
	                    // $('.alert').css("display","inline-block")
	                    // setTimeout(function () {
	                    //     $('.alert').css("display","none")
	                    // }, 5000);

	                    //alert('系统错误' + status)
	                },
	                success: function (data, text) {

	                    if (data.code == 0)
	                    {
	                        // $('.alert-warning strong').text("提交成功")
	                        //
	                        // $('.alert').css("display","inline-block")
	                        // setTimeout(function () {
	                        //     $('.alert').css("display","none")
	                        //     console.log(data)//这是获取的数据

	                        mizhu.upload('提交成功')

	                        //TODO 支付完成的业务完成后做以下跳转  让用户看到订单完成页面
	                        $('.href a').attr('href','/orgs/'+org_id+'/schools/'+school_id +'/courses/')
	                        //$('.pay_finish a').attr('target', '_blank')//开启有一个新的页面
	                        $('.href a').get(0).click()
	                        // window.open('/orgs/'+org_id+'/schools/'+school_id +'/courses/' , '_blank')

	                        // }, 1000);

	                    }
	                    else
	                    {

	                        mizhu.fail(data.message)
	                        // $('.alert-warning strong').text(data.message)
	                        //
	                        // $('.alert').css("display","inline-block")
	                        // setTimeout(function () {
	                        //     $('.alert').css("display","none")
	                        // }, 5000);
	                    }




	                }
	            }
	        )


	    });


	});

	///

	//选择老师弹框
	//重新刷新UI
	var reload = function (all_data) {
	    // $('.teacher_item').remove();

	    var data = all_data.data.content.teacher_list;
	    $('.input-group input').val(all_data.data.search)

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



	            //$(this).append('<img src="../images/selectcheck_h.png" class="add_img">')
	            //$(this).addClass('chosse_active')
	            //添加元素
	        }

	    })

	}


	$('.sure').click(function () {

	    var obj

	    $('.chosse_active').each(function (index,ele) {


	        // console.log('节点'+$(ele))
	        var data_index = $(ele).attr('tag_flag')
	        console.log(data_index)
	        obj = current_arr[data_index]

	    })
	    console.log('s输出此案在===='+obj+JSON.stringify(obj))
	    // TODO -------

	    //teacher_user_id
	    teacher_user_id = obj.teacher_user_id
	    $('.chosse_teacher_input input').val(obj.user_name)
	    //获取老师的技能
	    get_teacher_skill(obj)

	    $('#teacher_alert').modal('hide');

	})

	$('#teacher_alert .all').addClass('select_active');

	$('#teacher_alert .carousel').carousel({
	    interval: 0
	})




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
	            // $('.alert-warning strong').text("失败"+textStatus)
	            //
	            // $('.alert').css("display","inline-block")
	            // setTimeout(function () {
	            //     $('.alert').css("display","none")
	            // }, 5000);
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
	var reloadUI = function (data) {
	    // var current_data = JSON.parse(data)
	    // var current_data = data.data
	    //
	    // current_arr = [];
	    current_arr = data.data.content.teacher_list

	    //console.log(current_data)
	    reload(data);
	    //find_disable(current_data);
	    $('.teacher_item').removeClass('chosse_active')
	}
	// TODO 获取老师的技能
	var get_teacher_skill = (function (teacher) {

	    // TODO添加老师按钮 选了老师之后的操作
	    var teacher_ID = teacher.teacher_user_id;
	    $.ajax({
	        url: '/orgs/'+org_id+'/schools/'+school_id+'/classes/teacherskill/'+teacher_ID+'/',
	        type: "GET",
	        headers: {
	            "Accept": "application/json"
	        },
	        dataType:'json',
	        contentType: "application/json;charset=utf-8",
	        error: function (jqXHR, textStatus, errorThrown) {

	            mizhu.fail('获取技能请求失败')
	            // $('.alert-warning strong').text("失败"+errorThrown)
	            //
	            // $('.alert').css("display","inline-block")
	            // setTimeout(function () {
	            //     $('.alert').css("display","none")
	            // }, 5000);
	        },
	        success: function (data, textStatus, jqXHR) {
	            req = null;
	            mizhu.upload("正在加载....")
	            if (data.code == 0)
	            {
	                $('.chosse_topskill_btn').removeClass('disabled')
	                var object = data

	                //alert(object.message)

	                console.log(object+"啦啦啦啦啦"+JSON.stringify(object))//这是获取的数据
	                //已经获取了技能  可以改变后面的UI了 呀呀呀呀呀

	                var topskill
	                $('.chosse_topskill_btn').siblings('ul').find('li').remove()
	                $('.chosse_topskill_btn').siblings('input').val("")
	                //chosse_skill
	                $('.chosse_skill_btn').addClass('disabled')
	                $('.chosse_skill_btn').siblings('ul').find('li').remove()
	                $('.chosse_skill_btn').siblings('input').val("")
	                //chosse_issingle
	                $('.chosse_issingle_btn').addClass('disabled')
	                $('.chosse_issingle_btn').siblings('ul').find('li').remove()
	                $('.chosse_issingle_btn').siblings('input').val("")
	                //class_price
	                $('.class_price input').val("")
	                $('.course_length_warming').text("")
	                $('.course_price_warming').text("")

	                //$("h2").siblings("p");

	                if(object.data.skill.length>0)
	                {
	                    for (var i= 0;i<object.data.skill.length;i++)
	                    {
	                        $('.chosse_topskill_btn').siblings('ul').append('<li wlx-topskill='+i+' wlx-code = '+object.data.skill[i].code+'>'+object.data.skill[i].name+'</li>')

	                    }

	                }
	                else
	                {
	                    mizhu.upload('该老师暂时不可选')
	                }


	                $('.chosse_topskill_btn').click(function () {


	                    if($('.chosse_teacher_input input').val()=="")
	                    {
	                        $('.chosse_teacher_input span').css('color','red')
	                        $('.chosse_teacher_input span').text('*请先选择一个老师')
	                    }
	                    else
	                    {
	                        $('.chosse_teacher_input span').text('')
	                        $('.chosse_skill_btn').removeClass('disabled')
	                        $('.chosse_issingle_btn').addClass('disabled')
	                        $('.course_length_warming').text('')
	                        $('.course_price_warming').text('')
	                        $('.chosse_topskill_btn').siblings('ul').find('li').click(function () {
	                            class_type_code = $(this).attr('wlx-code')
	                        })

	                    }

	                })


	                //点击进入输入框
	                $('.chosse_topskill_btn').siblings('ul').find('li').click(function () {
	                    //alert($(this).text())
	                    $(this).parent().siblings('input').val($(this).text())
	                    if ($(this).attr('wlx-topskill'))
	                    {
	                        topskill = $(this).attr('wlx-topskill')
	                        // console.log("回家的发挥地方发货的夹河街")

	                        //产生二级技能
	                        $('.chosse_skill_btn').click(function () {

	                            $('.chosse_issingle_btn').removeClass('disabled')
	                            $('.chosse_skill_btn').siblings('ul').find('li').remove()
	                            $('.chosse_skill_btn').siblings('input').val("")

	                            if(object.data.skill[topskill].childs.length>0)
	                            {
	                                for (var j = 0;j<object.data.skill[topskill].childs.length;j++)
	                                {

	                                    $('.chosse_skill_btn').siblings('ul').append('<li wlx-skill='+j+' wlx-child-code = '+object.data.skill[topskill].childs[j].code+' >'+object.data.skill[topskill].childs[j].name+'</li>')
	                                }
	                            }
	                            else
	                            {
	                                mizhu.upload('该老师暂时不可选')
	                            }


	                            $('.chosse_skill_btn').siblings('ul').find('li').click(function () {
	                                //alert($(this).text())
	                                $(this).parent().siblings('input').val($(this).text())
	                                class_child_type_code = $(this).attr('wlx-child-code')
	                                //alert('222222')
	                            })


	                            //产生类型
	                            $('.chosse_issingle_btn').click(function () {

	                                $('.chosse_issingle_btn').siblings('ul').find('li').remove()
	                                $('.chosse_issingle_btn').siblings('input').val("")

	                                for (var j = 0;j<object.data.skill[topskill].type.length;j++)
	                                {
	                                    $('.chosse_issingle_btn').siblings('ul').append('<li wlx-issingle='+object.data.skill[topskill].type[j].duration+' wlx-baseprice = '+object.data.skill[topskill].type[j].base_price+' wlx-class-type = '+object.data.skill[topskill].type[j].code+' >'+object.data.skill[topskill].type[j].name+' </li>')

	                                }

	                                $('.submit_btn').removeClass('disabled')

	                                $('.chosse_issingle_btn').siblings('ul').find('li').click(function () {
	                                    //alert($(this).text())
	                                    var duration = $(this).attr('wlx-issingle')
	                                    baseprice = $(this).attr('wlx-baseprice')
	                                    $(this).parent().siblings('input').val($(this).text())
	                                    //alert('3333333')
	                                    course_duration = duration
	                                    grade_type_code = $(this).attr('wlx-class-type')

	                                    $('.course_length_warming').text('课程时长:'+duration+'分钟')
	                                    $('.course_price_warming').text('平台底价:¥'+baseprice+'')

	                                    // $('.class_price').find('input').keyup = function() {
	                                    //     console.log($(this).val()+"平台低价")
	                                    //     if (this.value < Number(baseprice)) {
	                                    //         // TODO 提示不能小于平台低价
	                                    //         this.value = baseprice;
	                                    //         $('.course_price_warming').css('color','red')
	                                    //     }
	                                    //     eles
	                                    //     {
	                                    //         // TODO 提示不能小于平台低价
	                                    //         $('.course_price_warming').css('color','green')
	                                    //     }
	                                    // }
	                                })

	                            })

	                        })
	                    }
	                    $('.chosse_skill_btn').siblings('input').val("")
	                    $('.chosse_issingle_btn').siblings('input').val("")

	                })

	                //TODO 提示不能小于平台低价
	                $('.class_price').find('input').blur(function () {
	                    if (this.value < Number(baseprice))
	                    {
	                        // TODO 提示不能小于平台低价
	                        mizhu.confirm("提示","不能小于平台底价")
	                        $('.course_price_warming').css('color','red')

	                    }
	                    else
	                    {
	                        // TODO 提示不能小于平台低价
	                        $('.course_price_warming').css('color','green')
	                    }

	                })
	            }
	            else
	            {
	                mizhu.fail(data.message)
	                // $('.alert-warning strong').text(data.message)
	                //
	                // $('.alert').css("display","inline-block")
	                // setTimeout(function () {
	                //     $('.alert').css("display","none")
	                // }, 5000);
	            }


	        }
	    })

	});

/***/ }
/******/ ]);