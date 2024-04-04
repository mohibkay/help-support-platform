import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema } from "@/schema/article";
import { useDispatch } from "react-redux";
import { updateArticleSuccess } from "../../redux/article/articlesSlice";
import { updateArticle } from "../../redux/article/articlesService";
import { useState } from "react";
import { ArticleCategoryType, ArticleType } from "@/types/Article";
import { ARTICLE_CATEGORIES } from "@/lib/article";

type FormData = {
  title: string;
  description: string;
  category: ArticleCategoryType;
};

const EditArticle = ({ article }: { article: ArticleType }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article.title,
      description: article.description,
      category: article.category,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      const updatedArticle = await updateArticle(
        article.id,
        data.title,
        data.description,
        data.category
      );
      dispatch(updateArticleSuccess(updatedArticle));
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
          <Icons.Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription className='space-y-4 my-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-4'
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Description' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={article.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ARTICLE_CATEGORIES).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full'>
                  Update
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditArticle;
