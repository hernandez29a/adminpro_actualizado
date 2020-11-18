import { Hospital } from './hospital.model';

interface _MedicolUser {

    _id:string;
    nombre: string;
    imgUrl: string;

}

export class Medico {

    constructor(
        public nombre?: string, 
        public _id?: string,
        public imgUrl?: string, 
        public public_id?: string,
        public usuario?: _MedicolUser,
        public hospital?: Hospital
    ){}

}