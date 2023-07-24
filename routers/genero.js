import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";

dotenv.config();
let storageGenero = Router();

let con = undefined;
storageGenero.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

//se puede utilizar query ?id="" para filtrar por id
storageGenero.get("/", (req,res)=>{ 
    let sql = (req.query.id)
    ? [`SELECT gen_id AS "genero_id", gen_nombre AS "nombre" FROM Genero WHERE gen_id = ?`, req.query.id]
    : [`SELECT gen_id AS "genero_id", gen_nombre AS "nombre" FROM Genero`]
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


export default storageGenero;