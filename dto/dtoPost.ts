import { Expose, Transform, Type } from "class-transformer";

export class dtoPost{
  
  @Expose({ name: "info" })
 post_info: string;

    @Expose({name:"image"})
    @Transform(({value}) =>  {if(/^[\w\s+#-]+$/.test(value) || value  === null) return value;
    else throw {status:400, message:`Error en los parametros de entrada: "image"`};}, {toClassOnly:true})
    post_image:string;

    @Expose({name:"apodo_usuario"})
    @Transform(({value})=>{if(/^[a-z-A-Z-0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value)) return value;
    else throw {status: 400, message:`Error en los parametros de entrada: "apodo_usuario"`};},{ toClassOnly: true})
   post_usuario_fk:string;

    constructor(post_info:string, post_image:string, post_usuario_fk:string){
        this.post_info = post_info;
        this.post_image = post_image;
        this.post_usuario_fk = post_usuario_fk;
    }
}