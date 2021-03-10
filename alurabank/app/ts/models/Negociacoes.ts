import {Negociacao} from './Negociacao';
import {logarTempoDeExecucao} from '../helpers/decorators/index';

export class Negociacoes 
{
    //forma de declarar o array
    // private _negociacoes : Array<Negociacao> =[]; 

    private _negociacoes : Negociacao[] = [] ;

    @logarTempoDeExecucao()
    adiciona(negociacao : Negociacao){

    this._negociacoes.push(negociacao);
   }

   @logarTempoDeExecucao(true)
   paraArray() : Negociacao[]{
       //antes de usar programação defensiva
       //return this._negociacoes;

       return ([] as Negociacao[]).concat(this._negociacoes); //transferindo dados para um clone do array negociacoes
       /*o array estava com problema pq o tipo dele não estava definido 
       com o strictNullChecks ativado essa ação foi necessária
       então ele está definido com o tipo Negociacao 
       */
   }

    paraTexto() : void {
        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

}

