import "reflect-metadata";
import {plainToClass} from "class-transformer";
import express from "express";
import {dtoPost} from "../controller/dtoPost.js"

const validatePost = express();

validatePost.use(async(req,res,next) => {
    try {
        let data = plainToClass(dtoPost, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(400).send(error)
    }
}) 

export default validatePost;