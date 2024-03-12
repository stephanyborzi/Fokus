//constantes que armazenam valores dos query selectors
const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const temporizador = document.querySelector('#timer')
const botoes = document.querySelectorAll('.app__card-button');
const IniciarouPausar__botao = document.querySelector('#start-pause span')
const musica__input = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
let tempo__decorrido = 50;
let intervaloID = null;
const start_pause = document.querySelector('#start-pause');
const som__começar = new Audio('/sons/play.wav');
const som__beep = new Audio ('/sons/beep.mp3');
const som__pausar = new Audio ('/sons/pause.mp3');

// Código referente ao botão de habilitar músicas
musica__input.addEventListener('change',() =>{
    if(musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
});

//Código referente a ativação dos botões:foco, descanso curto e descanso longo
botaoFoco.addEventListener('click', () =>{
    tempo__decorrido = 1500;
    AlterarContexto('foco');
    botaoFoco.classList.add('active');
});

botaoCurto.addEventListener('click', () => {
    tempo__decorrido = 300;
    AlterarContexto('descanso-curto');
    botaoCurto.classList.add('active');
});

botaoLongo.addEventListener('click', () => {
    tempo__decorrido = 900;
    AlterarContexto('descanso-longo');
    botaoLongo.classList.add('active');
});

function AlterarContexto(contexto) {
    Mostrar__na__Tela();
    botoes.forEach(function (contexto) {
       contexto.classList.remove('active');
    })
    
   //Alteração de imagem e texto nas páginas: foco, descanso curto e descanso longo
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png` );
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
       
        case 'descanso-curto':
            titulo.innerHTML=`
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        
        case 'descanso-longo':
            titulo.innerHTML=`
            Hora de voltar a superfície<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
    }
}

//Finalizando contagem
const contagem = () => {
    if(tempo__decorrido<=0){
        som__beep.play();
        alert('Tempo Finalizado');
        const FocoAtivo = html.getAttribute('data-contexto')=='foco';
        if (FocoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar();
        return
    }
    tempo__decorrido -= 1;
    Mostrar__na__Tela();
}

//Botão iniciar e pausar
start_pause.addEventListener('click', iniciaroupausar);

function iniciaroupausar(){
    if(intervaloID){
        som__pausar.play();
        zerar()
        return
    }
    som__começar.play();
    intervaloID=setInterval(contagem,1000);
    IniciarouPausar__botao.textContent ='Pausar';

}

function zerar(){
    clearInterval(intervaloID);
    intervaloID = null;
    IniciarouPausar__botao.textContent ='Começar';
}

//Código para mostrar a contagem do temporizador na Tela

function Mostrar__na__Tela(){
    const tempo =new Date(tempo__decorrido*1000)
    const tempo__formatado = tempo.toLocaleTimeString('pt-br',{minute:'2-digit',second:'2-digit'})
    temporizador.innerHTML = `${tempo__formatado}`;
}
Mostrar__na__Tela();