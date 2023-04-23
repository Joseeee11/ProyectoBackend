###Sala de Audiovisuales (Proyecto Backend)
<br>
####Colaboradores <ul>
<li>Rosimar J. Barrios M.  <i>c.i:30.976.217</i></li>
<li>Cristian J. Rangel B.  <i>c.i:31.898.075</i></li>
<li>Margreth C. Daboin H.  <i>c.i:31.368.992</i></li>
<li>Javier Olivar<i>c.i:30.737.648</i></li>
</ul>
<br>
####Introducción
<p>
Nuestro programa tiene como objetivo principal brindarle al usuario mayor comodidad a la hora de gestionar su "Sala de Audiovisuales", donde pueda registrar usuarios solicitantes de los servicios y aquellas reservas específicas, pero que a su vez tenga registro de los usuarios que laboran deltro de esa Sala. De igual forma permita un tipo de organización a los trabajadores, que puedan ver sus trabajos pendientes y los equipos que les son asignados para su reparación. Además también cuenta con un acceso a la organización de eventos o talleres que le permitan al usuario principal una mayor planificación de los mismos.
<br>
</p>
####Tecnologías y Herramientas empleadas
Principalmente este programa trabaja con el entorno de tiempo de ejecución de JavaScript: <b><i>Node js</i></b>; del cual se hizo uso de paquetes que facilitaron la elaboración del programa (aplicación) como son:
<ul>
<li>Express-generator  = <b><i>$npm i -g express-generator</i></b></li>
<li>Nodemon  =  <b><i>$npm i nodemon</i></b></li>
<li>Bcryptjs = <b><i>$npm i bcryptjs</i></b></li>
<li>JWT  =  <b><i>$npm i jsonwebtoken</i></b></li>
<li>MySQL  =  <b><i>$npm i mysql</i></b></li>
<li>Ejs  =  <b><i>$npm i ejs</i></b> (aunque este viene incluido con express-generator)</li>
<li>Cookie  =  <b><i>$npm i cookie</i></b></li>
<li>Dotenv  =  <b><i>$npm i dotenv</i></b></li>
</ul>

Ahora para el arranque de nuestro sistema se hizo uso de la herramienta de  <b><i>Postman</i></b>, la cual nos permite interactuar con nuestra API hacer todos aquellas operaciones CRUD (Create, Read, Update, Delete) , en ella se harán las pruebas con los métodos HTTP: delete (eliminar) y put (modificar). De igual forma nuestro programa cuanta con una atractiva <b> interfaz gráfica </b>donde trabajaremos los métodos HTTP: get (listar) y post (agregar).
<br>
####Instalación y Arranque del Sistema
Teniendo en cuenta que ya esta clonado nuestro repositorio, que ya tiene acceso al mismo y necesita arrancar el sistema se hará lo siguiente:
<br>

#####Arranque del Sistema:
<ol>
<li>En vista de que empleamos <i>.gitingnore</i> para ocultar archivos como <b>.env</b> o la carpeta de <b>node_modules</b>, primero ha de instalar <i>npm</i> de manera que se instalen todos los archivos necesarios para el funcionamiento del sistema. Esto lo podrá hacer con <i><b>$ npm i</b></i>.</li>
<li>En el momento en que se instale correctamente <i>npm</i> podemos iniciar nuestro sistema con el comando <i><b>$ npm run serve</b></i> con el cual llamará a <i>nodemon</i> y comenzará a correr nuestro servidor.</li>
<li>Para probarlo podemos ir a nuestro navegador y escribir la url <i><b>http://localhost:3000/</b></i> ; es de aclarar que dirigirse al puerto 3000 es en caso de que no lo hallamos dado acceso a los datos almacenados en las variables de entorno.</li>
<li>En caso de no desear usar el navegador, también puede emplear aquella misma URL para acceder al sistema por medio de <i>Postman</i>.</li>
</ol>

