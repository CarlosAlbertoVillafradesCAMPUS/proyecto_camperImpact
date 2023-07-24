var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
export class dtoReacciones {
    constructor(reacc_tipo_fk, reacc_post_fk) {
        this.reacc_tipo_fk = reacc_tipo_fk;
        this.reacc_post_fk = reacc_post_fk;
    }
}
__decorate([
    Expose({ name: "tipo_reaccion" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros de entrada: "tipo_reaccion"` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoReacciones.prototype, "reacc_tipo_fk", void 0);
__decorate([
    Expose({ name: "post" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros de entrada: "post"` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoReacciones.prototype, "reacc_post_fk", void 0);
