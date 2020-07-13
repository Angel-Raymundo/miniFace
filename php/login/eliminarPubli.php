<?php

include "../config.php";
session_start();
$response = ['success' => false, 'mensaje' => ""];

$pu_id = $_POST['pu_id'];
$sql = "DELETE FROM publicacion WHERE pu_id='$pu_id'";

if ($cx->query($sql) === true) {
    $response['success'] = true;
    $response['mensaje'] = "SE ELIMINO EXITOSAMENTE!!";
} else {
    $response['success'] = false;
    $response['mensaje'] = "ERROR AL ELIMINAR PUBLICACION";
}

echo json_encode($response);
?>
