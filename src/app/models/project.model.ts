export interface Projects {
  project: project,
}

export interface project {
  _id: string;
  name: string;
  description?: string;
  members?: number;
}
