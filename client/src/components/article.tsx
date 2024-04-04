import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArticleType } from "@/types/Article";

const Article = ({ title, description, createdAt, createdBy }: ArticleType) => {
  const readableDate = formatDate(new Date(createdAt));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <p className='flex flex-col'>
          <span>{readableDate}</span>
          <span>Created By: {createdBy}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Article;
