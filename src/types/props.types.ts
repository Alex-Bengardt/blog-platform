import { IArticle } from './app.types';

export type IArticlesListProps = {
  articles: IArticle[];
};

export type IArticleProps = {
  key?: string;
  article?: IArticle;
  preview: boolean;
};

export type ICreateArticleProps = {
  title: string;
  description: string;
  body: string;
  tags?: { name: string }[];
};

export type IEditArticleProps = {
  editMode?: boolean;
};

export type IArticleList = {
  preview: boolean;
};
