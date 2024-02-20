import { QueryResult } from "pg";

export interface IDevelopers {
  id: number;
  name: string;
  email: string;
}

export type IDevelopersService = Omit<IDevelopers, "id">;

export type IDevelopersResult = QueryResult<IDevelopers>;

export type IDevelopersUpdate = Partial<IDevelopers>;
