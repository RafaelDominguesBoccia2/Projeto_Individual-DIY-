const formulario = document.getElementById('formulario');
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const campoConfirmar = document.getElementById('confirmar');

const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');
const erroSenha = document.getElementById('erro-senha');
const erroConfirmar = document.getElementById('erro-confirmar');

const requisitos = document.getElementsByClassName('requisito');
const textoForca = document.getElementById('texto-forca');
const barraForca = document.getElementById('forca');

function mostrarForca() {
  const resultado = avaliarSenha(campoSenha.value);
  const cumpridos = [resultado.tamanho, resultado.letraMais, resultado.letraMinus, resultado.numero, resultado.especial];
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
  const mensagem = validarNome(campoNome.value);
  mostrarErro(campoNome, erroNome, mensagem);
  return mensagem;
}

function conferirEmail() {
  const mensagem = validarEmail(campoEmail.value);
  mostrarErro(campoEmail, erroEmail, mensagem);
  return mensagem;
}

function conferirSenha() {
  const mensagem = validarSenha(campoSenha.value, campoNome.value, campoEmail.value);
  mostrarErro(campoSenha, erroSenha, mensagem);
  return mensagem;
}

function conferirConfirmacao() {
  const mensagem = validarConfirmacao(campoSenha.value, campoConfirmar.value);
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
    const primeiroInvalido = document.getElementsByClassName('campo-entrada-invalido')[0];
    if (primeiroInvalido) {
      primeiroInvalido.focus();
    }
    return;
  }

  sessionStorage.removeItem('NOME_COMPLETO');
  sessionStorage.removeItem('EMAIL');
  sessionStorage.removeItem('PASSWORD');

  sessionStorage.setItem('NOME_COMPLETO', campoNome.value.trim());
  sessionStorage.setItem('EMAIL', campoEmail.value.trim().toLowerCase());
  sessionStorage.setItem('PASSWORD', campoSenha.value);

  window.location.href = '/pages/login/html/login.html';
});

mostrarForca();
