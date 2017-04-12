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
	 * Created by leibin on 17/3/3.
	 */
	/**
	 * Created by beingRay on 16/12/22.
	 */
	/**
	 * jQuery带箭头提示框插件
	 * email: tianshaojie@msn.com
	 * date: 2013-01-15
	 * version: 1.0.0
	 */
	(function($) {


	    var max = Math.max,
	        min = Math.min;
	    $.pt = $.pureToolTips = function(options) {
	        var opts = $.extend({
	                target 		: null,		//目标元素，不能为空
	                position 	: 't',		//提示框相对目标元素位置 t=top,b=bottom,r=right,l=left
	                align		: 'c',		//提示框与目标元素的对齐方式，自动调节箭头显示位置，指向目标元素中间位置，c=center, t=top, b=bottom, l=left, r=right [postion=t|b时，align=l|r有效][position=t|b时，align=t|d有效]
	                arrow		: true,		//是否显示箭头
	                content 	: '',		//内容
	                width 		: 200,		//宽度
	                height 		: 'auto',	//高度
	                autoClose 	: true,		//是否自动关闭
	                time 		: 500,		//自动关闭延时时长
	                leaveClose 	: false,	//提示框失去焦点后关闭
	                close 		: null		//关闭回调函数
	            }, options || {}),

	            $ao, $ai, w, h,
	            $pt = $('.pt'),
	            $target = $(opts.target),
	            top = $target.offset().top,
	            left = $target.offset().left,
	            width = $target.outerWidth(),
	            height = $target.outerHeight(),

	            position = opts.position,
	            align = opts.align,
	            arrow = opts.arrow,

	            constant = {b:'pt-up', t:'pt-down', r:'pt-left', l:'pt-right'}, //相对位置正好和箭头方向相反
	            arrowClass = constant[position] || constant.t;

	        //初始化元素，事件
	        function init() {
	            if(!opts.target) {
	                return;
	            }
	            if(!$pt.length) {
	                $pt = $('<div class="pt pt-down"><div class="cont"></div><b class="out"></b><b class="in"></b></div>').appendTo(document.body);
	            }
	            $pt.removeClass().addClass('pt ' + (arrow ? arrowClass : '')).find('.cont').html(opts.content).css({width:opts.width, height:opts.height});
	            $ao = $pt.find('.out').toggle(arrow);
	            $ai =  $pt.find('.in').toggle(arrow);
	            w = $pt.outerWidth();
	            h = $pt.outerHeight();
	            arrow && autoAdjust();			//设置箭头自动居中
	            $pt.css(setPos()).show();		//设置显示框位置和自动隐藏事件
	            opts.leaveClose && leaveClose();//离开关闭
	            opts.autoClose && !opts.leaveClose && autoClose(opts.timeout);	//默认自动关闭，优先离开关闭
	            return $pt;
	        }
	        //计算提示框应该出现在目标元素位置
	        function setPos() {
	            var btw = arrow ? parseInt($ao.css('border-top-width'), 10) : 3,
	                brw = arrow ? parseInt($ao.css('border-right-width'), 10) : 3,
	                result = {};
	            switch(align) {
	                case 'c': break;
	                case 't': result.top = top; break;
	                case 'b': result.top = top + height - h; break;
	                case 'l': result.left = left; break;
	                case 'r': result.left = left + width - w; break;
	            }
	            switch(position) {
	                case 't': result.top = top - h - brw; break;
	                case 'b': result.top = top + height + brw; break;
	                case 'l': result.left = left - w - btw; break;
	                case 'r': result.left = left + width + btw; break;
	            }
	            result.top || (result.top = top + height/2 - h/2);
	            result.left || (result.left = left + width/2 - w/2);
	            return result;
	        }

	        //设置箭头自动居中
	        function autoAdjust() {
	            var aop, aip, bw, auto='auto';
	            switch(position) {
	                case't':
	                    bw = parseInt($ao.css('border-top-width'), 10);
	                    aop = {bottom:-bw, left:w/2-bw, top:auto, right:auto};
	                    alignLR();
	                    aip = {top:auto, left:aop.left+1, bottom:aop.bottom+1, right:auto};
	                    break;
	                case'b':
	                    bw = parseInt($ao.css('border-bottom-width'), 10);
	                    aop = {top:-bw, left:w/2 - bw, right:auto, bottom:auto};
	                    alignLR();
	                    aip = {top:aop.top+1, left:aop.left+1, bottom:auto, right:auto};
	                    break;
	                case'l':
	                    bw = parseInt($ao.css('border-left-width'), 10);
	                    aop = {top:h/2 - bw, right:-bw, left:auto, bottom:auto};
	                    alignTB();
	                    aip = {top:aop.top+1, right:aop.right+1, left:auto, bottom:auto};
	                    break;
	                case'r':
	                    bw = parseInt($ao.css('border-right-width'), 10);
	                    aop = {top:h/2 - bw, left:-bw, right:auto, bottom:auto};
	                    alignTB();
	                    aip = {top:aop.top+1, left:aop.left+1, right:auto, bottom:auto};
	                    break;
	            }
	            //上下侧，左右对齐
	            function alignLR() {
	                if(align === 'l' && width/2 > bw && width/2 < w-bw) {
	                    aop.left = width/2-bw/2;
	                } else if(align === 'r' && width/2 > bw && width/2 < w-bw) {
	                    aop.left = w-width/2-bw/2;
	                }
	            }
	            //左右侧，上下对齐
	            function alignTB() {
	                if(align === 't' && height/2 > bw && height/2 < h-bw) {
	                    aop.top = height/2 - bw;
	                } else if(align === 'b' && height/2 > bw && height/2 < h-bw) {
	                    aop.top = h - height/2 - bw;
	                }
	            }
	            $ao.css(aop);
	            $ai.css(aip);
	        }
	        //设置提示框自动关闭
	        function autoClose() {
	            window.ptt && clearTimeout(ptt);
	            window.pta && clearTimeout(pta);
	            window.pta = setTimeout(function() {
	                $pt.hide();
	                $.isFunction(opts.close) && opts.close();
	            }, opts.time);
	        }
	        //设置提示框失去焦点关闭
	        function leaveClose() {
	            //先解绑再绑定，不然会形成事件链
	            $pt.unbind('mouseleave').mouseleave(function(e) {
	                $pt.hide();
	                $.isFunction(opts.close) && opts.close();
	            }).unbind('mouseenter').mouseenter(function() {
	                window.ptt && clearTimeout(ptt);
	            });
	        }
	        return init();
	    };

	    //扩展到包装集上
	    $.fn.pt = $.fn.pureToolTips = function(options) {
	        var opts = $.extend({
	            leaveClose:true
	        }, options || {});
	        return this.each(function() {
	            $(this).mouseenter(function() {

	                window.ptt && clearTimeout(ptt);
	                window.pta && clearTimeout(pta);
	                opts.target = this;
	                $.pt(opts);
	                var qwe ;
	                $('input').focus(function(){
	                    qwe = $(this).val()
	                })
	                $('input').change(function(){
	                    if(parseInt($(this).val().split(':')[0])<beginning){
	                        mizhu.fail('上课时间不能早于开业时间');
	                        $(this).val(qwe);
	                        return
	                    }

	                    if(parseInt($(this).val().split(':')[0])>endding){
	                        mizhu.fail('上课时间不能晚于休业时间');
	                        $(this).val(qwe);
	                        return
	                    }

	                    var self = $(this)
	                    console.log('changed....')
	                    var flag = true;
	                    var target = $(this).parent().parent();
	                    order1 = target.attr('count'); //第几个添加进去
	                    var toX = target.attr('distance'); //距离x的距离

	                    var hour = $(this).val().split(':')[0];
	                    var min = $(this).val().split(':')[1];



	                    if(duration == 60){
	                        var hour1 = parseInt(hour) + 1 + ':';
	                        var top;
	                        var last = hour1.concat(min);
	                    }else{
	                        var right = (parseInt(min)+duration)%60;
	                        var gap = parseInt((parseInt(min)+duration)/60);
	                        var axiba = Number(right).toString().length == 1? 0+Number(right).toString() : Number(right).toString();
	                        var last = parseInt(hour)+gap+':'+axiba;

	                    }

	                    //在这里判断是否可以添加  点击的是星期几
	                    console.log(target.attr('order'));
	                    final[target.attr('order')].forEach(function (ele, index) {
	                        console.log('nmsl')
	                        if (time_range(ele.split('-')[0], ele.split('-')[1], self.val()) ||
	                            time_range(ele.split('-')[0], ele.split('-')[1], last)) {
	                            mizhu.upload('该时间段已有班级',1000)
	                            flag = false;
	                            return
	                        }
	                    })

	                    if (!flag) return   //若有占用则退出

	                    bgss[order1].trigger('click'); //调换时间后删除黑色快

	                    top = parseInt(min / 60 * 48);
	                    double = hour - 9;  //
	                    //这一步
	                    $('.line').eq(hour - 9).click(function () {
	                        return
	                    })


	                    var bg = $('<div class="occupy1"></div>');
	                    bg.css({position: 'absolute', top: top + 'px', left: toX + "px",height:Math.round(duration/60*50)+'px'});

	                    var info = $('<div class="info" count="' + infos.length + '" distance="' + order + '"><p>周' + week + '</p>' +
	                        '<p>开始时间<input readonly="true" class="begin" type="text" size=5  value="' + self.val() + '"></p>' +
	                        '<p>结束时间<span class="end">' + last + '</span></p></div>');

	                    bgss.push(bg);
	                    infos.push(info);

	                    // 找到追加色块的
	                    $('.line').eq(hour - beginning).append(bg);

	                    bg.pt({
	                        position: 'b', // 默认属性值
	                        align: 'c',
	                        width: '220px',
	                        time: 500,// 默认属性值
	                        content: info
	                    })

	                    bgss.forEach(function (ele, index) {
	                        ele.pt({
	                            position: 'b', // 默认属性值
	                            align: 'c',
	                            width: '220px',
	                            time: 500,// 默认属性值
	                            content: infos[index]
	                        })

	                        ele.click(function (event) {
	                            console.log('店家了1次')
	                            event.stopPropagation();
	                            $(this).remove(); //删除一个色块
	                            bgss.splice(index, 1);
	                            infos.splice(index, 1);
	                            console.log('现在的个数' + infos + '----' + infos.length);
	                            $('.pt').hide();

	                        })
	                    })
	                })
	            }).mouseleave(function() {
	                window.ptt = setTimeout(function() {
	                    $('.pt').hide();
	                    $.isFunction(opts.close) && opts.close();
	                }, 500);
	            });
	        });
	    };
	})(jQuery);

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
	    if (n.getTime() - b.getTime() >= 0 && n.getTime() - e.getTime() <= 0) {
	        return true;
	    } else {

	        return false;
	    }
	}

	var time_range1 = function (beginTime, endTime) {
	    var strb = beginTime.split(":");
	    if (strb.length != 2) {
	        return false;
	    }
	    var stre = endTime.split(":");
	    if (stre.length != 2) {
	        return false;
	    }

	    var b = new Date();
	    var e = new Date();

	    b.setHours(strb[0]);
	    b.setMinutes(strb[1]);
	    e.setHours(stre[0]);
	    e.setMinutes(stre[1]);

	    if (b.getTime() - e.getTime() >= 0 ) {
	        return true;
	    } else {
	        return false;
	    }
	}

	var schedules = JSON.parse($('.hide5').text());
	var duration = parseInt($('.hide7').text());
	var beginning = parseInt($('tr').eq(1).find('.time').text().split(":")[0]);
	var length = $('table tr').length;

	var grade_id = parseInt(location.href.split('/')[8])

	var endding = parseInt($('tr').eq(length -2 ).find('.time').text().split(":")[0]);

	$('.circle').click(function () {
	    $(this).toggleClass('actives');
	    $('.switch1').toggleClass('changing');
	    if ($('.switch1').hasClass('changing')) {
	        $('.state').text('暂不上架')
	    } else {
	        $('.state').text('上架')
	    }
	})

	$('select').searchableSelect();


	$('.date').eq(1).click(function () {
	    $('#date').show()
	}).siblings('.date').click(function () {
	    $('#date').val(new Date().toLocaleString().split(' ')[0])
	    $('#date').hide();

	})

	$('#capacity').blur(function () {
	    if ($(this).text() == '' || !/^\d{1,}$/.test(parseInt($(this).text()))) {
	        mizhu.fail('输入格式有误');
	        $('#capacity').text('')
	    }
	    var max_count = parseInt($('.capacity_num').text().substring($('.capacity_num').text().indexOf(':') + 1));

	    if (parseInt($(this).text()) > max_count) {
	        mizhu.fail('超过容量,重新选择!');
	        $('#capacity').text('')
	    }
	})

	function judgement(){
	    return $('#lastname').val()!='' && $('#date').val()!='' && $('#capacity').text()!=''
	}

	var bgss = [];
	var infos = [];
	var order;
	var index;
	var week;
	var weeks = -2;
	var double = -2;
	var final = {'周一': [], '周二': [], '周三': [], '周四': [], '周五': [], '周六': [], '周日': []};

	function qwe(arrange, width, height, asd) {
	    arrange.forEach(function (ele, index) {
	        var bg,info;
	        var week_name = ele.schedule.weekName;
	        final[week_name].push(ele.schedule.startTime + '-' + ele.schedule.endTime);
	        if(parseInt(location.href.split('/')[8]) == ele.schedule.gradeId){
	             bg = $('<div class="occupy1" style="position:absolute"></div>');
	             bgss.push(bg)

	        }else{
	             bg = $('<div class="occupy" style="position:absolute"></div>');
	        }
	        var arr = ele.schedule.startTime.split(':');
	        var arr1 = ele.schedule.endTime.split(':');
	        var toleft = (ele.schedule.week - 1) * width;
	        var totop = (parseInt(arr[0]) - beginning) * height + parseInt(arr[1] / 60 * height);
	        //计算真实的高度
	        var high = (arr1[0] - arr[0]) * height + (arr1[1] - arr[1]) / 60 * height;


	        bg.css({top: totop + 'px', left: toleft + "px", height: high + 'px'});

	        if(parseInt(location.href.split('/')[8]) == ele.schedule.gradeId){
	            info = $('<div class="info" count="' + infos.length + '"><p>周' + ele.schedule.week + '</p>' +
	                '<p>开始时间<input class="begin" type="text" size=5  value="' + ele.schedule.startTime + '"  /></p>' +
	                '<p>结束时间<span class="end">' + ele.schedule.endTime + '</span></p></div>');
	            infos.push(info);
	            bg.pt({
	                position: 'b', // 默认属性值
	                align: 'c',
	                width: '220px',
	                time: 500,// 默认属性值
	                content: info
	            });

	        }else{
	            info = $('<div style="" ><img src="' + ele.url + '" width="200" height="120"' +
	                '</img><div class="tea-img">' + ele.teacherName +
	                '</img></div><p class="info">' + ele.clazzName + ele.gradeName
	                + '<p>' +
	                '<p class="classtime">' + ele.schedule.weekName + ele.schedule.startTime + '-' + ele.schedule.endTime + '</p></div>');

	            bg.pt({
	                position: 't', // 默认属性值
	                align: 'c',
	                width: '220px',
	                time: 500,// 默认属性值
	                content: info
	            });

	        }
	        asd.append(bg);

	    })

	    bgss.forEach(function (ele, index) {
	        ele.pt({
	            position: 'b', // 默认属性值
	            align: 'c',
	            width: '220px',
	            time: 500,// 默认属性值
	            content: infos[index]
	        })

	        ele.click(function (event) {
	            if($('.hide6').text() == 1)
	                return
	            console.log('店家了1次')
	            console.log(index)
	            event.stopPropagation();
	            $(this).remove(); //删除一个色块
	            bgss.splice(index, 1);
	            infos.splice(index, 1);
	            console.log('现在的个数' + infos + '----' + infos.length);
	            $('.pt').hide();

	        })
	    })
	}

	qwe(schedules,130,52,$('.show'))

	var timearr = [];
	$.each($('tr:gt(0)'),function(index,ele){
	    var times = $(ele).text().split(':')[0].length > 1 ? $(ele).text().split(':')[0] : (0+$(ele).text().split(':')[0])
	    times = times + ':' + $(ele).text().split(':')[1];
	    timearr.push(times)
	})

	console.log(timearr)

	console.log($('.hide4').text())
	var minutes; //记录本节课多长时间
	var flag = false; //记录能否点击添加色块

	//点击添加方块  根据集体课和一对一选择课次

	$('.line').click(function (event) {
	    //该班级下有学生不能
	    if($('.hide6').text() == 1)
	        return

	    var margin_left = $('.show').offset().left;

	    if (!judgement()){
	        mizhu.upload('缺少必要信息',1000)
	        return
	    }

	    var e = event || window.event;
	    week = parseInt(Math.floor((e.clientX - margin_left) / 130)) + 1;
	    var week_names = ['一','二','三','四','五','六','日'];
	    var weeking = week_names[week-1];

	    if (double != 0 && weeks == week && ($(this).index() == double || $(this).index() == double + 1) || $(this).index() == 12)
	        return
	    index = $(this).index();
	    console.log(timearr[index])
	    var end_time = (duration == 60 && timearr[index + 1]) ||
	        (duration < 60 && timearr[index].split(':')[0]+':'+duration) || (duration > 60 && timearr[index+1].split(':')[0]+':'+(duration-60));

	    if(time_range1(end_time,$('tr:last').text())){
	        mizhu.upload('超过关门时间',1000);
	        return
	    }
	    order = parseInt(Math.floor((e.clientX - margin_left) / 130)) * 130;
	    week = parseInt(Math.floor((e.clientX - margin_left) / 130)) + 1;
	    var info = $('<div class="info" count="' + infos.length + '" distance="'+order+'" order="周' + weeking + '"><p>周' + week + '</p>' +
	        '<p>开始时间<input class="begin" type="text" size=5  value="' + timearr[index] + '"  /></p>' +
	        '<p>结束时间<span class="end">' + end_time + '</span></p></div>');

	    var bg = $('<div class="occupy1"></div>');

	    bg.css({position: 'absolute', top: 0, left: order + "px",height:Math.round(duration/60*50)+'px'});

	    bgss.push(bg); //点击追加黑色区块
	    infos.push(info); //对应的提示框
	    $(this).append(bg);

	    bgss.forEach(function (ele, index) {
	        ele.pt({
	            position: 'b', // 默认属性值
	            align: 'c',
	            width: '220px',
	            time: 500,// 默认属性值
	            content: infos[index]
	        })

	        ele.click(function (event) {
	            console.log('店家了1次')
	            event.stopPropagation();
	            $(this).remove(); //删除一个色块
	            bgss.splice(index, 1);
	            infos.splice(index, 1);
	            console.log('现在的个数' + infos + '----' + infos.length);
	            $('.pt').hide();

	        })
	    })
	})



	$('.searchable-select-item').click(function () {
	    console.log('www');
	    if ($(this).data('value') == "undefined") {
	        $('.show .occupy').remove();
	        $('.show .occupy1').remove();
	        return false
	    }

	    $('.show .occupy').remove();
	    $('.show .occupy1').remove();
	    $.ajax({
	            type: 'GET',
	            url: '/orgs/' + $('.hide1').text() + '/schools/' + $('.hide2').text() + '/classes/occupy/' + $('.teacher').attr('code') + '/' + $(this).data('value') + '/',
	            headers: {
	                "Accept": "application/json"
	            },
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",

	            error: function (status, error) {
	                alert('系统错误' + status)
	            },
	            success: function (data, text) {
	                //请求成功后  删除已有
	                $('.line .occupy').remove();
	                $('.line .occupy1').remove();
	                console.log(data.data.occupy);
	                $('.capacity_num').text('参考容量:' + data.data.maxStudentCount);
	                qwe(data.data.occupy, 130, 52, $('.show'));
	                console.log(final)
	            }
	        }
	    )
	})


	//删除此班级
	$('.btn-warning').click(function() {
	        mizhu.confirm_delete('是否删除该班级信息,删除后将无法恢复', aa)
	        function aa() {
	            $.ajax({
	                    type: 'POST',
	                    url: '/orgs/'+$('.hide1').text()+'/schools/'+$('.hide2').text()+'/grades/'+grade_id+'/delete/',
	                    headers: {
	                        "Accept": "application/json"
	                    },
	                    dataType: 'json',
	                    contentType: "application/json;charset=utf-8",
	                    error: function (status, error) {

	                    },
	                    success: function (data, text) {
	                        if(data.code == 0){
	                            mizhu.upload('删除成功');
	                            window.open('/orgs/'+$('.hide1').text()+'/schools/'+$('.hide2').text()+'/courses/'+$('.hide3').text()+'/','_self')
	                        }
	                    }
	                }
	            )
	        }
	    }
	)

	$('.btn-info').click(function () {

	    var pass = {};
	    var schedule = [];
	    if (infos.length == 0 || !judgement()){
	        mizhu.upload('缺少必要信息',1000);
	        return
	    }
	    console.log('----' + $('.info').length);

	    //如果该班级有学生
	    if($('.hide6').text() == 1){
	        pass.title = $('#lastname').val();
	        pass.is_enabled = $('.switch1').hasClass('changing') ? false:true
	    }else{
	        console.log(infos)
	        infos.forEach(function (ele, index) {
	            var qq = {};
	            qq.week = $(ele).find('p').eq(0).text().substring(1);
	            qq.startTime = $(ele).find('.begin').val();
	            qq.endTime = $(ele).find('.end').text();
	            schedule.push(qq)
	        })

	        pass.classroom_id = $('.selected').data('value');
	        pass.title = $('#lastname').val();
	        pass.capacity = $('#capacity').text();
	        pass.scheduleJson = schedule;
	        pass.is_enabled = $('.switch1').hasClass('changing')? false:true;
	        console.log(pass)
	    }

	    $.ajax({
	            type: 'post',
	            url: '/orgs/' + $('.hide1').text() + '/schools/' + $('.hide2').text() + '/grades/' + grade_id + '/edit_save/',
	            data: JSON.stringify(pass),
	            headers: {
	                "Accept": "application/json"
	            },
	            dataType: 'json',
	            contentType: "application/json;charset=utf-8",

	            error: function (status, error) {
	                alert('系统错误' + status)
	            },
	            success: function (data, text) {
	                if(data.code == 0){
	                    mizhu.upload('保存成功',1000);
	                    window.open('/orgs/' + $('.hide1').text() + '/schools/' + $('.hide2').text() + '/courses/' + $('.hide3').text() + '/', '_self')
	                }else{
	                    console.log(data.message)
	                }
	            }
	        }
	    )

	})


/***/ }
/******/ ]);