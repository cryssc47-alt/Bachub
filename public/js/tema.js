async function loadTema() {
  const slug = window.location.pathname.split('/').pop();

  const res = await fetch(`/api/istorie/tema/${slug}`);
  if (!res.ok) {
    document.getElementById('tema-main').innerHTML = '<div class="error">Tema nu a fost găsită.</div>';
    return;
  }

  const tema = await res.json();

  document.title = `${tema.title} — BacHub`;
  document.getElementById('tema-title').textContent = tema.title;
  document.getElementById('tema-number').textContent = `Tema ${tema.number}`;
  document.querySelector('meta[name="description"]').setAttribute(
    'content',
    `${tema.title} — materiale complete pentru bacalaureat la istorie. BacHub.`
  );

  const main = document.getElementById('tema-main');
  main.innerHTML = tema.sections.map(section => `
    <article class="section-block section-visible">
      <div class="section-content">
        ${section.content.trim().split('\n').map(p => p.trim() ? `<p>${p.trim()}</p>` : '').join('')}
      </div>
      <div class="watermark">BacHub</div>
    </article>
  `).join('');
}

loadTema();