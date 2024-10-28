import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Sidebar from "./sidebar";
import "../adminCSS/usermanagement.css";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalAddNewBlog from "./modalCreateBlog";
import ModalUpdateBlog from "./modalUpdateBlog";
import ModalDeleteBlog from "./modalDeleteBlog";

const AdminManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9999/blog/list");
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Gọi hàm fetchData trong useEffect để lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchData();
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleClickBtnUpdate = (blogs) => {
    setShowModalUpdate(true);
    setDataUpdate(blogs);
  };

  const handleClickBtnDelete = (blogs) => {
    setShowModalDelete(true);
    setDataDelete(blogs);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  return (
    <div className="user-management">
      <Sidebar />
      <div className="content">
        <h2>Blog Management</h2>

        <Button
          variant="success"
          className="mb-3"
          onClick={() => setShowAddModal(true)}
        >
          Add New Blog
        </Button>

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th
                onClick={() => requestSort("title")}
                style={{ cursor: "pointer", width: "20%" }}
              >
                Title
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>

              <th
                onClick={() => requestSort("createDate")}
                style={{ cursor: "pointer", width: "15%" }}
              >
                Date
                {sortConfig.key === "createDate" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
              <th style={{ width: "10%" }}>Image</th>
              <th
                onClick={() => requestSort("isActive")}
                style={{ cursor: "pointer", width: "10%" }}
              >
                Status
                {sortConfig.key === "isActive" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBlogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{new Date(blog.createDate).toLocaleDateString()}</td>
                <td>
                  <img
                    src={`http://localhost:9999/public/images/${blog.image}`}
                    alt={blog.title}
                    width="100"
                  />
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      blog.isActive ? "active" : "inactive"
                    }`}
                  >
                    {blog.isActive === true ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      variant="info"
                      onClick={() => handleClickBtnUpdate(blog)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      style={{ color: "white" }}
                      onClick={() => handleClickBtnDelete(blog)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ModalAddNewBlog
          show={showAddModal}
          setShow={setShowAddModal}
          fetchData={fetchData}
        />
        <ModalUpdateBlog
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          fetchData={fetchData}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        />
        <ModalDeleteBlog
          show={showModalDelete}
          setShow={setShowModalDelete}
          dataDelete={dataDelete}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default AdminManageBlog;
