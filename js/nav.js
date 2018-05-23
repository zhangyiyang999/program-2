define([
    'jquery'
], function() {
   function SecondMenu(ele){
    this.ele = $(ele);
    if(this.ele == 0) return 0;
    this.init();
   }
   SecondMenu.prototype ={
       constructor:SecondMenu,
       init(){
        this.list = this.ele[0].children[0].children;
        for(var i=0;i<this.list.length;i++){
            console.log($(this.list[i]));
            $(this.list[i]).mouseover(function (){ 
              $(this.children[1]).show()
            })
            .mouseout(function (){  
                $(this.children[1]).hide();  
            });  
            // $(this.list[i]).on("mouseover",$.proxy(this.showSecondMenu(this.list[i].children[1]),this))
            // $(this.list[i]).on("mouseout",$.proxy(this.hideSecondMenu(this.list[i].children[1]),this)) 
        }
    }
    //    },
    //    showSecondMenu(obj){
    //        console.log(obj);
    //     $(obj).show();
    //    },
    //    hideSecondMenu(obj){
    //     $(obj).hide();

    //    }
   }
    return SecondMenu;
});