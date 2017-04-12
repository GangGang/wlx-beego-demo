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
	 * Created by ganle on 17/1/9.
	 */

	var jsondata = JSON.parse($('.box').attr('jsondata'))
	console.log("接受到的json")
	console.log(jsondata)
	// var detailurl = jsondata.classSetting.course_detail_url;
	// var outlineurl = jsondata.classSetting.syllabus_url;
	// var queastionurl = jsondata.classSetting.faq_url;
	var detailurl = [];
	var outlineurl = [];
	var queastionurl = [];

	var detailclone = $('.ban.drag.forclone').eq(0)
	// var outlineclone = $('.tabcou .ban').eq(0)
	// var queastionclone = $('.tabque .ban').eq(0)

	var psize = function(){
	    $('.box').height($('.container_ban').height()+150)
	}


	$('p.fir').text("首次发布: "+new Date($('p.fir').attr('create') *1).toLocaleDateString() +" "+new Date($('p.fir').attr('create') *1).toLocaleTimeString())

	$('p.new').text("最近修改: "+new Date($('p.new').attr('last') *1).toLocaleDateString() +" "+new Date($('p.new').attr('last') *1).toLocaleTimeString())

	$('p.new').text("最近发布: "+new Date($('p.new').attr('last') *1).toLocaleDateString() +" "+new Date($('p.new').attr('last') *1).toLocaleTimeString())





	var setting = function () {

	    $('input.uploadimg').change(function (e) {
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
	            $(_self).parent().find('img.loading').show()

	            uploadimg.upfile(file,function (err) {
	                console.log(err)
	                $('img.loading').hide()
	                mizhu.upload('上传失败')
	                $(_self).val(null)
	            },function (storeAs) {
	                sib.attr('src',window.URL.createObjectURL(file));
	                $(_self).siblings('img.double').attr('ali_src',storeAs)
	                $('img.loading').hide()
	                $(_self).val(null)
	            });
	        }

	    });

	    $('img.delete').click(function () {
	        $(this).parents('.ban').remove()
	        psize()
	    })
	    psize()

	}

	setting()
	psize()
	for(var a in detailurl)
	{
	    $('.tabdes .ban:last').find('input').attr('id','updes' + $('.tabdes .ban:last').index())
	    $('.tabdes .ban:last').find('label').attr('for','updes' + $('.tabdes .ban:last').index())
	}

	for(var b in outlineurl)
	{
	    $('.tabpho .ban:last').find('input').attr('id','upcou' + $('.tabpho .ban:last').index())
	    $('.tabpho .ban:last').find('label').attr('for','upcou' + $('.tabpho .ban:last').index())
	}

	for(var b in queastionurl)
	{
	    $('.tabpho .ban:last').find('input').attr('id','upque' + $('.tabpho .ban:last').index())
	    $('.tabpho .ban:last').find('label').attr('for','upque' + $('.tabpho .ban:last').index())
	}

	$('input#sadd').change(function (e) {

	    var _self = this;
	    var file = e.target.files[0];
	    if(file)
	    {

	        // var sib = $(_self).siblings('img.double')
	        if(uploadimg.imgfiletesting(file))
	        {
	            // sib.attr('src',window.URL.createObjectURL(file));
	            addPhoto(window.URL.createObjectURL(file),file)
	        }
	        else
	        {
	            mizhu.upload("文件格式不支持")
	            return
	        }
	        // $(_self).parent().find('img.loading').show()
	        //
	        // uploadimg.upfile(file,function (err) {
	        //     console.log(err)
	        // },function (storeAs) {
	        //     $(_self).siblings('img.double').attr('ali_src',storeAs)
	        //     $('img.loading').hide()
	        // });
	    }

	})

	$('button.selectadd').click(function () {

	    $('input#sadd').click()

	    // if($('.tabdes').css('display') == 'block')
	    // {
	    //     detailclone.clone().appendTo("#targetdes");
	    //     $('.tabdes .ban:last').find('input').attr('id','updes' + $('.tabdes .ban:last').index())
	    //     $('.tabdes .ban:last').find('label').attr('for','updes' + $('.tabdes .ban:last').index())
	    //     $('.tabdes .ban:last').find('img.double').attr('src',jsondata.cdnUrl+'/static/images/addpictures.png')
	    //     setting()
	    // }
	    // else if($('.tabcou').css('display') == 'block')
	    // {
	    //     outlineclone.clone().appendTo("#targetcou");
	    //     $('.tabcou .ban:last').find('input').attr('id','upcou' + $('.tabcou .ban:last').index())
	    //     $('.tabcou .ban:last').find('label').attr('for','upcou' + $('.tabcou .ban:last').index())
	    //     $('.tabcou .ban:last').find('img.double').attr('src',jsondata.cdnUrl+'/static/images/addpictures.png')
	    //     setting()
	    // }
	    // else if($('.tabque').css('display') == 'block')
	    // {
	    //     queastionclone.clone().appendTo("#targetque");
	    //     $('.tabque .ban:last').find('input').attr('id','upque' + $('.tabque .ban:last').index())
	    //     $('.tabque .ban:last').find('label').attr('for','upque' + $('.tabque .ban:last').index())
	    //     $('.tabque .ban:last').find('img.double').attr('src',jsondata.cdnUrl+'/static/images/addpictures.png')
	    //     setting()
	    // }
	})


	function addPhoto(src,file) {
	    if($('.tabdes').css('display') == 'block')
	    {
	        detailclone.clone().appendTo("#targetdes");
	        var sib = $('.tabdes .ban:last');
	        sib.find('input').attr('id','updes' + $('.tabdes .ban:last').index())
	        sib.find('label').attr('for','updes' + $('.tabdes .ban:last').index())
	        
	        sib.find('img.double').addClass('des')
	        sib.css("display","block")
	        setting()
	        sib.find('img.loading').show()
	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	            sib.find('img.loading').hide()
	            sib.remove();
	            mizhu.upload('上传失败')
	            $('input#sadd').val(null)
	        },function (storeAs) {
	            sib.find('img.double').attr('src',src)
	            sib.find('img.double').attr('ali_src',storeAs)
	            sib.find('img.loading').hide()
	            $('input#sadd').val(null)
	        });
	    }
	    else if($('.tabcou').css('display') == 'block')
	    {
	        detailclone.clone().appendTo("#targetcou");
	        var sib = $('.tabcou .ban:last');
	        sib.find('input').attr('id','upcou' + $('.tabcou .ban:last').index())
	        sib.find('label').attr('for','upcou' + $('.tabcou .ban:last').index())
	        
	        sib.find('img.double').addClass('cou')
	        sib.css("display","block")
	        setting()
	        sib.find('img.loading').show()
	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	            sib.find('img.loading').hide()
	            sib.remove();
	            mizhu.upload('上传失败')
	            $('input#sadd').val(null)
	        },function (storeAs) {
	            sib.find('img.double').attr('src',src)
	            sib.find('img.double').attr('ali_src',storeAs)
	            sib.find('img.loading').hide()
	            $('input#sadd').val(null)
	        });
	    }
	    else if($('.tabque').css('display') == 'block')
	    {
	        detailclone.clone().appendTo("#targetque");
	        var sib = $('.tabque .ban:last');
	        sib.find('input').attr('id','upque' + $('.tabque .ban:last').index())
	        sib.find('label').attr('for','upque' + $('.tabque .ban:last').index())
	        
	        sib.find('img.double').addClass('que')
	        sib.css("display","block")
	        setting()
	        sib.find('img.loading').show()
	        uploadimg.upfile(file,function (err) {
	            sib.find('img.loading').hide()
	            sib.remove();
	            mizhu.upload('上传失败')
	            console.log(err)
	            $('input#sadd').val(null)
	        },function (storeAs) {
	            sib.find('img.double').attr('src',src)
	            sib.find('img.double').attr('ali_src',storeAs)
	            sib.find('img.loading').hide()
	            $('input#sadd').val(null)
	        });
	    }
	}


	$("ul.title li.org").click(function () {
	    $(this).css({"background-color":"#ffffff","color":"#333333","border-bottom":"3px solid #333333"}).siblings().css({"background-color":"#e0e1e7","color":"#aaaaaa","border":"none"});
	    $(".tabdes").css("display","block");
	    $(".tabcou").css("display","none");
	    $(".tabque").css("display","none");
	    psize()
	});
	$("ul.title li.cou").click(function () {
	    $(this).css({"background-color":"#ffffff","color":"#333333","border-bottom":"3px solid #333333"}).siblings().css({"background-color":"#e0e1e7","color":"#aaaaaa","border":"none"});
	    $(".tabdes").css("display","none");
	    $(".tabcou").css("display","block");
	    $(".tabque").css("display","none");
	    psize()
	});
	$("ul.title li.tea").click(function () {
	    $(this).css({"background-color":"#ffffff","color":"#333333","border-bottom":"3px solid #333333"}).siblings().css({"background-color":"#e0e1e7","color":"#aaaaaa","border":"none"});
	    $(".tabdes").css("display","none");
	    $(".tabcou").css("display","none");
	    $(".tabque").css("display","block");
	    psize()
	});




	$(function  () {
	    $(targetdes).dargFlex('drag');
	});

	$(function  () {
	    $(targetcou).dargFlex('drag');
	});

	$(function  () {
	    $(targetque).dargFlex('drag');
	});

	$('button.touse').click(function () {
	    console.log("保存")
	    inputorgdata("SAVING");
	});


	$('button.rel').click(function () {
	    console.log("上传")
	    inputorgdata("RELEASE");
	});



	if(jsondata.category == 1)
	{
	    $("ul.title li.org").click()
	}
	else if(jsondata.category == 2)
	{
	    $("ul.title li.cou").click()
	}
	else if(jsondata.category == 3)
	{
	    $("ul.title li.tea").click()
	}





	var inputorgdata = function (isrelease) {

	    clear()


	    $('img.des').each(function (index,ele) {
	        var data_index = $(ele).attr('ali_src')
	        if(data_index)
	        {
	            detailurl.push(data_index);
	        }
	    })
	    $('img.cou').each(function (index,ele) {
	        var data_index = $(ele).attr('ali_src')
	        if(data_index)
	        {
	            outlineurl.push(data_index);
	        }
	    })
	    $('img.que').each(function (index,ele) {
	        var data_index = $(ele).attr('ali_src')
	        if(data_index)
	        {
	            queastionurl.push(data_index);
	        }
	    })

	        var newData = JSON.stringify({

	            "course_detail_url": detailurl,
	            "syllabus_url": outlineurl,
	            "faq_url": queastionurl,
	            "status":isrelease
	        });
	    console.log(newData);

	    var isloading = 1
	    $('img.loading').each(function (index,ele) {
	        if(!$(ele).is(":hidden"))
	        {
	            mizhu.upload("请等待图片或视频上传完毕")
	            isloading = 0
	            return
	        }
	    })

	    if(!isloading)
	    return

	        $.ajax({
	            url: '/orgs/'+jsondata.org_id+'/schools/'+jsondata.school_id+'/courses/'+jsondata.classSetting.clazz.id+'/setting/',
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
	                    mizhu.upload("提交成功!")///orgs/1/schools/1/classes/2/setting/?category=1
	                    $('a.jump').attr('href',"/orgs/"+jsondata.org_id+"/schools/"+jsondata.school_id+"/courses/"+jsondata.classSetting.clazz.id+"/setting/?category="+jsondata.category)
	                    $('a.jump').get(0).click()
	                }
	            }
	        });
	   }

	var clear = function () {
	     detailurl.splice(0,detailurl.length);
	     outlineurl.splice(0,outlineurl.length)
	     queastionurl.splice(0,queastionurl.length)
	}

/***/ }
/******/ ]);