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

somBit.loop = true;
somBit.play();

intervalo.innerText = "Digite um número entre " + min + " e " + max + ":";

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
      intervalo.innerText = "Digite um número entre " + min + " e " + max + ":";
      tentativasExtras += pos;
      tentativas += tentativasExtras;
      tentativasNum.innerText = tentativas;
      alert("Parabéns! Você ganhou " + tentativasExtras + " tentativas extras!");
      somParabens.play();
    } else {
      tentativas -= 1;
      tentativasNum.innerText = tentativas;
      if(entrada.value > resposta) {
        mensagem.innerText = "Você errou! O número digitado é maior.";
      } else {
        mensagem.innerText = "Você errou! O número digitado é menor.";
      }
      mensagem.style.color = 'red';
      mensagem.style.fontSize = '20px';
      somErrou.play();
      setTimeout(function() {
        mensagem.style.fontSize = '16px';
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
    mensagem.innerText = "Você não tem mais tentativas!";
    mensagem.style.color = 'red';
    somGameOver.play();
    somBit.pause();
    gameOverDiv.style.display = 'block';
    setInterval(function() {
      document.body.style.backgroundColor = document.body.style.backgroundColor == 'white' ? 'red' : 'white';
    }, 500);
  }
}

function gameOver() {
  if(gameOverInput.value == '1') {
    location.reload();
  } else if(gameOverInput.value == '2') {
    document.body.innerHTML = "<h1 style='text-align:center;'>Game Over</h1>";
    setInterval(function() {
      document.body.style.backgroundColor = document.body.style.backgroundColor == 'white' ? 'red' : 'white';
    }, 500);
  }
}