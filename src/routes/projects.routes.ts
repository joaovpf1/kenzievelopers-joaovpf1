import { Router } from "express";
import {
  verifyIfProjectsHaveId,
  verifyProjectsDeveloperId,
  verifyProjectsId,
} from "../middlewares/middlewares";
import {
  createProjectsController,
  readProjectsByIdController,
  updateProjectsController,
} from "../controllers/projects.controller";

export const projectsRoutes: Router = Router();

projectsRoutes.post("/", verifyIfProjectsHaveId, createProjectsController);
projectsRoutes.use("/:id", verifyProjectsId);
projectsRoutes.get("/:id", readProjectsByIdController);
projectsRoutes.patch(
  "/:id",
  verifyProjectsDeveloperId,
  updateProjectsController
);
