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
	    $.each($('.block_one'), function (index, val) {
	            var startTime = $(val).attr("data-wlx-start-time");
	            var endTime = $(val).attr("data-wlx-end-time");
	            var week = $(val).attr("data-wlx-week");
	            var begin
	            var end
	            if( startTime.length>4)
	            {
	                begin =  parseInt( startTime.substring(0,2)*60)+parseInt( startTime.substring(3,5))

	            }
	            if( startTime.length==4)
	            {
	                begin =  parseInt( startTime.substring(0,1)*60)+parseInt( startTime.substring(2,4))

	            }
	            if( endTime.length > 4)
	            {
	                end =  parseInt( endTime.substring(0,2)*60)+parseInt( endTime.substring(3,5))

	            }
	            if( endTime.length == 4)
	            {
	                end =  parseInt( endTime.substring(0,1)*60)+parseInt( endTime.substring(2,4))
	            }

	            var length = (end - begin)*0.834
	            var X = (week - 1) * 57
	            var Y =(begin - 480)*0.835

	            var style = 'left:'+X+'px'+';top:'+Y+'px'+';height:'+length+'px'+'';
	            $(val).css("left", X+"px");
	            $(val).css("top", Y+"px");
	            $(val).css("height", length+"px");


	        });

	    $('.big-class').click(function () {
	        $('.classroom_cum input').removeAttr("disabled","disabled");

	    })

	    $('.one-to-one').click(function () {
	        $('.classroom_cum input').val('1')
	        $('.classroom_cum input').attr("disabled","disabled");

	    })



	    var org_id = $('.org_id').val()
	    var school_id = $('.school_id').val()
	    var classroom_id = parseInt($('.classroom_id').val())

	    // TODO 保存
	        $('.save_classroom_btn').click(function () {
	            var classroom_title = $('.alert_classroom_name input').val()
	            var classroom_cum = parseInt($('.classroom_cum input').val())
	            var chosse_type = false
	            if ($('.chosse_type input[name="options"]:checked').val()==1)
	            {
	                chosse_type =true
	            }

	            var object= {
	                "title":classroom_title,
	                "is_single":chosse_type,
	                "max_student_count":classroom_cum
	            }
	            $.ajax({
	                    type: 'POST',
	                    url: '/orgs/'+org_id+'/schools/'+school_id+'/classroom/edit/'+classroom_id+'/',
	                    data: JSON.stringify(object),
	                    dataType:'json',
	                    contentType: "application/json;charset=utf-8",

	                    error: function (status, error) {
	                        mizhu.fail("保存请求失败")
	                    },
	                    success: function (data, text) {
	                        
	                        if(data.code == 0)
	                        {
	                            mizhu.upload('保存成功')
	                            window.location.reload();
	                        }
	                        else
	                        {
	                            mizhu.upload(data.message)
	                            console.log(data)
	                        }
	                        
	                    }
	                }
	            )




	        })
	        $('.del_classroom_btn').click(function () {

	            // TODO 删除
	            var object= {
	                "id":classroom_id,
	            }

	            $.ajax({
	                    type: 'POST',
	                    url: '/orgs/'+org_id+'/schools/'+school_id+'/classroom/delete/',
	                    data: JSON.stringify(object),
	                    dataType:'json',
	                    contentType: "application/json;charset=utf-8",

	                    error: function (status, error) {
	                        mizhu.fail('删除请求失败')
	                    },
	                    success: function (data, text) {
	                        if(data.code == 0)
	                        {
	                            mizhu.upload('删除成功')
	                            $('.href a').attr('href','/orgs/'+org_id+'/schools/'+school_id +'/classroom/')
	                            //$('.pay_finish a').attr('target', '_blank')//开启有一个新的页面
	                            $('.href a').get(0).click()
	                        }
	                        else
	                        {
	                            mizhu.upload(data.message)
	                        }
	                    }
	                }
	            )
	        })

	        $('.block_one').hover(function () {

	            // console.log('大部分撒娇菲律宾1')
	            var flag_index =  $(this).attr('tag_flag')
	            // console.log('大部分撒娇菲律宾2')
	            $('.block_one').css('background','lightgrey')
	            $('.teacher_name').css('background','lightgrey')
	            $('.class_name').css('background','lightgrey')
	            $('.grade_name').css('background','lightgrey')
	            // console.log('大部分撒娇菲律宾3')

	            $(this).css('background','#3fbae7')
	            $('.grade_cell').each(function (index,ele) {

	                // console.log('节点'+$(ele))
	                var data_index = $(ele).attr('tag_flag')
	                // array.push(data_index)
	                if(flag_index == data_index)
	                {
	                    // console.log('大部分撒娇菲律宾')
	                    // console.log(data_index)
	                    $(this).children().css('background','#3fbae7')
	                }

	            })
	        })
	        $('.grade_cell').hover(function () {
	            console.log('大部分撒娇菲律宾999')
	            var flag_index =  $(this).attr('tag_flag')
	            // console.log(index)
	            $('.teacher_name').css('background','#f6f6f6')
	            $('.class_name').css('background','#f6f6f6')
	            $('.grade_name').css('background','#f6f6f6')
	            $('.teacher_name').css('color','#333333')
	            $('.class_name').css('color','#333333')
	            $('.grade_name').css('color','#333333')
	            $('.block_one').css('background','#cccccc')
	            $(this).children().css('background','#3fbae7')
	            $(this).children().css('color','#ffffff')
	            $('.block_one').each(function (index,ele) {

	                // console.log('节点'+$(ele))
	                var data_index = $(ele).attr('tag_flag')
	                // array.push(data_index)
	                if(flag_index == data_index)
	                {
	                    // console.log('大部分撒娇菲律宾')
	                    // console.log(data_index)
	                    $(this).css('background','#3fbae7')
	                }

	            })

	        })


	        $('.block_one').mouseover(function () {

	            $(this).children().css('display','block')

	        })
	        $('.block_one').mouseout(function () {

	            $(this).children().css('display','none')

	        })

	    

	})






/***/ }
/******/ ]);