// https://brasilapi.com.br/api/cep/v1/{cep}

export async function fetchApi(CEP) {
  const url = `https://brasilapi.com.br/api/cep/v1/${CEP}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message || "CEP não encontrado na base de dados.";

      return {
        success: false,
        message,
      };
    }

    const result = await response.json();
    return { success: true, content: result };
  } catch (error) {
    console.error("Erro no provider:", error.message);
    return {
      success: false,
      message: "Erro de comunicação com a API externa.",
    };
  }
}
