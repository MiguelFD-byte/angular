import {getRepository} from "typeorm";
import { NextFunction, Request, Response } from 'express';
import {validate} from 'class-validator';
import { Pendiente } from '../entity/Pendiente';
import router from '../routes/pendientes';



export class pendientecontroller {
    static getAll = async (req: Request, res:Response) =>{
        const pendienteRepository = getRepository(Pendiente);
        const pendiente = await pendienteRepository.find();

        if(pendiente.length > 0){
            res.send(pendiente);
        }else{
            res.status(400).json({message:'error'});
        }


    }; 

    static getById = async (req: Request, res:Response) =>{
        const {id} = req.params;
        const pendienterepository = getRepository(Pendiente);
        try{
            const pendiente = await pendienterepository.findOneOrFail(id);
            res.send(pendiente);
        }
        catch(e){
            res.status(404).json({message:'error'});
        }
    };

    static add = async (req: Request, res:Response) =>{
        const pendiente = getRepository(Pendiente).create(req.body);
        const result = await getRepository(Pendiente).save(pendiente);
        return res.json(result);
        
    
    };

    static edit = async (req: Request, res:Response): Promise<Response> =>{
        const pendiente = await getRepository(Pendiente).findOne(req.params.id);
        
        if(pendiente){
            getRepository(Pendiente).merge(pendiente,req.body);
            const result = await getRepository(Pendiente).save(pendiente);
            return res.json(result);

        }

    };

    static delete = async (req: Request, res:Response) =>{
        const {id} = req.params;
        const pendienterepository = getRepository(Pendiente);
        let pendiente : Pendiente;

        try{
            pendiente = await pendienterepository.findOneOrFail(id); 
        }
        catch(e){
            return res.status(404).json({message:'no exite pendiete'});
        }
        //eliminar pendiente
        pendienterepository.delete(id);
        res.status(201).json({message:'correcot'});
    };

}

export default pendientecontroller;

