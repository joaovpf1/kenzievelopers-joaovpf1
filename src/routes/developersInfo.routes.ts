import { Router } from "express";
import { createDevelopersInfosController } from "../controllers/developersInfo.controller";
import {
  verifyAddInformation,
  verifyId,
  verifyPreferredOS,
} from "../middlewares/middlewares";

export const developersInfosRoutes: Router = Router();

developersInfosRoutes.post(
  "/:id/infos",
  verifyId,
  verifyAddInformation,
  verifyPreferredOS,
  createDevelopersInfosController
);
