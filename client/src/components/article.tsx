import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArticleType } from "@/types/Article";
import RoleGate from "./auth/role-gate";
import { USERS } from "@/lib/users";
import ArticleCategory from "./article-category";
import EditArticle from "./edit-article";

const Article = ({
  id,
  title,
  description,
  createdAt,
  createdBy,
  category,
}: ArticleType) => {
  const readableDate = formatDate(new Date(createdAt));

  const article = {
    id,
    title,
    description,
    createdAt,
    createdBy,
    category,
    updatedAt: "",
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-baseline justify-between'>
        <CardTitle>{title}</CardTitle>
        <RoleGate allowedRoles={[USERS.Support]}>
          <div className='-space-x-4'>
            <EditArticle article={article} />
            {/* <DeleteArticle articleId={id} /> */}
          </div>
        </RoleGate>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className='flex flex-col'>
        <ArticleCategory category={category} />
        <p className='flex flex-col'>
          <span>{readableDate}</span>
          <RoleGate allowedRoles={[USERS.Support]}>
            <span>Created By: {createdBy}</span>
          </RoleGate>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Article;
