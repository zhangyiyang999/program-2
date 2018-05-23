define([
    'jquery',
    'jqueryCookie'
], function(){
    $(function(){
        // console.log($.cookie('id'));
        var opt={
            url:"http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",
            dataType:"jsonp",
            data:{page:$.cookie('page')},
            statusCode: {
                404: function() {
                    alert('page not found');
                }
            }
        };
        $.ajax(opt)
        .then(function(res){
            var json = res.data.list;
            var page = res.data.nextPage-1;
            json.forEach(function(item){
                // console.log(item.itemLikes);
                if(item.itemLikes== $.cookie('id') ){
                    $(".commodity_title").html(item.title);
                    $(".property-cont-origin").html(item.price);
                    $(".property-cont-now").html(item.discountPrice);
                    $(".big_img img")[0].src=`${item.image}`;
                    $(".goods-stock a").html(item.itemSale);
                    $(".large_img img")[0].src=`${item.image}`;
                    $(".bigImg_garybox").css({
                        "backgroundImage":`url(${item.image})`
                    });


                    // console.log( $(".goods-stock a").html())
                    // $('div').data( " data-zidingyi"  ，“dig”)　
                    $(".add_car").attr("data-id",item.itemLikes);
                    $(".add_car").attr("data-page",page);
                    
                }
            }) 
        })
        $(".commodityNum-add").on("click",function(){
            if(Number($(".commodityNum-input").val()) >= Number($(".goods-stock a").html())){
                $(".goods-stock-tip").show();
                return 0
            };
            $(".commodityNum-input")
           .val(Number($(".commodityNum-input").val())+1);
        })
        $(".commodityNum-reduce").on("click",function(){
            if(Number($(".commodityNum-input").val())<=1)return 0;
            if(Number($(".commodityNum-input").val())<= Number($(".goods-stock a").html())){
                $(".goods-stock-tip").hide();
            }
            $(".commodityNum-input")
            .val(Number($(".commodityNum-input").val())-1);
         })
         $(".commodityNum-input").on("change",function(){
            if(Number($(".commodityNum-input").val()) >= Number($(".goods-stock a").html())){
                $(".goods-stock-tip").show();
            }else{
                $(".goods-stock-tip").hide();
            };
         })
        //  传输商品Id到cookie
         $(".add_car").on("click",function(){
             var goodsId = $(this).attr("data-id");
             var goodsPage = $(this).attr("data-page");
             var goodsNum = Number($(".commodityNum-input").val());
            
             if(!$.cookie("shopCar")){
                //表示是第一次存数据;
                var shopCarArray = [
                    {
                        id:goodsId,
                        num:goodsNum,
                        page:goodsPage
                    }
                ]
           
                $.cookie("shopCar",JSON.stringify(shopCarArray));
                // console.log($.cookie("shopCar"));
                return 0;
            }
            // decodeURIComponent("%5B%7B%22id%22%3A%2219151%22%2C%22num%22%3A7%2C%22page%22%3A%221%22%7D%5D")
            var shopCarString = $.cookie("shopCar");
            var shopCarArray = JSON.parse(shopCarString);
            var hasItem = false;
            shopCarArray.forEach(function(item){
                if(item.id == goodsId){
                    item.num += goodsNum;
                    hasItem = true ;
                }
            })
            if(!hasItem){
                var item = {
                    id:goodsId,
                    num:goodsNum,
                    page:goodsPage
                }
                shopCarArray.push(item)
            }
            $.cookie("shopCar",JSON.stringify(shopCarArray));
            console.log( $.cookie("shopCar"));
         })
         $(document).scroll(function() {
            if($(document).scrollTop() >=1015){
                $(".commodityContentShop_hd").css({
                    "position":"fixed",
                    "top":0
                })
                $(".commodityContentShop_hide").show();
                $(".top_hidden").show();
                $(".commodityContentMiddle_top").css({
                    "position":"fixed",
                    "top":0
                })
                $(".commodityContent_right .cart-hd").css({
                    "position":"fixed",
                    "top":0
                })
                $(".commodityContent_right .extranav-bd").css({
                    "position":"fixed",
                })
            }else{
                $(".commodityContentShop_hd").css({
                    "position":"static",
                    "top":0
                })
                $(".commodityContentShop_hide").hide();
                $(".top_hidden").hide();
                $(".commodityContentMiddle_top").css({
                    "position":"static",
                    "top":0
                })
                $(".commodityContent_right .cart-hd").css({
                    "position":"absolute",
                    "top":0
                })
                $(".commodityContent_right .extranav-bd").css({
                    "position":"absolute",
                })
            }
          })
          $(".commodityContentMiddle_top ul li.qrcode").hover(function(){
            $(".commodityContentMiddle_top ul li.qrcode .qrcode-pic").show();
          },function(){
            $(".commodityContentMiddle_top ul li.qrcode .qrcode-pic").hide();
          })
    })
    
});