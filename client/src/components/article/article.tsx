import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArticleType } from "@/types/Article";
import RoleGate from "../auth/role-gate";
import { USERS } from "@/lib/users";
import ArticleCategory from "./article-category";
import EditArticle from "./edit-article";
import DeleteArticle from "./delete-article";

const Article = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  createdBy,
  category,
}: ArticleType) => {
  const article = {
    id,
    title,
    description,
    createdAt,
    createdBy,
    category,
    updatedAt,
  };

  const readableCreatedAt = formatDate(new Date(createdAt));
  const readableUpdatedAt = formatDate(new Date(updatedAt));

  return (
    <Card>
      <CardHeader className='flex flex-row items-baseline justify-between'>
        <CardTitle>{title}</CardTitle>
        <RoleGate allowedRoles={[USERS.Support]}>
          <div>
            <EditArticle article={article} />
            <DeleteArticle articleId={id} />
          </div>
        </RoleGate>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className='flex flex-col'>
        <ArticleCategory category={category} />
        <p className='flex flex-col mt-4'>
          <span>Created: {readableCreatedAt}</span>
          <span>Updated: {readableUpdatedAt}</span>
          <RoleGate allowedRoles={[USERS.Support]}>
            <span>Created By: {createdBy}</span>
          </RoleGate>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Article;
