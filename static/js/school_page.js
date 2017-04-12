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

	
	var longtitude, latitude, arr;
	navigator.geolocation.getCurrentPosition(function (position) {
	    longtitude = position.coords.longitude;
	    latitude = position.coords.latitude;
	    arr = [longtitude, latitude]
	});

	var map = new AMap.Map('map', {
	    resizeEnable: true,
	    zoom: 15,
	    features: ['bg', 'point', 'building'],
	    center: [114.417696, 30.494818]
	});
	var marker = new AMap.Marker({
	    position: [114.417696, 30.494818]
	});
	marker.setMap(map);
	marker.on('click',function(e){
	    infowindow.open(map,e.target.getPosition());
	})
	var infowindow = new AMap.InfoWindow({
	    content: '<h3 class="title">华侨城校区</h3><div class="content">'+
	    ' <ul style="width:260px">'+
	    '<li class="description">课程数量&nbsp:&nbsp303</li>'+
	    ' <li class="description">教师数量&nbsp:&nbsp103</li>' +
	    ' <li class="description">咨询电话&nbsp:&nbsp400-3445-5555</li>'+
	    ' <li class="description">详细地址&nbsp:&nbsp华侨城OTC商业街S10曼哈顿二楼</li>'+
	    '</div>',
	    offset: new AMap.Pixel(0, -40),
	    isCustom:true,
	    closeWhenClickMap:true,
	    size:new AMap.Size(327,0)
	})
	$("#show").click(function(){
	    $(".qwe").toggleClass('asd')
	})
	$('.qwe li').click(function(){
	    var txt = $(this).text();
	    console.log(txt);
	    $(this).text($('#subject').text());
	    $("#subject").text(txt);
	    $(".qwe").toggleClass('asd')
	})


	$("div").css("pointer-events","none")
	    .filter(".nav-bottom")
	    .css("pointer-events","auto");

/***/ }
/******/ ]);