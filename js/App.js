//RECUPERAR LA VARIABLE DE SESION DE LOCALSTORAGE
//const urlServer="https://redcecyto.000webhostapp.com/";

const urlServer = "";
const sesion = localStorage.getItem("sesion");
const nombre = localStorage.getItem("us_nombre");
const foto = urlServer + localStorage.getItem("us_foto");

function checarSesion() {
  pepito();
  actualizarPost();
}

function checarSesionBiografia() {
  pepito();
  actualizarMisPost();
}

function checarSesionPerfil() {
  pepito();

  $("#edit_email").html(localStorage.getItem("us_usuario"));
  $("#edit_password").val(localStorage.getItem("us_password"));
  $("#edit_nombre").val(localStorage.getItem("us_nombre"));
  $("#preview").attr("src", urlServer + localStorage.getItem("us_foto"));
  $("#us_id").val(localStorage.getItem("us_id"));
  $("#us_usuario").val(localStorage.getItem("us_usuario"));
}

function pepito() {
  cambiarNombre(sesion, nombre);

  if (sesion) {
    $(location).attr("href", "/");
  }
}

function checarIndex() {
  if (sesion != null) {
    $(location).attr("href", "inicio.html");
  }
}

function cambiarNombre(user, name) {
  $.ajax({
    url: urlServer + "php/login/perfilUsuario.php",
    type: "POST",
    data: {
      usuario: user,
    },
    dataType: "json",
    success: function (response) {
      if (response.success == true) {
        localStorage.setItem("us_id", response.us_id);
        localStorage.setItem("us_nombre", response.us_nombre);
        localStorage.setItem("us_usuario", response.us_usuario);
        localStorage.setItem("us_password", response.us_password);
        localStorage.setItem("us_foto", response.us_foto);
        $("#nombreUsuario").html(response.us_nombre);
        $("#fotoUsuario").attr("src", urlServer + response.us_foto);
      }
    },
  });
}

function editarUsuario() {
  const $editName = $("#edit_nombre");
  const $editImage = $('#Imagen');
  const $password = $("#password");
  const $editPass1 = $('#edit_new_password');
  const $editPass2 = $("#edit_rep_password");

  const nombre = $editName.val();
  const imagen = $editImage.val();
  const pass_anterior = $password.val();
  const pass1 = $editPass1.val();
  const pass2 = $editPass2.val();

  $fieldEditName = $editName.closest(".form-group");
  $fieldEditName
    .toggleClass("has-succes", nombre)
    .toogleClass("has-error", !nombre);

  $fieldOldPass = $password.closest(".form-group");
  $fieldOldPass
    .toggleClass("has-succes", pass_anterior)
    .toogleClass("has-error", !pass_anterior);

  $fieldEditImage = $editImage.closest(".form-group");
  $fieldEditImage
    .toggleClass("has-succes", imagen)
    .toogleClass("has-error", !imagen);


  let errorMesagge = "";
  if (!nombre) {
    errorMesagge = "FALTA LLENAR CAMPOS";
  } else if (!pass_anterior) {
    errorMesagge = "SE REQUIERE CONFIRMAR CONTRASEÑA";
  } else if (!pass1 || pass1 !== pass2) {
    errorMesagge = "CONTRASEÑA NUEVA NO COINCIDEN";
  } else if (!pass_anterior || !imagen) {
    errorMesagge = true;
  }

  if (errorMesagge) {
    mensaje(
      "msj_editar_usuario",
      "texto_editar_usuario",
      errorMesagge,
      "danger"
    );
    return;
  }

  const formElement = document.getElementById("form_editar");
  const formData = new FormData(formElement);

  $.post(urlServer + "php/login/editarUsuario.php", formData).then(function (
    response
  ) {
    $password.val("");
    $editPass1.val("");
    $editPass2.val("");

    if (!response.success) {
      mensaje(
        "msj_editar_usuario",
        "texto_editar_usuario",
        response.mensaje,
        "danger"
      );
      return;
    }

    cambiarNombre(response.us_usuario, response.us_nombre);
    mensaje(
      "msj_editar_usuario",
      "texto_editar_usuario",
      response.mensaje,
      "success"
    );
  });
}

