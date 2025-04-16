export enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high"
  }
  
export interface Bug {
    title: string;
    description: string;
    priority: Priority;
    createdAt?: Date;
  }