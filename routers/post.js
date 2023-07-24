import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import validatePost from "../middleware/validatePost.js";
import {generateToken, validateTokenEndpoints} from "../middleware/jwt.js"

dotenv.config();
let storagePost = Router();

let con = undefined;
storagePost.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

//se puede utilizar query ?id="" para filtrar por id
storagePost.get("/", (req,res)=>{ 
    let sql = (req.query.id)
    ? [`SELECT post_id AS "id_post", post_info AS "info", post_image AS "image", usu_apodo AS "usuario_apodo", post_fecha AS "fecha_post" FROM Post INNER JOIN Usuario ON post_usuario_fk = usu_apodo WHERE post_id = ?`, req.query.id]
    : [`SELECT post_id AS "id_post", post_info AS "info", post_image AS "image", usu_apodo AS "usuario_apodo", post_fecha AS "fecha_post" FROM Post INNER JOIN Usuario ON post_usuario_fk = usu_apodo`]
    con.query(
        ...sql,
        (err,data,fil)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

storagePost.post("/",generateToken, validateTokenEndpoints, validatePost, (req,res)=>{
  /* { datos de entrada
    "info": "¡Hermoso día en la playa!",
    "image": null,
    "apodo_usuario": "ElVilla",
} */
    con.query(
        `INSERT INTO Post SET ?`,req.body,
        (err,data,fil)=>{
            if (err) {
               res.status(500).send("Error al agregar, revisar parametros") 
            }else{
                res.send("Agregado con exito")
            }
        }

    )
})

//se debe utilizar query ?id=""
storagePost.put("/",generateToken, validateTokenEndpoints, validatePost, (req,res)=>{
      con.query(
          `UPDATE Post SET ? WHERE post_id = ?`,
          [req.body, req.query.id],
          (err,data,fil)=>{
              if (err) {
                 res.status(500).send("Error al modificar, revisar parametros") 
              }else{
                  res.send("Modificado con exito")
              }
          }
  
      )
  })

  //se debe utilizar query ?id=""
  storagePost.delete("/", (req,res)=>{
    con.query(
        `DELETE FROM Post WHERE post_id = ?`,
        [req.query.id],
        (err,data,fil)=>{
            if (err) {
               res.status(500).send("Error al eliminar, revisar parametros") 
            }else{
                res.send("Eliminado con exito")
            }
        }

    )
})

//ENDPOINTS

//endpoint que me muestra las publiaciones realizadas por un usuarios especifico en orden DES

storagePost.get("/usuario/:apodoUsuario", (req,res)=>{ 
    con.query(
        `SELECT post_id AS "id_post", post_info AS "info", post_image AS "image", usu_apodo AS "usuario_apodo", post_fecha AS "fecha_post" FROM Post INNER JOIN Usuario ON post_usuario_fk = usu_apodo WHERE post_usuario_fk = ? ORDER BY post_fecha DESC`, req.params.apodoUsuario,
        (err,data,fil)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

storagePost.get("/popularidad", (req,res)=>{ 
    con.query(
        `SELECT post_id AS "id_post" , post_info AS "info", post_image AS "image", post_fecha AS "fecha_post", COUNT(reacc_id) AS total_reacciones FROM Post INNER JOIN Reaccion ON post_id = reacc_post_fk GROUP BY post_id ORDER BY total_reacciones DESC`,
        (err,data,fil)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})



export default storagePost;