#####Inicio de Sesión:
Dentro de nuestro programa es necesario iniciar sesion, en el existen tres categorías de usuarios cada uno con determinadas restricciones de las que se hablará más adelante. Estas Categorías son: <ul>
<li><i><b>Admin</b></i></li>
<li><i><b>Personal</b></i></li>
<li><i><b>Solicitante</b></i></li>
</ul>Ahora para iniciar sesión se deben aportar los datos de: Nombre de usuario, Contraseña, e indicar su respectivo rol. A continuación se explicará el ingreso de los mismos en ambos modos  <i>(Postman, e Interfaz Gráfica)</i>.
######POSTMAN
<ol>
<li>Nos dirigiremos a la dirección URL <b><i>http://localhost:3000/login</i></b> en método HTTP <b>post</b></li>
<li>Luego en el cuerpo de la respuesta, es decir, el <b>body</b> (req.body) vamos a añadir en formato JSON nuestros datos de ingreso. Ejemplo ingresamos los datos:
```
{
    "usuario": "anonimus",
    "contrasena": "8910",
    "rol": "admin"
}
```
</li>
<li>Por último presionamos <b>SEND</b> y nos ha de redireccionar a la página de inicio. Con esto podemos comenzar a interactuar con nuestro sistema.</li>
</ol>
######INTERFAZ GRÁFICA
<ol>
<li>En cuanto a nuestra interfaz gráfica, al iniciar nuestro sistema y dirigirnos a <i><b>http://localhost:3000/</b></i> se nos presentará una página de inicio con un botón <i><b>!LOG IN¡</b></i> , el cual nos indica que es para <i>Iniciar Sesion</i></li>
<li>Luego de presionar el botón de <i><b>!LOG IN¡</b></i> este nos redireccionará a un formulario encontrado especifícamente en la URL: <i><b>http://localhost:3000/</b></i>. En aquel formulario se nos indica los datos a ingresar, y además, para agregar nuestro <i>rol</i> se desplegarán las únicas tres opciones: <i>ADMIN</i>, <i>PERSONAL</i>, o <i>SOLICITANTE</i></li>
<li>Luego de ingresar los datos, presionamos el boton de <b><i>Iniciar Sesión</i></b> el cual enviará la señal <i>POST</i>para ingresar los datos y a su vez nos redireccionará a la página principal de nuestro programa.
<i>Nota:  Como ya hemos iniciado sesion nos aparecerá un botón para cerrala titulado: <b>¡LOG OUT!</b></i></li>
<li>Con esto ya hemos iniciado en nuestro sistema, con lo cual podemos interactuar con nuestra Interfaz, siempre y cuando sean los llamados CRUD leer y crear.</li>
</ol>
#####Datos Importantes de Funcionamiento:
<ul>
<li>Nuestro sistema a la hora de buscar datos especificos de una entidad, por ejemplo busquedas por id, tendrá la siguiente sintaxis: <i>/entidad/id:id</i>, esto para major entendimiento del usuario y evitarnos errores a la hora de ingresar rutas. </li>
<li>La Interfaz gráfica solo realizará llamados CRUD Read y Create, es decir, leer y crear; por lo tanto solo ejecuta métodos HTTP post y get. De hecho por esta razón empleamos Postman para interactuar con los demás métodos</li>
<li>Los elementos destinados a servicio (Espacios y Equipos) solo podrán encontrarse en tres estados o estatus: <i>Ocupado</i>, <i>Disponible</i>, y <i>Mantenimiento</i>.</li>
<li>A la hora de ingresar una reserva nuestro sistema buscará que aquel equipo o espacio solicitado no se encuentre Ocupado el día en que se quiere reservar.</li>
<li>Importante no olvidar su contraseña, puesto que nadie puede tener acceso a las mismas.</li>
<li>Para cada llamado CRUD (a execpción de LEER, es decir método http GET) la sixtaxis de las URL serán las siguiente: <i><b>/entidad/llamado/:id</b></i> donde <i>llamado</i> se refiere a: <i>eliminar</i>, <i>agregar</i> o <i>modificar</i>; en cuento al id este solo se empleará en <i>eliminar</i> y <i>modificar</i>. Algunos ejemplos:
```
http://localhost:3000/equipos/eliminar/1
http://localhost:3000/espacios/agregar/
http://localhost:3000/personal/modificar/3
```
</li>
</ul>
#####Restricciones:
######ADMIN
<ul>
<li>No tiene Restricciones</li>
</ul>
######PERSONAL
<ul>
<li>Crear Personal.</li>
<li>Modificar Personal</li>
<li>Modificar Solicitante</li>
<li>Eliminar Personal</li>
<li>Eliminar Solicitante</li>
<li>Listar Personal Específico</li>
</ul>
######SOLICITANTE
<ul>
<li>Ver Reservas</li>
<li>Ver Trabajos</li>
<li>Ver Solicitantes</li>
<li>Ver Tickets</li>
<li>Ver Personal</li>
<li>Crear Solicitante</li>
<li>Modificar Solicitante</li>
<li>Eliminar de cualquier Entidad</li>
<li>Modificar de cualquier Entidad</li>
<li>Crear de cualquier Entidad</li>
</ul>

####FIN
