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
export class dtoUsuario {
    constructor(usu_id, usu_nombre, usu_password, usu_apodo, usu_genero_fk, usu_edad, usu_ciudad_fk, usu_direccion, usu_descripcion, usu_image) {
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
__decorate([
    Expose({ name: "tel" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoUsuario.prototype, "usu_id", void 0);
__decorate([
    Expose({ name: "nombre_completo" }),
    Transform(({ value }) => {
        if (/^[A-Z-a-z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoUsuario.prototype, "usu_nombre", void 0);
__decorate([
    Expose({ name: "password" }),
    Transform(({ value }) => {
        if (/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoUsuario.prototype, "usu_password", void 0);
__decorate([
    Expose({ name: "apodo" }),
    Transform(({ value }) => {
        if (/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoUsuario.prototype, "usu_apodo", void 0);
__decorate([
    Expose({ name: "genero_id" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoUsuario.prototype, "usu_genero_fk", void 0);
__decorate([
    Expose({ name: "edad" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoUsuario.prototype, "usu_edad", void 0);
__decorate([
    Expose({ name: "ciudad_id" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoUsuario.prototype, "usu_ciudad_fk", void 0);
__decorate([
    Expose({ name: "direccion" }),
    Transform(({ value }) => {
        if (/^[\w\s+#-]+$/.test(value) || value === null)
            return value;
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoUsuario.prototype, "usu_direccion", void 0);
__decorate([
    Expose({ name: "descripcion" }),
    Transform(({ value }) => {
        if (/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoUsuario.prototype, "usu_descripcion", void 0);
__decorate([
    Expose({ name: "image" }),
    Transform(({ value }) => {
        if (/^[\w\s+#-]+$/.test(value) || value === null)
            return value;
        else
            throw { status: 400, message: `Error en los parametros de entrada "${value}"` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoUsuario.prototype, "usu_image", void 0);
