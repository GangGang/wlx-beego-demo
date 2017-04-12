/**
 * Created by beingRay on 17/1/9.
 */
var getUuid = function getUuid(){  //生成uuid
    var len;
    var radix=16;//16进制
    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid=[],i;radix=radix||chars.length;
    if(len){
        for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];
    }else
    {
        var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';
        uuid[14]='4';for(i=0;i<36;i++){
        if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
    return uuid.join('');
}

// var ali = {
//     region: 'oss-cn-beijing',
//     accessKeyId: 'LTAIG45YrfsW5PYB',
//     secretAccessKey: 'SIrehGyBQpiFYSxiBz24XnUZQ10QuP',
//     bucket: 'static-wlx'
// };
var ali = {
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAImDJ8eKxPBfUe',
    accessKeySecret: 'cZxxY18oacQOLdlWPwrLPN6v1NqBu2',
    bucket: 'static-wlx'
};
// var ali =
// {
//     'region': 'oss-cn-shanghai',
//     'accessKeyId': 'LTAIfUcVx6t8yMZ5',
//     'accessKeySecret': 'XjzPksjwvCc1s0JqTqhRuasVDRRXmD',
//     'bucket': 'wcnmb869740'  //上传的制定bucket
// }

var client = new OSS.Wrapper(ali);

// document.getElementById('file').addEventListener('change', function (e) { //点击文件上传
//     var file = e.target.files[0];
//     upfile(file)
// });


var upfile = function(file,flasecallback,successcallback){
    var subfix = file.name.substring(file.name.lastIndexOf('.'));
    var storeAs = getUuid().concat(subfix).toLowerCase(); //最后生的文件名
    // console.log(subfix + '---'+ file.name + ' => ' + storeAs);

    client.multipartUpload(storeAs, file).then(function (result) {
        console.log("成功上传阿里")
        console.log("http://static-wlx.oss-cn-beijing.aliyuncs.com/"+storeAs);
        successcallback("http://static-wlx.oss-cn-beijing.aliyuncs.com/"+storeAs);
    }).catch(function (err) {
        console.log("失败上传阿里")
        console.log(err);
       flasecallback(err);
    });
}


var imgfiletesting = function (file) {
    var arr = file.name.split('.')
    if(arr.length)
    {
        var subfix = arr[arr.length-1].toLowerCase();
        var types = ["jpg","png","jpeg"]
        for(var i=0;i<types.length;i++)
        {
            if(subfix==types[i])
            {
                return true
            }
        }
        return false
    }
    else
    {
        return false
    }

}


var videofiletesting = function () {
    var arr = file.name.split('.')
    if(arr.length)
    {
        var subfix = arr[arr.length-1].toLowerCase();
        var types = ["mp4","mov","flv"]
        for(var i=0;i<types.length;i++)
        {
            if(subfix==types[i])
            {
                return true
            }
        }
        return false
    }
    else
    {
        return false
    }
}


var uploadimg = (function(){
    return {
        'getUuid':getUuid,
        'client':client,
        'upfile':upfile,
        "imgfiletesting":imgfiletesting,
        "videofiletesting":videofiletesting
    }
})()

// module.exports = 





