import { ARTICLE_CATEGORIES } from "@/lib/article";

export type ArticleCategoryType =
  (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];

export interface ArticleType {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  category: ArticleCategoryType;
}
