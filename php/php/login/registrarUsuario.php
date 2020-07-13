<?php

include "../config.php";
$valid['success'] = ['success' => false, 'mensaje' => []];
if ($_POST) {
    $user = $_POST['email'];
    $password = md5($_POST["password"]);
    $nombre = $_POST['nombre'];
    $type = explode('.', $_FILES['Image']['name']);
    $type = $type[count($type) - 1];
    $random = uniqid(rand());
    //$url = '../../imagenes/'.$random.'.'.$type;
    $url = $_SERVER['DOCUMENT_ROOT'] . '/imagenes/' . $random . '.' . $type;
    $url2 = 'imagenes/' . $random . '.' . $type;

    $sql_ver = "SELECT * FROM usuario WHERE us_usuario='$user'";
    $r = $cx->query($sql_ver);

    if ($r->num_rows > 0) {
        $valid['success'] = false;
        $valid['mensaje'] = "CORREO NO DISPONIBLE";
        echo json_encode($valid);
    } else {
        if (
            in_array($type, [
                'gif',
                'jpg',
                'jpeg',
                'png',
                'JPG',
                'GIF',
                'JPEG',
                'PNG',
            ])
        ) {
            if (is_uploaded_file($_FILES['Image']['tmp_name'])) {
                if (move_uploaded_file($_FILES['Image']['tmp_name'], $url)) {
                    $sql_insertar = "INSERT INTO usuario VALUES( NULL,'$user','$password','$nombre','$url2')";
                    if ($cx->query($sql_insertar) === true) {
                        $valid['success'] = true;
                        $valid['mensaje'] = "Registro exitosamente";
                    } else {
                        $valid['success'] = false;
                        $valid['mensaje'] = "Error no se ha podido guardar";
                    }
                } else {
                    return false;
                }
            }
        }
        $cx->close();
        echo json_encode($valid);
    }
} else {
    $valid['success'] = false;
    $valid['mensaje'] = "No se guardo correctamente";
    echo json_encode($valid);
}
?>
