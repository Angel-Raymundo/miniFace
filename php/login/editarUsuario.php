<?php

include "../config.php";
session_start();
$response = [
    'success' => false,
    'mensaje' => "",
    'us_usuario' => "",
    'us_nombre' => "",
    'us_password' => "",
    'us_foto' => "",
];
if ($_POST) {
    $user = $_POST['us_usuario'];
    $nombre = $_POST['nombre'];
    $pass_anterior = $_POST['password'];
    $pass1 = $_POST['new_password'];

    $type = explode('.', $_FILES['Image']['name']);
    $type = $type[count($type) - 1];
    $random = uniqid(rand());
    $url = '../../imagenes/' . $random . '.' . $type;
    //$url = 'https://redcecyto.000webhostapp.com/imagenes/'.$random.'.'.$type;
    $url2 = 'imagenes/' . $random . '.' . $type;

    $x = "SELECT * FROM usuario WHERE us_usuario='$user'";
    //echo $x;
    $p = $cx->query($x);
    $pr = $p->fetch_array();

    if ($pr['us_password'] != md5($pass_anterior)) {
        $response['success'] = false;
        $response['mensaje'] = "CONTRASEÑA ACTUAL NO COINCIDE";
    } else {
        if ($pass1 == "") {
            if ($_FILES['Image']['name'] == "") {
                $sql = "UPDATE usuario
				 SET 
				 us_nombre = '$nombre'
				 WHERE us_usuario= '$user'";
            } else {
                $sql = "UPDATE usuario
				 SET 
				 us_nombre = '$nombre',
				 us_foto='$url2'
				 WHERE us_usuario= '$user'";
            }
        } else {
            if ($_FILES['Image']['name'] == "") {
                $pass1 = md5($pass1);
                $sql = "UPDATE usuario
				 SET 
				 us_nombre = '$nombre',
				 us_password='$pass1'
				 WHERE us_usuario= '$user'";
            } else {
                $pass1 = md5($pass1);
                $sql = "UPDATE usuario
				 SET 
				 us_nombre = '$nombre',
				 us_foto='$url2',
				 us_password='$pass1'
				 WHERE us_usuario= '$user'";
            }
        }
        if ($_FILES['Image']['name'] != "") {
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
                    if (
                        move_uploaded_file($_FILES['Image']['tmp_name'], $url)
                    ) {
                        if ($cx->query($sql) === true) {
                            $pq = $cx->query(
                                "SELECT * FROM usuario WHERE us_usuario='$user'"
                            );
                            $row = $pq->fetch_array();
                            $response['success'] = true;
                            $response['mensaje'] = "SE ACTUALIZO CORRECTAMENTE";
                            $response['us_usuario'] = $row['us_usuario'];
                            $response['us_password'] = $row['us_password'];
                            $response['us_nombre'] = $row['us_nombre'];
                            $response['us_foto'] = $row['us_foto'];
                        } else {
                            $response['success'] = false;
                            $response['mensaje'] =
                                "Error no se ha podido guardar";
                        }
                    } else {
                        return false;
                    }
                }
            }
        } else {
            if ($cx->query($sql) === true) {
                $pq = $cx->query(
                    "SELECT * FROM usuario WHERE us_usuario='$user'"
                );
                $row = $pq->fetch_array();
                $response['success'] = true;
                $response['mensaje'] = "SE ACTUALIZO CORRECTAMENTE";
                $response['us_usuario'] = $row['us_usuario'];
                $response['us_password'] = $row['us_password'];
                $response['us_nombre'] = $row['us_nombre'];
                $response['us_foto'] = $row['us_foto'];
            } else {
                $response['success'] = false;
                $response['mensaje'] = "Error no se ha podido guardar";
            }
        }
    }
} else {
    $response['success'] = false;
    $response['mensaje'] = "No se guardo correctamente";
}
echo json_encode($response);
?> 