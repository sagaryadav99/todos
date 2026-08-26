export type User = {
  id: string;
  email: string;
  password: string;
  posts: Post[];
};
export type Post = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  isDeleted: boolean;
};
