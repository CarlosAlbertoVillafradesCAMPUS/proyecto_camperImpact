import { Expose, Transform, Type } from "class-transformer";

export class dtoComentarios{

    @Expose({name:"apodo_usuario"})
    @Transform(({value})=>{if(/^[a-z-A-Z-0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value)) return value;
    else throw {status: 400, message:`Error en los parametros de entrada: "apodo_usuario"`};},{ toClassOnly: true})
    com_usuario_fk:string;
  
    @Expose({ name: "info" })
    com_info: string;

    @Expose({name:"post"})
    @Transform(({ value }) => {
    if (Math.floor(value) && typeof value == 'number') return Math.floor(value);
    else throw  {status:400, message:`Error en los parametros de entrada: "post"`};}, {toClassOnly:true})
    com_post_fk:number;

    

    constructor(com_usuario_fk:string, com_info:string, com_post_fk:number){
        this.com_usuario_fk = com_usuario_fk;
        this.com_info = com_info;
        this.com_post_fk = com_post_fk;
    }
}