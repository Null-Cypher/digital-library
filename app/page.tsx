export default function HomePage() {
  return (
    <main className="website">
      {/* Phần giới thiệu */}
      <section className="hero">
        <div className="container">
          <h1>Khám phá tri thức cùng OpenShelf</h1>

          <p>
            Thư viện số hỗ trợ bạn tiếp cận sách, bài báo khoa học và tài liệu
            học tập thuộc nhiều lĩnh vực khác nhau.
          </p>

          <div className="search-box">
            <input
              type="search"
              placeholder="Nhập tên sách, bài báo hoặc chủ đề..."
              aria-label="Tìm kiếm tài liệu"
            />
          </div>
        </div>
      </section>

      {/* Danh mục tài liệu */}
      <section id="categories" className="section container">
        <h2>Danh mục tài liệu</h2>

        <p className="section-description">
          Khám phá các nguồn tài liệu trong thư viện.
        </p>

        <div className="card-grid">
          <article className="card">
            <div className="card-icon">📖</div>
            <h3>Sách điện tử</h3>
            <p>Tổng hợp sách học thuật, giáo trình và tài liệu tham khảo.</p>
          </article>

          <article className="card">
            <div className="card-icon">📄</div>
            <h3>Bài báo khoa học</h3>
            <p>
              Khám phá các công trình nghiên cứu khoa học trong nhiều lĩnh vực.
            </p>
          </article>

          <article className="card">
            <div className="card-icon">🔬</div>
            <h3>Chủ đề nghiên cứu</h3>
            <p>Tìm hiểu các lĩnh vực công nghệ, khoa học và kỹ thuật.</p>
          </article>
        </div>
      </section>

      {/* Tài liệu nổi bật */}
      <section id="documents" className="section container">
        <h2>Tài liệu nổi bật</h2>

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
            <span className="document-type">Bài báo</span>
            <h3>Quantum Computing and Applications</h3>
            <p>Chủ đề: Điện toán lượng tử</p>
          </article>
        </div>
      </section>
    </main>
  );
}
