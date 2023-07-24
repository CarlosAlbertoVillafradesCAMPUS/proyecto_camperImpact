import "reflect-metadata";
import {plainToClass} from "class-transformer";
import express from "express";
import {dtoReacciones} from "../controller/dtoReacciones.js"

const validateReacciones = express();

validateReacciones.use(async(req,res,next) => {
    try {
        let data = plainToClass(dtoReacciones, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(400).send(error)
    }
}) 

export default validateReacciones;