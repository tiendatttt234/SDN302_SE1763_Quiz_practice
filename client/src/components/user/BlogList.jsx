import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import "./styles/BlogList.css";
import { format } from "date-fns";
function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    // Gọi API để lấy dữ liệu blog từ backend
    fetch("http://localhost:9999/blog/list") // Sử dụng endpoint thực tế của backend
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.data); // Giả sử API trả về dữ liệu trong thuộc tính data
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const totalBlogs = blogs.length;
  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <section className="home-blog-section">
      <div className="container">
        <h1 className="home-blog-title">All Blogs</h1>
        <div className="row">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="col-md-3 mb-4">
              <div className="home-blog-entry">
                <Link
                  to={`/blog/detail/${blog._id}`}
                  className="home-blog-img-link"
                >
                  <div className="home-blog-image-container">
                    <img
                      src={`http://localhost:9999/public/images/${blog.image}`}
                      alt={blog.title}
                      className="home-blog-img-large"
                    />
                  </div>
                  <h2 className="home-blog-post-title">{blog.title}</h2>
                </Link>
                <p>{blog.brief}</p>
                <span className="home-blog-date">
                  {format(new Date(blog.createDate), "dd MMMM yyyy")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            {renderPagination()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogList;
