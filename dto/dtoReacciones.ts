import { Expose, Transform, Type } from "class-transformer";

export class dtoReacciones{

    @Expose({name:"tipo_reaccion"})
    @Transform(({ value }) => {
    if (Math.floor(value) && typeof value == 'number') return Math.floor(value);
    else throw  {status:400, message:`Error en los parametros de entrada: "tipo_reaccion"`};}, {toClassOnly:true})
      reacc_tipo_fk:number;

    @Expose({name:"post"})
    @Transform(({ value }) => {
    if (Math.floor(value) && typeof value == 'number') return Math.floor(value);
    else throw  {status:400, message:`Error en los parametros de entrada: "post"`};}, {toClassOnly:true})
      reacc_post_fk:number;

    constructor(reacc_tipo_fk:number, reacc_post_fk:number){
        this.reacc_tipo_fk = reacc_tipo_fk;
        this.reacc_post_fk = reacc_post_fk;
    }
}