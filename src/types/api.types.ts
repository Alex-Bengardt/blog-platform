import { FS, IArticle } from './app.types';

export type IUserResponce = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string | null;
};

export type IServerResponce = {
  articles?: IArticle[];
  articlesCount?: number;
  article?: IArticle;
  status: FS;
  error?: string | null;
};

export type IArticleResponce = {
  article?: IArticle;
  status: FS;
  error?: string | null;
};

export type IUserFormRequest = {
  username: string;
  email: string;
  password: string;
  confirmpass?: string;
  image?: string;
  agreement?: boolean;
};

export type ICreateArticleRequest = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};

export type IUserDataUpdate = {
  email?: string;
  username: string;
  password?: string;
  bio?: string;
  image?: string;
};
