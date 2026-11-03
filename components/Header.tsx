import Link from "next/link";
import AuthMenu from "./AuthMenu";

export default function Header() {
  return (
    <header className="header">
      <div className="container navbar">
        {/* Logo OpenShelf */}
        <Link href="/" className="logo">
          📚 OpenShelf
        </Link>

        {/* Menu dieu huong */}
        <nav className="menu">
          <Link href="/">Trang chủ</Link>
          <Link href="/books">Kho sách</Link>
          <Link href="/articles">Bài báo</Link>
          <Link href="/about-us">Giới thiệu</Link>
          <Link href="/lab2">Quản lý sách</Link>
        </nav>

        {/* Lab 3 - Authentication */}
        <AuthMenu />
      </div>
    </header>
  );
}
