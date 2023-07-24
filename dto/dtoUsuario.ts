import { Expose, Transform, Type } from "class-transformer";

export class dtoUsuario{
  
  @Expose({ name: "tel" })
  @Transform(({ value }) => {
    if (Math.floor(value) && typeof value == 'number') return Math.floor(value);
    else throw  {status:400, message:`Error en los parametros de entrada: "tel"`};}, {toClassOnly:true})
  usu_id: number;

    @Expose({name:"nombre_completo"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:`Error en los parametros de entrada: "nombre_completo"`};}, {toClassOnly:true})
    usu_nombre:string;

    @Expose({name:"password"})
    @Transform(({value})=>{if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#/]).{8,12}$/.test(value)) return value;
     else throw {status: 400, message:`Error, La contraseña debe ser minimo de 8 caracteres y maximo de 12. ademas debe incluir almenos una letra Mayuscula, una minusula y alguno de los siguientes caracteres, @, ., #, /`};},{ toClassOnly: true})
    usu_password:string;

    @Expose({name:"apodo"})
    @Transform(({value})=>{if(/^[a-z-A-Z-0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value)) return value;
     else throw {status: 400, message:`Error en los parametros de entrada: "apodo"`};},{ toClassOnly: true})
    usu_apodo:string;

    @Expose({name:"genero_id"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: `Error en los parametros de entrada: "genero_id"`};}, {toClassOnly: true})
    usu_genero_fk:number;

    @Expose({name:"edad"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: `Error en los parametros de entrada: "edad"`};}, {toClassOnly: true})
    usu_edad:number;

    @Expose({name:"ciudad_id"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: `Error en los parametros de entrada: "ciudad_id"`};}, {toClassOnly: true})
    usu_ciudad_fk:number;

    @Expose({name:"direccion"})
    @Transform(({value}) =>  {if(/^[\w\s+#-]+$/.test(value) || value === null) return value;
    else throw {status:400, message:`Error en los parametros de entrada: "direccion"`};}, {toClassOnly:true})
    usu_direccion:string;

    @Expose({name:"descripcion"})
    usu_descripcion:string;

    @Expose({name:"image"})
    @Transform(({value}) =>  {if(/^[\w\s+#-]+$/.test(value) || value  === null) return value;
    else throw {status:400, message:`Error en los parametros de entrada: "image"`};}, {toClassOnly:true})
    usu_image:string;

    constructor(usu_id:number, usu_nombre:string, usu_password:string, usu_apodo:string, usu_genero_fk:number, usu_edad:number, usu_ciudad_fk:number,usu_direccion:string, usu_descripcion:string, usu_image:string){
        this.usu_id = usu_id;
        this.usu_nombre = usu_nombre;
        this.usu_password = usu_password;
        this.usu_apodo = usu_apodo;
        this.usu_genero_fk = usu_genero_fk;
        this.usu_edad = usu_edad;
        this.usu_ciudad_fk = usu_ciudad_fk;
        this.usu_direccion = usu_direccion;
        this.usu_descripcion = usu_descripcion;
        this.usu_image = usu_image;
    }
}