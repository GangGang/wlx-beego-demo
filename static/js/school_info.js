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
	 * Created by ganle on 17/1/18.
	 */
	 

	var jsondata = JSON.parse($('.school_info').attr('jsondata'))

	console.log(jsondata)

	var starttime = jsondata.start_time; //开始营业
	var endtime = jsondata.end_time;  //结束营业

	var zulinimgs = jsondata.contract_url;
	var congshuimgs = jsondata.license_url;

	var lastone;

	$('span.lastmodi').text(new Date(jsondata.last_modified_date).toLocaleDateString() +" "+new Date(jsondata.last_modified_date).toLocaleTimeString())


	$('.show_decorationdate').val(new Date($('.show_decorationdate').attr('data-wlx-decorationdate') * 1).toLocaleString().split(" ")[0])
	var ins_hour = parseInt((parseInt($('.ins_show').attr('data-wlx-start'))/3600));
	var ins_hour_s;
	if(ins_hour < 10)
	{
	    ins_hour_s = "0"+ins_hour;
	}
	else
	{
	    ins_hour_s = ins_hour.toString()
	}
	var ins_min = parseInt((parseInt($('.ins_show').attr('data-wlx-start'))%3600)/60);
	var ins_min_s;
	if(ins_min < 10)
	{
	    ins_min_s = "0"+ins_min;
	}
	else
	{
	    ins_min_s = ins_min.toString()
	}
	var ins_sec = parseInt($('.ins_show').attr('data-wlx-start'))%60;
	var ins_sec_s;
	if(ins_sec < 10)
	{
	    ins_sec_s = "0"+ins_sec;
	}
	else
	{
	    ins_sec_s = ins_sec.toString()
	}


	var ine_hour = parseInt((parseInt($('.ine_show').attr('data-wlx-end'))/3600));
	var ine_hour_s;
	if(ine_hour < 10)
	{
	    ine_hour_s = "0"+ine_hour;
	}
	else
	{
	    ine_hour_s = ine_hour.toString()
	}
	var ine_min = parseInt((parseInt($('.ine_show').attr('data-wlx-end'))%3600)/60);
	var ine_min_s;
	if(ine_min < 10)
	{
	    ine_min_s = "0"+ine_min;
	}
	else
	{
	    ine_min_s = ine_min.toString()
	}
	var ine_sec = parseInt($('.ine_show').attr('data-wlx-end'))%60;
	var ine_sec_s;
	if(ine_sec < 10)
	{
	    ine_sec_s = "0"+ine_sec;
	}
	else
	{
	    ine_sec_s = ine_sec.toString()
	}



	$('.ins_show').val(ins_hour_s + ":" + ins_min_s + ":" + ins_sec_s)
	$('.ine_show').val(ine_hour_s + ":" + ine_min_s + ":" + ine_sec_s)



	document.body.onclick= function () {
	    $("#selectti").hide();
	    $("#selecttie").hide();
	};


	$('.uploadimg').change(function (e) {
	    var _self = this;
	    var file = e.target.files[0];
	    if(file)
	    {
	        var sib = $(_self).siblings('img.double')
	        if(uploadimg.imgfiletesting(file))
	        {
	            
	        }
	        else
	        {
	            mizhu.upload("文件格式不支持")
	            return
	        }
	        lastone.find('img.loading').show()
	        
	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	            $('img.loading').hide()
	            mizhu.upload('上传失败')
	            $(_self).val(null)
	        },function (storeAs) {
	            sib.attr('src',window.URL.createObjectURL(file));
	            $(_self).val(null)
	            $(_self).siblings('img.double').attr('ali',storeAs)
	            $('img.loading').hide()
	            $(_self).val(null)
	        });
	    }

	});


	$('.imgl,.imgr').click(function () {
	    lastone = $(this)
	})



	$('.start').click(function (e) {
	    e.stopPropagation();
	});

	$('.end').click(function (e) {
	    e.stopPropagation();
	});

	$("span.times").click(function (e) {
	    // e.stopPropagation();
	    $("#selecttie").hide();
	    $("#selectti").toggle(200,function () {
	    });
	});

	$("span.timee").click(function (e) {
	    // e.stopPropagation();
	    $("#selectti").hide();
	    $("#selecttie").toggle(200,function () {
	    });
	});

	$('#turestart').click(function () {
	    $('input.ins').val($('#hour').val() +':' + $('#minute').val() +':00');
	    starttime = parseInt($('#hour').val())*3600+parseInt($('#minute').val()*60);
	    $("#selectti").hide();
	    testingtimes()
	});

	$('#turestarte').click(function () {
	    $('input.ine').val($('#houre').val() +':' + $('#minutee').val() +':00');
	    endtime = parseInt($('#houre').val())*3600+parseInt($('#minutee').val()*60);
	    $("#selecttie").hide();
	    testingtimes()
	});

	$("span.reno").click(function () {
	    laydate({
	        elem: '#reno'
	    });
	});



	$('input.form-control.support_hotline').blur(function () {
	    if($('button.numtype').eq(0).hasClass('btn-success'))
	    {
	        var _self = $(this)
	        if(!_self.val())
	        {
	            _self.parent().find('p.testing').text("*咨询电话不能为空").show()
	            // _self.parent().addClass("has-error has-feedback")
	            // _self.parent().find('span').show()
	        }
	        else if(!(/^1[0-9]{10}$/.test(_self.val())))
	        {
	            console.log("格式")
	            _self.parent().find('p.testing').text("*咨询电话格式有误").show()
	            // _self.parent().addClass("has-error has-feedback")
	            // _self.parent().find('span').show()
	        }
	        else
	        {
	            _self.parent().find('p.testing').hide()
	            // _self.parent().removeClass("has-error has-feedback")
	            // _self.parent().find('span').hide()
	        }
	    }
	})


	$('input.form-control.support_hotline2').blur(function () {
	    if($('button.numtype').eq(1).hasClass('btn-success'))
	    {
	        var _self = $(this)
	        if(!_self.val())
	        {
	            _self.parent().find('p.testing').text("*咨询电话不能为空").show()
	            // _self.parent().addClass("has-error has-feedback")
	            // _self.parent().find('span').show()
	        }
	        else if(!(/\d{3,4}-?\d{3,8}$/.test(_self.parents('.hottel').find('.support_hotline1').val()+"-"+_self.val())))
	        {
	            _self.parent().find('p.testing').text("*咨询电话格式有误").show()
	            // _self.parent().addClass("has-error has-feedback")
	            // _self.parent().find('span').show()
	        }
	        else
	        {
	            _self.parent().find('p.testing').hide()
	            // _self.parent().removeClass("has-error has-feedback")
	            // _self.parent().find('span').hide()
	            // _self.parents('.hottel').find('.input-group.tel1').removeClass("has-error has-feedback")
	        }
	    }
	})


	$('input.form-control.support_hotline1').blur(function () {
	    if($('button.numtype').eq(1).hasClass('btn-success'))
	    {
	        var _self = $(this)
	        if(!_self.val())
	        {
	            // _self.parent().addClass("has-error")
	            _self.parents('.hottel').find('.input-group.tel2').find('p.testing').text("*区号不能为空").show()
	            // _self.parents('.hottel').find('.input-group.tel2').addClass("has-error has-feedback")
	            // _self.parents('.hottel').find('.input-group.tel2').find('span').show()
	        }
	        else if(!(/\d{3,4}-?\d{3,8}$/.test(_self.val()+"-"+_self.parents('.hottel').find('.support_hotline2').val())))
	        {
	            // _self.parent().addClass("has-error")
	            _self.parents('.hottel').find('.input-group.tel2').find('p.testing').text('*咨询电话格式有误').show()
	            // _self.parents('.hottel').find('.input-group.tel2').addClass("has-error has-feedback")
	            // _self.parents('.hottel').find('.input-group.tel2').find('span').show()
	        }
	        else
	        {
	            // _self.parent().removeClass("has-error")
	            _self.parents('.hottel').find('.input-group.tel2').find('p.testing').hide()
	            // _self.parents('.hottel').find('.input-group.tel2').removeClass("has-error has-feedback")
	            // _self.parents('.hottel').find('.input-group.tel2').find('span').hide()
	        }
	    }
	})



	var testingtimes = function () {

	    if(!($('input.form-control.ins').val()&&$('input.form-control.ine').val()))
	    {
	        $('p.testing.times').text("*营业时间不能为空").show()
	    }
	    else
	    {
	        $('p.testing.times').hide()
	    }


	    if(starttime >= endtime)
	    {
	        $('p.testing.times').text("*结束时间不能早于开始时间").show()
	    }
	}



	$('button.numtype').click(function () {
	    var _self = $(this)
	    _self.removeClass('btn-default').addClass('btn-success')
	    _self.siblings().removeClass('btn-success').addClass('btn-default')
	    if(_self.index()==0)
	    {
	        if(!(/^1[0-9]{10}$/.test(_self.parents('li.hotline').find('.support_hotline').val())))
	        {
	            $('.hotmob').find('p.testing').show()
	        }
	        $('.hotmob').show()
	        $('.hottel').hide().find('p.testing').hide()

	    }
	    else
	    {
	        if(!(/\d{3,4}-?\d{3,8}$/.test(_self.parents('li.hotline').find('.support_hotline1').val()+_self.parents('li.hotline').find('.support_hotline2').val())))
	        {
	            $('.hottel').find('p.testing').show()
	        }
	        $('.hottel').show()
	        $('.hotmob').hide().find('p.testing').hide()
	    }
	})



	console.log($('li.hotline').attr('data-wlx-phonum'))

	if($('li.hotline').attr('data-wlx-phonum').substring(0,1)=='1')
	{
	    $('button.numtype').eq(0).click();
	    $('input.form-control.support_hotline').val($('li.hotline').attr('data-wlx-phonum'))
	    $('input.form-control.support_hotline').blur()
	}
	else
	{
	    $('button.numtype').eq(1).click();
	    var arr = ($('li.hotline').attr('data-wlx-phonum').split("-"))
	    $('input.support_hotline1').val(arr[0])
	    $('input.support_hotline2').val(arr[1])
	    $('input.form-control.support_hotline2').blur()
	}




	var getReq = function (url,callback) {

	    var req = $.ajax({
	        url: url,
	        type: "GET",
	        headers: {
	            "Accept": "application/json"
	        },
	        dataType:'json',
	        contentType: "application/json;charset=utf-8",
	        error: function (jqXHR, textStatus, errorThrown) {
	            req = null;
	            console.log(errorThrown);
	        },
	        success: function (data, textStatus, jqXHR) {
	            req = null;
	            callback(data);
	        }
	    })
	}




	$('#change-school-info').click(function () {
	    var newData = JSON.stringify({
	        "title":$(".form-control").eq(0).val(),
	        "image_urls":[$('img.image_url').attr('ali')],
	        "contract_urls":zulinimgs,
	        "license_urls":congshuimgs,
	        "contact":$(".form-control").eq(1).val(),
	        "mobile":$(".form-control").eq(2).val(),
	        "address":$(".form-control").eq(6).val(),
	        "decoration_date":jsondata.decoration_date,
	        "province_code":$(".form-control").eq(3).val(),
	        "city_code":$(".form-control").eq(4).val(),
	        "region_code":$(".form-control").eq(5).val(),
	        "start_time":starttime,
	        "end_time":endtime,
	        "support_hotline":$(".form-control.support_hotline").is(":hidden")?$(".form-control.support_hotline1").val()+"-"+$(".form-control.support_hotline2").val():$(".form-control.support_hotline").val()
	    });
	    console.log(newData);

	    $('input.form-control').blur()
	    testingtimes()

	    var isok = 1;

	    $('p.testing').each(function (index,ele) {
	        if(!$(ele).is(":hidden"))
	        {
	            isok = 0
	        }

	    })

	    if(!isok)
	    {
	        // alert('信息存在错误,请检查页面')
	    }
	    else {

	        $.ajax({
	            url: '/orgs/' + jsondata.org_id + '/schools/' + jsondata.school_id + '/',
	            type: 'PUT',
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",
	            data: newData,
	            error: function (status, error) {
	                console.log(error)
	                mizhu.upload("系统繁忙,请稍后再试!")
	            },
	            success: function (data, text) {
	                console.log(data.message);
	                if (data.code != 0) {
	                    mizhu.upload(data.message)
	                }
	                else {
	                    mizhu.upload("提交成功!")
	                    setTimeout(function () {
	                        $('.xx a').attr('href', "/orgs/" + data.data.org.id + "/schools/" + data.data.id + "/school_settings/")
	                        $('.xx a').get(0).click()
	                    },2000)
	                }
	            }
	        })
	    }
	})


	// var selectVal = new CitySelect({
	//     data   : data,
	//     provId : "#prov4",
	//     cityId : '#city4',
	//     areaId : '#area4'
	// });


/***/ }
/******/ ]);