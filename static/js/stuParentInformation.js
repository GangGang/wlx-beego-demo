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

	
	function swich_title(title) {
	    if(title == 'all'){
	        return 0;
	    }else if(title == 'music'){
	        return 1;
	    }else if(title == 'dance'){
	        return 2;
	    }else if(title == 'art'){
	        return 3;
	    }else if(title == 'media_art'){
	        return 4;
	    }else if(title == 'wushu'){
	        return 5;
	    }else if(title == 'chess'){
	        return 6;
	    }

	}

	$().ready(function () {
	    var data = JSON.parse($('#jsonObject').val());
	    $('.search_input').keydown(function(e) {
	        
	        var search = $(this).val()
	        if (e.keyCode == 13) {
	            var search_input = $('.search_input').val()
	            var testStr = '/orgs/'+data.org_id+'/schools/'+data.school_id+'/stuparents/?stu_size='+data.stusize+'&page=0&type='+data.type+'&student_name='+search_input+''
	            $('.href a').attr('href','/orgs/'+data.org_id+'/schools/'+data.school_id+'/stuparents/?stu_size='+data.stusize+'&page=0&type='+data.type+'&student_name='+search_input+'')
	            $('.href a').get(0).click()
	        }
	    })
	    var  current_page = data.page +1;
	    var all_page = data.pages ;
	    var type_code = data.type;
	    var swich_index = swich_title(type_code);

	    var clicked = $('<div class="clicked"></div>')
	    $('.category').click(function(){
	        $(this).find('a').addClass('picked');
	        $(this).find('a').append(clicked);
	        $(this).children('a').css('color','#ffffff')
	        //localStorage.setItem('type',$(this).index());
	        console.log($(this).index());
	    })

	    $('.category').eq(swich_index).trigger('click');

	    if(all_page <= 1){
	        $(".page").css("display","none");
	    }

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
	        fontsize: 13,
	        currentFontsize: 13,
	        cormer: 2,
	        gapWidth: 2,
	        jumpBgColor: "#fff",
	        jumpFontHoverColor: "#fff",
	        jumpHoverBgColor: "#25dd3d",
	        jumpBorder: "1px solid #ddd",
	        jumpHoverBorder: "1px solid #25dd3d",
	        submitStyle: "href",   //点击按钮后的提交方式，有a标签的href提交和ajax异步提交两种选择
	        idParameter: "&page=", //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾
	        url: "/orgs/"+data.org_id+"/schools/"+data.school_id+"/stuparents/?type="+type_code+"&stusize=9&student_name="+data.student_name,
	        beforeBtnstringing: "<<",
	        nextBtnstringing: ">>"
	    });

	})

/***/ }
/******/ ]);