"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { api } from "../../lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    // Validate du lieu phia frontend
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Email không đúng định dạng.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      setError("Mật khẩu phải có từ 8 đến 128 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/api/auth/register", {
        email: cleanEmail,
        password,
      });

      setPassword("");
      setConfirmPassword("");
      setRegistered(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("Email này đã được đăng ký.");
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError("Thông tin đăng ký không hợp lệ.");
      } else {
        setError("Không thể đăng ký. Hãy kiểm tra kết nối API.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (registered) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1>Đăng ký thành công!</h1>
          <p>
            Tài khoản {email.trim()} đã được tạo. Bạn có thể đăng nhập để sử
            dụng OpenShelf.
          </p>
          <Link className="auth-primary-link" href="/login">
            Đến trang đăng nhập
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Tạo tài khoản OpenShelf</h1>
        <p className="auth-description">
          Đăng ký để bắt đầu sử dụng thư viện số.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            maxLength={256}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
          />

          <label htmlFor="register-password">Mật khẩu</label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tối thiểu 8 ký tự"
          />

          <label htmlFor="register-confirm">Xác nhận mật khẩu</label>
          <input
            id="register-confirm"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
          />

          {error && (
            <p role="alert" className="auth-error">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="auth-switch">
          Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
        </p>
      </section>
    </main>
  );
}
