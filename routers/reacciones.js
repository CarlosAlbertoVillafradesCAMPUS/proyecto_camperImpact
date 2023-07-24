import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import validateReacciones from "../middleware/validateReacciones.js";
import {generateToken, validateTokenEndpoints} from "../middleware/jwt.js"

dotenv.config();
let storageReacciones = Router();

let con = undefined;
storageReacciones.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

//se puede utilizar query ?id="" para filtrar por id
storageReacciones.get("/", (req,res)=>{ 
    let sql = (req.query.id)
    ? [`SELECT reacc_id AS "id_reaccion", reacc_tipo_fk AS "id_tipo_reaccion", tip_reacc_nombre AS "tipo_reaccion", Post.* FROM Reaccion INNER JOIN Post ON reacc_post_fk = post_id INNER JOIN Tipo_reaccion ON reacc_tipo_fk = tip_reacc_id  WHERE reacc_id = ?`, req.query.id]
    : [`SELECT reacc_id AS "id_reaccion", reacc_tipo_fk AS "id_tipo_reaccion", tip_reacc_nombre AS "tipo_reaccion", Post.* FROM Reaccion INNER JOIN Post ON reacc_post_fk = post_id INNER JOIN Tipo_reaccion ON reacc_tipo_fk = tip_reacc_id`]
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

storageReacciones.post("/",generateToken, validateTokenEndpoints, validateReacciones, (req,res)=>{
  /* { datos de entrada
    "tipo_reaccion": 1,
    "post": 2,
} */
    con.query(
        `INSERT INTO Reaccion SET ?`,req.body,
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
storageReacciones.put("/",generateToken, validateTokenEndpoints, validateReacciones, (req,res)=>{
      con.query(
          `UPDATE Reaccion SET ? WHERE reacc_id = ?`,
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
  storageReacciones.delete("/", (req,res)=>{
    con.query(
        `DELETE FROM Reaccion WHERE reacc_id = ?`,
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


export default storageReacciones;