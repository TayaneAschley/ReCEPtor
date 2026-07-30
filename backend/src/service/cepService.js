import { fetchApi } from "../providers/cepProvider.js";

export async function cepService(CEP) {
  const cep = CEP?.trim() ?? "";

  if (!cep) {
    return {
      success: false,
      message: "CEP é obrigatório.",
    };
  }

  if (!/^\d+$/.test(cep)) {
    return {
      success: false,
      message: "CEP deve conter apenas números.",
    };
  }

  if (cep.length !== 8) {
    return {
      success: false,
      message: "CEP deve conter exatamente 8 dígitos.",
    };
  }

  const result = await fetchApi(cep);
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const { cep: cepApi, street, city, state } = result.content;

  return {
    success: true,
    content: {
      cep: cepApi || cep,
      rua: street || "Não informada",
      cidade: city || "Não informada",
      estado: state || "Não informado",
    },
  };
}
