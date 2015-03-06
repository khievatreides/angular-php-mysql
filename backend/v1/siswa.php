<?php

$app->get('/siswa',function() use ($app){
    $db= new dbHandler();
    $column="sid,n_siswa,nis,kid";
    $table="siswa";
    $where="";

    $r=$db->select($table,$column,$where);

    if($r->num_rows > 0)
               {
                    $result = array();
                    while($row = $r->fetch_assoc())
                        {
                        $result[] = $row;
                        }
               }

    echoResponse(200,$result);
});

$app->post('/updatesiswa/:id',function($id) use($app){
    $sid=preg_replace("/[^A-Za-z0-9 ]/", '', $id);
    $r=json_decode($app->request->getBody());
    $n_siswa="'".$r->siswa->n_siswa."'";
    $nis=$r->siswa->nis;
    $kid="'".$r->siswa->kid."'";
    $db=new dbHandler();
    $table='siswa';
    $column=array('n_siswa','nis','kid');
    $value=array($n_siswa,$nis,$kid);
    $where=array("sid"=>$sid);

       $response=array();

    $r=$db->update($table,$column,$value,$where);
    if($r==1)
     {
              $response['status']="success";
              $response['message']="Profil siswa berhasil di update!";
     }
     echoResponse(200,$response);
});

$app->post('/insertsiswa',function() use($app){
    $r=json_decode($app->request->getBody());
        $n_siswa="'".$r->siswa->n_siswa."'";
        $nis=$r->siswa->nis;
        $kid="'".$r->siswa->kid."'";
        $db=new dbHandler();
        $response=array();
        $table="siswa";
        $column=array("sid","n_siswa","nis","kid");
        $values=array('',$n_siswa,$nis,$kid);

        $r=$db->insert($table,$column,$values);
             {
                      $response['status']="success!";
                      $response['message']="Data siswa Berhasil di Tambahkan!";
                      $response['sid']=$r;
             }
             echoResponse(200,$response);
});

$app->delete('/deletesiswa/:id',function($id) use ($app){
        $response=array();
        $sid=$id;
        $table="siswa";
        $where=array('sid'=>$sid);
        $db= new dbHandler();
        $r=$db->delete($table,$where);
        if($r==1)
        {
               $response['status']="success!";
               $response['message']="Siswa berhasil di hapus!";
        }
        echoResponse(200,$response);
});





?>