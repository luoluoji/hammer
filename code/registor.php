<?php
	header("Content-type:text/html;charset=utf-8");
	
	$link = mysql_connect('localhost','root','root');
	if(!$link){
		echo '连接失败';
		exit;
	}
	$usename = $_POST['oUsername'];
	mysql_set_charset('utf8');
	mysql_select_db('hammer');
	$sql = "SELECT * FROM `hammer_reg` WHERE tel='$usename'";
	$res = mysql_query($sql);
	$row = mysql_fetch_array($res);
	//var_dump($row);
	//var_dump($res);
	if($row){
		echo '已存在';
		exit;
	}else{
		echo '可用';
	}
	mysql_close();
	/*$usename = $_POST['oUsername'];
	$password = $_POST['oPassword'];*/
?>