import { ReactNode } from 'react';
import { Control, FieldErrors, UseFormGetValues, UseFormWatch } from 'react-hook-form';

import { IUserFormRequest } from './api.types';
import { ICreateArticleProps } from './props.types';

export const enum FS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  REJECTED = 'rejected',
}

export const enum US {
  AUTH = 'authenticated',
  UNAUTH = 'unauthenticated',
}

export type IArticle = {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
};

export type IAuthor = {
  username: string;
  image: string;
  following: boolean;
};

export type IFormInput = {
  control: Control<IUserFormRequest>;
  errors?: FieldErrors<IUserFormRequest>;
  label?: string;
  inputValue?: string | null | undefined;
  getValues?: UseFormGetValues<IUserFormRequest>;
};

export type IArticleFormInput = {
  control: Control<ICreateArticleProps>;
  errors: FieldErrors<ICreateArticleProps>;
  inputValue?: string | null | undefined;
};

export type IFormInfo = {
  actionText: string;
  messageText: string;
  extendLink: string;
};

export type IFormButton = {
  actionText: string;
  enable?: boolean;
  editMode?: boolean;
  watch?: UseFormWatch<IUserFormRequest>;
};

export type ThemeComponentWrapper = {
  children: ReactNode;
};
