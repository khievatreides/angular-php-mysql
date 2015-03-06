<?php

require_once "dbHandler.php";
$db= new dbHandler();




$table="siswa";
$column="kid,n_siswa";

$parameter=array("sid"=>"23");
$w="";



//select example
//$query =$db->select($table,$column,$parameter);

$c="";
$v="";
$column=array("sid"=>"","n_siswa"=>"'I Wayan Ryandi'","nis"=>"22094799","kid"=>"13");
foreach($column as $key=>$values){
    if($values==""){
        continue;
    }
    else
    {
        $c=$c.$key.",";
        $v=$v.$values.",";

    }
}
$c=rtrim($c,",");
$v=rtrim($v,",");

//insert example
//$query =$db->insert($table,$c,$v);


//update example
$columnValue="";
$sid=24;
$whereVal="";
$where=array("sid"=>"24");
$columnVal=array("n_siswa"=>"'reyka'","nis"=>"22154757");

foreach($columnVal as $key =>$value){
    $columnValue=$columnValue.$key."=".$value.",";
}
$v=rtrim($columnValue,",");
foreach($where as $key => $value)
{
    $whereVal="AND ".$key."=".$value;
}

//echo $columnValue;
//$query =$db->update($table,$v,$whereVal);


//deleteExample
//$query=$db->delete($table,$whereVal);
//print_r($query->fetch_assoc());

  /*$column=array("sid","n_siswa","nis","kid");
        $values=array('','komang','ade','xB');
          foreach($values as $key =>$value)
            {
                if($value=='')
                {
                $indexnull[]=$key;
                }

            }
           print_r($indexnull);

        foreach($indexnull as $key){
           unset($column[$key]);
        }
*/

$column=array("sid","n_siswa","nis","kid");
        $values=array('',"reyka","22094757","xB");
        foreach($values as $key =>$value)
        {
            if($value=='')
            {

            unset($values[$key]);
                unset($column[$key]);
            }

        }
           $c="";
                $v="";
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

         echo $v;

?>