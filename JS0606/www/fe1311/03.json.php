<?php

header("content-type:text/html;charset=utf-8");

error_reporting(0);

$array = array('小胡', '小妹', '小军');

echo json_encode($array);
