import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import {validateToken} from "../middleware/jwt.js"

dotenv.config();
let storageUsuario = Router();

let con = undefined;
storageUsuario.use((req,res,next)=>{
    let my_conexio = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexio);
    next()
})

storageUsuario.get("/", (req,res)=>{ 
    con.query(
        `SELECT * FROM Usuario`,
        (err,data,fil)=>{
            if (err) {
               res.status(500).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }

    )
})

export default storageUsuario;