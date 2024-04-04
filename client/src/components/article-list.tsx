import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../redux/articlesService";
import {
  getArticlesStart,
  getArticlesSuccess,
  getArticlesFailure,
} from "../redux/articlesSlice";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { ArticleType } from "@/types/Article";
import Article from "./article";
import CreateArticle from "./create-article";
import RoleGate from "./auth/role-gate";
import { USERS } from "@/lib/users";

const ArticlesList: React.FC = () => {
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector(
    (state: RootState) => state.articles
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        dispatch(getArticlesStart());
        const fetchedArticles = await getArticles();
        dispatch(getArticlesSuccess(fetchedArticles));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(getArticlesFailure(error.message));
        }
      }
    };

    fetchArticles();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex-1'>
      <div className='flex justify-between space-x-4 items-center mb-2'>
        <h2 className='text-3xl'>Articles List</h2>
        <RoleGate allowedRoles={[USERS.Support]}>
          <CreateArticle />
        </RoleGate>
      </div>
      <ul className='space-y-4'>
        {articles?.map(
          ({
            id,
            title,
            description,
            createdAt,
            updatedAt,
            createdBy,
            category,
          }: ArticleType) => (
            <li key={id}>
              <Article
                id={id}
                title={title}
                description={description}
                createdAt={createdAt}
                updatedAt={updatedAt}
                createdBy={createdBy}
                category={category}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ArticlesList;
