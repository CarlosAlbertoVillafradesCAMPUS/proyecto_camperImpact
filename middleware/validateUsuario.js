import "reflect-metadata";
import {plainToClass} from "class-transformer";
import express from "express";
import {dtoUsuario} from "../controller/dtoUsuario.js"

const validateUsuario = express();

validateUsuario.use(async(req,res,next) => {
    try {
        let data = plainToClass(dtoUsuario, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(400).send(error)
    }
}) 

export default validateUsuario;