async function loadIstorie() {
  const res = await fetch('/api/istorie');
  const data = await res.json();

  const grid = document.getElementById('teme-grid');
  grid.innerHTML = data.teme.map(tema => `
    <a href="/istorie/tema/${tema.slug}" class="tema-card">
      <div class="tema-number">T${tema.number}</div>
      <div class="tema-info">
        <div class="tema-title">${tema.title}</div>
      </div>
      <div class="tema-arrow">→</div>
    </a>
  `).join('');
}

loadIstorie();