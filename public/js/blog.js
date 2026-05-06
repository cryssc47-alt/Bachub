let allPosts = [];

async function loadBlog() {
  const res = await fetch('/api/blog');
  const data = await res.json();
  allPosts = data.posts;
  renderPosts(allPosts);
}

function renderPosts(posts) {
  const grid = document.getElementById('blog-grid');
  if (!posts || posts.length === 0) {
    grid.innerHTML = '<div class="loading">Niciun articol găsit.</div>';
    return;
  }
  grid.innerHTML = posts.map(post => `
    <a href="/blog/${post.slug}" class="post-card">
      <div class="post-card-top">
        <span class="post-category-tag">${post.category}</span>
        <span class="post-date">${formatDate(post.date)}</span>
      </div>
      <div class="post-card-title">${post.title}</div>
      <div class="post-card-excerpt">${post.excerpt}</div>
      <div class="post-card-link">Citește articolul →</div>
    </a>
  `).join('');
}

function filterPosts(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-active'));
  btn.classList.add('filter-active');
  if (category === 'toate') {
    renderPosts(allPosts);
  } else {
    renderPosts(allPosts.filter(p => p.category === category));
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
}

loadBlog();