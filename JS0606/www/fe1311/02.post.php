<?php

header("content-type:text/html;charset=utf-8");

error_reporting(0);

$user = $_POST['username'];
$age = $_POST['age'];
$job = $_POST['job'];

echo "我的名字 {$user}, 今年{$age} 岁了,我是一名{$job}工程师";

