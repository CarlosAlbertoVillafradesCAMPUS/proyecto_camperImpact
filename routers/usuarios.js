import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import validateUsuario from "../middleware/validateUsuario.js";
import {generateToken, validateTokenEndpoints} from "../middleware/jwt.js"

dotenv.config();
let storageUsuario = Router();

let con = undefined;
storageUsuario.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

//se puede utilizar query ?apodo="" para filtrar por apodo
storageUsuario.get("/", (req,res)=>{ 
    let sql = (req.query.apodo)
    ? [`SELECT usu_nombre AS "nombre_completo", usu_apodo AS "apodo", usu_genero_fk AS "genero_id", gen_nombre AS "genero", usu_edad AS "edad", usu_ciudad_fk AS "ciudad_id", ciu_nombre AS "ciudad", usu_descripcion AS "descripcion", usu_image AS "image" FROM Usuario INNER JOIN Genero ON usu_genero_fk = gen_id INNER JOIN Ciudad ON usu_ciudad_fk = ciu_id WHERE usu_apodo = ?`, req.query.apodo]
    : [`SELECT usu_nombre AS "nombre_completo", usu_apodo AS "apodo", usu_genero_fk AS "genero_id", gen_nombre AS "genero", usu_edad AS "edad", usu_ciudad_fk AS "ciudad_id", ciu_nombre AS "ciudad", usu_descripcion AS "descripcion", usu_image AS "image" FROM Usuario INNER JOIN Genero ON usu_genero_fk = gen_id INNER JOIN Ciudad ON usu_ciudad_fk = ciu_id`]
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

storageUsuario.post("/",generateToken, validateTokenEndpoints, validateUsuario, (req,res)=>{
  /* { datos de entrada
     "tel": 3175049475,
    "nombre_completo": "Carlos Alberto Villafrades",
    "password":"Carlos1@",
    "apodo": "ElVilla",
    "genero_id": 1,
    "edad": 22,
    "ciudad_id": 1,
    "direccion": "calle 11",
    "descripcion": "Hola, soy Carlos Villafrades y me encanta viajar.",
    "image": null
} */
    con.query(
        `INSERT INTO Usuario SET ?`,req.body,
        (err,data,fil)=>{
            if (err) {
               res.status(500).send("Error al agregar, revisar parametros") 
            }else{
                res.send("Agregado con exito")
            }
        }

    )
})

//se debe utilizar query ?apodo=""
storageUsuario.put("/",generateToken, validateTokenEndpoints, validateUsuario, (req,res)=>{
      con.query(
          `UPDATE Usuario SET ? WHERE usu_apodo = ?`,
          [req.body, req.query.apodo],
          (err,data,fil)=>{
              if (err) {
                 res.status(500).send("Error al modificar, revisar parametros") 
              }else{
                  res.send("Modificado con exito")
              }
          }
  
      )
  })

  //se debe utilizar query ?apodo=""
  storageUsuario.delete("/", (req,res)=>{
    con.query(
        `DELETE FROM Usuario WHERE usu_apodo = ?`,
        [req.query.apodo],
        (err,data,fil)=>{
            if (err) {
               res.status(500).send("Error al eliminar, revisar parametros") 
            }else{
                res.send("Eliminado con exito")
            }
        }

    )
})


export default storageUsuario;