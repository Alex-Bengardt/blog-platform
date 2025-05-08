import { createSlice } from '@reduxjs/toolkit';

import { FS } from '../types/app.types';
import { IServerResponce } from '../types/api.types';
import {
  fetchArticles,
  fetchAnArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  addFavorite,
  removeFavorite,
} from '../services/RealWorld.api';

// State
const initialState: IServerResponce = {
  articles: [],
  articlesCount: 0,
  status: FS.IDLE,
  error: null,
};

// Slices
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение списка статей
      .addCase(fetchArticles.pending, (state) => {
        state.status = FS.LOADING;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        state.articles = action.payload.data.articles;
        state.articlesCount = action.payload.data.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = FS.REJECTED;
        state.error = action.error.message;
      })
      // Запрос на получение одной статьи
      .addCase(fetchAnArticle.pending, (state) => {
        state.status = FS.LOADING;
      })
      .addCase(fetchAnArticle.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        state.article = action.payload.data.article;
      })
      .addCase(fetchAnArticle.rejected, (state, action) => {
        state.status = FS.REJECTED;
        state.error = action.error.message;
      })
      // Публикация статьи
      .addCase(createArticle.pending, (state) => {
        state.status = FS.LOADING;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        console.log(action.payload.data);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = FS.REJECTED;
        console.log(action.error.message);
      })
      // Обновление статьи
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        state.article = action.payload.data.article;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = FS.REJECTED;
        console.log(action.error.message);
      })
      // Удаление статьи
      .addCase(deleteArticle.pending, (state) => {
        state.status = FS.LOADING;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        console.log(action.payload.data);
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = FS.REJECTED;
        console.log(action.error.message);
      })
      // Добавление в избранное
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;

        const { slug, favorited } = action.payload.data.article;
        const currArt = state.articles?.find((el) => el.slug === slug);
        if (state.articles && currArt) {
          currArt.favorited = favorited;
          currArt.favoritesCount += 1;
        }

        if (state.article) {
          state.article.favorited = favorited;
          state.article.favoritesCount += 1;
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = FS.REJECTED;
        console.log(action.error.message);
      })
      // Удаление из избранного
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;

        const { slug, favorited } = action.payload.data.article;
        const currArt = state.articles?.find((el) => el.slug === slug);
        if (state.articles && currArt) {
          currArt.favorited = favorited;
          currArt.favoritesCount -= 1;
        }

        if (state.article) {
          state.article.favorited = favorited;
          state.article.favoritesCount -= 1;
        }
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = FS.REJECTED;
        console.log(action.error.message);
      });
  },
});

export default articlesSlice.reducer;
