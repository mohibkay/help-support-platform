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

const Article = ({
  title,
  description,
  createdAt,
  createdBy,
  category,
}: ArticleType) => {
  const readableDate = formatDate(new Date(createdAt));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
