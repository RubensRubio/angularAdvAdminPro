import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) { }

    imprimirUsuario(nombre: string) {
        console.log(`My user : ${nombre}`);
    }

    get imagenUrl() {

        if (!this.img)
            return `${base_url}/upload/usuarios/no-img.jpg`;

        if (this.img?.includes('https')) {
            console.log(this.img);
            return this.img;
        }

        if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-img.jpg`;
        }
    }

}
