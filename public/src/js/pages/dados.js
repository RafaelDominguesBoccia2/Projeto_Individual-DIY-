function criarMaterial(id, nome, categoria, detalhe, unidade, passo, quantidade, textoBancada) {
  let material = {
    id: id,
    nome: nome,
    categoria: categoria,
    detalhe: detalhe,
    unidade: unidade,
    passo: passo,
    quantidade: quantidade,
  };

  if (textoBancada !== undefined) {
    material.textoBancada = textoBancada;
  }

  return material;
}

function criarItem(material, quantidade, falta) {
  let item = {
    material: material,
    quantidade: quantidade,
    falta: falta,
  };

  return item;
}

function criarLinha(texto, itens, falta, zero) {
  let linha = {
    texto: texto,
    itens: itens,
  };

  if (falta !== undefined) {
    linha.falta = falta;
  }
  if (zero !== undefined) {
    linha.zero = zero;
  }

  return linha;
}

function criarExperimento(id, nome, categoria, filtros, tempo, nivel, descricao, linhas, utensilios, supervisao) {
  let pagina = '/src/pages/projeto-' + id + '.html';
  let experimento = {
    id: id,
    nome: nome,
    categoria: categoria,
    filtros: filtros,
    tempo: tempo,
    nivel: nivel,
    descricao: descricao,
    linhas: linhas,
    utensilios: utensilios,
    supervisao: supervisao,
    pagina: pagina,
  };

  return experimento;
}

let materiais = [
  criarMaterial('fita', 'Fita adesiva', 'MONTAGEM', 'Transparente · 18 mm', 'cm', 10, 250),
  criarMaterial('papel', 'Papel A4', 'PAPÉIS', 'Folhas reaproveitadas valem!', 'folhas', 1, 6),
  criarMaterial('copos', 'Copos plásticos', 'RECIPIENTES', 'Transparentes · 200 ml', 'un.', 1, 3),
  criarMaterial('vinagre', 'Vinagre', 'INGREDIENTES', 'Vinagre branco', 'ml', 10, 100),
  criarMaterial('bicarbonato', 'Bicarbonato', 'INGREDIENTES', 'Bicarbonato de sódio', 'g', 1, 20),
  criarMaterial('corante', 'Corante alimentício', 'INGREDIENTES', 'Líquido · cor à sua escolha', 'ml', 1, 10),
  criarMaterial('papelao', 'Papelão fino', 'PAPÉIS', 'Placa de 20 × 20 cm', 'un.', 1, 1),
  criarMaterial('garrafa', 'Garrafa PET', 'RECIPIENTES', '500 ml · vazia e limpa', 'un.', 1, 0),
  criarMaterial('tampas', 'Tampas de garrafa', 'RECIPIENTES', 'Plásticas · diversas cores', 'un.', 1, 0, 'Rodas do carrinho'),
  criarMaterial('palitos', 'Palitos de churrasco', 'MONTAGEM', 'Bambu · eixo do carrinho', 'un.', 1, 0, 'Eixos do carrinho'),
];

