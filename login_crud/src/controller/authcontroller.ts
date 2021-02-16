import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { usuario} from '../entity/usuarios';
import * as jwt from 'jsonwebtoken';
import config from '../config/config'
import { isDataURI } from 'class-validator';



class authcontroller{
    static login = async (req:Request, res:Response) =>{
        const {userID, userPassword} = req.body;
        const {idUsuario} = req.params;

        if(!(userID && userPassword)){
            return  res.status(400).json({message:'El usuario no existe'});
        }
        

        const userRepository = getRepository(usuario);
        let user: usuario;

        try{
            user = await userRepository.findOneOrFail({ where: {userID} });
            
        }
        catch(e){
            return res.status(400).json({message:'Usuario o Password Incorrectos'});
            
        }
        //check password
        if(!user.checkPassword(userPassword)){
            return res.status(400).json({message:'Datos incorrectos'});
        }
       
        //token
        const token = jwt.sign({idUsuario: user.idUsuario, userID: user.userID}, config.jwtSecret, {expiresIn:'1h'});
        res.send({message:'Token generado correctamente', token, userID, userPassword});
        
    };
}

export default authcontroller;