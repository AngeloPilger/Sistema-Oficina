const tabela = document.getElementById("tabela-relatorio");
const filtroNome = document.getElementById("filtro-nome");
const filtroServico = document.getElementById("filtro-servico");
const filtroStatus = document.getElementById("filtro-status");
const filtroDataInicio = document.getElementById("data-inicio");
const filtroDataFim = document.getElementById("data-fim");

let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

function salvarServicos() {
  localStorage.setItem("servicos", JSON.stringify(servicos));
}

function atualizarTotalizadores(filtrados) {
  const totalServicos = filtrados.length;
  const totalPago = filtrados.filter(s => s.status === "Pago").reduce((acc, s) => acc + s.valor, 0);
  const totalPendente = filtrados.filter(s => s.status !== "Pago").reduce((acc, s) => acc + s.valor, 0);

  document.getElementById("total-servicos").textContent = totalServicos;
  document.getElementById("total-pago").textContent = `R$ ${totalPago.toFixed(2)}`;
  document.getElementById("total-pendente").textContent = `R$ ${totalPendente.toFixed(2)}`;
}

function renderizarTabela() {
  tabela.innerHTML = "";

  const nomeFiltro = filtroNome.value.toLowerCase();
  const servicoFiltro = filtroServico.value.toLowerCase();
  const statusFiltro = filtroStatus.value.toLowerCase();
  const dataInicio = filtroDataInicio.value;
  const dataFim = filtroDataFim.value;

  const filtrados = servicos.filter((s) => {
    const nomeValido = s.cliente.toLowerCase().includes(nomeFiltro);
    const servicoValido = s.servico.toLowerCase().includes(servicoFiltro);
    const statusValido = s.status.toLowerCase().startsWith(statusFiltro);

    const [dia, mes, ano] = s.data.split("/");
    const dataServico = new Date(`${ano}-${mes}-${dia}`);
    const inicio = dataInicio ? new Date(dataInicio) : null;
    const fim = dataFim ? new Date(dataFim) : null;

    const dataValida =
      (!inicio || dataServico >= inicio) &&
      (!fim || dataServico <= fim);

    return nomeValido && servicoValido && statusValido && dataValida;
  });

  atualizarTotalizadores(filtrados);

  filtrados.forEach((s, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.cliente}</td>
      <td>${s.servico}</td>
      <td>${s.data}</td>
      <td>R$ ${s.valor.toFixed(2)}</td>
      <td>R$ ${s.maoDeObra.toFixed(2)}</td>
      <td>R$ ${s.materiais.toFixed(2)}</td>
      <td>R$ ${s.liquido.toFixed(2)}</td>
      <td class="${s.status === 'Pago' ? 'status-pago' : 'status-nao-pago'}">${s.status}</td>
      <td>
        <div class="acoes-botoes">
          <button class="acao detalhes" onclick="verDetalhes(${i})">Detalhes</button>
        </div>
      </td>
    `;
    tabela.appendChild(row);
  });
}

function verDetalhes(index) {
  localStorage.setItem("servicoSelecionado", JSON.stringify({ index, ...servicos[index] }));
  window.location.href = "../Detalhes/detalhes.html";
}

renderizarTabela();