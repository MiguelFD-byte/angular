import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {MinLength, IsNotEmpty, minLength} from 'class-validator';
@Entity()

export class Pendiente {

    @PrimaryGeneratedColumn()
    idToDo: number;
    
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    idUsuario: string;

    @Column()
    @CreateDateColumn()
    createAt: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    task_to_be_done: string;

    @Column()
    @CreateDateColumn()
    finalizedAt :string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    titulo: string;
    
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    descripcion: string;

}
