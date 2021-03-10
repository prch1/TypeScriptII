import {Imprimivel} from './Imprimivel';


export class Negociacao implements Imprimivel
{
     
   /*  Escrita tradicional
    private _data : Date;
    private _quantidade : number;
    private _valor : number;
    
    constructor( data :Date, quantidade : number, valor : number)
        {
        this._data =data;
        this._quantidade = quantidade;
        this._valor = valor;
        }
    */

        constructor(
            readonly data : Date,
            readonly quantidade : number,
            readonly valor : number
        ) { }

        get volume(){
            return this.quantidade * this.valor;
        }

        paraTexto() : void {

                console.log('-- paraTexto --');
                console.log(
                    `Data: ${this.data}
                    Quantidade: ${this.quantidade}, 
                    Valor: ${this.valor}, 
                    Volume: ${this.volume}`
                );
         }

}