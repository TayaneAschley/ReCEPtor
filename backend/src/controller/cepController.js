import { cepService } from "../service/cepService.js";

export async function cepController(req, res) {
  const { cep } = req.params;

  const result = await cepService(cep);

  if (result.success === false) {
    return res.status(400).json({
      message: result.message,
    });
  }

  return res.status(200).json({
    content: result.content,
  });
}
