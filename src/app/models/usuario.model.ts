


export class Usuario {

    constructor(
        public nombre: string, 
        public email: string, 
        public password?: string, 
        public google?: boolean,
        public imgUrl?: string, 
        public public_id?: string,
        public role?: string, 
        public uid?: string, 
        public codigo?: string, 
    ){}

}