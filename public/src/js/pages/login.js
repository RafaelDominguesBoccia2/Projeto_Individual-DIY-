if (estaLogado()) {
  window.location.replace('/src/pages/dashboard.html');
}

let formulario = document.getElementById('formulario');
let campoEmail = document.getElementById('email');
let campoSenha = document.getElementById('senha');
let erroEmail = document.getElementById('erro-email');
let erroSenha = document.getElementById('erro-senha');

campoEmail.addEventListener('input', () => {
  mostrarErro(campoEmail, erroEmail, validarEmail(campoEmail.value));
  mostrarErro(campoSenha, erroSenha, '');
});

campoSenha.addEventListener('input', () => {
  mostrarErro(campoSenha, erroSenha, '');
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let emailDigitado = campoEmail.value.trim().toLowerCase();
  let senhaDigitada = campoSenha.value;

  let tudoCerto = true;

  let mensagemEmail = validarEmail(emailDigitado);
  mostrarErro(campoEmail, erroEmail, mensagemEmail);
  if (mensagemEmail !== '') {
    tudoCerto = false;
  }

  let mensagemSenha = '';
  if (senhaDigitada === '') {
    mensagemSenha = 'Digite sua senha.';
  }
  mostrarErro(campoSenha, erroSenha, mensagemSenha);
  if (mensagemSenha !== '') {
    tudoCerto = false;
  }

  if (!tudoCerto) {
    let primeiroInvalido = document.getElementsByClassName('campo-entrada-invalido')[0];
    if (primeiroInvalido) {
      primeiroInvalido.focus();
    }
    return;
  }

  fetch('/usuarios/autenticar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailDigitado, senha: senhaDigitada }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (usuario) {
          sessionStorage.setItem('ID_USUARIO', usuario.id);
          sessionStorage.setItem('NOME_COMPLETO', usuario.nome);
          sessionStorage.setItem('EMAIL', usuario.email);
          sessionStorage.setItem('LOGADO', usuario.email);

          sincronizarDados(usuario.id)
            .catch(function () {})
            .then(function () {
              window.location.href = '/src/pages/dashboard.html';
            });
        });
      } else if (resposta.status === 403) {
        mostrarErro(campoEmail, erroEmail, 'E-mail ou senha incorretos.');
        mostrarErro(campoSenha, erroSenha, 'E-mail ou senha incorretos.');
        campoEmail.focus();
      } else {
        mostrarErro(campoEmail, erroEmail, 'Não foi possível entrar agora. Tente de novo.');
      }
    })
    .catch(function () {
      mostrarErro(campoEmail, erroEmail, 'Sem conexão com o servidor. Tente de novo.');
    });
});
