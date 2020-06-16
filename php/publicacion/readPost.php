<?php 

	include ("../config.php");

	$sql = "SELECT * FROM publicacion INNER JOIN usuario ON publicacion.pu_us_id=usuario.us_id ORDER BY publicacion.pu_fecha DESC ";
	$result = $cx->query($sql);
	$response="";
	if($result->num_rows > 0) 
	{  
		while($row = $result->fetch_array()) 
		 {
		 	$us_id = $row['us_id'];
		 	$nombre=$row['us_nombre'];
		 	$us_foto=$row['us_foto'];
		 	$pu_texto=$row['pu_texto'];
            $pu_fecha=$row['pu_fecha'];
            $pu_id=$row['pu_id'];
            $fecha = date('Y-m-j H:i:s',strtotime($pu_fecha)); //inicializo la fecha con la hora           
            $nuevafecha = date('H:i:s',strtotime($pu_fecha));
            $dia = date("j",strtotime($fecha)); 
            $mes = date("n",strtotime($fecha)); 
            $anio = date("Y",strtotime($fecha)); 
            $m="";
            switch ($mes) {
                case 1:$m="Enero"; break;
                case 2:$m="Febrero"; break;
                case 3:$m="Marzo"; break;
                case 4:$m="Abril"; break;
                case 5:$m="Mayo"; break;
                case 6:$m="Junio"; break;
                case 7:$m="Julio"; break;
                case 8:$m="Agosto"; break;
                case 9:$m="Septiembre"; break;
                case 10:$m="Octubre"; break;
                case 11:$m="Noviembre"; break;
                case 12:$m="Diciembre"; break;
            }
            $f="Publicado el ".$dia." de ".$m." de ".$anio." a las ".$nuevafecha." hrs";
            $sqlcount = "SELECT COUNT(*) as total FROM comentario WHERE co_pu_id=$pu_id";
            $rcount = $cx->query($sqlcount);
            $rx=$rcount->fetch_array();  
            $textComentarios="";
            switch ($rx['total']) {
                case 0: $textComentarios="0 comentarios"; break;
                case 1: $textComentarios="1 comentario"; break;
                default: $textComentarios=$rx['total']." comentarios"; break;
            }          
		 	$response.='
                    <div class="item mb-5">
                    <div class="media">
                        <img class="mr-3 img-fluid post-thumb  d-xl-flex" src="'.$us_foto.'" alt="image" style="border-radius:100%">
                        <div class="media-body">
                            <h3 class="title mb-1"><a href="perfil.html">'.$nombre.'</a></h3>
                            <div class="meta mb-1"><span class="date">'.$f.'</span><span class="comment"><a href="#">'.$textComentarios.'</a></span></div>
                            <div class="intro">'.$pu_texto.'</div> 
                        </div><!--//media-body-->
                    </div><!--//media-->
                </div><!--//item-->';
		 }
         $response.="</ul>";
	}

	echo $response; 	
 ?>