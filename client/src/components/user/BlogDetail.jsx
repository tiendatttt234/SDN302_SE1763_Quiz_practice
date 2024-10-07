import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { format } from "date-fns";
import { Container, Card } from 'react-bootstrap';
import './BlogDetail.css';

function BlogDetail() {
    const { blogId } = useParams();

    // Static blog data (could be an array if you want to simulate multiple blogs)
    const staticBlogs = [
        {
            id: 1,
            title: "Blog Title 1",
            data: "<p>This is the content of Blog 1. It's rich text!</p>",
            image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
            dateCreate: "2023-10-01",
        },
        {
            id: 2,
            title: "Blog Title 2",
            data: "<p>This is the content of Blog 2. It's rich text!</p>",
            image: "blog2.jpg",
            dateCreate: "2023-10-02",
        },
        {
            id: 3,
            title: "Blog Title 3",
            data: "<p>This is the content of Blog 3. It's rich text!</p>",
            image: "blog3.jpg",
            dateCreate: "2023-10-03",
        }
    ];

    // Find the blog by ID from the static data
    const blog = staticBlogs[0];

    return (
        <Container className="my-5 blog-detail-container">
            {blog ? (
                <Card className="border-0 shadow-lg blog-card">
                    {blog.image && (
                        <Card.Img
                            variant="top"
                            src={`${blog.image}`}
                            alt={blog.title}
                            className="img-fluid rounded-top blog-image"
                        />
                    )}
                    <Card.Body className="p-4">
                        {blog.title && <Card.Title className="blog-title">{blog.title}</Card.Title>}
                        {blog.dateCreate && (
                            <Card.Subtitle className="blog-date">
                                {format(new Date(blog.dateCreate), "dd MMMM, yyyy")}
                            </Card.Subtitle>
                        )}
                        <div className="blog-content">
                            <ReactQuill
                                value={blog.data}
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
