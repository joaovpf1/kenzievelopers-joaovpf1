import { client } from "../database";
import {
  IDevelopers,
  IDevelopersResult,
  IDevelopersService,
} from "../interfaces/developers.interfaces";
import format from "pg-format";

export const createDevelopersService = async (
  data: IDevelopersService
): Promise<IDevelopers> => {
  const queryFormat: string = format(
    `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );
  const queryResult: IDevelopersResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

export const readDevelopersById = async (id: string): Promise<IDevelopers> => {
  const query: string = `
    SELECT
    "d"."id" AS "developerId",
    "d"."name" AS "developerName",
    "d"."email" AS "developerEmail",
    "di"."developerSince" AS "developerInfoDeveloperSince",
    "di"."preferredOS" AS "developerInfoPreferredOS"
    FROM "developers" AS "d"
    LEFT JOIN "developerInfos" AS "di"
    ON "di"."developerId" = "d"."id"
    WHERE "d"."id" = $1;
    `;
  const queryResult: IDevelopersResult = await client.query(query, [id]);
  return queryResult.rows[0];
};

export const updateDeveloper = async (
  id: string,
  data: IDevelopers
): Promise<IDevelopers> => {
  const queryFormat: string = format(
    `
    UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );
  const queryResult: IDevelopersResult = await client.query(queryFormat, [id]);
  return queryResult.rows[0];
};

export const deleteDeveloper = async (id: string): Promise<void> => {
  const query = `DELETE FROM "developers" WHERE "id"=$1; `;
  await client.query(query, [id]);
};
