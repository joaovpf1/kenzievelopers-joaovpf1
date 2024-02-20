import { Request, Response } from "express";
import { IDevelopers } from "../interfaces/developers.interfaces";
import {
  createDevelopersService,
  deleteDeveloper,
  readDevelopersById,
  updateDeveloper,
} from "../services/developers.service";

export const createDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: IDevelopers = await createDevelopersService(req.body);
  return res.status(201).json(developer);
};

export const readDevelopersByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developers: IDevelopers = await readDevelopersById(req.params.id);
  return res.status(200).json(developers);
};

export const updateDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: IDevelopers = await updateDeveloper(req.params.id, req.body);
  return res.status(200).json(developer);
};

export const deleteDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloper(req.params.id);
  return res.status(204).json();
};
