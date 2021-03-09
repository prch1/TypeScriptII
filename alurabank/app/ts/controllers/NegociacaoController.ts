
import { NegociacoesView, MensagemView} from '../views/index';
import {Negociacao, Negociacoes} from '../models/index';
import { domInject } from '../helpers/decorators/index'

/*
import {Negociacoes} from '../models/Negociacoes';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
*/

export class NegociacaoController
{
    @domInject('#data')  
    private  _inputData : JQuery;
    @domInject('#quantidade')
    private  _inputQuantidade : JQuery;
    @domInject('#valor')
    private  _inputValor : JQuery;
   
    private  _negociacoes = new Negociacoes(); //funciona dessa forma resumida também;
    //private  _negociacoes : Negociacoes = new Negociacoes(); definir o tipo e instanciar 
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

      //Conversão do tipo muito generico para um bem especifico de forma implicita

    constructor()
    {
      this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event : Event)
    {
        event.preventDefault();
   
        //converter as string para o respectivo tipo esperado pelo constructor() de Negociacao.

        let data = new Date(this._inputData.val().replace(/-/g,','));

        if(!this._ehDiaUtil(data))
        {
          this._mensagemView.update('Somente negociações em dias uteis!');
          return
        }

        const negociacao = new Negociacao
            (
                     data,
                     parseInt(this._inputQuantidade.val()),
                     parseFloat(this._inputValor.val())
            );

            this._negociacoes.adiciona(negociacao);
            this._negociacoesView.update(this._negociacoes);
            this._mensagemView.update('Negociação adicionada');

           /*
            //console.log(this._negociacoes.paraArray()); exibir tudo de uma vez

            this._negociacoes.paraArray().length = 0; //apagar todos os elementos do array 
       
                this._negociacoes.paraArray().forEach(negociacao => {
                console.log(negociacao.data);
                console.log(negociacao.quantidade);
                console.log(negociacao.valor);
            });
            */
    }

    importarDados()
    {  
       function isOK(res: Response)
       {
           if(res.ok)
           {
             return res;
           } else
           {
              throw new Error(res.statusText);
           }
       }

       fetch('http://localhost:8088/dados')
       .then(res => isOK(res))
       .then(res => res.json())
       .then((dados : any[]) => {
                    dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                    this._negociacoesView.update(this._negociacoes);
       })
       .catch(err => console.log(err.message));
    }


    private _ehDiaUtil(data : Date)
    {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta, 
  Quinta, 
  Sexta, 
  Sabado, 
}
