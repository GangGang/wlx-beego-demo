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
	 * Created by ganle on 16/12/21.
	 */
	// var array = require("./chosse_teacher.js");


	var isnotadd = 0;//是不是非add节点
	var lastone;//上一次点击的节点

	var orgbanurls = [];//机构banner图片的url
	var orgbantitles = [];//机构banner图片的标题
	var orgbanlinks = [];//机构banner图片的跳转链接

	var envbanurls = [];//教学环境banner图片url

	var chooseteas = [];//推荐老师
	var choosecous = [];//推荐课程

	var tabcoubanurl = $('.tabcou.like').find('img.double').attr('src');//校区banner
	var tabteabanurl = $('.tabtea.like').find('img.double').attr('src');//教师banner

	var array = [];
	var array_c = []

	// var uploadimg = ;

	var imgfile;//图片文件

	function lastupimg(imgfile,lastname,age,eyecolor)
	{
	    this.firstname=firstname;
	    this.lastname=lastname;
	    this.age=age;
	    this.eyecolor=eyecolor;
	}


	var lastone_tea; //上一次点击的节点(推荐教师)
	var lastone_cou; //上一次点击的节点(推荐教师)
	var current_data = []
	var current_data_c =[]

	var teaArr = [];

	var teaArr_c = [];



	$('p.createmodi').text("首次发布: "+new Date($('p.createmodi').attr('wlx-date') *1).toLocaleDateString() +" "+new Date($('p.createmodi').attr('wlx-date') *1).toLocaleTimeString())

	$('p.lastmodi').text("最近保存: "+new Date($('p.lastmodi').attr('wlx-date') *1).toLocaleDateString() +" "+new Date($('p.lastmodi').attr('wlx-date') *1).toLocaleTimeString())

	$('p.lastrele').text("最近发布: "+new Date($('p.lastmodi').attr('wlx-date') *1).toLocaleDateString() +" "+new Date($('p.lastmodi').attr('wlx-date') *1).toLocaleTimeString())

	document.body.onclick= function () {
	    $("#selectti").hide();
	    $("#selecttie").hide();
	};


	// $('textarea').get().onpropertychange = function () {
	//
	//     var substr =  $('textarea').val()
	//     if(substr.length>10)
	//     {
	//         $('textarea').val(substr(0,10))
	//     }
	// }

	$('textarea').get(0).oninput = function () {
	    var substr =  $('textarea').eq(0).val()
	    console.log(substr)
	    if(substr.length>60)
	    {
	        $('textarea').eq(0).val(substr.substr(0,60))
	    }
	}


	$('textarea').get(1).oninput = function () {
	    var substr =  $('textarea').eq(1).val()
	    console.log(substr)
	    if(substr.length>60)
	    {
	        $('textarea').eq(1).val(substr.substr(0,60))
	    }
	}


	$('input').bind('input propertychange',function () {
	    var substr = $(this).val()
	    if(substr.length>30)
	    {
	        $(this).val(substr.substr(0,30))
	    }
	})



	$('#uporgban').on('hidden.bs.modal', function () {
	    $('#uploadorgban').val(null)
	})



	$('#uploadorgban').change(function (e) {
	    var _self = this;
	    imgfile = e.target.files[0];
	    if(imgfile)
	    {
	        if(uploadimg.imgfiletesting(imgfile))
	        {
	            $(_self).siblings(0).attr('src',window.URL.createObjectURL(imgfile));
	        }
	        else
	        {
	            mizhu.upload("文件格式不支持")
	            return
	        }
	    }
	});

	$('#uploadcub1').change(function (e) {
	    var _self = this;
	    var file = e.target.files[0];
	    if(file)
	    {
	        if(uploadimg.imgfiletesting(file))
	        {

	            $('.upbox').css('pointer-events','none')
	        }
	        else
	        {
	            mizhu.upload("文件格式不支持")
	            return
	        }
	        $(_self).parent().find('img.loading').show()

	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	            $(_self).val(null)
	            $('.upbox').css('pointer-events','auto')
	            mizhu.upload('上传失败')
	        },function (storeAs) {
	            $(_self).parent().find('img.loading').hide()
	            $(_self).siblings('img.double').attr('src',window.URL.createObjectURL(file));
	            $(_self).val(null)
	            tabcoubanurl = storeAs;
	            $('.upbox').css('pointer-events','auto')
	        });
	    }
	});

	$('#uploadteab').change(function (e) {
	    var _self = this;
	    var file = e.target.files[0];
	    if(file)
	    {
	        if(uploadimg.imgfiletesting(file))
	        {

	            $('.upbox').css('pointer-events','none')
	        }
	        else
	        {
	            mizhu.upload("文件格式不支持")
	            return
	        }
	        $(_self).parent().find('img.loading').show()

	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	            $(_self).val(null)
	            $(_self).parent().find('img.loading').hide()
	            $('.upbox').css('pointer-events','auto')
	            mizhu.upload('上传失败')
	        },function (storeAs) {
	            $(_self).siblings('img.double').attr('src',window.URL.createObjectURL(file));
	            $(_self).parent().find('img.loading').hide()
	            $(_self).val(null)
	            tabteabanurl = storeAs;
	            $('.upbox').css('pointer-events','auto')
	        });
	    }
	});





	$("ul.title li.org").click(function () {
	    $(this).css({"background-color":"#ffffff","border-bottom":"2px solid #373e4a","color":"#333333"}).siblings().css({"background-color":"#e0e1e7","border-bottom":"none","color":"#aaaaaa"});
	    $(".taborg").css("display","block");
	    $(".tabcou").css("display","none");
	    $(".tabtea").css("display","none");
	});
	$("ul.title li.cou").click(function () {
	    $(this).css({"background-color":"#ffffff","border-bottom":"2px solid #373e4a","color":"#333333"}).siblings().css({"background-color":"#e0e1e7","border-bottom":"none","color":"#aaaaaa"});
	    $(".taborg").css("display","none");
	    $(".tabcou").css("display","block");
	    $(".tabtea").css("display","none");
	});
	$("ul.title li.tea").click(function () {
	    $(this).css({"background-color":"#ffffff","border-bottom":"2px solid #373e4a","color":"#333333"}).siblings().css({"background-color":"#e0e1e7","border-bottom":"none","color":"#aaaaaa"});
	    $(".taborg").css("display","none");
	    $(".tabcou").css("display","none");
	    $(".tabtea").css("display","block");
	});


	if($('.box').attr('category') == 1)
	{
	    $("ul.title li.org").click()
	}
	else if($('.box').attr('category') == 2)
	{
	    $("ul.title li.cou").click()
	}
	else if($('.box').attr('category') == 3)
	{
	    $("ul.title li.tea").click()
	}


	$(".taborg .add").click(function () {

	    lastone = $(this);
	    isnotadd = 0;
	    $("#uporgban img").attr("src",$(this).children("img").eq(0).attr('src'));
	    $("#orgbantit").val("");
	    $("#orgbanlin").val("");

	});



	$(".newban").find('.delete').click(function (e) {
	    e.stopPropagation();
	    $(this).parents('.newban').remove();
	    bannerstesting()
	});

	$(".newenv").find('.delete').click(function (e) {
	    e.stopPropagation();
	    $(this).parents('.newenv').remove();
	    envsetting()
	});


	function newbanClick() {
	    $(".newban").click(function () {
	        lastone = $(this);
	        isnotadd = 1;
	        $("#uporgban img").attr("src",lastone.children('img.double').attr('src'));
	        $("#orgbantit").val(lastone.attr("data-wlx-ban-title"));
	        $("#orgbanlin").val(lastone.attr("data-wlx-ban-link"));
	    });
	}

	newbanClick()

	$(".newban").hover(function () {
	    $(this).children(".blackhover").show();
	},function () {
	    $(this).children(".blackhover").hide();
	});

	$(".newenv").hover(function () {
	    $(this).children(".blackhover").show();
	},function () {
	    $(this).children(".blackhover").hide();
	});



	$("#uporgban .savem").click(function () {

	    if((/^((http|https):\/\/)/.test($('#orgbanlin').val())) || !$('#orgbanlin').val())
	    {

	        var text1 =  $("#orgbantit").val();
	        var  text2 =  $("#orgbanlin").val();
	        if(isnotadd == 0 && $("#uporgban img").attr("src")!=lastone.children('img').eq(0).attr('src'))
	        {

	            $("<div class='newban upbox' data-toggle='modal' data-target='#uporgban' style='display: inline-block;position: relative;width: 345px;height: 99px;margin: 0 15px 15px 0'><img class='loading' src='/static/images/loading2.gif' ><img class='double mainban' src='#' ><div class='blackhover' style='display: none; background-color: rgba(0, 0, 0, 0.27);position: absolute;top: 0;left: 0;width: 100%;height: 100%'><div class='delete' style='color:white;background-color: rgba(0, 0, 0, 0.42);width: 25px;height: 25px;position: absolute;top: 0;right: 0;text-align: center;font-size: 18px;cursor: pointer'>×</div></div></div>").insertBefore(lastone);
	            lastone.prev().children('img.double').attr('src', $("#uporgban img").attr('src'));

	            //上传图片

	            lastone.prev().find('img.loading').show()
	            $('.upbox').css('pointer-events','none')

	            uploadimg.upfile(imgfile,function (err) {
	                console.log("失败上传阿里")
	                console.log(err)
	                lastone.prev().remove()
	                $('.upbox').css('pointer-events','auto')
	                mizhu.upload('上传失败')
	            },function (storeAs) {

	                $('img.loading').hide()

	                console.log("成功上传阿里")

	                $('#uploadorgban').val(null)
	                lastone.prev().attr("data-wlx-ban-url",storeAs);
	                lastone.prev().attr("data-wlx-ban-title",text1);
	                lastone.prev().attr("data-wlx-ban-link",text2);
	                $('.upbox').css('pointer-events','auto')
	            });

	            //添加删除事件
	            lastone.prev().find('.delete').click(function (e) {
	                e.stopPropagation();
	                $(this).parents('.newban').remove();
	                bannerstesting()
	            });
	            //hover
	            lastone.prev().hover(function () {
	                $(this).children(".blackhover").show();
	            },function () {
	                $(this).children(".blackhover").hide();
	            });
	            //图片点击事件
	            newbanClick()
	        }
	        else if(isnotadd == 1)//不是添加新的 是修改之前的
	        {
	            if($("#uporgban img").attr("src")!=lastone.children('img.double').attr('src'))
	            {


	                lastone.find('img.loading').show()
	                $('.upbox').css('pointer-events','auto')

	                uploadimg.upfile(imgfile,function (err) {
	                    console.log("失败上传阿里")
	                    // console.log(err)
	                    $('.upbox').css('pointer-events','auto')
	                    mizhu.upload('上传失败')
	                },function (storeAs) {

	                    console.log("成功上传阿里")
	                    lastone.children('img.double').attr("src",$("#uporgban img").attr("src"));
	                    $('img.loading').hide()
	                    $('#uploadorgban').val(null)
	                    $('.upbox').css('pointer-events','auto')
	                    lastone.attr("data-wlx-ban-url", storeAs);

	                });
	            }
	            lastone.attr("data-wlx-ban-title", text1);
	            lastone.attr("data-wlx-ban-link", text2);

	        }


	        $('#orgbantit').val("");
	        $('#orgbanlin').val("");

	        bannerstesting()
	        
	        $('button.savemodal').click()
	    }
	    else
	    {
	        mizhu.upload('必须以http://或https://开头')
	    }
	});



	function bannerstesting() {

	    if($('.newban').length>=5)
	    {
	       $('.add').hide()
	    }
	    else
	    {
	        $('.add').show()
	    }
	}


	function envsetting() {
	    if($('.newenv').length>=3)
	    {
	        $('.addenv').hide()
	    }
	    else
	    {
	        $('.addenv').show()
	    }
	}



	//TODO:教学环境


	function inputid() {
	    $('.newenv').each(function (index,ele) {
	        var _self = $(this)
	        _self.find('input').attr('id',_self.find('label').attr('for'))
	    })
	}

	inputid()

	$('#uploadenv').change(function (e) {
	    var _self = this;
	    var file = e.target.files[0];
	    if(file)
	    {
	        if(uploadimg.imgfiletesting(file))
	        {
	            $("<div class='newenv upbox' style='display: inline-block;position: relative;width: 235px;height: 127px;margin: 0 15px 15px 0'><img class='loading' src='/static/images/loading2.gif' style='width: 100%;height: 100%'><img class='double' src='#' style='width: 100%;height: 100%'><div class='blackhover' style='display: none; background-color: rgba(0, 0, 0, 0.27);position: absolute;top: 0;left: 0;width: 100%;height: 100%'><div class='delete' style='color:white;background-color: rgba(0, 0, 0, 0.42);width: 25px;height: 25px;position: absolute;top: 0;right: 0;text-align: center;font-size: 18px;cursor: pointer'>×</div></div><label style='width:235px;height:127px;display:block;position:absolute;top:0;left:0' for="+(parseInt($('.addenv').index())-1)+"></label><input class='changeenv' id="+(parseInt($('.addenv').index())-1)+" type='file' style='width:1px;height:1px;display:block;position:absolute;top:0;left:0;outline:none'></div>").insertBefore($('.addenv'));
	            $('.addenv').prev().children('img.double').attr('src',window.URL.createObjectURL(file));
	            $('.addenv').prev().children('img.loading').show()
	            envsetting()
	            $('.upbox').css('pointer-events','none')
	            $('.addenv').prev().hover(function () {
	                $(this).children(".blackhover").show();
	            },function () {
	                $(this).children(".blackhover").hide();
	            });
	            $('.addenv').prev().find('.delete').click(function (e) {
	                e.stopPropagation();
	                $(this).parents('.newenv').remove();
	                envsetting()
	            });
	        }
	        else
	        {
	            mizhu.upload("文件格式不支持")
	            return
	        }

	        uploadimg.upfile(file,function (err) {
	            console.log(err)
	            $(_self).val(null)
	            $('.addenv').prev().remove()
	            $('.upbox').css('pointer-events','auto')
	            mizhu.upload('上传失败')
	            // changeenv()
	            envsetting()
	        },function (storeAs) {
	            changeenv()
	            envsetting()
	            $('.newenv img.loading').hide()
	            $(_self).val(null)
	            $(_self).parent().prev().attr('data-wlx-envurl',storeAs)
	            $('.upbox').css('pointer-events','auto')
	        });
	    }
	});


	function changeenv() {
	    $('.changeenv').change(function (e) {
	        var _self = this;
	        var file = e.target.files[0];
	        if(file)
	        {
	            if(uploadimg.imgfiletesting(file))
	            {

	                $('.upbox').css('pointer-events','none')
	            }
	            else
	            {
	                mizhu.upload("文件格式不支持")
	                return
	            }
	            $(_self).parent().find('img.loading').show()

	            uploadimg.upfile(file,function (err) {
	                console.log(err)
	                $(_self).val(null)
	                $(_self).parent().find('img.loading').hide()
	                $('.upbox').css('pointer-events','auto')
	                mizhu.upload(上传失败)
	            },function (storeAs) {
	                $(_self).siblings('img.double').attr('src',window.URL.createObjectURL(file));
	                $(_self).parent().find('img.loading').hide()
	                $(_self).val(null)
	                $(_self).parent().attr('data-wlx-envurl',storeAs)
	                $('.upbox').css('pointer-events','auto')
	            });
	        }
	    })

	}

	changeenv()



	// TODO:选取推荐老师




	$(".on.adds").click(function () {
	    lastone_tea = $(this);
	    $('.teacher_item').removeClass('chosse_active')
	    if(current_data != undefined)
	    {
	        find_disable(current_data);
	    }
	});



	var teacherrender = function (data) {
	    console.log("这是老师的数据")
	    console.log(JSON.stringify(data))
	    current_data = data.data.content.teacher_list;
	    reload(current_data);
	    find_disable(current_data);
	    $('.teacher_item').removeClass('chosse_active')
	}



	for(var a in teaArr)
	{
	    $("<div class='on newt'><div class='imgt'><img src='#' style='width: 100%;height: 100%'><div class='blacktea'></div></div><p class='name'></p><p class='desc'></p><img class='delete' src='/static/images/deleterecommendation.png' /></div>").insertBefore($(".on.adds"));
	    $(".on.adds").prev().children('.imgt').children('img').eq(0).attr("src","../images/2.png");
	    $(".on.adds").prev().children('.name').text(teaArr[a].user_name);
	    $(".on.adds").prev().children('.desc').text(teaArr[a].teacher_desc);
	    $(".on.adds").prev().attr("tagflag",teaArr[a].teacher_user_id);
	    $(".newt").hover(function () {
	        $(this).find('.blacktea').show();
	        $(this).find('.delete').show()
	    },function () {
	        $(this).find('.blacktea').hide();
	        $(this).find('.delete').hide()
	    });
	    $(".on.adds").prev().find('.delete').click(function (e) {
	        // teaArr.splice($(this).parents('.newt').index());
	        for(var r = teaArr.length-1;r>=0;r--)
	        {
	            // console.log();
	            if(teaArr[r].teacher_user_id == $(this).parents('.newt').attr("tagflag"))
	            {
	                // console.log(teaArr[r].teacher_user_id);
	                teaArr.splice(r,1);
	                break;
	            }
	        }
	        $(this).parents('.newt').remove();

	    });
	}


	$(".newt").hover(function () {
	    $(this).find('.blacktea').show();
	    $(this).find('.delete').show()
	},function () {
	    $(this).find('.blacktea').hide();
	    $(this).find('.delete').hide()
	});
	$(".newt").find('.delete').click(function (e) {
	    // teaArr.splice($(this).parents('.newt').index());
	    for(var r = teaArr.length-1;r>=0;r--)
	    {

	        if(teaArr[r].teacher_user_id == $(this).parents('.newt').attr("tagflag"))
	        {
	            teaArr.splice(r,1);
	            break;
	        }
	    }
	    $(this).parents('.newt').remove();

	});





	//选择老师弹框

	var reload = function (data) {
	    // $('.teacher_item').remove();
	    $('#carousel-teacher .aaaabox').empty();
	    var  data_count = data.length

	    if (data_count <= 4)
	    {
	        $('#carousel-teacher .aaaabox').append('<div id="'+1+'" class="item cell active"></div>')
	    }
	    if (data_count > 4)
	    {
	        var page_count = Math.ceil(data_count/4)

	        for (var k = 1;k<=page_count;k++)
	        {
	            if(k == 1)
	            {
	                $('#carousel-teacher .aaaabox').append('<div id="'+k+'" class="item cell1 active"></div>')
	            }
	            if (k>1)
	            {
	                $('#carousel-teacher .aaaabox').append('<div id="'+k+'" class="item cell2"></div>')
	            }
	        }
	    }


	    //添加cell

	    // $('.item').empty()

	    //添加子元素
	    if (data_count <= 4)
	    {
	        for (var j=0;j<data_count;j++)
	        {
	            $('#teacher_alert #1').append('<div class="teacher_item" tag_flag = '+j+'><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')
	        }
	    }
	    if (data_count > 4)
	    {
	        var page_count = Math.ceil(data_count/4)
	        for (var k = 1;k<=page_count;k++)
	        {
	            if (k<page_count)
	            {
	                for (var x = 0; x<4;x++)
	                {
	                    var j = (k-1)*4+x
	                    console.log("我添加了"+j);

	                    $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag = "'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')
	                }
	            }
	            if (k==page_count)
	            {
	                var last_count = data_count%4
	                if (last_count==0)
	                {
	                    for (var x = 0; x<4;x++)
	                    {
	                        var j = (k-1)*4+x
	                        console.log("我添加了"+j);
	                        $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag ="'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')
	                    }
	                }
	                else
	                {
	                    for (var x = 0;x<last_count;x++)
	                    {
	                        var j = (k-1)*4+x
	                        console.log("我添加了lelle"+j);
	                        $('#teacher_alert #'+k+'').append('<div class="teacher_item" tag_flag = "'+j+'"><div class="teacher_box"><img class="teacher_img" src='+data[j].avatart_url+' /><div class="course_name">'+data[j].user_name+'</div><div class="course_desc">'+data[j].intro+'</div></div></div>')

	                    }
	                }
	            }
	        }
	    }

	    $('.teacher_item').click(function () {


	        if ($(this).children(".add_img").length>0)
	        {
	            $(this).children(".add_img").remove()
	            $(this).removeClass('chosse_active')
	        }
	        else
	        {
	            // var flag = $(this).attr('tag_flag')
	            // alert(flag)
	            $(this).append('<img src="/static/images/select.png" class="add_img">')
	            $(this).addClass('chosse_active')
	            //添加元素
	        }

	    })

	}


	$('.sure').click(function () {
	    $('.chosse_active').each(function (index,ele) {

	        // console.log('节点'+$(ele))
	        var data_index = $(ele).attr('tag_flag')
	        array.push(data_index);
	        // console.log(array)
	    })

	    // console.log(current_data)


	    for(var y=0 ;y<array.length;y++)
	    {
	        teaArr.push(current_data[array[y]]);
	    }
	    
	    for(var a in array)
	    {
	        $("<div class='on newt'><div class='imgt'><img src='#' style='width: 100%;height: 100%'><div class='blacktea'></div></div><p class='name'></p><p class='desc'></p><img class='delete' src='/static/images/deleterecommendation.png' /></div>").insertBefore(lastone_tea);
	        lastone_tea.prev().children('.imgt').children('img').eq(0).attr("src",current_data[array[a]].avatart_url);
	        lastone_tea.prev().children('.name').text(current_data[array[a]].user_name);
	        lastone_tea.prev().children('.desc').text(current_data[array[a]].intro);
	        lastone_tea.prev().attr("tagflag",current_data[array[a]].teacher_user_id);
	        $(".newt").hover(function () {
	            $(this).find('.blacktea').show();
	            $(this).find('.delete').show()
	        },function () {
	            $(this).find('.blacktea').hide();
	            $(this).find('.delete').hide()
	        });
	        lastone_tea.prev().find('.delete').click(function (e) {
	            // teaArr.splice($(this).parents('.newt').attr("tagflag"));
	            for(var r = teaArr.length-1;r>=0;r--)
	            {
	                // console.log();
	                if(teaArr[r].teacher_user_id == $(this).parents('.newt').attr("tagflag"))
	                {
	                    // console.log(teaArr[r].teacher_user_id);
	                    teaArr.splice(r,1);
	                    break;
	                }
	            }
	            $(this).parents('.newt').remove();

	        });
	    }

	    array.splice(0,array.length);

	})



	$('#teacher_alert .all').addClass('select_active');
	// reload(current_data);

	$('#teacher_alert .carousel').carousel({
	    interval: 0
	})



	$('#teacher_alert .chosse_click_btn').click(function () {
	    var _self = $(this)
	    getReq("/orgs/"+$('.box.officialset').attr('orgid')+"/teachers/?type="+_self.attr("skill-type"),teacherrender);
	    $('#teacher_alert .chosse_click_btn').removeClass('select_active')
	    _self.addClass('select_active')
	    $('input.searchtea').val('')
	})


	$('#teacher_alert button.searchtea').click(function () {
	    var type = $(".select_active").attr('skill-type')
	    getReq("/orgs/"+$('.box.officialset').attr('orgid')+"/teachers/?search="+$('input.searchtea').val()+"&type="+type,teacherrender);
	})


	var find_disable = function (data) {

	    for(var y in array)
	    {
	        for(var obj in data)
	        {
	            if(data[obj].teacher_user_id == array[y])
	            {
	                teaArr.push(data[obj]);
	            }
	        }

	    }
	    array.splice(0,array.length);


	    $('#teacher_alert .add_img').detach();
	    $('#teacher_alert .teacher_item').find('.disabled').detach();
	    $('#teacher_alert .teacher_item').css("pointer-events","auto");


	    for(var i = 0;i<data.length;i++)
	    {
	        // var tage_index = active_index*4+i
	        var obj = data[i];

	        for (var j= 0;  j<teaArr.length;j++)
	        {
	            if (teaArr[j].teacher_user_id == obj.teacher_user_id)
	            {
	                $('#teacher_alert .teacher_item').eq(i).append('<div class="disabled" style="background-color: rgba(255, 255, 255, 0.8);height: 100%;width: 100%"></div>')
	                $('#teacher_alert .teacher_item').eq(i).css("pointer-events","none");
	                $('#teacher_alert .teacher_item').eq(i).append('<img src="/static/images/select.png" class="add_img">')
	                $('#teacher_alert .teacher_item').eq(i).addClass('chosse_active1');
	                break;
	            }

	        }
	    }
	}



	$('.secbtn').click(function () {
	    $(this).parent().find('label').eq(0).click()
	})




	//TODO:GET请求

	var getReq = function (url,callback) {

	    var req = $.ajax({
	        url: url,
	        type: "GET",
	        dataType:'json',
	        contentType: "application/json;charset=utf-8",
	        headers: {
	            "Accept": "application/json"
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            req = null;
	            console.log(jqXHR);
	        },
	        success: function (data, textStatus, jqXHR) {
	            req = null;
	            callback(data);
	        }
	    })
	}



	//TODO:选取推荐课程


	var classrender = function (data) {
	    console.log(data)
	    current_data_c = data.data.course_list;
	    if(current_data_c != undefined)
	    {
	        reload_c(current_data_c);
	        find_disable_c(current_data_c);
	    }
	    $('#course_alert .course_item').removeClass('chosse_active_c');
	}





	$(".on.addc").click(function () {
	    lastone_cou = $(this);
	    $('.course_item').removeClass('chosse_active_c');
	    if(current_data_c!=undefined)
	    {
	        find_disable_c(current_data_c);
	    }
	});



	for(var a in teaArr_c)
	{
	    $("<div class='on newc'><div class='imgc'><img src='#' style='width: 100%;height: 100%'><div class='blacktea' style='background-color: rgba(0, 0, 0, 0.3);position: absolute;display: none;top: 0;width: 180px;height: 100px;left: 50%;margin-left: -90px'><div class='delete' style='color:white;background-color: rgba(0, 0, 0, 0.42);width: 25px;height: 25px;position: absolute;top: 0;right: 0;text-align: center;font-size: 18px;cursor: pointer'>×</div></div></div><p class='name'></p><p class='desc'></p></div>").insertBefore($(".on.addc"));
	    $(".on.addc").prev().children('.imgc').children('img').eq(0).attr("src",teaArr_c[a].image_url);
	    $(".on.addc").prev().children('.name').text(teaArr_c[a].name);
	    $(".on.addc").prev().children('.desc').text(teaArr_c[a].title);
	    $(".on.addc").prev().attr("tagflag",teaArr_c[a].id);
	    $(".newc .imgc").hover(function () {
	        $(this).children('.blacktea').show();
	    },function () {
	        $(this).children('.blacktea').hide();
	    });
	    $(".on.addc").prev().find('.delete').click(function (e) {
	        // teaArr.splice($(this).parents('.newt').index());
	        for(var r = teaArr_c.length-1;r>=0;r--)
	        {
	            // console.log();
	            if(teaArr_c[r].id == $(this).parents('.newc').attr("tagflag"))
	            {
	                console.log(teaArr_c[r].id);
	                teaArr_c.splice(r,1);
	                break;
	            }
	        }

	    });
	}




	$(".newc .imgc").hover(function () {
	    $(this).children('.blacktea').show();
	},function () {
	    $(this).children('.blacktea').hide();
	});
	$(".newc").find('.delete').click(function (e) {
	    // teaArr.splice($(this).parents('.newt').attr("tagflag"));
	    for (var r = teaArr_c.length - 1; r >= 0; r--) {

	        if (teaArr_c[r].id == $(this).parents('.newc').attr("tagflag")) {
	            teaArr_c.splice(r, 1);
	            break;
	        }
	    }
	    $(this).parents('.newc').remove();
	})





	var reload_c = function (data) {
	    $('#carousel-course .aaaabox').empty()
	    var  data_count = data.length

	    if (data_count <= 4)
	    {
	        console.log('0')
	        $('#carousel-course .aaaabox').append('<div id="'+1001+'" class="item cell active"></div>')

	    }
	    if (data_count > 4)
	    {
	        console.log("大于4")
	        var page_count = Math.ceil(data_count/4)

	        for (var k = 1001;k<=page_count+1000;k++)
	        {
	            if(k == 1001)
	            {
	                $('#carousel-course .aaaabox').append('<div id="'+k+'" class="item cell1 active"></div>')
	            }
	            if (k>1001)
	            {
	                $('#carousel-course .aaaabox').append('<div id="'+k+'" class="item cell2"></div>')
	            }
	        }

	    }


	    //添加cell

	    // $('.item').empty()

	    //添加子元素
	    if (data_count <= 4)
	    {
	        for (var j=0;j<data_count;j++)
	        {
	            $('#course_alert #1001').append('<div class="course_item" tag_flag = '+j+'><div class="course_box"><img class="course_img" src='+data[j].image_url+' /><div class="course_name">'+data[j].name+'</div><div class="course_desc">'+data[j].title+'</div></div></div>')
	        }
	    }
	    if (data_count > 4)
	    {
	        var page_count = Math.ceil(data_count/4)+1000
	        for (var k = 1001;k<=page_count;k++)
	        {
	            if (k<page_count)
	            {
	                for (var x = 0; x<4;x++)
	                {
	                    var j = (k-1000-1)*4+x

	                    $('#course_alert #'+k+'').append('<div class="course_item" tag_flag = "'+j+'"><div class="course_box"><img class="course_img" src='+data[j].image_url+' /><div class="course_name">'+data[j].name+'</div><div class="course_desc">'+data[j].title+'</div></div></div>')
	                }
	            }
	            if (k==page_count)
	            {
	                var last_count = data_count%4
	                if (last_count==0)
	                {
	                    for (var x = 0; x<4;x++)
	                    {
	                        var j = (k-1000-1)*4+x

	                        $('#course_alert #'+k+'').append('<div class="course_item" tag_flag ="'+j+'"><div class="course_box"><img class="course_img" src='+data[j].image_url+' /><div class="course_name">'+data[j].name+'</div><div class="course_desc">'+data[j].title+'</div></div></div>')
	                    }
	                }
	                else
	                {
	                    for (var x = 0;x<last_count;x++)
	                    {
	                        var j = (k-1000-1)*4+x
	                        $('#course_alert #'+k+'').append('<div class="course_item" tag_flag = "'+j+'"><div class="course_box"><img class="course_img" src='+data[j].image_url+' /><div class="course_name">'+data[j].name+'</div><div class="course_desc">'+data[j].title+'</div></div></div>')

	                    }
	                }
	            }
	        }
	    }

	    $('#course_alert .course_item').click(function () {

	        if ($(this).children(".add_img_c").length>0)
	        {
	            $(this).children(".add_img_c").remove()
	            $(this).removeClass('chosse_active_c')
	        }
	        else
	        {
	            // var flag = $(this).attr('tag_flag')

	            $(this).append('<img src="/static/images/select.png" class="add_img_c">')
	            $(this).addClass('chosse_active_c')
	            //添加元素
	        }

	    })

	}



	$('.sure_c').click(function () {

	    // console.log($('course_item').children(".add_img_c").length)
	    $('.chosse_active_c').each(function (index,ele) {

	        // console.log('节点'+$(ele))
	        var data_index = $(ele).attr('tag_flag')
	        array_c.push(data_index)
	        // console.log(arcray_c)
	    })

	    for(var y=0 ;y<array_c.length;y++)
	    {
	        teaArr_c.push(current_data_c[array_c[y]]);
	    }


	    for(var a in array_c)
	    {
	        $("<div class='on newc'><div class='imgc'><img src='#' style='width: 100%;height: 100%'><div class='blacktea' style='background-color: rgba(0, 0, 0, 0.3);position: absolute;display: none;top: 0;width: 180px;height: 100px;left: 50%;margin-left: -90px'><div class='delete' style='color:white;background-color: rgba(0, 0, 0, 0.42);width: 25px;height: 25px;position: absolute;top: 0;right: 0;text-align: center;font-size: 18px;cursor: pointer'>×</div></div></div><p class='name'></p><p class='desc'></p></div>").insertBefore(lastone_cou);
	        lastone_cou.prev().children('.imgc').children('img').eq(0).attr("src",current_data_c[array_c[a]].image_url);
	        $(".on.addc").prev().children('.name').text(current_data_c[array_c[a]].name);
	        $(".on.addc").prev().children('.desc').text(current_data_c[array_c[a]].title);
	        lastone_cou.prev().attr("tagflag",current_data_c[array_c[a]].id);
	        $(".newc .imgc").hover(function () {
	            $(this).children('.blacktea').show();
	        },function () {
	            $(this).children('.blacktea').hide();
	        });
	        lastone_cou.prev().find('.delete').click(function (e) {
	            // teaArr.splice($(this).parents('.newt').attr("tagflag"));
	            for(var r = teaArr_c.length-1;r>=0;r--)
	            {
	                console.log();
	                if(teaArr_c[r].id == $(this).parents('.newc').attr("tagflag"))
	                {
	                    // console.log(teaArr[r].id);
	                    teaArr_c.splice(r,1);
	                    break;
	                }
	            }
	            $(this).parents('.newc').remove();
	        });
	    }

	    array_c.splice(0,array_c.length);
	})




	$('#course_alert .all').addClass('select_active_c')
	// reload_c(course_data.data)

	$('#course_alert .carousel').carousel({
	    interval: 0
	})




	$('#course_alert .chosse_click_btn').click(function () {
	    var _self = $(this)
	    getReq("/orgs/"+$('.box.officialset').attr('orgid')+"/schools/"+$('.box.officialset').attr('schoolid')+"/classes/choose/?type="+_self.attr('skill-type'),classrender);
	    $('#course_alert .chosse_click_btn').removeClass('select_active_c')
	    _self.addClass('select_active_c')
	    $('input.searchcou').val('')
	})


	$('#course_alert button.searchcou').click(function () {
	    var type = $("#course_alert .select_active_c").attr('skill-type')
	    getReq('/orgs/'+$('.box.officialset').attr('orgid')+'/schools/'+$('.box.officialset').attr('schoolid')+'/classes/choose/?search='+$('input.searchcou').val()+"&type="+type,classrender);

	})




	var find_disable_c = function (data) {
	    // var active_index = $('.item.active').attr('id')-1

	    for(var o in array_c)
	    {
	        for(var obj in data)
	        {
	            if(data[obj].id == array_c[o])
	            {
	                teaArr_c.push(data[obj]);
	            }
	        }
	    }
	    array_c.splice(0,array_c.length);


	    $('#course_alert .add_img_c').detach();
	    $('#course_alert .course_item').find('.disabled').detach();
	    $('#course_alert .course_item').css("pointer-events","auto");


	    for(var i = 0;i<data.length;i++)
	    {
	        // var tage_index = active_index*4+i
	        var obj = data[i];

	        for (var j= 0;  j<teaArr_c.length;j++)
	        {
	            if (teaArr_c[j].id == obj.id)
	            {
	                $('#course_alert .course_item').eq(i).append('<div class="disabled" style="background-color: rgba(255, 255, 255, 0.8);height: 100%;width: 100%"></div>')
	                $('#course_alert .course_item').eq(i).css("pointer-events","none");
	                $('#course_alert .course_item').eq(i).append('<img src="/static/images/select.png" class="add_img_c">')
	                $('#course_alert .course_item').eq(i).addClass('chosse_active1');
	                break;
	            }

	        }
	    }
	}


	//TODO: 网络请求


	//提交官网设置


	$(".useb button.touse").click(function () {
	    inputorgdata(false);
	});
	$(".useb button.rel").click(function () {
	    inputorgdata(true);
	});





	var inputorgdata = function (isrelease) {


	    $('li.ban .newban').each(function (index,ele) {
	        var data_index = $(ele).attr('data-wlx-ban-url')
	        orgbanurls.push(data_index);
	    })
	    $('li.ban .newban').each(function (index,ele) {
	        var data_index = $(ele).attr('data-wlx-ban-title')
	        if(!data_index)
	        {
	            data_index = ""
	        }
	        orgbantitles.push(data_index);
	    })
	    $('li.ban .newban').each(function (index,ele) {
	        var data_index = $(ele).attr('data-wlx-ban-link')
	        if(!data_index)
	        {
	            data_index = ""
	        }
	        orgbanlinks.push(data_index);
	    })
	    $('li.edi .newenv').each(function (index,ele) {
	        var data_index = $(ele).attr('data-wlx-envurl')
	        envbanurls.push(data_index);
	    })

	    for(var i in teaArr)
	    {
	        chooseteas.push(teaArr[i].teacher_user_id);
	    }
	    for(var l in teaArr_c)
	    {
	        choosecous.push(teaArr_c[l].id);
	    }



	    var newData = JSON.stringify({
	        "banner_urls": orgbanurls,
	        "banner_titles": orgbantitles,
	        "banner_links": orgbanlinks,
	        "teaching_environment_urls": envbanurls,
	        "teacher_recommendation_title": $('li.tea input.ti').val(),
	        "teacher_recommendation_description": $('textarea.tea').val(),
	        "class_recommendation_title": $('li.cou input.ti').val(),
	        "class_recommendation_description": $('textarea.cou').val(),
	        "teacher_ids": chooseteas,
	        "class_ids": choosecous,
	        "class_banner_url": tabcoubanurl,
	        "class_banner_title": $('.tabcou .desc input').val(),
	        "teacher_banner_url": tabteabanurl,
	        "teacher_banner_title": $('.tabtea .desc input').val(),
	        "is_release": isrelease
	    });
	    console.log(newData);


	    if(!orgbanurls.length)
	    {
	        mizhu.upload("校区banner不能为空")
	        return
	    }

	    if(!tabcoubanurl)
	    {
	        mizhu.upload("课程列表banner不能为空")
	        return
	    }

	    if(!tabteabanurl)
	    {
	        mizhu.upload("教师列表banner不能为空")
	        return
	    }

	    console.log('/orgs/'+$('.box.officialset').attr('orgid') +'/schools/'+ $('.box.officialset').attr('schoolid')+'/school_settings/')

	    $.ajax({
	        url: '/orgs/'+$('.box.officialset').attr('orgid') +'/schools/'+ $('.box.officialset').attr('schoolid')+'/school_settings/',
	        type: 'PUT',
	        dataType:'json',
	        contentType: "application/json;charset=utf-8",
	        data: newData,
	        error: function (status, error) {
	            console.log(error)
	            wlx_resetData();
	            mizhu.upload("系统繁忙,请稍后再试")
	        },
	        success: function (data, text) {
	            console.log(data.message)
	            wlx_resetData();
	            
	            if(data.code != 0)
	            {
	                mizhu.upload(data.message)
	            }
	            else
	            {
	                mizhu.upload("操作成功")
	                setTimeout(function () {
	                    $('a.jump').attr('href',"/orgs/"+$('.officialset').attr('orgid')+"/schools/"+$('.officialset').attr('schoolid')+"/school_settings/officialset/?category="+$('.officialset').attr('category'))
	                    $('a.jump').get(0).click()
	                },2000)
	            }
	        }
	    });
	}


	$('.newt').each(function (index,ele) {
	    var data_index = $(ele).attr('tagflag')
	    array.push(data_index);
	})


	$('.newc').each(function (index,ele) {
	    var data_index = $(ele).attr('tagflag')
	    array_c.push(data_index);
	})



	getReq('/orgs/'+ $('.box.officialset').attr('orgid')+'/teachers/',teacherrender);

	getReq('/orgs/'+$('.box.officialset').attr('orgid')+'/schools/'+$('.box.officialset').attr('schoolid')+'/classes/choose/',classrender);

	var wlx_resetData = function () {
	   orgbanlinks.splice(0,orgbanlinks.length);
	    orgbanurls.splice(0,orgbanurls.length);
	    orgbantitles.splice(0,orgbantitles.length);
	    envbanurls.splice(0,envbanurls.length);
	}



/***/ }
/******/ ]);