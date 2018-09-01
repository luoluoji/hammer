<?php
	header("Content-type:text/html;charset=utf-8");
	
	$link = mysql_connect('localhost','root','root');
	if(!$link){
		echo '连接失败';
		exit;
	}
	$tel = $_POST['oTel'];
	$password = $_POST['oPassword'];
	mysql_set_charset('utf8');
	mysql_select_db('hammer');
	$sql = "INSERT INTO `hammer_reg`(`tel`, `password`) VALUES ($tel,$password)";
	$res = mysql_query($sql);
	var_dump($res);
	//var_dump($res);
	if($res){
		echo '注册成功';
		exit;
	}else{
		echo '失败';
	}
	mysql_close();
	/*$usename = $_POST['oUsername'];
	$password = $_POST['oPassword'];*/
?>
