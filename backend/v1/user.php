<?php
$app->get('/session',function(){
    $db = new dbHandler();
    $session =$db->getSession();
    echoResponse(200,$session);
});
$app->get('/getUserProfile/:id', function($id) use($app){
    $sid=preg_replace("/[^A-Za-z0-9 ]/", '', $id);
    $db= new dbHandler();
    $column="username,email,name,nik,phone,alamat,kota";
    $table='guru';
    $where=array('uid'=>$sid);

    $result=$db->select($table,$column,$where);

    echoResponse(200,$result->fetch_assoc());
});

$app->post('/updateUserProfile/:id',function($id) use ($app){
       $uid=preg_replace("/[^A-Za-z0-9 ]/", '', $id);
       $r=json_decode($app->request->getBody());
       $column=array('username','email','name','nik','phone','alamat','kota');
       verifyRequiredParams($column,$r->user);
       $table="guru";
       $username="'".$r->user->username."'";
       $email="'".$r->user->email."'";
       $name="'".$r->user->name."'";
       $nik=$r->user->nik;
       $phone=$r->user->phone;
       $alamat="'".$r->user->alamat."'";
       $kota="'".$r->user->kota."'";
        $where=array("uid"=>$uid);
       $value=array($username,$email,$name,$nik,$phone,$alamat,$kota);

        $db = new dbHandler();
        $response=array();
        $r=$db->update($table,$column,$value,$where);
        if($r==1)
        {
          $response['status']="success!";
          $response['message']="Profil Berhasil di update!";
        }
    echoResponse(200,$response);
});

$app->post('/updateUserPassword/:id',function($id) use ($app){

    $uid=preg_replace("/[^A-Za-z0-9 ]/", '', $id);
    $r=json_decode($app->request->getBody());
    $columnRequired=array('oldpassword','password','password2');
    verifyRequiredParams($columnRequired,$r->passwordModel);
    $column="password";
    $table="guru";
    $where=array("uid"=>$uid);
    $response=array();
    $db=new dbHandler();
    $password="'".$r->passwordModel->oldpassword."'";

    $result=$db->select($table,$column,$where);
    $result=$result->fetch_assoc();
    $dbPassword=$result['password'];


     require_once 'passwordHash.php';
    if(passwordHash::check_password($dbPassword,$r->passwordModel->oldpassword))
    {
               $newPassword = passwordHash::hash($r->passwordModel->password);
               $value=array("'".$newPassword."'");
               $column=array($column);
               $updatePass=$db->update($table,$column,$value,$where);
                  if($updatePass==1)
                  {
                    $response['status']="success!";
                    $response['message']="Profil Berhasil di update!";
                  }
    }
    else
    {
                $response['status']='error';
                $response['message']='Password lama anda salah!';
    }
    echoResponse(200,$response);
});


$app->post('/login',function() use ($app){
    require_once 'passwordHash.php';
    $r=json_decode($app->request->getBody());
    $columnRequired=array('email','password');
    verifyRequiredParams($columnRequired,$r->user);
    $response =array();
    $db=new dbHandler();
    $table="guru";
    $column="uid,name,nik,username,password,email";
        $email="'".$r->user->email."'";
    $password= "'".$r->user->password."'";
    $where=array("email"=>$email);
        $result=$db->select($table,$column,$where);
        $result=$result->fetch_assoc();
    if($result!=NULL)
    {

        if(passwordHash::check_password($result['password'],$r->user->password)){
            $response['status'] ='success';
            $response['message']='Login Sukses';
            $response['name']=$result['name'];
                if(!isset($_SESSION)){
                    session_start();
                }
            $_SESSION['uid']=$result['uid'];
            $_SESSION['name']=$result['name'];
        }
        else{
            $response['status']='error';
            $response['message']='Login Failed-password salah';
        }
    }
    else{
        $response['status']='error';
        $response['message']='Username atau email tidak terdaftar';
    }
    echoResponse(200,$response);
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

?>