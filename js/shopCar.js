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
                            <td class="cart_alcenter">
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
                                        <span class="cart_num_add"></span>
                                        <span class="cart_num_reduce disable"></span>
                                    </div>
                                </div>
                            </td>
                            <td class="cart_alcenter">
                                <!-- 小计 -->
                                <p class="cart_deep_red cart_font16 item_sum">${item.num*item1.discountPrice}.00</p>
                            </td>

                            <td class="cart_alcenter">
                                <!-- 操作 -->
                                <a href="javascript:;" class="cart_hoverline delete">删除</a>
                            </td>
                        </tr> `;
                    $("tbody").html( $("tbody").html()+html);  
                }
               
            }) 
                $(".s_all").click(function() { 
                    
                    if (this.checked == true) {   
                    $(".cart_thcheck").each(function() { 
                        console.log( $(".cart_thcheck"));  
                        this.checked = true;   
                    }); 
                }
            })
        })
    })
    
});