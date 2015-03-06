<?php

class dbConnect{
    private $conn;
    const DB_hostname='localhost';
    const DB_user='root';
    const DB_password='';
    const DB_db='asistant';
    function __construct(){
    }

    function connect(){
        $this->conn=new mysqli(self::DB_hostname,self::DB_user,self::DB_password,self::DB_db);
        return $this->conn;
    }

}
?>