function eliminarUsuario() {
  const user = localStorage.getItem("sesion");
  $.ajax({
    url: urlServer + "php/login/eliminarUsuario.php",
    type: "POST",
    data: {
      usuario: user,
    },
    dataType: "json",
    success: function (response) {
      if (response.success == true) {
        mensaje(
          "msj_eliminar_usuario",
          "texto_eliminar_usuario",
          response.mensaje
        );
        cerrarSesion();
      } else {
        mensaje(
          "msj_eliminar_usuario",
          "texto_eliminar_usuario",
          response.mensaje
        );
      }
    },
  });
}

//METODO POST PARA ENVIAR LOS DATOS A LA BASE DE DATOS DESDE EL SERVIDOR EN LA NUBE DE MYSQL 000WEBHOST
function loginUsuario() {
  const $email = $('#email');
  const $password = $('#password');

  const u = $email.val();
  const p = $email.val();

  $fieldEmail = $email.closest(',form-group');
  $fieldEmail
    .toggleClass("has-succes", u)
    .toogleClass("has-error", !u);
  
  $fieldPass = $password.closest(',form-group');
  $fieldPass
    .toggleClass("has-succes", p)
    .toogleClass("has-error", !p);

  if (u == "" || p == "") {
    mensaje("msj_login", "texto_login", "FALTA LLENAR CAMPOS", "danger");
  }

  if (validarCorreo(u)) {
    mensaje(
      "msj_login",
      "texto_login",
      "CORREO ELECTRÓNICO NO VÁLIDO",
      "danger"
    );
  }

  if (u != "" && p != "" && !validarCorreo(u)) {
    $.ajax({
      url: urlServer + "php/login/loginUsuario.php",
      type: "POST",
      data: {
        user: u,
        password: p,
      },
      dataType: "json",
      success: function (response) {
        //alert(response.success);
        if (response.success == true) {
          localStorage.setItem("sesion", u); // SE GUARDA DE SESION DEL USUARIO
          localStorage.setItem("us_nombre", response.us_nombre); // SE GUARDA DE SESION NOMBRE DEL USUARIO
          localStorage.setItem("us_foto", response.us_foto);
          localStorage.setItem("us_id", response.us_id);
          $(location).attr("href", "inicio.html");
          mensaje(
            "msj_login",
            "texto_login",
            "BIENVENIDO " + response.us_nombre,
            "success"
          );
        } else {
          mensaje("msj_login", "texto_login", response.mensaje, "danger");
        }
      },
    });
  }
}

//METDO AJAX PARA ENVIAR DATOS PARA REGISTRAR
function registrarUsuario() {
  const $Email = $("#email");
  const $Password = $('#password');
  const $Nombre = $("#nombre");
  const $Imagen = $('#Imagen');

  const u = $Email.val();
  const p = $Password.val();
  const n = $Nombre.val();
  const c = $Imagen.val();

  $fieldEmail = $Email.closest(',form-group');
  $fieldEmail
    .toggleClass("has-succes", u)
    .toogleClass("has-error", !u);
  }

  $fieldPassword = $Password.closest(',form-group');
  $fieldPassword
    .toggleClass("has-succes", p)
    .toogleClass("has-error", !p);

  $fieldNombre = $Nombre.closest(',form-group');
  $fieldNombre
    .toggleClass("has-succes", n)
    .toogleClass("has-error", !n);

  $fieldImagen = $Imagen.closest(',form-group');
  $fieldImagen
    .toggleClass("has-succes", c)
    .toogleClass("has-error", !c);

  if (u == "" || p == "" || n == "" || c == "") {
    mensaje(
      "msj_registrar",
      "texto_registrar",
      "FALTA LLENAR CAMPOS",
      "danger"
    );
  } else if (validarNombre(n)) {
    mensaje("msj_registrar", "texto_registrar", "NOMBRE NO VALIDO", "danger");
  } else if (validarCorreo(u)) {
    mensaje(
      "msj_registrar",
      "texto_registrar",
      "CORREO ELECTRÓNICO NO VÁLIDO",
      "danger"
    );
  }

  if (
    u != "" &&
    p != "" &&
    n != "" &&
    c != "" &&
    !validarCorreo(u) &&
    !validarNombre(n)
  ) {
    const formElement = document.getElementById("form_registrar");
    const formData = new FormData(formElement);

    $.ajax({
      url: urlServer + "php/login/registrarUsuario.php",
      type: "POST",
      data: formData,
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.success == true) {
          $("#form_registrar")[0].reset();
          $("#email").val("");
          $("#password").val("");
          $("#nombre").val("");
          $("#Imagen").val("");
          mensaje(
            "msj_registrar",
            "texto_registrar",
            response.mensaje,
            "success"
          );
        } else {
          mensaje(
            "msj_registrar",
            "texto_registrar",
            response.mensaje,
            "danger"
          );
        }
      },
    });
  }
}

