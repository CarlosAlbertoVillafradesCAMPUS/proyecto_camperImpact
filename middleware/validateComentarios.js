import "reflect-metadata";
import {plainToClass} from "class-transformer";
import express from "express";
import {dtoComentarios} from "../controller/dtoComentarios.js"

const validateComentarios = express();

validateComentarios.use(async(req,res,next) => {
    try {
        let data = plainToClass(dtoComentarios, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(400).send(error)
    }
}) 

export default validateComentarios;