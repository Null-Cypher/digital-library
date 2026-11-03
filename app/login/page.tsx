"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setSubmitting(true);

    try {
      await login(email.trim(), password);

      // Chuyen ve trang chu sau khi dang nhap
      router.replace("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Email hoặc mật khẩu không chính xác.");
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError("Thông tin đăng nhập không hợp lệ.");
      } else {
        setError("Không thể đăng nhập. Hãy kiểm tra kết nối API.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="auth-page">
        <p>Đang kiểm tra phiên đăng nhập...</p>
      </main>
    );
  }

  if (user) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1>Bạn đã đăng nhập</h1>
          <p>Tài khoản: {user.email}</p>
          <Link className="auth-primary-link" href="/">
            Về trang chủ
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Đăng nhập OpenShelf</h1>
        <p className="auth-description">
          Chào mừng bạn quay trở lại thư viện số.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
          />

          <label htmlFor="login-password">Mật khẩu</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="auth-switch">
          Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
        </p>
      </section>
    </main>
  );
}