function validarCorreo(correo) {
  const regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  if (regex.test(correo.trim())) {
    return false;
  } else {
    return true;
  }
}

function validarCedula(cedula) {
  regex = /^(V|E|P){1}([0-9]){6,8}$/;
  cedula = cedula.toUpperCase();
  cedula = cedula.trim();
  if (regex.test(cedula)) {
    return false;
  } else {
    return true;
  }
}

function validarNombre(nombre) {
  regex = /^([a-z ñáéíóú]{2,60})$/i;
  if (regex.test(nombre)) {
    return false;
  } else {
    return true;
  }
}

function cerrarSesion() {
  localStorage.clear();
  $(location).attr("href", "index.html");
}

function mensaje(selectorPrincipal, selectorSecundario, Mensaje, tipo) {
  $("#" + selectorPrincipal).html(
    '<div class="alert alert-' +
      tipo +
      '" id="' +
      selectorSecundario +
      '" style="text-align:center;">' +
      '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
      "<strong> " +
      Mensaje +
      "</strong>" +
      "</div>"
  );
  //$("#"+selectorPrincipal).html('<p style="color:red" id="'+selectorSecundario+'">'+Mensaje+'</p>');
  $("#" + selectorSecundario)
    .delay(500)
    .show(10, function () {
      $(this)
        .delay(1000)
        .hide(10, function () {
          $(this).remove();
        });
    });
}

function publicar() {
  const &rPubli = $('#publicacion');

  const publicacion = $rPubli.val();
  const us_id = localStorage.getItem("us_id");

  $fieldPubli = $rPubli.closest(',form-group');
  $fieldPubli
    .toggleClass("has-succes", publicacion)
    .toogleClass("has-error", !publicacion);

  if (publicacion == "") {
    mensaje(
      "msj_publicacion",
      "texto_publicacion",
      "FALTA LLENAR CAMPOS",
      "danger"
    );
  }

  if (publicacion != "") {
    $.ajax({
      url: urlServer + "php/publicacion/publicar.php",
      type: "POST",
      data: { publicacion, us_id },
      dataType: "json",
      success: function (response) {
        if (response.success == true) {
          $("#publicacion").val("");
          actualizarPost();
          actualizarMisPost();
          mensaje(
            "msj_publicacion",
            "texto_publicacion",
            response.mensaje,
            "success"
          );
        } else {
          mensaje(
            "msj_publicacion",
            "texto_publicacion",
            response.mensaje,
            "danger"
          );
        }
      },
    });
  }
}

function actualizarPost() {
  $.ajax({
    url: urlServer + "php/publicacion/readPost.php",
    type: "POST",
    dataType: "html",
    success: function (response) {
      $("#post").html(response);
    },
  });
}

function actualizarMisPost() {
  const us_id = localStorage.getItem("us_id");
  $.ajax({
    url: urlServer + "php/publicacion/readMisPost.php",
    type: "POST",
    data: { us_id },
    dataType: "html",
    success: function (response) {
      $("#mispost").html(response);
    },
  });
}

function borra(Id_publicacion) {
  const pu_id = Id_publicacion;
  $.ajax({
    url: urlServer + "php/login/eliminarPubli.php",
    type: "POST",
    data: { pu_id },
    dataType: "json",
    success: function (response) {
      if (response.success == true) {
        actualizarMisPost();
        mensaje(
          "msj_eliminar_publicacion",
          "texto_eliminar_publicacion",
          response.mensaje
        );
      } else {
        mensaje(
          "msj_eliminar_publicacion",
          "texto_eliminar_publicacion",
          response.mensaje
        );
      }
    },
  });
}
