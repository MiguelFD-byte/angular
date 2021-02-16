import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


export const checkjwt = (req:Request, res:Response, next:NextFunction)=>{
    
    const token = <string>req.headers['login'];//value
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload= jwtPayload;
    }
    catch(e){
        return res.status(401).json({message:'No tiene autorizacion'});
    }

    const {idUsuario, userID} = jwtPayload;

    const newToken = jwt.sign({idUsuario, userID}, config.jwtSecret, {expiresIn: '1h'});
    res.setHeader('token', newToken);

    //call next
    next();
};