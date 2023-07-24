import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";

dotenv.config();
let storageTipoReaccion = Router();

let con = undefined;
storageTipoReaccion.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

//se puede utilizar query ?id="" para filtrar por id
storageTipoReaccion.get("/", (req,res)=>{ 
    let sql = (req.query.id)
    ? [`SELECT tip_reacc_id AS "tipo_reaccion_id", tip_reacc_nombre AS "nombre_reaccion" FROM Tipo_reaccion WHERE tip_reacc_id = ?`, req.query.id]
    : [`SELECT tip_reacc_id AS "tipo_reaccion_id", tip_reacc_nombre AS "nombre_reaccion" FROM Tipo_reaccion`]
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


export default storageTipoReaccion;