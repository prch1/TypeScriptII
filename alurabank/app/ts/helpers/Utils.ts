import {Imprimivel, Negociacao, Negociacoes} from '../models/index';


export function imprime(...objetos:Imprimivel[])
{
    objetos.forEach(objeto => objeto.paraTexto());
}
