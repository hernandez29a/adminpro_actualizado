interface _HospitalUser {

    _id:string;
    nombre: string;
    imgUrl: string;

}

export class Hospital {

    constructor(
        public nombre: string, 
        public _id?: string,
        public imgUrl?: string, 
        public public_id?: string,
        public usuario?: _HospitalUser,
    ){}

}