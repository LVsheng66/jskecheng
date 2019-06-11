<?php

header("content-type:text/html;charset=utf-8");

error_reporting(0);


$username =  $_POST['username'];
$age =  $_POST['age'];
$pasasword =  $_POST['password'];


echo "我的名字叫{$username} ，今年 {$age}岁了，我的密码是{$pasasword}";

