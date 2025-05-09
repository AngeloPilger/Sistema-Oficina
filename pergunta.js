const btnNao = document.getElementById('nao');

let jaMoveu = false; // Flag para saber se já começou a se mover

btnNao.addEventListener('mouseover', () => {
  if (!jaMoveu) {
    // Primeira vez: troca para absolute sem mudar de lugar
    const rect = btnNao.getBoundingClientRect();
    btnNao.style.position = 'absolute';
    btnNao.style.left = `${rect.left}px`;
    btnNao.style.top = `${rect.top}px`;
    jaMoveu = true;
  }

  const maxX = window.innerWidth - btnNao.offsetWidth - 20;
  const maxY = window.innerHeight - btnNao.offsetHeight - 20;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  btnNao.style.left = `${randomX}px`;
  btnNao.style.top = `${randomY}px`;
});

document.getElementById("sim").addEventListener("click", function () {
    confetti();
  });

  function startConfettiBurst() {
    const duration = 3000;
    const end = Date.now() + duration;
  
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
  
  document.getElementById('sim').addEventListener('click', function () {
    startConfettiBurst();
  
    setTimeout(function () {
      window.location.href = "resposta.html";
    }, 3000);
  });