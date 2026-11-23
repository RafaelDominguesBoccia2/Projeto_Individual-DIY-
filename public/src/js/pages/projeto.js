let idProjeto = document.body.getAttribute('data-projeto');
let botaoMarcarFeito = document.getElementById('marcar-feito');
let rotuloFeito = document.getElementById('texto-feito');
let itensMateriais = document.getElementsByClassName('item-material');
let painelNumero = document.getElementById('status-num');
let painelTitulo = document.getElementById('status-titulo');
let painelTexto = document.getElementById('status-texto');
let painelFaltas = document.getElementById('status-faltas');

function buscarExperimento(id) {
  for (let i = 0; i < experimentos.length; i++) {
    if (experimentos[i].id === id) {
      return experimentos[i];
    }
  }
  return null;
}

let experimento = buscarExperimento(idProjeto);

function mostrarFeito() {
  let ativo = ehFeito(idProjeto);
  botaoMarcarFeito.classList.toggle('botao-feito-ativo', ativo);
  botaoMarcarFeito.setAttribute('aria-pressed', ativo);
  rotuloFeito.textContent = textoFeito(ativo);
}

function mostrarMateriais() {
  for (let i = 0; i < itensMateriais.length; i++) {
    let item = itensMateriais[i];
    let material = buscarMaterial(item.getAttribute('data-material'));
    let precisa = parseInt(item.getAttribute('data-qtd'), 10);
    let tem = lerEstoque(material);
    let selo = item.getElementsByTagName('code')[0];

    if (tem >= precisa) {
      selo.textContent = 'VOCÊ TEM ' + tem + ' ' + material.unidade;
      item.classList.remove('mat-falta');
      item.classList.add('mat-ok');
    } else {
      selo.textContent = 'FALTAM ' + (precisa - tem) + ' ' + material.unidade;
      item.classList.remove('mat-ok');
      item.classList.add('mat-falta');
    }
  }
}

function mostrarPainel() {
  let analise = analisarExperimento(experimento);
  let total = 0;
  for (let i = 0; i < experimento.linhas.length; i++) {
    total += experimento.linhas[i].itens.length;
  }
  let prontos = total - analise.faltas.length;

  painelNumero.textContent = doisDigitos(prontos) + '/' + doisDigitos(total);

  if (analise.disponivel) {
    painelTitulo.innerHTML = 'tudo à mão!';
    painelTexto.textContent = 'Você tem todos os materiais deste projeto no seu inventário.';
    painelFaltas.innerHTML = '';
    return;
  }

  let faltas = '';
  for (let i = 0; i < analise.faltas.length; i++) {
    let falta = analise.faltas[i];
    let verbo = 'Faltam';
    if (falta.quantidade === 1) {
      verbo = 'Falta';
    }
    faltas += '<p class="falta"><i class="px px-x"></i>' + verbo + ' ' + falta.quantidade + ' ' + falta.descricao + '</p>';
  }

  painelTitulo.innerHTML = 'ainda faltam<br>materiais';
  painelTexto.textContent = 'Atualize seu inventário quando conseguir os itens que faltam.';
  painelFaltas.innerHTML = faltas;
}

botaoMarcarFeito.addEventListener('click', () => {
  alternarFeito(idProjeto);
  mostrarFeito();
  atualizarContadorFeitos();
});

mostrarFeito();
mostrarMateriais();
mostrarPainel();
