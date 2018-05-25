define([
    'jquery'
], function() {

    $('.go-top').hide();        //隐藏go to top按钮
    $(window).scroll(function(){
        // console.log($(this).scrollTop());
        //当window的scrolltop距离大于1时，go to 
        if($(this).scrollTop() > 100){
            $('.go-top').fadeIn();
        }else{
            $('.go-top').fadeOut();
        }
        });

        $('.go-top').click(function(){
            $('html ,body').animate({scrollTop: 0}, 300);
        return false;
    });
    
    
});