import { articles } from "../mock/articles.js";
import { createCategory } from "../utils.js";

const getArticles = async (req, res) => {
  res.json(articles);
};

const createArticle = async (req, res) => {
  const { title, description } = req.body;
  const newArticle = {
    id: articles.length + 1,
    title,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "support2",
    category: createCategory(),
  };
  articles.push(newArticle);
  res.json(newArticle);
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const index = articles.findIndex((a) => a.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  articles[index] = { ...articles[index], title, description };
  res.json(articles[index]);
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex((a) => a.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  articles.splice(index, 1);
  res.json({ message: "Article deleted" });
};

export { getArticles, createArticle, updateArticle, deleteArticle };
