var loop;
var arrayDivsFita = [];
var larguraContainer = 1300;
var larguraImgCelula = 25.99;
var num1;
var num2;

//Largura da div fita / total de celulas
var stepSize;

window.onload = function () {
    definicoesCss();
    //document.getElementById('visor').style.backgroundColor = 'green';
    setarValorVisor('PRONTO');
}

function startMachine() {

    num1 = document.getElementById('num1').value;
    num2 = document.getElementById('num2').value;


    console.log(num1);
    console.log(num2);

    if (num1 == '' || num2 == '') {
        alert('Favor informar os numeros que deseja somar');
        return;
    }

    let fita = gerarFita(num1, num2);
    var tm = new TuringMachine(fita);
    resetarMaquina();
    renderizarFita(fita);
    //destacarCelula(0);
    stepSize = obterStepSize();


    var tamFita = document.getElementById('fita').clientWidth;
    setarTamanhoDivMovedora((larguraContainer / 2 - larguraImgCelula + 4));

    tm.iniciar();

    destacarCelula(0);

    loop = setInterval(function () {



        processar(tm);
        setarValorVisor(tm.estadoAtual);
        destacarCelula(tm.getPosicaoAtual());


    }, 700);

}


function processar(tm) {

    if (!tm.isMaquinaRodando()) {
        console.log('Maquina parada');
        setarValorVisor('PARADO');
        clearInterval(loop);
        return;
    }

    //console.log('processar(): chamada');
    //console.log(tm.fita);


    switch (tm.estadoAtual) {
        case 0:
            console.log('Maquina no estado 0');
            if (tm.posicaoPreenchida()) {
                moverFitaEsquerda();
                tm.moverDireita();
                tm.estadoAtual = 0;
            } else {
                tm.preencherPosicao();
                preencherCelula(tm.getPosicaoAtual());
                tm.moverDireita();
                moverFitaEsquerda();
                tm.estadoAtual = 1;
            }
            break;
        case 1:
            console.log('Maquina no estado 1');
            if (tm.posicaoPreenchida()) {
                tm.moverDireita();
                moverFitaEsquerda();
                tm.estadoAtual = 1;
            } else {
                tm.moverEsquerda();
                moverFitaDireita();
                tm.estadoAtual = 2;
            }
            break;
        case 2:
            console.log('Maquina no estado 2');
            if (tm.posicaoPreenchida()) {
                ApagarCelula(tm.getPosicaoAtual());
                tm.apagarPosicao();

                tm.parar();


            }
            break;

    }

}

function gerarFita(num1, num2) {

    var arrFita = [];

    var total = parseInt(num1) + parseInt(num2) + 2;
    console.log(total);

    for (var i = 0; i < total; i++) {
        arrFita.push('*');
    }

    arrFita[num1] = '';
    arrFita[total - 1] = '';

    return arrFita;
}

function resetarMaquina() {
    limparFita();
    clearInterval(loop);
    arrayDivsFita = [];
    setarTamanhoDivMovedora(0);
}

function limparFita() {
    document.getElementById('fita').innerHTML = '';
}

function moverFitaDireita() {
    var divMovedora = document.getElementById('divMovedora');
    var larguraAtual = divMovedora.clientWidth;
    // setarTamanhoDivMovedora(larguraAtual - (larguraImgCelula + larguraImgCelula /2) - 2);
    setarTamanhoDivMovedora(larguraAtual + stepSize);
}

function moverFitaEsquerda() {
    var divMovedora = document.getElementById('divMovedora');
    var larguraAtual = divMovedora.clientWidth;
    // setarTamanhoDivMovedora(larguraAtual - (larguraImgCelula + larguraImgCelula /2) - 2);
    setarTamanhoDivMovedora(larguraAtual - stepSize);

}

function obterStepSize() {
    return document.getElementById('fita').clientWidth / (parseInt(num1) + parseInt(num2) + 2);
}

function setarTamanhoDivMovedora(largura) {
    var divMovedora = document.getElementById('divMovedora');
    divMovedora.style.width = largura + 'px';
}

function preencherCelula(numCelula) {
    if (arrayDivsFita[numCelula] == undefined) {
        return;
    }
    arrayDivsFita[numCelula].childNodes[0].setAttribute('src', 'img/estrela.png');
}

function ApagarCelula(numCelula) {
    if (arrayDivsFita[numCelula] == undefined) {
        return;
    }
    arrayDivsFita[numCelula].childNodes[0].setAttribute('src', 'img/void.png');
}

function renderizarFita(fita) {
    var divFita = document.getElementById('fita');

    for (var i in fita) {
        let divCelula = document.createElement('div');
        divCelula.classList.add('celula');
        let img;

        if (fita[i] == '') {
            img = document.createElement('img');
            img.setAttribute('id', 'imgVazia');
            img.setAttribute('src', 'img/void.png');
        } else {
            img = document.createElement('img');
            img.setAttribute('id', 'imgCheia');
            img.setAttribute('src', 'img/estrela.png');
        }

        img.classList.add('imgCelula');
        divCelula.appendChild(img);

        //divCelula.appendChild(document.createTextNode(fita[i]));
        //divCelula.innerText = fita[i];
        divFita.appendChild(divCelula);
        arrayDivsFita.push(divCelula);
    }
}


function definicoesCss() {
    //Largura e margin left container geral
    let containerGeral = document.getElementById('container');
    containerGeral.style.width = larguraContainer + 'px';
    containerGeral.style.marginLeft = 'calc(50% - ' + (larguraContainer / 2) + 'px)';

    //CSS imagens celula

//    let arrImgsCelula = document.getElementsByClassName('imgCelula');
//    
//    for(var img in arrImgsCelula){
//        img.style.width = larguraImgCelula + 'px';
//        img.style.border = '1px solid'; 
//    }

}

function destacarCelula(numCelula) {

    if (arrayDivsFita[numCelula] == undefined) {
        return;
    }

    for (var i in arrayDivsFita) {
        if (i == numCelula) {
            arrayDivsFita[i].style.border = "1px solid red";
            //stepSize = obterStepSize() + 2;
        } else {
            arrayDivsFita[i].style.border = "1px solid #939393";
        }
    }


}

function setarValorVisor(valor) {
    document.getElementById('visor').innerHTML = valor;
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}