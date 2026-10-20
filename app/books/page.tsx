export default function BooksPage() {
  return (
    <main className="container section">
      <h1>Kho sách điện tử</h1>
      <p className="section-description">
        Khám phá các sách và tài liệu học tập trong thư viện số OpenShelf.
      </p>

      <div className="card-grid">
        <article className="card">
          <span className="document-type">Sách</span>
          <h3>Introduction to Artificial Intelligence</h3>
          <p>Chủ đề: Trí tuệ nhân tạo</p>
        </article>

        <article className="card">
          <span className="document-type">Sách</span>
          <h3>Fundamentals of Cybersecurity</h3>
          <p>Chủ đề: An toàn thông tin</p>
        </article>

        <article className="card">
          <span className="document-type">Sách</span>
          <h3>Introduction to Quantum Computing</h3>
          <p>Chủ đề: Điện toán lượng tử</p>
        </article>
      </div>
    </main>
  );
}
