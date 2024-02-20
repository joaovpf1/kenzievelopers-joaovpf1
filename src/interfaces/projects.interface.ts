import { QueryResult } from "pg";

export interface IProjects {
  id: number;
  name: string;
  description: string | null;
  repository: string;
  startDate: Date;
  endDate: Date | null;
  developerId: number | null;
}

export type IProjectsService = Omit<IProjects, "id">;

export type IProjectsResult = QueryResult<IProjects>;

export type IProjectsUpdate = Partial<IProjects>;

export type projectsRead = IProjects[];
