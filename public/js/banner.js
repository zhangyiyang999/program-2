	//console.log($);
 var bannerplay= function(box,hiddenblock,displayblock,lilength,auto,position,leftbtn,rightbtn){
 	              //外部盒子，隐藏区块，显示区块，li长度，是否自动播放，轮播图上下还是左右，
 	              //左右切换按钮
                var index = 0;
	    		var position;    		    		
	    		//分三种情况    	
	    	    switch(position){
	    	    	case 2://显示第一个，竖排自动轮播，没有上下切换,（可以不用定位）
	    	    	hiddenblock.eq(0).show();	//显示第一张图片
	    		    displayblock.eq(0).addClass("active");
	    	    	displayblock.hover(function(){
	    	    		index=$(this).index();  //定义底部数字索引值
	    	    		hideplay();
	    	    	});
	    	    	autoplay(auto,moveS);
                    break;
	    	    	case 1://竖排导航,不显示第一个
	    	    	displayblock.hover(function(){//经过显示区块
	    	    		
	    			index=$(this).index();  //定义底部数字索引值
	    			hideplay();//显示区块加样式，并显示隐藏区块
	    		},function(){   //没有经过显示区块
	    			index=$(this).index();  //定义底部数字索引值
                    hiddenblock.hover(function(){//在隐藏区块
	    				  hideplay();
                    },function(){
	    			     remove();
                    });
                    remove();
	    		});
	    	    	break;
	    	    	case 0://横排轮播图（必须定位）
	    	    	hiddenblock.eq(0).show();	//显示第一张图片
	    		    displayblock.eq(0).addClass("active");	//第一张图片底部相对应的数字列表添加active类
	    	    	//alert("成功")
	    	    	displayblock.hover(function(){
	    			index=$(this).index();  //定义底部数字索引值
	    			fadeplay();
	    		});
                    onlybanner();
	    	    	break;	
	    	    }//switch语句结束
	    	    function onlybanner(){

	    		  //左按钮点击事件
	    		  leftbtn.click(function(){
	    			  moveL();	//点击左键调用向左切换函数
	    		  })
	    		  //右按钮点击事件
	    		  rightbtn.click(function(){
	    			  move();    //点击右键调用向右切换函数
	    		  })
	    		    autoplay(auto,move);
	    	    }//onlybanner函数结束

	    	     //向左切换函数
	    	     function moveL(){
	    			index--;
	    			
	    			//if(index==-1)index=lilength-1;  //如果这是第一张图片再按向左的按钮则切换到最后一张图
	    			index %= (-lilength);
	                 fadeplay();
	    		 }
	    		 //向右切换函数
	    		 function move(){
	    			index++;
                    index %= lilength;
	    			fadeplay();
	    		 }
	    		 function moveS(){//竖向轮播
	    			index++;
                    index %= lilength;
	    			hideplay();
	    		 }
	    		 //自动播放函数
                 function autoplay(auto,move){
	    		     //自动控制图片轮播
	    		     if(auto==false){
	    		     	return false;
                        }else{
	    		     var t=setInterval(move,4000);  //设置定时器，1.5秒切换下一站轮播图
	    		     //定时器开始与结束
	    		     box.hover(function(){
	    			 clearInterval(t);	//鼠标放在轮播区域上时，清除定时器
	    		     },function(){
	    			  t=setInterval(move,4000);  //鼠标移开时定时器继续
	    		    })
	    		     }
	    	      }
	    	    function remove(){
	    	    	displayblock.eq(index).removeClass("active");//移去显示区块样式
	    		    hiddenblock.eq(index).hide(); //隐藏 隐藏区块
	    	    }
	    	    function fadeplay(){
	    			displayblock.eq(index).addClass("active").siblings().removeClass("active"); 
	    			 //鼠标在哪个数字上那个数字添加class为active
	    			hiddenblock.eq(index).stop().fadeIn(1000).siblings().stop().fadeOut(1000);	
	    			//鼠标移动到的数字上显示对应的图片
	    		}
	    		function hideplay(){
	    			displayblock.eq(index).addClass("active").siblings().removeClass("active");
	    			  //鼠标在哪个数字上那个数字添加class为active
	    			hiddenblock.eq(index).stop().show().siblings().stop().hide();
	    				//鼠标移动到的数字上显示对应的图片
	    		}  
	    		
	    	};
	  
