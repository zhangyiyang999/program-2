<?php
    header("Access-Control-Allow-Origin:*");
    /*
        username => 字段涵义 ; 前端发送给我的用户名信息;
    */
    //1.登陆;
    //2.注册;
    $usr = $_POST["username"];
    $pwd = $_POST["password"];
    $type = $_POST["type"];  //判断是登录还是注册
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what are u doing!");
        die(json_encode($res));
    }
    //和数据库建立连接
    require("./_connect.php");
    //把传过来的密码使用md5加密
    $pwd = md5($pwd);
    //根据不同情况进行不同判断;然后执行不同sql语句
    $sql_login = "SELECT username,pwd FROM user_list";
   
    $sql_register = "INSERT user_list(
        username,pwd
    )
        VALUES 
    ('{$usr}','{$pwd}')
    ";
    $result_login = $conn->query($sql_login);
    
    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;
    $haspwd = FALSE;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){
        //array("username"=>yanghuaizhi,"pwd":"123456")
        if($row["username"] == $usr){
            $hasuser = TRUE;
            //如果是注册，没必要判断密码;
            if($type == "register"){
                break;
            }
            if($row["pwd"] == $pwd){
                $select_res = json_encode($row);
                $haspwd = TRUE;
                break;
            }
        }
    }

    if($type == "login" &&  $haspwd == TRUE){
        //用户名密码都对，登录成功
        die($select_res);
    }else if($type == "login"){
        //登录失败
        die("0");
    }

    if($type == "register" && $hasuser == TRUE){
        //用户名重名; => 2;
        die("2");
    }else if($hasuser == FALSE){
        //注册成功成功;
        if($type == "register"){
            $result_register = $conn->query($sql_register);
        }
        die("1");
    }

    echo $hasuser;

    //返回结果判定是那种操作在执行;
    // echo $hasuser;
    // echo $select_res;
?>