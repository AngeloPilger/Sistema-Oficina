const form = document.getElementById("detalhes-form");
const servicoData = JSON.parse(localStorage.getItem("servicoSelecionado"));
const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

if (!servicoData || servicoData.index === undefined) {
  window.location.href = "../Relatorio/relatorio.html";
}

// Preenche os campos com os dados atuais
document.getElementById("cliente").value = servicoData.cliente;
document.getElementById("servico").value = servicoData.servico;
document.getElementById("data").value = servicoData.data;
document.getElementById("valor").value = servicoData.valor;
document.getElementById("status").value = servicoData.status;
document.getElementById("metodoPagamento").value = servicoData.metodoPagamento || "";
document.getElementById("observacao").value = servicoData.observacao || "";

// Habilita edição
document.getElementById("btn-editar").addEventListener("click", () => {
  document.querySelectorAll("#detalhes-form input, #detalhes-form select, #detalhes-form textarea")
    .forEach(el => el.disabled = false);
  document.getElementById("btn-salvar").disabled = false;
});

// Verifica se houve alteração
function houveAlteracao(original, atual) {
  return JSON.stringify(original) !== JSON.stringify(atual);
}

// Salva alterações
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente = document.getElementById("cliente").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const status = document.getElementById("status").value;
  const metodoPagamento = document.getElementById("metodoPagamento").value;
  const observacao = document.getElementById("observacao").value;

  const dadosAtuais = {
    cliente, servico, data, valor, status, metodoPagamento, observacao
  };

  const dadosOriginais = { ...servicoData };
  delete dadosOriginais.index;

  if (!houveAlteracao(dadosOriginais, dadosAtuais)) {
    return; // Sai sem mostrar nada se não houve alteração
  }

  servicos[servicoData.index] = dadosAtuais;
  localStorage.setItem("servicos", JSON.stringify(servicos));

  const mensagem = document.getElementById("mensagem-sucesso");
  if (mensagem) {
    mensagem.style.display = "block";
    setTimeout(() => {
      mensagem.style.display = "none";
    }, 3000);
  }
});

document.getElementById("btn-excluir").addEventListener("click", () => {
  const confirmacao = confirm("Tem certeza que deseja excluir este serviço?");
  if (confirmacao) {
    servicos.splice(servicoData.index, 1);
    localStorage.setItem("servicos", JSON.stringify(servicos));
    alert("Serviço excluído com sucesso!");
    window.location.href = "../Relatorio/relatorio.html";
  }
});