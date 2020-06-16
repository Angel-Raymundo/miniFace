<?php 

	include ("../config.php");
	$response= array('success' => false, 'mensaje' => "", 'us_nombre' => "", 'us_foto' => "", 'us_id' => "");

	$user=$_POST['user'];
	$password=md5($_POST["password"]);

	$sql="SELECT * FROM usuario WHERE us_usuario='$user' AND us_password='$password'";

	$r=$cx->query($sql);
	$count=$r->num_rows;

	$row=$r->fetch_array();
	
	if($count>0)
	{
		$response['success']=true;
		$response['us_nombre']=$row['us_nombre'];
		$response['us_foto']=$row['us_foto'];
		$response['us_id']=$row['us_id'];
	}
	else
	{
		$response['success']=false;
		$response['mensaje']="CORREO Y/O CONTRASEÑA INCORRECTA";
	}
echo json_encode($response); 	
 ?>