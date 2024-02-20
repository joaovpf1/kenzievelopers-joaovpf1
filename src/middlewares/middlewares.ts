import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors";
import {
  IDevelopers,
  IDevelopersResult,
} from "../interfaces/developers.interfaces";
import { IProjects, IProjectsResult } from "../interfaces/projects.interface";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) return next();

  const query: string = `SELECT * FROM "developers" WHERE "email" = $1;`;
  const queryResult: IDevelopersResult = await client.query(query, [email]);

  if (queryResult.rowCount) {
    throw new AppError("Email already exists.", 409);
  }
  return next();
};

export const verifyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const query: string = `SELECT * FROM "developers" WHERE "id" = $1;`;
  const queryResult: IDevelopersResult = await client.query(query, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  const foundDeveloper: IDevelopers = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloper };
  return next();
};

export const verifyProjectsId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const query: string = `SELECT * FROM "projects" WHERE "id" = $1;`;
  const queryResult: IProjectsResult = await client.query(query, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("Project not found.", 404);
  }

  const foundProjects: IProjects = queryResult.rows[0];
  res.locals = { ...res.locals, foundProjects };
  return next();
};

export const verifyPreferredOS = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { preferredOS } = req.body;
  if (
    preferredOS == "Windows" ||
    preferredOS == "Linux" ||
    preferredOS == "MacOS"
  ) {
    return next();
  } else {
    throw new AppError("Invalid OS option.", 400);
  }
};

export const verifyAddInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerSince } = req.body;
  const query: string = `SELECT * FROM "developerInfos" WHERE "developerSince" = $1;`;
  const queryResult: IProjectsResult = await client.query(query, [
    developerSince,
  ]);

  if (queryResult.rowCount) {
    throw new AppError("Developer infos already exists.", 409);
  } else {
    return next();
  }
};

export const verifyProjectsDeveloperId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let { developerId } = req.body;
  const query: string = `SELECT * FROM "developers" WHERE "id" = $1;`;
  const queryResult: IDevelopersResult = await client.query(query, [
    developerId,
  ]);

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  const foundProjects: IDevelopers = queryResult.rows[0];
  res.locals = { ...res.locals, foundProjects };
  return next();
};

export const verifyIfProjectsHaveId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let id = req.body.developerId;
  const query: string = `SELECT * FROM "developers" WHERE "id" = $1;`;
  const queryResult: IDevelopersResult = await client.query(query, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  const foundProjects: IDevelopers = queryResult.rows[0];
  res.locals = { ...res.locals, foundProjects };
  return next();
};
