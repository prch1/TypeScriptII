
class Negociacoes 
{
    //forma de declarar o array
    // private _negociacoes : Array<Negociacao> =[]; 

    private _negociacoes : Negociacao[] = [] ;

    adiciona(negociacao : Negociacao){

    this._negociacoes.push(negociacao);
   }

   paraArray() : Negociacao[]{
       //antes de usar programação defensiva
       //return this._negociacoes;

       return [].concat(this._negociacoes); //transferindo dados para um clone do array negociacoes
   }
}

