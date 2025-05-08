import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICreateArticleRequest, IUserDataUpdate } from '../types/api.types';

const baseURL = 'https://blog-platform.kata.academy/api';

const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const requestApi = async (
  url: string,
  data: object = {},
  params: object = {},
  method = Method.GET
) => {
  const currentLocalStorage: string | null = localStorage.getItem('persist:MyBlog');
  const currentUser: string = JSON.parse(currentLocalStorage!)?.user;
  const userHasToken: string = currentUser && JSON.parse(currentUser).user.token;

  const headers: { [key: string]: string } = {};

  headers['X-Requested-With'] = 'XMLHttpRequest';
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = `Token ${userHasToken}`;

  const response = await axios.request({
    baseURL,
    url,
    data,
    params,
    method,
    headers,
  });

  if (response.status > 300) {
    throw new Error(`${response.status}`);
  }

  return response;
};

export const fetchAnArticle = createAsyncThunk(
  'async/fetchAnArticle',
  async (slug: string) => {
    return await requestApi(`/articles/${slug}`);
  }
);

export const fetchArticles = createAsyncThunk(
  'async/fetchArticles',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const params = { limit, offset };

    return await requestApi('/articles', {}, params);
  }
);

export const createUser = createAsyncThunk(
  'async/createUser',
  async (user: { email: string; username: string; password: string }) => {
    return await requestApi('/users', { user }, {}, Method.POST);
  }
);

export const loginUser = createAsyncThunk(
  'async/loginUser',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await requestApi('/users/login', { user }, {}, Method.POST);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Ошибка авторизации';
      return rejectWithValue(errorMessage); // Отклоняем с сообщением об ошибке
    }
  }
);

export const updateUser = createAsyncThunk(
  'async/updateUser',
  async (user: IUserDataUpdate) => {
    return await requestApi('/user', { user }, {}, Method.PUT);
  }
);

export const createArticle = createAsyncThunk(
  'async/createArticle',
  async (article: ICreateArticleRequest) => {
    return await requestApi('/articles', { article }, {}, Method.POST);
  }
);

export const updateArticle = createAsyncThunk(
  'async/updateArticle',
  async (data: { article: ICreateArticleRequest; slug: string }) => {
    const { slug, article } = data;
    return await requestApi(`/articles/${slug}`, { article }, {}, Method.PUT);
  }
);

export const deleteArticle = createAsyncThunk('async/deleteArticle', async (slug: string) => {
  return await requestApi(`/articles/${slug}`, {}, {}, Method.DELETE);
});

export const addFavorite = createAsyncThunk('async/addFavorite', async (slug: string) => {
  return await requestApi(`/articles/${slug}/favorite`, {}, {}, Method.POST);
});

export const removeFavorite = createAsyncThunk(
  'async/removeFavorite',
  async (slug: string) => {
    return await requestApi(`/articles/${slug}/favorite`, {}, {}, Method.DELETE);
  }
);
