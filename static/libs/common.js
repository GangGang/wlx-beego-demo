/**
 * Created by leibin on 17/3/24.
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

Date.prototype.isToday = function () {
    var d = new Date(this);
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
}

Date.prototype.isYesterday = function () {
    var d = new Date(this);
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) + 1 == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
}

Date.prototype.shortDateToString = function () {
    var today = new Date();
    var value = parseInt(today - this)

    if (value < 15 * 1000) {
        return '刚刚'
    }
    else if (value <= 30 * 1000) {
        return '30秒前'
    }
    else if (value <= 30 * 60 * 1000) {
        return parseInt(value / 60 / 1000 + 1) + '分钟前'
    }
    else if (value <= 12 * 3600 * 1000) {
        return parseInt(value / 3600 / 1000 + 1) + '小时前'
    }
    else if (this.isToday()) {
        return "今天 " + this.pattern("HH:mm")
    }
    else if (this.isYesterday()) {
        return "昨天 " + this.pattern("HH:mm")
    }
    else {
        return this.pattern("yyyy-MM-dd HH:mm")
    }
}

//判断某个时间是否在一段时间内
function time_range(beginTime, endTime, nowTime) {
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

//比较时间大小
function time_compare(beginTime, endTime) {
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

//封装的表单序列化函数
$.fn.serializeObject = function () {
    var obj = {};
    var count = 0;
    $.each(this.serializeArray(), function (i, o) {
        var n = o.name, v = o.value;
        count++;
        obj[n] = obj[n] === undefined ? v
            : $.isArray(obj[n]) ? obj[n].concat(v)
                : [obj[n], v];
    });
    //obj.nameCounts = count + "";//表单name个数
    return JSON.stringify(obj)
};

//封装的ajax方法
function ajaxRequest(url,type,params,callback){
    $.ajax({
            type:type,
            url:url,
            data:params || '',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            error: function (status, error) {
                alert('系统错误' + status)
            },
            success:function (data){
                callback(data)
            }
        }
    )
}
