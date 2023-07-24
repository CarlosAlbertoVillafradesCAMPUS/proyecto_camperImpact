import dotenv from "dotenv";
import express from "express";
import {generateToken, validateToken} from "./middleware/jwt.js";
import storageUsuario from "./routers/usuarios.js";
import storagePost from "./routers/post.js";

dotenv.config();

const appExpress =  express();
appExpress.use(express.json());
appExpress.get("/token", generateToken, (req,res)=>{
    res.send({token: req.token})
})
appExpress.use("/usuario", validateToken, storageUsuario)
appExpress.use("/post", validateToken, storagePost)


let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,()=>console.log(`http://${config.hostname}:${config.port}`))