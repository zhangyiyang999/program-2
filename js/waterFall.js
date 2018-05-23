define(["jquery"], function() {
    function WaterFall(url,main_selector){
        if(!url || !main_selector) return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init();
    }
    WaterFall.prototype = {
        constructor:WaterFall,
        init(){
            //页数;
            this.page = 1;
            this.load_data()
            .then(function(res){
                //回调结果;
                //console.log(res.data.list);
                this.json = res.data.list;
                this.page = res.data.nextPage -1;
                
                this.render_page();
                this.sort_item();
            }.bind(this))
            .fail(function(def,type,err_msg){
                
            })
            $(document).on("scroll",$.proxy(this.is_load,this))

        },
        load_data(){
            this.opt = {
                url:this.url,
                dataType:"jsonp",
                data:{page:this.page},
                statusCode: {
                    404: function() {
                        alert('page not found');
                    }
                }
            };
            return $.ajax(this.opt)
        },
        render_page(){
            //拼接字符串!;
            this.html = "<ul>";
            this.json.forEach(function(item){
                // console.log(item);
                this.html +=   `<div class="wrap_box">
                                    <a class="pic_box"><img src=${item.image}></a>
                                    <div class="wrap_box_bottom">
                                        <div class="part">
                                            <div class="price">￥${item.discountPrice}</div>
                                            <div class="collect">
                                                <i class="fa fa-star-o"></i>${item.itemSale}
                                            </div>
                                        </div>
                                        <a class="title" data-id=${item.itemLikes} data-page=${this.page} href="http://localhost/meilishuo/program-2/commodity_details.html" ><i class="icon_select"></i>${item.title}</a>
                                    </div>
                                </div>`
            }.bind(this))
            this.html += "</ul>";
            // console.log(this.html);
            this.main_ele.html(this.main_ele.html() + this.html);
            
        },
        
        load_err(){
            alert("对不起报错了!");
        },
        is_load(){
            this.scrollTop = $("html,body").scrollTop();
            this.clientHeight = document.documentElement.clientHeight;
            this.lastTop = this.main_ele.find(".wrap_box").eq(this.main_ele.find(".wrap_box").length - 1).offset().top;
            this.loading = false; //是否符合加载条件;
            if(this.scrollTop + this.clientHeight >= this.lastTop){
                this.loading = true;
            }
           // console.log(this.scrollTop,this.clientHeight,this.lastTop)
            if(!this.loading || this.loading_msg) return 0 ;
            
            // console.log("加载次数",this.loading,this.loading_msg);
            this.loading_msg = true; //是否正在加载数据如果加载数据那么不执行其余代码;
            this.page ++;
            this.load_data()
            .then(function(res){
                this.json = res.data.list;
                this.render_page();
                this.loading_msg = false;
            }.bind(this))
            
        },
        bangding(){
            
        }
    }
    return WaterFall;
});