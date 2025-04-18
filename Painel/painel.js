const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

    function carregarResumo() {
      const totalServicos = servicos.length;
      const totalPago = servicos
        .filter(s => s.status === "Pago")
        .reduce((acc, s) => acc + s.valor, 0);
      const totalPendente = servicos
        .filter(s => s.status !== "Pago")
        .reduce((acc, s) => acc + s.valor, 0);

      document.getElementById("admin-total-servicos").textContent = totalServicos;
      document.getElementById("admin-total-pago").textContent = `R$ ${totalPago.toFixed(2)}`;
      document.getElementById("admin-total-pendente").textContent = `R$ ${totalPendente.toFixed(2)}`;
    }

    function logout() {
      localStorage.removeItem("logado");
      window.location.href = "admin.html";
    }

    function verificarLogin() {
      if (localStorage.getItem("logado") !== "true") {
        window.location.href = "login.html";
      }
    }

    verificarLogin();
    carregarResumo();