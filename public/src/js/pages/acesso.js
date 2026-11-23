let botoes = document.getElementsByClassName('campo-mostrar');

for (let i = 0; i < botoes.length; i++) {
  let botao = botoes[i];
  let entrada = document.getElementById(botao.getAttribute('data-alvo'));

  botao.addEventListener('click', () => {
    let mostrar = entrada.type === 'password';
    entrada.type = mostrar ? 'text' : 'password';
    botao.textContent = mostrar ? 'Ocultar' : 'Mostrar';
    botao.setAttribute('aria-pressed', mostrar);
  });
}
