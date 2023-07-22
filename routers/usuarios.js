import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import validateUsuario from "../middleware/validateUsuario.js";

dotenv.config();
let storageUsuario = Router();

let con = undefined;
storageUsuario.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

storageUsuario.get("/:id?", (req,res)=>{ 
    let sql = (req.params.id)
    ? [`SELECT usu_id AS "tel", usu_nombre AS "nombre_completo", usu_apodo AS "apodo", usu_genero_fk AS "genero_id", gen_nombre AS "genero", usu_edad AS "edad", usu_ciudad_fk AS "ciudad_id", ciu_nombre AS "ciudad", usu_descripcion AS "descripcion", usu_image AS "image" FROM Usuario INNER JOIN Genero ON usu_genero_fk = gen_id INNER JOIN Ciudad ON usu_ciudad_fk = ciu_id WHERE usu_id = ?`, req.params.id]
    : [`SELECT usu_id AS "tel", usu_nombre AS "nombre_completo", usu_apodo AS "apodo", usu_genero_fk AS "genero_id", gen_nombre AS "genero", usu_edad AS "edad", usu_ciudad_fk AS "ciudad_id", ciu_nombre AS "ciudad", usu_descripcion AS "descripcion", usu_image AS "image" FROM Usuario INNER JOIN Genero ON usu_genero_fk = gen_id INNER JOIN Ciudad ON usu_ciudad_fk = ciu_id`]
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

storageUsuario.post("/", validateUsuario, (req,res)=>{
  /* {
     "tel": 3265897549,
    "nombre_completo": "Carlos Alberto Villafrades",
    "apodo": "Villafrades",
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

export default storageUsuario;