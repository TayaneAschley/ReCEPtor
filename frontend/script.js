const inputCep = document.getElementById("input-cep");
const btnBuscar = document.getElementById("btn-buscar");
const btnCopiar = document.getElementById("btn-copiar");
const btnNovaBusca = document.getElementById("btn-nova-busca");

const resultadoCep = document.getElementById("resultado-cep");
const resultadoRua = document.getElementById("resultado-rua");
const resultadoCidade = document.getElementById("resultado-cidade");
const resultadoEstado = document.getElementById("resultado-estado");

btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("opa, chegou aqui");
  const cepUsuario = inputCep.value.trim();

  const urlParaBackend = `http://localhost:3000/ReCEPtor/${cepUsuario}`;
  fetch(urlParaBackend).then((response) => {
    console.log("opa, chegou aqui 2 ");

    if (!response.ok) {
      throw new Error(`Erro na requisição. Status: ${response.status}`);
    }

    return response
      .json()
      .then((dadosDoEndereço) => {
        resultadoCep.textContent = dadosDoEndereço.content.cep;
        resultadoRua.textContent = dadosDoEndereço.content.rua;
        resultadoCidade.textContent = dadosDoEndereço.content.cidade;
        resultadoEstado.textContent = dadosDoEndereço.content.estado;

        const areaResultado = document.getElementById("area-resultado");
        areaResultado.classList.remove("d-none");
      })
      .catch((error) => {
        document.getElementById("area-resultado").classList.add("d-none");
        console.error("Erro ao processar a resposta JSON:", error);
      });
  });
});

btnNovaBusca.addEventListener("click", (e) => {
  e.preventDefault();
  inputCep.value = "";
  inputCep.focus();
  document.getElementById("area-resultado").classList.add("d-none");
});
