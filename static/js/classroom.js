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

	


	$().ready(function(){

	    // TODO 让当前默认的按钮变色
	    var cdnUrl = $('.cdnUrl').val()
	    var type = $('.data_type').val()
	    var page = parseInt($('.data_page').val())+1
	    var total_page = $('.total_page').val()
	    var org_id = $('.org_id').val()
	    var school_id = $('.school_id').val()
	    var search = $('.search').val()
	    var classroom_cum
	    var $clicked = $('<div class="clicked"></div>')
	    var $clicked_hover = $('<div class="clicked"></div>')
	    switch (type)
	    {
	        case "all":
	            $('.all_class').addClass('select_active')
	            $('.all_class').addClass('picked')
	            $('.all_class').append($clicked);
	            break;
	        case "0":
	            $('.collective').addClass('select_active')
	            $('.collective').addClass('picked')
	            $('.collective').append($clicked);
	            break;
	        case "1":
	            $('.only').addClass('select_active')
	            $('.only').addClass('picked')
	            $('.only').append($clicked);
	            break;
	    }

	    if(type == "all")
	    {
	        $('.collective').hover(function () {
	            $(this).addClass('select_active')
	            $(this).addClass('picked')
	            $(this).append($clicked_hover);

	        },function () {
	            $(this).removeClass('select_active')
	            $(this).removeClass('picked')
	            $(this).children().remove();
	        })
	        $('.only').hover(function () {
	            $(this).addClass('select_active')
	            $(this).addClass('picked')
	            $(this).append($clicked_hover);

	        },function () {
	            $(this).removeClass('select_active')
	            $(this).removeClass('picked')
	            $(this).children().remove();
	        })
	    }
	    if(type == "0")
	    {
	        $('.all_class').hover(function () {
	            $(this).addClass('select_active')
	            $(this).addClass('picked')
	            $(this).append($clicked_hover);

	        },function () {
	            $(this).removeClass('select_active')
	            $(this).removeClass('picked')
	            $(this).children().remove();
	        })
	        $('.only').hover(function () {
	            $(this).addClass('select_active')
	            $(this).addClass('picked')
	            $(this).append($clicked_hover);

	        },function () {
	            $(this).removeClass('select_active')
	            $(this).removeClass('picked')
	            $(this).children().remove();
	        })
	    }
	    if(type == "1")
	    {
	        $('.collective').hover(function () {
	            $(this).addClass('select_active')
	            $(this).addClass('picked')
	            $(this).append($clicked_hover);

	        },function () {
	            $(this).removeClass('select_active')
	            $(this).removeClass('picked')
	            $(this).children().remove();
	        })
	        $('.all_class').hover(function () {
	            $(this).addClass('select_active')
	            $(this).addClass('picked')
	            $(this).append($clicked_hover);

	        },function () {
	            $(this).removeClass('select_active')
	            $(this).removeClass('picked')
	            $(this).children().remove();
	        })
	    }



	    $('.class_item').hover(function () {
	        $(this).find('span').css('color','white')
	        $(this).children().children('.classroom_logo').attr('src',''+cdnUrl+'/static/images/comments_h.png')
	    },function () {
	        $(this).find('span').css('color','#333333')
	        $(this).children().children('.classroom_logo').attr('src',''+cdnUrl+'/static/images/comments.png')
	        $(this).find('span').css('color','#333333')

	    })

	    $('.search_input').keydown(function(e) {

	        var search = $(this).val()
	        if (e.keyCode == 13) {

	            //TODO 支付完成的业务完成后做以下跳转  让用户看到订单完成页面
	            $('.href a').attr('href','/orgs/'+org_id+'/schools/'+school_id+'/classroom/?type='+type+'&search='+search+'')
	            //$('.pay_finish a').attr('target', '_blank')//开启有一个新的页面
	            $('.href a').get(0).click()
	        }
	    })

	    $('.classroom_title input').blur(function () {

	        if ($(this).val())
	        {
	            $('.classroom_title_warming').text('')
	            $('.classroom_title_warming').css('color','#888888')
	        }

	    })
	    $('.classroom_num input').blur(function () {

	        if ($(this).val())
	        {
	            $('.classroom_num_warming').text('')
	            $('.classroom_num_warming').css('color','#888888')
	        }

	    })
	        // var size = $('.class_item').size()
	    //
	    // var le = 12 - size
	    // for (var i = 0; i< le;i++) {
	    //     $('.allClass').append('<div class="class_item"></div>')
	    // }

	    $('.allClass .ssss').removeClass("hidden")

	    $('.big-class').click(function () {

	        $('.classroom_cum input').attr("disabled",false);
	        console.log('阿拉啦啦啦啦阿11111111')

	    })
	    $('.one-to-one').click(function () {

	        $('.classroom_cum input').attr("disabled",true);
	        $('.classroom_cum input').val("");
	        classroom_cum = 1;

	        console.log('阿拉啦啦啦啦阿里222222')

	    })//选中一对一


	        //添加老师按钮
	    $('.add_classroom_btn').click(function () {

	        if($('.classroom_title input').val()== "")
	        {
	            $('.classroom_title_warming').text('课程名字不能为空')
	            $('.classroom_title_warming').css('color','red')
	            return
	        }
	        else 
	        {

	            var chosse_type =  false
	            if ($('.chosse_type input[name="options"]:checked').val()==1)//选中一对一
	            {
	                chosse_type =true
	                console.log('阿拉啦啦啦啦阿里')
	            }
	            else
	            {
	                classroom_cum = parseInt($('.classroom_cum input').val())
	            }
	            if (chosse_type == false)
	            {
	                if($('.classroom_cum input').val() == "")
	                {
	                    //提示要填数据
	                    $('.classroom_num_warming').text('不能为空')
	                    $('.classroom_num_warming').css('color','red')
	                    return
	                }
	                else
	                {
	                    
	                }
	            }
	            
	        }
	        
	        var classroom_title = $('.classroom_title input').val().toString()
	        // alert(classroom_title)
	        
	        // alert(chosse_type)
	        // alert(classroom_cum)
	        // if (!classroom_title && !chosse_type && !classroom_cum)
	        // {
	           var object= {
	                "title":classroom_title,
	                "is_single":chosse_type,
	                "max_student_count":classroom_cum
	            }

	            $.ajax({
	                    type: 'POST',
	                    url: '/orgs/'+org_id+'/schools/'+school_id+'/classroom/add/',
	                    data: JSON.stringify(object),
	                    dataType:'json',
	                    contentType: "application/json;charset=utf-8",
	                    error: function (status, error) {

	                        mizhu.fail('添加教室失败')
	                        // $('.alert-warning strong').text("请求错误"+status)
	                        //
	                        // $('.alert').css("display","inline-block")
	                        // setTimeout(function () {
	                        //     $('.alert').css("display","none")
	                        // }, 5000);
	                    },
	                    success: function (data, text) {


	                        if (data.code == 0)
	                        {
	                            mizhu.upload("添加教室成功")
	                            window.location.reload();
	                            // $('.alert-warning strong').text(data.message)
	                            //
	                            // $('.alert').css("display","inline-block")
	                            // setTimeout(function () {
	                            //     $('.alert').css("display","none")
	                            //     $('.close').click()
	                            //     window.location.reload();
	                            //     //console.log(data)
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


	        // }

	    })

	    //分页
	    $(".foot_page").paging({

	        total: total_page,                          //全部页数
	        showPage: 8,                        //显示的页数 //当显示的页数大于总页数时是没有[...]框的
	        height: 30,                         //高
	        width: 15,                           //宽
	        jumpInputWidth: 60,                 //跳转输入框的宽
	        fontFamily: "微软雅黑",              //字体
	        fontSize: 14,                       //字体大小
	        currentFontSize: 14,                //当前选中页的字体大小
	        fontWeight: 700,                    //字体宽度
	        currentFontWeight: 700,             //当前选中页的字体粗细
	        centerFontColor: "#222222",            //中间字体颜色
	        otherFontColor: "#222222",             //两边字体颜色
	        centerFontHoverColor: "#363d4b",        //中间鼠标悬浮的字体颜色
	        otherFontHoverColor: "#363d4b",         //两边鼠标悬浮的字体颜色
	        currentFontColor: "white",            //当前选中页的字体颜色
	        jumpFontColor: "#222222",              //跳转内部标签的字体颜色
	        jumpFontHoverColor: "#222222",          //跳转内部标签的悬浮字体颜色
	        currentPage: page,                     // TODO 当前页
	        centerBgColor: "white",           //中间页数按钮的底色
	        centerHoverBgColor: "",             //中间鼠标悬浮的的底色
	        otherBgColor: "white",            //两边按钮的底色
	        otherHoverBgColor: "",              //两边鼠标悬浮的背景颜色
	        jumpBgColor: "#b6ff00",             //跳转a标签按钮的背景色
	        jumpHoverBgColor: "",               //跳转a标签背景的悬浮背景色
	        currentBgColor: "#363d4b",          //当前选中页的底色
	        centerBorder: "1px solid lightgray",    //中间按钮的边框
	        otherBorder: "1px solid lightgray",     //两边按钮的边框
	        centerHoverBorder: "2",              //中间按钮悬浮边框
	        otherHoverBorder: "2",               //两边按钮悬浮边框
	        jumpBorder: "1px solid lightgray",      //跳转内标签的边框
	        jumpHoverBorder: "1",                //跳转内标签的悬浮边框
	        currentBorder: "",                  //当前选中页的边框
	        showJump: false,                    //是否显示跳转功能
	        transition: "initial",              //效果延迟
	        gapWidth: 5,                        //间隙宽度
	        cormer: 3,                          //按钮的边角曲度
	        beforeBtnString: "上一页",           //上一页按钮内显示的文字
	        nextBtnString: "下一页",             //下一页按钮内显示的文字
	        firstBtnString: "首页",              //首页按钮内显示的内容
	        lastBtnString: "尾页",               //尾页按钮内显示的内容
	        jumpBtnString: "跳转",               //跳转按钮的显示内容
	        submitStyle: "href",                //点击按钮后的提交方式，有a标签的href提交和ajax异步提交两种选择
	        submitType: "post",                 //注明是通过get方式访问还是post方式访问
	        idParameter: "&page=",              //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾
	        url: "/orgs/"+org_id+"/schools/"+school_id+"/classroom/?type="+type+"&search="+search+"",    //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
	        limit: 5000,                        //设置滚动显示方式的极限值，大于则自动切换无滚动模式
	        animation: false,                    //是否是滚动动画方式呈现  false为精简方式呈现   页数大于limit时无论怎么设置自动默认为false

	    });



	})

























/***/ }
/******/ ]);