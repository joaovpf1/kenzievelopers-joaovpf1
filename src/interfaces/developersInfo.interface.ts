import { QueryResult } from "pg";

export interface IDevelopersInfos {
  id: number;
  developerSince: Date;
  preferredOS: "windows" | "linux" | "mac os";
  developedId: number;
}

export type IDevelopersInfosCreate = Omit<IDevelopersInfos, "id">;

export type IDevelopersInfosResult = QueryResult<IDevelopersInfos>;
