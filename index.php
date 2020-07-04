<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Red Social con PHP</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/estilinis.css">
  <link rel="stylesheet" href="assets/css/estilos.css">
</head>

<body onload="checarIndex()">
  <nav>           
    <label class="logo">Mini Face</label>
  </nav>
  <div class="container">
    <div class="row" >
      <div class="login-wrap">

        <div class="text-center">
          <img src="assets/images/user3.png" alt="" class="img-fluid mb-4 mb-md-0">
        </div>

        <h3 class="text-center">INICIAR SESIÓN</h3>
        <div id="msj_login"></div>

        <form action="" class="form-horizontal" method="post" autocomplete="off">
          <div class="form-group">
            <label for="email">Usuario</label>
            <input type="email" name="email" id="email" class="form-control" placeholder="Introduce usuario">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Introduce password">
          </div>
          <div class="form-group">
            <input type="button" class="form-control btn btn-primary" value="Entrar" onclick="loginUsuario()">
          </div>

          <div class="form-group">
            <a href="registrar.html" class="form-control btn btn-danger">Crear cuenta</a>
          </div>
        </form> 
      </div>
    </div>	
  </div>

  <script src="assets/js/jquery-3.5.1.min.js"></script>
  <script src="js/App.js"></script>
  <script src="assets/js/AppLogin.js"></script>
  <script type="text/javascript" src="cordova.js"></script>
</body>
</html>
