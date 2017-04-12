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

	    var type = $('.data_type').val()
	    var total_page = $('.total_page').val()
	    var page = parseInt($('.data_page').val())+1
	    var sort = $('.data_sort').val()
	    var org_id = $('.org_id').val()
	    var school_id = $('.school_id').val()
	    var cdn_url = $('.cdn_url').val()
	    var search = $('.search').val()
	    $('.wlzx-category').click(function () {
	        // $('.select_btn').removeClass('select_active')
	        // $(this).addClass('select_active')
	    })

	    $('.search_input').keydown(function(e) {

	        var search = $(this).val()
	        if (e.keyCode == 13) {

	            //TODO 支付完成的业务完成后做以下跳转  让用户看到订单完成页面
	            $('.href a').attr('href','/orgs/'+org_id+'/teachers/?type='+type+'&search='+search+'')
	            //$('.pay_finish a').attr('target', '_blank')//开启有一个新的页面
	            $('.href a').get(0).click()
	        }
	    })

	    console.log("啦啦啦啦啦啦啦啦啦"+sort)

	    var $clicked = $('<div class="clicked"></div>')
	    var $clicked_hover = $('<div class="clicked"></div>')
	    //判断哪个按钮高亮
	    switch (type)
	    {
	        case "all":
	            $('.all_class').addClass('select_active')
	            $('.all_class').addClass('picked')
	            $('.all_class').append($clicked);
	            break;
	        case "dance":
	            $('.dance').addClass('select_active')
	            $('.dance').addClass('picked')
	            $('.dance').append($clicked);
	            break;
	        case "music":
	            $('.music').addClass('select_active')
	            $('.music').addClass('picked')
	            $('.music').append($clicked);
	            break;
	        case "art":
	            $('.art').addClass('select_active')
	            $('.art').addClass('picked')
	            $('.art').append($clicked);
	            break;
	        case "media_art":
	            $('.media_art').addClass('select_active')
	            $('.media_art').addClass('picked')
	            $('.media_art').append($clicked);
	            break;
	        case "kungfu":
	            $('.wushu').addClass('select_active')
	            $('.wushu').addClass('picked')
	            $('.wushu').append($clicked);
	            break;
	        case "chess":
	            $('.chess').addClass('select_active')
	            $('.chess').addClass('picked')
	            $('.chess').append($clicked);
	            break;
	    }
	    switch (sort)
	    {
	        case "default":
	            $('.default').addClass('sort_select')
	            $('.class_rate_logo').attr("src",cdn_url+"/static/images/down.png")
	            $('.saturating_logo').attr("src",cdn_url+"/static/images/down.png")
	            break;
	        case "saturated_asc":
	            $('.sort_saturating').addClass('sort_select')//cdn_url
	            $('.class_rate_logo').attr("src",cdn_url+"/static/images/down.png")
	            $('.saturating_logo').attr("src",cdn_url+"/static/images/down.png")
	            break;
	        case "saturated_desc":
	            $('.sort_saturating').addClass('sort_select')
	            $('.saturating_logo').attr("src",cdn_url+"/static/images/up.png")
	            $('.class_rate_logo').attr("src",cdn_url+"/static/images/down.png")//class_rate_logo

	            break;
	        case "clazz_asc":
	            $('.sort_rate').addClass('sort_select')
	            $('.saturating_logo').attr("src",cdn_url+"/static/images/down.png")
	            $('.class_rate_logo').attr("src",cdn_url+"/static/images/down.png")
	            break;
	        case "clazz_desc":
	            $('.sort_rate').addClass('sort_select')
	            $('.saturating_logo').attr("src",cdn_url+"/static/images/down.png")
	            $('.class_rate_logo').attr("src",cdn_url+"/static/images/up.png")
	            break;
	        case "":
	            $('.class_rate_logo').attr("src",cdn_url+"/static/images/down.png")
	            $('.saturating_logo').attr("src",cdn_url+"/static/images/down.png")
	            break;
	    }

	    if(type == "all")
	    {
	        //$('.all_class').addClass('type_hover')
	        $('.dance').addClass('type_hover')
	        $('.music').addClass('type_hover')
	        $('.art').addClass('type_hover')
	        $('.media_art').addClass('type_hover')
	        $('.wushu').addClass('type_hover')
	        $('.chess').addClass('type_hover')
	    }
	    if(type =="dance")
	    {
	        $('.all_class').addClass('type_hover')
	        //$('.dance').addClass('type_hover')
	        $('.music').addClass('type_hover')
	        $('.art').addClass('type_hover')
	        $('.media_art').addClass('type_hover')
	        $('.wushu').addClass('type_hover')
	        $('.chess').addClass('type_hover')
	    }
	    if(type =="music")
	    {
	        $('.all_class').addClass('type_hover')
	        $('.dance').addClass('type_hover')
	        //$('.music').addClass('type_hover')
	        $('.art').addClass('type_hover')
	        $('.media_art').addClass('type_hover')
	        $('.wushu').addClass('type_hover')
	        $('.chess').addClass('type_hover')
	    }
	    if(type =="art")
	    {
	        $('.all_class').addClass('type_hover')
	        $('.dance').addClass('type_hover')
	        $('.music').addClass('type_hover')
	        //$('.art').addClass('type_hover')
	        $('.media_art').addClass('type_hover')
	        $('.wushu').addClass('type_hover')
	        $('.chess').addClass('type_hover')
	    }
	    if(type =="media_art")
	    {
	        $('.all_class').addClass('type_hover')
	        $('.dance').addClass('type_hover')
	        $('.music').addClass('type_hover')
	        $('.art').addClass('type_hover')
	        //$('.media_art').addClass('type_hover')
	        $('.wushu').addClass('type_hover')
	        $('.chess').addClass('type_hover')
	    }
	    if(type =="wushu")
	    {
	        $('.all_class').addClass('type_hover')
	        $('.dance').addClass('type_hover')
	        $('.music').addClass('type_hover')
	        $('.art').addClass('type_hover')
	        $('.media_art').addClass('type_hover')
	        //$('.wushu').addClass('type_hover')
	        $('.chess').addClass('type_hover')
	    }
	    if(type =="chess")
	    {
	        $('.all_class').addClass('type_hover')
	        $('.dance').addClass('type_hover')
	        $('.music').addClass('type_hover')
	        $('.art').addClass('type_hover')
	        $('.media_art').addClass('type_hover')
	        $('.wushu').addClass('type_hover')
	        //$('.chess').addClass('type_hover')
	    }


	    $('.type_hover').hover(function () {
	        $(this).addClass('select_active')
	        $(this).addClass('picked')
	        $(this).append($clicked_hover);

	    },function () {
	        $(this).removeClass('select_active')
	        $(this).removeClass('picked')
	        $(this).children().remove();
	    })


	    // $('.all_class').addClass('select_active')
	    // $('.default').addClass('sort_select')
	    
	    var text =  $('.input_url').val()
	    $(function(){

	        jQuery('.url_img').qrcode({
	            render  : "canvas",//也可以替换为table
	            width   : 200,
	            height  : 200,
	            foreground: "#C00",
	            background: "#FFF",
	            text    : text
	        });

	    })
	//添加老师弹框

	$('#d_clip_button').click(function () {

	    // 定义一个新的复制对象
	    var clip = new ZeroClipboard(document.getElementById("d_clip_button"), {
	        moviePath: "./static/libs/ZeroClipboard.swf"
	    } );
	// 复制内容到剪贴板成功后的操作
	    clip.onCopy( 'complete', function(client, args) {
	        // alert("复制成功，复制内容为："+ args.text);

	        mizhu.upload('复制成功')

	    } );

	})
	    //分页
	    $(".foot_page").paging({

	        url: "/orgs/"+org_id+"/teachers/?type="+type+"&sort="+sort+"&search="+search+"",                         //需要提交的目标控制器，如"/Home/List/"或"/Home/List?name='张三'&password='123456'"
	        limit: 5000,                        //设置滚动显示方式的极限值，大于则自动切换无滚动模式
	        total: total_page,                          //全部页数
	        showPage: 8,                        //显示的页数 //当显示的页数大于总页数时是没有[...]框的
	        height: 30,                         //高
	        width: 15,                           //宽
	        jumpInputWidth: 60,                 //跳转输入框的宽
	        //fontFamily: "",              //字体
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
	        animation: false,                    //是否是滚动动画方式呈现  false为精简方式呈现   页数大于limit时无论怎么设置自动默认为false

	    });
	    


	})
















/***/ }
/******/ ]);