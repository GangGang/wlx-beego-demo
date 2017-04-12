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

	function reloat_ui(jsonsouce) {

	    // $('#content .tableClassList tbody > li:not(:first-child)).empty();
	    $('#content .tableClassList tbody .contentclass').remove();

	    function getDate(tm) {

	        var tt = new Date(parseInt(tm) * 1000).toLocaleString();

	        return tt;
	    }

	    var json = jsonsouce.course_list;

	    var org = jsonsouce.org_id;

	    var schol = jsonsouce.school_id;


	    for (var i = 0; i < json.length; i++) {


	        var classname = json[i].title;

	        var timecreat = getDate(parseInt(json[i].creation_date / 1000));

	        var ClassPrice = json[i].price;

	        var totalCount = json[i].class_capacity;

	        var actualCount = json[i].class_exist;

	        var rate = json[i].last_month_rate;

	        var image_url = json[i].image_url;


	        var urs_name = json[i].teacher_name;

	        // var jn_name_jb = json[i].teacherLv;

	        // var jn_name = json[i].teacherLv.dictCode.name;

	        $('#content .tableClassList tbody').append(
	            '<tr class="contentclass">' +

	            // '<th>' + classname + '</th>' +

	            '<th><img class="lll_ima"/><ul style="display: inline-block; margin-left: 15px"><li class="class_name_w">' + classname + '</li>' +
	            '<li class="name_user" style=" color: #999999 ">' + urs_name +
	            // '<spa style="background: #AFD8F0;padding: 5px; margin-left:10px; border-radius: 5px; color: whitesmoke; width:120px">'+ jn_name_jb + '</spa></li></ul></th>' +
	            '<th>' + actualCount + '/' + totalCount + '</th>' +
	            '<th>' + rate + '</th>' +
	            '<th>' + ClassPrice + '元' + '</th>' +
	            '<th>' + timecreat + '</th>' +
	            '</tr>'
	        );


	    }


	    $('.lll_ima').each(function (index) {

	        $(this).attr('src', jsonsouce.course_list[index].image_url + '?x-oss-process=image/resize,m_fixed,h_80,w_130/format,jpg/quality,Q_86');

	        // console.log(jsonsouce.course_list[index].clazz.imageUrl);

	    })


	    $('.contentclass').each(function (index) {


	        $(this).click(function () {

	            var id = json[index].id;

	            window.location.href = "/orgs/" + org + "/schools/" + schol + "/courses/" + id + "/";

	        })

	    })
	}


	function get_souce_from_url(url) {

	    // console.log(url);
	    $.getJSON(url,
	        function (jsonObject) {

	            if (jsonObject.code == 200) {

	                reloat_ui(jsonObject);

	            } else {

	                return alert(jsonObject.code + '');
	            }

	        });

	}
	//

	function nav_action(size, page, type_class) {

	    var type = type_class;

	    var string = '';

	    var wlxsize = size;

	    var wlxpage = page;

	    return "/orgs/" + org_id + "/schools/" + school_id + "/classes/?page=" + wlxpage + "&size=" + wlxsize + "&search=" + string + "&type=" + type;


	};

	var org_id
	var school_id

	var flag = false;

	var qq;
	$().ready(function () {

	    var data = JSON.parse($('#jsonObject').val());


	    var all_page = data.total_page;

	    var current_page = data.current_page + 1;
	    org_id = data.org_id;
	    school_id = data.school_id;
	    var type_code = data.type;


	    if (all_page <= 1) {

	        $(".page").css("display", "none");

	    }

	    reloat_ui(data)


	    $('.search_input').keydown(function (e) {

	        var search = $(this).val()
	        if (e.keyCode == 13) {

	            var search_input = $('.search_input').val()

	            //TODO 支付完成的业务完成后做以下跳转  让用户看到订单完成页面
	            var testStr = '/orgs/' + org_id + '/schools/' + school_id + '/courses/?stu_size=' + data.p_size + '&page=0&type=' + data.type + '&search=' + search_input + ''
	            ///orgs/'+org_id+'/schools/'+school_id+'/courses/?stu_size='+data.p_size+'&page =0&type='+data.type+'&search='+$(this).text()
	            $('.href a').attr('href', '/orgs/' + org_id + '/schools/' + school_id + '/courses/?stu_size=' + data.p_size + '&page=0&type=' + data.type + '&search=' + search_input + '')
	            //$('.pay_finish a').attr('target', '_blank')//开启有一个新的页面
	            $('.href a').get(0).click()
	        }
	    })


	    $('.contentt').focus(function () {

	        console.log('ww');

	        if (!flag) {
	            qq = $(this).children().detach();
	            flag = true;
	        }

	        $(this).text('')

	    }).blur(function () {

	        if ($(this).text() == '') {

	            $(this).text('搜索');
	            // $(this).prepend(qq);
	        }

	    }).keydown(function (e) {

	        if ($(this).text().length == 0 && e.keyCode == 13) {

	            console.log('好歹书店什么吧');

	            e.preventDefault();

	            console.log(data.type);

	            // window.location.href="/orgs/1/schools/1/stuparents/?stu_size="+data.stu_size+"&page=0&type="+data.type;


	        } else if (e.keyCode == 13) {

	            window.location.href = '/orgs/' + org_id + '/schools/' + school_id + '/courses/?stu_size=' + data.p_size + '&page =0&type=' + data.type + '&search=' + $(this).text();
	            //'/orgs/'+$('.org').text()+'/schools/'+$('.schools').text()+'/orders/got_info/?parents_user_account='+$(this).text()
	            e.preventDefault()
	        }

	    })


	    if (data.search == '') {

	        $('.contentt').text('搜索');
	        // $(this).prepend(qq);
	    } else {

	        $('.contentt').text(data.search);
	    }


	    var swich_index = swich_title(type_code);

	    var clicked = $('<div class="clicked"></div>')

	    $('.category').click(function () {
	        $(this).find('a').addClass('picked');
	        $(this).find('a').append(clicked);
	        $(this).children('a').css('color', '#ffffff')
	        console.log($(this).index());
	    })


	    $('.category').eq(swich_index).trigger('click');


	    // $('.contentt').eq(swich_index).css({
	    //
	    //     "background" :"black",
	    //
	    //     "color" : "width"
	    //
	    // });

	    // alert(swich_index);

	    $(".page").paging({
	        total: all_page,
	        currentPage: current_page,             //当前页
	        animation: false,
	        centerBgColor: "#fff",
	        centerFontColor: "#000",
	        centerBorder: "1px solid #ddd",
	        transition: "all 0s",
	        centerHoverBgColor: "#25dd3d",
	        centerHoverBorder: "1px solid #25dd3d",
	        centerFontHoverColor: "#fff",
	        otherFontHoverColor: "#fff",
	        otherBorder: "1px solid #ddd",
	        otherHoverBorder: "1px solid #25dd3d",
	        otherBgColor: "#fff",
	        otherHoverBgColor: "#25dd3d",
	        currentFontColor: "#fff",
	        currentBgColor: "#373e4a",
	        currentBorder: "1px solid #f79898",
	        fontSize: 13,
	        currentFontSize: 13,
	        cormer: 2,
	        gapWidth: 2,
	        jumpBgColor: "#fff",
	        jumpFontHoverColor: "#fff",
	        jumpHoverBgColor: "#25dd3d",
	        jumpBorder: "1px solid #ddd",
	        jumpHoverBorder: "1px solid #25dd3d",
	        submitStyle: "href",   //点击按钮后的提交方式，有a标签的href提交和ajax异步提交两种选择
	        idParameter: "&page=", //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾

	        url: '/orgs/' + org_id + '/schools/' + school_id + '/courses/?type=' + type_code + '&size=' + data.p_size + '&search=' + data.search,

	        beforeBtnString: "<<",
	        nextBtnString: ">>"
	    });


	});


	function swich_title(title) {

	    if (title == 'all') {

	        return 0;

	    } else if (title == 'music') {

	        return 1;

	    } else if (title == 'dance') {

	        return 2;

	    } else if (title == 'art') {

	        return 3;

	    } else if (title == 'media_art') {

	        return 4;

	    } else if (title == 'wushu') {

	        return 5;

	    } else if (title == 'chess') {

	        return 6;


	    }

	}




/***/ }
/******/ ]);