async function loadRomana() {
  const res = await fetch('/api/romana');
  const data = await res.json();

  renderList('proza-list', data.proza, 'blue-accent', 'blue-badge');
  renderList('poezie-list', data.poezie, 'purple-accent', 'purple-badge');
  renderList('drama-list', data.drama, 'red-accent', 'red-badge');
}

function renderList(containerId, opere, accentClass, badgeClass) {
  const container = document.getElementById(containerId);
  if (!opere || opere.length === 0) {
    container.innerHTML = '<div class="loading">Nicio operă găsită.</div>';
    return;
  }
  container.innerHTML = opere.map(opera => `
    <a href="/romana/opera/${opera.slug}" class="material-card ${accentClass}">
      <div class="material-info">
        <div class="material-title">${opera.title}</div>
        <div class="material-meta">${opera.author} · ${opera.currentLiterar}</div>
      </div>
      <span class="material-badge ${badgeClass}">${opera.category === 'proza' ? 'Proză' : opera.category === 'poezie' ? 'Poezie' : 'Dramaturgie'}</span>
    </a>
  `).join('');
}

loadRomana();