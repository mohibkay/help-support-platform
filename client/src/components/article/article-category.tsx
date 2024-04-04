import { Badge } from "../ui/badge";
import { ArticleCategoryType } from "@/types/Article";

interface ArticleCategoryProps {
  category: ArticleCategoryType;
}

const ArticleCategory = ({ category }: ArticleCategoryProps) => {
  return <Badge>{category}</Badge>;
};

export default ArticleCategory;
