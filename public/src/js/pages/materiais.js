let listaMateriais = document.getElementById('materiais');
let etiquetaTotal = document.getElementById('total');
let contagem = document.getElementById('cont');
let numeroProntos = document.getElementById('prontos');
let listaProntos = document.getElementById('lista-prontos');

function doisDigitos(numero) {
  if (numero < 10) {
    return '0' + numero;
  }
  return String(numero);
}

function montarCartao(material) {
  return (
    '<article class="card" data-id="' + material.id + '">' +
      '<div class="ilus">' +
        '<small>' + material.categoria + '</small>' +
        '<img src="/assets/imagens/materiais/' + material.id + '.png" alt="' + material.nome + '">' +
      '</div>' +
      '<div>' +
        '<h3>' + material.nome + '</h3>' +
        '<p class="d">' + material.detalhe + '</p>' +
      '</div>' +
      '<div>' +
        '<div class="leg"><b>EM ESTOQUE</b></div>' +
        '<div class="qtd">' +
          '<button type="button" data-acao="menos" data-id="' + material.id + '" aria-label="Diminuir ' + material.nome + '">−</button>' +
          '<div>' +
            '<input type="number" min="0" id="qtd-' + material.id + '" data-id="' + material.id + '" value="' + lerEstoque(material) + '" aria-label="Quantidade de ' + material.nome + '">' +
            '<span>' + material.unidade + '</span>' +
          '</div>' +
          '<button type="button" data-acao="mais" data-id="' + material.id + '" aria-label="Aumentar ' + material.nome + '">+</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function mostrarMateriais() {
  let html = '';

  for (let i = 0; i < materiais.length; i++) {
    html += montarCartao(materiais[i]);
  }

  listaMateriais.innerHTML = html;
}

function atualizarPainel() {
  let grupos = separarExperimentos();
  let lista = '';
  for (let i = 0; i < grupos.disponiveis.length; i++) {
    lista += '<li>' + grupos.disponiveis[i].experimento.nome + '</li>';
  }

  etiquetaTotal.textContent = doisDigitos(materiais.length) + ' ITENS';
  contagem.textContent = 'SEU INVENTÁRIO · ' + materiais.length + ' MATERIAIS';
  numeroProntos.textContent = doisDigitos(grupos.disponiveis.length);
  listaProntos.innerHTML = lista;
}

function alterarQuantidade(material, novoValor) {
  let valor = novoValor;
  if (isNaN(valor) || valor < 0) {
    valor = 0;
  }
  salvarEstoque(material, valor);
  atualizarPainel();
  return valor;
}

listaMateriais.addEventListener('click', (evento) => {
  let acao = evento.target.getAttribute('data-acao');
  if (acao === null) {
    return;
  }
  let material = buscarMaterial(evento.target.getAttribute('data-id'));
  let entrada = document.getElementById('qtd-' + material.id);
  let valor = parseInt(entrada.value, 10);
  if (isNaN(valor)) {
    valor = 0;
  }
  if (acao === 'mais') {
    valor += material.passo;
  } else {
    valor -= material.passo;
  }
  entrada.value = alterarQuantidade(material, valor);
});

listaMateriais.addEventListener('change', (evento) => {
  if (evento.target.tagName !== 'INPUT') {
    return;
  }
  let material = buscarMaterial(evento.target.getAttribute('data-id'));
  evento.target.value = alterarQuantidade(material, parseInt(evento.target.value, 10));
});

mostrarMateriais();
atualizarPainel();
