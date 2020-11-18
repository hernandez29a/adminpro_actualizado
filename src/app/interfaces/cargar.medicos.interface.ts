import { Medico } from '../models/medico.model';

export interface CargarMedico {
    total: number;
    medicos: Medico[];
}