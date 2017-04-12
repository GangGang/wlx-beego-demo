var mizhu = new function() {
	this.width = $(window).width() * 0.3;
	this.height = 172;

	this.close = function() {
		$('.win iframe').fadeOut();
		$('.win').fadeOut("fast");
		setTimeout(function() {
			$('.win iframe').remove();
			$('.win').remove();
		}, 200);
	};

	this.open = function(width, height, title, url, closed) {
		this._close = function() {
			this.close();
			if($.isFunction(closed)) closed();
		};
		var html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><a href="javascript:void(0)" onclick="mizhu._close();" class="close-btn" title="关闭">×</a><iframe class="body-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" src=""></iframe></div></div>';
		var jq = $(html);
		jq.find(".window-panel").height(mizhu.height).width(mizhu.width).css("margin-left", -mizhu.width / 2).css("margin-top", -mizhu.height);
		jq.find(".title").find(":header").html(title);
		jq.find(".body-panel").height(height - 36).attr("src", url);
		jq.appendTo('body').fadeIn("fast");
		$(".win .window-panel").focus();
	};

	function messageBox(html, title, message, type) {
		var jq = $(html);
		if(type == "toast") {
			jq.find(".window-panel").width(message.length * 20).css("margin-left", -message.length * 20 / 2).css("margin-top", -mizhu.height / 2);
		} else {
			jq.find(".window-panel").width(mizhu.width).css("margin-left", -mizhu.width / 2).css("margin-top", -mizhu.height / 2 - 146);
		}
		if(valempty(title)) {
			jq.find(".title").remove();
			jq.find(".window-panel .body-panel").css("border-radius", "4px");
		} else {
			jq.find(".title").find(":header").html(title);
		}
		jq.find(".content").html(message.replace('\r\n', '<br/>'));
		jq.appendTo('body').fadeIn("fast");
		$(".win .w-btn:first").focus();
	}

	this.confirm = function(title, message, selected) {
		this._close = function(flag) {
			if(flag) {
				$(".win").remove();
				selected(flag);
			} else {
				this.close();
			}
		};
		var html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><div class="body-panel"><p class="content"></p><p class="btns"><button class="w-btn" tabindex="1" onclick="mizhu._close(false);">取消</button><button class="w-btn" onclick="mizhu._close(true);">确定</button></p></div></div></div>';
		messageBox(html, title, message);
	};

	this.upload = function(msg,time){
		var message = msg|| "上传成功!";
		var html = '<div class="shade"><div class="s-container">'+message+'</div></div>';
		$(html).appendTo('body').fadeIn();
		setTimeout(function() {
			console.log('wwwwww')
			$('.shade').fadeOut(500);
		}, time||1000);
	}

	this.fail = function(msg){
		var message = msg|| "上传失败,请重试!";
		var html = '<div class="shade"><div class="failed"><div style="padding: 10px 0 0 15px">'+message+'</div><div><sapn class="close">关闭</sapn></div></div></div>';
		$(html).appendTo('body').fadeIn();
		$('.close').click(function(){
			$('.shade').remove()
		})
	}
	
	this.confirm_delete = function(info,func){
		var html = '<div class="shade"><div class="confirm_box"><img src="/images/prompt.png" alt=""><div class="msg">'+ info + '</div><div class="btn-line"><button class="cancel">取消</button><button class="sure1">确定</button></div></div>';
		$(html).appendTo('body').fadeIn();
		$('.cancel').click(function(){
			$('.shade').fadeOut(500);
		})

		$('.sure1').click(function(){
			$('.shade').fadeOut(500);
			func()
		})



	}

	this.alert = function(title, message, ico) {
		var icon = "";
		if(!valempty(ico)) {
			icon = '<p class="btns" style="margin-bottom:-15px;"><img width="70px" height="70px" src="http://wcnmb869740.oss-cn-shanghai.aliyuncs.com/alert_red.png"></p>';
		}
		var html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><div class="body-panel">' + icon + '<p class="content"></p><p class="btns"><button class="w-btn" tabindex="1" onclick="mizhu.close();">确定</button></p></div></div></div>';
		messageBox(html, title, message);
	}

	this.toast = function(message, time) {
		var html = '<div class="win"><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="body-panel toast-panel"><p class="content toast-content"></p></div></div></div>';
		messageBox(html, "", message, "toast");
		setTimeout(function() {
			mizhu.close();
		}, time || 3000);
	}
};

function valempty(str) {
	if(str == "null" || str == null || str == "" || str == "undefined" || str == undefined || str == 0) {
		return true;
	} else {
		return false;
	}
}