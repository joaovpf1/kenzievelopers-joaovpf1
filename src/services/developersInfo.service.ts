import format from "pg-format";
import {
  IDevelopersInfos,
  IDevelopersInfosCreate,
  IDevelopersInfosResult,
} from "../interfaces/developersInfo.interface";
import { client } from "../database";

export const createDevelopersInfoService = async (
  data: IDevelopersInfosCreate
): Promise<IDevelopersInfos> => {
  const queryFormat: string = format(
    `INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: IDevelopersInfosResult = await client.query(queryFormat);

  return queryResult.rows[0];
};
