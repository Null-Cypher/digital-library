"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function AuthMenu() {
  const { user, loading, logout } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setSubmitting(true);
    setError("");

    try {
      await logout();
    } catch {
      setError("Đăng xuất thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <span className="auth-menu-status">Đang kiểm tra...</span>;
  }

  if (user) {
    return (
      <div className="auth-menu">
        <span className="auth-menu-email" title={user.email}>
          {user.email}
        </span>

        <button
          className="auth-menu-logout"
          type="button"
          onClick={handleLogout}
          disabled={submitting}
        >
          {submitting ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>

        {error && <span role="alert">{error}</span>}
      </div>
    );
  }

  return (
    <div className="auth-menu">
      <Link href="/login">Đăng nhập</Link>
      <Link className="auth-menu-register" href="/register">
        Đăng ký
      </Link>
    </div>
  );
}
