<?php

include "../config.php";
session_start();
$response = [
    'success' => false,
    'us_usuario' => "",
    'us_nombre' => "",
    'us_password' => "",
    'us_foto' => "",
    'us_id' => "",
];

$user = $_POST['usuario'];
$sql = "SELECT * FROM usuario WHERE us_usuario='$user'";

$r = $cx->query($sql);
$row = $r->fetch_array();

$response['success'] = true;
$response['us_usuario'] = $row['us_usuario'];
$response['us_password'] = $row['us_password'];
$response['us_nombre'] = $row['us_nombre'];
$response['us_foto'] = $row['us_foto'];
$response['us_id'] = $row['us_id'];

echo json_encode($response);
?>
