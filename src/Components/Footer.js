import React from "react";

function Footer() {
  return (
    <footer
      className="text-white text-center py-3 "
      style={{
        background: "linear-gradient(90deg, #198754, #43cea2)",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <p className="mb-1 fw-semibold">
        💰 Manage your expenses — track, analyze, and save smartly.
      </p>
      <p className="small mb-0">
        &copy; {new Date().getFullYear()} <strong>Secure Expense Tracker</strong> | Built with ❤️ by{" "}
        <span className="fw-bold">Maharaja</span>
      </p>
    </footer>
  );
}

export default Footer;
