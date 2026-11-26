let gradeFeitos = document.getElementById('feitos');
let blocoVazio = document.getElementById('vazio');
let etiquetaQuantidade = document.getElementById('qtd-feitos');
let textoFinal = document.getElementById('fim');

function mostrarFeitos() {
  let feitos = lerFeitos();
  let exibir = '';
  let total = 0;

  for (let i = 0; i < experimentos.length; i++) {
    if (feitos.indexOf(experimentos[i].id) !== -1) {
      exibir += montarCartaoProjeto(experimentos[i]);
      total++;
    }
  }

  gradeFeitos.innerHTML = exibir;
  blocoVazio.hidden = total > 0;
  textoFinal.hidden = total === 0;

  if (total === 1) {
    etiquetaQuantidade.textContent = doisDigitos(total) + ' PROJETO';
  } else {
    etiquetaQuantidade.textContent = doisDigitos(total) + ' PROJETOS';
  }

  textoFinal.textContent = 'VOCÊ JÁ FEZ ' + total + ' DE ' + experimentos.length + ' PROJETOS. DESMARQUE UM PELO BOTÃO NO CANTO DO CARTÃO.';
}

ligarFeitos(gradeFeitos, mostrarFeitos);

mostrarFeitos();
