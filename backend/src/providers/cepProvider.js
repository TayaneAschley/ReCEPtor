//https://brasilapi.com.br/api/cep/v1/{cep}

export async function fetchApi(CEP) {
  const url = `https://brasilapi.com.br/api/cep/v1/${CEP}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        success: false,
        message: "CEP não encontrado na base de dados.",
      };
    }
    const result = await response.json();
    return { success: true, content: result.cep };
  } catch (error) {
    console.error("Erro no provider:", error.message);
    return {
      success: false,
      message: "Erro de comunicação com a API externa.",
    };
  }
}