let experimentos = [
  criarExperimento(
    'ponte',
    'Uma ponte de papel',
    'ENGENHARIA',
    ['ENGENHARIA'],
    '30 MIN',
    'FÁCIL',
    'Como uma simples dobra deixa o papel mais resistente?',
    [
      criarLinha('3 folhas de papel A4', [criarItem('papel', 3, 'folhas de papel A4')]),
      criarLinha('2 copos plásticos', [criarItem('copos', 2, 'copos plásticos')]),
    ],
    'régua',
    '',
  ),
  criarExperimento(
    'helicoptero',
    'Helicóptero de papel',
    'FÍSICA',
    ['FÍSICA'],
    '30 MIN',
    'FÁCIL',
    'Recorte, dobre e veja seu helicóptero girar enquanto cai.',
    [
      criarLinha('1 folha de papel A4', [criarItem('papel', 1, 'folha de papel A4')]),
      criarLinha('20 cm de fita adesiva', [criarItem('fita', 20, 'cm de fita adesiva')]),
    ],
    'tesoura e lápis',
    'Adulto faz os cortes. Solte sem subir em móveis.',
  ),
  criarExperimento(
    'labirinto',
    'Labirinto de papelão',
    'ENGENHARIA',
    ['ENGENHARIA'],
    '45 MIN',
    'INTERMEDIÁRIO',
    'Crie caminhos e guie uma bolinha de papel até a saída.',
    [
      criarLinha('1 placa de papelão de 20 × 20 cm', [criarItem('papelao', 1, 'placa de papelão de 20 × 20 cm')]),
      criarLinha('2 folhas A4 · 100 cm de fita adesiva', [criarItem('papel', 2, 'folhas de papel A4'), criarItem('fita', 100, 'cm de fita adesiva')]),
    ],
    'tesoura e lápis',
    'Adulto faz os cortes. Não leve a bolinha à boca.',
  ),
  criarExperimento(
    'vulcao',
    'Vulcão em erupção',
    'QUÍMICA',
    ['QUÍMICA'],
    '45 MIN',
    'AVANÇADO',
    'Faça uma reação efervescente colorida dentro de um vulcão de papelão.',
    [
      criarLinha('1 placa de papelão · fita adesiva', [criarItem('papelao', 1, 'placa de papelão'), criarItem('fita', 1, 'cm de fita adesiva')]),
      criarLinha('150 ml de vinagre', [criarItem('vinagre', 150, 'ml de vinagre')], '150 ml de vinagre (você tem {tem} ml)'),
      criarLinha('30 g de bicarbonato', [criarItem('bicarbonato', 30, 'g de bicarbonato')], '30 g de bicarbonato (você tem {tem} g)'),
      criarLinha('5 ml de corante alimentício', [criarItem('corante', 5, 'ml de corante alimentício')]),
    ],
    'colher e tesoura',
    'Use recipiente aberto. Faça em superfície protegida. Não tampar nem ingerir.',
  ),
  criarExperimento(
    'foguete',
    'Foguete de vinagre e bicarbonato',
    'QUÍMICA + FÍSICA',
    ['QUÍMICA', 'FÍSICA'],
    '60 MIN',
    'AVANÇADO',
    'A reação química gera gás e pressão que propulsionam uma garrafa PET. Atividade externa obrigatória.',
    [
      criarLinha('1 garrafa PET de 500 ml', [criarItem('garrafa', 1, 'garrafa PET de 500 ml')], '1 garrafa PET de 500 ml (você tem {tem})', '1 garrafa PET de 500 ml (você não tem)'),
      criarLinha('50 ml de vinagre · 10 g de bicarbonato', [criarItem('vinagre', 50, 'ml de vinagre'), criarItem('bicarbonato', 10, 'g de bicarbonato')]),
      criarLinha('Papel para cone · fita adesiva', [criarItem('papel', 1, 'folha de papel A4'), criarItem('fita', 1, 'cm de fita adesiva')]),
    ],
    'tesoura',
    'Somente ao ar livre, longe de pessoas. Adulto monta e aponta o foguete. Risco de projeção e pressão. Não vedar a garrafa.',
  ),
  criarExperimento(
    'carrinho',
    'Carrinho de papelão',
    'ENGENHARIA',
    ['ENGENHARIA'],
    '75 MIN',
    'INTERMEDIÁRIO',
    'Monte um carrinho com rodas giratórias a partir de materiais recicláveis.',
    [
      criarLinha('1 placa de papelão · fita adesiva', [criarItem('papelao', 1, 'placa de papelão'), criarItem('fita', 1, 'cm de fita adesiva')]),
      criarLinha('4 tampas de garrafa', [criarItem('tampas', 4, 'tampas de garrafa')], '4 tampas de garrafa (você tem {tem})', '4 tampas de garrafa (você não tem)'),
      criarLinha('2 palitos de churrasco', [criarItem('palitos', 2, 'palitos de churrasco')], '2 palitos de churrasco (eixos; você tem {tem})', '2 palitos de churrasco (eixos; você tem 0)'),
    ],
    'tesoura e lápis',
    'Adulto deve cortar e furar o papelão com cuidado.',
  ),
];

function buscarMaterial(id) {
  for (let i = 0; i < materiais.length; i++) {
    if (materiais[i].id === id) {
      return materiais[i];
    }
  }
  return null;
}

function lerEstoque(material) {
  if (material === null) {
    return 0;
  }
  let salvo = localStorage.getItem('diy-estoque-' + material.id);
  if (salvo === null) {
    return material.quantidade;
  }
  let numero = parseInt(salvo, 10);
  if (isNaN(numero)) {
    return material.quantidade;
  }
  return numero;
}

