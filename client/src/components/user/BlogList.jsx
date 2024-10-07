import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import './BlogList.css';

function BlogList() {
    // Static blog data
    const staticBlogs = [
        {
            id: 1,
            title: "Blog Title 1",
            brief: "This is a brief description of Blog 1.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-01",
        },
        {
            id: 2,
            title: "Blog Title 2",
            brief: "This is a brief description of Blog 2.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-02",
        },
        {
            id: 3,
            title: "Blog Title 3",
            brief: "This is a brief description of Blog 3.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-03",
        },
        {
            id: 4,
            title: "Blog Title 4",
            brief: "This is a brief description of Blog 4.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-04",
        },
        {
            id: 5,
            title: "Blog Title 5",
            brief: "This is a brief description of Blog 5.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-05",
        },
        {
            id: 6,
            title: "Blog Title 6",
            brief: "This is a brief description of Blog 6.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-06",
        },
        {
            id: 7,
            title: "Blog Title 7",
            brief: "This is a brief description of Blog 7.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-07",
        },
        {
            id: 8,
            title: "Blog Title 8",
            brief: "This is a brief description of Blog 8.",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            status: true,
            dateCreate: "2023-10-08",
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4;

    const totalBlogs = staticBlogs.length;
    const currentBlogs = staticBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalBlogs / blogsPerPage);
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
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
                        <div key={blog.id} className="col-md-3 mb-4">
                            <div className="home-blog-entry">
                                <Link to={`/blogs/${blog.id}`} className="home-blog-img-link">
                                    <div className="home-blog-image-container">
                                        <img
                                            src={`${blog.image}`}
                                            alt={blog.title}
                                            className="home-blog-img-large"
                                        />
                                    </div>
                                    <h2 className="home-blog-post-title">{blog.title}</h2>
                                </Link>
                                <p>{blog.brief}</p>
                                <span className="home-blog-date">{/* You can format the date here */}</span>
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
