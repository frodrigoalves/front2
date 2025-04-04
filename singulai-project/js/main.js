// Caminho para o JSON dentro da pasta "js"
const POSTS_JSON = "js/posts.json";

/**
 * Carrega o arquivo posts.json e retorna um array de posts
 */
async function fetchPosts() {
  const response = await fetch(POSTS_JSON);
  const data = await response.json();
  return data;
}

/**
 * Exibe N últimos posts na página inicial
 * @param {number} limit - Quantos posts exibir
 */
async function loadLatestPosts(limit) {
  const posts = await fetchPosts();
  const latest = posts.slice(0, limit);

  const container = document.getElementById('latest-posts');
  if (!container) return;

  latest.forEach(post => container.appendChild(createPostCard(post)));
}

/**
 * Exibe todos os posts na página blog.html
 */
async function loadAllPosts() {
  const posts = await fetchPosts();
  const container = document.getElementById('all-posts');
  if (!container) return;

  posts.forEach(post => container.appendChild(createPostCard(post)));
}

/**
 * Cria o elemento de card (HTML) para um post
 */
function createPostCard(post) {
  const card = document.createElement('div');
  card.classList.add('post-card');

  const title = document.createElement('h3');
  title.textContent = post.title;
  card.appendChild(title);

  const datePara = document.createElement('p');
  datePara.classList.add('post-date');
  datePara.textContent = formatDate(post.date);
  card.appendChild(datePara);

  const summary = document.createElement('p');
  summary.classList.add('post-summary');
  summary.textContent = post.summary;
  card.appendChild(summary);

  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    img.classList.add('post-image');
    card.appendChild(img);
  }

  return card;
}

/**
 * Formata a data de "2025-05-15" para "15/05/2025"
 */
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Inicialização automática dependendo da página
 */
document.addEventListener('DOMContentLoaded', () => {
  const isBlogPage = document.getElementById('all-posts');
  const isHomePage = document.getElementById('latest-posts');

  if (isHomePage) loadLatestPosts(3);
  if (isBlogPage) loadAllPosts();
});