function salvarEstoque(material, valor) {
  let anterior = lerEstoque(material);
  localStorage.setItem('diy-estoque-' + material.id, String(valor));
  avisarEstoque(material.id, valor - anterior);
}

function avisarEstoque(codigo, variacao) {
  let idUsuario = sessionStorage.getItem('ID_USUARIO');

  if (idUsuario === null || variacao === 0) {
    return;
  }

  fetch('/estoque/' + idUsuario + '/' + codigo, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ variacao: variacao }),
  }).catch(function () {});
}

function avisarFeito(codigo, ativo) {
  let idUsuario = sessionStorage.getItem('ID_USUARIO');

  if (idUsuario === null) {
    return;
  }

  let metodo = 'DELETE';
  if (ativo) {
    metodo = 'POST';
  }

  fetch('/feitos/' + idUsuario + '/' + codigo, { method: metodo }).catch(function () {});
}

function analisarExperimento(experimento) {
  let linhas = [];
  let faltas = [];

  for (let i = 0; i < experimento.linhas.length; i++) {
    let linha = experimento.linhas[i];
    let texto = linha.texto;
    let faltou = false;
    let temPrimeiro = 0;

    for (let j = 0; j < linha.itens.length; j++) {
      let item = linha.itens[j];
      let tem = lerEstoque(buscarMaterial(item.material));
      if (j === 0) {
        temPrimeiro = tem;
      }
      if (tem < item.quantidade) {
        faltou = true;
        let quantidade = item.quantidade - tem;
        let descricao = item.falta;
        let falta = {
          quantidade: quantidade,
          descricao: descricao,
        };
        faltas.push(falta);
      }
    }

    if (faltou && linha.falta) {
      if (temPrimeiro === 0 && linha.zero) {
        texto = linha.zero;
      } else {
        texto = linha.falta.replace('{tem}', temPrimeiro);
      }
    }

    linhas.push(texto);
  }

  let disponivel = faltas.length === 0;
  let analise = {
    disponivel: disponivel,
    linhas: linhas,
    faltas: faltas,
  };

  return analise;
}

function separarExperimentos() {
  let disponiveis = [];
  let indisponiveis = [];

  for (let i = 0; i < experimentos.length; i++) {
    let experimento = experimentos[i];
    let analise = analisarExperimento(experimento);
    let item = {
      experimento: experimento,
      analise: analise,
    };

    if (analise.disponivel) {
      disponiveis.push(item);
    } else {
      indisponiveis.push(item);
    }
  }

  let separados = {
    disponiveis: disponiveis,
    indisponiveis: indisponiveis,
  };

  return separados;
}

function lerFeitos() {
  let salvo = localStorage.getItem('diy-feitos');
  if (salvo === null) {
    return [];
  }
  try {
    let lista = JSON.parse(salvo);
    if (Array.isArray(lista)) {
      return lista;
    }
  } catch (erro) {
    return [];
  }
  return [];
}

function ehFeito(id) {
  return lerFeitos().indexOf(id) !== -1;
}

function alternarFeito(id) {
  let lista = lerFeitos();
  let posicao = lista.indexOf(id);
  let ativo = false;

  if (posicao === -1) {
    lista.push(id);
    ativo = true;
  } else {
    lista.splice(posicao, 1);
  }

  localStorage.setItem('diy-feitos', JSON.stringify(lista));
  avisarFeito(id, ativo);
  return ativo;
}

function textoFeito(ativo) {
  if (ativo) {
    return 'Feito';
  }
  return 'Marcar como feito';
}

function botaoFeito(id, nome) {
  let ativo = ehFeito(id);
  let classe = 'botao-feito';
  if (ativo) {
    classe = 'botao-feito botao-feito-ativo';
  }
  return '<button class="' + classe + '" type="button" title="Marcar como feito" data-feito="' + id + '" aria-pressed="' + ativo + '" aria-label="Marcar como feito: ' + nome + '"><i class="px px-check"></i><span>' + textoFeito(ativo) + '</span></button>';
}

function atualizarContadorFeitos() {
  let contadores = document.getElementsByClassName('nav-contador');
  let total = lerFeitos().length;

  for (let i = 0; i < contadores.length; i++) {
    contadores[i].textContent = total;
  }
}

atualizarContadorFeitos();
