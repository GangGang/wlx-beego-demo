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
	 * Created by ganle on 17/2/22.
	 */




	$("ul.cgstus li").click(function() {
	        if(!$(this).attr('wlx_selected') || $(this).attr('wlx_selected')==0){
	                $(this).find('.cgcheck img').attr('src','/static/images/chooseastudent.png')
	                $(this).attr('wlx_selected',1)
	        }else  {
	                $(this).find('.cgcheck img').attr('src','/static/images/unselected_cg.png')
	                $(this).attr('wlx_selected',0)
	                $('p.fir').attr('wlx_selected',0)
	                $('.cgcheck.fir img').attr('src','/static/images/unselected_cg.png')
	        }
	});

	$('.cgcheck.fir,p.fir').click(function () {
	        if(!$('p.fir').attr('wlx_selected') || $('p.fir').attr('wlx_selected')==0){
	                $('.cgcheck img').attr('src','/static/images/chooseastudent.png')
	                $('ul.cgstus li').attr('wlx_selected',1)
	                $('p.fir').attr('wlx_selected',1)
	        }else  {
	                $('.cgcheck img').attr('src','/static/images/unselected_cg.png')
	                $('ul.cgstus li').attr('wlx_selected',0)
	                $('p.fir').attr('wlx_selected',0)
	        }
	})


	$('.dropdown li').click(function () {
	        var _self = $(this)
	        $('input.form-control.week').val(_self.text()).attr('week',_self.attr('week'))
	        
	        if(_self.attr('week')=="all")
	        {
	                $('ul.cggras li').show()
	        }
	        else 
	        {
	                $('ul.cggras li').each(function (index,ele) {
	                        if($(ele).attr('week') != _self.attr('week'))
	                        {
	                                $(ele).hide()
	                        }
	                        else
	                        {
	                                $(ele).show()
	                        }
	                })
	        }
	})

	$('ul.cggras li').click(function () {
	        var _self = $(this)
	        if(!_self.attr('wlx_selected') || _self.attr('wlx_selected')==0)
	        {
	                _self.css('background-color','#3FBAE4').attr('wlx_selected',1).siblings().css("background-color","#F6F6F6").attr('wlx_selected',0)
	        }
	        else
	        {
	                _self.css('background-color','#F6F6F6').attr('wlx_selected',0)
	                console.log("已选")
	        }
	})


	$('button.sure').click(function () {
	        var stus = []
	        var gra
	        $('ul.cgstus li').each(function (index,ele) {
	                if($(ele).attr('wlx_selected'))
	                {
	                        stus.push(parseInt($(ele).attr('stuid')))
	                }
	        })
	        $('ul.cggras li').each(function (index,ele) {
	                if($(ele).attr('wlx_selected')==1)
	                {
	                       gra = parseInt($(ele).attr('graid'))
	                }
	        })

	        if(!stus.length)
	        {
	                mizhu.upload("未选择学生")
	                return
	        }
	        if(!gra)
	        {
	                mizhu.upload("未选择班级")
	                return
	        }


	        var newData = JSON.stringify({
	                "stu_id_list":stus,
	                "target_grade_id":gra
	        })
	        console.log(newData)
	        $.ajax({
	                url:'/orgs/'+ $('.cgcontent').attr('orgid')+'/schools/'+$('.cgcontent').attr('schoolid')+'/grades/'+ $('.cgcontent').attr('gradeid')+'/change/submit/',
	                type: 'POST',
	                dataType:'json',
	                contentType: "application/json;charset=utf-8",
	                data: newData,
	                error: function (status, error) {
	                        console.log(error)
	                        mizhu.upload("系统繁忙,请稍后再试")
	                },
	                success: function (data, text) {
	                        console.log(data.message)

	                        if(data.code != 0)
	                        {
	                                mizhu.upload(data.message)
	                        }
	                        else
	                        {
	                                mizhu.upload("提交成功!")
	                                setTimeout(function () {
	                                        $('a.jump').attr('href','')
	                                        $('a.jump').get(0).click()
	                                },1000)
	                        }
	                }
	        });
	        
	})

/***/ }
/******/ ]);