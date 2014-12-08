<?php   
   class DB{
   	  
	  static public function Query($sql){
	  	  $query = mysql_query($sql);
		  return $query;
	  }
	  
	  static public function fetch_array($sql){ //获取多行结果
	  	 $query = self::Query($sql);
		 $array = array();
		 while($row = mysql_fetch_array($query)){
		 	$array[] = $row;
		 }
		 return $array;
	  }
	  
	  static public function fetch_row($sql){ //获取一行结果
	  	$query = self::Query($sql);
		$row = mysql_fetch_array($query);
		return $row;
	  }
	  
	  static public function num_rows($sql){ //获取行数
	  	$query = self::Query($sql);
	  	$num = mysql_num_rows($query);
		return $num;
	  }
	  
	  static public function insert($table,$data,$debug = false){ //插入一行
	  	$fields    = array_keys($data);
		$fieldstr  = implode(",",$fields);
		$datastr   = "'".implode("','",$data)."'";
	  	$insertsql = "insert into ".$table." (".$fieldstr.") values (".$datastr.")";
		if(self::Query($insertsql)){
			$primary_key = self::_get_primary_key($table);
			$last_row = DB::fetch_row("select * from ".$table." where 1 order by ".$primary_key." desc limit 1");
			if($last_row)
			  return $last_row[$primary_key];
			else
			  return 0;
		}else{
			return $debug?$insertsql:0;
		}
	  }
	  
	  static public function update($table,$data,$condition,$debug = false){ //根据条件进行更新
	    $datasql = "";
		$conditionsql = "";
	  	foreach($data as $key=>$val){
	  		if(strstr($val,"`".$key."`")){//判断是否为字段的自增
	  			$datasql.=$key."=".$val." ,";
	  		}else{
	  			$datasql.=$key."='".$val."',";	
	  		}
	  	}
		$datasql = substr($datasql,0,strlen($datasql)-1); //去除字符串中的最后一个逗号
		
		$conditionsql = self::_deal_condition($condition);  //对条件进行处理
		
		$updatesql = "update ".$table." set ".$datasql." where ".$conditionsql;
		if(self::Query($updatesql))
			return $debug?$updatesql:1;
		else
			return $debug?$updatesql:0; 
	  }
	  
	 static public function delete($table,$condition,$debug = false){ //根据条件删除记录
	 	$conditionsql = "";
	 	$conditionsql = self::_deal_condition($condition);  //对条件进行处理
		$deletesql = "delete from ".$table." where ".$conditionsql;
		if(self::Query($deletesql))
			return 1;
		else
			return $debug?$deletesql:0; 
	  }
	 
	 static private function _deal_condition($condition){ //对传送的sql条件做判断
		$conditionsql = "";		
		$conditionsql2= "";
	 	foreach($condition as $key=>$val){
			if(is_array($val)){//判断是否为同一字段多个传值
				foreach($val as $key2 =>$val2)
					$conditionsql2.=$key."='".$val2."' or ";
			$conditionsql2 = substr($conditionsql2,0,strlen($conditionsql2)-4);
			$conditionsql.="(".$conditionsql2.")    ";
			}else
			    $conditionsql.=$key."='".$val."' and "; //仅支持and操作
		}
		$conditionsql = substr($conditionsql,0,strlen($conditionsql)-4);
		return $conditionsql;
	 }
	  
	  static private function _get_primary_key($table){ //获取表的主键名
		$query = self::Query("select * from ".$table);
		$fields_num =mysql_num_fields($query);
		for ($i=0; $i < $fields_num; $i++) {//遍历表字段
        	$flags = mysql_field_flags($query, $i);//查询字段标识
        	$name  = mysql_field_name($query, $i);//查询字段名称
        	if(strstr($flags,'primary_key'))//如果是主键
        		 return $name;

        }
	  }
	  
	  /*
	   * 开始一个事务
	   */
	  static public function begin(){
	  	
	  } 
	  
	  /*
	   * 回滚一个事务
	   */
	  static public function rollback(){
	  	
	  }
	  
	  /*
	   * commit一个事务
	   */
	  static public function commit(){
	  	
	  }
	  
   }
   
   
   
   
   
   
?>