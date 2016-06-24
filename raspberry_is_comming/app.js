var emailSender = require('./sendEmail');
var os = require('os');  
var request = require('request');

var mailOptions = {
    from: '"pi"<912293097@qq.com>', // sender address
    to: 'wangq@smartbow.net', // list of receivers
    subject: '树莓派已启动，请查看内容!', // Subject line
    text: 'Hello world'// plaintext body
};

var checkIpTimer = setInterval(function(){
	request('http://www.baidu.com', function (error, response, body) {
		 if (!error && response.statusCode == 200) {
		 	clearInterval(checkIpTimer);
		 	sendNetIntfaceInfoToMyEmail();
		}
	})
}, 3000)

function sendNetIntfaceInfoToMyEmail () {
	var networkInterfaceBuffer = os.networkInterfaces();
	var networkInterfaceInfo = "";
	for(netkey in networkInterfaceBuffer){
		networkInterfaceInfo += netkey+":\r\n";

		var networkInfoGroup = networkInterfaceBuffer[netkey];
		for(groupkey in networkInfoGroup){
			var theNetCardAddress = networkInfoGroup[groupkey].address;
			var theNetCardFamily = networkInfoGroup[groupkey].family;
			var theNetCardInternal = networkInfoGroup[groupkey].internal;
			networkInterfaceInfo += "   address: "+theNetCardAddress
						+"  family: "+theNetCardFamily
						+"  internal: "+theNetCardInternal+"\r\n";

		}
	}

	mailOptions.text = "network info: \r\n"+networkInterfaceInfo;
	emailSender.sendMail(mailOptions);
}

