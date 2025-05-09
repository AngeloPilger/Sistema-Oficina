const btnRevelar = document.getElementById('revelarBtn');
const overlay = document.getElementById('overlay');
const loading = document.getElementById('loading');

btnRevelar.addEventListener('click', () => {
  overlay.classList.add('active');

  setTimeout(() => {
    window.location.href = 'pergunta.html';
  }, 2000); // Espera 2 segundos e vai para a pergunta
});