<?php
@$conn=mysql_connect("localhost","phpmyadmin","") or die("connect error");
@mysql_select_db("test",$conn) or die("select error");
mysql_query("set names utf8");
 /*链接数据库文件*/
?>