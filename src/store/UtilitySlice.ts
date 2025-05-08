import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// State
const initialState: { isArticlesList: boolean; isPreview: boolean; currentPage: number } = {
  isArticlesList: true,
  isPreview: true,
  currentPage: 1,
};

// Slices
const utilitySlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    togglePagination(state, action: PayloadAction<boolean>) {
      state.isArticlesList = action.payload;
    },
    toggleArticlePreview(state, action: PayloadAction<boolean>) {
      state.isPreview = action.payload;
    },
    setCurrentPageNumber(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export default utilitySlice.reducer;
export const { togglePagination, toggleArticlePreview, setCurrentPageNumber } =
  utilitySlice.actions;
