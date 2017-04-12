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

	


	var classinfos = JSON.parse($('.hide').text())
	console.log('------'+classinfos)

	//判断某个时间是否在范围内
	var time_range = function (beginTime, endTime, nowTime) {
	    var strb = beginTime.split(":");
	    if (strb.length != 2) {
	        return false;
	    }

	    var stre = endTime.split(":");
	    if (stre.length != 2) {
	        return false;
	    }

	    var strn = nowTime.split(":");
	    if (stre.length != 2) {
	        return false;
	    }
	    var b = new Date();
	    var e = new Date();
	    var n = new Date();

	    b.setHours(strb[0]);
	    b.setMinutes(strb[1]);
	    e.setHours(stre[0]);
	    e.setMinutes(stre[1]);
	    n.setHours(strn[0]);
	    n.setMinutes(strn[1]);

	    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
	        return true;
	    } else {
	        alert("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
	        return false;
	    }
	}

	//找到不能添加的位置

	function filter() {
	    var final = {'星期1': ['10:00-11:00', '15:00-16:00']};
	    var arr = [];
	    classinfo.list.forEach(function (ele, index) {
	        arr.push(ele.time)
	    });
	    var last = arr.join('/');
	    var judge = last.split('/');
	    var axi = {};
	    judge.forEach(function (ele, index) {
	        var index = ele.substring(0, 3)
	        if (!axi.index) {
	            axi.index = [];
	            axi.index.push(ele.substring(4))
	        } else {
	            axi.index.push(ele.substring(4))
	        }

	    })
	    return axi
	    //@result {'星期1':['10:00-11:00','15:00-16:00'],'星期2':['11:00-12:00','16:00-17:00']}
	}

	var axiba = $('tr').eq(1).text().split(':')[0];
	var beginning = axiba.charAt(0) == '0' ? axiba.substring(1,2) : axiba;
	console.log(parseInt($('th.week').css('width')));

	var width = parseInt($('th.week').css('width'));
	classinfos.forEach(function(ele,index){
	    var gg = ele.id;
	    console.log('gg----'+gg)
	    ele.schedules.forEach(function (qwe, index1) {
	        //var timeArr = ele.time.split('/');
	        console.log('wcnmb8697740---'+index1)
	        var aa = gg;
	        var h;
	        toleft = (qwe.week-1) * (width+1);
	        console.log('left-----'+toleft)
	        var start = qwe.startTime;
	        var end = qwe.endTime;
	        var arr = start.split(':')[0];
	        var arr1 = start.split(':')[1];
	        var arr2 = end.split(':')[0];
	        var arr3 = end.split(':')[1];
	        h = (arr2-arr)*50+(arr3-arr1)/60*50;
	        totop = (parseInt(arr) - parseInt(beginning)) * 50 + parseInt(arr1 / 60 * 50);
	        console.log(totop)
	        var bg = $('<div class="occupy" order="' + ele.id + '"></div>');

	        var info = $('<div><img src="'+$('.hide1').text()+'" width="120" height="80"alt="">' +
	            '<p>开始时间<span>' + start + '</span></p>' +
	            '<p>结束时间<span>' + end + '</span></p></div>');

	        bg.css({position: 'absolute',width:(width+1)+'px',height:h+'px', top: totop + 'px', left: toleft + "px"});
	        $('.show').append(bg);
	        bg.pt({
	            position: 't', // 默认属性值
	            align: 'c',
	            width: '140px',
	            time: 500,// 默认属性值
	            content: info
	        })
	    })
	})


	$('.bb').hover(function () {
	    var index = $(this).data('index');
	    $('div[order=' + index + ']').addClass('active')
	}, function () {
	    var index = $(this).data('index');
	    $('div[order=' + index + ']').removeClass('active')
	})

	$('.occupy').hover(function () {
	    var index = $(this).attr('order');
	    $('div[order=' + index + ']').addClass('active');
	    $('.bb[data-index='+index+']').addClass('active')
	}, function (){
	    var index = $(this).attr('order');
	    $('div[order=' + index + ']').removeClass('active');
	    $('.bb[data-index='+index+']').removeClass('active');
	})




/***/ }
/******/ ]);