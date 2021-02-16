import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['userID'])
export class usuario{

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column()
    @MinLength(6)
    userID: string;

    @Column()
    @MinLength(6)
    userPassword: string;
    
    @Column()
    @IsNotEmpty()
    rol:string;
    
    @Column()
    @CreateDateColumn()
    CreateAt: Date;

    @Column()
    @IsNotEmpty()
    status:string;

    @Column()
    //@IsNotEmpty()
    token:string;
    
    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.userPassword = bcrypt.hashSync(this.userPassword, salt);
    }

    checkPassword(Password:string):boolean{
        return bcrypt.compareSync(Password, this.userPassword);
    }
}
