# CamperImpact

## Descripción

La página web es una plataforma interactiva que permite a los usuarios crear su propio perfil y compartir contenido a través de comentarios y posteos. El objetivo principal de la plataforma es fomentar la interacción y la colaboración, así como brindar un espacio para expresarse libremente.

## Características principales

- **Creación de perfiles personalizados:** Los usuarios podrán crear su propio perfil personalizado. Podrán agregar información personal, como una foto de perfil, una biografía, datos personales y enlaces a sus redes sociales o sitios web.
- **Comentarios y posteos:** Los usuarios podrán realizar comentarios anonimos en las publicaciones de otros usuarios, así como también realizar sus propios posteos. Podrán compartir opiniones, ideas, preguntas o cualquier otro tipo de contenido relevante para la comunidad.
- **Interacción social:** La plataforma proporcionará funciones de interacción social, como revisar el perfil de cada usuario y ver sus publicaciones o responder a preguntas y dudas.

## Creacion

Se tiene pensado crear una base de datos con la siguiente informacion:

### Tablas

**- Usuarios:**  en la tabala usuarios guardaremos la informacion principal de cada uno de los usuarios, como lo son: tipo_documento, nro_documento, foto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, apodo, edad, nacionalidad, ciudad_recidencia, direccion, ocupacion, descripcion_personal .

**- Pais:** en la tabla pais tendremos los paices que los usuarios pueden elegir como nacionalidad.

**- Region:** En la tabla region tendremos los departamentos que los usuarios pueden elegir como residencia.

**-Ciudad:** En la tabla ciudad tendremos las ciudades de dicho departamento escogido para que los usuarios puedan elegir su ciudad de recidencia.

**- Genero:** En la tabla genero tendremos los generos que los usuarios pueden elegir a la hora de crear su perfil

**- Fotos:** En la tabla fotos tendre las fotos que los usuarios elijan para colocar en su perfil.

**- tipo_post:** En la tabla tipo_post tendre los tipos de publicaciones o post que los usuarios pueden elegir para realizar en su perfil, por ejemplo: Post o Preguntas

**- publicacion:** En la tabla publicacion tendremos el tipo de post con el post que se va a hacer y la fecha en que se realiza.

**- Comentarios:** En la tabla comentarios tendremos los comentarios que el usuario hace a un post especifico.

**- tipo_reaccion:** En la tabla tipo de reaccion tendremos los tiepos de reaccion que se pueden tener sobre un post, por ejemplo: like, dislike, me encanta, etc. 

## EndPoints

algunos de los endpoints que tenemos pensados utilizar:

- Crear un endpoint que nos traiga el listado de todos los usuarios
- Crear un endpoint que nos filtre los usuarios por genero o por nacionalidad
- Crear un endpoint que nos traiga las publicaciones realizados por un usuario especifico en orden del mas reciente al mas antiguo.
- Crear un endpoint que nos filtre las publicaciones de un usuario de la mas popular a la menos popular
- Crear los cruds que agregan usuarios, post, comentarios.

## A Tener en Cuenta

- Es importante tener en cuenta que esta es nuestra primera idea sobre nuestro aplicativo, por lo tanto en el transcurso de los dias nuestras tablas o endpoints pueden estar sometidas a cambios, mejoras o inserciones.

- Los datos que se agregan seran validados con DTO.

## Contacto

Nombre: Carlos Villafrades Pinilla

Email: cavillafrades@gmail.com