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
	 * Created by ganle on 17/1/21.
	 */

	var jsondata = $('.box.orginfo').attr('jsondata')

	var ins_hour = parseInt((parseInt($('p.buti').attr('data-wlx-start'))/3600));
	var ins_hour_s;
	if(ins_hour < 10)
	{
	    ins_hour_s = "0"+ins_hour;
	}
	else
	{
	    ins_hour_s = ins_hour.toString()
	}
	var ins_min = parseInt((parseInt($('p.buti').attr('data-wlx-start'))%3600)/60);
	var ins_min_s;
	if(ins_min < 10)
	{
	    ins_min_s = "0"+ins_min;
	}
	else
	{
	    ins_min_s = ins_min.toString()
	}
	var ins_sec = parseInt($('p.buti').attr('data-wlx-start'))%60;
	var ins_sec_s;
	if(ins_sec < 10)
	{
	    ins_sec_s = "0"+ins_sec;
	}
	else
	{
	    ins_sec_s = ins_sec.toString()
	}


	var ine_hour = parseInt((parseInt($('p.buti').attr('data-wlx-end'))/3600));
	var ine_hour_s;
	if(ine_hour < 10)
	{
	    ine_hour_s = "0"+ine_hour;
	}
	else
	{
	    ine_hour_s = ine_hour.toString()
	}
	var ine_min = parseInt((parseInt($('p.buti').attr('data-wlx-end'))%3600)/60);
	var ine_min_s;
	if(ine_min < 10)
	{
	    ine_min_s = "0"+ine_min;
	}
	else
	{
	    ine_min_s = ine_min.toString()
	}
	var ine_sec = parseInt($('p.buti').attr('data-wlx-end'))%60;
	var ine_sec_s;
	if(ine_sec < 10)
	{
	    ine_sec_s = "0"+ine_sec;
	}
	else
	{
	    ine_sec_s = ine_sec.toString()
	}




	$('p.buti').text(ins_hour_s + ":" + ins_min_s + ":" + ins_sec_s +" - "+ine_hour_s + ":" + ine_min_s + ":" + ine_sec_s)


/***/ }
/******/ ]);