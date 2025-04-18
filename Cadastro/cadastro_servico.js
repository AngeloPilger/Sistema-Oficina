const form = document.getElementById("service-form");

// Carrega os serviços do localStorage (ou array vazio)
let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

// Salva os serviços no localStorage
function salvarServicos() {
  localStorage.setItem("servicos", JSON.stringify(servicos));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente = document.getElementById("cliente").value.trim();
  const servico = document.getElementById("servico").value.trim();
  const data = document.getElementById("data").value.trim();
  const valor = parseFloat(document.getElementById("valor").value);
  const status = document.getElementById("status").value;
  const metodoPagamento = document.getElementById("metodoPagamento").value;

  // Adiciona novo serviço ao array
  servicos.push({
    cliente,
    servico,
    data,
    valor,
    status,
    metodoPagamento
  });

  salvarServicos();
  form.reset();

  // Confirmação no console
  console.log("Serviço adicionado com sucesso.");
});