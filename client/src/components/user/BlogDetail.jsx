import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { format } from "date-fns";
import { Container, Card, Spinner } from "react-bootstrap";
import "./styles/BlogDetail.css";

function BlogDetail() {
  const { blogId } = useParams(); // Lấy blogId từ URL
  const [blog, setBlog] = useState(null); // Trạng thái lưu trữ dữ liệu blog
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Gọi API để lấy dữ liệu chi tiết blog
    fetch(`http://localhost:9999/blog/detail/${blogId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setBlog(data.data); // Lưu dữ liệu blog vào trạng thái
        } else {
          setError("Blog not found");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false)); // Dừng trạng thái tải khi API gọi xong
  }, [blogId]);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        Loading...
      </Spinner>
    );
  if (error) return <p>{error}</p>;

  return (
    <Container className="my-5 blog-detail-container">
      {blog ? (
        <Card className="border-0 shadow-lg blog-card">
          {blog.image && (
            <Card.Img
              variant="top"
              src={`http://localhost:9999/public/images/${blog.image}`} // Đường dẫn ảnh từ server
              alt={blog.title}
              className="img-fluid rounded-top blog-image"
            />
          )}
          <Card.Body className="p-4">
            {blog.title && (
              <Card.Title className="blog-title">{blog.title}</Card.Title>
            )}
            {blog.createDate && (
              <Card.Subtitle className="blog-date">
                {format(new Date(blog.createDate), "dd MMMM, yyyy")}
              </Card.Subtitle>
            )}
            <div className="blog-content">
              <ReactQuill
                value={blog.content} // Nội dung từ backend
                readOnly={true}
                theme={"bubble"}
                className="react-quill-custom"
              />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>Blog not found</p>
      )}
    </Container>
  );
}

export default BlogDetail;
