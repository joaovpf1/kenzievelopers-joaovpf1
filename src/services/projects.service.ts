import { client } from "../database";
import {
  IProjects,
  IProjectsResult,
  IProjectsService,
  IProjectsUpdate,
} from "../interfaces/projects.interface";
import format from "pg-format";

export const createProjectsService = async (
  data: IProjectsService
): Promise<IProjects> => {
  const queryFormat: string = format(
    `INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );
  const queryResult: IProjectsResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

export const readProjectsById = async (id: string): Promise<IProjects> => {
  const query: string = `
    SELECT
    "p"."id" AS "projectId",
    "p"."name" AS "projectName",
    "p"."description" AS "projectDescription",
    "p"."repository" AS "projectRepository",
    "p"."startDate" AS "projectStartDate",
    "p"."endDate" AS "projectEndDate",
    "d"."name" As "projectDeveloperName"
    FROM "projects" AS "p"
    LEFT JOIN "developers" AS "d" 
    ON "p"."developerId" = "d"."id"
    WHERE "d"."id" = $1;
    `;
  const queryResult: IProjectsResult = await client.query(query, [id]);
  return queryResult.rows[0];
};

export const updateProjects = async (
  id: string,
  data: IProjectsUpdate
): Promise<IProjects> => {
  const queryFormat: string = format(
    `
    UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );
  const queryResult: IProjectsResult = await client.query(queryFormat, [id]);
  return queryResult.rows[0];
};
