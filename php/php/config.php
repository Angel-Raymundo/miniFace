<?php 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	$server="localhost";
/*	
    $user="root";
	$pass="";
	$bd="blog";
	*/
	
	$user="id14020411_root";
	$pass="USRI-*8WDz^G@dDT";
	$bd="id14020411_rececyto";
	
	$cx=mysqli_connect($server,$user,$pass,$bd);



 ?>