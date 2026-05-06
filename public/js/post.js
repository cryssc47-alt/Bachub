async function loadPost() {
  const slug = window.location.pathname.split('/').pop();

  const res = await fetch(`/api/blog/${slug}`);
  if (!res.ok) {
    document.getElementById('post-content').innerHTML = '<div class="error">Articolul nu a fost găsit.</div>';
    return;
  }

  const post = await res.json();

  document.title = `${post.title} — BacHub`;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-meta').textContent = `${post.category} · ${formatDate(post.date)}`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);

  const content = document.getElementById('post-content');
  content.innerHTML = `
    <article class="post-article">
      ${post.content.trim().split('\n').map(p => p.trim() ? `<p>${p.trim()}</p>` : '').join('')}
      <div class="watermark">BacHub</div>
    </article>
  `;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
}

loadPost();