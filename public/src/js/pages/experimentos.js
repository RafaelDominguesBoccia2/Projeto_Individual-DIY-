let listaBancada = document.getElementById('bancada');
let numeroMateriais = document.getElementById('n-mat');
let gradeDisponiveis = document.getElementById('ok');
let tituloDisponiveis = document.getElementById('secao-ok');
let contagemDisponiveis = document.getElementById('n-ok');
let quantidadeTotal = document.getElementById('qtd-exp');
let textoFinal = document.getElementById('fim');
let botoesFiltro = document.getElementById('filtros').getElementsByTagName('button');

let categoriaAtual = 'TODOS';

function mostrarBancada() {
  let exibir = '';
  for (let i = 0; i < materiais.length; i++) {
    let material = materiais[i];
    let apoio = material.detalhe;
    if (material.textoBancada !== undefined) {
      apoio = material.textoBancada;
    }
    let pequeno = '';
    if (apoio !== '') {
      pequeno = '<small>' + apoio + '</small>';
    }
    exibir += '<li><img src="/assets/imagens/materiais/' + material.id + '.png" alt=""><span>' + material.nome + pequeno + '</span><code>' + lerEstoque(material) + ' ' + material.unidade + '</code></li>';
  }
  listaBancada.innerHTML = exibir;
  numeroMateriais.textContent = materiais.length;
}

function plural(quantidade, singular, varios) {
  if (quantidade === 1) {
    return singular;
  }
  return varios;
}

function montarExperimento(item) {
  let experimento = item.experimento;
  let analise = item.analise;
  let classe = 'exp';
  let faixa = 'PODE FAZER! <span>Você tem todos os materiais</span>';
  let botao = '<a class="btn azul" href="' + experimento.pagina + '">Vamos fazer →</a>';

  if (!analise.disponivel) {
    classe = 'exp sem';
    faixa = 'FALTAM MATERIAIS';
    botao = '<a class="btn vazado" href="' + experimento.pagina + '">Conhecer projeto →</a>';
  }

  let usar = '<b>VOCÊ VAI USAR</b>';
  for (let i = 0; i < analise.linhas.length; i++) {
    usar += '<span>' + analise.linhas[i] + '</span>';
  }
  if (experimento.utensilios !== '') {
    usar += '<span>Utensílios: ' + experimento.utensilios + '</span>';
  }

  let faltas = '';
  for (let i = 0; i < analise.faltas.length; i++) {
    let falta = analise.faltas[i];
    let verbo = plural(falta.quantidade, 'Falta', 'Faltam');
    faltas += '<p class="falta"><i class="px px-x"></i>' + verbo + ' ' + falta.quantidade + ' ' + falta.descricao + '</p>';
  }

  let supervisao = '<p class="sup ok"><i class="px px-check"></i>Sem supervisão obrigatória</p>';
  if (experimento.supervisao !== '') {
    supervisao = '<p class="sup adulto">Supervisão de adulto obrigatória</p><p class="nota">' + experimento.supervisao + '</p>';
  }

  return (
    '<article class="' + classe + '">' +
      '<div class="ilus"><small>' + experimento.categoria + '</small><img src="/assets/imagens/experimentos/' + experimento.id + '.png" alt="' + experimento.nome + '">' + botaoFeito(experimento.id, experimento.nome) + '</div>' +
      '<div class="faixa">' + faixa + '</div>' +
      '<div class="corpo">' +
        '<div class="meta"><b>' + experimento.categoria + '</b><span><i class="px px-relogio"></i>' + experimento.tempo + ' · ' + experimento.nivel + '</span></div>' +
        '<h3>' + experimento.nome + '</h3>' +
        '<p class="desc">' + experimento.descricao + '</p>' +
        '<div class="usar">' + usar + '</div>' +
        faltas +
        supervisao +
        botao +
      '</div>' +
    '</article>'
  );
}

function combinaFiltro(item) {
  let experimento = item.experimento;
  if (categoriaAtual === 'TODOS') {
    return true;
  }
  for (let i = 0; i < experimento.filtros.length; i++) {
    if (experimento.filtros[i] === categoriaAtual) {
      return true;
    }
  }
  return false;
}

function mostrarExperimentos() {
  let exibir = '';
  let disponiveis = 0;
  let indisponiveis = 0;

  for (let i = 0; i < experimentos.length; i++) {
    let experimento = experimentos[i];
    let analise = analisarExperimento(experimento);
    let item = {
      experimento: experimento,
      analise: analise,
    };

    if (combinaFiltro(item)) {
      exibir += montarExperimento(item);
      if (item.analise.disponivel) {
        disponiveis++;
      } else {
        indisponiveis++;
      }
    }
  }

  let total = disponiveis + indisponiveis;
  gradeDisponiveis.innerHTML = exibir;
  tituloDisponiveis.hidden = total === 0;
  contagemDisponiveis.textContent = '· ' + disponiveis + ' com tudo à mão · ' + indisponiveis + ' ainda faltam materiais';
  quantidadeTotal.textContent = total + ' EXPERIMENTOS';

  if (total === 0) {
    textoFinal.textContent = 'NENHUM EXPERIMENTO ENCONTRADO. TENTE OUTRA CATEGORIA.';
  } else {
    textoFinal.textContent = 'POR ENQUANTO, ESTAS SÃO SUAS ' + total + ' POSSIBILIDADES. ADICIONE MATERIAIS PARA DESCOBRIR MAIS.';
  }
}

function atualizarTudo() {
  mostrarBancada();
  mostrarExperimentos();
}

for (let i = 0; i < botoesFiltro.length; i++) {
  botoesFiltro[i].addEventListener('click', (evento) => {
    for (let j = 0; j < botoesFiltro.length; j++) {
      botoesFiltro[j].classList.remove('on');
    }
    evento.currentTarget.classList.add('on');
    categoriaAtual = evento.currentTarget.getAttribute('data-cat');
    mostrarExperimentos();
  });
}

window.addEventListener('pageshow', atualizarTudo);
window.addEventListener('storage', atualizarTudo);

ligarFeitos(gradeDisponiveis);

atualizarTudo();
