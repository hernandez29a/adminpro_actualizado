import { Hospital } from '../models/hospital.model';


export interface CargarHospital {
    total: number;
    hospitales: Hospital[];
}