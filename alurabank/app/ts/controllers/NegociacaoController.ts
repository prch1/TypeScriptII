import {Negociacoes} from '../models/Negociacoes';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';


export class NegociacaoController
{

    private  _inputData : JQuery;
    private  _inputQuantidade : JQuery;
    private  _inputValor : JQuery;
    private  _negociacoes = new Negociacoes(); //funciona dessa forma resumida também;
    //private  _negociacoes : Negociacoes = new Negociacoes(); definir o tipo e instanciar 
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

      //Conversão do tipo muito generico para um bem especifico de forma implicita

    constructor()
    {
      this._inputData = $('#data');
      this._inputQuantidade = $('#quantidade');
      this._inputValor = $('#valor');
      this._negociacoesView.update(this._negociacoes);

    }

    adiciona(event : Event)
    {
        event.preventDefault();
       
        //converter as string para o respectivo tipo esperado pelo constructor() de Negociacao.

        const negociacao = new Negociacao
            (
                     new Date(this._inputData.val()
                      .replace(/-/g,',')),
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

}