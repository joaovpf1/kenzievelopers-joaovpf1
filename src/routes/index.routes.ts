import { Router } from "express";
import { developersRoutes } from "./developers.routes";
import { developersInfosRoutes } from "./developersInfo.routes";
import { projectsRoutes } from "./projects.routes";

export const routes: Router = Router();

routes.use("/developers", developersRoutes);
routes.use("/developers", developersInfosRoutes);
routes.use("/projects", projectsRoutes);
