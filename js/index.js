define(["jquery","waterFall","jqueryCookie"], function($,WaterFall){
    new WaterFall("http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",".main_wrap")
  
    $('.main_wrap').on('click', '.wrap_box', function(ev) {   
       var cookieId = $(this).children().eq(1).children().eq(1).attr("data-id");
       var cookiePage = $(this).children().eq(1).children().eq(1).attr("data-page");
       $.cookie('id', cookieId); 
       $.cookie('page', cookiePage); 
    })
   
    
}); 