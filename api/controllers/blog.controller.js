const Blog = require("../models/Blog.model");
const mongoose = require("mongoose");
const path = require("path");

const uploadImage = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, "../public/images");

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (err) {
    console.log("check err: ", err);

    return {
      status: "failed",
      path: null,
      error: JSON.stringify(err),
    };
  }
};
async function createNewBlog(req, res, next) {
  const { title, content, image, createDate, isActive } = req.body;
  let accountId = req.body.account;
  try {
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({ message: "Invalid account Id format" });
    }

    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No image uploaded.");
    } else {
      console.log("Image file received:", req.files.image);

      let result = await uploadImage(req.files.image);
      imageUrl = result.path;
      console.log("check result", result.path);
    }

    console.log("Creating blog with data:", {
      title,
      content,
      image: imageUrl,
      account: accountId,
      createDate: new Date(),
      isActive: true,
    });

    const blog = new Blog({
      title,
      content,
      image: imageUrl,
      account: accountId,
      createDate: new Date(),
      isActive: true, // Mặc định là true, có thể thiết lập rõ ràng
    });
    const newBlog = await blog.save();

    // Gửi phản hồi thành công
    res.status(201).json({
      message: "Create new blog successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error in createNewBlog:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
      return res.status(400).json({
        success: false,
        error: "Title of blog must be unique.",
      });
    }

    // Kiểm tra lỗi xác thực
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    console.error("Detailed server error:", error); // Log chi tiết lỗi

    // Xử lý các lỗi khác
    res.status(500).json({
      success: false,
      error: "Server error. Unable to create blog.",
    });
  }
}

async function listAllBlogs(req, res, next) {
  try {
    // Lấy tất cả các blog và populate thông tin account
    const blogs = await Blog.find(); // 'email userName' là các trường bạn muốn lấy từ account

    // Kiểm tra nếu không có blog nào
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    // Trả về danh sách các blog
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    // Xử lý các lỗi khác
    res.status(500).json({
      success: false,
      error: "Server error. Unable to fetch blogs.",
    });
  }
}

async function updateBlog(req, res, next) {
  const { blogId } = req.params; // Lấy blogId từ URL
  const { title, content, isActive } = req.body; // Các trường muốn cập nhật

  try {
    // Kiểm tra nếu blogId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
    } else {
      let result = await uploadImage(req.files.image);
      imageUrl = result.path;
      console.log("check result", result.path);
    }

    // Sử dụng updateOne để cập nhật blog theo blogId
    const updateFields = {};

    // Kiểm tra từng trường, chỉ thêm vào updateFields nếu nó có giá trị
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (typeof isActive !== "undefined") updateFields.isActive = isActive; // kiểm tra giá trị boolean
    if (imageUrl) updateFields.image = imageUrl;

    // Sử dụng updateOne để cập nhật blog theo blogId
    const result = await Blog.updateOne(
      { _id: blogId },
      { $set: updateFields },
      { runValidators: true } // Đảm bảo kiểm tra xác thực
    );

    // Kiểm tra xem blog có được cập nhật không
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found or not updated" });
    }

    // Trả về kết quả thành công
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    // Xử lý các lỗi khác
    res.status(500).json({
      success: false,
      error: "Server error. Unable to update blog.",
    });
  }
}

async function deleteBlog(req, res, next) {
  const { blogId } = req.params; // Lấy blogId từ URL

  try {
    // Kiểm tra nếu blogId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    // Thực hiện xóa blog theo blogId
    const result = await Blog.deleteOne({ _id: blogId });

    // Kiểm tra xem blog có tồn tại và đã bị xóa không
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found or already deleted" });
    }

    // Trả về kết quả thành công
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    // Xử lý các lỗi khác
    res.status(500).json({
      success: false,
      error: "Server error. Unable to delete blog.",
    });
  }
}

async function getBlogDetail(req, res, next) {
  const { blogId } = req.params; // Lấy blogId từ URL

  try {
    // Kiểm tra nếu blogId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    // Tìm blog dựa trên blogId và chọn các trường cần thiết
    const blog = await Blog.findById(blogId, "title createDate image content");

    // Kiểm tra xem blog có tồn tại không
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Trả về chi tiết blog
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    // Xử lý các lỗi khác
    res.status(500).json({
      success: false,
      error: "Server error. Unable to fetch blog details.",
    });
  }
}

const BlogController = {
  createNewBlog,
  listAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogDetail,
};

module.exports = BlogController;
