<?php
	/*header("Content-type:text/html;charset=utf-8");
	
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
	mysql_close();*/
	/*$usename = $_POST['oUsername'];
	$password = $_POST['oPassword'];*/
	
header("Content-type:text/html;charset=utf-8");
$link = mysql_connect('localhost','root','root');
error_reporting(0);
if(!$link){
	echo '数据库链接失败';
	exit;
}
mysql_set_charset('utf8');
mysql_select_db('hammer');
$username = $_POST['oTel'];
$password = $_POST['oPassword'];
$sql = "SELECT * FROM hammer_reg WHERE tel=$username";
$res = mysql_query($sql);
//var_dump($res);
$arr = mysql_fetch_assoc($res);
//echo $arr[password];
if(!$arr){
	echo "用户名不存在";
	
}else{
	if($arr[password]==$password){
		echo "1";
	}else{
		echo "密码错误";
	}
}
?>
