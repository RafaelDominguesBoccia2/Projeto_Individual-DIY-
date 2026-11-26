function montarCartaoProjeto(experimento) {
  let classeFaixa = 'faixa adulto';
  let textoFaixa = 'COM SUPERVISÃO ADULTA';
  let supervisao = '<p class="sup adulto">Supervisão de adulto obrigatória</p><p class="nota">' + experimento.supervisao + '</p>';

  if (experimento.supervisao === '') {
    classeFaixa = 'faixa';
    textoFaixa = 'SEM SUPERVISÃO OBRIGATÓRIA';
    supervisao = '<p class="sup ok"><i class="px px-check"></i>Sem supervisão obrigatória</p>';
  } else if (experimento.nivel === 'AVANÇADO') {
    classeFaixa = 'faixa alerta';
    textoFaixa = 'ATENÇÃO: LEIA OS ALERTAS';
  }

  let usar = '<b>VOCÊ VAI USAR</b>';
  for (let i = 0; i < experimento.linhas.length; i++) {
    usar += '<span>' + experimento.linhas[i].texto + '</span>';
  }
  if (experimento.utensilios !== '') {
    usar += '<span>Utensílios: ' + experimento.utensilios + '</span>';
  }

  return (
    '<article class="exp" data-id="' + experimento.id + '">' +
      '<div class="ilus">' +
        '<small>' + experimento.categoria + '</small>' +
        '<img src="/assets/imagens/experimentos/' + experimento.id + '.png" alt="' + experimento.nome + '">' +
        botaoFeito(experimento.id, experimento.nome) +
      '</div>' +
      '<div class="' + classeFaixa + '">' + textoFaixa + '</div>' +
      '<div class="corpo">' +
        '<div class="meta"><b>' + experimento.categoria + '</b><span><i class="px px-relogio"></i>' + experimento.tempo + ' · ' + experimento.nivel + '</span></div>' +
        '<h3>' + experimento.nome + '</h3>' +
        '<p class="desc">' + experimento.descricao + '</p>' +
        '<div class="usar">' + usar + '</div>' +
        supervisao +
        '<a class="btn azul" href="' + experimento.pagina + '">Conhecer projeto →</a>' +
      '</div>' +
    '</article>'
  );
}

function ligarFeitos(container, aoAlterar) {
  container.addEventListener('click', (evento) => {
    let botao = evento.target.closest('[data-feito]');
    if (botao === null) {
      return;
    }

    let ativo = alternarFeito(botao.getAttribute('data-feito'));
    botao.classList.toggle('botao-feito-ativo', ativo);
    botao.getElementsByTagName('span')[0].textContent = textoFeito(ativo);
    botao.setAttribute('aria-pressed', ativo);
    atualizarContadorFeitos();

    if (aoAlterar) {
      aoAlterar();
    }
  });
}

function doisDigitos(numero) {
  if (numero < 10) {
    return '0' + numero;
  }
  return String(numero);
}
