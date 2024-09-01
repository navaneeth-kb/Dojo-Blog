// src/types.ts
export type Blog = {
    id?: string;
    title: string;
    body: string;
    author: string;
    email: string;
    date: string;
    likes?: number;
    comments?: any[];
  };
  