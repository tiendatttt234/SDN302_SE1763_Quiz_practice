import React from "react";

const MyCourse = () => {
  return (
    <div
      style={{ marginTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
          borderRadius: "2rem",
        }}
      >
        <div className="col-sm-6 col-lg-4" style={{ marginBottom: "1rem" }}>
          <div
            className="card card-course-item"
            style={{
              height: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              className="card-img-top"
              src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
              alt="Kiến Thức Nhập Môn IT"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Kiến Thức Nhập Môn IT</h5>
              <p className="card-text">
                Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên
                xem các videos tại khóa này trước nhé.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4" style={{ marginBottom: "1rem" }}>
          <div
            className="card card-course-item"
            style={{
              height: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              className="card-img-top"
              src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
              alt="Kiến Thức Nhập Môn IT"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Kiến Thức Nhập Môn IT</h5>
              <p className="card-text">
                Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên
                xem các videos tại khóa này trước nhé.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-4" style={{ marginBottom: "1rem" }}>
          <div
            className="card card-course-item"
            style={{
              height: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              className="card-img-top"
              src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
              alt="Kiến Thức Nhập Môn IT"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Kiến Thức Nhập Môn IT</h5>
              <p className="card-text">
                Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên
                xem các videos tại khóa này trước nhé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
