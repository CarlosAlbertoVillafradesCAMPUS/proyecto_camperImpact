import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import validateComentarios from "../middleware/validateComentarios.js";
import {generateToken, validateTokenEndpoints} from "../middleware/jwt.js"

dotenv.config();
let storageComentarios = Router();

let con = undefined;
storageComentarios.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

//se puede utilizar query ?id="" para filtrar por id
storageComentarios.get("/", (req,res)=>{ 
    let sql = (req.query.id)
    ? [`SELECT com_id AS "id_comentario", com_usuario_fk AS "apodo_usuario", com_info AS "info", com_post_fk AS "id_post" FROM Comentarios WHERE com_id = ?`, req.query.id]
    : [`SELECT com_id AS "id_comentario", com_usuario_fk AS "apodo_usuario", com_info AS "info", com_post_fk AS "id_post" FROM Comentarios`]
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

storageComentarios.post("/",generateToken, validateTokenEndpoints, validateComentarios, (req,res)=>{
  /* { datos de entrada
     "apodo_usuario": "ElVilla"
    "info": "¡Exelente post amigo!",
    "post": 1,
} */
    con.query(
        `INSERT INTO Comentarios SET ?`,req.body,
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
storageComentarios.put("/",generateToken, validateTokenEndpoints, validateComentarios, (req,res)=>{
      con.query(
          `UPDATE Comentarios SET ? WHERE com_id = ?`,
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
  storageComentarios.delete("/", (req,res)=>{
    con.query(
        `DELETE FROM Comentarios WHERE com_id = ?`,
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


export default storageComentarios;