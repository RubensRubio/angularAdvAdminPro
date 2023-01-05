import { Usuario } from "../models/usuario.models";

export interface ObtenerUsuario {
    total: number;
    usuarios: Usuario[];
}