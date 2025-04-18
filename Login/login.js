const loginForm = document.getElementById("login-form");

const credenciais = {
  usuario: "admin",
  senha: "1234"
};

// Remove status de login ao carregar a página de login
window.addEventListener("load", () => {
  localStorage.removeItem("logado");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === credenciais.usuario && senha === credenciais.senha) {
    localStorage.setItem("logado", "true");
    window.location.href = "../Cadastro/cadastro_servico.html";
  } else {
    loginForm.classList.add("shake");
    setTimeout(() => loginForm.classList.remove("shake"), 500);
    alert("Usuário ou senha inválidos!");
  }
});

function toggleSenha(el) {
  const input = document.getElementById("senha");
  const tipo = input.type === "password" ? "text" : "password";
  input.type = tipo;
  el.classList.toggle("fa-eye");
  el.classList.toggle("fa-eye-slash");
}
