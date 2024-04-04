import { articles } from "../mock/articles.js";

const getArticles = async (req, res) => {
  res.json(articles);
};

const createArticle = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || title.length > 20 || !/^[a-zA-Z0-9 ]+$/.test(title)) {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (
    !description ||
    description.length > 200 ||
    !/^[a-zA-Z0-9 ]+$/.test(description)
  ) {
    return res.status(400).json({ error: "Invalid description" });
  }

  if (!category || !["Campaign", "Reporting"].includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  // TODO: Verify if the user is a Support User

  const newArticle = {
    id: articles.length + 1,
    title,
    description,
    category,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "support1", // Replace with the logged-in Support User's username
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
};

const updateArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, description, category } = req.body;

  if (!title || title.length > 20 || !/^[a-zA-Z0-9 ]+$/.test(title)) {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (
    !description ||
    description.length > 200 ||
    !/^[a-zA-Z0-9 ]+$/.test(description)
  ) {
    return res.status(400).json({ error: "Invalid description" });
  }

  if (!category || !["Campaign", "Reporting"].includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  // TODO: Verify if the user is a Support User

  const articleIndex = articles.findIndex(
    (article) => article.id === articleId
  );

  if (articleIndex === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  const updatedArticle = {
    ...articles[articleIndex],
    title,
    description,
    category,
    updatedAt: new Date(),
  };

  articles[articleIndex] = updatedArticle;
  res.json(updatedArticle);
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
