import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailure,
} from "../../redux/article/articlesSlice";
import { deleteArticle } from "../../redux/article/articlesService";
import { useDispatch } from "react-redux";

const DeleteArticle = ({ articleId }: { articleId: number }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteArticle = async () => {
    try {
      dispatch(deleteArticleStart());
      await deleteArticle(articleId);
      dispatch(deleteArticleSuccess(articleId));
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(deleteArticleFailure(error.message));
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
          <Icons.Delete />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            article.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDeleteArticle}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticle;
