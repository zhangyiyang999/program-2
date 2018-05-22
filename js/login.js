define([
    'jquery',
    'jqueryCookie'
], function() {
    $("#login").on("click",function(){
        var username = $("#usr").val();
        var pwd = $("#pwd").val();
        var opt = {
            url:"http://localhost/meilishuo/php/user.php",
            type:"POST",
            data:{username:username,password:pwd,type:"login"}
        }
        $.ajax(opt)
        .then(function(res){
            if(res == 0){
                $(".error_tip").show();
                $("#usr").val("");
                $("#pwd").val("");
            }else{
                $.cookie('username', username); 
                window.location.href='http://localhost/meilishuo/index.html';
            }
        })
    })
    $(".regist").on("click",function(){
        window.location.href='http://localhost/meilishuo/register.html';
    })
    
});