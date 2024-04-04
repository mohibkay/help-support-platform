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
    updateArticleStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateArticleSuccess(state, action: PayloadAction<ArticleType>) {
      state.isLoading = false;
      const updatedArticle = action.payload;
      const index = state.articles.findIndex(
        (article) => article.id === updatedArticle.id
      );
      if (index !== -1) {
        state.articles[index] = updatedArticle;
      }
    },
    updateArticleFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteArticleStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteArticleSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
    deleteArticleFailure(state, action: PayloadAction<string>) {
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
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailure,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailure,
} = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
