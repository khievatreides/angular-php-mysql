<?php

class dbhandler{
    private $conn;

    function __construct(){
        require_once 'db.php';
      $db= new dbConnect();
      $this->conn=$db->connect();
    }


/*Database Helper
select(select ($column) from ($table) where ($array));
insert(insert into($table) Values($array));
update(update ($table) set($column) where ($collumns array ))
delete(delete ($table) where($array));
*/

    public function select($table,$columns,$where){
        if(is_array($where)){
           foreach($where as $key => $value)
             {
                 $w=" AND " .$key." = ".$value." ";
             }
        }
        else
        {
            $w="";
        }
        $query="SELECT ".$columns." FROM ".$table." WHERE 1=1 ".$w;
        $r= $this->conn->query($query)or die($this->conn->error.__LINE__);
        return $r;
    }

    public function insert($table,$column,$values){
        $c="";
        $v="";
       foreach($values as $key =>$value)
            {
                if($value=='')
                {
                unset($values[$key]);
                unset($column[$key]);
                }
            }
            foreach($column as $key=>$value)
            {
               $c=$c.$value.',';
            }
            foreach($values as $key=>$value)
            {
               $v=$v.$value.',';
            }

         $c=rtrim($c,",");
         $v=rtrim($v,",");
         $query="INSERT INTO ".$table."(".$c.") VALUES (".$v.")";
         $r=$this->conn->query($query) or die($this->conn->error.__LINE__);
         return $this->conn->insert_id;

    }

    public function update($table,$column,$value,$where){

        $columnValue="";
        $whereVal="";
        $colVal=array_combine($column,$value);

        foreach($colVal as $key =>$value){
            $columnValue=$columnValue.$key."=".$value.",";
        }
        $v=rtrim($columnValue,",");
        foreach($where as $key => $value)
        {
            $whereVal="AND ".$key."=".$value;
        }
            $query="UPDATE ".$table." SET ".$v." WHERE 1=1 ".$whereVal;
            $r=$this->conn->query($query) or die($this->conn->error.__LINE__);
           return $r;
    }

    public function delete($table,$where){
        $w="";
        if(is_array($where)){
               foreach($where as $key => $value)
                 {
                     $w=" AND ".$key." = ".$value." ";
                 }
            }
            else
            {
                $w="";
            }
             $query="DELETE FROM ".$table." WHERE 1=1 ".$w;
             $r= $this->conn->query($query);
             return $r;
    }

    public function getSession(){
        if (!isset($_SESSION)) {
            session_start();
        }
        $sess = array();
        if(isset($_SESSION['uid']))
        {
            $sess["uid"] = $_SESSION['uid'];
            $sess["name"] = $_SESSION['name'];
        }
        else
        {
            $sess["uid"] = '';
            $sess["name"] = 'Guest';
        }
        return $sess;
    }

    public function destroySession(){
        if (!isset($_SESSION)) {
        session_start();
        }
        if(isSet($_SESSION['uid']))
        {
            unset($_SESSION['uid']);
            unset($_SESSION['name']);
            unset($_SESSION['nik']);
            $info='info';
            if(isSet($_COOKIE[$info]))
            {
                setcookie ($info, '', time() - $cookie_time);
            }
            $msg="Logged Out Successfully...";
        }
        else
        {
            $msg = "Not logged in...";
        }
        return $msg;
    }
}
?>