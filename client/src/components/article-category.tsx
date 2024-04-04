import { ARTICLE_CATEGORIES } from "@/lib/article";
import { Badge } from "./ui/badge";

interface ArticleCategoryProps {
  category: keyof typeof ARTICLE_CATEGORIES;
}

const ArticleCategory = ({ category }: ArticleCategoryProps) => {
  return <Badge>{category}</Badge>;
};

export default ArticleCategory;
