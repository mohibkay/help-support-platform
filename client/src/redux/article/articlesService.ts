import { ArticleCategoryType, ArticleType } from "../../types/Article";
import axiosClient from "../../api/axios";

export const getArticles = async (): Promise<ArticleType[]> => {
  try {
    const response = await axiosClient.get<ArticleType[]>("/articles");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
};

export const createArticle = async (
  title: string,
  description: string,
  category: ArticleCategoryType
): Promise<ArticleType> => {
  try {
    const response = await axiosClient.post<ArticleType>("/articles", {
      title,
      description,
      category,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create article");
  }
};

export const updateArticle = async (
  articleId: number,
  title: string,
  description: string,
  category: ArticleCategoryType
): Promise<ArticleType> => {
  try {
    const response = await axiosClient.put<ArticleType>(
      `/articles/${articleId}`,
      {
        title,
        description,
        category,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update article");
  }
};

export const deleteArticle = async (articleId: number): Promise<void> => {
  try {
    await axiosClient.delete(`/articles/${articleId}`);
  } catch (error) {
    throw new Error("Failed to delete article");
  }
};
