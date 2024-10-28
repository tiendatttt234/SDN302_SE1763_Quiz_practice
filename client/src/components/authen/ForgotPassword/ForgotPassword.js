import React from "react";

const ForgotPassword = () => {
  const styles = {
    body: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
    },
    container: {
      textAlign: "left",
      maxWidth: "400px",
      width: "100%",
    },
    heading: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#1F2937",
      marginBottom: "16px",
    },
    paragraph: {
      fontSize: "16px",
      color: "#4B5563",
      marginBottom: "24px",
    },
    label: {
      fontSize: "14px",
      color: "#4B5563",
      display: "block",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      color: "#6B7280",
      backgroundColor: "#F9FAFB",
      border: "1px solid #E5E7EB",
      borderRadius: "4px",
      marginBottom: "24px",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      fontWeight: 600,
      color: "#ffffff",
      backgroundColor: "#3B82F6",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#2563EB",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Đặt lại mật khẩu của bạn</h1>
        <p style={styles.paragraph}>
          Nhập email bạn đã đăng ký. Chúng tôi sẽ gửi cho bạn một liên kết để
          đăng nhập và đặt lại mật khẩu.
        </p>
        <form>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@email.com"
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.button.backgroundColor)
            }
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
