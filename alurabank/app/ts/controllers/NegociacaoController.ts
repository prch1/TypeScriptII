
import { NegociacoesView, MensagemView} from '../views/index';
import {Negociacao, Negociacoes, NegociacaoParcial} from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import {NegociacaoService, ResponseHandler} from '../services/index';
import {imprime} from '../helpers/index';


/*
import {Negociacoes} from '../models/Negociacoes';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
*/

//let timer = 0;

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
    private _service = new NegociacaoService();

      //Conversão do tipo muito generico para um bem especifico de forma implicita

    constructor()
    {
      this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(event : Event)
    {
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

            imprime(negociacao, this._negociacoes);

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

    @throttle()
    importarDados()
    {  
       
      const isOk : ResponseHandler = (res : Response) => {
          if(res.ok) return res;
          throw new Error(res.statusText);
      }
      
      /*function isOK(res: Response)
       {
           if(res.ok)
           {
             return res;
           } else
           {
              throw new Error(res.statusText);
           }
       }*/

      // clearTimeout(timer)
      // timer = setTimeout(() => {

      this._service
        .obterNegociacoes(isOk)
        .then(negociacoes => {
              negociacoes.forEach(negociacao => 
                this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
              });
      // }, 500);

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
