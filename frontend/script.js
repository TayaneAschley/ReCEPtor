const inputCep = document.getElementById("input-cep");
const btnBuscar = document.getElementById("btn-buscar");
const btnCopiar = document.getElementById("btn-copiar");
const btnNovaBusca = document.getElementById("btn-nova-busca");

const resultadoCep = document.getElementById("resultado-cep");
const resultadoRua = document.getElementById("resultado-rua");
const resultadoCidade = document.getElementById("resultado-cidade");
const resultadoEstado = document.getElementById("resultado-estado");
const mensagemStatus = document.getElementById("mensagem-status");
const areaResultado = document.getElementById("area-resultado");

function mostrarMensagem(texto, tipo = "danger") {
  if (!texto) {
    mensagemStatus.classList.add("d-none");
    mensagemStatus.textContent = "";
    return;
  }

  mensagemStatus.className = `alert alert-${tipo}`;
  mensagemStatus.textContent = texto;
  mensagemStatus.classList.remove("d-none");
}

function limparResultado() {
  areaResultado.classList.add("d-none");
  resultadoCep.textContent = "";
  resultadoRua.textContent = "";
  resultadoCidade.textContent = "";
  resultadoEstado.textContent = "";
}

async function buscarCep() {
  const cepUsuario = inputCep.value.trim();

  if (!cepUsuario) {
    limparResultado();
    mostrarMensagem("Digite um CEP para buscar.");
    return;
  }

  btnBuscar.disabled = true;
  btnBuscar.textContent = "Buscando...";
  limparResultado();
  mostrarMensagem("", "info");

  try {
    const urlParaBackend = `http://localhost:3000/ReCEPtor/${cepUsuario}`;
    const response = await fetch(urlParaBackend);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Não foi possível localizar o CEP.",
      );
    }

    const dadosDoEndereço = await response.json();
    resultadoCep.textContent = dadosDoEndereço.content.cep;
    resultadoRua.textContent = dadosDoEndereço.content.rua;
    resultadoCidade.textContent = dadosDoEndereço.content.cidade;
    resultadoEstado.textContent = dadosDoEndereço.content.estado;
    areaResultado.classList.remove("d-none");
    mostrarMensagem("", "success");
  } catch (error) {
    limparResultado();
    mostrarMensagem(error.message || "Erro inesperado ao buscar o CEP.");
  } finally {
    btnBuscar.disabled = false;
    btnBuscar.textContent = "Buscar CEP";
  }
}

btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  buscarCep();
});

inputCep.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarCep();
  }
});

btnNovaBusca.addEventListener("click", (e) => {
  e.preventDefault();
  inputCep.value = "";
  inputCep.focus();
  limparResultado();
  mostrarMensagem("", "info");
});

btnCopiar.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!resultadoCep.textContent) {
    mostrarMensagem("Realize uma busca antes de copiar as informações.");
    return;
  }

  const textoParaCopiar = `CEP: ${resultadoCep.textContent}\nRua: ${resultadoRua.textContent}\nCidade: ${resultadoCidade.textContent}\nEstado: ${resultadoEstado.textContent}`;

  try {
    await navigator.clipboard.writeText(textoParaCopiar);
    mostrarMensagem("Informações copiadas com sucesso.", "success");
  } catch {
    mostrarMensagem("Não foi possível copiar automaticamente.", "danger");
  }
});
