function estaLogado() {
  let logado = sessionStorage.getItem('LOGADO');
  let nome = sessionStorage.getItem('NOME_COMPLETO');
  let id = sessionStorage.getItem('ID_USUARIO');

  return logado !== null && nome !== null && id !== null;
}

function primeiroNome() {
  let nomeCompleto = sessionStorage.getItem('NOME_COMPLETO');
  let partes = nomeCompleto.trim().split(' ');

  return partes[0];
}

function limparDadosLocais() {
  let chaves = [];

  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave.indexOf('diy-') === 0) {
      chaves.push(chave);
    }
  }

  for (let i = 0; i < chaves.length; i++) {
    localStorage.removeItem(chaves[i]);
  }
}

function sincronizarDados(idUsuario) {
  limparDadosLocais();

  return Promise.all([fetch('/feitos/' + idUsuario), fetch('/estoque/' + idUsuario)])
    .then(function (respostas) {
      return Promise.all([respostas[0].json(), respostas[1].json()]);
    })
    .then(function (dados) {
      let codigosFeitos = [];

      for (let i = 0; i < dados[0].length; i++) {
        codigosFeitos.push(dados[0][i].codigo);
      }
      localStorage.setItem('diy-feitos', JSON.stringify(codigosFeitos));

      for (let i = 0; i < dados[1].length; i++) {
        localStorage.setItem('diy-estoque-' + dados[1][i].codigo, String(dados[1][i].quantidade));
      }
    });
}

function sair() {
  limparDadosLocais();
  sessionStorage.removeItem('LOGADO');
  sessionStorage.removeItem('ID_USUARIO');
  sessionStorage.removeItem('NOME_COMPLETO');
  sessionStorage.removeItem('EMAIL');
  window.location.href = '/index.html';
}

function mostrarSessao() {
  let areas = document.getElementsByClassName('nav-acesso');

  if (!estaLogado()) {
    return;
  }

  for (let i = 0; i < areas.length; i++) {
    let link = document.createElement('a');
    link.className = 'nav-ola';
    link.href = '/src/pages/dashboard.html';
    link.textContent = 'Dashboard';

    if (window.location.pathname === '/src/pages/dashboard.html') {
      link.className = 'nav-ola nav-ola-ativo';
    }

    areas[i].textContent = '';
    areas[i].appendChild(link);
  }
}

mostrarSessao();
