<?php

include "../config.php";
session_start();
$valid['success'] = ['success' => false, 'mensaje' => []];
if ($_POST) {
    $pub = $_POST['publicacion'];
    $us_id = $_POST['us_id'];
    $sql_insertar = "INSERT INTO publicacion VALUES( NULL,'$pub',null,'$us_id')";
    if ($cx->query($sql_insertar) === true) {
        $valid['success'] = true;
        $valid['mensaje'] = "Publicado exitosamente";
    } else {
        $valid['success'] = false;
        $valid['mensaje'] = "Error no se ha podido guardar";
    }
    $cx->close();
    echo json_encode($valid);
} else {
    $valid['success'] = false;
    $valid['mensaje'] = "No se guardo correctamente";
    echo json_encode($valid);
}
?>
