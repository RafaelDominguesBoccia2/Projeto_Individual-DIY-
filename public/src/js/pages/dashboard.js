let conteudo = document.getElementById('conteudo');
let nomeUsuario = document.getElementById('nome-usuario');
let botaoSair = document.getElementById('sair');

let kpiProjetos = document.getElementById('kpi-projetos');
let kpiProjetosNota = document.getElementById('kpi-projetos-nota');
let kpiMateriais = document.getElementById('kpi-materiais');
let kpiMateriaisNota = document.getElementById('kpi-materiais-nota');
let kpiTempo = document.getElementById('kpi-tempo');

let rosca = document.getElementById('rosca');
let roscaTotal = document.getElementById('rosca-total');
let corpoUso = document.getElementById('corpo-uso');
let notaRosca = document.getElementById('nota-rosca');
let corpoDescobertas = document.getElementById('corpo-descobertas');
let contadores = document.getElementsByClassName('nav-contador');

let categoriasFixas = [
  { nome: 'ENGENHARIA', rotulo: 'Engenharia', classe: 'marca-engenharia', cor: 'var(--blue)' },
  { nome: 'FÍSICA', rotulo: 'Física', classe: 'marca-fisica', cor: 'var(--yellow)' },
  { nome: 'QUÍMICA', rotulo: 'Química', classe: 'marca-quimica', cor: 'var(--green)' },
];

let meses = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

function doisDigitos(numero) {
  if (numero < 10) {
    return '0' + numero;
  }
  return String(numero);
}

function formatarData(texto) {
  let data = new Date(texto);
  return doisDigitos(data.getDate()) + ' ' + meses[data.getMonth()] + ' ' + data.getFullYear();
}

function formatarNivel(nivel) {
  return nivel.charAt(0) + nivel.slice(1).toLowerCase();
}

function mostrarKpis(dados) {
  kpiProjetos.textContent = doisDigitos(dados.projetos.projetos_realizados);
  kpiProjetosNota.textContent = 'de ' + doisDigitos(dados.projetos.total_experimentos) + ' experimentos';
  kpiMateriais.textContent = doisDigitos(dados.materiais.materiais_usados);
  kpiMateriaisNota.textContent = 'de ' + doisDigitos(dados.materiais.total_materiais) + ' materiais cadastrados';
  kpiTempo.textContent = dados.tempo.tempo_criando;

  for (let i = 0; i < contadores.length; i++) {
    contadores[i].textContent = dados.projetos.projetos_realizados;
  }
}

function mostrarRosca(dados) {
  let linhas = '';
  let inicio = 0;
  let fatias = [];
  let maior = 0;

  for (let i = 0; i < categoriasFixas.length; i++) {
    let projetos = 0;
    let parte = 0;

    for (let j = 0; j < dados.categorias.length; j++) {
      if (dados.categorias[j].categoria === categoriasFixas[i].nome) {
        projetos = Number(dados.categorias[j].projetos);
        parte = Number(dados.categorias[j].parte_percentual);
      }
    }

    if (projetos > maior) {
      maior = projetos;
    }

    if (parte > 0) {
      fatias.push({ cor: categoriasFixas[i].cor, inicio: inicio, fim: inicio + parte });
      inicio += parte;
    }

    linhas +=
      '<tr>' +
        '<td><span class="marca ' + categoriasFixas[i].classe + '"></span>' + categoriasFixas[i].rotulo + '</td>' +
        '<td>' + projetos + '</td>' +
        '<td>' + parte + '%</td>' +
      '</tr>';
  }

  corpoUso.innerHTML = linhas;
  roscaTotal.textContent = doisDigitos(dados.projetos.projetos_realizados);

  if (maior === 0) {
    rosca.style.background = 'var(--line)';
    notaRosca.textContent = 'Marque projetos como feitos para ver o seu gráfico.';
    return;
  }

  fatias[fatias.length - 1].fim = 100;

  let cores = [];
  for (let i = 0; i < fatias.length; i++) {
    cores.push(fatias[i].cor + ' ' + fatias[i].inicio + '% ' + fatias[i].fim + '%');
  }
  rosca.style.background = 'conic-gradient(' + cores.join(', ') + ')';

  let mais = [];
  for (let i = 0; i < categoriasFixas.length; i++) {
    for (let j = 0; j < dados.categorias.length; j++) {
      if (dados.categorias[j].categoria === categoriasFixas[i].nome && Number(dados.categorias[j].projetos) === maior) {
        mais.push(categoriasFixas[i].rotulo);
      }
    }
  }
  notaRosca.textContent = 'Você mais faz projetos de ' + mais.join(' e ') + '.';
}

function mostrarDescobertas(dados) {
  let linhas = '';

  if (dados.ultimasDescobertas.length === 0) {
    corpoDescobertas.innerHTML = '<tr><td colspan="3">Nenhum projeto marcado como feito ainda.</td></tr>';
    return;
  }

  for (let i = 0; i < dados.ultimasDescobertas.length; i++) {
    let item = dados.ultimasDescobertas[i];

    linhas +=
      '<tr>' +
        '<td><span class="indice">' + doisDigitos(i + 1) + '</span><span class="projeto">' + item.projeto + '</span></td>' +
        '<td>' + formatarData(item.realizado_em) + '</td>' +
        '<td>' + formatarNivel(item.nivel) + '</td>' +
      '</tr>';
  }

  corpoDescobertas.innerHTML = linhas;
}

function carregarDashboard() {
  let idUsuario = sessionStorage.getItem('ID_USUARIO');

  fetch('/dashboard/' + idUsuario)
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Falha ao buscar a dashboard');
      }
      return resposta.json();
    })
    .then(function (dados) {
      mostrarKpis(dados);
      mostrarRosca(dados);
      mostrarDescobertas(dados);
    })
    .catch(function () {
      notaRosca.textContent = 'Não foi possível carregar seus dados agora.';
      corpoUso.innerHTML = '';
      corpoDescobertas.innerHTML = '<tr><td colspan="3">Não foi possível carregar seus dados agora.</td></tr>';
    })
    .then(function () {
      conteudo.hidden = false;
    });
}

if (!estaLogado()) {
  window.location.replace('/src/pages/login.html');
} else {
  nomeUsuario.textContent = primeiroNome();
  carregarDashboard();
}

botaoSair.addEventListener('click', sair);
