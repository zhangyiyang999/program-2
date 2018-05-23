define([
    'jquery',
    'jqueryCookie'
], function(){
    // 表单验证
    // 正则数组
    var inpObj = {
        userName:{
            el:$("#usr"),
            reg:/^[\u4e00-\u9fa5a-z0-9\-_]{4,20}$/i,
            hasVaild:false
        },
        userPwd:{
            el:$("#pwd"),
            reg:/^[0-9a-z\u0021-\u002f]{4,16}$/i,
            hasVaild:false
        },
        userConfirm:{
            el:$("#pwd-r"),
            hasVaild:false
        }
    }
    //用户名验证
		var userNAME = inpObj.userName.el;
		var userREG = inpObj.userName.reg;
		userNAME.blur(function () {
			if(!userREG.test(this.value)){
                $(".error_tip").html(`用户名格式不正确`);
                $(".error_tip").show();
				this.style.cssText = "border: 1px solid red;color: red;";
				inpObj.userName.hasVaild = false;
			}else{
				$(".error_tip").hide();
				this.style.cssText = "border: 1px solid green;color: green;";
				inpObj.userName.hasVaild = true;
			}
		})

		//密码验证
		var userPWD = inpObj.userPwd.el;
		userPWD.blur(function () {
			var userREG = inpObj.userPwd.reg;
			if(!userREG.test(this.value)){
                $(".error_tip").html(`密码格式不正确`);
                $(".error_tip").show();
				this.style.cssText = "border: 1px solid red;color: red;";
				inpObj.userPwd.hasVaild = false;
			}else{
				$(".error_tip").hide();
				this.style.cssText = "border: 1px solid green;color: green;";
				inpObj.userPwd.hasVaild = true;
			}
		})

		//确认密码
		var userCONFIRM = inpObj.userConfirm.el;
		userCONFIRM.blur(function () {
			if( this.value != userPWD.val() ){
                $(".error_tip").html(`密码不一致`);
                $(".error_tip").show();
				this.style.cssText = "border: 1px solid red;color: red;";
				inpObj.userConfirm.hasVaild = false;
			}else{
				$(".error_tip").hide();
				this.style.cssText = "border: 1px solid green;color: green;";
				inpObj.userConfirm.hasVaild = true;
			}
		})
        // 验证成功 进行ajax请求
    $("#register").on("click",function(){
        if(!($("#flag")[0].checked == true)){
            alert("请同意《美丽说注册条款》");
            return 0;  
        }
        if(inpObj.userName.hasVaild && inpObj.userPwd.hasVaild && inpObj.userConfirm.hasVaild){
            var username = $("#usr").val();
            var pwd = $("#pwd").val();
            var opt = {
                url:"http://localhost/meilishuo/php/user.php",
                type:"POST",
                data:{username:username,password:pwd,type:"register"}
            }
            $.ajax(opt)
            .then(function(res){
                console.log(res);
               if(res == "2"){
                $(".error_tip").html(`用户名已存在`);
                $(".error_tip").show();
                $("#usr").val("");
                $("#pwd").val("");
                $("#pwd-r").val("");
               }else if(res == "1"){
                window.location.href='http://localhost/meilishuo/login.html';
   
               }
            })
        }
    })
    
});