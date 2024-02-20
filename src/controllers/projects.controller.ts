import { Request, Response } from "express";
import {
  createProjectsService,
  readProjectsById,
  updateProjects,
} from "../services/projects.service";
import { IProjects } from "../interfaces/projects.interface";

export const createProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: IProjects = await createProjectsService(req.body);
  return res.status(201).json(project);
};

export const readProjectsByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: IProjects = await readProjectsById(req.params.id);
  return res.status(200).json(project);
};

export const updateProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: IProjects = await updateProjects(req.params.id, req.body);
  return res.status(200).json(project);
};
