//constantes que armazenam valores dos query selectors
const botao__tarefa = document.querySelector(".app__button--add-task");
const form__Adicionar__tarefa = document.querySelector(".app__form-add-task");
const text_área = document.querySelector(".app__form-textarea");
const lista__tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const ul__tarefas = document.querySelector('.app__section-task-list');
const botao__cancelar = document. querySelector('.app__form-footer__button--cancel');
const parágrafo__descrição__tarefa = document.querySelector('.app__section-active-task-description');
let tarefa__selecionada = null
let li__tarefa__selecionada = null
//Função para criar nova tarefa
function novas__tarefas(){
    localStorage.setItem('tarefas',JSON.stringify(lista__tarefas));
}

//Função para criar o item tarefa
function criarTarefa(tarefa){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
    
// Ao criar uma  tarefa, o svg criará a estrutura gráfica que representa esse item   
    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    //Criando o parágrafo da tarefa
    const parágrafo = document.createElement('p');
    parágrafo.textContent = tarefa.descrição;
    parágrafo.classList.add('app__section-task-list-item-description');

    //Crinado o botão da tarefa
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    
    //Ao clicar em editar a tarefa, você poderá renomear a descrição e salvar-la na local storage
    botao.onclick = () => {
        //debugger
        const nova__descrição = prompt("Qual é o novo nome da tarefa?");
        //console.log('Nova descrição da tarefa', nova__descrição);
        if(nova__descrição){
            parágrafo.textContent = nova__descrição;
            tarefa.descrição = nova__descrição;
            novas__tarefas();
        } 
    }
    
    //Criando a imagem do botão: editar tarefa
    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute ('src','/imagens (2)/edit.png');
    botao.append(imagemBotao);
    
    //Adicionando o svg, o botão e o parágrafo na interface
    li.append(svg);
    li.append(parágrafo);
    li.append (botao);
    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
        if (tarefa__selecionada == tarefa){
            parágrafo__descrição__tarefa.textContent = ' '
            tarefa__selecionada = null
            li__tarefa__selecionada = null
            return
        }
        tarefa__selecionada = tarefa;
        li__tarefa__selecionada =
        parágrafo__descrição__tarefa.textContent = tarefa.descrição;
        li.classList.add('app__section-task-list-item-active');
        
    }
    return li;
}

//Código para aparecer o formulário quando clico em adicionar tarefa;
botao__tarefa.addEventListener('click', () =>{
    form__Adicionar__tarefa.classList.toggle('hidden');
});

//Código para a página salvar os textos da tarefa
form__Adicionar__tarefa.addEventListener('submit',(evento)=> {
    evento.preventDefault();
    const tarefa = {
        descrição:text_área.value
    } 
//Código para salvar as tarefas como string em uma lista no LocalStorage
    lista__tarefas.push(tarefa);
    const elementoTarefa = criarTarefa(tarefa);
    ul__tarefas.append(elementoTarefa);
    novas__tarefas();
    text_área = ""
    form__Adicionar__tarefa.classList.add('hidden');
})

lista__tarefas.forEach(tarefa =>{
    const elementoTarefa = criarTarefa(tarefa)
    ul__tarefas.append(elementoTarefa);
});

//Função para cancelar a tarefa
const limpar__form = () =>{
    text_área.value = ''
    form__Adicionar__tarefa.classList.add('hidden');
} 

botao__cancelar.addEventListener('click', limpar__form);

document.addEventListener('FocoFinalizado', () => {
    if(tarefa__selecionada && li__tarefa__selecionada){
        li__tarefa__selecionada.classList.remove('app__section-task-list-item-active')
        li__tarefa__selecionada.classList.add('app__section-task-list-item-complete')
        li__tarefa__selecionada.querySelector('button').setAttribute('disabled','disabled')
    }
    
})
