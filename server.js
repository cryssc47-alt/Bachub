const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ─── ROMANA HELPERS ───────────────────────────────────────

function loadCategory(category) {
  const dir = path.join(__dirname, 'content', 'romana', category);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  return files.map(f => require(path.join(dir, f)));
}

const prozaOrder = [
  'povestea-lui-harap-alb','alexandru-lapusneanul','moara-cu-noroc',
  'la-tiganci','mara','baltagul','ion','ultima-noapte',
  'enigma-otiliei','morometii'
];
const poezieOrder = [
  'luceafarul','plumb','eu-nu-strivesc','testament',
  'riga-crypto','aci-sosi-pe-vremuri'
];
const dramaOrder = [
  'o-scrisoare-pierduta','mesterul-manole','iona'
];

function sortByCurriculum(opere, order) {
  return order.map(slug => opere.find(o => o.slug === slug)).filter(Boolean);
}

// ─── ISTORIE HELPERS ──────────────────────────────────────

function loadTeme() {
  const dir = path.join(__dirname, 'content', 'istorie', 'teme');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  const teme = files.map(f => require(path.join(dir, f)));
  return teme.sort((a, b) => a.number - b.number);
}

// ─── BLOG HELPERS ─────────────────────────────────────────

function loadBlogPosts() {
  const dir = path.join(__dirname, 'content', 'blog');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  const posts = files.map(f => require(path.join(dir, f)));
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ─── ROUTES ───────────────────────────────────────────────

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Romana
app.get('/romana', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'romana.html'));
});

app.get('/api/romana', (req, res) => {
  const proza = sortByCurriculum(loadCategory('proza'), prozaOrder);
  const poezie = sortByCurriculum(loadCategory('poezie'), poezieOrder);
  const drama = sortByCurriculum(loadCategory('drama'), dramaOrder);
  res.json({ proza, poezie, drama });
});

app.get('/romana/opera/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'opera.html'));
});

app.get('/api/romana/opera/:slug', (req, res) => {
  const { slug } = req.params;
  const categories = ['proza', 'poezie', 'drama'];
  for (const cat of categories) {
    const dir = path.join(__dirname, 'content', 'romana', cat);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const opera = require(path.join(dir, file));
      if (opera.slug === slug) return res.json(opera);
    }
  }
  res.status(404).json({ error: 'Opera negasita' });
});

// Istorie
app.get('/istorie', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'istorie.html'));
});

app.get('/api/istorie', (req, res) => {
  const teme = loadTeme();
  res.json({ teme });
});

app.get('/istorie/tema/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tema.html'));
});

app.get('/api/istorie/tema/:slug', (req, res) => {
  const { slug } = req.params;
  const dir = path.join(__dirname, 'content', 'istorie', 'teme');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const tema = require(path.join(dir, file));
    if (tema.slug === slug) return res.json(tema);
  }
  res.status(404).json({ error: 'Tema negasita' });
});

// Blog
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

app.get('/api/blog', (req, res) => {
  const posts = loadBlogPosts();
  res.json({ posts });
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'post.html'));
});

app.get('/api/blog/:slug', (req, res) => {
  const { slug } = req.params;
  const dir = path.join(__dirname, 'content', 'blog');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const post = require(path.join(dir, file));
    if (post.slug === slug) return res.json(post);
  }
  res.status(404).json({ error: 'Articolul negasit' });
});

// Despre
app.get('/despre', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'despre.html'));
});

// Contact
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.listen(PORT, () => {
  console.log(`BacHub runs on http://localhost:${PORT}`);
});