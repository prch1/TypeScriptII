import {NegociacaoController} from './controllers/NegociacaoController';

const controller = new NegociacaoController();

$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importaDados.bind(controller));

    //bibliotecas tsd  https://github.com/DefinitelyTyped/DefinitelyTyped.


/*
    No npm, existe uma série de TypeScript definitons files para as mais diversas bibliotecas e 
    frameworks do mercado. Por exemplo, se quisermos instalar o tsd do jQuery, 
    acessamos

https://www.npmjs.com/package/@types/jquery

Se quisermos do lodash ou underscore acessamos

https://www.npmjs.com/package/@types/lodash

https://www.npmjs.com/package/@types/underscore


npm install @types/jquery --save-dev
npm install @types/lodash --save-dev
npm install @types/underscore --save-dev

*/


