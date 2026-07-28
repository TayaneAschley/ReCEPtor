import { cepController } from "../controller/cepController.js";
import { Router } from "express";

export const router = Router();

router.get("/ReCEPtor/:cep", cepController);
