import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleType } from "../types/Article";

interface ArticlesState {
  articles: ArticleType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  error: null,
};

const ArticlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getArticlesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getArticlesSuccess(state, action: PayloadAction<ArticleType[]>) {
      state.isLoading = false;
      state.articles = action.payload;
    },
    getArticlesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createArticleStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createArticleSuccess(state, action: PayloadAction<ArticleType>) {
      state.isLoading = false;
      state.articles.push(action.payload);
    },
    createArticleFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getArticlesStart,
  getArticlesSuccess,
  getArticlesFailure,
  createArticleStart,
  createArticleSuccess,
  createArticleFailure,
} = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
