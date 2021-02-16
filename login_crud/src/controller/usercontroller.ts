import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import {usuario} from '../entity/usuarios';
import { validate } from 'class-validator';
import { Pendiente } from '../entity/Pendiente';


export class usercontroller{
    static getAll = async (req:Request, res:Response) =>{
        const userRepository = getRepository(usuario);
        const users = await userRepository.find();

        if(users.length > 0){
            res.send(users);
        }else{
            res.status(404).json({message:'No hay resultados'});
        }
    };

    static getById = async (req:Request, res:Response) =>{
        const {id} = req.params;
        const userRepository = getRepository(usuario);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }
        catch(e){
            res.status(404).json({message:'el usuario no existe'});
        }
    };

    static addUser = async (req:Request, res:Response) =>{
        const {userID, userPassword, rol, status} = req.body;

        const user = new usuario();

        user.userID = userID ;
        user.userPassword = userPassword;
        user.rol = rol;
        user.status = status;
        //validar
        const error = await validate(user, {validationError:{target:false, value:false}});
        if(error.length > 0 ){
            return res.status(400).json(error);
        }

        //TODO:HASH PASSWORD
        const userRepository = getRepository(usuario);
        try{
            user.hashPassword();
            await userRepository.save(user);
        }
        catch(e){
            return res.status(409).json({message:'usuario existente'});
        }
        //todo bien
        res.send('Se creo');
    
    };

    static editUser = async (req:Request, res:Response) =>{
        let user;
        const {id} = req.params;
        const {userID, rol} = req.body;

        const useRepository = getRepository(usuario);
        //
        try{
            user = await useRepository.findOneOrFail(id);
            user.userID = userID;
            user.rol = rol;
        }
        catch(e){
            return res.status(404).json({message:'error'});
        }
        
        const error = await validate(user, {validationError:{ target:false, value:false}});

        if(error.length > 0 ){
            return res.status(400).json(error);
        }

        //guarda
        try{
            await useRepository.save(user);
        }
        catch(e){
            return res.status(400).json({message:'existe'});
        }

        res.status(201).json({message:'se actualizo'});
    };

    static deleteUser = async (req:Request, res:Response) =>{
        const {id} = req.params;
        const userRepository = getRepository(usuario);
        let user : usuario;

        try{
            user = await userRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message:'el usuario no existe'});
        }

        //elimina
        userRepository.delete(id);
        res.status(201).json({message:'se borro'});
    };

    static getPendiente_user = async(req:Request, res:Response)=>{
      
    };
}

export default usercontroller;

