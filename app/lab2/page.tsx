"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  publishYear: number;
  topic: string;
};

type BookForm = Omit<Book, "id">;

const emptyForm: BookForm = {
  title: "",
  author: "",
  publishYear: 2026,
  topic: "",
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5080",
});

export default function Lab2Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<BookForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // GET: Lấy danh sách sách
  const loadBooks = useCallback(async () => {
    try {
      const response = await api.get<Book[]>("/api/books");

      setBooks(response.data);
      setError("");
    } catch {
      setError("Không tải được sách. Kiểm tra API và CORS.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    api
      .get<Book[]>("/api/books", {
        signal: controller.signal,
      })
      .then((response) => {
        setBooks(response.data);
        setError("");
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setError("Không tải được sách. Kiểm tra API và CORS.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  // POST hoặc PUT: Thêm hoặc cập nhật sách
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (editingId === null) {
        await api.post("/api/books", form);
        setNotice("Đã thêm sách thành công.");
      } else {
        await api.put(`/api/books/${editingId}`, {
          id: editingId,
          ...form,
        });
        setNotice("Đã cập nhật sách thành công.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadBooks();
    } catch {
      setError("Không lưu được sách. Vui lòng kiểm tra API.");
    } finally {
      setSaving(false);
    }
  }

  // Chọn sách cần chỉnh sửa
  function editBook(book: Book) {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      publishYear: book.publishYear,
      topic: book.topic,
    });
    setNotice("");
  }

  // DELETE: Xóa sách
  async function deleteBook(id: number) {
    if (!window.confirm("Bạn muốn xóa cuốn sách này?")) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await api.delete(`/api/books/${id}`);

      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }

      await loadBooks();
      setNotice("Đã xóa sách thành công.");
    } catch {
      setError("Không xóa được sách.");
    }
  }

  return (
    <main className="container section">
      <h1>Quản lý sách - Lab 2</h1>
      <p className="section-description">
        Thực hành GET, POST, PUT, DELETE bằng Axios và ASP.NET Core.
      </p>

      <form className="lab2-form" onSubmit={handleSubmit}>
        <h2>{editingId === null ? "Thêm sách mới" : "Cập nhật sách"}</h2>

        <label className="lab2-field">
          Tên sách
          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
            maxLength={250}
          />
        </label>

        <label className="lab2-field">
          Tác giả
          <input
            value={form.author}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                author: e.target.value,
              }))
            }
            required
            maxLength={150}
          />
        </label>

        <label className="lab2-field">
          Năm xuất bản
          <input
            type="number"
            min="1"
            value={form.publishYear}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                publishYear: Number(e.target.value),
              }))
            }
            required
          />
        </label>

        <label className="lab2-field">
          Chủ đề
          <input
            value={form.topic}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                topic: e.target.value,
              }))
            }
            maxLength={100}
          />
        </label>

        <div className="lab2-actions">
          <button className="lab2-button" type="submit" disabled={saving}>
            {saving
              ? "Đang lưu..."
              : editingId === null
                ? "Thêm sách"
                : "Lưu thay đổi"}
          </button>

          {editingId !== null && (
            <button
              className="lab2-button lab2-secondary"
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              Hủy sửa
            </button>
          )}
        </div>
      </form>

      {error && <p className="lab2-error">{error}</p>}
      {notice && <p className="lab2-success">{notice}</p>}

      <h2>Danh sách sách</h2>

      <div className="lab2-table-wrapper">
        <table className="lab2-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Năm</th>
              <th>Chủ đề</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>Đang tải dữ liệu...</td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={6}>Chưa có sách trong thư viện.</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishYear}</td>
                  <td>{book.topic}</td>
                  <td>
                    <div className="lab2-actions">
                      <button
                        className="lab2-button lab2-secondary"
                        onClick={() => editBook(book)}
                      >
                        Sửa
                      </button>

                      <button
                        className="lab2-button lab2-danger"
                        onClick={() => deleteBook(book.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
