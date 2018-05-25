define([
    'jquery',
    'jqueryCookie'
], function(){
    var shopCarString = $.cookie("shopCar");
    var shopCarArray = JSON.parse(shopCarString);
    shopCarArray.forEach(function(item){
        var opt={
            url:"http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",
            dataType:"jsonp",
            data:{page:item.page},
            statusCode: {
                404: function() {
                    alert('page not found');
                }
            }
        };
        $.ajax(opt)
        .then(function(res){
            var json = res.data.list;
            json.forEach(function(item1){
                // console.log(item.itemLikes);
                if(item1.itemLikes== item.id ){
                  var html = "";
                  html+=`<tr class="cart_mitem">
                            <td class="vm ">
                                <input type="checkbox" class="cart_thcheck"> </td>
                            <td class="cart_table_goods_wrap">
                                <!-- 商品 -->
                                <a href=""  class="cart_goods_img">
                                    <img class="cartImgTip" src=${item1.image}
                                        width="78" height="78" alt="${item1.title}"> </a>
                                <!-- 商品title -->
                                <a class="cart_goods_t cart_hoverline" title="${item1.title}"> ${item1.title} </a>
                                
                            </td>
                            <td>
                                <p class="cart_lh20">颜色：黑色</p>
                                <p class="cart_lh20">尺码：均码</p>
                            </td>
                            <td class="cart_alcenter ">
                                <!-- 单价 -->
                                <p class="cart_lh20 cart_throughline cart_lightgray">${item1.price}</p>
                                <p class="cart_lh20 cart_bold cart_data_sprice" >${item1.discountPrice}</p>
                                <p>
                                    <span class="cart_tip_yellow cart_tip_focuswidth">限量促销</span>
                                </p>
                            </td>
                            <td class="cart_alcenter">
                                <!-- 数量 -->
                                <div>
                                    <div class="cart_num cart_counter" >
                                        <input type="text" class="cart_num_input cart_bold" maxlength="3" value="${item.num}">
                                        <span class="cart_num_add">+</span>
                                        <span class="cart_num_reduce disable">-</span>
                                    </div>
                                </div>
                            </td>
                            <td class="cart_alcenter xiaoji">
                                <!-- 小计 -->
                                <p class="cart_deep_red cart_font16 item_sum" data-id="${item1.discountPrice}">${parseFloat(Number(item.num*item1.discountPrice).toFixed(2))}</p>
                            </td>

                            <td class="cart_alcenter">
                                <!-- 操作 -->
                                <a href="javascript:;" class="cart_hoverline delete">删除</a>
                            </td>
                        </tr> `;
                    $("tbody").html( $("tbody").html()+html);  
                }
               
            }) 
            // 全选功能
            $(".s_all").click(function() { 
                if (this.checked == true) {
                    var price = 0 ;  
                    $(".s_all_slave")[0].checked = true;
                    $(".cart_thcheck").each(function() { 
                        this.checked = true;   
                        // console.log($(this).parent().siblings(".xiaoji"));1
                        price += Number($(this).parent().siblings(".xiaoji").find(".item_sum").html());
                    }); 
                    $(".cart_paybar_info_cost").html(price);
                }else{
                    $(".s_all_slave")[0].checked = false;
                    $(".cart_thcheck").each(function() { 
                        this.checked = false;   
                    }); 
                    $(".cart_paybar_info_cost").html("0.00");
                }
            })
            $(".s_all_slave").click(function () {
                if (this.checked == true) {
                    var price = 0;
                    $(".s_all")[0].checked = true;
                    $(".cart_thcheck").each(function () {
                        this.checked = true;
                        // console.log($(this).parent().siblings(".xiaoji"));1
                        price += Number($(this).parent().siblings(".xiaoji").find(".item_sum").html());
                    });
                    $(".cart_paybar_info_cost").html(price);
                } else {
                    $(".s_all")[0].checked = false;
                    $(".cart_thcheck").each(function () {
                        this.checked = false;
                    });
                    $(".cart_paybar_info_cost").html("0.00");
                }
            })
            $.each($(".cart_num_add"),function(index,item){   
                $(item).on("click",function() {
                    $(this).siblings(".cart_num_input")
                           .val(Number($(this).siblings(".cart_num_input").val()) + 1);
                    var danjia = Number($(this).parent().parent().parent().siblings().siblings(".xiaoji").find(".item_sum").attr("data-id"))
                    $(this).parent().parent().parent().siblings(".xiaoji").find(".item_sum").html(parseFloat(danjia * (Number($(this).siblings(".cart_num_input").val()))).toFixed(2));
                })
            })
            $.each($(".cart_num_reduce"), function (index,item) {
                $(item).on("click", function () {
                    if ($(this).siblings(".cart_num_input").val() <= 0){
                        return 0 ;
                    }
                    $(this).siblings(".cart_num_input")
                        .val(Number($(this).siblings(".cart_num_input").val()) - 1);
                    var danjia = Number($(this).parent().parent().parent().siblings().siblings(".xiaoji").find(".item_sum").attr("data-id"))
                    $(this).parent().parent().parent().siblings(".xiaoji").find(".item_sum").html(parseFloat(danjia * (Number($(this).siblings(".cart_num_input").val()))).toFixed(2));
                })
            })
            $.each($(".cart_thcheck"),function(index,item){
                $(item).on("click", function () {
                    if (this.checked === false) {
                        var zhongjia = Number($(".cart_paybar_info_cost").html());
                        var xiaoji = Number($(this).parent().siblings(".xiaoji").find(".item_sum").html());
                        $(".cart_paybar_info_cost").html(zhongjia-xiaoji);
                    } else if (this.checked === true){
                        var zhongjia = Number($(".cart_paybar_info_cost").html());
                        var xiaoji = Number($(this).parent().siblings(".xiaoji").find(".item_sum").html());
                        $(".cart_paybar_info_cost").html(zhongjia+xiaoji);
                    }
                })
            })
        })
    })
    
});