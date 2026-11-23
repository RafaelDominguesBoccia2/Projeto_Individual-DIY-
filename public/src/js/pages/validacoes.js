let senhasComuns = [
  '12345678', '123456789', '1234567890', '87654321', '11111111', '00000000',
  'senha123', 'senha1234', 'senha@123', 'password', 'password1', 'qwerty123',
  'qwertyuiop', 'abc12345', 'admin123', 'brasil123', 'mudar123', 'iloveyou',
];

function mostrarErro(campo, elementoErro, mensagem) {
  elementoErro.textContent = mensagem;

  if (mensagem === '') {
    campo.classList.remove('campo-entrada-invalido');
    campo.removeAttribute('aria-invalid');
  } else {
    campo.classList.add('campo-entrada-invalido');
    campo.setAttribute('aria-invalid', 'true');
  }
}

function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function validarNome(nome) {
  let texto = nome.trim();

  if (texto === '') {
    return 'Digite seu nome completo.';
  }
  if (texto.length < 3) {
    return 'O nome precisa ter pelo menos 3 caracteres.';
  }
  if (texto.indexOf(' ') === -1) {
    return 'Digite nome e sobrenome.';
  }
  if (/\p{N}/u.test(texto)) {
    return 'O nome não pode ter números.';
  }
  if (!/^[\p{L}\s'-]+$/u.test(texto)) {
    return 'O nome só pode ter letras e espaços.';
  }
  return '';
}

function validarEmail(email) {
  let texto = email.trim();

  if (texto === '') {
    return 'Digite seu e-mail.';
  }
  if (/\s/.test(texto)) {
    return 'O e-mail não pode ter espaços.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto)) {
    return 'Digite um e-mail válido. Ex.: seunome@exemplo.com';
  }
  return '';
}

function avaliarSenha(senha) {
  let tamanho = senha.length >= 8;
  let letraMais = /\p{Lu}/u.test(senha);
  let letraMinus = /\p{Ll}/u.test(senha);
  let numero = /\p{N}/u.test(senha);
  let especial = /[^\p{L}\p{N}\s]/u.test(senha);
  let nivel = 0;

  let resultado = {
    tamanho: tamanho,
    letraMais: letraMais,
    letraMinus: letraMinus,
    numero: numero,
    especial: especial,
    nivel: nivel,
  };
  let chaves = ['tamanho', 'letraMais', 'letraMinus', 'numero', 'especial'];

  for (let i = 0; i < chaves.length; i++) {
    if (resultado[chaves[i]]) {
      resultado.nivel++;
    }
  }

  return resultado;
}

function senhaEhComum(senha) {
  let minuscula = senha.toLowerCase();

  for (let i = 0; i < senhasComuns.length; i++) {
    if (minuscula === senhasComuns[i]) {
      return true;
    }
  }
  return false;
}

function temSequencia(senha) {
  let texto = senha.toLowerCase();

  for (let i = 0; i + 3 < texto.length; i++) {
    let crescente = true;
    let decrescente = true;

    for (let j = 0; j < 3; j++) {
      let atual = texto.charCodeAt(i + j);
      let proximo = texto.charCodeAt(i + j + 1);
      if (proximo !== atual + 1) {
        crescente = false;
      }
      if (proximo !== atual - 1) {
        decrescente = false;
      }
    }

    if (crescente || decrescente) {
      return true;
    }
  }
  return false;
}

function contemDadosPessoais(senha, nome, email) {
  let texto = removerAcentos(senha.toLowerCase());
  let partes = removerAcentos(nome.toLowerCase()).split(' ');
  let usuario = email.toLowerCase().split('@')[0];

  partes.push(usuario);

  for (let i = 0; i < partes.length; i++) {
    if (partes[i].length >= 3 && texto.indexOf(partes[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function validarSenha(senha, nome, email) {
  if (senha === '') {
    return 'Crie uma senha.';
  }
  if (senha.length < 8) {
    return 'A senha precisa ter no mínimo 8 caracteres.';
  }
  if (senha.length > 64) {
    return 'A senha pode ter no máximo 64 caracteres.';
  }
  if (/\s/.test(senha)) {
    return 'A senha não pode ter espaços.';
  }

  let resultado = avaliarSenha(senha);

  if (!resultado.letraMais) {
    return 'Inclua pelo menos 1 letra maiúscula.';
  }
  if (!resultado.letraMinus) {
    return 'Inclua pelo menos 1 letra minúscula.';
  }
  if (!resultado.numero) {
    return 'Inclua pelo menos 1 número.';
  }
  if (!resultado.especial) {
    return 'Inclua pelo menos 1 caractere especial. Ex.: ! @ # $';
  }
  if (senhaEhComum(senha)) {
    return 'Essa senha é muito comum. Escolha outra.';
  }
  if (/(.)\1{2,}/u.test(senha)) {
    return 'Evite repetir o mesmo caractere 3 vezes seguidas.';
  }
  if (temSequencia(senha)) {
    return 'Evite sequências como 1234 ou abcd.';
  }
  if (contemDadosPessoais(senha, nome, email)) {
    return 'A senha não pode conter seu nome ou seu e-mail.';
  }
  return '';
}

function validarConfirmacao(senha, confirmacao) {
  if (confirmacao === '') {
    return 'Confirme sua senha.';
  }
  if (senha !== confirmacao) {
    return 'As senhas não coincidem.';
  }
  return '';
}
