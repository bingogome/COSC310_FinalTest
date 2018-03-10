/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if(loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if(authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if(regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 转帐功能
	 **/
	owner.transfer = function(transInfo, callback) {
		callback = callback || $.noop;
		transInfo = transInfo || {};
		transInfo.From = transInfo.From || '';
		transInfo.To = transInfo.To || '';
		transInfo.Amount = transInfo.Amount || '';
		if(transInfo.From == '') {
			return callback('Please enter valid account ');
		}
		if(transInfo.To == '') {
			return callback('Please enter valid account to receive money.');
		}
		if(transInfo.Amount == '') {
			return callback('Amount can not be null!');
		}
		/*Testing
		 * //var testfile1 = {"bankaccount1":"01","bankaccount2":"02","balance1":"999","balance2":"20"};
		//localStorage.setItem("$testfile",JSON.stringify(testfile1));
		//var testfile = JSON.parse(localStorage.getItem('$testfile') || '[]');
		 **/
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		//var state = owner.getState();
		//var currentuser = owner.getObjects(users,"account",state.account);
		var fromaccount = owner.getObjects(users,"bankaccount1",transInfo.From);
		if(fromaccount == ''){
			return callback('Please enter valid from account to transfer money.');
		}
		var toaccount = owner.getObjects(users,"bankaccount2",transInfo.To);
		if(toaccount ==''){
			return callback('Please enter valid account to receive money.');
		}
		var fromaccount_balance = users.balance1;
		var toaccount_balance = users.balance2;
		if(fromaccount_balance<transInfo.Amount){
			return callback('Not enough money in your account, please enter valid amount.');
		}else{
			fromaccount_balance = fromaccount_balance - transInfo.Amount;
			users.balance1 = fromaccount_balance;
			toaccount_balance = toaccount_balance -(-transInfo.Amount);
			users.balance2=toaccount_balance;
			localStorage.setItem('$users', JSON.stringify(users));
		}
		

		
	}

	/**loop through JSON, 
	 * return an array of objects according to key, value, or key and value matching
	 * 
	 **/
	owner.getObjects=function(obj, key, val) {
		var objects = [];
		for(var i in obj) {
			if(!obj.hasOwnProperty(i)) continue;
			if(typeof obj[i] == 'object') {
				objects = objects.concat(getObjects(obj[i], key, val));
			} else
				//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
				if(i == key && obj[i] == val || i == key && val == '') { //
					objects.push(obj);
				} else if(obj[i] == val && key == '') {
				//only add if the object is not already in the array
				if(objects.lastIndexOf(obj) == -1) {
					objects.push(obj);
				}
			}
		}
		return objects;
	}
	/**search JSON, return an array of values that match on a certain key
	 * 
	 */
owner.getValues=function(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));