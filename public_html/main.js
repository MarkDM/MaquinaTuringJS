var loop;
var arrayDivsFita = [];

function startMachine() {

    let num1 = document.getElementById('num1').value;
    let num2 = document.getElementById('num2').value;

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
    var tamFita = document.getElementById('fita').clientWidth;
    setarTamanhoDivMovedora(467.111);
    tm.iniciar();

    loop = setInterval(function () {
        processar(tm);
    }, 1000);

}


function processar(tm) {

    if (!tm.isMaquinaRodando()) {
        console.log('Maquina parada');
        clearInterval(loop);
        return;
    }

    console.log('processar(): chamada');
    console.log(tm.fita);

    switch (tm.estadoAtual) {
        case 0:
            console.log('Maquina no estado 0');
            if (tm.posicaoPreenchida()) {

                tm.moverDireita();
                moverFitaDireita();
                tm.estadoAtual = 0;
            } else {
                tm.preencherPosicao();
                tm.moverDireita();
                moverFitaDireita();
                tm.estadoAtual = 1;
            }
            break;
        case 1:
            console.log('Maquina no estado 1');
            if (tm.posicaoPreenchida()) {
                tm.moverDireita();
                moverFitaDireita();
                tm.estadoAtual = 1;
            } else {
                tm.moverEsquerda();
                moverFitaEsquerda();
                tm.estadoAtual = 2;
            }
            break;
        case 2:
            console.log('Maquina no estado 2');
            if (tm.posicaoPreenchida()) {
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
        arrFita.push('*')
    }

    arrFita[num1] = '';
    arrFita[total - 1] = '';

    return arrFita;
}

function resetarMaquina() {
    limparFita();
    clearInterval(loop);

    setarTamanhoDivMovedora(0);
}

function limparFita() {
    document.getElementById('fita').innerHTML = '';
}

function moverFitaDireita() {
    var divMovedora = document.getElementById('divMovedora');
    var larguraAtual = divMovedora.clientWidth;

    setarTamanhoDivMovedora(larguraAtual - 27.889);

}

function moverFitaEsquerda() {
    var divMovedora = document.getElementById('divMovedora');
    var larguraAtual = divMovedora.clientWidth;
    setarTamanhoDivMovedora(larguraAtual + 27.889);

}

function setarTamanhoDivMovedora(largura) {
    var divMovedora = document.getElementById('divMovedora');
    divMovedora.style.width = largura + 'px';
}

function renderizarFita(fita) {
    var divFita = document.getElementById('fita');

    for (var i in fita) {
        let divCelula = document.createElement('div');

        if (fita[i] == '') {
            divCelula.classList.add('celulaVazia');
        } else {
            divCelula.classList.add('celula');
        }

        //divCelula.appendChild(document.createTextNode(fita[i]));
        divCelula.innerText = fita[i];
        divFita.appendChild(divCelula);
        arrayDivsFita.push(divCelula);
    }
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}