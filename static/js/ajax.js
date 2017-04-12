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
	 * Created by beingRay on 16/12/20.
	 */

	$().ready(function(){
	    console.log(location.href.substring(21));

	    

	    $('li a').click(function(){
	        $("table tr:gt(0)").remove();
	        var count = $(this).text();

	        list.list.forEach(function(ele,index){
	            if((count-1)*3<=index && index<count*3) {
	                var tr = $('<tr><td><a href="orderDetail/' + ele.orderId + '" target="main">'+ele.orderId+'</a></td><td>' + ele.payId + '</td><td class="qq">' + ele.customer +
	                    '</td><td class="www">' + ele.stuname + '<br>&nbsp&nbsp&nbsp' + ele.stuno + '</td><td class="ww">' +
	                    ele.course + '</td><td>' + ele.teacher + '</td><td>' + ele.times + '<br>' + ele.sum + '' +
	                    '</td></tr>');
	            }
	            $('table').append(tr)
	        })
	    })

	    var clicked = $('<div class="clicked"></div>')
	    
	    $('.category').click(function(){
	        $(this).find('a').addClass('picked')
	        $(this).find('a').append(clicked);
	        $(this).children('a').css('color','#ffffff')
	        //localStorage.setItem('type',$(this).index());
	        console.log($(this).index());
	    })



	    if($('.hide').text()){
	        $('.category[cat='+$('.hide').text()+']').trigger('click')}



	    var qq;
	    var flag=false;

	    if($('.keyword').length>0){
	        $('.content').text($('.keyword').text());
	        var search = parseInt($('.keyword').text());
	        var request = "/orgs/"+$('.org').text()+"/schools/"+$('.schools').text()+"/orders/got_info/?parents_user_account=" + search;
	    }else{
	        var request = "/orgs/"+$('.org').text()+"/schools/"+$('.schools').text()+"/orders/?type="+$('.hide').text()
	    }


	    $('tr').click(function(){
	        window.open($(this).data('attr'),'_self')
	    })

	    $('.search_input').focus(function(){
	        console.log('ww')
	        if(!flag){
	            qq = $(this).children().detach();
	            flag=true;
	        }
	        $(this).text('')
	    }).blur(function(){
	        if($(this).text()==''){
	            $(this).text('搜索');
	            $(this).prepend(qq);
	        }
	    }).keydown(function(e){
	        if($(this).val().length==0 && e.keyCode==13){
	            window.open( "/orgs/"+$('.org').text()+"/schools/"+$('.schools').text()+"/orders/",'_self')
	            e.preventDefault()
	        }else if(e.keyCode==13){
	                var type = $('a.picked').attr('href');
	                if($('a.picked').text() == '全部'){
	                    window.location.href=type+'?search='+$(this).val();
	                }else{
	                    window.open(type+'&search='+$(this).val(),'_self');
	                }
	            e.preventDefault()}
	    })

	    if(parseInt($('.total').text())>0){
	        $(".page").paging({
	            total: parseInt($('.total').text()),
	            currentPage: parseInt($('.current').text())+1,             //当前页
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
	            idParameter: "&page=",               //传到后台的当前页的id的参数名，这个传值会自动添加在href或ajax的url末尾
	            url:  request,
	            beforeBtnString: "<<",
	            nextBtnString: ">>"
	        });
	    }

	})










/***/ }
/******/ ]);