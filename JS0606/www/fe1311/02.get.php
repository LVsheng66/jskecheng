<?php

header("content-type:text/html;charset=utf-8");

error_reporting(0);

$user = $_GET['username'];
$age = $_GET['age'];
$job = $_GET['job'];

echo "我的名字 {$user}, 今年{$age} 岁了,我是一名{$job}工程师";

