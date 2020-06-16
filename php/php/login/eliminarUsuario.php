<?php 

	include ("config.php");
	session_start();
	$response= array('success' => false, 'mensaje'=>"");

	$user=$_POST['usuario'];
	$sql="DELETE FROM usuario WHERE usuario='$user'";

	if($cx->query($sql) === TRUE) {
		$response['success']=true;
		$response['mensaje']="SE ELIMINO EXITOSAMENTE!!";
	}
	else
	{
		$response['success']=false;
		$response['mensaje']="ERROR AL ELIMINAR CUENTA";
	}

	echo json_encode($response); 	
 ?>