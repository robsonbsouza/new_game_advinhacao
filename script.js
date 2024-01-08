var pos = 0;
var pontos = 0;
var tentativas = 5;
var tentativasExtras = 0;
var box = document.getElementById("caixa");
var pontosBox = document.getElementById("pontosBox");
var tentativasBox = document.getElementById("tentativasBox");
var num = document.getElementById("numero");
var pontosNum = document.getElementById("pontos");
var tentativasNum = document.getElementById("tentativas");
var pontosTexto = document.getElementById("pontosTexto");
var texto = document.getElementById("texto");
var entrada = document.getElementById("entrada");
var mensagem = document.getElementById("mensagem");
var intervalo = document.getElementById("intervalo");
var gameOverDiv = document.getElementById("gameOver");
var gameOverInput = document.getElementById("gameOverInput");
var min = 1;
var max = 5;
var resposta = Math.floor(Math.random() * (max - min + 1)) + min;
var som = new Audio('moeda.mp3');
var somBit = new Audio('bit.mp3');
var somErrou = new Audio('errou.mp3');
var somParabens = new Audio('parabens.mp3');
var somGameOver = new Audio('gameOver.mp3');

ativarsom = confirm('SEJA BEM VINDO(a) AO JOGO DE ADIVINHAÇÃO! \n\n CLIQUE EM OK PARA ATIVAR O SOM OU CANCELAR PARA DESATIVAR.');

if (ativarsom == true) {
somBit.loop = true;
somBit.play();
}

intervalo.innerText = "O numero secreto está entre " + min + " e " + max + ":";
intervalo.style.fontSize = "45px"; // Altere o tamanho da fonte para 20px
intervalo.style.color = 'yellow'


function verificar() {
  if(tentativas > 0) {
    if(entrada.value == resposta) {
      mensagem.innerText = "Você acertou!";
      mensagem.style.color = 'black';
      pos += 1;
      pontos += 50;
      num.innerText = pos;
      pontosNum.innerText = pontos;
      box.style.transform = 'rotate(' + pos * 360 + 'deg)';
      box.style.transition = 'transform 1s';
      setTimeout(function() {
        num.style.transform = 'scale(1.5)';
        texto.style.transform = 'scale(1.5)';
        setTimeout(function() {
          num.style.transform = 'scale(1)';
          texto.style.transform = 'scale(1)';
        }, 1000);
      }, 1000);
      pontosBox.style.transform = 'scale(1.5)';
      pontosBox.style.transition = 'transform 1s';
      pontosBox.style.backgroundColor = '#32CD32';
      setTimeout(function() {
        pontosBox.style.transform = 'scale(1)';
        pontosBox.style.backgroundColor = '#f54242';
      }, 1000);
      som.play();
      min = max + 1;
      max = min + 9 + pos * 5;
      resposta = Math.floor(Math.random() * (max - min + 1)) + min;
      intervalo.innerText = "O numero secreto está entre " + min + " e " + max + ":";
      intervalo.style.color = 'yellow'
      tentativasExtras += pos;
      tentativas += tentativasExtras;
      tentativasNum.innerText = tentativas;
      somParabens.play();
      alert("Parabéns! Você ganhou " + tentativasExtras + " tentativas extras!");
      
      document.getElementById('entrada').value = "";
    } else {
      tentativas -= 1;
      tentativasNum.innerText = tentativas;
      if(entrada.value > resposta) {
        mensagem.innerText = "Você errou! Seu numero é maior que o numero secreto.";
        document.getElementById('entrada').value = "";
      } else {
        mensagem.innerText = "Você errou! Seu numero é menor que o numero secreto.";
        document.getElementById('entrada').value = "";
      }
      mensagem.style.color = 'white';
      mensagem.style.fontSize = '40px';
      somErrou.play();
      setTimeout(function() {
        mensagem.style.fontSize = '30px';
      }, 1000);
      tentativasBox.style.transform = 'scale(1.5)';
      tentativasBox.style.transition = 'transform 1s';
      tentativasBox.style.backgroundColor = '#ff0000';
      setTimeout(function() {
        tentativasBox.style.transform = 'scale(1)';
        tentativasBox.style.backgroundColor = '#4287f5';
      }, 1000);
    }
  } else {
    mensagem.innerText = "Você não tem mais tentativas! \n\n Mais pode iniciar um novo jogo digite 1 na caixa branca abaixo ou 2 para finalizar o jogo.";
    mensagem.style.color = 'white';
    mensagem.style.fontSize = '40px';
    mensagem.style.textAlign = 'center';
    mensagem.style.lineHeight = '0.6'
    somGameOver.play();
    somBit.pause();
    gameOverDiv.style.display = 'block';
    setInterval(function() {
      document.body.style.backgroundColor = document.body.style.backgroundColor == 'red';
    }, 500);
  }
}

function gameOver() {
  if(gameOverInput.value == '1') {
    location.reload();
  } else if(gameOverInput.value == '2') {
    document.body.innerHTML = "<h1 style='text-align:center;'>Game Over, obrigado por jogar!</h1>";
    
  }
}
