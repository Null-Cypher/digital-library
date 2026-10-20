import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container navbar">
        <Link href="/" className="logo">
          📚 OpenShelf
        </Link>

        <nav className="menu">
          <Link href="/">Trang chủ</Link>
          <Link href="/books">Kho sách</Link>
          <Link href="/articles">Bài báo</Link>
          <Link href="/about-us">Giới thiệu</Link>
        </nav>
      </div>
    </header>
  );
}
