const express = require("express");
const { BlogController } = require("../controllers");
const BlogRouter = express.Router();

BlogRouter.post("/create", BlogController.createNewBlog);
BlogRouter.get("/list", BlogController.listAllBlogs);
BlogRouter.put("/update/:blogId", BlogController.updateBlog);
BlogRouter.delete("/delete/:blogId", BlogController.deleteBlog);
BlogRouter.get("/detail/:blogId", BlogController.getBlogDetail);

module.exports = BlogRouter;
