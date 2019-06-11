<?php

header("content-type:text/html;charset=utf-8");

error_reporting(0);

$array = array(
	 array('con' => '泰国总理选举结果出炉 巴育当选新一届政府总理', 'date' => '2019-6-5'),

	 array('con' => '印度拟从美国购买24架MH-60R直升机 可在航母使用', 'date' => '2019-6-3'),
	 array('con' => '华为被美列入"实体清单"后 多家美企下调营收预期', 'date' => '2019-6-7'),
	 array('con' => '又一纪检"内鬼"被双开:博士学历 33岁就当上教授', 'date' => '2019-6-6'),
	 array('con' => '暖新闻 火场浓烟中消防员将面罩让给老人', 'date' => '2019-6-1'),
	 array('con' => '5G牌照发放 专家:5G设备"批量供应"不成问题', 'date' => '2019-5-5'),
);

echo json_encode($array);



 










