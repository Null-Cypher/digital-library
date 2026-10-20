export default function ArticlesPage() {
  return (
    <main className="container section">
      <h1>Bài báo khoa học</h1>

      <p className="section-description">
        Khám phá các công trình nghiên cứu khoa học thuộc nhiều lĩnh vực.
      </p>

      <div className="card-grid">
        <article className="card">
          <span className="document-type">Bài báo</span>
          <h3>Machine Learning for Cybersecurity</h3>
          <p>Chủ đề: An toàn thông tin</p>
        </article>

        <article className="card">
          <span className="document-type">Bài báo</span>
          <h3>Quantum Computing Applications</h3>
          <p>Chủ đề: Điện toán lượng tử</p>
        </article>

        <article className="card">
          <span className="document-type">Bài báo</span>
          <h3>Deep Learning in Computer Vision</h3>
          <p>Chủ đề: Trí tuệ nhân tạo</p>
        </article>
      </div>
    </main>
  );
}
