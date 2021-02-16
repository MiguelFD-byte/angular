import { Request, Response, NextFunction } from 'express';
import { usuario } from '../entity/usuarios';
import { getRepository } from 'typeorm';



export const userStatus= (UserStatus: Array<string>) =>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        
        const {userID} = req.params;
        const userepository = getRepository(usuario);

        let user:usuario;

        try{
            user = await userepository.findOneOrFail(userID);
        }
        catch(e){
            return res.status(401).json({message:'No autorizado'});
        }

        //verifica status
        const {status} = user;

        if(UserStatus.includes(status)){
            next();
        }else{
            res.status(401).json({message:'No autorizado'});
        }
    };
};