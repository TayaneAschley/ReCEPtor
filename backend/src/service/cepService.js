import { fetchApi } from "../providers/cepProvider.js";

export async function cepService(CEP) {
  if (!CEP) {
    return {
      success: false,
      message: "CEP is required",
    };
  }

  if (isNaN(Number(CEP))) {
    return {
      success: false,
      message: "CEP must contain only numbers",
    };
  }

  const result = await fetchApi(CEP);
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const { cep, street, city, state } = result.content;

  return {
    success: true,
    content: {
      cep: cep,
      rua: street || "Não informada",
      cidade: city,
      estado: state,
    },
  };
}
