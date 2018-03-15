var TuringMachine = function (fita) {
    this.fita = fita === undefined ? [] : fita;
    this.estadoAtual = 0;
    this.posicaoAtual = 0;
    this.maquinaRodando = false;
    let self = this;

    this.apagarPosicao = function () {
        self.fita[self.posicaoAtual] = '';
    };

    this.preencherPosicao = function () {
        self.fita[self.posicaoAtual] = '*';
    };

    this.posicaoPreenchida = function () {
        return self.fita[self.posicaoAtual] === '*';
    };

    this.moverEsquerda = function () {
        self.posicaoAtual--;
    };

    this.moverDireita = function () {
        self.posicaoAtual++;
    };
    
    this.iniciar = function(){
        self.maquinaRodando = true;
    };
    
    this.parar = function(){
        self.maquinaRodando = false;
    }
    
    this.isMaquinaRodando = function(){
        return self.maquinaRodando;
    }
    
    this.getPosicaoAtual = function (){
        return self.posicaoAtual;
    }

};