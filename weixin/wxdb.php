<?php
include('../conn.php');
include ('../db.php');

class WXDB{

	//返回多行符合条件的结果，数组形式
	static public function getSomething($something, $table, $condiction="")
	{
		$sql = "select {$something} from {$table} {$condiction}";

		//echo "getSomething: ".$sql."<br/>";
		//print_r(DB::fetch_array($sql));
		return DB::fetch_array($sql);
	}
	
	//返回true是表明操作成功，false则不成功
	static public function updateSomething($something, $table, $condiction){
		$sql = "update {$table} set {$something} {$condiction}";
		return DB::Query($sql);
	}
	
	//返回true则表明操作成功，false则不成功
	static public function deleteOne($table, $condiction){
		$sql = "delete from {$table} {$condiction}";
		return DB::Query($sql);
	}
	
	static public function addOne($table, $someColumns, $values){
		$sql = "insert into {$table} ($someColumns) values ({$values})";
		//echo $sql;
		return DB::Query($sql);
	}
}
?>