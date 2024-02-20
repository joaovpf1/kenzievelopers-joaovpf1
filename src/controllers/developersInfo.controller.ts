import { Request, Response } from "express";
import {
  IDevelopersInfos,
  IDevelopersInfosCreate,
} from "../interfaces/developersInfo.interface";
import { createDevelopersInfoService } from "../services/developersInfo.service";

export const createDevelopersInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: IDevelopersInfosCreate = {
    ...req.body,
    developerId: req.params.id,
  };
  const developer: IDevelopersInfos = await createDevelopersInfoService(data);
  return res.status(201).json(developer);
};
