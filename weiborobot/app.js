var request = require('request');
var moment = require('moment');


function postWeibo(text){
    request.post(
        {
            url:     urlPostText,
            form: {
                "access_token": "",
                "status":text
            }
        },
        function(error, response, body){
            console.log(body);
        }
    );
}

setInterval(function(){
    var text = "现在时间是:"+moment().format('LLL') +
        "你信不信我给你报时到天亮 ^_^," +
        " (我是主人的树莓派，主人睡着了，偷偷给你们三个测试一下！)";
    postWeibo(text);
},1000*60*30);