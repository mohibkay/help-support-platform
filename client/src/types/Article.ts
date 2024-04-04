import { ARTICLE_CATEGORIES } from "@/lib/article";

export interface ArticleType {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  category: keyof typeof ARTICLE_CATEGORIES;
}
