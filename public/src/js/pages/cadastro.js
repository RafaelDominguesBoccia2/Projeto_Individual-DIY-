let formulario = document.getElementById('formulario');
let campoNome = document.getElementById('nome');
let campoEmail = document.getElementById('email');
let campoSenha = document.getElementById('senha');
let campoConfirmar = document.getElementById('confirmar');

let erroNome = document.getElementById('erro-nome');
let erroEmail = document.getElementById('erro-email');
let erroSenha = document.getElementById('erro-senha');
let erroConfirmar = document.getElementById('erro-confirmar');

let requisitos = document.getElementsByClassName('requisito');
let textoForca = document.getElementById('texto-forca');
let barraForca = document.getElementById('forca');

function mostrarForca() {
  let resultado = avaliarSenha(campoSenha.value);
  let cumpridos = [resultado.tamanho, resultado.letraMais, resultado.letraMinus, resultado.numero, resultado.especial];
  let nivelBarra = 0;

  for (let i = 0; i < cumpridos.length; i++) {
    requisitos[i].classList.toggle('requisito-ativo', cumpridos[i]);
  }

  if (resultado.nivel === 0) {
    textoForca.textContent = '';
  } else if (resultado.nivel < 2) {
    textoForca.textContent = 'Senha fraca';
    nivelBarra = 1;
  } else if (resultado.nivel < 5) {
    textoForca.textContent = 'Senha média';
    nivelBarra = 2;
  } else {
    textoForca.textContent = 'Senha forte';
    nivelBarra = 3;
  }

  barraForca.setAttribute('data-nivel', nivelBarra);
}

function conferirNome() {
  let mensagem = validarNome(campoNome.value);
  mostrarErro(campoNome, erroNome, mensagem);
  return mensagem;
}

function conferirEmail() {
  let mensagem = validarEmail(campoEmail.value);
  mostrarErro(campoEmail, erroEmail, mensagem);
  return mensagem;
}

function conferirSenha() {
  let mensagem = validarSenha(campoSenha.value, campoNome.value, campoEmail.value);
  mostrarErro(campoSenha, erroSenha, mensagem);
  return mensagem;
}

function conferirConfirmacao() {
  let mensagem = validarConfirmacao(campoSenha.value, campoConfirmar.value);
  mostrarErro(campoConfirmar, erroConfirmar, mensagem);
  return mensagem;
}

campoNome.addEventListener('input', () => {
  conferirNome();
  if (campoSenha.value !== '') {
    conferirSenha();
  }
});

campoEmail.addEventListener('input', () => {
  conferirEmail();
  if (campoSenha.value !== '') {
    conferirSenha();
  }
});

campoSenha.addEventListener('input', () => {
  mostrarForca();
  conferirSenha();
  if (campoConfirmar.value !== '') {
    conferirConfirmacao();
  }
});

campoConfirmar.addEventListener('input', conferirConfirmacao);

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let tudoCerto = true;

  if (conferirNome() !== '') {
    tudoCerto = false;
  }
  if (conferirEmail() !== '') {
    tudoCerto = false;
  }
  if (conferirSenha() !== '') {
    tudoCerto = false;
  }
  if (conferirConfirmacao() !== '') {
    tudoCerto = false;
  }

  if (!tudoCerto) {
    let primeiroInvalido = document.getElementsByClassName('campo-entrada-invalido')[0];
    if (primeiroInvalido) {
      primeiroInvalido.focus();
    }
    return;
  }

  fetch('/usuarios/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: campoNome.value.trim(),
      email: campoEmail.value.trim().toLowerCase(),
      senha: campoSenha.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.status === 201) {
        window.location.href = '/src/pages/login.html';
      } else if (resposta.status === 409) {
        mostrarErro(campoEmail, erroEmail, 'Este e-mail já está cadastrado.');
        campoEmail.focus();
      } else {
        mostrarErro(campoEmail, erroEmail, 'Não foi possível cadastrar agora. Tente de novo.');
      }
    })
    .catch(function () {
      mostrarErro(campoEmail, erroEmail, 'Sem conexão com o servidor. Tente de novo.');
    });
});

mostrarForca();
