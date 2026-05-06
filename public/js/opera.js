async function loadOpera() {
  const slug = window.location.pathname.split('/').pop();

  const res = await fetch(`/api/romana/opera/${slug}`);
  if (!res.ok) {
    document.getElementById('opera-main').innerHTML = '<div class="error">Opera nu a fost găsită.</div>';
    return;
  }

  const opera = await res.json();

  document.title = `${opera.title} — BacHub`;
  document.getElementById('opera-title').textContent = opera.title;
  document.getElementById('opera-meta').textContent = `${opera.author} · ${opera.currentLiterar}`;
  document.querySelector('meta[name="description"]').setAttribute(
    'content',
    `${opera.title} de ${opera.author} — rezumat, eseuri și analiză pentru bacalaureat. BacHub.`
  );

  // Build tabs
  const sidebarNav = document.getElementById('sidebar-nav');
  sidebarNav.innerHTML = opera.sections.map((section, index) => `
    <button class="tab-btn ${index === 0 ? 'tab-active' : ''}" onclick="switchTab('${section.id}', this)">
      ${section.title}
    </button>
  `).join('');

  // Build all sections but only show first
  const main = document.getElementById('opera-main');
  main.innerHTML = `<div class="ad-slot" style="margin-bottom: 24px;"><span>Publicitate</span></div>` + opera.sections.map((section, index) => `
    <article class="section-block ${index === 0 ? 'section-visible' : 'section-hidden'}" id="${section.id}">
      <div class="section-block-header">
        <span class="section-number">${index + 1}</span>
        <h2 class="section-block-title">${section.title}</h2>
      </div>
      <div class="section-content">
        ${section.content.trim().split('\n').map(p => p.trim() ? `<p>${p.trim()}</p>` : '').join('')}
      </div>
      <div class="watermark">BacHub</div>
    </article>
  `).join('');
}

function switchTab(id, btn) {
  // Hide all sections
  document.querySelectorAll('.section-block').forEach(s => {
    s.classList.add('section-hidden');
    s.classList.remove('section-visible');
  });

  // Show selected section
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('section-hidden');
    target.classList.add('section-visible');
  }

  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-active'));
  btn.classList.add('tab-active');

  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

loadOpera();